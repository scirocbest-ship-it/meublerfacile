const steps = [
  {
    num: "01",
    title: "Pré-commandez",
    desc: "Choisissez votre pack mobilier selon le nombre de pièces. Remplissez le formulaire en ligne — aucun paiement requis.",
  },
  {
    num: "02",
    title: "On installe",
    desc: "Notre équipe livre, monte et nettoie. Cartons évacués. Déco placée. Couverture tirée. Vous n'avez plus rien à faire.",
  },
  {
    num: "03",
    title: "Vous louez",
    desc: "En 4 jours ouvrables, votre appartement est prêt. Meublé, équipé, conforme LMP/LMNP. Prêt à encaisser.",
  },
];

export default function Process() {
  return (
    <section id="comment-ca-marche" className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Comment ça marche
          </span>
          <h2 className="section-title">
            3 étapes.
            <br />
            <span className="text-stone-400">C'est tout.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+16px)] w-8 border-t-2 border-dashed border-[#c9ed76]" />
              )}
              <div className="py-8 md:py-0">
                <span
                  className="text-5xl font-bold block mb-4"
                  style={{ color: "#c9ed76" }}
                >
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="md:hidden border-b-2 border-dashed border-[#c9ed76]/40 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
