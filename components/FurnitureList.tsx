"use client";

import { useState } from "react";

const categories = [
  {
    title: "Chambre",
    note: "Tous nos meubles sont choisis pour leurs qualités de design, de robustesse et de prix maîtrisés.",
    items: [
      "1 × Sommier 140 × 190 cm",
      "1 × Matelas 140 × 190 × 18 cm",
      "1 × Bureau",
      "1 × Chaise de bureau",
      "1 × Armoire avec penderie et étagères",
      "1 × Couette 160 × 200 cm",
      "2 × Oreillers 60 × 60 cm",
      "1 × Set de linge de lit",
      "1 × Table de chevet",
      "1 × Lampe de chevet",
      "2 × Objets de décoration",
    ],
  },
  {
    title: "Salon",
    note: "Tous nos meubles sont choisis pour leurs qualités de design, de robustesse et de prix maîtrisés.",
    items: [
      "1 × Canapé 3 places",
      "2 × Coussins",
      "1 × Fauteuil",
      "1 × Table basse",
      "1 × Table à manger",
      "4 × Chaises",
      "1 × Étagère",
      "4 × Objets de décoration",
    ],
  },
  {
    title: "Cuisine & Entretien",
    note: "Tous nos ustensiles cuisine et entretien sont neufs.",
    items: [
      "6 × Assiettes plates",
      "6 × Assiettes creuses",
      "6 × Assiettes desserts",
      "6 × Verres à eau",
      "1 × Ménagère 24 couverts",
      "1 × Set de tasses",
      "1 × Passoire",
      "1 × Plat creux",
      "1 × Casseroles tous feux",
      "1 × Set de 2 poêles tous feux",
      "2 × Torchons",
      "1 × Éplucheur",
      "1 × Spatule",
      "1 × Louche",
      "1 × Planche à découper",
      "4 × Couteaux de cuisine",
      "1 × Brosse WC",
      "1 × Poubelle salle de bain",
      "1 × Balai serpillière",
      "1 × Balai",
      "1 × Set pelle / balayette",
      "1 × Étendoire à linge",
      "4 × Cintres",
      "1 × Détecteur de fumée norme NF",
      "Ampoules LED E27 & E14 incluses",
    ],
  },
];

export default function FurnitureList() {
  const [active, setActive] = useState(0);

  return (
    <section id="detail-mobilier" className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Détail complet
          </span>
          <h2 className="section-title">Ce qui est inclus dans chaque pack.</h2>
          <p className="section-sub">
            Du mobilier neuf à la petite cuillère — chaque élément est sélectionné et livré.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active === i
                  ? "bg-[#c9ed76] text-stone-900 shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-8 border border-stone-100">
          <ul className="grid sm:grid-cols-2 gap-3">
            {categories[active].items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-stone-700">
                <span className="w-5 h-5 rounded-full bg-[#c9ed76] text-stone-900 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-stone-400 text-xs mt-6 italic border-t border-stone-100 pt-5">
            {categories[active].note}
          </p>
        </div>
      </div>
    </section>
  );
}
