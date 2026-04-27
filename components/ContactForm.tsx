"use client";

import { useState } from "react";

type FormData = {
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  pack: string;
  message: string;
};

const initialForm: FormData = {
  nom: "",
  email: "",
  telephone: "",
  ville: "",
  pack: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#c9ed76] text-stone-900 text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-5">
            Pré-commande / Demande de renseignement
          </span>
          <h2 className="section-title">On vous rappelle sous 48h.</h2>
          <p className="section-sub">
            Remplissez le formulaire, notre équipe revient vers vous rapidement
            pour confirmer votre commande. Aucun paiement requis.
          </p>
        </div>

        {submitted ? (
          <div className="bg-stone-50 border border-stone-100 rounded-2xl p-12 text-center">
            <div className="w-14 h-14 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-brand-500 text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">
              Demande bien reçue.
            </h3>
            <p className="text-stone-500 leading-relaxed">
              Votre demande a bien été prise en compte. Nous vous rappelons sous
              48h pour validation selon les stocks disponibles.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  placeholder="Jean Dupont"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="jean@exemple.fr"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  required
                  placeholder="06 00 00 00 00"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  value={form.ville}
                  onChange={handleChange}
                  required
                  placeholder="Lyon"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Pack souhaité
              </label>
              <select
                name="pack"
                value={form.pack}
                onChange={handleChange}
                required
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all bg-white"
              >
                <option value="" disabled>
                  Sélectionnez votre pack
                </option>
                <option value="T2">Pack T2 — 3 150€ HT</option>
                <option value="T3">Pack T3 — 4 050€ HT</option>
                <option value="T4">Pack T4 — 4 800€ HT</option>
                <option value="T5">Pack T5 — 5 550€ HT</option>
                <option value="T6">Pack T6 — 6 300€ HT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Message <span className="text-stone-400 font-normal">(optionnel)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Précisions sur votre bien, délai souhaité…"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Envoi en cours…" : "Envoyer ma pré-commande"}
            </button>

            <p className="text-center text-stone-400 text-xs">
              Aucun paiement requis. Notre équipe vous recontacte sous 48h.
            </p>
          </form>
        )}
      </div>

      {/* footer */}
      <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-400 text-sm">
        <span className="font-semibold text-stone-500">meublerfacile.com</span>
        <span>© {new Date().getFullYear()} — Tous droits réservés</span>
      </div>
    </section>
  );
}
