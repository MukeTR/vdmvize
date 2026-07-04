"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import Logo from "@/components/ui/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setErr("E-posta veya şifre hatalı.");
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next") || "/admin";
    router.push(next);
    router.refresh();
  };

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-4 py-3 text-[0.95rem] text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)] focus:ring-2 focus:ring-[color:var(--color-gold)]/20";

  return (
    <div className="paper-bg flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Logo size="md" align="center" />
          <p className="ticket mt-4 text-[0.62rem] tracking-[0.24em] text-[color:var(--color-mist-2)]">
            CRM · YÖNETİM PANELİ
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[22px] border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] p-8 shadow-[0_40px_80px_-50px_rgba(20,32,60,0.5)]"
        >
          <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--color-cloud)]">
            Giriş yap
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-mist)]">
            Sadece VDM ekibi erişebilir.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="ticket mb-1.5 block text-[0.62rem] tracking-[0.18em] text-[color:var(--color-mist-2)]">
                E-POSTA
              </label>
              <input
                type="email"
                autoComplete="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ekip@vdmturizm.com"
                required
              />
            </div>
            <div>
              <label className="ticket mb-1.5 block text-[0.62rem] tracking-[0.18em] text-[color:var(--color-mist-2)]">
                ŞİFRE
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className={field}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {err && (
            <p className="mt-4 rounded-lg border border-[color:var(--color-stamp)]/40 bg-[color:var(--color-stamp)]/8 px-3 py-2 text-sm text-[color:var(--color-stamp)]">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold mt-6 w-full rounded-full px-6 py-3 text-[0.95rem] font-bold disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor…" : "Giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
