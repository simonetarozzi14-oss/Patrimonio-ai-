"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, PenLine } from "lucide-react";

/**
 * Header della schermata "Patrimonio Totale": link di ritorno alla Home,
 * titolo, e il pulsante "Aggiorna" che apre un piccolo pannello con le due
 * future modalità di aggiornamento (carica screenshot / inserimento
 * manuale). Le due opzioni sono già visibili così l'utente capisce subito
 * come funzionerà, ma per ora non fanno nulla (nessun database/OCR reale).
 */
export function DettaglioHeader() {
  const [menuAperto, setMenuAperto] = useState(false);

  function handleCaricaScreenshot() {
    // TODO: aprire il flusso di caricamento screenshot (OCR) quando pronto
    setMenuAperto(false);
  }

  function handleInserimentoManuale() {
    // TODO: aprire il form di inserimento manuale quando pronto
    setMenuAperto(false);
  }

  return (
    <header className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-forest-dark)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        <span className="font-display text-xl text-[var(--color-forest-dark)]">
          Patrimonio Totale
        </span>
      </Link>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuAperto((aperto) => !aperto)}
          aria-expanded={menuAperto}
          aria-haspopup="menu"
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-cream-dark)] bg-white
                     px-3.5 py-2 text-xs font-medium text-[var(--color-forest-dark)]
                     shadow-[0_1px_2px_rgba(31,61,46,0.04)] transition-colors
                     hover:bg-[var(--color-forest-mist)]"
        >
          <span aria-hidden="true">📷</span>
          Aggiorna
        </button>

        {menuAperto && (
          <>
            {/* overlay invisibile per chiudere il menu cliccando fuori */}
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setMenuAperto(false)}
              className="fixed inset-0 z-40 cursor-default"
            />
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--color-cream-dark)]
                         bg-white shadow-[0_12px_32px_-8px_rgba(31,61,46,0.25)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleCaricaScreenshot}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-ink)]
                           hover:bg-[var(--color-forest-mist)] transition-colors"
              >
                <Camera className="h-4 w-4 text-[var(--color-forest)]" strokeWidth={2} />
                Carica screenshot
              </button>
              <div className="h-px bg-[var(--color-cream-dark)]" />
              <button
                type="button"
                role="menuitem"
                onClick={handleInserimentoManuale}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-[var(--color-ink)]
                           hover:bg-[var(--color-forest-mist)] transition-colors"
              >
                <PenLine className="h-4 w-4 text-[var(--color-forest)]" strokeWidth={2} />
                Inserimento manuale
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
