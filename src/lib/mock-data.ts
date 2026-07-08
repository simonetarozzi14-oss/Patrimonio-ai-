// Dati mock per Patrimonio AI — Sprint 1 (Seed)
// Nessuna chiamata reale: tutti i valori sono statici e servono solo
// a popolare l'interfaccia durante lo sviluppo.

export const utente = {
  nome: "Simone",
  ultimoAccesso: "ieri alle 19:42",
};

export const patrimonioTotale = {
  valore: 327_840,
  valuta: "EUR",
  variazioneValore: 2_430,
  variazionePercentuale: 0.75,
  variazioneEtichetta: "questo mese",
};

export type PuntoAndamento = { mese: string; valore: number };

export const andamentoPatrimonio: PuntoAndamento[] = [
  { mese: "Gen", valore: 292_400 },
  { mese: "Feb", valore: 295_800 },
  { mese: "Mar", valore: 294_100 },
  { mese: "Apr", valore: 298_600 },
  { mese: "Mag", valore: 302_900 },
  { mese: "Giu", valore: 301_400 },
  { mese: "Lug", valore: 306_700 },
  { mese: "Ago", valore: 310_200 },
  { mese: "Set", valore: 308_600 },
  { mese: "Ott", valore: 315_300 },
  { mese: "Nov", valore: 325_410 },
  { mese: "Dic", valore: 327_840 },
];

// --- Storico giornaliero (mock) per il grafico interattivo del patrimonio ---
// Generato con una formula deterministica (nessun Math.random) in modo che
// il valore sia identico tra server e client e non provochi mismatch di
// idratazione in Next.js. Copre 5 anni, ancorato all'ultimo valore reale
// mostrato nelle altre card (serve profondità sufficiente per il periodo "5A"
// nella schermata di dettaglio del Patrimonio Totale).
export type PuntoStorico = { data: string; valore: number };

const UN_GIORNO_MS = 24 * 60 * 60 * 1000;
const OGGI_MOCK = new Date("2026-07-07T00:00:00");
const GIORNI_STORICO = 1825; // ~5 anni
const VALORE_INIZIALE_STORICO = 198_000;

function generaSerieStoricaPatrimonio(): PuntoStorico[] {
  const punti: PuntoStorico[] = [];

  for (let i = 0; i < GIORNI_STORICO; i++) {
    const progressione = i / (GIORNI_STORICO - 1);
    const trend =
      VALORE_INIZIALE_STORICO +
      (patrimonioTotale.valore - VALORE_INIZIALE_STORICO) * progressione;
    const oscillazione =
      2600 * Math.sin(i / 21) +
      1500 * Math.sin(i / 54 + 1.1) +
      850 * Math.sin(i / 8 + 0.6);

    const data = new Date(
      OGGI_MOCK.getTime() - (GIORNI_STORICO - 1 - i) * UN_GIORNO_MS
    );

    punti.push({
      data: data.toISOString().slice(0, 10),
      valore: Math.round(trend + oscillazione),
    });
  }

  // Ancoraggio: l'ultimo punto coincide sempre col totale mostrato altrove.
  punti[punti.length - 1].valore = patrimonioTotale.valore;

  return punti;
}

export const serieStoricaPatrimonio = generaSerieStoricaPatrimonio();

// --- Dati per la schermata di dettaglio "Patrimonio Totale" ---

const TOTALE_VERSATO = 265_000;

export const riepilogoPatrimonio = {
  valoreAttuale: patrimonioTotale.valore,
  totaleVersato: TOTALE_VERSATO,
  rendimentoAssoluto: patrimonioTotale.valore - TOTALE_VERSATO,
  rendimentoPercentuale:
    ((patrimonioTotale.valore - TOTALE_VERSATO) / TOTALE_VERSATO) * 100,
};

export type AggiornamentoPatrimonio = {
  id: string;
  data: string;
  fonte: string;
  tipo: "screenshot" | "manuale";
};

