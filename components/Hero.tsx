export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
            Pack mobilier · Conforme LMP / LMNP
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-[1.1] tracking-tight mb-6">
          Votre bien meublé,
          <br />
          prêt à louer.
          <br />
          <span style={{ color: "#7aaa2e" }}>En 4 jours ouvrables.</span>
        </h1>

        {/* Sub */}
        <p className="text-center text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Choisissez votre{" "}
          <span className="font-semibold text-stone-700">pack mobilier</span> selon le nombre de pièces — nous livrons, montons et nettoyons. Votre bien est prêt à louer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#packs" className="btn-primary text-center">
            Passer une pré-commande
          </a>
          <a href="#packs" className="btn-secondary text-center">
            Voir les packs
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border border-stone-100 rounded-2xl overflow-hidden divide-x divide-stone-100">
          <div className="py-7 text-center px-4">
            <div className="text-3xl font-bold text-stone-900 mb-1">4</div>
            <div className="text-xs text-stone-400 leading-snug">jours ouvrables</div>
          </div>
          <div className="py-7 text-center px-4">
            <div className="text-3xl font-bold text-stone-900 mb-1">5</div>
            <div className="text-xs text-stone-400 leading-snug">
              packs T2 à T6
              <br />
              et plus sur demande
            </div>
          </div>
          <div className="py-7 text-center px-4">
            <div className="text-3xl font-bold text-stone-900 mb-1">100%</div>
            <div className="text-xs text-stone-400 leading-snug">clé en main</div>
          </div>
        </div>
      </div>
    </section>
  );
}
