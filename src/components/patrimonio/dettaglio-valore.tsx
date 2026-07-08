import { patrimonioTotale } from "@/lib/mock-data";
import {
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/utils";

/**
 * Valore principale della schermata: grande, centrato, senza bordi di card
 * — deve sembrare un momento di respiro, non una riga di un estratto conto.
 */
export function DettaglioValorePrincipale() {
  const inCrescita = patrimonioTotale.variazioneValore >= 0;

  return (
    <section className="flex flex-col items-center text-center py-10 sm:py-14">
      <span className="text-sm text-[var(--color-muted)]">Valore attuale</span>
      <span className="font-display text-5xl sm:text-6xl text-[var(--color-forest-dark)] mt-2 tabular-nums">
        {formatCurrency(patrimonioTotale.valore, patrimonioTotale.valuta)}
      </span>

      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={`text-sm ${
            inCrescita ? "text-[var(--color-forest)]" : "text-red-700"
          }`}
          aria-hidden="true"
        >
          ▲
        </span>
        <span
          className={`text-sm font-medium ${
            inCrescita ? "text-[var(--color-forest)]" : "text-red-700"
          }`}
        >
          {formatSignedCurrency(patrimonioTotale.variazioneValore)}
        </span>
        <span className="text-sm text-[var(--color-muted)]">
          {patrimonioTotale.variazioneEtichetta} (
          {formatSignedPercent(patrimonioTotale.variazionePercentuale)})
        </span>
      </div>
    </section>
  );
}
