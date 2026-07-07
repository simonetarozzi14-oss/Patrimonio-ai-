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
// idratazione in Next.js. Copre 2 anni, ancorato all'ultimo valore reale
// mostrato nelle altre card.
export type PuntoStorico = { data: string; valore: number };

const UN_GIORNO_MS = 24 * 60 * 60 * 1000;
const OGGI_MOCK = new Date("2026-07-07T00:00:00");
const GIORNI_STORICO = 730; // ~2 anni
const VALORE_INIZIALE_STORICO = 246_000;

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
    percentuale: 58,
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
    percentuale: 24,
    regioniMappa: [{ cx: 48, cy: 17, rx: 6, ry: 7 }],
    spiegazione:
      "L'esposizione europea arriva sia dall'ETF globale VWCE sia da un fondo dedicato alle azioni europee presente nel tuo portafoglio.",
    etf: [
      {
        nome: "Vanguard FTSE All-World UCITS ETF",
        ticker: "VWCE",
        pesoPortafoglio: 18,
