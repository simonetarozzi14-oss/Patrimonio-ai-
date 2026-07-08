"use client";

import { useState } from "react";
import { ParametriCard } from "@/components/simulatore/parametri-card";
import { ScenariChart } from "@/components/simulatore/scenari-chart";
import { TuoScenarioSezione } from "@/components/simulatore/tuo-scenario-sezione";
import { CosaSuccedeSe } from "@/components/simulatore/cosa-succede-se";
import {
  DisclaimerSimulatore,
  OsservazioneCard,
} from "@/components/simulatore/osservazione-card";
import { SimulatoreHeader } from "@/components/simulatore/simulatore-header";
import { opzioniOrizzonte, simulatoreParametriDefault } from "@/lib/mock-data";

export default function SimulatorePage() {
  const [patrimonioAttuale, setPatrimonioAttuale] = useState(
    simulatoreParametriDefault.patrimonioAttuale
  );
  const [pacMensile, setPacMensile] = useState(
    simulatoreParametriDefault.pacMensile
  );
  const [orizzonteAnni, setOrizzonteAnni] = useState(
    simulatoreParametriDefault.orizzonteAnni
  );
  const [rendimentoPersonalizzato, setRendimentoPersonalizzato] = useState(
    simulatoreParametriDefault.rendimentoPersonalizzato
  );

  function gestisciAumentoPac(importo: number) {
    setPacMensile((attuale) => attuale + importo);
  }

  function gestisciCambioAnni(delta: number) {
    setOrizzonteAnni((attuale) => {
      const min = opzioniOrizzonte[0];
      const max = opzioniOrizzonte[opzioniOrizzonte.length - 1];
      return Math.min(max, Math.max(min, attuale + delta));
    });
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 pb-16">
        <div className="flex flex-col gap-6 sm:gap-8">
          <SimulatoreHeader />

          <ParametriCard
            patrimonioAttuale={patrimonioAttuale}
            onCambiaPatrimonioAttuale={setPatrimonioAttuale}
            pacMensile={pacMensile}
            onCambiaPacMensile={setPacMensile}
            orizzonteAnni={orizzonteAnni}
            onCambiaOrizzonteAnni={setOrizzonteAnni}
          />

          <ScenariChart
            patrimonioAttuale={patrimonioAttuale}
            pacMensile={pacMensile}
            orizzonteAnni={orizzonteAnni}
          />

          <TuoScenarioSezione
            patrimonioAttuale={patrimonioAttuale}
            pacMensile={pacMensile}
            orizzonteAnni={orizzonteAnni}
            rendimentoPersonalizzato={rendimentoPersonalizzato}
            onCambiaRendimento={setRendimentoPersonalizzato}
          />

          <CosaSuccedeSe
            onAumentaPac={gestisciAumentoPac}
            onCambiaAnni={gestisciCambioAnni}
          />

          <OsservazioneCard />

          <DisclaimerSimulatore />
        </div>
      </main>
    </div>
  );
}
