const projects = [
  {
    label: "T3 — Lyon 7e",
    tag: "Loué en 6 jours",
    bg: "from-stone-100 to-stone-200",
  },
  {
    label: "T4 — Bordeaux Centre",
    tag: "Pack populaire",
    bg: "from-[#e8f5c0] to-[#c9ed76]/60",
  },
  {
    label: "T2 — Paris 11e",
    tag: "Livré en 3 jours",
    bg: "from-zinc-100 to-zinc-200",
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
              className={`rounded-2xl bg-gradient-to-br ${p.bg} aspect-[4/3] flex flex-col justify-end p-6 overflow-hidden relative group`}
            >
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-all duration-300" />
              <div className="relative z-10">
                <span className="inline-block bg-white/90 backdrop-blur text-stone-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {p.tag}
                </span>
                <p className="text-stone-800 font-semibold">{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-stone-400 text-sm mt-8">
          Photos de réalisations disponibles sur demande.
        </p>
      </div>
    </section>
  );
}
