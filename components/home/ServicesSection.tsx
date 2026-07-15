import Image from "next/image";
import { FadeSection } from "../motion/FadeSection";
import { services } from "./homeData";

export function ServicesSection() {
  return (
    <FadeSection className="bg-[#030712] px-5 py-20 text-white md:px-10 md:py-28 lg:px-14" >
      <div id="servicios" className="mx-auto max-w-[1540px]">
        <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <div>
            <p className="terminal-label">Servicios</p>
            <h2 className="mt-6 text-[clamp(2.2rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.95]">
              Lo que necesita una carga sensible.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/64">
            Soluciones terrestres enfocadas en control, coordinacion y cumplimiento, sin prometer datos que aun deban validarse en la operacion.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <a
              className="service-card group relative min-h-[430px] overflow-hidden rounded-md border border-white/12 bg-white/6 p-6 focus:outline-none focus:ring-2 focus:ring-white"
              href="#cotizar"
              key={service.title}
            >
              <Image
                src={service.frame}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/42 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[382px] flex-col justify-end">
                <span className="mb-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-lg transition group-hover:bg-white group-hover:text-[#06101f]">
                  &rarr;
                </span>
                <h3 className="text-2xl font-semibold uppercase leading-none">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/68">{service.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}
