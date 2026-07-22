import Link from "next/link";
import { BrandLogo } from "../brand/BrandLogo";
import { siteConfig } from "../../lib/siteConfig";

const navItems = [
  ["Inicio", "/"],
  ["Proceso", "/#proceso"],
  ["Servicios", "/#servicios"],
  ["Flota", "/#flota"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#00D9FF]/20 bg-[#031B3A] text-[#F5FCFF]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B7FF00] to-transparent" />
      <div className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-[#00D9FF]/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1540px] gap-10 px-5 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:px-14">
        <div>
          <BrandLogo compact alt="TRANSFROID FAM SAS" />
          <p className="mt-5 max-w-xs text-base leading-7 text-white/72">Más que transporte, somos los guardianes de tu mercancía.</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#B7FF00]">Navegación</p>
          <nav className="mt-5 grid gap-3 text-sm text-white/75" aria-label="Navegación del pie de página">
            {navItems.map(([label, href]) => <Link className="w-fit transition hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href={href} key={href}>{label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#B7FF00]">Contacto</p>
          <div className="mt-5 grid gap-4 text-sm">
            <a className="transition hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href={`mailto:${siteConfig.contactEmail}`}>
              <span className="block text-white/45">Correo provisional</span>
              <span className="mt-1 block font-semibold">{siteConfig.contactEmail}</span>
            </a>
            <a className="transition hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href={`tel:${siteConfig.phoneHref}`}>
              <span className="block text-white/45">Teléfono provisional</span>
              <span className="mt-1 block font-semibold">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-white/12 bg-white/5 p-5">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#00D9FF]">Siguiente recorrido</p>
          <p className="mt-4 text-xl font-semibold leading-tight">¿Listo para coordinar tu carga?</p>
          <Link className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#B7FF00] px-5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] focus:ring-offset-2 focus:ring-offset-[#031B3A]" href="/reservar">Reservar ahora</Link>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-[#06142E]">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-3 px-5 py-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/48 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14">
          <span>© {new Date().getFullYear()} TRANSFROID FAM SAS</span>
          <span>Transporte refrigerado · Colombia</span>
        </div>
      </div>
    </footer>
  );
}
