import Link from "next/link";
import { PageTitle, Card } from "@/components/admin/ui";
import { createCustomerAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function NewCustomer() {
  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)]";
  const label = "ticket mb-1.5 block text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mist-2)]";

  return (
    <>
      <Link href="/admin/customers" className="ticket text-[0.7rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
        ← Müşteriler
      </Link>
      <div className="mt-3">
        <PageTitle title="Yeni müşteri" subtitle="Ekledikten sonra vize ve tarihlerini girebilirsin" />
      </div>
      <Card className="max-w-xl p-6 sm:p-8">
        <form action={createCustomerAction} className="space-y-4">
          <div>
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
            <label className={label}>NOTLAR</label>
            <textarea name="notes" rows={3} className={`${field} resize-none`} />
          </div>
          <button className="btn-gold rounded-full px-6 py-2.5 text-sm font-bold">Müşteri ekle</button>
        </form>
      </Card>
    </>
  );
}
