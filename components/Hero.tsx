export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-stone-900 overflow-hidden">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* wordmark */}
        <div className="mb-12">
          <span className="text-white/40 text-sm font-medium tracking-[0.3em] uppercase">
            meublerfacile.com
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
          Meublez votre bien
          <br />
          <span className="text-brand-500">en 4 jours.</span>
          <br />
          Sans effort.
        </h1>

        <p className="text-xl text-white/60 max-w-lg mb-12 leading-relaxed">
          Livraison, montage et nettoyage inclus. Votre appartement prêt à louer,
          clé en main. Tarifs HT tout compris.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="btn-primary text-center">
            Demander un devis
          </a>
          <a
            href="#packs"
            className="inline-block border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-white/50 transition-all duration-200 text-center"
          >
            Voir les packs
          </a>
        </div>

        {/* trust bar */}
        <div className="mt-20 flex flex-wrap gap-8 items-center">
          {[
            { value: "4 jours", label: "délai garanti" },
            { value: "5 packs", label: "T2 à T6" },
            { value: "100%", label: "clé en main" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-white/40 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
