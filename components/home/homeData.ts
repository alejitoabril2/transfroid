export const currentHeroFrames = Array.from(
  { length: 120 },
  (_, index) => `/sequences/current-hero/frame-${String(index + 1).padStart(3, "0")}.jpg`,
);

export const processSteps = [
  {
    number: "01",
    title: "Recoleccion",
    text: "Coordinamos la recogida de acuerdo con las necesidades de cada operacion.",
    frame: "/sequences/current-hero/frame-018.jpg",
  },
  {
    number: "02",
    title: "Conservacion",
    text: "Mantenemos las condiciones necesarias durante todo el recorrido.",
    frame: "/sequences/current-hero/frame-048.jpg",
  },
  {
    number: "03",
    title: "Seguimiento",
    text: "Supervisamos el movimiento de la carga y el cumplimiento de la operacion.",
    frame: "/sequences/current-hero/frame-078.jpg",
  },
  {
    number: "04",
    title: "Entrega",
    text: "Completamos cada recorrido con seguridad, trazabilidad y puntualidad.",
    frame: "/sequences/current-hero/frame-112.jpg",
  },
];

export const services = [
  {
    title: "Transporte refrigerado",
    text: "Rutas para productos que requieren control, cuidado y continuidad termica.",
    frame: "/sequences/current-hero/frame-030.jpg",
  },
  {
    title: "Transporte de carga",
    text: "Movimiento terrestre para operaciones que necesitan cumplimiento y coordinacion.",
    frame: "/sequences/current-hero/frame-058.jpg",
  },
  {
    title: "Operaciones logisticas",
    text: "Acompanamiento operativo desde la recoleccion hasta la entrega final.",
    frame: "/sequences/current-hero/frame-086.jpg",
  },
  {
    title: "Seguimiento y cumplimiento",
    text: "Control de novedades, trazabilidad del servicio y cierre ordenado de cada ruta.",
    frame: "/sequences/current-hero/frame-110.jpg",
  },
];

export const metricPlaceholders = [
  "Entregas a tiempo",
  "Disponibilidad de flota",
  "Novedades por ruta",
  "Cumplimiento documental",
];
