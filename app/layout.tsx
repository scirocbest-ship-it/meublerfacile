import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MeublerFacile — Ameublement clé en main pour investisseurs",
  description:
    "Pack mobilier, livraison, montage en 4 jours ouvrables. Votre bien prêt à louer, sans effort.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MeublerFacile — Ameublement clé en main",
    description: "Pack mobilier, livraison, montage en 4 jours. 100% clé en main.",
    url: "https://meublerfacile.com",
    siteName: "MeublerFacile",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
