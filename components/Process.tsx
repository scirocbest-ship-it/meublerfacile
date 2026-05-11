const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A8.13,8.13,0,0,0,247.42,117ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm112,0a16,16,0,1,1,16-16A16,16,0,0,1,184,208ZM184,88h34.58l9.6,24H184Z"/>
  </svg>
);

const HouseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
    <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V160h48v56a8,8,0,0,0,8,8h56a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H168V152a8,8,0,0,0-8-8H96a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/>
  </svg>
);

const steps = [
  {
    Icon: ClipboardIcon,
    num: "01",
    title: "Vous choisissez",
    desc: "Sélectionnez votre pack selon le nombre de pièces. Remplissez le formulaire en 2 minutes. Aucun paiement requis, on revient vers vous sous 48h.",
  },
  {
    Icon: TruckIcon,
    num: "02",
    title: "On installe tout",
    desc: "Notre équipe livre, monte, installe, décore. Cartons évacués. Ampoules posées. Couverture tirée. Vous n'avez rien à faire.",
  },
  {
    Icon: HouseIcon,
    num: "03",
    title: "Vous louez",
    desc: "En 4 jours ouvrables, votre appartement est prêt à accueillir des locataires. Meublé, équipé, conforme LMNP. Prêt à encaisser.",
  },
];

export default function Process() {
  return (
    <section id="comment-ca-marche" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
              Comment ça marche
            </span>
            <h2 className="section-title">
              3 étapes.<br />
              <span className="text-[#6b6b5e]">C'est tout.</span>
            </h2>
          </div>
          <p className="text-[#6b6b5e] max-w-xs text-sm leading-relaxed md:text-right">
            De la pré-commande à la remise des clés : on gère chaque détail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-9 right-0 translate-x-1/2 w-1/2 h-px bg-[#c9ed76]/30 z-10" />
              )}
              <div className="bg-[#f5f5f0] rounded-3xl p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#c9ed76] flex items-center justify-center text-[#1a1a14]">
                    <step.Icon />
                  </div>
                  <span className="text-5xl font-bold text-[#1a1a14]/8 leading-none select-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a14] mb-3">{step.title}</h3>
                <p className="text-[#6b6b5e] leading-relaxed text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
