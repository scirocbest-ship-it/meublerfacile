"use client";

import { ArrowRight, Star } from "@phosphor-icons/react";
import ApartmentAnimation from "./ApartmentAnimation";

const items = [
  { delay: "0.1s", content: "badge" },
  { delay: "0.2s", content: "h1" },
  { delay: "0.3s", content: "p" },
  { delay: "0.4s", content: "ctas" },
  { delay: "0.5s", content: "stats" },
];

export default function Hero() {
  const fadeUp = (delay: string) => ({
    style: {
      animation: `fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay} both`,
    },
  });

  const fadeIn = (delay: string) => ({
    style: {
      animation: `fadeIn 0.8s ease-out ${delay} both`,
    },
  });

  return (
    <section className="relative min-h-[100dvh] bg-[#f5f5f0] flex items-stretch overflow-hidden">
      {/* Left — content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-24 pb-16 max-w-2xl">
        <div className="space-y-6">
          <div {...fadeUp("0.1s")}>
            <span className="inline-flex items-center gap-2 bg-[#1a1a14] text-[#c9ed76] text-xs font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full">
              <Star size={10} weight="fill" />
              Pack mobilier · Livraison · Montage
            </span>
          </div>

          <h1
            {...fadeUp("0.2s")}
            className="text-[clamp(2.6rem,6vw,4.5rem)] font-bold text-[#1a1a14] leading-[1.05] tracking-tight"
          >
            Votre bien<br />
            meublé,<br />
            <span className="text-[#7aaa2e]">prêt à louer.</span>
          </h1>

          <p {...fadeUp("0.3s")} className="text-lg text-[#6b6b5e] max-w-md leading-relaxed">
            Choisissez votre pack T2 → T6, on livre, monte et nettoie.{" "}
            <span className="font-semibold text-[#1a1a14]">En 4 jours ouvrables.</span>{" "}
            Conforme décret LMNP.
          </p>

          <div {...fadeUp("0.4s")} className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="#packs" className="btn-primary group">
              Voir les packs
              <ArrowRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#comment-ca-marche" className="btn-ghost">
              Comment ça marche
            </a>
          </div>

          <div
            {...fadeUp("0.5s")}
            className="flex items-center gap-6 pt-4 border-t border-[#1a1a14]/10"
          >
            {[
              { value: "4j", label: "délai livraison" },
              { value: "T2→T6", label: "5 packs dispo" },
              { value: "100%", label: "clé en main" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-bold text-[#1a1a14]">{value}</div>
                <div className="text-xs text-[#6b6b5e] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — animation panel */}
      <div
        {...fadeIn("0.3s")}
        className="hidden lg:flex flex-1 max-w-[52%] relative"
      >
        <div className="absolute inset-0 bg-[#1a1a14]" />
        <div className="absolute inset-0">
          <ApartmentAnimation />
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10" />
      </div>

      {/* Mobile animation preview */}
      <div
        {...fadeIn("0.5s")}
        className="lg:hidden absolute bottom-0 right-0 w-44 h-28 rounded-tl-2xl overflow-hidden"
      >
        <ApartmentAnimation />
      </div>
    </section>
  );
}
