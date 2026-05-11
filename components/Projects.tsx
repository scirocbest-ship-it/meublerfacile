const projects = [
  {
    label: "Salon lumineux — parquet point de Hongrie",
    tag: "Loué en 6 jours",
    img: "https://picsum.photos/seed/salon1/800/600",
    tall: true,
  },
  {
    label: "Grand salon double exposition",
    tag: "Pack T4 populaire",
    img: "https://picsum.photos/seed/salon2/800/600",
  },
  {
    label: "T3 avec mezzanine — verrières",
    tag: "Livré en 3 jours",
    img: "https://picsum.photos/seed/salon3/800/600",
  },
];

const testimonials = [
  {
    text: "Livraison en 3 jours ouvrables, appartement impeccable. Les locataires ont adoré la déco.",
    author: "Sophie M.",
    role: "Investisseur LMP — Lyon",
  },
  {
    text: "J'ai 4 T3 meublés avec eux. Le rapport qualité/prix est imbattable, et c'est vraiment clé en main.",
    author: "Thomas D.",
    role: "Gestionnaire de patrimoine — Paris",
  },
];

export default function Projects() {
  return (
    <section id="realisations" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Réalisations
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="section-title">
              Des appartements<br />prêts à louer.
            </h2>
            <p className="text-[#6b6b5e] max-w-xs text-sm leading-relaxed md:text-right">
              Lumineux, propres, décorés avec goût. Exactement ce que vos locataires cherchent.
            </p>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {projects.map((p, i) => (
            <div
              key={p.label}
              className={`rounded-2xl overflow-hidden relative group bg-[#eaeae4] ${
                i === 0 ? "row-span-2" : ""
              }`}
              style={{ minHeight: i === 0 ? 400 : 190 }}
            >
              <img
                src={p.img}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a14]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                  {p.tag}
                </span>
                <p className="text-white font-semibold text-sm leading-snug">{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-[#f5f5f0] rounded-2xl p-7">
              <p className="text-[#1a1a14] font-medium leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#c9ed76] flex items-center justify-center text-[#1a1a14] font-bold text-sm">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1a1a14]">{t.author}</div>
                  <div className="text-xs text-[#6b6b5e]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
