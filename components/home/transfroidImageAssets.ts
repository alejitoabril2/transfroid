export type TransfroidImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  status: "generated" | "reused" | "pending";
  kind: "hero" | "process" | "fleet" | "fleet-detail" | "cta";
  fallback: string | null;
};

export const heroImages = {
  desktop: {
    src: "/images/transfroid/hero/hero-desktop-master.webp",
    alt: "Tractomula refrigerada verde Transfroid en patio logístico",
    width: 2560,
    height: 1440,
    status: "generated",
    kind: "hero",
    fallback: "/sequences/current-hero/frame-001.jpg",
  },
  mobile: {
    src: "/images/transfroid/hero/hero-mobile-master.webp",
    alt: "Tractomula refrigerada verde Transfroid en composición móvil",
    width: 1080,
    height: 1920,
    status: "generated",
    kind: "hero",
    fallback: "/sequences/current-hero/frame-001.jpg",
  },
} as const satisfies Record<string, TransfroidImageAsset>;

export const processImages = {
  recoleccion: {
    src: "/images/transfroid/process/recoleccion.webp",
    alt: "Camión refrigerado llegando al punto de recolección",
    width: 1600,
    height: 1000,
    status: "generated",
    kind: "process",
    fallback: null,
  },
  conservacion: {
    src: "/images/transfroid/process/conservacion.webp",
    alt: "Tractomula refrigerada en ruta con control de temperatura",
    width: 1600,
    height: 1000,
    status: "generated",
    kind: "process",
    fallback: null,
  },
  trazabilidad: {
    src: "/images/transfroid/process/trazabilidad.webp",
    alt: "Tractomula refrigerada en ruta logística con seguimiento operativo",
    width: 1600,
    height: 1000,
    status: "generated",
    kind: "process",
    fallback: null,
  },
  entrega: {
    src: "/images/transfroid/process/entrega.webp",
    alt: "Camión refrigerado llegando al centro de distribución",
    width: 1600,
    height: 1000,
    status: "generated",
    kind: "process",
    fallback: null,
  },
} as const satisfies Record<string, TransfroidImageAsset>;

export const fleetImages = [
  {
    key: "mula",
    title: "Mula",
    text: "Transporte de mercancías sensibles en tractomulas equipadas con sistemas de refrigeración y control térmico.",
    operation: ["Operaciones nacionales", "Cargas de gran volumen", "Transporte refrigerado de larga distancia"],
    coverage: "Cobertura nacional, según la planeación de cada operación.",
    technical: "Configuración refrigerada. Las especificaciones se validan de acuerdo con la carga y la disponibilidad operativa.",
    image: {
      src: "/images/transfroid/fleet/mula.webp",
      alt: "Tractomula refrigerada verde Transfroid con tráiler blanco",
      width: 1400,
      height: 1050,
      status: "generated",
      kind: "fleet",
      fallback: null,
    },
    detailImage: {
      src: "/images/transfroid/fleet-details/mula-desktop.webp",
      alt: "Detalle de tractomula refrigerada Transfroid para larga distancia",
      width: 1800,
      height: 1200,
      status: "generated",
      kind: "fleet-detail",
      fallback: null,
    },
  },
  {
    key: "doble-troque",
    title: "Doble troque",
    text: "Transporte terrestre especializado para cargas sensibles que requieren capacidad, cumplimiento y coordinación operativa.",
    operation: ["Operaciones regionales", "Cargas medianas y grandes", "Mayor maniobrabilidad que una tractomula"],
    coverage: "Cobertura regional, de acuerdo con origen, destino y condiciones de acceso.",
    technical: "Configuración refrigerada. La información técnica se confirma para cada requerimiento.",
    image: {
      src: "/images/transfroid/fleet/doble-troque.webp",
      alt: "Camión doble troque refrigerado de Transfroid",
      width: 1400,
      height: 1050,
      status: "generated",
      kind: "fleet",
      fallback: null,
    },
    detailImage: {
      src: "/images/transfroid/fleet-details/doble-troque-desktop.webp",
      alt: "Detalle de camión doble troque refrigerado con dos ejes traseros",
      width: 1800,
      height: 1200,
      status: "generated",
      kind: "fleet-detail",
      fallback: null,
    },
  },
  {
    key: "sencillo",
    title: "Sencillo",
    text: "Vehículos sencillos refrigerados para operaciones urbanas y regionales que requieren control de temperatura y maniobrabilidad.",
    operation: ["Distribución urbana y regional", "Cargas medianas", "Acceso a zonas con restricciones"],
    coverage: "Cobertura urbana y regional, sujeta a la planeación de ruta.",
    technical: "Equipo refrigerado con configuración adaptable al servicio; especificaciones por validar.",
    image: {
      src: "/images/transfroid/fleet/sencillo.webp",
      alt: "Camión sencillo refrigerado para distribución regional",
      width: 1400,
      height: 1050,
      status: "generated",
      kind: "fleet",
      fallback: null,
    },
    detailImage: {
      src: "/images/transfroid/fleet-details/sencillo-desktop.webp",
      alt: "Detalle de camión sencillo refrigerado para distribución regional",
      width: 1800,
      height: 1200,
      status: "generated",
      kind: "fleet-detail",
      fallback: null,
    },
  },
  {
    key: "turbo",
    title: "Turbo",
    text: "Vehículos compactos refrigerados para distribución urbana, entregas ágiles y operaciones de menor volumen.",
    operation: ["Distribución urbana", "Entregas ágiles", "Operaciones de menor volumen"],
    coverage: "Cobertura urbana, según ventanas de entrega y condiciones de acceso.",
    technical: "Equipo refrigerado compacto; detalles técnicos disponibles al definir la operación.",
    image: {
      src: "/images/transfroid/fleet/turbo.webp",
      alt: "Camión turbo refrigerado para distribución urbana",
      width: 1400,
      height: 1050,
      status: "generated",
      kind: "fleet",
      fallback: null,
    },
    detailImage: {
      src: "/images/transfroid/fleet-details/turbo-desktop.webp",
      alt: "Detalle de camión turbo refrigerado para última milla",
      width: 1800,
      height: 1200,
      status: "generated",
      kind: "fleet-detail",
      fallback: null,
    },
  },
] as const satisfies ReadonlyArray<{
  key: string;
  title: string;
  text: string;
  operation: readonly string[];
  coverage: string;
  technical: string;
  image: TransfroidImageAsset;
  detailImage: TransfroidImageAsset;
}>;

export const finalCtaImages = {
  desktop: {
    src: "/images/transfroid/cta/cta-final-desktop.webp",
    alt: "Tractomula refrigerada verde llegando a un centro logístico",
    width: 2560,
    height: 1440,
    status: "generated",
    kind: "cta",
    fallback: null,
  },
  mobile: {
    src: "/images/transfroid/cta/cta-final-mobile.webp",
    alt: "Tractomula refrigerada verde en centro logístico en formato móvil",
    width: 1080,
    height: 1920,
    status: "generated",
    kind: "cta",
    fallback: null,
  },
} as const satisfies Record<string, TransfroidImageAsset>;
