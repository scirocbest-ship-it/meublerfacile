"use client";

import { useState } from "react";

const packs = [
  { id: "T2", label: "Pack T2", price: "3 150", desc: "1 chambre + 1 salon", popular: false },
  { id: "T3", label: "Pack T3", price: "4 050", desc: "2 chambres + 1 salon", popular: false },
  { id: "T4", label: "Pack T4", price: "4 800", desc: "3 chambres + 1 salon", popular: true },
  { id: "T5", label: "Pack T5", price: "5 550", desc: "4 chambres + 1 salon", popular: false },
  { id: "T6", label: "Pack T6", price: "6 300", desc: "5 chambres + 1 salon", popular: false },
];

const included = [
  "Mobilier chambre(s) complet",
  "Aménagement salon",
  "Vaisselle & ustensiles cuisine",
  "Livraison",
  "Montage",
  "Nettoyage & évacuation cartons",
  "Conforme décret LMP/LMNP",
];

export default function Packs() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  function goToForm() {
    setSelectedPack(null);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <section id="packs" className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Tarifs HT tout inclus
          </span>
          <h2 className="section-title">Choisissez votre pack mobilier.</h2>
          <p className="section-sub">
            Prix forfaitaires. Livraison · Montage · Nettoyage.
            <br />
            Tout est inclus.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-14">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-2xl p-4 sm:p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                pack.popular
                  ? "bg-[#c9ed76] border-[#c9ed76]"
                  : "bg-stone-50 border-stone-100"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-4 sm:left-7 bg-stone-900 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                  Populaire
                </span>
              )}
              <p className={`text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 ${pack.popular ? "text-stone-600" : "text-stone-400"}`}>
                {pack.label}
              </p>
              <p className={`text-xs sm:text-sm mb-3 sm:mb-5 leading-snug ${pack.popular ? "text-stone-700" : "text-stone-500"}`}>
                {pack.desc}
              </p>
              <p className="text-2xl sm:text-4xl font-bold text-stone-900 mb-0.5 sm:mb-1">{pack.price}€</p>
              <p className={`text-xs ${pack.popular ? "text-stone-600" : "text-stone-400"}`}>
                HT · tout inclus
              </p>
              <a
                href="#detail-mobilier"
                className={`text-xs underline underline-offset-2 mt-1 hidden sm:inline-block transition-colors ${
                  pack.popular ? "text-stone-600 hover:text-stone-900" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                Voir le détail du mobilier
              </a>
              <button
                onClick={() => setSelectedPack(pack.id)}
                className={`mt-3 sm:mt-5 w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  pack.popular
                    ? "bg-stone-900 text-white hover:bg-stone-800"
                    : "bg-white border border-stone-200 text-stone-900 hover:border-[#c9ed76]"
                }`}
              >
                Pré-commander
              </button>
            </div>
          ))}
        </div>

        {/* Included list */}
        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
          <p className="text-sm font-semibold text-stone-400 mb-5 uppercase tracking-widest">
            Inclus dans chaque pack
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-stone-700">
                <span className="w-5 h-5 rounded-full bg-[#c9ed76] text-stone-900 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-stone-400 text-sm mt-6">
          T7 et plus ?{" "}
          <a href="#contact" className="text-stone-600 underline hover:text-stone-900 transition-colors">
            Contactez-nous
          </a>{" "}
          pour une offre sur mesure.
        </p>
      </div>

      {/* Pre-order modal */}
      {selectedPack && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setSelectedPack(null)}
        >
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-10 h-10 bg-[#c9ed76] rounded-full flex items-center justify-center mb-5">
              <span className="text-stone-900 font-bold text-sm">{selectedPack}</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">
              Pack {selectedPack} sélectionné
            </h3>
            <p className="text-stone-500 leading-relaxed mb-6">
              Vous pouvez pré-commander votre pack et remplir vos informations. Nous vous
              recontacterons sous 48h pour confirmer la commande.{" "}
              <span className="font-semibold text-stone-700">Aucun paiement requis.</span>
            </p>
            <button
              onClick={goToForm}
              className="w-full bg-[#c9ed76] text-stone-900 font-semibold py-3.5 rounded-xl hover:bg-[#b8d960] transition-colors"
            >
              Accéder au formulaire →
            </button>
            <button
              onClick={() => setSelectedPack(null)}
              className="w-full mt-3 text-sm text-stone-400 hover:text-stone-600 transition-colors py-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
