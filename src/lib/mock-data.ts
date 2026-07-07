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

export type PresenzaGeografica = {
  luogo: string;
  percentuale: number;
  coordinate: { x: number; y: number }; // posizione in % su mappa stilizzata
};

export const presenzaGeografica: PresenzaGeografica[] = [
  { luogo: "Europa", percentuale: 54, coordinate: { x: 49, y: 32 } },
  { luogo: "Nord America", percentuale: 29, coordinate: { x: 22, y: 36 } },
  { luogo: "Asia", percentuale: 17, coordinate: { x: 74, y: 40 } },
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
