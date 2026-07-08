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
  // Opacità minima alzata così anche le quote piccole restano leggibili.
  function opacitaPerPercentuale(percentuale: number) {
    return Math.min(0.88, 0.34 + (percentuale / 100) * 0.85);
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
                 hover:shadow-
