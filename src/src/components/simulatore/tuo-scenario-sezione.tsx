"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { calcolaSerieProiezione, calcolaValoreFuturo } from "@/lib/simulatore";
import { formatCurrency } from "@/lib/utils";

type Props = {
  patrimonioAttuale: number;
  pacMensile: number;
  orizzonteAnni: number;
  rendimentoPersonalizzato: number;
  onCambiaRendimento: (valore: number) => void;
};

function TooltipPersonalizzato({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--color-cream-dark)] bg-white px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-[var(--color-muted)]">Anno {label}</p>
      <p className="text-sm font-semibold text-[var(--color-forest-dark)] mt-0.5">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export function TuoScenarioSezione({
  patrimonioAttuale,
  pacMensile,
  orizzonteAnni,
  rendimentoPersonalizzato,
  onCambiaRendimento,
}: Props) {
  const dati = useMemo(
    () =>
      calcolaSerieProiezione(
        patrimonioAttuale,
        pacMensile,
        rendimentoPersonalizzato,
        orizzonteAnni
      ),
    [patrimonioAttuale, pacMensile, rendimentoPersonalizzato, orizzonteAnni]
  );

  const risultatoFinale = Math.round(
    calcolaValoreFuturo(
      patrimonioAttuale,
      pacMensile,
      rendimentoPersonalizzato,
      orizzonteAnni
    )
  );

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-5 py-5 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="font-display text-xl text-[var(--color-forest-dark)]">
        Il tuo scenario
      </h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Imposta il rendimento medio annuo che ti aspetti.
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-[var(--color-muted)]">
          Rendimento atteso
        </span>
        <span className="font-display text-2xl text-[var(--color-forest-dark)] tabular-nums">
          {rendimentoPersonalizzato}%
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={15}
        step={0.5}
        value={rendimentoPersonalizzato}
        onChange={(e) => onCambiaRendimento(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-gold)] h-2 cursor-pointer"
        aria-label="Rendimento medio annuo atteso"
      />
      <div className="flex items-center justify-between text-[11px] text-[var(--color-muted)]">
        <span>0%</span>
        <span>15%</span>
      </div>

      <div className="mt-5 h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dati} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="areaTuoScenario" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="anno"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}a`}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <Tooltip content={<TooltipPersonalizzato />} />
            <Area
              type="monotone"
              dataKey="valore"
              stroke="var(--color-forest)"
              strokeWidth={2.5}
              fill="url(#areaTuoScenario)"
              isAnimationActive
              animationDuration={500}
              animationEasing="ease-out"
              activeDot={{
                r: 5,
                fill: "var(--color-gold)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 rounded-2xl bg-[var(--color-forest-mist)] px-5 py-4 text-center">
        <span className="text-xs text-[var(--color-muted)]">
          Tra {orizzonteAnni} anni
        </span>
        <p className="mt-1 font-display text-3xl text-[var(--color-forest-dark)] tabular-nums">
          ≈ {formatCurrency(risultatoFinale)}
        </p>
      </div>
    </section>
  );
}
