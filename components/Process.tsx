const steps = [
  {
    num: "01",
    title: "Choisissez",
    desc: "Sélectionnez le pack adapté à votre bien. Remplissez le formulaire ou appelez-nous directement.",
  },
  {
    num: "02",
    title: "On installe",
    desc: "Notre équipe livre, monte et nettoie. Cartons évacués. Vous n'avez rien à faire.",
  },
  {
    num: "03",
    title: "Vous louez",
    desc: "En 4 jours, votre appartement est prêt. Meublé, équipé, conforme LMNP. Prêt à encaisser.",
  },
];

export default function Process() {
  return (
    <section className="bg-stone-900 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-500 mb-4">
            Comment ça marche
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            3 étapes.
            <br />
            <span className="text-white/40">C'est tout.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+16px)] w-8 border-t border-dashed border-white/10" />
              )}
              <div className="py-8 md:py-0">
                <span className="text-5xl font-bold text-white/10 block mb-4">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="md:hidden border-b border-dashed border-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
