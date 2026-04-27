const packs = [
  {
    label: "Pack T2",
    price: "3 150",
    desc: "1 chambre + 1 salon",
    popular: false,
  },
  {
    label: "Pack T3",
    price: "4 050",
    desc: "2 chambres + 1 salon",
    popular: false,
  },
  {
    label: "Pack T4",
    price: "4 800",
    desc: "3 chambres + 1 salon",
    popular: true,
  },
  {
    label: "Pack T5",
    price: "5 550",
    desc: "4 chambres + 1 salon",
    popular: false,
  },
  {
    label: "Pack T6",
    price: "6 300",
    desc: "5 chambres + 1 salon",
    popular: false,
  },
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
  return (
    <section id="packs" className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-500 mb-4">
            Tarifs HT tout inclus
          </p>
          <h2 className="section-title">Choisissez votre pack.</h2>
          <p className="section-sub">
            Livraison · Montage · Nettoyage. Tout est inclus.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {packs.map((pack) => (
            <div
              key={pack.label}
              className={`relative rounded-2xl p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                pack.popular
                  ? "bg-stone-900 border-stone-900 text-white"
                  : "bg-stone-50 border-stone-100 text-stone-900"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-7 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  Populaire
                </span>
              )}
              <p
                className={`text-sm font-semibold mb-1 ${
                  pack.popular ? "text-white/50" : "text-stone-400"
                }`}
              >
                {pack.label}
              </p>
              <p className={`text-sm mb-5 ${pack.popular ? "text-white/60" : "text-stone-500"}`}>
                {pack.desc}
              </p>
              <p
                className={`text-4xl font-bold mb-1 ${
                  pack.popular ? "text-white" : "text-stone-900"
                }`}
              >
                {pack.price}€
              </p>
              <p className={`text-xs ${pack.popular ? "text-white/40" : "text-stone-400"}`}>
                HT · tout inclus
              </p>
            </div>
          ))}
        </div>

        {/* included list */}
        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
          <p className="text-sm font-semibold text-stone-400 mb-5 uppercase tracking-widest">
            Inclus dans chaque pack
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-stone-700">
                <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="btn-primary">
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
