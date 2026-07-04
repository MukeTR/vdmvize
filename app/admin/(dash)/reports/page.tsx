import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, StatCard, Card } from "@/components/admin/ui";
import { LEAD_STATUSES, SOURCES, sourceLabel } from "@/lib/crm";

export const dynamic = "force-dynamic";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function Bars({
  data,
  color = "var(--color-gold-ink)",
}: {
  data: { label: string; n: number }[];
  color?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.n));
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-[color:var(--color-mist)]">{d.label}</span>
            <span className="ticket font-bold text-[color:var(--color-cloud)]">{d.n}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[color:var(--color-hairline)]">
            <div className="h-full rounded-full" style={{ width: `${(d.n / max) * 100}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ReportsPage() {
  const supabase = await createSupabaseServer();
  const today = new Date().toISOString().slice(0, 10);
  const in90 = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10);

  const [{ data: leads }, { count: customerCount }, { count: activeVisas }, { count: expiring90 }] =
    await Promise.all([
      supabase.from("leads").select("status,source,created_at"),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("visas").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("visas").select("id", { count: "exact", head: true }).gte("valid_until", today).lte("valid_until", in90),
    ]);

  const all = leads ?? [];
  const total = all.length;
  const won = all.filter((l) => l.status === "won").length;
  const lost = all.filter((l) => l.status === "lost").length;
  const closed = won + lost;
  const conversion = closed ? Math.round((won / closed) * 100) : 0;

  const byStatus = LEAD_STATUSES.map((s) => ({ label: s.label, n: all.filter((l) => l.status === s.key).length }));
  const bySource = SOURCES.map((s) => ({ label: sourceLabel(s.key), n: all.filter((l) => l.source === s.key).length })).filter((d) => d.n > 0);

  // last 6 months
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS[d.getMonth()] };
  });
  const byMonth = months.map((m) => ({
    label: m.label,
    n: all.filter((l) => {
      const d = new Date(l.created_at);
      return `${d.getFullYear()}-${d.getMonth()}` === m.key;
    }).length,
  }));

  return (
    <>
      <PageTitle title="Raporlar" subtitle="Lead ve müşteri özetleri" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam lead" value={total} accent="var(--color-sky)" />
        <StatCard label="Dönüşüm" value={`%${conversion}`} hint={`${won} kazanıldı / ${lost} kayıp`} />
        <StatCard label="Müşteri" value={customerCount ?? 0} />
        <StatCard label="90 günde dolan vize" value={expiring90 ?? 0} accent="var(--color-stamp)" hint={`${activeVisas ?? 0} aktif vize`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Aylık lead (son 6 ay)</h2>
          <Bars data={byMonth} color="var(--color-sky)" />
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Duruma göre</h2>
          <Bars data={byStatus} />
        </Card>
        {bySource.length > 0 && (
          <Card className="p-6">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">Kaynağa göre</h2>
            <Bars data={bySource} color="var(--color-gold-ink)" />
          </Card>
        )}
      </div>
    </>
  );
}
