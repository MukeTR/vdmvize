import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, StatCard } from "@/components/admin/ui";
import AppBoard from "@/components/admin/AppBoard";
import { OPEN_STAGES, fmtMoney } from "@/lib/crm";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const supabase = await createSupabaseServer();
  const { data: apps } = await supabase
    .from("applications")
    .select("*, customers(name)")
    .order("created_at", { ascending: false });
  const all = (apps ?? []) as any[];

  const openApps = all.filter((a) => OPEN_STAGES.includes(a.stage));
  const expected = openApps.reduce((s, a) => s + Number(a.service_fee || 0), 0);
  const won = all.filter((a) => a.stage === "approved").reduce((s, a) => s + Number(a.service_fee || 0), 0);

  return (
    <>
      <PageTitle
        title="Başvurular"
        subtitle={`${all.length} başvuru · kartı sürükleyip aşama değiştir`}
        action={
          <Link href="/admin/applications/new" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            + Başvuru ekle
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Açık başvuru" value={openApps.length} accent="var(--color-sky)" />
        <StatCard label="Beklenen ciro" value={fmtMoney(expected)} accent="var(--color-gold-ink)" hint="Açık başvurular" />
        <StatCard label="Kazanılan ciro" value={fmtMoney(won)} accent="var(--color-wa-ink)" hint="Onaylananlar" />
        <StatCard label="Toplam başvuru" value={all.length} />
      </div>

      <AppBoard apps={all} />
    </>
  );
}