export const cronologiaAggiornamenti: AggiornamentoPatrimonio[] = [
  { id: "1", data: "15 giugno", fonte: "Screenshot Fineco", tipo: "screenshot" },
  { id: "2", data: "30 maggio", fonte: "Inserimento manuale", tipo: "manuale" },
  { id: "3", data: "28 aprile", fonte: "Screenshot Directa", tipo: "screenshot" },
];

export const patrimonioScore = {
  punteggio: 87,
  scoreMassimo: 100,
  stato: "In crescita 🌱",
  variazione: "+2 punti rispetto al mese scorso",
};

export type IndicatoreScore = {
  id: string;
  etichetta: string;
  valore: number;
};

export const indicatoriScore: IndicatoreScore[] = [
  { id: "diversificazione", etichetta: "Diversificazione", valore: 82 },
  { id: "liquidita", etichetta: "Liquidità", valore: 64 },
  { id: "crescita", etichetta: "Crescita", valore: 91 },
  { id: "costanza", etichetta: "Costanza", valore: 73 },
  { id: "equilibrio", etichetta: "Equilibrio", valore: 88 },
];

export type QuotaComposizione = {
  categoria: string;
  percentuale: number;
  colore: string;
};

export const composizionePatrimonio: QuotaComposizione[] = [
  { categoria: "Immobili", percentuale: 42, colore: "#1f3d2e" },
  { categoria: "Azioni", percentuale: 26, colore: "#c6a15b" },
  { categoria: "Liquidità", percentuale: 16, colore: "#3f6350" },
  { categoria: "Obbligazioni", percentuale: 11, colore: "#e6d3a7" },
  { categoria: "Altro", percentuale: 5, colore: "#c9cfc4" },
];

// --- Distribuzione geografica del patrimonio ---
// Struttura pensata per le evoluzioni future: da "Dove sono i tuoi soldi"
// l'utente potrà in seguito selezionare un Paese, vedere gli ETF che vi
// investono, le aziende principali contenute in quegli ETF e una
// spiegazione in linguaggio semplice del perché è investito lì.

export type AziendaEtf = {
  nome: string;
  peso: number; // peso percentuale dell'azienda dentro l'ETF
};

export type EtfEsposizione = {
  nome: string;
  ticker: string;
  pesoPortafoglio: number; // quanto pesa questo ETF sul totale investito
  aziendePrincipali: AziendaEtf[];
};

export type RegioneMappa = {
  cx: number; // posizione in % sulla mappa stilizzata (viewBox 0-100)
  cy: number;
  rx: number; // raggio orizzontale della "macchia" del continente
  ry: number;
};

export type EsposizioneGeografica = {
  id: string;
  paese: string;
  bandiera: string;
  percentuale: number;
  regioniMappa: RegioneMappa[];
  spiegazione: string;
  etf: EtfEsposizione[];
};

