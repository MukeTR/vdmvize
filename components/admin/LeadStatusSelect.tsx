"use client";

import { useRef } from "react";
import { LEAD_STATUSES, statusMeta } from "@/lib/crm";
import { updateLeadStatusAction } from "@/app/admin/actions";

export default function LeadStatusSelect({
  id,
  status,
  className = "",
}: {
  id: string;
  status: string;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const m = statusMeta(status);
  return (
    <form ref={formRef} action={updateLeadStatusAction} className={className}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="cursor-pointer rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold outline-none"
        style={{ background: `${m.color}1a`, color: m.color, borderColor: `${m.color}55` }}
      >
        {LEAD_STATUSES.map((st) => (
          <option key={st.key} value={st.key} className="bg-white text-[color:var(--color-cloud)]">
            {st.label}
          </option>
        ))}
      </select>
    </form>
  );
}
