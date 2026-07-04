"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type FileObj = { name: string; created_at?: string; metadata?: { size?: number } };

export default function FileManager({ customerId }: { customerId: string }) {
  const [supabase] = useState(() => createSupabaseBrowser());
  const [files, setFiles] = useState<FileObj[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.storage
      .from("customer-files")
      .list(customerId, { sortBy: { column: "created_at", order: "desc" } });
    setFiles((data ?? []) as FileObj[]);
  }, [supabase, customerId]);

  useEffect(() => {
    load();
  }, [load]);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    await supabase.storage
      .from("customer-files")
      .upload(`${customerId}/${Date.now()}-${file.name}`, file, { upsert: false });
    setBusy(false);
    e.target.value = "";
    load();
  };

  const open = async (name: string) => {
    const { data } = await supabase.storage
      .from("customer-files")
      .createSignedUrl(`${customerId}/${name}`, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const remove = async (name: string) => {
    await supabase.storage.from("customer-files").remove([`${customerId}/${name}`]);
    load();
  };

  return (
    <div>
      <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] px-4 py-3 text-sm font-medium text-[color:var(--color-mist)] hover:border-[color:var(--color-gold)]/50">
        <input type="file" className="hidden" onChange={upload} disabled={busy} />
        {busy ? "Yükleniyor…" : "＋ Belge yükle"}
      </label>
      <ul className="space-y-2">
        {files.map((f) => (
          <li key={f.name} className="flex items-center justify-between gap-2 rounded-lg border border-[color:var(--color-hairline)] px-3 py-2 text-sm">
            <button onClick={() => open(f.name)} className="truncate text-left text-[color:var(--color-cloud)] hover:text-[color:var(--color-sky)]" title={f.name}>
              {f.name.replace(/^\d+-/, "")}
            </button>
            <button onClick={() => remove(f.name)} className="ticket shrink-0 text-[0.62rem] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-stamp)]">
              sil
            </button>
          </li>
        ))}
        {files.length === 0 && (
          <li className="text-xs text-[color:var(--color-mist-2)]">Henüz belge yok.</li>
        )}
      </ul>
    </div>
  );
}
