import Image from "next/image";
import { FadeSection } from "../motion/FadeSection";
import { services } from "./homeData";

export function ServicesSection() {
  return (
    <FadeSection className="bg-[#031B3A] px-5 py-20 text-[#F5FCFF] md:px-10 md:py-28 lg:px-14" >
      <div id="servicios" className="mx-auto max-w-[1540px]">
        <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <div>
            <p className="terminal-label">Servicios</p>
            <h2 className="mt-6 text-[clamp(2.2rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.95]">
              Lo que necesita una carga sensible.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/64">
            Soluciones terrestres enfocadas en el control estricto de temperatura y humedad para evitar rupturas en la cadena de frío.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              className="service-card group relative min-h-[430px] overflow-hidden rounded-md border border-[var(--color-brand-cyan)]/20 bg-[var(--color-brand-ink)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-lime)]/55"
              key={service.title}
            >
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain object-top p-2 transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031B3A] via-[#031B3A]/42 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[382px] flex-col justify-end">
                <span className="mb-auto inline-flex min-h-9 items-center self-start rounded-full border border-[var(--color-brand-cyan)]/45 bg-[var(--color-brand-dark)]/55 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-lime)]">
                  Refrigerado
                </span>
                <h3 className="text-2xl font-semibold uppercase leading-none">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/76">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}
