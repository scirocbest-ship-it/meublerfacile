"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Nos packs", href: "#packs" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f5f5f0]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(26,26,20,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-0.5 select-none">
          <span className="font-light text-[#6b6b5e] text-lg tracking-tight">meubler</span>
          <span className="font-bold text-xl tracking-tight text-[#1a1a14]">Facile</span>
          <span className="font-bold text-xl text-[#c9ed76]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#6b6b5e] hover:text-[#1a1a14] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
            Devis gratuit
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#1a1a14]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-[#f5f5f0] border-t border-[#1a1a14]/8 px-6 py-6 flex flex-col gap-5"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#1a1a14]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary text-center text-sm"
            >
              Devis gratuit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
