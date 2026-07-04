import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { StatCard, StatusBadge, PageTitle, Card } from "@/components/admin/ui";
import { LEAD_STATUSES, fmtDate, daysUntil, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";

export const dynamic = "force-dynamic";

function renewalMsg(name: string, country: string, date: string) {
  return `Merhaba ${name}, ${country} vizenizin geçerlilik süresi ${fmtDate(
    date
  )} tarihinde doluyor. Yeni seyahat planınız için VDM olarak size yardımcı olmak isteriz.`;
}

export default async function Dashboard() {
  const supabase = await createSupabaseServer();
  const today = new Date().toISOString().slice(0, 10);
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

  const [{ data: leads }, { count: customerCount }, { data: dueReminders }, { count: expiringCount }] =
    await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase
        .from("visa_reminders")
        .select("*, customers(name,phone), visas(country,valid_until,visa_type)")
        .lte("due_date", today)
        .eq("status", "pending")
        .order("due_date", { ascending: true }),
      supabase
        .from("visas")
        .select("id", { count: "exact", head: true })
        .gte("valid_until", today)
        .lte("valid_until", in30),
    ]);

  const allLeads = leads ?? [];
  const newLeads = allLeads.filter((l) => l.status === "new").length;
  const due = dueReminders ?? [];
  const counts = LEAD_STATUSES.map((st) => ({
    ...st,
    n: allLeads.filter((l) => l.status === st.key).length,
  }));
  const maxCount = Math.max(1, ...counts.map((c) => c.n));

  return (
    <>
      <PageTitle title="Panel" subtitle="VDM Vize CRM — genel bakış" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Yeni lead" value={newLeads} href="/admin/leads" accent="var(--color-sky)" />
        <StatCard label="Aktif müşteri" value={customerCount ?? 0} href="/admin/customers" />
        <StatCard
          label="Bugün aranacak"
          value={due.length}
          href="/admin/reminders"
          accent="var(--color-stamp)"
          hint="Vize bitiş hatırlatması"
        />
        <StatCard label="30 günde dolan vize" value={expiringCount ?? 0} accent="var(--color-gold-ink)" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* due reminders */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
              Bugün aranacaklar
            </h2>
            <Link href="/admin/reminders" className="ticket text-[0.66rem] tracking-[0.1em] text-[color:var(--color-gold-ink)] hover:underline">
              Tümü →
            </Link>
          </div>
          {due.length === 0 ? (
            <p className="py-8 text-center text-sm text-[color:var(--color-mist)]">
              Bugün için hatırlatma yok. 🎉
            </p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-hairline)]">
              {due.slice(0, 6).map((r: any) => {
                const c = r.customers;
                const v = r.visas;
                const dleft = daysUntil(v.valid_until);
                return (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-[color:var(--color-cloud)]">{c.name}</div>
                      <div className="ticket text-[0.72rem] text-[color:var(--color-mist)]">
                        {v.country} · bitiş {fmtDate(v.valid_until)}{" "}
                        <span className={dleft < 0 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}>
                          ({dleft < 0 ? `${-dleft} gün geçti` : `${dleft} gün kaldı`})
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={waLink(c.phone, renewalMsg(c.name, v.country, v.valid_until))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--color-wa)]/12 text-[color:var(--color-wa-ink)]"
                        title="WhatsApp"
                      >
                        <WaIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={telLink(c.phone)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--color-hairline-2)] text-[color:var(--color-cloud)]"
                        title="Ara"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* pipeline + recent */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
              Pipeline
            </h2>
            <div className="space-y-2.5">
              {counts.map((c) => (
                <Link key={c.key} href="/admin/leads" className="block">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-[color:var(--color-mist)]">{c.label}</span>
                    <span className="ticket font-bold text-[color:var(--color-cloud)]">{c.n}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-hairline)]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(c.n / maxCount) * 100}%`, background: c.color }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
              Son leadler
            </h2>
            <ul className="space-y-3">
              {allLeads.slice(0, 5).map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-medium text-[color:var(--color-cloud)]">{l.name}</div>
                      <div className="ticket text-[0.7rem] text-[color:var(--color-mist-2)]">
                        {l.visa_type || "—"} · {fmtDate(l.created_at)}
                      </div>
                    </div>
                    <StatusBadge status={l.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
