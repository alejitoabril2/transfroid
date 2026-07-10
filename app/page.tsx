import type { Metadata } from "next";
import { TruckScrollHero } from "../components/TruckScrollHero";

export const metadata: Metadata = {
  title: "Transfroid | Cadena de frio con control nacional",
  description:
    "Transporte terrestre de carga refrigerada en Colombia con trazabilidad, seguridad vial, cumplimiento normativo y control operativo de punta a punta.",
};

const missionPillars = [
  {
    label: "Mision",
    title: "Transportar carga refrigerada con precision operativa",
    text: "Garantizamos cadena de frio, seguridad en ruta, puntualidad y satisfaccion del cliente con equipo competente, flota cuidada y cumplimiento normativo.",
  },
  {
    label: "Vision 2026-2028",
    title: "Liderazgo nacional en transporte refrigerado",
    text: "Avanzamos para ser reconocidos por excelencia en servicio, confiabilidad, seguridad vial, preservacion de temperatura y mejora continua.",
  },
];

const trustSignals = [
  ["100%", "control de cadena de frio", "Inspeccion, trazabilidad y reaccion operativa antes, durante y despues del viaje."],
  ["98%+", "entregas oportunas", "Planeacion de rutas, seguimiento de novedades y comunicacion clara con el cliente."],
  ["95%+", "disponibilidad de flota", "Mantenimiento preventivo para reducir fallas, tiempos muertos y riesgos de operacion."],
  ["PESV", "seguridad vial activa", "Cultura de conduccion segura, gestion del riesgo y respuesta ante emergencias."],
];

const capabilities = [
  "Monitoreo GPS y control de ruta",
  "Seguimiento de temperatura en tiempo real",
  "Inspecciones preoperacionales digitales",
  "Mantenimiento preventivo de unidades refrigeradas",
  "Cumplimiento legal en transporte, SST y seguridad vial",
  "Mejora continua basada en indicadores",
];

const services = [
  "Alimentos",
  "Lacteos",
  "Carnicos",
  "Farmaceutico",
  "Agroindustrial",
  "Distribucion refrigerada",
];

const roadmap = [
  {
    phase: "2026",
    title: "Estandarizacion y control",
    text: "Fortalecimiento del PESV, mantenimiento preventivo, indicadores operativos y procedimientos de cargue, ruta y entrega.",
  },
  {
    phase: "2027",
    title: "Digitalizacion operativa",
    text: "Integracion de tableros, ordenes de servicio, comprobantes, alertas de temperatura y analisis por ruta, cliente y vehiculo.",
  },
  {
    phase: "2028",
    title: "Escala sostenible",
    text: "Renovacion gradual de flota, alianzas logisticas, nuevos segmentos y expansion de cobertura con eficiencia financiera.",
  },
];

const controlMetrics = [
  ["Temp. carga", "2.8 C", "estable"],
  ["Ruta activa", "Nacional", "en seguimiento"],
  ["Flota", "95%", "disponible"],
  ["Cadena frio", "100%", "objetivo viaje"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#05070b] text-white">
      <TruckScrollHero />

      <section className="relative isolate overflow-hidden border-y border-white/10 bg-[#070b12] px-6 py-20 md:px-10">
        <div className="absolute inset-0 -z-10 premium-grid opacity-70" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Direccionamiento estrategico
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Una operacion fria, segura y medible para carga sensible.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {missionPillars.map((item) => (
              <article className="frost-panel p-6" key={item.label}>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
                  {item.label}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Diferenciales
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
                Control operativo para promesas que no pueden romperse.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base">
              Transfroid conecta seguridad vial, cumplimiento, mantenimiento y tecnologia para proteger el valor de cada entrega refrigerada.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustSignals.map(([value, label, text]) => (
              <article className="frost-panel group p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45" key={label}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-200/30 bg-cyan-200/10 font-mono text-sm font-bold text-cyan-100">
                  {value}
                </div>
                <h3 className="mt-6 text-lg font-semibold capitalize text-white">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-200" key={capability}>
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="control" className="relative isolate overflow-hidden bg-[#081018] px-6 py-24 md:px-10">
        <div className="absolute inset-0 -z-10 data-scan opacity-80" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200">
              Centro de control frio
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Temperatura, ruta y riesgo en un mismo tablero.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
              La operacion se gestiona con informacion accionable: ubicacion, estado de flota, alertas de refrigeracion, entregas y seguimiento a indicadores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {services.map((service) => (
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100" key={service}>
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="frost-panel relative overflow-hidden p-5 md:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200">
                  TRANSFROID OPS
                </p>
                <h3 className="mt-2 text-xl font-semibold">Ruta refrigerada activa</h3>
              </div>
              <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
                online
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {controlMetrics.map(([label, value, status]) => (
                <div className="rounded-lg border border-white/10 bg-black/20 p-4" key={label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <strong className="font-mono text-3xl text-white">{value}</strong>
                    <span className="text-xs text-emerald-200">{status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-cyan-200/15 bg-cyan-200/[0.04] p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>Bogota</span>
                <span>Entrega</span>
              </div>
              <div className="relative mt-6 h-2 rounded-full bg-white/10">
                <div className="absolute inset-y-0 left-0 w-[74%] rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-200 shadow-[0_0_28px_rgba(103,232,249,0.45)]" />
                <span className="absolute left-[72%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-300">
                Monitoreo continuo para anticipar desviaciones, proteger la carga y sostener la promesa de servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="estrategia" className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Plan publico 2026-2028
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Crecimiento sostenible con tecnologia, seguridad y servicio.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {roadmap.map((item) => (
              <article className="frost-panel p-6" key={item.phase}>
                <p className="font-mono text-sm font-bold text-cyan-200">{item.phase}</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.9),rgba(5,7,11,0.96)_48%,rgba(20,83,45,0.55))] p-6 shadow-2xl shadow-cyan-950/30 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              Transporte refrigerado con control total
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
              Convirtamos tu operacion de frio en una ruta segura, visible y confiable.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-cyan-50/80">
              Coordinamos carga refrigerada a nivel nacional con enfoque en trazabilidad, puntualidad, cumplimiento y mejora continua.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-white"
            href="mailto:comercial@transfroid.com?subject=Cotizacion%20de%20transporte%20refrigerado"
          >
            Solicitar cotizacion
          </a>
        </div>
      </section>
    </main>
  );
}
