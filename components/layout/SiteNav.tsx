"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "../brand/BrandLogo";

const navItems = [
  ["Proceso", "proceso"],
  ["Servicios", "servicios"],
  ["Flota", "flota"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    const updateTone = () => setSolid(!isHome || window.scrollY > 56);
    updateTone();
    window.addEventListener("scroll", updateTone, { passive: true });
    return () => window.removeEventListener("scroll", updateTone);
  }, [isHome]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className={`site-nav fixed left-0 right-0 top-0 z-50 ${solid || menuOpen ? "site-nav-solid" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape") setMenuOpen(false);
    }}>
      <div className="mx-auto flex max-w-[1540px] items-center justify-between px-5 py-3 transition-all duration-300 md:px-10 lg:px-14">
        <Link className="rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href="/" aria-label="Transfroid FAM SAS, volver al inicio">
          <BrandLogo priority compact alt="" />
        </Link>
        <nav className="hidden items-center gap-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/78 md:flex" aria-label="Navegación principal">
          <Link className="transition hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-white" href="/">Inicio</Link>
          {navItems.map(([label, id]) => (
            <Link className="transition hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-white" href={hrefFor(id)} key={id}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link className="hidden min-h-11 items-center rounded-full bg-[#B7FF00] px-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] md:inline-flex" href="/reservar">
            Reservar ahora
          </Link>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/45 text-white transition hover:bg-[#00D9FF] hover:text-[#031B3A] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] md:hidden" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="relative h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`mobile-nav-panel md:hidden ${menuOpen ? "mobile-nav-panel-open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <Link className="border-b border-white/12 py-5 text-3xl font-semibold uppercase leading-none" href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        {navItems.map(([label, id]) => (
          <Link className="border-b border-white/12 py-5 text-3xl font-semibold uppercase leading-none" href={hrefFor(id)} key={id} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
        <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B7FF00] px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A]" href="/reservar" onClick={() => setMenuOpen(false)}>
          Reservar ahora
        </Link>
      </div>
    </header>
  );
}
