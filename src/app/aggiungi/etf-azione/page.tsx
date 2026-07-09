"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

type FormEtfAzione = {
  nomeStrumento: string;
  ticker: string;
  quantita: string;
  prezzoMedio: string;
  dataAcquisto: string;
};

const FORM_VUOTO: FormEtfAzione = {
  nomeStrumento: "",
  ticker: "",
  quantita: "",
  prezzoMedio: "",
  dataAcquisto: "",
};

/**
 * Schermata "Aggiungi ETF / Azione". Per ora il salvataggio è un
 * placeholder: nessun dato viene persistito, si mostra solo una conferma
 * visiva — pronta per essere collegata a una vera scrittura in futuro.
 */
export default function AggiungiEtfAzionePage() {
  const [form, setForm] = useState<FormEtfAzione>(FORM_VUOTO);
  const [salvato, setSalvato] = useState(false);

  function aggiornaCampo<K extends keyof FormEtfAzione>(
    campo: K,
    valore: FormEtfAzione[K]
  ) {
    setForm((attuale) => ({ ...attuale, [campo]: valore }));
    setSalvato(false);
  }

  function handleSalva() {
    // TODO: quando ci sarà una scrittura reale, sostituire con la chiamata
    // che salva l'investimento (nome, ticker, quantità, prezzo, data).
    setSalvato(true);
    setForm(FORM_VUOTO);
    setTimeout(() => setSalvato(false), 3000);
  }

  const classeCampo =
    "w-full rounded-2xl border border-[var(--color-cream-dark)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] " +
    "outline-none transition-colors focus:border-[var(--color-gold)]";

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-md px-5 sm:px-6 py-8 sm:py-10 pb-16">
        <header>
          <Link
            href="/aggiungi"
            className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-forest-dark)] transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            <span className="font-display text-xl text-[var(--color-forest-dark)]">
              Aggiungi ETF / Azione
            </span>
          </Link>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSalva();
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">
              Nome strumento
            </span>
            <input
              type="text"
              placeholder="Es. Vanguard FTSE All-World"
              value={form.nomeStrumento}
              onChange={(e) =>
                aggiornaCampo("nomeStrumento", e.target.value)
              }
              className={classeCampo}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">
              Ticker <span className="text-[var(--color-muted)]/70">(facoltativo)</span>
            </span>
            <input
              type="text"
              placeholder="Es. VWCE"
              value={form.ticker}
              onChange={(e) => aggiornaCampo("ticker", e.target.value)}
              className={classeCampo}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-[var(--color-muted)]">
                Quantità
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder="0"
                value={form.quantita}
                onChange={(e) => aggiornaCampo("quantita", e.target.value)}
                className={classeCampo}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-[var(--color-muted)]">
                Prezzo medio
              </span>
              <div className="flex items-center rounded-2xl border border-[var(--color-cream-dark)] bg-white pr-4 focus-within:border-[var(--color-gold)]">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  placeholder="0"
                  value={form.prezzoMedio}
                  onChange={(e) =>
                    aggiornaCampo("prezzoMedio", e.target.value)
                  }
                  className="w-full rounded-2xl bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none"
                />
                <span className="text-xs text-[var(--color-muted)] shrink-0">
                  €
                </span>
              </div>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-[var(--color-muted)]">
              Data di acquisto
            </span>
            <input
              type="date"
              value={form.dataAcquisto}
              onChange={(e) => aggiornaCampo("dataAcquisto", e.target.value)}
              className={classeCampo}
            />
          </label>

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[var(--color-forest)] py-3.5 text-sm font-medium text-white
                       transition-colors hover:bg-[var(--color-forest-dark)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]
                       focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
          >
            Salva investimento
          </button>
        </form>

        {salvato && (
          <div
            role="status"
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full
                       bg-[var(--color-forest-dark)] px-4 py-2.5 text-xs text-white shadow-lg z-50"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Investimento salvato (placeholder)
          </div>
        )}
      </main>
    </div>
  );
}
