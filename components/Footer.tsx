const links = [
  { label: "Nos packs", href: "#packs" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Détail mobilier", href: "#detail-mobilier" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a14] border-t border-white/8 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <a href="#" className="flex items-baseline gap-0.5 select-none">
            <span className="font-light text-white/40 text-lg tracking-tight">meubler</span>
            <span className="font-bold text-xl tracking-tight text-white">Facile</span>
            <span className="font-bold text-xl text-[#c9ed76]">.</span>
          </a>

          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} MeublerFacile — Tous droits réservés</span>
          <span className="text-white/20">Pack mobilier · Livraison · Montage · 100% clé en main</span>
        </div>
      </div>
    </footer>
  );
}
