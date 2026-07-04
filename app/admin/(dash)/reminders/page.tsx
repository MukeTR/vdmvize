import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card } from "@/components/admin/ui";
import { fmtDate, daysUntil, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import { markReminderAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function renewalMsg(name: string, country: string, date: string) {
  return `Merhaba ${name}, ${country} vizenizin geçerlilik süresi ${fmtDate(
    date
  )} tarihinde doluyor. Yeni seyahat planınız için VDM olarak size yardımcı olmak isteriz.`;
}

export default async function RemindersPage() {
  const supabase = await createSupabaseServer();
  const today = new Date().toISOString().slice(0, 10);

  const { data: reminders } = await supabase
    .from("visa_reminders")
    .select("*, customers(id,name,phone), visas(country,valid_until,visa_type)")
    .eq("status", "pending")
    .order("due_date", { ascending: true });

  const all = (reminders ?? []) as any[];
  const actionable = all.filter((r) => r.due_date <= today);
  const upcoming = all.filter((r) => r.due_date > today).slice(0, 20);

  const Row = ({ r, dim = false }: { r: any; dim?: boolean }) => {
    const c = r.customers;
    const v = r.visas;
    const dleft = daysUntil(v.valid_until);
    return (
      <li className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <Link href={`/admin/customers/${c.id}`} className="font-semibold text-[color:var(--color-cloud)] hover:text-[color:var(--color-gold-ink)]">
            {c.name}
          </Link>
          <div className="ticket text-[0.72rem] text-[color:var(--color-mist)]">
            {v.country} {v.visa_type ? `· ${v.visa_type}` : ""} · bitiş {fmtDate(v.valid_until)}{" "}
            <span className={dleft < 0 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}>
              ({dleft < 0 ? `${-dleft} gün geçti` : `${dleft} gün kaldı`}) · {r.offset_days}g uyarısı
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!dim && (
            <>
              <a href={waLink(c.phone, renewalMsg(c.name, v.country, v.valid_until))} target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--color-wa)]/12 text-[color:var(--color-wa-ink)]" title="Yenileme mesajı">
                <WaIcon className="h-4 w-4" />
              </a>
              <a href={telLink(c.phone)} className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--color-hairline-2)] text-[color:var(--color-cloud)]" title="Ara">
                <PhoneIcon className="h-4 w-4" />
              </a>
            </>
          )}
          <form action={markReminderAction}>
            <input type="hidden" name="id" value={r.id} />
            <input type="hidden" name="status" value="done" />
            <button className="rounded-lg bg-[color:var(--color-wa-ink)] px-3 py-2 text-xs font-semibold text-white" title="Tamamlandı">✓ Bitti</button>
          </form>
          <form action={markReminderAction}>
            <input type="hidden" name="id" value={r.id} />
            <input type="hidden" name="status" value="snoozed" />
            <button className="rounded-lg border border-[color:var(--color-hairline-2)] px-3 py-2 text-xs font-semibold text-[color:var(--color-mist)]" title="Ertele">Ertele</button>
          </form>
        </div>
      </li>
    );
  };

  return (
    <>
      <PageTitle
        title="Hatırlatıcılar"
        subtitle="Vize bitişine yaklaşan müşterilerle yeniden iletişim"
      />

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[color:var(--color-hairline)] px-5 py-3">
          <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Aksiyon bekleyen ({actionable.length})</h2>
          <span className="ticket text-[0.62rem] text-[color:var(--color-mist-2)]">bugün ve öncesi</span>
        </div>
        {actionable.length === 0 ? (
          <p className="py-10 text-center text-sm text-[color:var(--color-mist)]">Şu an aksiyon bekleyen hatırlatma yok. 🎉</p>
        ) : (
          <ul className="divide-y divide-[color:var(--color-hairline)]">
            {actionable.map((r) => <Row key={r.id} r={r} />)}
          </ul>
        )}
      </Card>

      {upcoming.length > 0 && (
        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-[color:var(--color-hairline)] px-5 py-3">
            <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Yaklaşanlar ({upcoming.length})</h2>
          </div>
          <ul className="divide-y divide-[color:var(--color-hairline)] opacity-80">
            {upcoming.map((r) => <Row key={r.id} r={r} dim />)}
          </ul>
        </Card>
      )}
    </>
  );
}
