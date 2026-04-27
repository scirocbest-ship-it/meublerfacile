const projects = [
  {
    label: "Salon lumineux — parquet point de Hongrie",
    tag: "Loué en 6 jours",
    img: "/realisation-1.jpg",
  },
  {
    label: "Grand salon — double exposition",
    tag: "Pack populaire",
    img: "/realisation-2.jpg",
  },
  {
    label: "T3 avec mezzanine — verrières",
    tag: "Livré en 3 jours",
    img: "/realisation-3.jpg",
  },
];

export default function Projects() {
  return (
    <section id="realisations" className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Réalisations
          </span>
          <h2 className="section-title">Des appartements prêts à louer.</h2>
          <p className="section-sub">
            Lumineux, propres, décorés avec goût. Exactement ce que vos locataires cherchent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl aspect-[4/3] flex flex-col justify-end overflow-hidden relative group"
            >
              <img
                src={p.img}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
              <div className="relative z-10 p-6">
                <span className="inline-block bg-white/90 backdrop-blur text-stone-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {p.tag}
                </span>
                <p className="text-white font-semibold drop-shadow">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
