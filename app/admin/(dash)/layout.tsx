import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const today = new Date().toISOString().slice(0, 10);
  const { count } = await supabase
    .from("visa_reminders")
    .select("id", { count: "exact", head: true })
    .lte("due_date", today)
    .eq("status", "pending");

  return (
    <AdminShell userName={profile?.full_name || user.email || "Ekip"} dueCount={count || 0}>
      {children}
    </AdminShell>
  );
}
