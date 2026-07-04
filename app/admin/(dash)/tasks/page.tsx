import { createSupabaseServer } from "@/lib/supabase/server";
import { PageTitle, Card } from "@/components/admin/ui";
import { fmtDate, daysUntil } from "@/lib/crm";
import { createTaskAction, toggleTaskAction, deleteTaskAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const supabase = await createSupabaseServer();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("due_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  const all = tasks ?? [];
  const open = all.filter((t) => !t.done);
  const done = all.filter((t) => t.done);

  const field =
    "rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-3.5 py-2.5 text-sm text-[color:var(--color-cloud)] outline-none focus:border-[color:var(--color-gold)]";

  const Item = ({ t }: { t: any }) => {
    const d = t.due_at ? daysUntil(t.due_at) : null;
    const overdue = d !== null && d < 0 && !t.done;
    return (
      <li className="flex items-center gap-3 px-5 py-3">
        <form action={toggleTaskAction}>
          <input type="hidden" name="id" value={t.id} />
          <input type="hidden" name="done" value={String(t.done)} />
          <button className={`grid h-5 w-5 place-items-center rounded-full border ${t.done ? "border-[color:var(--color-wa-ink)] bg-[color:var(--color-wa-ink)] text-white" : "border-[color:var(--color-hairline-2)]"}`}>
            {t.done && <span className="text-[0.7rem] leading-none">✓</span>}
          </button>
        </form>
        <div className="min-w-0 flex-1">
          <div className={`text-sm ${t.done ? "text-[color:var(--color-mist-2)] line-through" : "text-[color:var(--color-cloud)]"}`}>{t.title}</div>
          {t.due_at && (
            <div className={`ticket text-[0.66rem] ${overdue ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-mist-2)]"}`}>
              {fmtDate(t.due_at)} {d !== null && !t.done ? `· ${d < 0 ? `${-d}g geçti` : d === 0 ? "bugün" : `${d}g`}` : ""}
            </div>
          )}
        </div>
        <form action={deleteTaskAction}>
          <input type="hidden" name="id" value={t.id} />
          <button className="ticket text-[0.6rem] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-stamp)]">sil</button>
        </form>
      </li>
    );
  };

  return (
    <>
      <PageTitle title="Görevler" subtitle="Takip aramaları ve yapılacaklar" />

      <Card className="mb-6 p-5">
        <form action={createTaskAction} className="flex flex-wrap gap-2">
          <input name="title" placeholder="Yeni görev…" className={`${field} flex-1`} required />
          <input name="due_at" type="date" className={field} />
          <button className="btn-gold rounded-full px-5 py-2.5 text-sm font-bold">Ekle</button>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-[color:var(--color-hairline)] px-5 py-3">
          <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Açık görevler ({open.length})</h2>
        </div>
        {open.length === 0 ? (
          <p className="py-10 text-center text-sm text-[color:var(--color-mist)]">Açık görev yok. 🎉</p>
        ) : (
          <ul className="divide-y divide-[color:var(--color-hairline)]">{open.map((t) => <Item key={t.id} t={t} />)}</ul>
        )}
      </Card>

      {done.length > 0 && (
        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-[color:var(--color-hairline)] px-5 py-3">
            <h2 className="text-sm font-semibold text-[color:var(--color-cloud)]">Tamamlanan ({done.length})</h2>
          </div>
          <ul className="divide-y divide-[color:var(--color-hairline)] opacity-70">{done.slice(0, 15).map((t) => <Item key={t.id} t={t} />)}</ul>
        </Card>
      )}
    </>
  );
}
