"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { APP_STAGES, fmtMoney, fmtDate, daysUntil, priorityMeta } from "@/lib/crm";
import { updateApplicationStageAction } from "@/app/admin/actions";

type App = {
  id: string;
  country: string;
  visa_type: string | null;
  stage: string;
  appointment_at: string | null;
  service_fee: number;
  currency: string;
  priority: string;
  customers?: { name?: string };
};

export default function AppBoard({ apps }: { apps: App[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLInputElement>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  const drop = (stage: string) => {
    if (!dragId) return;
    const app = apps.find((a) => a.id === dragId);
    setOver(null);
    setDragId(null);
    if (!app || app.stage === stage) return;
    idRef.current!.value = dragId;
    stageRef.current!.value = stage;
    formRef.current!.requestSubmit();
  };

  return (
    <>
      <form ref={formRef} action={updateApplicationStageAction} className="hidden">
        <input ref={idRef} name="id" readOnly />
        <input ref={stageRef} name="stage" readOnly />
      </form>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {APP_STAGES.map((st) => {
          const items = apps.filter((a) => a.stage === st.key);
          return (
            <div
              key={st.key}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(st.key);
              }}
              onDragLeave={() => setOver((o) => (o === st.key ? null : o))}
              onDrop={() => drop(st.key)}
              className={`w-[264px] shrink-0 rounded-2xl p-1.5 transition-colors ${
                over === st.key ? "bg-[color:var(--color-gold)]/12 ring-1 ring-[color:var(--color-gold)]/40" : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-cloud)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: st.color }} />
                  {st.label}
                </span>
                <span className="ticket text-xs text-[color:var(--color-mist-2)]">{items.length}</span>
              </div>
              <div className="min-h-[48px] space-y-2.5">
                {items.map((a) => {
                  const pr = priorityMeta(a.priority);
                  const dleft = a.appointment_at ? daysUntil(a.appointment_at) : null;
                  return (
                    <div
                      key={a.id}
                      draggable
                      onDragStart={() => setDragId(a.id)}
                      onDragEnd={() => setDragId(null)}
                      className={`cursor-grab rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-3.5 shadow-[0_14px_36px_-32px_rgba(20,32,60,0.5)] transition-opacity active:cursor-grabbing ${
                        dragId === a.id ? "opacity-40" : ""
                      }`}
                    >
                      <Link href={`/admin/applications/${a.id}`} className="block">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[color:var(--color-cloud)] hover:text-[color:var(--color-gold-ink)]">
                            {a.customers?.name ?? "—"}
                          </span>
                          {a.priority === "high" && (
                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: pr.color }} title="Yüksek öncelik" />
                          )}
                        </div>
                        <div className="ticket mt-0.5 text-[0.7rem] text-[color:var(--color-mist)]">
                          {a.country}
                          {a.visa_type ? ` · ${a.visa_type}` : ""}
                        </div>
                        {a.appointment_at && (
                          <div className="ticket mt-1.5 flex items-center gap-1 text-[0.66rem]">
                            <span className="text-[color:var(--color-mist-2)]">📅 {fmtDate(a.appointment_at)}</span>
                            {dleft !== null && (
                              <span className={dleft < 0 ? "text-[color:var(--color-stamp)]" : dleft <= 3 ? "text-[color:var(--color-stamp)]" : "text-[color:var(--color-gold-ink)]"}>
                                ({dleft < 0 ? "geçti" : `${dleft}g`})
                              </span>
                            )}
                          </div>
                        )}
                        {a.service_fee > 0 && (
                          <div className="ticket mt-1 text-[0.72rem] font-bold text-[color:var(--color-gold-ink)]">
                            {fmtMoney(a.service_fee, a.currency)}
                          </div>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
