import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card } from "@/components/admin/ui";
import { PRIORITIES } from "@/lib/crm";
import { createApplicationAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function NewApplication({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer } = await searchParams;
  const supabase = await createSupabaseServer();
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name, phone")
    .order("name");

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1.5 block text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <Link href="/admin/applications" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Başvurular
      </Link>
      <div className="mt-3">
        <PageTitle title="Yeni başvuru" subtitle="Standart belge kontrol listesi otomatik eklenir" />
      </div>

      <Card className="max-w-2xl p-6 sm:p-8">
        <form action={createApplicationAction} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>MÜŞTERİ *</label>
            <select name="customer_id" defaultValue={customer ?? ""} className={`${field} appearance-none`} required>
              <option value="" disabled>Müşteri seçin…</option>
              {(customers ?? []).map((c) => (
                <option key={c.id} value={c.id}>{c.name} · {c.phone}</option>
              ))}
            </select>
            {(!customers || customers.length === 0) && (
              <p className="mt-1 text-xs text-[color:var(--color-mist-2)]">
                Önce bir <Link href="/admin/customers/new" className="text-[color:var(--color-sky)] underline">müşteri ekleyin</Link>.
              </p>
            )}
          </div>
          <div>
            <label className={label}>ÜLKE *</label>
            <input name="country" className={field} required placeholder="Fransa" />
          </div>
          <div>
            <label className={label}>VİZE TÜRÜ</label>
            <input name="visa_type" className={field} placeholder="Turistik" />
          </div>
          <div>
            <label className={label}>HİZMET BEDELİ (₺)</label>
            <input name="service_fee" type="number" min="0" step="1" className={field} placeholder="0" />
          </div>
          <div>
            <label className={label}>ÖNCELİK</label>
            <select name="priority" defaultValue="normal" className={`${field} appearance-none`}>
              {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>RANDEVU TARİHİ (varsa)</label>
            <input name="appointment_at" type="datetime-local" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>NOT</label>
            <textarea name="notes" rows={2} className={`${field} resize-none`} />
          </div>
          <div className="sm:col-span-2">
            <button className="btn-gold rounded-full px-6 py-2.5 text-sm font-bold">Başvuru oluştur</button>
          </div>
        </form>
      </Card>
    </>
  );
}
