"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { serieStoricaPatrimonio, type PuntoStorico } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

type Periodo = "1M" | "6M" | "1A" | "5A" | "TUTTO";

const PERIODI: { id: Periodo; etichetta: string; giorni: number | null }[] = [
  { id: "1M", etichetta: "1M", giorni: 30 },
  { id: "6M", etichetta: "6M", giorni: 182 },
  { id: "1A", etichetta: "1A", giorni: 365 },
  { id: "5A", etichetta: "5A", giorni: 1825 },
  { id: "TUTTO", etichetta: "Tutto", giorni: null },
];

function formattaTick(dataIso: string, periodo: Periodo) {
  const d = new Date(dataIso);
  if (periodo === "1M") {
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "short",
    }).format(d);
  }
  return new Intl.DateTimeFormat("it-IT", {
    month: "short",
    year: "2-digit",
  }).format(d);
}

function formattaDataEstesa(dataIso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dataIso));
}

function TooltipPersonalizzato({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: PuntoStorico }[];
}) {
  if (!active || !payload?.length) return null;
  const punto = payload[0].payload;

  return (
    <div className="rounded-xl border border-[var(--color-cream-dark)] bg-white px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-[var(--color-muted)] capitalize">
        {formattaDataEstesa(punto.data)}
      </p>
      <p className="text-sm font-semibold text-[var(--color-forest-dark)] mt-0.5">
        {formatCurrency(punto.valore)}
      </p>
    </div>
  );
}

export function DettaglioGrafico() {
  const [periodo, setPeriodo] = useState<Periodo>("1A");

  const datiFiltrati = useMemo(() => {
    const config = PERIODI.find((p) => p.id === periodo);
    if (!config?.giorni) return serieStoricaPatrimonio;
    return serieStoricaPatrimonio.slice(-config.giorni);
  }, [periodo]);

  const ticks = useMemo(() => {
    const numeroTick = Math.min(5, datiFiltrati.length);
    return Array.from({ length: numeroTick }, (_, i) => {
      const posizione = Math.round(
        (i / (numeroTick - 1)) * (datiFiltrati.length - 1)
      );
      return datiFiltrati[posizione].data;
    });
  }, [datiFiltrati]);

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-6 py-6 sm:px-8 sm:py-8
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <div
        role="tablist"
        aria-label="Seleziona periodo"
        className="flex items-center gap-0.5 rounded-full bg-[var(--color-cream)] p-1 w-fit"
      >
        {PERIODI.map((opzione) => (
          <button
            key={opzione.id}
            type="button"
            role="tab"
            aria-selected={periodo === opzione.id}
            onClick={() => setPeriodo(opzione.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
              periodo === opzione.id
                ? "bg-[var(--color-forest)] text-white"
                : "text-[var(--color-muted)] hover:text-[var(--color-forest-dark)]"
            )}
          >
            {opzione.etichetta}
          </button>
        ))}
      </div>

      <div className="mt-6 h-72 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={datiFiltrati}
            margin={{ top: 8, right: 12, bottom: 0, left: 12 }}
          >
            <defs>
              <linearGradient id="areaPatrimonioDettaglio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f3d2e" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#1f3d2e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="data"
              ticks={ticks}
              interval={0}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formattaTick(v, periodo)}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              padding={{ left: 8, right: 8 }}
            />

            <Tooltip
              content={<TooltipPersonalizzato />}
              cursor={{
                stroke: "var(--color-gold)",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />

            <Area
              type="monotone"
              dataKey="valore"
              stroke="var(--color-forest)"
              strokeWidth={2.5}
              fill="url(#areaPatrimonioDettaglio)"
              isAnimationActive
              animationDuration={1000}
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
    </section>
  );
}
