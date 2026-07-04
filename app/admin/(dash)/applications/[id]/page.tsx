import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/admin/ui";
import AppStageSelect from "@/components/admin/AppStageSelect";
import { PRIORITIES, fmtDate, fmtDateTime, daysUntil, fmtMoney, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import {
  updateApplicationAction,
  toggleDocumentAction,
  addDocumentAction,
  deleteDocumentAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data: app } = await supabase
    .from("applications")
    .select("*, customers(id,name,phone)")
    .eq("id", id)
    .single();
  if (!app) notFound();

  const [{ data: docs }, { data: team }] = await Promise.all([
    supabase.from("application_documents").select("*").eq("application_id", id).order("sort"),
    supabase.from("profiles").select("id, full_name"),
  ]);

  const c = (app as any).customers;
  const documents = docs ?? [];
  const collected = documents.filter((d) => d.collected).length;
  const dleft = app.appointment_at ? daysUntil(app.appointment_at) : null;

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3 py-2 text-sm text-[color:var(--color-cloud)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1 block text-[0.58rem] tracking-[0.14em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <Link href="/admin/applications" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Başvurular
      </Link>
      <div className="mt-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
            {app.country} {app.visa_type ? <span className="text-[color:var(--color-mist)]">· {app.visa_type}</span> : null}
          </h1>
          <Link href={`/admin/customers/${c?.id}`} className="ticket mt-1 inline-block text-[0.72rem] text-[color:var(--color-sky)] hover:underline">
            {c?.name}
          </Link>
        </div>
        <AppStageSelect id={app.id} stage={app.stage} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* appointment */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Randevu</h2>
              {c && app.appointment_at && (
                <a
                  href={waLink(c.phone, `Merhaba ${c.name}, ${app.country} vize randevunuz ${fmtDateTime(app.appointment_at)} tarihinde. Hatırlatmak istedik.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="ticket text-[0.66rem] text-[color:var(--color-wa-ink)] hover:underline"
                >
                  Randevu hatırlat →
                </a>
              )}
            </div>
            {app.appointment_at ? (
              <div className="mt-3 flex items-baseline gap-3">
                <span className="ticket text-xl font-bold text-[color:var(--color-cloud)]">{fmtDateTime(app.appointment_at)}</span>
                {dleft !== null && (
                  <span className={`ticket text-sm font-bold ${dleft < 0 ? "text-[color:var(--color-stamp)]" : dleft <= 3 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}`}>
                    {dleft < 0 ? `${-dleft} gün önceydi` : dleft === 0 ? "bugün!" : `${dleft} gün kaldı`}
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-[color:var(--color-mist-2)]">Henüz randevu tarihi girilmedi.</p>
            )}
          </Card>

          {/* document checklist */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Belge kontrol listesi</h2>
              <span className="ticket text-xs text-[color:var(--color-mist)]">{collected}/{documents.length} tamam</span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-[color:var(--color-hairline)]">
              <div className="h-full rounded-full bg-[color:var(--color-wa-ink)]" style={{ width: `${documents.length ? (collected / documents.length) * 100 : 0}%` }} />
            </div>
            <ul className="space-y-1.5">
              {documents.map((d) => (
                <li key={d.id} className="flex items-center gap-3">
                  <form action={toggleDocumentAction}>
                    <input type="hidden" name="id" value={d.id} />
                    <input type="hidden" name="application_id" value={id} />
                    <input type="hidden" name="collected" value={String(d.collected)} />
                    <button
                      className={`grid h-5 w-5 place-items-center rounded border ${d.collected ? "border-[color:var(--color-wa-ink)] bg-[color:var(--color-wa-ink)] text-white" : "border-[color:var(--color-hairline-2)]"}`}
                      title={d.collected ? "Tamam" : "Eksik"}
                    >
                      {d.collected && <span className="text-[0.7rem] leading-none">✓</span>}
                    </button>
                  </form>
                  <span className={`flex-1 text-sm ${d.collected ? "text-[color:var(--color-mist)] line-through" : "text-[color:var(--color-cloud)]"}`}>
                    {d.name}
                  </span>
                  <form action={deleteDocumentAction}>
                    <input type="hidden" name="id" value={d.id} />
                    <input type="hidden" name="application_id" value={id} />
                    <button className="ticket text-[0.6rem] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-stamp)]">sil</button>
                  </form>
                </li>
              ))}
            </ul>
            <form action={addDocumentAction} className="mt-4 flex gap-2">
              <input type="hidden" name="application_id" value={id} />
              <input name="name" placeholder="Belge ekle…" className={field} required />
              <button className="shrink-0 rounded-lg border border-[color:var(--color-hairline-2)] px-4 text-sm font-semibold text-[color:var(--color-cloud)]">Ekle</button>
            </form>
          </Card>
        </div>

        {/* right: edit */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <a href={waLink(c.phone)} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[color:var(--color-wa)] px-3 py-2 text-sm font-semibold text-white">
                <WaIcon className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telLink(c.phone)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[color:var(--color-hairline-2)] px-3 py-2 text-sm font-semibold text-[color:var(--color-cloud)]">
                <PhoneIcon className="h-4 w-4" /> Ara
              </a>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-semibold text-[color:var(--color-cloud)]">Başvuru bilgileri</h2>
            <form action={updateApplicationAction} className="space-y-3">
              <input type="hidden" name="id" value={id} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>ÜLKE</label>
                  <input name="country" defaultValue={app.country} className={field} />
                </div>
                <div>
                  <label className={label}>VİZE TÜRÜ</label>
                  <input name="visa_type" defaultValue={app.visa_type ?? ""} className={field} />
                </div>
              </div>
              <div>
                <label className={label}>RANDEVU TARİHİ</label>
                <input name="appointment_at" type="datetime-local" defaultValue={app.appointment_at ? new Date(app.appointment_at).toISOString().slice(0, 16) : ""} className={field} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>HİZMET BEDELİ</label>
                  <input name="service_fee" type="number" min="0" step="1" defaultValue={app.service_fee} className={field} />
                </div>
                <div>
                  <label className={label}>PARA BİRİMİ</label>
                  <select name="currency" defaultValue={app.currency} className={`${field} appearance-none`}>
                    <option>TRY</option><option>EUR</option><option>USD</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>ÖNCELİK</label>
                  <select name="priority" defaultValue={app.priority} className={`${field} appearance-none`}>
                    {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>SORUMLU</label>
                  <select name="assigned_to" defaultValue={app.assigned_to ?? ""} className={`${field} appearance-none`}>
                    <option value="">—</option>
                    {(team ?? []).map((t) => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>NOTLAR</label>
                <textarea name="notes" defaultValue={app.notes ?? ""} rows={3} className={`${field} resize-none`} />
              </div>
              <button className="btn-gold w-full rounded-full px-5 py-2.5 text-sm font-bold">Kaydet</button>
            </form>
            <div className="ticket mt-3 flex justify-between text-[0.6rem] text-[color:var(--color-mist-2)]">
              <span>Bedel: {fmtMoney(app.service_fee, app.currency)}</span>
              <span>Güncelleme: {fmtDate(app.updated_at)}</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
