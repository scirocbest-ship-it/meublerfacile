const advantages = [
  {
    icon: "○",
    title: "Simplicité",
    desc: "Sélectionnez votre pack mobilier en un clic selon le nombre de pièces. On s'occupe de tout, de la sélection des meubles à l'évacuation des cartons.",
  },
  {
    icon: "◈",
    title: "Détail parfait",
    desc: "De la petite cuillère à la housse de couette en passant par la poubelle de salle de bain — tout est pensé dans le moindre détail.",
  },
  {
    icon: "◇",
    title: "Rentabilité",
    desc: "Des packs forfaitaires conformes au décret LMP/LMNP. Du mobilier neuf, tendance et durable. Une location meublée qui décolle sans friction.",
  },
];

export default function Advantages() {
  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Pourquoi nous
          </span>
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
              className="bg-white rounded-2xl p-8 border border-stone-100 hover:border-[#c9ed76] hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl block mb-6" style={{ color: "#7aaa2e" }}>
                {adv.icon}
              </span>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{adv.title}</h3>
              <p className="text-stone-500 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
