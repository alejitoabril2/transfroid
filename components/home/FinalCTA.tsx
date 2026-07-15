import Image from "next/image";

export function FinalCTA() {
  return (
    <section id="cotizar" className="relative min-h-[92vh] overflow-hidden bg-[#030712] px-5 py-20 text-white md:px-10 md:py-28 lg:px-14">
      <Image
        src="/sequences/truck/ezgif-frame-060.jpg"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover opacity-68"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.92),rgba(3,7,18,0.58)_46%,rgba(3,7,18,0.3))]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#030712] to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1540px] flex-col justify-end">
        <p className="terminal-label">Siguiente recorrido</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.45rem,6vw,6.4rem)] font-semibold uppercase leading-[0.9] text-shadow">
          Tu carga merece llegar como salio.
        </h2>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
          Conversemos sobre las necesidades de tu operacion.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#06101f] transition hover:bg-[#b8d9ff] focus:outline-none focus:ring-2 focus:ring-white"
            href="mailto:comercial@transfroid.com?subject=Solicitud%20de%20servicio%20Transfroid"
          >
            Solicitar servicio
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/28 px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#06101f] focus:outline-none focus:ring-2 focus:ring-white"
            href="https://wa.me/"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
