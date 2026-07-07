"use client";

import { ChevronRight } from "lucide-react";
import { andamentoPatrimonio, patrimonioTotale } from "@/lib/mock-data";
import {
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/utils";

/**
 * Card "Patrimonio Totale" — la card più importante della Home dopo
 * l'albero. È interamente cliccabile: per ora l'azione è un no-op,
 * ma il componente è già predisposto per aprire la futura schermata
 * di dettaglio "Patrimonio".
 */
export function PatrimonioTotaleCard() {
  function handleApriDettaglio() {
    // TODO: quando la schermata di dettaglio sarà disponibile,
    // sostituire con: router.push("/patrimonio")
  }

  const valori = andamentoPatrimonio.map((p) => p.valore);
  const min = Math.min(...valori);
  const max = Math.max(...valori);
  const range = max - min || 1;

  const larghezza = 280;
  const altezza = 56;
  const passoX = larghezza / (valori.length - 1);

  const coordinate = valori.map((v, i) => ({
    x: i * passoX,
    y: altezza - ((v - min) / range) * altezza,
  }));

  const linea = coordinate
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const area = `${linea} L ${larghezza} ${altezza} L 0 ${altezza} Z`;
  const ultimo = coordinate[coordinate.length - 1];

  const inCrescita = patrimonioTotale.variazioneValore >= 0;

  return (
    <button
      type="button"
      onClick={handleApriDettaglio}
      aria-label={`Apri il dettaglio del patrimonio totale, ${formatCurrency(
        patrimonioTotale.valore,
        patrimonioTotale.valuta
      )}`}
      className="group relative w-full h-full text-left rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-7 py-7 sm:px-8 sm:py-8
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
          Patrimonio Totale
        </span>

        <ChevronRight
          className="h-4 w-4 text-[var(--color-muted)] opacity-0 -translate-x-1 transition-all duration-300
                     group-hover:opacity-100 group-hover:translate-x-0"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 sm:mt-5">
        <span className="font-display text-4xl sm:text-5xl leading-none text-[var(--color-forest-dark)] tabular-nums">
          {formatCurrency(patrimonioTotale.valore, patrimonioTotale.valuta)}
        </span>
      </div>

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

      <div className="mt-6 sm:mt-8 -mx-1">
        <svg
          viewBox={`0 0 ${larghezza} ${altezza}`}
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-16"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--color-forest)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={area} fill="url(#sparklineFill)" />
          <path
            d={linea}
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={ultimo.x}
            cy={ultimo.y}
            r="3"
            fill="var(--color-gold)"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
          <span>{andamentoPatrimonio[0].mese}</span>
          <span>ultimi 12 mesi</span>
          <span>{andamentoPatrimonio[andamentoPatrimonio.length - 1].mese}</span>
        </div>
      </div>
    </button>
  );
}
