"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { curvaProiezionePatrimonio, simulazionePatrimonio } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

/**
 * Card "Dove puoi arrivare?" — preview del Simulatore Patrimoniale.
 * Deve incuriosire e invogliare l'utente ad aprirlo: mostra una proiezione
 * mock, la logica reale del simulatore vive nella schermata "/simulatore".
 * L'intera card è cliccabile.
 */
export function SimulatoreCard() {
  const router = useRouter();

  function handleApriSimulatore() {
    router.push("/simulatore");
  }

  const valori = curvaProiezionePatrimonio.map((p) => p.valore);
  const min = Math.min(...valori);
  const max = Math.max(...valori);
  const range = max - min || 1;

  const larghezza = 600;
  const altezza = 64;
  const passoX = larghezza / (valori.length - 1);

  const coordinate = valori.map((v, i) => ({
    x: i * passoX,
    y: altezza - ((v - min) / range) * altezza,
  }));

  const linea = coordinate
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const area = `${linea} L ${larghezza} ${altezza} L 0 ${altezza} Z`;

  return (
    <button
      type="button"
      onClick={handleApriSimulatore}
      aria-label={`Apri il simulatore patrimoniale. Continuando così, tra ${simulazionePatrimonio.anni} anni potresti raggiungere circa ${formatCurrency(simulazionePatrimonio.valoreProiettato)}`}
      className="group relative w-full h-full text-left rounded-3xl border border-[var(--color-cream-dark)]/80
                 bg-gradient-to-br from-white to-[var(--color-forest-mist)]
                 px-6 py-6 sm:px-8 sm:py-8
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]
                 transition-all duration-300 ease-out
                 hover:-translate-y-0.5 hover:border-[var(--color-gold-light)]
                 hover:shadow-[0_2px_4px_rgba(31,61,46,0.04),0_20px_40px_-16px_rgba(31,61,46,0.16)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]
                 cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
            🚀 Dove puoi arrivare?
          </span>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {simulazionePatrimonio.messaggio}
          </p>

          <span className="mt-2 block font-display text-4xl sm:text-5xl text-[var(--color-forest-dark)] tabular-nums">
            ≈ {formatCurrency(simulazionePatrimonio.valoreProiettato)}
          </span>
          <span className="mt-1 block text-sm text-[var(--color-muted)]">
            Tra {simulazionePatrimonio.anni} anni
          </span>
        </div>

        {/* pulsante "Simula": visivamente presente, ma l'azione vera è
            sull'intera card (bottone unico, niente bottoni annidati) */}
        <span
          className="flex w-fit items-center gap-1.5 self-start sm:self-center rounded-full bg-[var(--color-forest)]
                     px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300
                     group-hover:bg-[var(--color-forest-dark)]"
        >
          Simula
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>

      {/* mini curva di crescita elegante */}
      <div className="mt-6 sm:mt-8 -mx-1">
        <svg
          viewBox={`0 0 ${larghezza} ${altezza}`}
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="curvaSimulatore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={area} fill="url(#curvaSimulatore)" />
          <path
            d={linea}
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={coordinate[coordinate.length - 1].x}
            cy={coordinate[coordinate.length - 1].y}
            r="3.5"
            fill="var(--color-gold)"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
          <span>Oggi</span>
          <span>Tra {simulazionePatrimonio.anni} anni</span>
        </div>
      </div>
    </button>
  );
}
