import type { Metadata } from "next";
import { TruckScrollHero } from "../components/TruckScrollHero";

export const metadata: Metadata = {
  title: "Transfroid | Operacion refrigerada nacional",
  description:
    "Transporte terrestre de carga refrigerada en Colombia con cadena de frio, trazabilidad, seguridad vial, control operativo y cumplimiento normativo.",
};

const operatingSystem = [
  {
    code: "01",
    label: "Cadena de frio",
    text: "Control de temperatura, inspecciones previas y seguimiento durante la ruta para proteger carga sensible.",
  },
  {
    code: "02",
    label: "Seguridad vial",
    text: "Operacion alineada con PESV, conduccion segura, gestion del riesgo y respuesta ante novedades.",
  },
  {
    code: "03",
    label: "Flota disponible",
    text: "Mantenimiento preventivo y verificacion de equipos de refrigeracion para sostener continuidad operativa.",
  },
  {
    code: "04",
    label: "Cumplimiento",
    text: "Procesos orientados a normativa de transporte, SST, documentacion y trazabilidad del servicio.",
  },
];

const sectors = [
  "Alimentos",
  "Lacteos",
  "Carnicos",
  "Farmaceutico",
  "Agroindustrial",
  "Distribucion urbana",
];

const metrics = [
  ["100%", "Objetivo cadena de frio"],
  ["98%+", "Entregas oportunas"],
  ["95%+", "Disponibilidad de flota"],
  ["24/7", "Seguimiento operativo"],
];

const platformRows = [
  ["GPS", "Ruta nacional", "En seguimiento"],
  ["TEMP", "2.8 C", "Rango estable"],
  ["FLOTA", "95%", "Disponibilidad objetivo"],
  ["PESV", "Activo", "Seguridad vial"],
  ["MANT", "Preventivo", "Control mensual"],
];

const roadmap = [
  ["2026", "Estandarizar", "PESV, mantenimiento preventivo, indicadores, inspecciones y procedimientos operativos."],
  ["2027", "Digitalizar", "Ordenes de servicio, comprobantes, tableros, alertas de temperatura y control documental."],
  ["2028", "Escalar", "Renovacion de flota, nuevos segmentos, alianzas logisticas y crecimiento sostenible."],
];

const policies = [
  "Etica, honestidad y transparencia",
  "Proteccion de la carga y de la cadena de frio",
  "Mejora continua en procesos e indicadores",
  "Respeto por las personas y el medio ambiente",
  "Orientacion al cliente y calidad del servicio",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] text-white">
      <TruckScrollHero />

      <section className="terminal-band border-y border-white/15 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 md:flex-row md:items-center md:justify-between">
          <span>TRANSFROID FAM SAS / Transporte terrestre refrigerado</span>
          <span>Cadena de frio / Seguridad vial / Trazabilidad / Cobertura nacional</span>
        </div>
      </section>

      <section className="relative px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-3xl">
            <p className="terminal-label">Direccionamiento 2026-2028</p>
            <h2 className="mt-5 text-[clamp(2.4rem,6vw,6.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-white">
              Operacion fria. Control real.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15 md:grid-cols-2">
            <article className="bg-[#080808] p-6 md:p-8">
              <p className="terminal-label">Mision</p>
              <h3 className="mt-5 text-2xl font-semibold uppercase leading-none text-white">
                Transportar con precision
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Prestamos servicios de transporte terrestre de carga refrigerada a nivel nacional, garantizando cadena de frio, seguridad, puntualidad y satisfaccion del cliente.
              </p>
            </article>
            <article className="bg-[#080808] p-6 md:p-8">
              <p className="terminal-label">Vision</p>
              <h3 className="mt-5 text-2xl font-semibold uppercase leading-none text-white">
                Liderazgo refrigerado
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Buscamos ser reconocidos por excelencia en servicio, seguridad vial, cumplimiento, confiabilidad, preservacion de temperatura y mejora continua.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid border-y border-white/15 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-white/15 py-8 lg:border-b-0 lg:border-r lg:pr-8">
              <p className="terminal-label">Sistema operativo</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
                Lo necesario para mover carga sensible.
              </h2>
            </div>
            <div className="grid gap-px bg-white/15 lg:grid-cols-2">
              {operatingSystem.map((item) => (
                <article className="group bg-[#050505] p-6 transition hover:bg-white hover:text-black md:p-8" key={item.code}>
                  <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-current opacity-60">
                    <span>{item.code}</span>
                    <span>{item.label}</span>
                  </div>
                  <p className="mt-12 text-lg leading-7 text-current opacity-70">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {sectors.map((sector) => (
              <div className="terminal-chip" key={sector}>{sector}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="control" className="terminal-grid-bg border-y border-white/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[1fr_1.15fr] xl:items-start">
          <div>
            <p className="terminal-label">Centro de control frio</p>
            <h2 className="mt-5 text-[clamp(2.4rem,6vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              La ruta convertida en senales.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
              Cada viaje debe poder leerse: ubicacion, temperatura, estado de flota, cumplimiento, novedades y evidencia de entrega.
            </p>
          </div>

          <div className="terminal-panel">
            <div className="flex items-center justify-between border-b border-white/15 p-4 font-mono text-xs uppercase tracking-[0.18em] text-white/55 md:p-5">
              <span>TRANSFROID / OPS</span>
              <span className="text-white">ONLINE</span>
            </div>
            <div className="grid gap-px bg-white/15 md:grid-cols-2">
              {metrics.map(([value, label]) => (
                <div className="bg-[#090909] p-5 md:p-6" key={label}>
                  <strong className="font-mono text-5xl font-semibold tracking-[-0.06em] text-white">{value}</strong>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/50">{label}</p>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-5">
              <div className="overflow-hidden rounded-sm border border-white/15">
                {platformRows.map(([code, value, status]) => (
                  <div className="grid grid-cols-[0.55fr_1fr_1fr] border-b border-white/10 last:border-b-0" key={code}>
                    <span className="bg-white px-3 py-3 font-mono text-xs font-bold text-black">{code}</span>
                    <span className="px-3 py-3 font-mono text-xs uppercase tracking-[0.14em] text-white">{value}</span>
                    <span className="px-3 py-3 text-xs uppercase tracking-[0.14em] text-white/55">{status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[74%] bg-white" />
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                <span>Origen</span>
                <span>Ruta activa</span>
                <span>Entrega</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="estrategia" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="terminal-label">Plan publico</p>
              <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
                2026-2028: crecer sin perder control.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15">
              {roadmap.map(([year, title, text]) => (
                <article className="grid bg-[#080808] p-6 md:grid-cols-[0.3fr_0.7fr] md:p-8" key={year}>
                  <div>
                    <p className="font-mono text-4xl font-semibold tracking-[-0.06em]">{year}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold uppercase leading-none">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/65">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-5">
            {policies.map((policy) => (
              <div className="border border-white/15 p-4 text-sm leading-6 text-white/65" key={policy}>
                {policy}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1500px] border border-white/15 bg-white text-black">
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black/55">
                Cotizacion / carga refrigerada nacional
              </p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.4rem,6vw,6.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">
                Mover frio con evidencia.
              </h2>
            </div>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              href="mailto:comercial@transfroid.com?subject=Cotizacion%20de%20transporte%20refrigerado"
            >
              Solicitar cotizacion
            </a>
          </div>
          <div className="border-t border-black/15 p-6 font-mono text-xs uppercase tracking-[0.18em] text-black/55 md:p-10">
            Transporte terrestre refrigerado / trazabilidad / seguridad vial / cumplimiento / mejora continua
          </div>
        </div>
      </section>
    </main>
  );
}
