// Logica di calcolo del Simulatore Patrimoniale.
// La formula è reale (interesse composto con versamenti mensili costanti);
// solo gli INPUT sono mock per ora. Quando ci sarà un patrimonio reale
// collegato, basterà passare i valori veri a queste stesse funzioni.

/**
 * Valore futuro di un capitale iniziale + versamenti mensili costanti,
 * con capitalizzazione mensile.
 *
 * @param patrimonioAttuale capitale iniziale (€)
 * @param pacMensile versamento mensile costante (€)
 * @param rendimentoAnnuoPercentuale rendimento annuo atteso, es. 7 per 7%
 * @param anni orizzonte temporale in anni
 */
export function calcolaValoreFuturo(
  patrimonioAttuale: number,
  pacMensile: number,
  rendimentoAnnuoPercentuale: number,
  anni: number
): number {
  const tassoMensile = rendimentoAnnuoPercentuale / 100 / 12;
  const mesi = Math.max(0, Math.round(anni * 12));

  if (mesi === 0) return patrimonioAttuale;

  if (tassoMensile === 0) {
    return patrimonioAttuale + pacMensile * mesi;
  }

  const fattoreCrescita = Math.pow(1 + tassoMensile, mesi);
  const valoreCapitaleIniziale = patrimonioAttuale * fattoreCrescita;
  const valoreVersamenti =
    pacMensile * ((fattoreCrescita - 1) / tassoMensile);

  return valoreCapitaleIniziale + valoreVersamenti;
}

export type PuntoSimulazione = { anno: number; valore: number };

/**
 * Serie anno per anno (da 0 a `anni`), utile per disegnare un grafico
 * di proiezione.
 */
export function calcolaSerieProiezione(
  patrimonioAttuale: number,
  pacMensile: number,
  rendimentoAnnuoPercentuale: number,
  anni: number
): PuntoSimulazione[] {
  const anniInteri = Math.max(1, Math.round(anni));

  return Array.from({ length: anniInteri + 1 }, (_, anno) => ({
    anno,
    valore: Math.round(
      calcolaValoreFuturo(
        patrimonioAttuale,
        pacMensile,
        rendimentoAnnuoPercentuale,
        anno
      )
    ),
  }));
}
