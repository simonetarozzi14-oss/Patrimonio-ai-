"use client";

import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { scenariPatrimonioAI } from "@/lib/mock-data";
import { calcolaSerieProiezione, calcolaValoreFuturo } from "@/lib/simulatore";
import { formatCurrency } from "@/lib/utils";

type Props = {
  patrimonioAttuale: number;
  pacMensile: number;
  orizzonteAnni: number;
};

type RigaGrafico = { anno: number; [scenarioId: string]: number };

function TooltipPersonalizzato({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[var(--color-cream-dark)] bg-white px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-[var(--color-muted)]">Anno {label}</p>
      {payload.map((voce) => {
        const scenario = scenariPatrimonioAI.find((s) => s.id === voce.dataKey);
        return (
          <p
            key={voce.dataKey}
            className="text-sm font-semibold mt-0.5"
            style={{ color: voce.color }}
          >
            {scenario?.emoji} {formatCurrency(voce.value)}
          </p>
        );
      })}
    </div>
  );
}

export function ScenariChart({
  patrimonioAttuale,
  pacMensile,
  orizzonteAnni,
}: Props) {
  const dati = useMemo<RigaGrafico[]>(() => {
    const serie = scenariPatrimonioAI.map((scenario) => ({
      id: scenario.id,
      punti: calcolaSerieProiezione(
        patrimonioAttuale,
        pacMensile,
        scenario.rendimento,
        orizzonteAnni
      ),
    }));

    return serie[0].punti.map((punto, i) => {
      const riga: RigaGrafico = { anno: punto.anno };
      serie.forEach((s) => {
        riga[s.id] = s.punti[i].valore;
      });
      return riga;
    });
  }, [patrimonioAttuale, pacMensile, orizzonteAnni]);

  const risultatiFinali = scenariPatrimonioAI.map((scenario) => ({
    ...scenario,
    valoreFinale: Math.round(
      calcolaValoreFuturo(
        patrimonioAttuale,
        pacMensile,
        scenario.rendimento,
        orizzonteAnni
      )
    ),
  }));

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-5 py-5 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="font-display text-xl text-[var(--color-forest-dark)]">
        Scenari Patrimonio AI
      </h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Due ipotesi per aiutarti a visualizzare possibili evoluzioni del
        patrimonio.
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs">
        {scenariPatrimonioAI.map((scenario) => (
          <span key={scenario.id} className="flex items-center gap-1.5">
            <span aria-hidden="true">{scenario.emoji}</span>
            <span className="text-[var(--color-ink)]">{scenario.nome}</span>
            <span className="text-[var(--color-muted)]">
              {scenario.rendimento}%
            </span>
          </span>
        ))}
      </div>

      <div className="mt-4 h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dati} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <XAxis
              dataKey="anno"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}a`}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <Tooltip content={<TooltipPersonalizzato />} />
            {scenariPatrimonioAI.map((scenario) => (
              <Line
                key={scenario.id}
                type="monotone"
                dataKey={scenario.id}
                stroke={scenario.colore}
                strokeWidth={2.5}
                dot={false}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
                activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {risultatiFinali.map((scenario) => (
          <div
            key={scenario.id}
            className="rounded-2xl border border-[var(--color-cream-dark)]/80 bg-[var(--color-cream)] px-4 py-4"
          >
            <span className="text-xs text-[var(--color-muted)] flex items-center gap-1.5">
              <span aria-hidden="true">{scenario.emoji}</span>
              {scenario.nome}
            </span>
            <p className="mt-1 font-display text-2xl text-[var(--color-forest-dark)] tabular-nums">
              ≈ {formatCurrency(scenario.valoreFinale)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
