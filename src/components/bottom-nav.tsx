"use client";

import { Compass, Home, LineChart, Map, User } from "lucide-react";
import { navigazione } from "@/lib/mock-data";

const ICONE: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  home: Home,
  analisi: LineChart,
  mappa: Map,
  futuro: Compass,
  profilo: User,
};

export function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[min(92%,420px)]">
      <ul className="flex items-center justify-between rounded-full border border-[var(--color-cream-dark)] bg-white/90 backdrop-blur-md px-2 py-2 shadow-[0_12px_32px_-8px_rgba(31,61,46,0.25)]">
        {navigazione.map((voce, indice) => {
          const Icona = ICONE[voce.id] ?? Home;
          const attivo = indice === 0;
          return (
            <li key={voce.id} className="flex-1">
              <a
                href={voce.href}
                aria-current={attivo ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-full py-2 text-[11px] transition-colors ${
                  attivo
                    ? "text-[var(--color-forest)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-forest)]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    attivo ? "bg-[var(--color-forest-mist)]" : ""
                  }`}
                >
                  <Icona className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                {voce.etichetta}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
