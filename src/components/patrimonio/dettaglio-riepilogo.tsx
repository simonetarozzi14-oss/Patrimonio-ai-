import { riepilogoPatrimonio } from "@/lib/mock-data";
import { formatCurrency, formatSignedCurrency, formatSignedPercent } from "@/lib/utils";

export function DettaglioRiepilogo() {
  const { valoreAttuale, totaleVersato, rendimentoAssoluto, rendimentoPercentuale } =
    riepilogoPatrimonio;

  const voci = [
    {
      id: "valore-attuale",
      etichetta: "Valore attuale",
      valore: formatCurrency(valoreAttuale),
      accento: false,
    },
    {
      id: "totale-versato",
      etichetta: "Totale versato",
      valore: formatCurrency(totaleVersato),
      accento: false,
    },
    {
      id: "rendimento-assoluto",
      etichetta: "Rendimento assoluto",
      valore: formatSignedCurrency(rendimentoAssoluto),
      accento: true,
    },
    {
      id: "rendimento-percentuale",
      etichetta: "Rendimento %",
      valore: formatSignedPercent(rendimentoPercentuale, 1),
      accento: true,
    },
  ];

  return (
    <section>
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)] mb-3">
        Riepilogo
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {voci.map((voce) => (
          <div
            key={voce.id}
            className="rounded-2xl border border-[var(--color-cream-dark)]/80 bg-white
                       px-5 py-5 shadow-[0_1px_2px_rgba(31,61,46,0.03)]"
          >
            <p className="text-xs text-[var(--color-muted)]">{voce.etichetta}</p>
            <p
              className={`mt-1.5 font-display text-2xl tabular-nums ${
                voce.accento
                  ? "text-[var(--color-forest)]"
                  : "text-[var(--color-forest-dark)]"
              }`}
            >
              {voce.valore}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
