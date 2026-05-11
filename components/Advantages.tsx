const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M215.79,118.17a8,8,0,0,0-5.79-2.17h-59L171.43,36.2A8,8,0,0,0,156,28.83l-104,120a8,8,0,0,0,6,13.17h59L97.57,219.8A8,8,0,0,0,100,228a8,8,0,0,0,12-1l104-120A8,8,0,0,0,215.79,118.17Z"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,25,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89ZM84,168a12,12,0,1,1,12-12A12,12,0,0,1,84,168Zm0-56a12,12,0,1,1,12-12A12,12,0,0,1,84,112Zm44-68a12,12,0,1,1-12,12A12,12,0,0,1,128,44Zm44,68a12,12,0,1,1,12-12A12,12,0,0,1,172,112Z"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/>
  </svg>
);

const cards = [
  {
    Icon: BoltIcon,
    title: "Simplicité absolue",
    desc: "Un seul interlocuteur, un seul forfait. Vous choisissez votre pack, on s'occupe du reste — de la sélection des meubles à l'évacuation des cartons.",
  },
  {
    Icon: PaletteIcon,
    title: "Rendu impeccable",
    desc: "Une décoration soignée et intemporelle. Des meubles durables, tendance, choisis pour durer et séduire vos locataires dès la première visite.",
  },
  {
    Icon: ChartIcon,
    title: "Rentabilité directe",
    desc: "Packs forfaitaires tout inclus, conformes au décret LMNP. Votre bien est prêt à générer des revenus sans friction, sans délai, sans surprise.",
  },
];

export default function Advantages() {
  return (
    <section className="bg-[#f5f5f0] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-end mb-16">
          <div>
            <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
              Pourquoi nous
            </span>
            <h2 className="section-title">
              L'ameublement<br />sans la complexité.
            </h2>
          </div>
          <p className="text-[#6b6b5e] leading-relaxed">
            Vous investissez dans l'immobilier, pas dans la logistique. MeublerFacile prend tout en charge — du premier meuble au dernier carton.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-3xl p-8 border border-white hover:border-[#c9ed76] hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f0] group-hover:bg-[#c9ed76] flex items-center justify-center mb-6 transition-colors duration-300 text-[#1a1a14]">
                <Icon />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a14] mb-3">{title}</h3>
              <p className="text-[#6b6b5e] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
