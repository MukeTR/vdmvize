"use client";

import { useRef } from "react";
import { APP_STAGES, appStageMeta } from "@/lib/crm";
import { updateApplicationStageAction } from "@/app/admin/actions";

export default function AppStageSelect({ id, stage }: { id: string; stage: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const m = appStageMeta(stage);
  return (
    <form ref={formRef} action={updateApplicationStageAction}>
      <input type="hidden" name="id" value={id} />
      <select
        name="stage"
        defaultValue={stage}
        onChange={() => formRef.current?.requestSubmit()}
        className="cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold outline-none"
        style={{ background: `${m.color}1a`, color: m.color, borderColor: `${m.color}55` }}
      >
        {APP_STAGES.map((st) => (
          <option key={st.key} value={st.key} className="bg-white text-[color:var(--color-cloud)]">
            {st.label}
          </option>
        ))}
      </select>
    </form>
  );
}
