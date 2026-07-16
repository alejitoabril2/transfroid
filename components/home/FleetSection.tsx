import Image from "next/image";
import { FadeSection } from "../motion/FadeSection";

export function FleetSection() {
  return (
    <FadeSection className="bg-[#F5FCFF] px-5 py-20 text-[#031B3A] md:px-10 md:py-28 lg:px-14">
      <div id="flota" className="mx-auto max-w-[1540px]">
        <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div className="fleet-mask relative min-h-[58vh] overflow-hidden rounded-md bg-[#DDF8FF]">
            <Image
              src="/sequences/current-hero/frame-096.jpg"
              alt="Tractocamion refrigerado en patio logistico"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0077FF]">Flota</p>
            <h2 className="mt-6 text-[clamp(2.25rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.95]">
              Equipos para mover frio con criterio.
            </h2>
            <p className="mt-7 text-lg leading-8 text-[#0C3B72]">
              La seccion queda preparada para incorporar fotografias propias, detalles tecnicos reales y capacidades verificadas de la flota Transfroid.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-[#0077FF]/18 bg-[#0077FF]/18 sm:grid-cols-3">
              {["Refrigeracion", "Ruta nacional", "Mantenimiento"].map((item) => (
                <div className="bg-[#F5FCFF] p-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#0C3B72]" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}
