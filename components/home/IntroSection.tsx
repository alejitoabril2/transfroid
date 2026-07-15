import { RevealText } from "../motion/RevealText";

export function IntroSection() {
  return (
    <section className="bg-[#f4f7fb] px-5 py-20 text-[#07101f] md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1540px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#425168]">
          Logistica que mantiene su promesa
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-3xl text-[clamp(2.25rem,5.4vw,5.8rem)] font-semibold uppercase leading-[0.94] tracking-[-0.01em]">
            Transportamos mas que carga.
          </h2>
          <RevealText
            className="max-w-3xl text-[1.18rem] leading-[1.35] text-[#243047] md:text-3xl"
            text="Movemos productos que requieren cuidado, precision y cumplimiento, conectando cada recorrido con operaciones seguras y eficientes."
          />
        </div>
      </div>
    </section>
  );
}
