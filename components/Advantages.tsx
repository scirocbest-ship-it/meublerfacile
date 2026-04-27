const advantages = [
  {
    icon: "○",
    title: "Simplicité",
    desc: "Sélectionnez votre pack en un clic selon le nombre de pièces. On s'occupe de tout, de la sélection des meubles au rangement des cartons.",
  },
  {
    icon: "◈",
    title: "Rapidité",
    desc: "Livraison, montage et nettoyage bouclés en 4 jours. Votre bien est opérationnel et prêt à accueillir vos locataires.",
  },
  {
    icon: "◇",
    title: "Rentabilité",
    desc: "Des packs conformes au décret LMP/LMNP, du mobilier neuf, tendance et durable. Une location meublée qui décolle sans friction.",
  },
];

export default function Advantages() {
  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-500 mb-4">
            Pourquoi nous
          </p>
          <h2 className="section-title">
            L'ameublement,
            <br />
            sans la complexité.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="bg-white rounded-2xl p-8 border border-stone-100 hover:border-brand-500/20 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl text-brand-500 block mb-6">{adv.icon}</span>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{adv.title}</h3>
              <p className="text-stone-500 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
