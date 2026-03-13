import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SITE } from "@/lib/constants";

import "./globals.css";

import type { Metadata } from "next";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Servicios quiroprácticos especializados en Puerto Rico. Remodelación espinal, terapia láser, estudio miográfico y más.",
  keywords: [
    "quiropráctico",
    "Puerto Rico",
    "remodelación espinal",
    "terapia láser",
    "escoliosis",
    "ScoliBrace",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    locale: "es_PR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
