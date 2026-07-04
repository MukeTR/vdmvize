import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { StatCard, StatusBadge, PageTitle, Card } from "@/components/admin/ui";
import { LEAD_STATUSES, OPEN_STAGES, fmtDate, fmtDateTime, daysUntil, fmtMoney, waLink, telLink } from "@/lib/crm";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import { toggleTaskAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function renewalMsg(name: string, country: string, date: string) {
  return `Merhaba ${name}, ${country} vizenizin geçerlilik süresi ${fmtDate(date)} tarihinde doluyor. Yeni seyahat planınız için VDM olarak size yardımcı olmak isteriz.`;
}

export default async function Dashboard() {
  const supabase = await createSupabaseServer();
  const today = new Date().toISOString().slice(0, 10);
  const in21 = new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10);

  const [
    { data: leads },
    { count: customerCount },
    { data: dueReminders },
    { data: apps },
    { data: tasks },
  ] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("customers").select("id", { count: "exact", head: true }),
    supabase
      .from("visa_reminders")
      .select("*, customers(name,phone), visas(country,valid_until)")
      .lte("due_date", today)
      .eq("status", "pending")
      .order("due_date", { ascending: true }),
    supabase.from("applications").select("*, customers(name,phone)"),
    supabase.from("tasks").select("*").eq("done", false).order("due_at", { ascending: true, nullsFirst: false }),
  ]);

  const allLeads = leads ?? [];
  const newLeads = allLeads.filter((l) => l.status === "new").length;
  const due = dueReminders ?? [];
  const allApps = (apps ?? []) as any[];
  const openApps = allApps.filter((a) => OPEN_STAGES.includes(a.stage));
  const expected = openApps.reduce((s, a) => s + Number(a.service_fee || 0), 0);
  const appointments = allApps
    .filter((a) => a.appointment_at && a.appointment_at.slice(0, 10) >= today && a.appointment_at.slice(0, 10) <= in21)
    .sort((a, b) => a.appointment_at.localeCompare(b.appointment_at));
  const openTasks = tasks ?? [];
  const dueTasks = openTasks.filter((t) => !t.due_at || t.due_at <= today);

  const counts = LEAD_STATUSES.map((st) => ({ ...st, n: allLeads.filter((l) => l.status === st.key).length }));
  const maxCount = Math.max(1, ...counts.map((c) => c.n));

  return (
    <>
      <PageTitle title="Panel" subtitle="VDM Vize CRM — genel bakış" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Yeni lead" value={newLeads} href="/admin/leads" accent="var(--color-sky)" />
        <StatCard label="Açık başvuru" value={openApps.length} href="/admin/applications" hint={`Beklenen ${fmtMoney(expected)}`} accent="var(--color-gold-ink)" />
        <StatCard label="Bugün aranacak" value={due.length} href="/admin/reminders" accent="var(--color-stamp)" hint="Vize bitiş hatırlatması" />
        <StatCard label="Bugün yapılacak" value={dueTasks.length} href="/admin/tasks" hint={`${appointments.length} yaklaşan randevu`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* reminders */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Bugün aranacaklar</h2>
            <Link href="/admin/reminders" className="ticket text-[0.66rem] text-[color:var(--color-gold-ink)] hover:underline">Tümü →</Link>
          </div>
          {due.length === 0 ? (
            <p className="py-8 text-center text-sm text-[color:var(--color-mist)]">Bugün için hatırlatma yok. 🎉</p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-hairline)]">
              {due.slice(0, 5).map((r: any) => {
                const c = r.customers, v = r.visas, dleft = daysUntil(v.valid_until);
                return (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-[color:var(--color-cloud)]">{c.name}</div>
                      <div className="ticket text-[0.7rem] text-[color:var(--color-mist)]">
                        {v.country} · {fmtDate(v.valid_until)}{" "}
                        <span className={dleft < 0 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}>({dleft < 0 ? `${-dleft}g geçti` : `${dleft}g`})</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <a href={waLink(c.phone, renewalMsg(c.name, v.country, v.valid_until))} target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-wa)]/12 text-[color:var(--color-wa-ink)]"><WaIcon className="h-3.5 w-3.5" /></a>
                      <a href={telLink(c.phone)} className="grid h-8 w-8 place-items-center rounded-lg border border-[color:var(--color-hairline-2)] text-[color:var(--color-cloud)]"><PhoneIcon className="h-3.5 w-3.5" /></a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* tasks */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Bugün yapılacaklar</h2>
            <Link href="/admin/tasks" className="ticket text-[0.66rem] text-[color:var(--color-gold-ink)] hover:underline">Tümü →</Link>
          </div>
          {dueTasks.length === 0 ? (
            <p className="py-8 text-center text-sm text-[color:var(--color-mist)]">Açık görev yok. 🎉</p>
          ) : (
            <ul className="space-y-2.5">
              {dueTasks.slice(0, 6).map((t) => {
                const d = t.due_at ? daysUntil(t.due_at) : null;
                return (
                  <li key={t.id} className="flex items-center gap-3">
                    <form action={toggleTaskAction}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="done" value="false" />
                      <button className="grid h-5 w-5 place-items-center rounded-full border border-[color:var(--color-hairline-2)]" />
                    </form>
                    <span className="flex-1 text-sm text-[color:var(--color-cloud)]">{t.title}</span>
                    {d !== null && d < 0 && <span className="ticket text-[0.62rem] text-[color:var(--color-stamp)]">{-d}g geçti</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* upcoming appointments */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Yaklaşan randevular</h2>
            <Link href="/admin/applications" className="ticket text-[0.66rem] text-[color:var(--color-gold-ink)] hover:underline">Tümü →</Link>
          </div>
          {appointments.length === 0 ? (
            <p className="py-8 text-center text-sm text-[color:var(--color-mist)]">Yaklaşan randevu yok.</p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-hairline)]">
              {appointments.slice(0, 5).map((a) => {
                const dleft = daysUntil(a.appointment_at);
                return (
                  <li key={a.id} className="py-3">
                    <Link href={`/admin/applications/${a.id}`} className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[color:var(--color-cloud)]">{a.customers?.name}</div>
                        <div className="ticket text-[0.7rem] text-[color:var(--color-mist)]">{a.country} · {fmtDateTime(a.appointment_at)}</div>
                      </div>
                      <span className={`ticket text-[0.7rem] font-bold ${dleft <= 3 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}`}>{dleft === 0 ? "bugün" : `${dleft}g`}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* pipeline */}
        <Card className="p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Lead pipeline</h2>
          <div className="space-y-2.5">
            {counts.map((c) => (
              <Link key={c.key} href="/admin/leads" className="block">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-[color:var(--color-mist)]">{c.label}</span>
                  <span className="ticket font-bold text-[color:var(--color-cloud)]">{c.n}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-hairline)]">
                  <div className="h-full rounded-full" style={{ width: `${(c.n / maxCount) * 100}%`, background: c.color }} />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
