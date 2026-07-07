"use client";

import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { indicatoriScore, patrimonioScore } from "@/lib/mock-data";

/**
 * Card "Patrimonio Score" — uno degli elementi più distintivi della Home.
 * L'intera card è cliccabile: per ora l'azione è un no-op, ma il
 * componente è già predisposto per aprire la futura schermata di
 * dettaglio dello score.
 */
export function PatrimonioScoreCard() {
  function handleApriDettaglio() {
    // TODO: quando la schermata di dettaglio sarà disponibile,
    // sostituire con: router.push("/patrimonio/score")
  }

  const { punteggio, scoreMassimo, stato, variazione } = patrimonioScore;

  const raggio = 54;
  const circonferenza = 2 * Math.PI * raggio;
  const percentuale = punteggio / scoreMassimo;
  const offset = circonferenza * (1 - percentuale);

  return (
    <button
      type="button"
      onClick={handleApriDettaglio}
      aria-label={`Apri il dettaglio del Patrimonio Score, ${punteggio} su ${scoreMassimo}, ${stato}`}
      className="group relative w-full h-full text-left rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-6 py-6 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]
                 transition-all duration-300 ease-out
                 hover:-translate-y-0.5 hover:border-[var(--color-gold-light)]
                 hover:shadow-[0_2px_4px_rgba(31,61,46,0.04),0_20px_40px_-16px_rgba(31,61,46,0.16)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]
                 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
          Patrimonio Score
        </span>

        <ChevronRight
          className="h-4 w-4 text-[var(--color-muted)] opacity-0 -translate-x-1 transition-all duration-300
                     group-hover:opacity-100 group-hover:translate-x-0"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex flex-col items-center text-center">
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={raggio}
              fill="none"
              stroke="var(--color-cream-dark)"
              strokeWidth="10"
            />
            <circle
              cx="64"
              cy="64"
              r={raggio}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circonferenza}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 900ms ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl text-[var(--color-forest-dark)] tabular-nums">
              {punteggio}
            </span>
            <span className="text-xs text-[var(--color-muted)]">
              su {scoreMassimo}
            </span>
          </div>
        </div>

        <p className="mt-4 text-base font-medium text-[var(--color-forest-dark)]">
          {stato}
        </p>
        <p className="mt-1 text-sm text-[var(--color-gold-dark)]">
          {variazione}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3.5">
        {indicatoriScore.map((indicatore) => (
          <div key={indicatore.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink)]">
                {indicatore.etichetta}
              </span>
              <span className="text-[var(--color-muted)] font-medium tabular-nums">
                {indicatore.valore}
              </span>
            </div>
            <Progress
              value={indicatore.valore}
              className="h-1.5"
              indicatorClassName="bg-[var(--color-forest)]"
            />
          </div>
        ))}
      </div>
    </button>
  );
}
