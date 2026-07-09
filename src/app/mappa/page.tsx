"use client";

import { useState } from "react";
import { EsposizioneLista } from "@/components/mappa/esposizione-lista";
import { MappaHeader } from "@/components/mappa/mappa-header";
import { MappaInterattiva } from "@/components/mappa/mappa-interattiva";
import { PaeseBottomSheet } from "@/components/mappa/paese-bottom-sheet";
import { esposizioniGeografiche } from "@/lib/mock-data";

export default function MappaPage() {
  const [paeseSelezionatoId, setPaeseSelezionatoId] = useState<string | null>(
    null
  );

  const paeseSelezionato =
    esposizioniGeografiche.find((e) => e.id === paeseSelezionatoId) ?? null;

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 pb-16">
        <div className="flex flex-col gap-6 sm:gap-8">
          <MappaHeader />

          <MappaInterattiva
            paeseAttivo={paeseSelezionatoId}
            onSelezionaPaese={setPaeseSelezionatoId}
          />

          <EsposizioneLista
            paeseAttivo={paeseSelezionatoId}
            onSelezionaPaese={setPaeseSelezionatoId}
          />
        </div>
      </main>

      <PaeseBottomSheet
        paese={paeseSelezionato}
        onChiudi={() => setPaeseSelezionatoId(null)}
      />
    </div>
  );
}
