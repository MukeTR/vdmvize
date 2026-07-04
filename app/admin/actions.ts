"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

async function db() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return { supabase, user };
}

const s = (v: FormDataEntryValue | null) => {
  const t = (v ?? "").toString().trim();
  return t.length ? t : null;
};

export async function signOutAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- leads ----------
export async function createLeadAction(formData: FormData) {
  const { supabase } = await db();
  await supabase.from("leads").insert({
    name: s(formData.get("name")),
    phone: s(formData.get("phone")),
    email: s(formData.get("email")),
    visa_type: s(formData.get("visa_type")),
    note: s(formData.get("note")),
    source: s(formData.get("source")) ?? "manual",
    status: s(formData.get("status")) ?? "new",
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(formData: FormData) {
  const { supabase, user } = await db();
  const id = s(formData.get("id"))!;
  const status = s(formData.get("status"))!;
  const lost_reason = status === "lost" ? s(formData.get("lost_reason")) : null;
  await supabase.from("leads").update({ status, lost_reason }).eq("id", id);
  await supabase.from("activities").insert({
    entity_type: "lead",
    entity_id: id,
    author: user.id,
    kind: "status_change",
    body: `Durum güncellendi: ${status}`,
  });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin");
}

export async function convertLeadAction(formData: FormData) {
  const { supabase } = await db();
  const leadId = s(formData.get("id"))!;
  const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (!lead) redirect("/admin/leads");
  const { data: customer } = await supabase
    .from("customers")
    .insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      notes: lead.note,
      lead_id: lead.id,
    })
    .select("id")
    .single();
  await supabase.from("leads").update({ status: "won" }).eq("id", leadId);
  revalidatePath("/admin");
  if (customer) redirect(`/admin/customers/${customer.id}`);
  redirect("/admin/customers");
}

// ---------- activities ----------
export async function addActivityAction(formData: FormData) {
  const { supabase, user } = await db();
  const entity_type = s(formData.get("entity_type"))!;
  const entity_id = s(formData.get("entity_id"))!;
  const body = s(formData.get("body"));
  if (!body) return;
  await supabase.from("activities").insert({
    entity_type,
    entity_id,
    author: user.id,
    kind: "note",
    body,
  });
  revalidatePath(`/admin/${entity_type === "lead" ? "leads" : "customers"}/${entity_id}`);
}

// ---------- customers ----------
export async function createCustomerAction(formData: FormData) {
  const { supabase } = await db();
  const { data } = await supabase
    .from("customers")
    .insert({
      name: s(formData.get("name")),
      phone: s(formData.get("phone")),
      email: s(formData.get("email")),
      notes: s(formData.get("notes")),
    })
    .select("id")
    .single();
  revalidatePath("/admin/customers");
  if (data) redirect(`/admin/customers/${data.id}`);
}

export async function updateCustomerAction(formData: FormData) {
  const { supabase } = await db();
  const id = s(formData.get("id"))!;
  await supabase
    .from("customers")
    .update({
      name: s(formData.get("name")),
      phone: s(formData.get("phone")),
      email: s(formData.get("email")),
      notes: s(formData.get("notes")),
    })
    .eq("id", id);
  revalidatePath(`/admin/customers/${id}`);
}

// ---------- visas ----------
export async function addVisaAction(formData: FormData) {
  const { supabase } = await db();
  const customer_id = s(formData.get("customer_id"))!;
  await supabase.from("visas").insert({
    customer_id,
    country: s(formData.get("country")),
    visa_type: s(formData.get("visa_type")),
    issued_date: s(formData.get("issued_date")),
    valid_until: s(formData.get("valid_until")),
    notes: s(formData.get("notes")),
  });
  await supabase.rpc("generate_visa_reminders");
  revalidatePath(`/admin/customers/${customer_id}`);
  revalidatePath("/admin/reminders");
  revalidatePath("/admin");
}

export async function deleteVisaAction(formData: FormData) {
  const { supabase } = await db();
  const id = s(formData.get("id"))!;
  const customer_id = s(formData.get("customer_id"))!;
  await supabase.from("visas").delete().eq("id", id);
  revalidatePath(`/admin/customers/${customer_id}`);
  revalidatePath("/admin/reminders");
}

// ---------- reminders ----------
export async function markReminderAction(formData: FormData) {
  const { supabase } = await db();
  const id = s(formData.get("id"))!;
  const status = s(formData.get("status"))!; // done | snoozed | pending
  await supabase.from("visa_reminders").update({ status }).eq("id", id);
  revalidatePath("/admin/reminders");
  revalidatePath("/admin");
}
