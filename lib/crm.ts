// Shared CRM types, labels and helpers.

export const LEAD_STATUSES = [
  { key: "new", label: "Yeni", color: "#1c7fb2" },
  { key: "contacted", label: "İletişim kuruldu", color: "#8a6d10" },
  { key: "quoted", label: "Teklif verildi", color: "#7a4fc0" },
  { key: "in_process", label: "Başvuru sürecinde", color: "#c9922f" },
  { key: "won", label: "Kazanıldı", color: "#0e7a3c" },
  { key: "lost", label: "Kaybedildi", color: "#c0402b" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["key"];

export function statusMeta(key: string) {
  return LEAD_STATUSES.find((s) => s.key === key) ?? LEAD_STATUSES[0];
}

export const SOURCES = [
  { key: "website", label: "Web sitesi" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "phone", label: "Telefon" },
  { key: "referral", label: "Referans" },
  { key: "manual", label: "Elle eklendi" },
] as const;

export function sourceLabel(key: string) {
  return SOURCES.find((s) => s.key === key)?.label ?? key;
}

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string | null;
  visa_type: string | null;
  note: string | null;
  source: string;
  status: string;
  assigned_to: string | null;
  lost_reason: string | null;
};

export type Customer = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  lead_id: string | null;
};

export type Visa = {
  id: string;
  created_at: string;
  customer_id: string;
  country: string;
  visa_type: string | null;
  issued_date: string | null;
  valid_until: string;
  status: string;
  notes: string | null;
};

export type Reminder = {
  id: string;
  visa_id: string;
  customer_id: string;
  due_date: string;
  offset_days: number;
  status: string;
  note: string | null;
};

export type Activity = {
  id: string;
  created_at: string;
  entity_type: string;
  entity_id: string;
  author: string | null;
  kind: string;
  body: string;
};

const MONTHS = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

export function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function fmtDateTime(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** Days until a date (negative if past). */
export function daysUntil(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

/** Normalise a TR phone to wa.me / tel format. */
export function normalisePhone(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = "90" + d.slice(1);
  else if (d.length === 10) d = "90" + d;
  return d;
}

export function waLink(phone: string, message?: string) {
  const n = normalisePhone(phone);
  return message
    ? `https://wa.me/${n}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${n}`;
}

export function telLink(phone: string) {
  return `tel:+${normalisePhone(phone)}`;
}
