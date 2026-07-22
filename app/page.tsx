import type { Metadata } from "next";
import { FinalCTA } from "../components/home/FinalCTA";
import { FleetSection } from "../components/home/FleetSection";
import { IntroSection } from "../components/home/IntroSection";
import { MetricsSection } from "../components/home/MetricsSection";
import { ProcessSection } from "../components/home/ProcessSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { TruckScrollHero } from "../components/TruckScrollHero";

export const metadata: Metadata = {
  title: "Transporte refrigerado nacional",
  description:
    "Transporte terrestre de carga refrigerada en Colombia con control operativo, trazabilidad, seguridad vial y cumplimiento.",
  keywords: [
    "transporte refrigerado Colombia",
    "cadena de frío",
    "transporte de carga sensible",
    "transporte terrestre de carga",
    "trazabilidad logística",
    "distribución urbana refrigerada",
    "carga con control de temperatura",
    "conservación de mercancía",
    "transporte nacional refrigerado",
    "TRANSFROID FAM SAS",
  ],
  openGraph: {
    title: "TRANSFROID FAM SAS | Transporte refrigerado nacional",
    description: "Cuidamos tu mercancía con trazabilidad, conservación y entregas coordinadas en Colombia.",
    type: "website",
    locale: "es_CO",
    siteName: "TRANSFROID FAM SAS",
  },
  twitter: {
    card: "summary",
    title: "TRANSFROID FAM SAS | Transporte refrigerado nacional",
    description: "Transporte refrigerado con cuidado, trazabilidad y cumplimiento.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--color-brand-dark)] text-[var(--color-brand-pale)]">
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
