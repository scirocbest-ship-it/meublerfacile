"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

const categories = [
  {
    title: "Chambre",
    items: [
      "1 × Sommier 140 × 190 cm", "1 × Matelas 140 × 190 × 18 cm",
      "1 × Bureau", "1 × Chaise de bureau",
      "1 × Armoire avec penderie et étagères",
      "1 × Couette 160 × 200 cm", "2 × Oreillers 60 × 60 cm",
      "1 × Set de linge de lit", "1 × Table de chevet",
      "1 × Lampe de chevet", "2 × Objets de décoration",
    ],
  },
  {
    title: "Salon",
    items: [
      "1 × Canapé 3 places", "2 × Coussins", "1 × Fauteuil",
      "1 × Table basse", "1 × Table à manger", "4 × Chaises",
      "1 × Étagère", "4 × Objets de décoration",
    ],
  },
  {
    title: "Cuisine & Entretien",
    items: [
      "6 × Assiettes plates", "6 × Assiettes creuses",
      "6 × Assiettes dessert", "6 × Verres à eau",
      "1 × Ménagère 24 couverts", "1 × Casseroles tous feux",
      "1 × Set de 2 poêles tous feux", "1 × Planche à découper",
      "4 × Couteaux de cuisine", "1 × Balai serpillière",
      "1 × Étendoire à linge", "1 × Détecteur de fumée NF",
      "Ampoules LED E27 & E14 incluses",
    ],
  },
];

export default function FurnitureList() {
  const [active, setActive] = useState(0);

  return (
    <section id="detail-mobilier" className="bg-[#f5f5f0] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-12">
          <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Détail complet
          </span>
          <h2 className="section-title">
            Ce qui est inclus<br />dans chaque pack.
          </h2>
          <p className="section-sub mt-4">
            Du mobilier neuf à la petite cuillère — tout livré, tout installé.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? "bg-[#1a1a14] text-white"
                  : "bg-white text-[#6b6b5e] hover:text-[#1a1a14]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories[active].items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#1a1a14] text-sm">
                <CheckCircle size={16} weight="fill" className="text-[#c9ed76] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
