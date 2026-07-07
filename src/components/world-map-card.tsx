"use client";

import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { esposizioniGeografiche, type EsposizioneGeografica } from "@/lib/mock-data";

/**
 * Card "Dove sono i tuoi soldi" — preview della distribuzione geografica
 * del patrimonio. L'intera card è cliccabile: per ora l'azione è un no-op,
 * ma è già predisposta per aprire la futura schermata "Mappa", dove il
 * flusso previsto è:
 *
 *   Home → Dove sono i tuoi soldi → selezione Paese →
 *   ETF che investono in quel Paese → aziende principali negli ETF →
 *   spiegazione in linguaggio semplice del perché si è investiti lì.
 *
 * I dati mock in `esposizioniGeografiche` contengono già la struttura
 * (etf, aziende, spiegazione) necessaria per quelle schermate future.
 */
export function WorldMapCard() {
  function handleApriMappa() {
    // TODO: quando la schermata "Mappa" sarà disponibile,
    // sostituire con: router.push("/mappa")
  }

  // Calcola l'intensità del colore di ogni "macchia" sulla mappa in base
  // al peso dell'esposizione: più alta la quota, più marcato il colore.
  function opacitaPerPercentuale(percentuale: number) {
    return Math.min(0.85, 0.16 + (percentuale / 100) * 1.1);
  }

  return (
    <button
      type="button"
      onClick={handleApriMappa}
      aria-label="Apri la mappa della distribuzione geografica del patrimonio"
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
          🌍 Dove sono i tuoi soldi
        </span>

        <ChevronRight
          className="h-4 w-4 text-[var(--color-muted)] opacity-0 -translate-x-1 transition-all duration-300
                     group-hover:opacity-100 group-hover:translate-x-0"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      {/* mappa stilizzata: nessuna via, nessun confine, solo macchie morbide
          la cui intensità racconta il peso dell'esposizione */}
      <div className="mt-4 rounded-2xl bg-[var(--color-forest-mist)] overflow-hidden aspect-[16/9]">
        <svg viewBox="0 0 100 55" className="h-full w-full">
          {esposizioniGeografiche.map((esposizione) =>
            esposizione.regioniMappa.map((regione, indice) => (
              <ellipse
                key={`${esposizione.id}-${indice}`}
                cx={regione.cx}
                cy={regione.cy}
                rx={regione.rx}
                ry={regione.ry}
                fill="var(--color-forest)"
                opacity={opacitaPerPercentuale(esposizione.percentuale)}
              />
            ))
          )}
        </svg>
      </div>

      {/* prime quattro esposizioni, con barra proporzionale */}
      <div className="mt-5 flex flex-col gap-3.5">
        {esposizioniGeografiche.slice(0, 4).map((esposizione) => (
          <RigaEsposizione key={esposizione.id} esposizione={esposizione} />
        ))}
      </div>
    </button>
  );
}

function RigaEsposizione({
  esposizione,
}: {
  esposizione: EsposizioneGeografica;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-[var(--color-ink)]">
          <span aria-hidden="true">{esposizione.bandiera}</span>
          {esposizione.paese}
        </span>
        <span className="font-medium text-[var(--color-forest-dark)] tabular-nums">
          {esposizione.percentuale}%
        </span>
      </div>
      <Progress
        value={esposizione.percentuale}
        className="h-1.5"
        indicatorClassName="bg-[var(--color-forest)]"
      />
    </div>
  );
}
