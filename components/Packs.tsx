"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

const packs = [
  { id: "T2", rooms: "1 ch + salon", price: "3 150", pieces: 2 },
  { id: "T3", rooms: "2 ch + salon", price: "4 050", pieces: 3 },
  { id: "T4", rooms: "3 ch + salon", price: "4 800", pieces: 4, popular: true },
  { id: "T5", rooms: "4 ch + salon", price: "5 550", pieces: 5 },
  { id: "T6", rooms: "5 ch + salon", price: "6 300", pieces: 6 },
];

const included = [
  "Mobilier chambre(s) complet — neuf",
  "Canapé, table basse, table à manger",
  "Vaisselle & ustensiles cuisine",
  "Livraison sur site",
  "Montage & installation",
  "Nettoyage + évacuation cartons",
  "Décoration incluse",
  "Conforme décret LMP/LMNP",
];

export default function Packs() {
  const [selected, setSelected] = useState<string | null>(null);

  function goToContact(id: string) {
    setSelected(id);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  return (
    <section id="packs" className="bg-[#f5f5f0] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14 max-w-xl">
          <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Tarifs HT tout inclus
          </span>
          <h2 className="section-title">
            Choisissez<br />votre pack.
          </h2>
          <p className="section-sub mt-4">
            Prix forfaitaires. Livraison, montage, nettoyage — tout est inclus.
          </p>
        </div>

        {/* Pack cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`relative group cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 hover:-translate-y-1 ${
                pack.popular
                  ? "bg-[#1a1a14] border-[#1a1a14]"
                  : "bg-white border-white hover:border-[#c9ed76] hover:shadow-lg"
              }`}
              onClick={() => goToContact(pack.id)}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-4 bg-[#c9ed76] text-[#1a1a14] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
                  Populaire
                </span>
              )}

              <div className={`text-xs font-bold tracking-[0.15em] uppercase mb-3 ${pack.popular ? "text-[#c9ed76]/70" : "text-[#6b6b5e]"}`}>
                Pack {pack.id}
              </div>

              <div className={`text-sm mb-4 leading-snug ${pack.popular ? "text-[#c9ed76]/60" : "text-[#6b6b5e]"}`}>
                {pack.rooms}
              </div>

              <div className={`text-3xl font-bold mb-0.5 ${pack.popular ? "text-white" : "text-[#1a1a14]"}`}>
                {pack.price}€
              </div>
              <div className={`text-xs ${pack.popular ? "text-[#c9ed76]/50" : "text-[#6b6b5e]"}`}>
                HT · tout inclus
              </div>

              <button
                className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  pack.popular
                    ? "bg-[#c9ed76] text-[#1a1a14] hover:bg-[#b8dc60]"
                    : "bg-[#f5f5f0] text-[#1a1a14] group-hover:bg-[#c9ed76]"
                }`}
              >
                Choisir ce pack
              </button>
            </div>
          ))}
        </div>

        {/* Included items */}
        <div className="bg-[#1a1a14] rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="md:w-64 shrink-0">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#c9ed76] mb-3">
                Inclus dans chaque pack
              </p>
              <p className="text-[#f5f5f0]/60 text-sm leading-relaxed">
                Du mobilier neuf à la cuillère. Tout est sélectionné, livré et installé.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 flex-1">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#f5f5f0]/80 text-sm">
                  <CheckCircle size={16} weight="fill" className="text-[#c9ed76] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-[#6b6b5e] text-sm mt-6">
          T7 et plus ?{" "}
          <a href="#contact" className="text-[#1a1a14] font-semibold underline underline-offset-2 hover:text-[#7aaa2e] transition-colors">
            Contactez-nous pour une offre sur mesure
          </a>
        </p>
      </div>
    </section>
  );
}
