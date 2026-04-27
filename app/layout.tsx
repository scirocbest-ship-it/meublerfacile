import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "meublerfacile.com — Ameublement clé en main pour investisseurs",
  description:
    "Livraison, montage, nettoyage en 4 jours. Choisissez votre pack et votre bien est prêt à louer.",
  openGraph: {
    title: "meublerfacile.com",
    description: "Ameublement clé en main pour investisseurs. 4 jours. Clé en main.",
    url: "https://meublerfacile.com",
    siteName: "meublerfacile.com",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