export const esposizioniGeografiche: EsposizioneGeografica[] = [
  {
    id: "stati-uniti",
    paese: "Stati Uniti",
    bandiera: "🇺🇸",
    percentuale: 55,
    regioniMappa: [{ cx: 20, cy: 20, rx: 13, ry: 9 }],
    spiegazione:
      "Sei investito negli Stati Uniti principalmente perché possiedi un ETF globale (VWCE), che riflette la composizione del mercato azionario mondiale.",
    etf: [
      {
        nome: "Vanguard FTSE All-World UCITS ETF",
        ticker: "VWCE",
        pesoPortafoglio: 72,
        aziendePrincipali: [
          { nome: "Apple", peso: 4.2 },
          { nome: "Microsoft", peso: 3.9 },
          { nome: "Nvidia", peso: 3.4 },
          { nome: "Amazon", peso: 2.1 },
          { nome: "Alphabet", peso: 1.8 },
        ],
      },
    ],
  },
  {
    id: "europa",
    paese: "Europa",
    bandiera: "🇪🇺",
    percentuale: 22,
    regioniMappa: [{ cx: 48, cy: 17, rx: 6, ry: 7 }],
    spiegazione:
      "L'esposizione europea arriva sia dall'ETF globale VWCE sia da un fondo dedicato alle azioni europee presente nel tuo portafoglio.",
    etf: [
      {
        nome: "Vanguard FTSE All-World UCITS ETF",
        ticker: "VWCE",
        pesoPortafoglio: 18,
        aziendePrincipali: [
          { nome: "ASML", peso: 2.1 },
          { nome: "LVMH", peso: 1.4 },
          { nome: "Nestlé", peso: 1.2 },
        ],
      },
      {
        nome: "iShares Core MSCI Europe",
        ticker: "IMEA",
        pesoPortafoglio: 4,
        aziendePrincipali: [
          { nome: "SAP", peso: 2.8 },
          { nome: "Novo Nordisk", peso: 2.5 },
        ],
      },
    ],
  },
  {
    id: "asia",
    paese: "Asia",
    bandiera: "🌏",
    percentuale: 11,
    regioniMappa: [{ cx: 74, cy: 20, rx: 11, ry: 9 }],
    spiegazione:
      "L'esposizione asiatica deriva principalmente dalla quota di Giappone e Cina inclusa nell'ETF globale VWCE.",
    etf: [
      {
        nome: "Vanguard FTSE All-World UCITS ETF",
        ticker: "VWCE",
        pesoPortafoglio: 11,
        aziendePrincipali: [
          { nome: "Toyota", peso: 1.1 },
          { nome: "Tencent", peso: 0.9 },
          { nome: "Samsung Electronics", peso: 0.8 },
        ],
      },
    ],
  },
  {
    id: "mercati-emergenti",
    paese: "Mercati Emergenti",
    bandiera: "🌎",
    percentuale: 5,
    regioniMappa: [
      { cx: 30, cy: 38, rx: 5, ry: 7 },
      { cx: 52, cy: 35, rx: 6, ry: 8 },
      { cx: 80, cy: 33, rx: 5, ry: 5 },
    ],
    spiegazione:
      "Una piccola quota è dedicata ai mercati emergenti tramite un ETF specifico, per aumentare la diversificazione del portafoglio.",
    etf: [
      {
        nome: "iShares Core MSCI EM IMI",
        ticker: "EMIM",
        pesoPortafoglio: 5,
        aziendePrincipali: [
          { nome: "Taiwan Semiconductor", peso: 1.6 },
          { nome: "Alibaba", peso: 0.7 },
          { nome: "Reliance Industries", peso: 0.5 },
        ],
      },
    ],
  },
  {
    id: "altro",
    paese: "Altro",
    bandiera: "🌐",
    percentuale: 7,
    // nessuna regione sulla mappa: non è legato a un'area geografica specifica
    regioniMappa: [],
    spiegazione:
      "Una quota residua non è legata a un singolo mercato azionario: include liquidità, oro e altri strumenti diversificativi.",
    etf: [],
  },
];

export type Obiettivo = {
  id: string;
  titolo: string;
  descrizione: string;
  target: number;
  attuale: number;
  scadenza: string;
};

export const obiettivi: Obiettivo[] = [
  {
    id: "pensione",
    titolo: "Fondo pensione integrativo",
    descrizione: "Rendita serena dal 2045",
    target: 300_000,
    attuale: 184_500,
    scadenza: "2045",
  },
  {
    id: "casa-toscana",
    titolo: "Casa in Toscana",
    descrizione: "Seconda casa per la famiglia",
    target: 250_000,
    attuale: 97_500,
    scadenza: "2029",
  },
];

export type VoceNavigazione = {
  id: string;
  etichetta: string;
  href: string;
};

export const navigazione: VoceNavigazione[] = [
  { id: "home", etichetta: "Home", href: "/" },
  { id: "analisi", etichetta: "Analisi", href: "/analisi" },
  { id: "mappa", etichetta: "Mappa", href: "/mappa" },
  { id: "futuro", etichetta: "Futuro", href: "/futuro" },
  { id: "profilo", etichetta: "Profilo", href: "/profilo" },
];
