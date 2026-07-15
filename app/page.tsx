import type { Metadata } from "next";
import { FinalCTA } from "../components/home/FinalCTA";
import { FleetSection } from "../components/home/FleetSection";
import { IntroSection } from "../components/home/IntroSection";
import { MetricsSection } from "../components/home/MetricsSection";
import { ProcessSection } from "../components/home/ProcessSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { TruckScrollHero } from "../components/TruckScrollHero";

export const metadata: Metadata = {
  title: "Transfroid | Transporte refrigerado nacional",
  description:
    "Transporte terrestre de carga refrigerada en Colombia con control operativo, trazabilidad, seguridad vial y cumplimiento.",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#030712] text-white">
      <TruckScrollHero />
      <IntroSection />
      <ProcessSection />
      <ServicesSection />
      <MetricsSection />
      <FleetSection />
      <FinalCTA />
    </main>
  );
}

