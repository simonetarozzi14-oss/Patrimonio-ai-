"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, User } from "lucide-react";
import { navigazione } from "@/lib/mock-data";

/**
 * Barra di navigazione inferiore, fissa e sempre visibile, in stile iOS
 * (glassmorphism leggero). Tre soli elementi: Home, Aggiungi, Profilo.
 * Il pulsante "Aggiungi" è leggermente più grande e con un accento della
 * palette, per guidare naturalmente il pollice verso l'azione principale.
 *
 * Per ora tutti e tre navigano verso pagine reali/placeholder — la bottom
 * sheet "Cosa vuoi aggiungere?" arriverà in un secondo momento.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[min(92%,340px)]">
      <ul
        className="flex items-center justify-between rounded-full border border-white/40
                   bg-white/70 backdrop-blur-xl px-3 py-2
                   shadow-[0_8px_32px_-8px_rgba(31,61,46,0.28)]"
      >
        {navigazione.map((voce) => {
          const attivo = pathname === voce.href;
          const centrale = voce.id === "aggiungi";

          if (centrale) {
            return (
              <li key={voce.id} className="flex-1 flex justify-center">
                <Link
                  href={voce.href}
                  aria-label={voce.etichetta}
                  aria-current={attivo ? "page" : undefined}
                  className={`flex h-12 w-12 items-center justify-center rounded-full
                              bg-[var(--color-forest)] text-white
                              shadow-[0_4px_14px_-2px_rgba(198,161,91,0.55)]
                              ring-2 ring-[var(--color-gold)]/70
                              transition-all duration-300 ease-out
                              hover:bg-[var(--color-forest-dark)] hover:scale-105
                              active:scale-95`}
                >
                  <Plus className="h-6 w-6" strokeWidth={2.25} />
                </Link>
              </li>
            );
          }

          const Icona = voce.id === "home" ? Home : User;

          return (
            <li key={voce.id} className="flex-1 flex justify-center">
              <Link
                href={voce.href}
                aria-current={attivo ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5
                            text-[11px] transition-colors duration-300 ease-out
                            ${
                              attivo
                                ? "text-[var(--color-forest)]"
                                : "text-[var(--color-muted)] hover:text-[var(--color-forest-dark)]"
                            }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full
                              transition-colors duration-300
                              ${attivo ? "bg-[var(--color-forest-mist)]" : ""}`}
                >
                  <Icona className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                {voce.etichetta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
