# meublerfacile.com

Site de conversion pour Meubler Facile — ameublement clé en main pour investisseurs immobiliers.

---

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Push GitHub

```bash
git init
git add .
git commit -m "init: meublerfacile.com"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/meublerfacile.git
git push -u origin main
```

---

## Déploiement Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer **Add New → Project**
3. Importer le repo GitHub `meublerfacile`
4. Laisser les paramètres par défaut (Next.js détecté automatiquement)
5. Cliquer **Deploy**

---

## Connecter le domaine meublerfacile.com (Cloudflare + Vercel)

### Dans Vercel
1. Settings → Domains
2. Ajouter `meublerfacile.com`
3. Vercel affiche des enregistrements DNS à copier

### Dans Cloudflare
1. Dashboard → meublerfacile.com → DNS
2. Supprimer les enregistrements A/CNAME existants si besoin
3. Ajouter les enregistrements fournis par Vercel :
   - Type `A` → `76.76.21.21` (ou la valeur Vercel)
   - Type `CNAME` → `cname.vercel-dns.com`
4. **Désactiver le proxy Cloudflare** (mettre le nuage en gris) sur ces entrées
5. Attendre 5–10 min → domaine actif

---

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
