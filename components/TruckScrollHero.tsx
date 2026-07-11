"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

// Ajustes principales del hero:
// - HERO_VIDEO_SRC: video optimizado usado para el scrubbing principal.
// - SCROLL_HEIGHT_CLASS: duracion/altura del scrubbing controlado por scroll.
// - DESKTOP_FOCAL_POINT / MOBILE_FOCAL_POINT: posicion visual del canvas.
// - HERO_TITLE: texto visible sobre la secuencia.
const HERO_VIDEO_SRC = "/videos/transfroid-hero-1080p.mp4";
const SCROLL_HEIGHT_CLASS = "h-[320vh]";
const DESKTOP_FOCAL_POINT = { x: 0.5, y: 0.5 };
const MOBILE_FOCAL_POINT = { x: 0.5, y: 0.5 };

const HERO_TITLE = "Transporte refrigerado bajo control.";

function drawMediaCover(
  context: CanvasRenderingContext2D,
  media: CanvasImageSource,
  mediaWidth: number,
  mediaHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  focalPoint: { x: number; y: number },
) {
  if (canvasWidth === 0 || canvasHeight === 0 || mediaWidth === 0 || mediaHeight === 0) {
    return;
  }

  const scale = Math.max(canvasWidth / mediaWidth, canvasHeight / mediaHeight);
  const width = mediaWidth * scale;
  const height = mediaHeight * scale;
  const x = (canvasWidth - width) * focalPoint.x;
  const y = (canvasHeight - height) * focalPoint.y;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(media, x, y, width, height);
}

function drawVideoCover(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvasWidth: number,
  canvasHeight: number,
  focalPoint: { x: number; y: number },
) {
  drawMediaCover(
    context,
    video,
    video.videoWidth,
    video.videoHeight,
    canvasWidth,
    canvasHeight,
    focalPoint,
  );
}

export function ImageSequenceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

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
    let isVideoReady = false;
    let pendingVideoSeek = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    const video = document.createElement("video");
    videoRef.current = video;
    video.src = HERO_VIDEO_SRC;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const getFocalPoint = () =>
      window.matchMedia("(max-width: 767px)").matches
        ? MOBILE_FOCAL_POINT
        : DESKTOP_FOCAL_POINT;

    const updateTitleReveal = (progress: number) => {
      const title = titleRef.current;

      if (!title) {
        return;
      }

      const revealProgress = reducedMotionRef.current
        ? 1
        : clamp((progress - 0.08) / 0.46);

      title.style.setProperty("--hero-title-progress", String(revealProgress));
    };

    const drawVideo = () => {
      if (!isVideoReady) {
        return;
      }

      drawVideoCover(
        context,
        video,
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
      drawVideo();
    };

    const seekVideo = (progress: number) => {
      if (!isVideoReady || pendingVideoSeek || !Number.isFinite(video.duration)) {
        return;
      }

      const targetTime = clamp(progress) * video.duration;

      if (Math.abs(video.currentTime - targetTime) < 0.035) {
        drawVideo();
        return;
      }

      pendingVideoSeek = true;
      video.currentTime = targetTime;
    };

    const updateVideoProgress = (progress: number) => {
      currentProgressRef.current = progress;
      seekVideo(progress);
    };

    const handleVideoReady = () => {
      if (!isMounted) {
        return;
      }

      isVideoReady = true;
      updateVideoProgress(currentProgressRef.current);
      drawVideo();
    };

    const handleVideoSeeked = () => {
      pendingVideoSeek = false;

      if (!isMounted) {
        return;
      }

      drawVideo();

      const targetTime = clamp(currentProgressRef.current) * video.duration;

      if (Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) >= 0.035) {
        seekVideo(currentProgressRef.current);
      }
    };

    const handleVideoError = () => {
      isVideoReady = false;
    };

    const loadVideo = () => {
      try {
        video.load();
      } catch {
        isVideoReady = false;
      }
    };

    const updateFrameFromScroll = () => {
      animationFrameRef.current = null;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = reducedMotionRef.current
        ? 1
        : clamp(-rect.top / scrollableDistance);

      updateTitleReveal(progress);
      updateVideoProgress(progress);
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
          loadVideo();
        }
      },
      { rootMargin: "900px 0px" },
    );

    video.addEventListener("loadedmetadata", handleVideoReady);
    video.addEventListener("loadeddata", handleVideoReady);
    video.addEventListener("seeked", handleVideoSeeked);
    video.addEventListener("error", handleVideoError);

    resizeCanvas();
    loadVideo();

    observer.observe(section);
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    requestScrollUpdate();

    return () => {
      isMounted = false;
      observer.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoRef.current = null;
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", resizeCanvas);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      video.removeEventListener("loadedmetadata", handleVideoReady);
      video.removeEventListener("loadeddata", handleVideoReady);
      video.removeEventListener("seeked", handleVideoSeeked);
      video.removeEventListener("error", handleVideoError);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative ${SCROLL_HEIGHT_CLASS} overflow-clip bg-[#05070b]`}
      aria-label="Hero de Transfroid con camion controlado por scroll"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#05070b]"
          aria-label="Secuencia cinematografica de camion de transporte"
          role="img"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.34)_42%,rgba(0,0,0,0.08)_70%,rgba(0,0,0,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070b] to-transparent" />

        <header className="absolute left-6 right-6 top-5 z-30 flex items-center justify-between border-b border-white/12 pb-4 md:left-10 md:right-10">
          <a className="font-mono text-sm font-semibold uppercase tracking-[0.28em] text-white" href="#">
            Transfroid
          </a>
          <nav className="hidden items-center gap-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/65 md:flex">
            <a className="transition hover:text-white" href="#servicios">Servicios</a>
            <a className="transition hover:text-white" href="#control">Control</a>
            <a className="transition hover:text-white" href="#estrategia">Estrategia</a>
          </nav>
          <a
            className="rounded-full border border-white/35 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
            href="#cotizar"
          >
            Cotizar
          </a>
        </header>

        <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-20 px-6 md:bottom-[12vh] md:px-10">
          <div className="max-w-4xl">
            <h1
              ref={titleRef}
              className="hero-scroll-title max-w-4xl text-balance text-[clamp(2.35rem,5.8vw,5.9rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-white"
            >
              {HERO_TITLE}
            </h1>
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
