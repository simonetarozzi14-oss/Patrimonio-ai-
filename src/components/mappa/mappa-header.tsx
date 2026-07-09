import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function MappaHeader() {
  return (
    <header className="flex flex-col gap-3">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-forest-dark)] transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        <span className="font-display text-xl sm:text-2xl text-[var(--color-forest-dark)]">
          Distribuzione geografica
        </span>
      </Link>
      <p className="text-sm text-[var(--color-muted)] max-w-md">
        Scopri in quali Paesi e continenti è investito il tuo patrimonio.
      </p>
    </header>
  );
}
