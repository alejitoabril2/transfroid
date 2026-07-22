import Image from "next/image";
import { FadeSection } from "../motion/FadeSection";
import { fleetImages } from "./transfroidImageAssets";

export function FleetSection() {
  return (
    <FadeSection className="bg-[var(--color-brand-text)] px-5 py-20 text-[var(--color-brand-dark)] md:px-10 md:py-28 lg:px-14">
      <div id="flota" className="mx-auto max-w-[1540px]">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">Flota refrigerada</p>
            <h2 className="mt-6 text-[clamp(2.25rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.95]">
              Equipos para mover frío con criterio.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#294761]">
            Una flota disponible para responder a las condiciones de cada carga, ruta y operación.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {fleetImages.map((vehicle) => (
            <article
              className="overflow-hidden rounded-lg border border-[var(--color-brand-blue)]/16 bg-white shadow-[0_24px_80px_rgba(3,27,58,0.12)]"
              key={vehicle.key}
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-[#DDF8FF]">
                <Image
                  src={vehicle.detailImage.src}
                  alt={vehicle.detailImage.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)]/32 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-blue)]">Vehículo refrigerado</p>
                <h3 className="mt-4 text-[clamp(2rem,3.3vw,3.5rem)] font-semibold uppercase leading-none">{vehicle.title}</h3>
                <p className="mt-5 text-base leading-7 text-[#294761]">{vehicle.text}</p>

                <div className="mt-7 border-t border-[var(--color-brand-blue)]/14 pt-5">
                  <h4 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">Tipo de operación</h4>
                  <ul className="mt-4 space-y-2.5">
                    {vehicle.operation.map((item) => (
                      <li className="flex gap-3 text-sm leading-6 text-[#294761]" key={item}>
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-lime)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-7 grid gap-5 border-t border-[var(--color-brand-blue)]/14 pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">Cobertura recomendada</dt>
                    <dd className="mt-2 text-sm leading-6 text-[#294761]">{vehicle.coverage}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">Información técnica</dt>
                    <dd className="mt-2 text-sm leading-6 text-[#294761]">{vehicle.technical}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}
