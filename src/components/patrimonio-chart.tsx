"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { serieStoricaPatrimonio, type PuntoStorico } from "@/lib/mock-data";
import {
  cn,
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/utils";

type Periodo = "1M" | "6M" | "1A" | "TUTTO";

const PERIODI: { id: Periodo; etichetta: string; giorni: number | null }[] = [
  { id: "1M", etichetta: "1M", giorni: 30 },
  { id: "6M", etichetta: "6M", giorni: 182 },
  { id: "1A", etichetta: "1A", giorni: 365 },
  { id: "TUTTO", etichetta: "Tutto", giorni: null },
];

const ETICHETTA_INTERVALLO: Record<Periodo, string> = {
  "1M": "ultimo mese",
  "6M": "ultimi 6 mesi",
  "1A": "ultimo anno",
  TUTTO: "da inizio storico",
};

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

/**
 * Grafico interattivo dell'andamento del patrimonio — il principale
 * elemento interattivo della Home dopo l'albero. L'area del grafico è
 * completamente cliccabile ed è già predisposta per aprire la futura
 * schermata di dettaglio "Patrimonio".
 */
export function PatrimonioChart() {
  const [periodo, setPeriodo] = useState<Periodo>("1A");

  function handleApriDettaglio() {
    // TODO: quando la schermata di dettaglio sarà disponibile,
    // sostituire con: router.push("/patrimonio")
  }

  const datiFiltrati = useMemo(() => {
    const config = PERIODI.find((p) => p.id === periodo);
    if (!config?.giorni) return serieStoricaPatrimonio;
    return serieStoricaPatrimonio.slice(-config.giorni);
  }, [periodo]);

  const ticks = useMemo(() => {
    const numeroTick = Math.min(4, datiFiltrati.length);
    return Array.from({ length: numeroTick }, (_, i) => {
      const posizione = Math.round(
        (i / (numeroTick - 1)) * (datiFiltrati.length - 1)
      );
      return datiFiltrati[posizione].data;
    });
  }, [datiFiltrati]);

  const primo = datiFiltrati[0];
  const ultimo = datiFiltrati[datiFiltrati.length - 1];
  const delta = ultimo.valore - primo.valore;
  const deltaPercentuale = (delta / primo.valore) * 100;
  const inCrescita = delta >= 0;

  return (
    <div
      className="group relative w-full h-full rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-6 py-6 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]
                 transition-shadow duration-300 ease-out
                 hover:shadow-[0_2px_4px_rgba(31,61,46,0.04),0_20px_40px_-16px_rgba(31,61,46,0.16)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
            Andamento patrimonio
          </span>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={cn(
                "text-sm",
                inCrescita ? "text-[var(--color-forest)]" : "text-red-700"
              )}
              aria-hidden="true"
            >
              ▲
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                inCrescita ? "text-[var(--color-forest)]" : "text-red-700"
              )}
            >
              {formatSignedCurrency(delta)}
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              ({formatSignedPercent(deltaPercentuale)}) ·{" "}
              {ETICHETTA_INTERVALLO[periodo]}
            </span>
          </div>
        </div>

        {/* selettore periodo — non deve attivare la navigazione del grafico */}
        <div
          role="tablist"
          aria-label="Seleziona periodo"
          className="flex items-center gap-0.5 rounded-full bg-[var(--color-cream)] p-1"
        >
          {PERIODI.map((opzione) => (
            <button
              key={opzione.id}
              type="button"
              role="tab"
              aria-selected={periodo === opzione.id}
              onClick={(e) => {
                e.stopPropagation();
                setPeriodo(opzione.id);
              }}
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
      </div>

      {/* area cliccabile: tutto il grafico prepara la navigazione futura */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleApriDettaglio}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleApriDettaglio();
          }
        }}
        aria-label="Apri il dettaglio dell'andamento del patrimonio"
        className="mt-4 -mx-2 cursor-pointer rounded-2xl outline-none
                   focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2
                   focus-visible:ring-offset-white"
      >
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={datiFiltrati}
              margin={{ top: 8, right: 12, bottom: 0, left: 12 }}
            >
              <defs>
                <linearGradient id="areaPatrimonio" x1="0" y1="0" x2="0" y2="1">
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
                strokeWidth={2.25}
                fill="url(#areaPatrimonio)"
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

        <div className="flex items-center justify-end gap-1 text-xs text-[var(--color-muted)] opacity-0 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Vedi dettaglio
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
