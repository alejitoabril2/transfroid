import { processImages } from "./transfroidImageAssets";

export const currentHeroFrames = Array.from(
  { length: 120 },
  (_, index) => `/sequences/current-hero/frame-${String(index + 1).padStart(3, "0")}.jpg`,
);

export const processSteps = [
  {
    number: "01",
    title: "Recolección",
    text: "Cumplimos los requerimientos de cada cliente con oportunidad, desde el punto de origen hasta su destino final.",
    highlight: "Nuestro compromiso es entregar la carga con la misma calidad con la que fue recibida.",
    image: processImages.recoleccion,
  },
  {
    number: "02",
    title: "Conservación",
    text: "Conservamos las condiciones requeridas de temperatura y humedad para proteger la calidad e integridad de la mercancía durante todo el recorrido.",
    highlight: null,
    image: processImages.conservacion,
  },
  {
    number: "03",
    title: "Trazabilidad",
    text: "Garantizamos transparencia en cada entrega. Un registro completo y verificable es la base de un transporte confiable.",
    highlight: null,
    image: processImages.trazabilidad,
  },
  {
    number: "04",
    title: "Entrega",
    text: "Entregamos la carga con calidad y responsabilidad, preservando su temperatura e integridad hasta el destino final.",
    highlight: null,
    image: processImages.entrega,
  },
];

export const services = [
  {
    title: "Transporte refrigerado",
    text: "Traslado de mercancías sensibles en vehículos equipados con sistemas de refrigeración y control de temperatura.",
    image: processImages.conservacion,
  },
  {
    title: "Transporte de carga",
    text: "Movimiento terrestre especializado para cargas que requieren cumplimiento, coordinación y cuidado operativo.",
    image: processImages.recoleccion,
  },
  {
    title: "Operaciones logísticas",
    text: "Acompañamiento operativo para planificar y controlar el traslado de mercancías sensibles a la temperatura.",
    image: processImages.entrega,
  },
  {
    title: "Seguimiento y cumplimiento",
    text: "Control de procesos críticos que protege la integridad de la cadena de frío durante cada recorrido.",
    image: processImages.trazabilidad,
  },
];

export const serviceQualityPillars = [
  {
    title: "Confianza",
    text: "Seguridad desde la recepción hasta la entrega, con un manejo responsable de la cadena de frío.",
  },
  {
    title: "Oportunidad",
    text: "Respuesta ágil a las necesidades del cliente y a las condiciones propias de cada operación.",
  },
  {
    title: "Satisfacción",
    text: "Cumplimiento permanente de las expectativas del cliente y de las exigencias de cada carga.",
  },
  {
    title: "Garantía",
    text: "Entrega del producto bajo las condiciones óptimas de frío exigidas para su conservación.",
  },
];
