// Service subpages — deliberately concise. Every page pushes to contact.

export type ServiceDetail = {
  slug: string;
  code: string;
  flag: string;
  title: string;
  route: string; // mono flight code, e.g. "IST → CDG"
  tagline: string;
  intro: string;
  points: string[];
  forWhom: string[];
  faq: { q: string; a: string }[];
};

export const servicesDetail: ServiceDetail[] = [
  {
    slug: "schengen-vizesi",
    code: "SCH",
    flag: "🇪🇺",
    title: "Schengen Vizesi",
    route: "IST → CDG",
    tagline: "Tek vizeyle 29 Avrupa ülkesi.",
    intro:
      "Fransa, Almanya, İtalya, Yunanistan, Hollanda, İspanya ve tüm Schengen ülkeleri için başvurunuzu doğru konsolosluk ve doğru kategoriyle planlıyoruz. Belge hazırlığından randevuya kadar süreci tek elden yönetiyoruz.",
    points: [
      "Profilinize en uygun konsolosluğu ve vize tipini belirleme",
      "Eksiksiz ve tutarlı dosya hazırlığı",
      "Zor açılan randevuların takibi ve alınması",
      "Seyahat, konaklama ve sigorta planlaması",
    ],
    forWhom: ["Turistik gezi", "Ticari & fuar", "Aile ziyareti", "Öğrenci & dil okulu"],
    faq: [
      {
        q: "Hangi ülkeye başvurmalıyım?",
        a: "İlk giriş yapacağınız ya da en çok kalacağınız ülkeye başvurulur. Doğru ülkeyi birlikte belirliyoruz.",
      },
      {
        q: "Ne kadar sürede sonuçlanır?",
        a: "Konsolosluk ve döneme göre değişir. Yoğunluğa göre en uygun zamanlama için sizi yönlendiriyoruz.",
      },
      {
        q: "Daha önce ret aldım, başvurabilir miyim?",
        a: "Evet. Ret nedenini analiz edip dosyanızı yeniden kurgulayarak başvuruyu güçlendiriyoruz.",
      },
    ],
  },
  {
    slug: "ingiltere-vizesi",
    code: "UK",
    flag: "🇬🇧",
    title: "İngiltere Vizesi",
    route: "IST → LHR",
    tagline: "Standart ziyaretçiden öğrenciye kadar.",
    intro:
      "Birleşik Krallık başvurularında online form, belge seti ve randevu sürecinin tamamını sizin için yönetiyoruz. Ziyaretçi, ticari ve öğrenci kategorilerinde tecrübeliyiz.",
    points: [
      "Online başvuru ve ödeme adımlarının yönetimi",
      "İngilizce belge ve niyet mektubu desteği",
      "Biyometrik randevu planlaması",
      "Güçlü, tutarlı bir başvuru dosyası",
    ],
    forWhom: ["Turistik ziyaret", "İş & toplantı", "Öğrenci", "Aile ziyareti"],
    faq: [
      {
        q: "Ne kadar süreli vize alabilirim?",
        a: "6 ay, 2, 5 veya 10 yıllık ziyaretçi vizeleri mümkündür. Profilinize göre en doğru seçeneği konuşuyoruz.",
      },
      {
        q: "Belgelerim İngilizce mi olmalı?",
        a: "Gerekli belgelerin çevirisi ve düzeni konusunda size destek oluyoruz.",
      },
      {
        q: "Randevu bulmak zor mu?",
        a: "Yoğun dönemlerde zor olabilir; uygun randevuyu sizin için takip edip alıyoruz.",
      },
    ],
  },
  {
    slug: "amerika-vizesi",
    code: "USA",
    flag: "🇺🇸",
    title: "Amerika (ABD) Vizesi",
    route: "IST → JFK",
    tagline: "DS-160'tan mülakata kadar yanınızda.",
    intro:
      "B1/B2 turistik ve ticari başvurularda DS-160 formu, randevu stratejisi ve mülakat hazırlığıyla en güçlü şekilde konsolosluğa çıkmanızı sağlıyoruz.",
    points: [
      "DS-160 formunun doğru ve eksiksiz doldurulması",
      "Randevu tarihleri için strateji ve takip",
      "Birebir mülakat hazırlığı ve prova",
      "Güçlü bağ ve niyet dosyasının kurgulanması",
    ],
    forWhom: ["Turistik gezi", "İş & fuar", "Aile & arkadaş ziyareti", "Tedavi & etkinlik"],
    faq: [
      {
        q: "Mülakatta ne sorulur?",
        a: "Seyahat amacı, Türkiye'deki bağlarınız ve geçmiş seyahatler sık sorulur. Prova ile hazırlıyoruz.",
      },
      {
        q: "Randevular çok ileri tarihli, ne yapabilirim?",
        a: "Uygun tarihleri takip ediyor, erken açılan randevuları sizin için yakalıyoruz.",
      },
      {
        q: "Daha önce ret aldım, tekrar deneyebilir miyim?",
        a: "Evet. Önceki başvurunuzu analiz edip yaklaşımı güçlendirerek yeniden başvuruyoruz.",
      },
    ],
  },
  {
    slug: "almanya-vizesi",
    code: "DE",
    flag: "🇩🇪",
    title: "Almanya Vizesi",
    route: "IST → BER",
    tagline: "Turistikten ticari ve fuar vizesine.",
    intro:
      "Almanya Schengen başvurularında yoğun randevu takvimini yönetip dosyanızı Alman konsolosluğunun beklentilerine göre hazırlıyoruz.",
    points: [
      "Turistik, ticari ve fuar (Messe) davetiyeli başvurular",
      "Randevu yoğunluğunun yönetimi",
      "Belge tercümesi ve düzeni desteği",
      "Süreç boyunca birebir takip",
    ],
    forWhom: ["Turistik", "Ticari & fuar", "Aile ziyareti", "Öğrenci"],
    faq: [
      {
        q: "Fuar (Messe) için davetiye şart mı?",
        a: "Ticari/fuar başvurularında davetiye başvuruyu güçlendirir; süreci birlikte planlıyoruz.",
      },
      {
        q: "Randevu ne zaman açılıyor?",
        a: "Dönemsel olarak değişir; uygun randevuyu takip edip sizin için alıyoruz.",
      },
      {
        q: "Hangi belgeler gerekli?",
        a: "Profilinize göre kişiye özel bir belge listesi çıkarıyoruz. İletişime geçin, birlikte netleştirelim.",
      },
    ],
  },
  {
    slug: "yunanistan-vizesi",
    code: "GR",
    flag: "🇬🇷",
    title: "Yunanistan Vizesi",
    route: "IST → ATH",
    tagline: "Komşuya hızlı ve doğru başvuru.",
    intro:
      "Yunanistan Schengen vizesinde adalar ve anakara seyahatleri için başvurunuzu doğru kategoride, hızlı ve eksiksiz hazırlıyoruz.",
    points: [
      "Turistik ve çoklu giriş başvuruları",
      "Ada tatili ve tur planına uygun dosya",
      "Randevu takibi ve alınması",
      "Seyahat sağlık sigortası ve rezervasyon desteği",
    ],
    forWhom: ["Ada & anakara tatili", "Aile gezisi", "Ticari ziyaret", "Öğrenci"],
    faq: [
      {
        q: "Adalara özel vize var mı?",
        a: "Standart Schengen vizesiyle Yunan adalarına gidebilirsiniz. Planınıza göre süreci kuruyoruz.",
      },
      {
        q: "Çok girişli vize alabilir miyim?",
        a: "Profilinize göre çok girişli vize hedeflenebilir; birlikte değerlendiriyoruz.",
      },
      {
        q: "Ne kadar sürede hazır olur?",
        a: "Döneme göre değişir; en uygun zamanlama için sizi yönlendiriyoruz.",
      },
    ],
  },
];

export function getService(slug: string) {
  return servicesDetail.find((s) => s.slug === slug);
}
