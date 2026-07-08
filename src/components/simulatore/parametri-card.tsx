"use client";

import { opzioniOrizzonte } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

type Props = {
  patrimonioAttuale: number;
  onCambiaPatrimonioAttuale: (valore: number) => void;
  pacMensile: number;
  onCambiaPacMensile: (valore: number) => void;
  orizzonteAnni: number;
  onCambiaOrizzonteAnni: (valore: number) => void;
};

export function ParametriCard({
  patrimonioAttuale,
  onCambiaPatrimonioAttuale,
  pacMensile,
  onCambiaPacMensile,
  orizzonteAnni,
  onCambiaOrizzonteAnni,
}: Props) {
  const indiceOrizzonte = Math.max(
    0,
    opzioniOrizzonte.indexOf(orizzonteAnni as (typeof opzioniOrizzonte)[number])
  );

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-5 py-5 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
        Parametri
      </h2>

      <div className="mt-4 flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-[var(--color-muted)]">
            Patrimonio attuale
          </span>
          <div className="flex items-center rounded-2xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] px-4 py-3">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1000}
              value={patrimonioAttuale}
              onChange={(e) =>
                onCambiaPatrimonioAttuale(Number(e.target.value) || 0)
              }
              className="w-full bg-transparent font-display text-2xl text-[var(--color-forest-dark)]
                         outline-none tabular-nums [appearance:textfield]
                         [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[var(--color-muted)] text-sm shrink-0">€</span>
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-[var(--color-muted)]">
            PAC mensile
          </span>
          <div className="flex items-center rounded-2xl border border-[var(--color-cream-dark)] bg-[var(--color-cream)] px-4 py-3">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={50}
              value={pacMensile}
              onChange={(e) => onCambiaPacMensile(Number(e.target.value) || 0)}
              className="w-full bg-transparent font-display text-2xl text-[var(--color-forest-dark)]
                         outline-none tabular-nums [appearance:textfield]
                         [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[var(--color-muted)] text-sm shrink-0">
              €/mese
            </span>
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-muted)]">
              Orizzonte temporale
            </span>
            <span className="font-display text-lg text-[var(--color-forest-dark)] tabular-nums">
              {orizzonteAnni} anni
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={opzioniOrizzonte.length - 1}
            step={1}
            value={indiceOrizzonte}
            onChange={(e) =>
              onCambiaOrizzonteAnni(opzioniOrizzonte[Number(e.target.value)])
            }
            className="w-full accent-[var(--color-forest)] h-2 cursor-pointer"
            aria-label="Orizzonte temporale in anni"
          />

          <div className="flex items-center justify-between text-[11px] text-[var(--color-muted)]">
            {opzioniOrizzonte.map((anni) => (
              <span key={anni}>{anni}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-[var(--color-muted)]">
        Patrimonio attuale: {formatCurrency(patrimonioAttuale)} — puoi
        modificare tutti i valori per esplorare scenari diversi.
      </p>
    </section>
  );
}
