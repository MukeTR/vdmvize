// Central source of truth — real VDM Vize Danışmanlık details.

export const site = {
  name: "VDM Vize Danışmanlık",
  legal: "VDM Turizm Danışmanlık Ltd. Şti.",
  tagline: "Vize Danışmanlığında Güvenilir Çözüm Ortağınız",
  city: "İstanbul · Beyoğlu",

  phoneDisplay: "0212 251 79 57",
  phoneHref: "tel:+902122517957",

  whatsappDisplay: "0541 347 36 42",
  whatsappNumber: "905413473642", // wa.me format
  email: "vize@vdmturizm.com",

  address: "Gümüşsuyu Mah. Ayazpaşa Cami Sk. No:2/A Beyoğlu / İstanbul",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Gümüşsuyu+Mah.+Ayazpaşa+Cami+Sk.+No:2+Beyoğlu+İstanbul",

  instagram: "https://instagram.com/vdmvizedanismanlik",
  instagramHandle: "@vdmvizedanismanlik",

  hours: [
    { d: "Pazartesi – Cuma", h: "09:00 – 18:00" },
    { d: "Cumartesi", h: "09:00 – 14:00" },
    { d: "Pazar", h: "Kapalı" },
  ],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// --- stats (from the client's own site) ---
export const stats = [
  { n: 20, prefix: "", suffix: "+", group: false, label: "Yıl sektör tecrübesi" },
  { n: 9500, prefix: "", suffix: "+", group: true, label: "Başarılı başvuru" },
  { n: 12, prefix: "", suffix: "", group: false, label: "Kişilik uzman ekip" },
  { n: 100, prefix: "%", suffix: "", group: false, label: "Sürece özel yaklaşım" },
] as const;

// --- İstanbul hub for the globe ---
export const HUB = { lat: 41.0082, lng: 28.9784, label: "İstanbul" };

// --- visa destinations flown to on the globe ---
export const DESTINATIONS = [
  { city: "Paris", iata: "CDG", country: "Fransa", flag: "🇫🇷", lat: 48.8566, lng: 2.3522 },
  { city: "Berlin", iata: "BER", country: "Almanya", flag: "🇩🇪", lat: 52.52, lng: 13.405 },
  { city: "Londra", iata: "LHR", country: "İngiltere", flag: "🇬🇧", lat: 51.5074, lng: -0.1278 },
  { city: "Roma", iata: "FCO", country: "İtalya", flag: "🇮🇹", lat: 41.9028, lng: 12.4964 },
  { city: "Atina", iata: "ATH", country: "Yunanistan", flag: "🇬🇷", lat: 37.9838, lng: 23.7275 },
  { city: "Amsterdam", iata: "AMS", country: "Hollanda", flag: "🇳🇱", lat: 52.3676, lng: 4.9041 },
  { city: "Madrid", iata: "MAD", country: "İspanya", flag: "🇪🇸", lat: 40.4168, lng: -3.7038 },
  { city: "Viyana", iata: "VIE", country: "Avusturya", flag: "🇦🇹", lat: 48.2082, lng: 16.3738 },
  { city: "New York", iata: "JFK", country: "Amerika", flag: "🇺🇸", lat: 40.7128, lng: -74.006 },
] as const;

// --- brief services (kept short by design — every card routes to contact) ---
export const services = [
  {
    code: "SCH",
    title: "Schengen Vizesi",
    line: "Fransa, Almanya, İtalya, Yunanistan ve tüm Schengen ülkeleri için dosyanızı baştan sona biz hazırlarız.",
  },
  {
    code: "UK",
    title: "İngiltere Vizesi",
    line: "Turistik, ticari ve öğrenci başvurularında belge ve randevu sürecinin tamamı tek elden.",
  },
  {
    code: "USA",
    title: "Amerika Vizesi",
    line: "DS-160, mülakat hazırlığı ve randevu stratejisiyle ABD başvurunuzda yanınızdayız.",
  },
  {
    code: "FREE",
    title: "Ücretsiz Ön Değerlendirme",
    line: "Profilinizi inceleyip en doğru vize tipini ve yol haritasını ücretsiz belirleriz.",
  },
] as const;

// --- process (a real sequence → numbering is justified) ---
export const steps = [
  {
    n: "01",
    title: "Ön Değerlendirme",
    line: "Profilinizi ve seyahat amacınızı konuşuyoruz; en uygun vize tipini birlikte belirliyoruz.",
  },
  {
    n: "02",
    title: "Belge & Randevu",
    line: "Evraklarınızı eksiksiz hazırlıyor, zor açılan randevuları sizin için buluyoruz.",
  },
  {
    n: "03",
    title: "Vize & Seyahat",
    line: "Başvuru takibinden uçak, otel ve transfere kadar yolculuğunuzu tamamlıyoruz.",
  },
] as const;
