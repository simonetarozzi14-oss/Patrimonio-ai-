# Patrimonio AI — Sprint 1 (Seed)

Prima versione statica della Home di **Patrimonio AI**: un dashboard patrimoniale
con estetica naturale (verde foresta, crema, oro tenue), costruito con
Next.js 15, TypeScript, Tailwind CSS e componenti in stile shadcn/ui.

Nessun login, database, AI o API reale: tutti i dati sono mock, definiti in
`src/lib/mock-data.ts`.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Componenti UI in stile shadcn/ui (Card, Button, Progress)
- Recharts (grafico lineare e grafico a torta)
- lucide-react (icone)

## Struttura del progetto

```
src/
  app/
    layout.tsx        # layout root, font e metadata
    page.tsx           # composizione della Home
    globals.css         # token di design (colori, radius, font)
  components/
    header.tsx                 # saluto + data + avatar
    tree-hero.tsx               # illustrazione albero + patrimonio totale
    patrimonio-totale-card.tsx  # card con valore e mini sparkline
    patrimonio-chart.tsx        # grafico lineare andamento (recharts)
    patrimonio-score-card.tsx   # indicatore circolare punteggio
    composizione-chart.tsx      # grafico a torta composizione patrimonio
    world-map-card.tsx          # mini mappa del mondo (placeholder)
    goal-card.tsx                # card obiettivo con barra di avanzamento
    bottom-nav.tsx               # barra di navigazione inferiore
    ui/
      card.tsx
      button.tsx
      progress.tsx
  lib/
    mock-data.ts        # tutti i dati mock dell'app
    utils.ts             # helper cn() e formatCurrency()
```

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Build di produzione

```bash
npm run build
npm run start
```

## Pubblicazione su Vercel

Vedi le istruzioni fornite in chat, oppure in sintesi:

1. Crea una repository su GitHub e fai il push del progetto.
2. Vai su https://vercel.com, accedi con l'account GitHub.
3. "Add New… → Project", seleziona la repository.
4. Vercel riconosce automaticamente Next.js: lascia le impostazioni di default
   e clicca "Deploy".
5. Ogni push su `main` genera automaticamente un nuovo deploy.
