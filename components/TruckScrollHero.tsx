"use client";

import { useEffect, useMemo, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const padFrameNumber = (frame: number) => String(frame).padStart(3, "0");

// Ajustes principales del hero:
// - FRAME_COUNT: cantidad de imagenes disponibles en la secuencia.
// - FRAME_BASE_PATH: ruta publica donde viven los JPG.
// - SCROLL_HEIGHT_CLASS: duracion/altura del scrubbing controlado por scroll.
// - DESKTOP_FOCAL_POINT / MOBILE_FOCAL_POINT: posicion visual del canvas.
// - HERO_COPY: textos visibles sobre la secuencia.
const FRAME_COUNT = 90;
const FRAME_BASE_PATH = "/sequences/truck";
const SCROLL_HEIGHT_CLASS = "h-[320vh]";
const DESKTOP_FOCAL_POINT = { x: 0.5, y: 0.5 };
const MOBILE_FOCAL_POINT = { x: 0.5, y: 0.5 };

const HERO_COPY = {
  eyebrow: "TRANSFROID FAM SAS",
  title: "Cadena de frio nacional con control inteligente",
  subtitle:
    "Movemos carga refrigerada con trazabilidad, seguridad vial y precision operativa en cada ruta.",
  primaryCta: "Solicitar cotizacion",
  secondaryCta: "Ver centro de control",
};

function getFrameSrc(frame: number) {
  return `${FRAME_BASE_PATH}/ezgif-frame-${padFrameNumber(frame)}.jpg`;
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  focalPoint: { x: number; y: number },
) {
  if (canvasWidth === 0 || canvasHeight === 0) {
    return;
  }

  const scale = Math.max(
    canvasWidth / image.naturalWidth,
    canvasHeight / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const x = (canvasWidth - width) * focalPoint.x;
  const y = (canvasHeight - height) * focalPoint.y;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(image, x, y, width, height);
}

export function ImageSequenceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null),
  );
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const frameSources = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => getFrameSrc(index + 1)),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    let isMounted = true;
    let preloadStarted = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;

    const getFocalPoint = () =>
      window.matchMedia("(max-width: 767px)").matches
        ? MOBILE_FOCAL_POINT
        : DESKTOP_FOCAL_POINT;

    const drawFrame = (frameIndex: number) => {
      const image =
        imagesRef.current[frameIndex] ??
        imagesRef.current
          .slice(0, frameIndex + 1)
          .reverse()
          .find(Boolean) ??
        imagesRef.current.find(Boolean);

      if (!image) {
        return;
      }

      drawImageCover(
        context,
        image,
        canvas.clientWidth,
        canvas.clientHeight,
        getFocalPoint(),
      );
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    const loadFrame = async (frameIndex: number) => {
      if (imagesRef.current[frameIndex]) {
        return imagesRef.current[frameIndex];
      }

      const image = new Image();
      image.decoding = "async";
      image.src = frameSources[frameIndex];
      imagesRef.current[frameIndex] = image;

      try {
        await image.decode();
      } catch {
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error(`No se pudo cargar ${image.src}`));
        });
      }

      if (isMounted && frameIndex === currentFrameRef.current) {
        drawFrame(frameIndex);
      }

      return image;
    };

    const scheduleSequencePreload = () => {
      if (preloadStarted) {
        return;
      }

      preloadStarted = true;
      const frameIndexes = Array.from(
        { length: FRAME_COUNT - 1 },
        (_, index) => index + 1,
      );

      const loadNext = () => {
        const nextFrame = frameIndexes.shift();

        if (nextFrame === undefined || !isMounted) {
          return;
        }

        void loadFrame(nextFrame).finally(() => {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(loadNext, { timeout: 250 });
          } else {
            window.setTimeout(loadNext, 24);
          }
        });
      };

      loadNext();
    };

    const updateFrameFromScroll = () => {
      animationFrameRef.current = null;

      if (reducedMotionRef.current) {
        currentFrameRef.current = FRAME_COUNT - 1;
        drawFrame(currentFrameRef.current);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = clamp(-rect.top / scrollableDistance);
      const nextFrame = Math.round(progress * (FRAME_COUNT - 1));

      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;
        drawFrame(nextFrame);
      }
    };

    const requestScrollUpdate = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(updateFrameFromScroll);
      }
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      requestScrollUpdate();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleSequencePreload();
        }
      },
      { rootMargin: "900px 0px" },
    );

    resizeCanvas();
    void loadFrame(reducedMotionRef.current ? FRAME_COUNT - 1 : 0).then(() => {
      resizeCanvas();
      requestScrollUpdate();
    });

    observer.observe(section);
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    requestScrollUpdate();

    return () => {
      isMounted = false;
      observer.disconnect();
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", resizeCanvas);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [frameSources]);

  return (
    <section
      ref={sectionRef}
      className={`relative ${SCROLL_HEIGHT_CLASS} overflow-clip bg-[#05070b]`}
      aria-label="Hero de Transfroid con camion controlado por scroll"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#05070b] bg-cover bg-center"
          style={{ backgroundImage: `url(${getFrameSrc(1)})` }}
          aria-label="Secuencia cinematografica de camion de transporte"
          role="img"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.84)_0%,rgba(3,7,18,0.58)_36%,rgba(3,7,18,0.12)_70%,rgba(5,7,11,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,transparent_0%,rgba(5,7,11,0.06)_40%,rgba(5,7,11,0.72)_100%)]" />
        <div className="absolute inset-0 opacity-55 premium-grid" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070b] to-transparent" />

        <header className="absolute left-6 right-6 top-5 z-30 flex items-center justify-between border-b border-white/12 pb-4 md:left-10 md:right-10">
          <a className="text-sm font-semibold uppercase tracking-[0.28em] text-white" href="#">
            Transfroid
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-50/80 md:flex">
            <a className="transition hover:text-white" href="#servicios">Servicios</a>
            <a className="transition hover:text-white" href="#control">Control</a>
            <a className="transition hover:text-white" href="#estrategia">Estrategia</a>
          </nav>
          <a
            className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/15"
            href="#cotizar"
          >
            Cotizar
          </a>
        </header>

        <div className="absolute inset-x-0 bottom-[8vh] z-20 px-6 md:bottom-[12vh] md:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-100/85">
              {HERO_COPY.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] text-white md:text-7xl">
              {HERO_COPY.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-200 md:text-xl">
              {HERO_COPY.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white"
                href="#cotizar"
              >
                {HERO_COPY.primaryCta}
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/22 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white/15"
                href="#control"
              >
                {HERO_COPY.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-xs uppercase tracking-[0.14em] text-cyan-50/80">
              <span className="rounded-lg border border-cyan-200/20 bg-cyan-200/8 px-3 py-2">GPS</span>
              <span className="rounded-lg border border-cyan-200/20 bg-cyan-200/8 px-3 py-2">PESV</span>
              <span className="rounded-lg border border-cyan-200/20 bg-cyan-200/8 px-3 py-2">Frio 24/7</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-6 right-6 z-30 md:left-10 md:right-10">
          <div className="h-px bg-white/20" />
        </div>
      </div>
    </section>
  );
}

export const TruckScrollHero = ImageSequenceHero;
