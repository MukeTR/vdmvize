import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card } from "@/components/admin/ui";
import { fmtDate, daysUntil } from "@/lib/crm";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const supabase = await createSupabaseServer();
  const { data: customers } = await supabase
    .from("customers")
    .select("*, visas(id,country,valid_until,status)")
    .order("created_at", { ascending: false });
  const list = customers ?? [];

  return (
    <>
      <PageTitle
        title="Müşteriler"
        subtitle={`${list.length} kayıt`}
        action={
          <Link href="/admin/customers/new" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            + Müşteri ekle
          </Link>
        }
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-hairline)] text-left">
                <th className="px-5 py-3 ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">MÜŞTERİ</th>
                <th className="px-5 py-3 ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">TELEFON</th>
                <th className="px-5 py-3 ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">VİZE</th>
                <th className="px-5 py-3 ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">EN YAKIN BİTİŞ</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c: any) => {
                const visas = (c.visas ?? []) as any[];
                const next = visas
                  .filter((v) => v.valid_until)
                  .sort((a, b) => a.valid_until.localeCompare(b.valid_until))
                  .find((v) => daysUntil(v.valid_until) >= 0) ?? visas.sort((a,b)=>b.valid_until.localeCompare(a.valid_until))[0];
                const dleft = next ? daysUntil(next.valid_until) : null;
                return (
                  <tr key={c.id} className="border-b border-[color:var(--color-hairline)] last:border-0 hover:bg-black/[0.02]">
                    <td className="px-5 py-3">
                      <Link href={`/admin/customers/${c.id}`} className="font-semibold text-[color:var(--color-cloud)] hover:text-[color:var(--color-gold-ink)]">
                        {c.name}
                      </Link>
                      {c.email && <div className="text-xs text-[color:var(--color-mist-2)]">{c.email}</div>}
                    </td>
                    <td className="px-5 py-3 ticket text-[color:var(--color-mist)]">{c.phone}</td>
                    <td className="px-5 py-3 text-[color:var(--color-mist)]">{visas.length} vize</td>
                    <td className="px-5 py-3">
                      {next ? (
                        <span className="ticket text-[color:var(--color-cloud)]">
                          {next.country} · {fmtDate(next.valid_until)}{" "}
                          <span className={dleft! < 0 ? "text-[color:var(--color-stamp)]" : dleft! <= 30 ? "text-[color:var(--color-gold-ink)]" : "text-[color:var(--color-mist-2)]"}>
                            ({dleft! < 0 ? `${-dleft!}g geçti` : `${dleft!}g`})
                          </span>
                        </span>
                      ) : (
                        <span className="text-[color:var(--color-mist-2)]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-[color:var(--color-mist-2)]">Henüz müşteri yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
