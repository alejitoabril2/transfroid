import { RevealText } from "../motion/RevealText";

export function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5FCFF] px-5 pb-20 pt-14 text-[#031B3A] md:px-10 md:pb-28 md:pt-20 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_18%_0%,rgba(0,217,255,0.28),transparent_34%),linear-gradient(180deg,rgba(3,27,58,0.08),rgba(245,252,255,0))]" />
      <div className="mx-auto max-w-[1540px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0077FF]">
          Logistica que mantiene su promesa
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-3xl text-[clamp(2.25rem,5.4vw,5.8rem)] font-semibold uppercase leading-[0.94] tracking-[-0.01em]">
            Transportamos mas que carga.
          </h2>
          <RevealText
            className="max-w-3xl text-[1.18rem] leading-[1.35] text-[#0C3B72] md:text-3xl"
            text="Movemos productos que requieren cuidado, precision y cumplimiento, conectando cada recorrido con operaciones seguras y eficientes."
          />
        </div>
      </div>
    </section>
  );
}
