import { RevealText } from "../motion/RevealText";

export function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5FCFF] px-5 pb-20 pt-14 text-[#031B3A] md:px-10 md:pb-28 md:pt-20 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_18%_0%,rgba(0,217,255,0.28),transparent_34%),linear-gradient(180deg,rgba(3,27,58,0.08),rgba(245,252,255,0))]" />
      <div className="mx-auto max-w-[1540px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
          Logística que mantiene su promesa
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.75rem,6.5vw,7.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em] text-[#751C3A]">
            Transportamos más que carga.
          </h2>
          <div>
            <RevealText
              className="max-w-3xl text-[1.18rem] leading-[1.35] text-[var(--color-brand-copy)] md:text-3xl"
              text="Fidelizamos relaciones a través del cuidado, la precisión y el cumplimiento. Conectamos cada recorrido con operaciones seguras, eficientes y comprometidas con la integridad de tu mercancía."
            />
            <p className="mt-7 inline-flex max-w-full rounded-full bg-[var(--color-brand-lime)] px-4 py-3 text-center font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--color-brand-dark)] sm:px-5 sm:text-[0.68rem] sm:tracking-[0.2em]">
              Fidelizamos con cada entrega.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
