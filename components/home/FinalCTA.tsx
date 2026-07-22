import { BrandLogo } from "../brand/BrandLogo";
import { siteConfig } from "../../lib/siteConfig";
import { finalCtaImages } from "./transfroidImageAssets";

export function FinalCTA() {
  return (
    <section id="cotizar" className="relative min-h-[92vh] overflow-hidden bg-[var(--color-brand-dark)] px-5 py-20 text-[var(--color-brand-pale)] md:px-10 md:py-28 lg:px-14">
      <picture>
        <source media="(max-width: 767px)" srcSet={finalCtaImages.mobile.src} />
        <img
          src={finalCtaImages.desktop.src}
          alt={finalCtaImages.desktop.alt}
          width={finalCtaImages.desktop.width}
          height={finalCtaImages.desktop.height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-68 max-md:object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,27,58,0.92),rgba(3,27,58,0.56)_46%,rgba(0,217,255,0.16))]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#031B3A] to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-[1540px] flex-col items-start justify-end">
        <BrandLogo priority={false} />
        <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-brand-lime)]">
          TRANSFROID FAM SAS
        </p>
        <p className="terminal-label">Siguiente recorrido</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.45rem,6vw,6.4rem)] font-semibold uppercase leading-[0.9] text-shadow">
          TU CARGA MERECE LLEGAR COMO SALIÓ.
        </h2>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
          Entregas seguras, puntuales y con la cadena de frío garantizada.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B7FF00] px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]"
            href="/reservar"
          >
            Reservar ahora
          </a>
          {siteConfig.whatsappHref ? (
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#00D9FF]/45 px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#00D9FF] hover:text-[#031B3A] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]"
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
