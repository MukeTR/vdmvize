import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card, StatusBadge } from "@/components/admin/ui";
import { fmtDate } from "@/lib/crm";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const supabase = await createSupabaseServer();

  const like = `%${term}%`;
  const [{ data: leads }, { data: customers }] = term
    ? await Promise.all([
        supabase.from("leads").select("*").or(`name.ilike.${like},phone.ilike.${like},email.ilike.${like}`).limit(20),
        supabase.from("customers").select("*").or(`name.ilike.${like},phone.ilike.${like},email.ilike.${like}`).limit(20),
      ])
    : [{ data: [] }, { data: [] }];

  const L = leads ?? [];
  const C = customers ?? [];

  return (
    <>
      <PageTitle title="Arama" subtitle={term ? `“${term}” için sonuçlar` : "Arama terimi girin"} />

      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="border-b border-[color:var(--color-hairline)] px-5 py-3 text-sm font-semibold text-[color:var(--color-cloud)]">
            Leadler ({L.length})
          </div>
          {L.length === 0 ? (
            <p className="px-5 py-6 text-sm text-[color:var(--color-mist-2)]">Sonuç yok.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-hairline)]">
              {L.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-black/[0.02]">
                    <div>
                      <div className="font-semibold text-[color:var(--color-cloud)]">{l.name}</div>
                      <div className="ticket text-[0.7rem] text-[color:var(--color-mist-2)]">{l.phone} · {l.visa_type || "—"} · {fmtDate(l.created_at)}</div>
                    </div>
                    <StatusBadge status={l.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-[color:var(--color-hairline)] px-5 py-3 text-sm font-semibold text-[color:var(--color-cloud)]">
            Müşteriler ({C.length})
          </div>
          {C.length === 0 ? (
            <p className="px-5 py-6 text-sm text-[color:var(--color-mist-2)]">Sonuç yok.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-hairline)]">
              {C.map((c) => (
                <li key={c.id}>
                  <Link href={`/admin/customers/${c.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-black/[0.02]">
                    <div>
                      <div className="font-semibold text-[color:var(--color-cloud)]">{c.name}</div>
                      <div className="ticket text-[0.7rem] text-[color:var(--color-mist-2)]">{c.phone}{c.email ? ` · ${c.email}` : ""}</div>
                    </div>
                    <span className="ticket text-[0.66rem] text-[color:var(--color-sky)]">Aç →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
