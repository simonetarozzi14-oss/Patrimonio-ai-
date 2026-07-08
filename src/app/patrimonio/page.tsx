import type { Metadata } from "next";
import { DettaglioComposizione } from "@/components/patrimonio/dettaglio-composizione";
import { DettaglioCronologia } from "@/components/patrimonio/dettaglio-cronologia";
import { DettaglioGrafico } from "@/components/patrimonio/dettaglio-grafico";
import { DettaglioHeader } from "@/components/patrimonio/dettaglio-header";
import { DettaglioRiepilogo } from "@/components/patrimonio/dettaglio-riepilogo";
import { DettaglioValorePrincipale } from "@/components/patrimonio/dettaglio-valore";

export const metadata: Metadata = {
  title: "Patrimonio Totale · Patrimonio AI",
};

export default function PatrimonioTotalePage() {
  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10 pb-20">
        <div className="flex flex-col gap-8 sm:gap-10">
          <DettaglioHeader />
          <DettaglioValorePrincipale />
          <DettaglioGrafico />
          <DettaglioRiepilogo />
          <DettaglioComposizione />
          <DettaglioCronologia />
        </div>
      </main>
    </div>
  );
}
