"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { clamp, drawImageCover, prefersReducedMotion } from "../../lib/animations/scroll";
import { BrandLogo } from "../brand/BrandLogo";
import { siteConfig } from "../../lib/siteConfig";
import { currentHeroFrames } from "./homeData";
import { heroImages } from "./transfroidImageAssets";

const storyCopy = [
  {
    eyebrow: "Transporte refrigerado",
    title: "MÁS QUE TRANSPORTE SOMOS LOS GUARDIANES DE TU MERCANCÍA.",
    text: "Precisión y frescura intacta con tecnología que preserva.",
  },
  {
    eyebrow: "Seguridad en ruta",
    title: "TRANSPORTAMOS TU CARGA CON RESPONSABILIDAD, OPORTUNIDAD Y PRESERVACIÓN DE LA CADENA DE FRÍO.",
    text: null,
  },
  {
    eyebrow: "Compromiso operativo",
    title: "TU TRANQUILIDAD ES NUESTRO COMPROMISO CON CADA KILÓMETRO.",
    text: null,
  },
  {
    eyebrow: "Destino coordinado",
    title: "DE LA CARRETERA AL CENTRO LOGÍSTICO.",
    text: null,
    cta: true,
  },
];

const CRITICAL_FRAME_COUNT = 12;
const FRAME_SMOOTHING = 9.5;
const MOBILE_FRAME_SMOOTHING = 24;

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetFrameRef = useRef(0);
  const displayedFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const lastFrameTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(0);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loaderPhase, setLoaderPhase] = useState<"loading" | "opening" | "done">("loading");

  useEffect(() => {
    if (prefersReducedMotion()) {
      const skipIntro = window.setTimeout(() => setLoaderPhase("done"), 0);
      return () => window.clearTimeout(skipIntro);
    }

    const maximumWait = window.setTimeout(() => setLoaderPhase("opening"), 3200);
    return () => window.clearTimeout(maximumWait);
  }, []);

  useEffect(() => {
    if (loaderPhase !== "loading" || loadedCount < CRITICAL_FRAME_COUNT) {
      return;
    }

    const openingTimer = window.setTimeout(() => {
      setLoaderPhase("opening");
    }, 1500);

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
    }, 1100);

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
      lastRenderedFrameRef.current = -1;
      renderFrame();
    };

    const renderFrame = (timestamp = performance.now()) => {
      rafRef.current = null;
      const elapsedSeconds = lastFrameTimeRef.current
        ? Math.min((timestamp - lastFrameTimeRef.current) / 1000, 0.064)
        : 1 / 60;
      lastFrameTimeRef.current = timestamp;
      const distance = targetFrameRef.current - displayedFrameRef.current;
      const frameSmoothing = isMobile ? MOBILE_FRAME_SMOOTHING : FRAME_SMOOTHING;
      const smoothingAmount = 1 - Math.exp(-frameSmoothing * elapsedSeconds);

      if (Math.abs(distance) > 0.02) {
        displayedFrameRef.current += distance * smoothingAmount;
      } else {
        displayedFrameRef.current = targetFrameRef.current;
      }

      const roundedFrame = Math.min(
        currentHeroFrames.length - 1,
        Math.max(0, Math.round(displayedFrameRef.current)),
      );

      if (roundedFrame !== lastRenderedFrameRef.current) {
        const image = imagesRef.current[roundedFrame] ?? imagesRef.current.find(Boolean);

        if (!image?.complete || !image.naturalWidth) {
          if (Math.abs(targetFrameRef.current - displayedFrameRef.current) > 0.02) {
            rafRef.current = window.requestAnimationFrame(renderFrame);
          }

          return;
        }

        canvas.dataset.frame = String(roundedFrame + 1);
        drawImageCover(
          context,
          image,
          window.innerWidth,
          window.innerHeight,
          window.innerWidth < 768
            ? 0.72
            : window.innerWidth / window.innerHeight < 1
              ? 0.66
              : 0.5,
        );
        lastRenderedFrameRef.current = roundedFrame;
      }

      if (Math.abs(targetFrameRef.current - displayedFrameRef.current) > 0.02) {
        rafRef.current = window.requestAnimationFrame(renderFrame);
      }
    };

    const requestRender = () => {
      if (rafRef.current === null) {
        lastFrameTimeRef.current = 0;
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

    const scheduledLoads: number[] = [];
    const loadRemainingFrames = () => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const constrained = connection?.saveData || connection?.effectiveType === "2g";
      const interval = constrained ? 28 : 10;

      currentHeroFrames.forEach((_, index) => {
        if (index >= CRITICAL_FRAME_COUNT) {
          scheduledLoads.push(window.setTimeout(() => loadFrame(index), (index - CRITICAL_FRAME_COUNT) * interval));
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
      lastRenderedFrameRef.current = -1;
      requestRender();
      return () => {
        disposed = true;
        window.removeEventListener("resize", resizeCanvas);
        scheduledLoads.forEach((timer) => window.clearTimeout(timer));
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
        scrub: isMobile ? 0.22 : 0.68,
      },
    });

    heroTimeline
      .fromTo(canvas, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08, ease: "none" }, 0.03)
      .set("[data-hero-panel]", { transformOrigin: "left bottom" }, 0)
      .fromTo("[data-hero-panel='0']", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.08, ease: "power2.inOut" }, 0.27)
      .fromTo("[data-hero-panel='1']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.35)
      .to("[data-hero-panel='1']", { autoAlpha: 0, y: -16, duration: 0.08, ease: "power2.inOut" }, 0.55)
      .fromTo("[data-hero-panel='2']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.63)
      .to("[data-hero-panel='2']", { autoAlpha: 0, y: -16, duration: 0.08, ease: "power2.inOut" }, 0.81)
      .fromTo("[data-hero-panel='3']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.89)
      .fromTo("[data-hero-overlay]", { opacity: 0.38 }, { opacity: 0.7, duration: 1, ease: "none" }, 0)
      .fromTo("[data-hero-copy]", { yPercent: 0 }, { yPercent: -5, duration: 1, ease: "none" }, 0)
      .fromTo("[data-hero-exit]", { autoAlpha: 0, yPercent: 18 }, { autoAlpha: 1, yPercent: 0, duration: 0.08, ease: "power2.out" }, 0.95)
      .to("[data-hero-footer]", { autoAlpha: 0, y: 12, duration: 0.08, ease: "power2.out" }, 0.9);

    const canvasTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const frameProgress = clamp(self.progress / (isMobile ? 0.82 : 0.94));
        const frameIndex = Math.min(
          currentHeroFrames.length - 1,
          Math.round(frameProgress * (currentHeroFrames.length - 1)),
        );

        if (frameIndex !== targetFrameRef.current) {
          targetFrameRef.current = frameIndex;
          for (let nearby = Math.max(0, frameIndex - 2); nearby <= Math.min(currentHeroFrames.length - 1, frameIndex + 4); nearby += 1) {
            loadFrame(nearby);
          }
          requestRender();
        }

        const nextNavState = self.progress > 0.08;
        setIsNavSolid((current) => (current === nextNavState ? current : nextNavState));
      },
    });

    const parallaxTween = gsap.to("[data-hero-parallax]", {
      yPercent: -6,
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
      scheduledLoads.forEach((timer) => window.clearTimeout(timer));
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
      className="hero-sequence relative h-[520vh] overflow-clip bg-[var(--color-brand-dark)] text-[var(--color-brand-pale)] max-md:h-[460svh]"
      aria-label="Historia visual de Transfroid controlada por scroll"
    >
      <div className="sticky top-0 h-screen overflow-hidden max-md:h-[100svh]">
        <picture>
          <source
            media="(max-width: 900px), (orientation: portrait)"
            srcSet={heroImages.mobile.src}
          />
          <img
            className="hero-static-fallback absolute inset-0 h-full w-full object-cover"
            src={heroImages.desktop.src}
            alt={heroImages.desktop.alt}
            width={heroImages.desktop.width}
            height={heroImages.desktop.height}
            fetchPriority="high"
          />
        </picture>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#031B3A] opacity-0"
          aria-hidden="true"
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={heroImages.desktop.src}
            alt={heroImages.desktop.alt}
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

        <div data-hero-copy className="hero-copy pointer-events-none absolute inset-x-0 top-[18svh] z-20 px-5 md:top-[16vh] md:px-10 lg:px-14">
          <div className="relative max-w-[520px]">
            {storyCopy.map((item, index) => (
              <div
                className={`hero-story-panel ${index === 0 ? "opacity-100" : "opacity-0"} ${index > 0 ? "absolute inset-x-0 bottom-0" : ""}`}
                data-hero-panel={index}
                key={item.title}
              >
                <p className="terminal-label text-white/72">{item.eyebrow}</p>
                {index === 0 ? (
                  <h1 className="mt-5 max-w-3xl text-[clamp(3.1rem,5.4vw,7rem)] font-semibold uppercase leading-[0.86] tracking-[-0.025em] text-white text-shadow">
                    {item.title}
                  </h1>
                ) : (
                  <p className={`mt-5 font-semibold uppercase leading-[0.9] text-white text-shadow ${index === 2 ? "text-[clamp(2.1rem,3.5vw,4.5rem)]" : "text-[clamp(2.55rem,4vw,5.3rem)]"}`}>
                    {item.title}
                  </p>
                )}
                {item.text ? (
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/72 md:text-lg">
                    {item.text}
                  </p>
                ) : null}
                {item.cta ? (
                  <HeroCta />
                ) : null}
              </div>
            ))}
            <div className="hero-reduced-cta pointer-events-auto">
              <HeroCta />
            </div>
          </div>
        </div>

        <div data-hero-exit className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[58svh] opacity-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,252,255,0)_0%,rgba(3,27,58,0.18)_18%,rgba(0,217,255,0.12)_38%,rgba(245,252,255,0.88)_76%,#F5FCFF_100%)]" />
          <div className="absolute inset-x-5 bottom-[18vh] h-px overflow-hidden bg-[#0077FF]/20 md:inset-x-10 lg:inset-x-14">
            <span className="block h-full w-1/2 bg-gradient-to-r from-[#00D9FF] via-[#B7FF00] to-transparent" />
          </div>
          <div className="absolute inset-x-5 bottom-[9vh] flex items-end justify-between gap-6 md:inset-x-10 lg:inset-x-14">
            <p className="max-w-[23rem] font-mono text-sm font-bold uppercase tracking-[0.16em] text-[#005FCC] md:text-base md:tracking-[0.2em]">
              La ruta continúa en una operación coordinada
            </p>
            <div className="hidden h-24 w-px bg-gradient-to-b from-[#00D9FF] to-transparent md:block" />
          </div>
        </div>

        <div data-hero-footer className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 md:left-10 md:right-10">
          <span>{loadedCount < CRITICAL_FRAME_COUNT ? "Cargando escena" : "Scroll para avanzar"}</span>
          <span>{Math.min(loadedCount, currentHeroFrames.length)} / {currentHeroFrames.length} frames</span>
        </div>

        {loaderPhase !== "done" ? (
          <div className={`hero-loader hero-loader-${loaderPhase}`} aria-live="polite" aria-busy={loaderPhase === "loading"}>
            <div className="hero-loader-panel hero-loader-panel-top" />
            <div className="hero-loader-panel hero-loader-panel-bottom" />
            <div className="hero-loader-content">
              <BrandLogo priority alt="" />
              <p className="hero-loader-logo">TRANSFROID FAM SAS</p>
              <p className="hero-loader-tagline">Más que transportar, somos los guardianes de su mercancía.</p>
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

function HeroCta() {
  return (
    <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
      <a
        className="inline-flex min-h-12 items-center rounded-full bg-[#B7FF00] px-6 text-sm font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] focus:ring-offset-2 focus:ring-offset-[#031B3A]"
        href="#cotizar"
      >
        Cotizar ahora
      </a>
      {siteConfig.whatsappHref ? (
        <a
          className="inline-flex min-h-12 items-center rounded-full border border-white/45 px-5 text-sm font-semibold text-white transition hover:border-[#B7FF00] hover:text-[#B7FF00] focus:outline-none focus:ring-2 focus:ring-[#B7FF00]"
          href={siteConfig.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          Hablar por WhatsApp
        </a>
      ) : null}
    </div>
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
    <header
      className={`site-nav fixed left-0 right-0 top-0 z-50 ${isSolid ? "site-nav-solid" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) onMenu();
      }}
    >
      <div className="mx-auto flex max-w-[1540px] items-center justify-between px-5 py-5 transition-all duration-300 md:px-10 lg:px-14">
        <a
          className="rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B7FF00]"
          href="#"
          aria-label="Transfroid FAM SAS, volver al inicio"
        >
          <BrandLogo priority compact alt="" />
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
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={onMenu}
          >
            <span className="relative h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-nav-panel md:hidden ${isMenuOpen ? "mobile-nav-panel-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
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
