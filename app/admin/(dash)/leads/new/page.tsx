import Link from "next/link";
import { PageTitle, Card } from "@/components/admin/ui";
import { LEAD_STATUSES, SOURCES } from "@/lib/crm";
import { createLeadAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function NewLead() {
  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1.5 block text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <Link href="/admin/leads" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Leadler
      </Link>
      <div className="mt-3">
        <PageTitle title="Yeni lead" subtitle="Telefonla veya elle gelen bir başvuruyu ekle" />
      </div>

      <Card className="max-w-2xl p-6 sm:p-8">
        <form action={createLeadAction} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>AD SOYAD *</label>
            <input name="name" className={field} required placeholder="Ad Soyad" />
          </div>
          <div>
            <label className={label}>TELEFON *</label>
            <input name="phone" className={field} required placeholder="05xx xxx xx xx" />
          </div>
          <div>
            <label className={label}>E-POSTA</label>
            <input name="email" type="email" className={field} placeholder="ornek@eposta.com" />
          </div>
          <div>
            <label className={label}>VİZE TÜRÜ</label>
            <input name="visa_type" className={field} placeholder="Schengen / Amerika…" />
          </div>
          <div>
            <label className={label}>KAYNAK</label>
            <select name="source" className={`${field} appearance-none`} defaultValue="manual">
              {SOURCES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>NOT</label>
            <textarea name="note" rows={3} className={`${field} resize-none`} placeholder="Kısa not…" />
          </div>
          <input type="hidden" name="status" value={LEAD_STATUSES[0].key} />
          <div className="sm:col-span-2">
            <button className="btn-gold rounded-full px-6 py-2.5 text-sm font-bold">Lead ekle</button>
          </div>
        </form>
      </Card>
    </>
  );
}
