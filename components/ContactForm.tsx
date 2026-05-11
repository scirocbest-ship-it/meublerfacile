"use client";

import { useState } from "react";
import { CheckCircle, Phone, Envelope, Clock } from "@phosphor-icons/react";

type FormData = {
  nom: string; email: string; telephone: string;
  ville: string; pack: string; message: string;
};

const initialForm: FormData = { nom: "", email: "", telephone: "", ville: "", pack: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  }

  const inputClass = "w-full border border-[#1a1a14]/12 rounded-xl px-4 py-3 text-[#1a1a14] placeholder:text-[#6b6b5e]/50 bg-white focus:outline-none focus:border-[#c9ed76] focus:ring-2 focus:ring-[#c9ed76]/20 transition-all text-sm";

  return (
    <section id="contact" className="bg-[#1a1a14] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — info */}
          <div>
            <span className="inline-block bg-[#c9ed76] text-[#1a1a14] text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6">
              Pré-commande gratuite
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              On vous rappelle<br />sous 48h.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Remplissez le formulaire. Notre équipe revient vers vous rapidement pour confirmer votre commande et convenir d'une date d'installation.
            </p>

            <div className="space-y-5">
              {[
                { Icon: Clock, text: "Réponse sous 48h ouvrées" },
                { Icon: Phone, text: "Rappel téléphonique inclus" },
                { Icon: Envelope, text: "Confirmation par email" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#c9ed76]" />
                  </div>
                  <span className="text-white/70 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-white/5 rounded-3xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#c9ed76] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} weight="bold" className="text-[#1a1a14]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Demande reçue !</h3>
                <p className="text-white/60 leading-relaxed">
                  Votre pré-commande a bien été prise en compte. Nous vous rappelons sous 48h pour confirmer et fixer la date d'installation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 rounded-3xl p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">Nom complet</label>
                    <input type="text" name="nom" value={form.nom} onChange={handleChange} required placeholder="Jean Dupont" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jean@exemple.fr" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">Téléphone</label>
                    <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required placeholder="06 00 00 00 00" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">Ville</label>
                    <input type="text" name="ville" value={form.ville} onChange={handleChange} required placeholder="Lyon" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">Pack souhaité</label>
                  <select name="pack" value={form.pack} onChange={handleChange} required className={inputClass}>
                    <option value="" disabled>Sélectionnez votre pack</option>
                    <option value="T2">Pack T2 — 3 650€ HT</option>
                    <option value="T3">Pack T3 — 4 550€ HT</option>
                    <option value="T4">Pack T4 — 5 300€ HT</option>
                    <option value="T5">Pack T5 — 6 050€ HT</option>
                    <option value="T6">Pack T6 — 6 800€ HT</option>
                    <option value="other">T7 et plus — sur mesure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">
                    Message <span className="text-white/30 normal-case font-normal">(optionnel)</span>
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Précisions sur votre bien, délai souhaité…" className={`${inputClass} resize-none`} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c9ed76] text-[#1a1a14] font-semibold py-4 rounded-xl hover:bg-[#b8dc60] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? "Envoi en cours…" : "Envoyer ma pré-commande →"}
                </button>

                <p className="text-center text-white/30 text-xs">Aucun paiement requis. Rappel sous 48h garanti.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
