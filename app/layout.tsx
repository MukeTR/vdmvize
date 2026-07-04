import type { Metadata } from "next";
import { Sora, Inter, Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif-logo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono-tkt",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vdmturizm.com"),
  title: {
    default: "VDM Vize Danışmanlık — Vizeniz için doğru rota",
    template: "%s · VDM Vize Danışmanlık",
  },
  description:
    "Schengen, İngiltere ve Amerika vizelerinde 20 yılı aşkın tecrübe. Ücretsiz ön değerlendirme, belge hazırlığı ve zor randevular için hızlı çözüm. İstanbul / Beyoğlu.",
  keywords: [
    "vize danışmanlık",
    "schengen vizesi",
    "amerika vizesi",
    "ingiltere vizesi",
    "vize randevu",
    "İstanbul vize",
  ],
  openGraph: {
    title: "VDM Vize Danışmanlık — Vizeniz için doğru rota",
    description:
      "Schengen, İngiltere ve Amerika vizelerinde güvenilir çözüm ortağınız. Ücretsiz ön değerlendirme için iletişime geçin.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
