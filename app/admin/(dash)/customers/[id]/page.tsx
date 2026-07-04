import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/admin/ui";
import FileManager from "@/components/admin/FileManager";
import { fmtDate, fmtDateTime, daysUntil, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import {
  addVisaAction,
  deleteVisaAction,
  addActivityAction,
  updateCustomerAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const visaColor: Record<string, string> = {
  active: "#0e7a3c",
  expired: "#c0402b",
  renewed: "#8a6d10",
};

export default async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data: customer } = await supabase.from("customers").select("*").eq("id", id).single();
  if (!customer) notFound();

  const [{ data: visas }, { data: activities }] = await Promise.all([
    supabase.from("visas").select("*").eq("customer_id", id).order("valid_until", { ascending: false }),
    supabase
      .from("activities")
      .select("*")
      .eq("entity_type", "customer")
      .eq("entity_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3 py-2 text-sm text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1 block text-[0.58rem] tracking-[0.14em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <Link href="/admin/customers" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Müşteriler
      </Link>
      <div className="mt-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
          {customer.name}
        </h1>
        <div className="flex gap-2">
          <a href={waLink(customer.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-[color:var(--color-wa)] px-3.5 py-2 text-sm font-semibold text-white">
            <WaIcon className="h-4 w-4" /> WhatsApp
          </a>
          <a href={telLink(customer.phone)} className="flex items-center gap-2 rounded-lg border border-[color:var(--color-hairline-2)] px-3.5 py-2 text-sm font-semibold text-[color:var(--color-cloud)]">
            <PhoneIcon className="h-4 w-4" /> Ara
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* left: visas + notes */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold text-[color:var(--color-cloud)]">Vizeler</h2>
            <ul className="space-y-3">
              {(visas ?? []).map((v) => {
                const dleft = daysUntil(v.valid_until);
                const col = visaColor[v.status] ?? "#6c7d9c";
                return (
                  <li key={v.id} className="rounded-xl border border-[color:var(--color-hairline)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-[color:var(--color-cloud)]">
                          {v.country} {v.visa_type ? <span className="text-[color:var(--color-mist)]">· {v.visa_type}</span> : null}
                        </div>
                        <div className="ticket mt-1 text-[0.72rem] text-[color:var(--color-mist)]">
                          {v.issued_date ? `${fmtDate(v.issued_date)} → ` : ""}{fmtDate(v.valid_until)}{" "}
                          <span className={dleft < 0 ? "text-[color:var(--color-stamp)]" : dleft <= 30 ? "text-[color:var(--color-gold-ink)]" : "text-[color:var(--color-mist-2)]"}>
                            ({dleft < 0 ? `${-dleft} gün geçti` : `${dleft} gün kaldı`})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full px-2 py-0.5 text-[0.62rem] font-bold" style={{ background: `${col}1a`, color: col }}>
                          {v.status}
                        </span>
                        <form action={deleteVisaAction}>
                          <input type="hidden" name="id" value={v.id} />
                          <input type="hidden" name="customer_id" value={id} />
                          <button className="ticket text-[0.6rem] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-stamp)]">sil</button>
                        </form>
                      </div>
                    </div>
                  </li>
                );
              })}
              {(!visas || visas.length === 0) && (
                <li className="text-sm text-[color:var(--color-mist-2)]">Henüz vize kaydı yok.</li>
              )}
            </ul>

            {/* add visa */}
            <form action={addVisaAction} className="mt-5 grid gap-3 rounded-xl border border-dashed border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] p-4 sm:grid-cols-2">
              <input type="hidden" name="customer_id" value={id} />
              <div>
                <label className={label}>ÜLKE *</label>
                <input name="country" className={field} required placeholder="Fransa" />
              </div>
              <div>
                <label className={label}>VİZE TÜRÜ</label>
                <input name="visa_type" className={field} placeholder="Schengen C" />
              </div>
              <div>
                <label className={label}>VERİLİŞ</label>
                <input name="issued_date" type="date" className={field} />
              </div>
              <div>
                <label className={label}>BİTİŞ *</label>
                <input name="valid_until" type="date" className={field} required />
              </div>
              <div className="sm:col-span-2">
                <button className="btn-gold rounded-full px-5 py-2 text-sm font-bold">＋ Vize ekle</button>
                <span className="ml-3 text-xs text-[color:var(--color-mist-2)]">Bitiş tarihine 30/7/1 gün kala otomatik hatırlatma oluşur.</span>
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold text-[color:var(--color-cloud)]">Notlar & geçmiş</h2>
            <form action={addActivityAction} className="mb-5 flex gap-2">
              <input type="hidden" name="entity_type" value="customer" />
              <input type="hidden" name="entity_id" value={id} />
              <input name="body" placeholder="Not ekle…" className={field} required />
              <button className="shrink-0 rounded-lg bg-[color:var(--color-cloud)] px-4 text-sm font-semibold text-white">Ekle</button>
            </form>
            <ul className="space-y-3">
              {(activities ?? []).map((a) => (
                <li key={a.id} className="border-l-2 border-[color:var(--color-hairline-2)] pl-3">
                  <div className="text-sm text-[color:var(--color-cloud)]">{a.body}</div>
                  <div className="ticket text-[0.62rem] text-[color:var(--color-mist-2)]">{a.kind} · {fmtDateTime(a.created_at)}</div>
                </li>
              ))}
              {(!activities || activities.length === 0) && (
                <li className="text-sm text-[color:var(--color-mist-2)]">Henüz kayıt yok.</li>
              )}
            </ul>
          </Card>
        </div>

        {/* right: info edit + files */}
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-[color:var(--color-cloud)]">Bilgiler</h2>
            <form action={updateCustomerAction} className="space-y-3">
              <input type="hidden" name="id" value={id} />
              <div>
                <label className={label}>AD SOYAD</label>
                <input name="name" defaultValue={customer.name} className={field} />
              </div>
              <div>
                <label className={label}>TELEFON</label>
                <input name="phone" defaultValue={customer.phone} className={field} />
              </div>
              <div>
                <label className={label}>E-POSTA</label>
                <input name="email" defaultValue={customer.email ?? ""} className={field} />
              </div>
              <div>
                <label className={label}>NOTLAR</label>
                <textarea name="notes" defaultValue={customer.notes ?? ""} rows={3} className={`${field} resize-none`} />
              </div>
              <button className="rounded-full border border-[color:var(--color-hairline-2)] px-5 py-2 text-sm font-semibold text-[color:var(--color-cloud)] hover:border-[color:var(--color-gold)]/60">
                Kaydet
              </button>
            </form>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-[color:var(--color-cloud)]">Belgeler</h2>
            <FileManager customerId={id} />
          </Card>
        </div>
      </div>
    </>
  );
}
