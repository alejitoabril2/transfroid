"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { clamp, drawImageCover, prefersReducedMotion } from "../../lib/animations/scroll";
import { currentHeroFrames } from "./homeData";

const storyCopy = [
  {
    eyebrow: "Transporte de carga refrigerada",
    title: "Movemos tu carga. Protegemos su temperatura.",
    text: "Operaciones terrestres con cuidado, trazabilidad y cumplimiento.",
  },
  {
    eyebrow: "Ruta en control",
    title: "Seguridad y control en cada kilometro.",
    text: "La carga avanza con seguimiento operativo y respuesta ante novedades.",
  },
  {
    eyebrow: "Llegada coordinada",
    title: "De carretera a warehouse.",
    text: "Conectamos el recorrido con patios, centros logisticos y puntos de entrega.",
  },
  {
    eyebrow: "Destino protegido",
    title: "Conectamos tu carga con su destino.",
    text: "Solicita una operacion refrigerada alineada con tus necesidades.",
    cta: true,
  },
];

const CRITICAL_FRAME_COUNT = 18;

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetFrameRef = useRef(0);
  const displayedFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(0);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loaderPhase, setLoaderPhase] = useState<"loading" | "opening" | "done">("loading");

  useEffect(() => {
    if (loaderPhase !== "loading" || loadedCount < CRITICAL_FRAME_COUNT) {
      return;
    }

    const openingTimer = window.setTimeout(() => {
      setLoaderPhase("opening");
    }, 280);

    return () => {
      window.clearTimeout(openingTimer);
    };
  }, [loadedCount, loaderPhase]);

  useEffect(() => {
    if (loaderPhase !== "opening") {
      return;
    }

    const doneTimer = window.setTimeout(() => {
      setLoaderPhase("done");
    }, 980);

    return () => {
      window.clearTimeout(doneTimer);
    };
  }, [loaderPhase]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const reducedMotion = prefersReducedMotion();
    const context = canvas.getContext("2d");
    const { gsap, ScrollTrigger } = getGsap();
    let disposed = false;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      renderFrame();
    };

    const renderFrame = () => {
      rafRef.current = null;
      const roundedFrame = Math.min(
        currentHeroFrames.length - 1,
        Math.max(0, Math.round(displayedFrameRef.current)),
      );
      const image = imagesRef.current[roundedFrame] ?? imagesRef.current.find(Boolean);

      if (!image?.complete || !image.naturalWidth) {
        return;
      }

      canvas.dataset.frame = String(roundedFrame + 1);
      drawImageCover(context, image, window.innerWidth, window.innerHeight);

      const distance = targetFrameRef.current - displayedFrameRef.current;

      if (Math.abs(distance) > 0.02) {
        displayedFrameRef.current += distance * 0.34;
        rafRef.current = window.requestAnimationFrame(renderFrame);
      } else {
        displayedFrameRef.current = targetFrameRef.current;
      }
    };

    const requestRender = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(renderFrame);
      }
    };

    const loadFrame = (index: number) => {
      if (imagesRef.current[index]) {
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.src = currentHeroFrames[index];
      imagesRef.current[index] = image;

      image.onload = () => {
        if (disposed) {
          return;
        }

        loadedRef.current += 1;

        if (index === 0 || loadedRef.current % 8 === 0 || loadedRef.current === currentHeroFrames.length) {
          setLoadedCount(loadedRef.current);
        }

        if (index === Math.round(displayedFrameRef.current) || index === 0) {
          requestRender();
        }
      };
    };

    const loadRemainingFrames = () => {
      currentHeroFrames.forEach((_, index) => {
        if (index >= CRITICAL_FRAME_COUNT) {
          window.setTimeout(() => loadFrame(index), index * 8);
        }
      });
    };

    currentHeroFrames.slice(0, CRITICAL_FRAME_COUNT).forEach((_, index) => loadFrame(index));
    loadRemainingFrames();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (reducedMotion) {
      targetFrameRef.current = 0;
      displayedFrameRef.current = 0;
      requestRender();
      return () => {
        disposed = true;
        window.removeEventListener("resize", resizeCanvas);
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
        }
      };
    }

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: isMobile ? 0.12 : 0.55,
      },
    });

    heroTimeline
      .fromTo("[data-hero-panel='0']", { autoAlpha: 1, y: 0, filter: "blur(0px)" }, { autoAlpha: 0, y: -34, filter: "blur(5px)", duration: 0.18 }, 0.18)
      .fromTo("[data-hero-panel='1']", { autoAlpha: 0, y: 34, filter: "blur(5px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.16 }, 0.28)
      .to("[data-hero-panel='1']", { autoAlpha: 0, y: -34, filter: "blur(5px)", duration: 0.15 }, 0.48)
      .fromTo("[data-hero-panel='2']", { autoAlpha: 0, y: 34, filter: "blur(5px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.16 }, 0.58)
      .to("[data-hero-panel='2']", { autoAlpha: 0, y: -34, filter: "blur(5px)", duration: 0.15 }, 0.76)
      .fromTo("[data-hero-panel='3']", { autoAlpha: 0, y: 34, filter: "blur(5px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.16 }, 0.84)
      .to("[data-hero-overlay]", { opacity: 0.72, duration: 1 }, 0);

    const canvasTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const frameIndex = Math.min(
          currentHeroFrames.length - 1,
          Math.floor(clamp(self.progress) * currentHeroFrames.length),
        );

        if (frameIndex !== targetFrameRef.current) {
          targetFrameRef.current = frameIndex;
          requestRender();
        }

        const nextNavState = self.progress > 0.08;
        setIsNavSolid((current) => (current === nextNavState ? current : nextNavState));
      },
    });

    const parallaxTween = gsap.to("[data-hero-parallax]", {
      yPercent: -9,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      disposed = true;
      window.removeEventListener("resize", resizeCanvas);
      heroTimeline.kill();
      parallaxTween.kill();
      canvasTrigger.kill();

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-sequence relative h-[390vh] overflow-clip bg-[#031B3A] text-[#F5FCFF] max-md:h-[320svh]"
      aria-label="Historia visual de Transfroid controlada por scroll"
    >
      <div className="sticky top-0 h-screen overflow-hidden max-md:h-[100svh]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#031B3A]"
          aria-hidden="true"
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/sequences/current-hero/frame-001.jpg"
            alt="Tractocamion refrigerado Transfroid en operacion logistica"
          />
        </noscript>

        <div data-hero-parallax className="pointer-events-none absolute inset-0 opacity-70">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute left-[7vw] top-[18vh] hidden h-32 w-px bg-white/20 md:block" />
          <div className="absolute bottom-[18vh] right-[10vw] hidden h-px w-44 bg-white/20 md:block" />
        </div>

        <div data-hero-overlay className="absolute inset-0 opacity-50 transition-opacity">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,27,58,0.82)_0%,rgba(3,27,58,0.48)_34%,rgba(0,217,255,0.08)_62%,rgba(3,27,58,0.52)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#031B3A] via-[#031B3A]/62 to-transparent" />
        </div>

        <SiteNav isSolid={isNavSolid || isMenuOpen} isMenuOpen={isMenuOpen} onMenu={() => setIsMenuOpen((open) => !open)} />

        <div className="hero-copy pointer-events-none absolute inset-x-0 bottom-[11vh] z-20 px-5 md:bottom-[12vh] md:px-10 lg:px-14">
          <div className="relative max-w-[840px]">
            {storyCopy.map((item, index) => (
              <div
                className={`hero-story-panel ${index === 0 ? "opacity-100" : "opacity-0"} ${index > 0 ? "absolute inset-x-0 bottom-0" : ""}`}
                data-hero-panel={index}
                key={item.title}
              >
                <p className="terminal-label text-white/72">{item.eyebrow}</p>
                <h1 className="mt-5 max-w-4xl text-[clamp(2.55rem,6.2vw,6.8rem)] font-semibold uppercase leading-[0.9] text-white text-shadow">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/72 md:text-lg">
                  {item.text}
                </p>
                {item.cta ? (
                  <a
                    className="pointer-events-auto mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B7FF00] px-6 text-sm font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] focus:ring-offset-2 focus:ring-offset-[#031B3A]"
                    href="#cotizar"
                  >
                    Solicitar servicio
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 md:left-10 md:right-10">
          <span>{loadedCount < CRITICAL_FRAME_COUNT ? "Cargando escena" : "Scroll para avanzar"}</span>
          <span>{Math.min(loadedCount, currentHeroFrames.length)} / {currentHeroFrames.length} frames</span>
        </div>

        {loaderPhase !== "done" ? (
          <div className={`hero-loader hero-loader-${loaderPhase}`} aria-live="polite" aria-busy={loaderPhase === "loading"}>
            <div className="hero-loader-panel hero-loader-panel-top" />
            <div className="hero-loader-panel hero-loader-panel-bottom" />
            <div className="hero-loader-content">
              <p className="hero-loader-logo">Transfroid</p>
              <div className="hero-loader-line">
                <span style={{ width: `${Math.min(100, (loadedCount / CRITICAL_FRAME_COUNT) * 100)}%` }} />
              </div>
            </div>
          </div>
        ) : null}
      </div>

    </section>
  );
}

function SiteNav({
  isSolid,
  isMenuOpen,
  onMenu,
}: {
  isSolid: boolean;
  isMenuOpen: boolean;
  onMenu: () => void;
}) {
  const navItems = [
    ["Proceso", "#proceso"],
    ["Servicios", "#servicios"],
    ["Flota", "#flota"],
  ];

  return (
    <header className={`site-nav fixed left-0 right-0 top-0 z-50 ${isSolid ? "site-nav-solid" : ""}`}>
      <div className="mx-auto flex max-w-[1540px] items-center justify-between px-5 py-5 transition-all duration-300 md:px-10 lg:px-14">
        <a className="font-mono text-sm font-bold uppercase tracking-[0.28em] text-white focus:outline-none focus:ring-2 focus:ring-white" href="#">
          Transfroid
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/72 md:flex">
          {navItems.map(([label, href]) => (
            <a className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="hidden min-h-11 items-center rounded-full bg-[#B7FF00] px-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] md:inline-flex"
            href="#cotizar"
          >
            Solicitar servicio
          </a>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00D9FF]/45 text-white transition hover:bg-[#00D9FF] hover:text-[#031B3A] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] md:hidden"
            type="button"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={onMenu}
          >
            <span className="relative h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <div className={`mobile-nav-panel md:hidden ${isMenuOpen ? "mobile-nav-panel-open" : ""}`}>
        {navItems.map(([label, href]) => (
          <a className="border-b border-white/12 py-5 text-3xl font-semibold uppercase leading-none" href={href} key={href} onClick={onMenu}>
            {label}
          </a>
        ))}
        <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B7FF00] px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A]" href="#cotizar" onClick={onMenu}>
          Solicitar servicio
        </a>
      </div>
    </header>
  );
}
