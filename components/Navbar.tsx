"use client";

import { useState } from "react";

const links = [
  { label: "Nos packs", href: "#packs" },
  { label: "Comment ça marche ?", href: "#comment-ca-marche" },
  { label: "Nos réalisations", href: "#realisations" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="flex items-baseline select-none">
          <span className="font-light text-stone-500 text-lg tracking-tight">meubler</span>
          <span className="font-bold text-stone-900 text-lg tracking-tight">Facile</span>
          <span className="font-bold text-lg" style={{ color: "#c9ed76" }}>.</span>
          <span className="text-stone-400 text-sm">com</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#c9ed76] text-stone-900 text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#b8d960] transition-colors"
          >
            Pré-commande
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-stone-500"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <path
                d="M4 4L16 16M4 16L16 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-5 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-[#c9ed76] text-stone-900 text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-[#b8d960] transition-colors"
          >
            Pré-commande
          </a>
        </div>
      )}
    </header>
  );
}
