"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const HERO_VIDEO_SRC = "/videos/transfroid-hero-1080p.mp4";
const SCROLL_HEIGHT_CLASS = "h-[320vh]";
const HERO_TITLE = "Transporte refrigerado bajo control.";

export function ImageSequenceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    let isMounted = true;
    let isVideoReady = false;
    let pendingVideoSeek = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    video.muted = true;
    video.playsInline = true;

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

    const seekVideo = (progress: number) => {
      if (!isVideoReady || pendingVideoSeek || !Number.isFinite(video.duration)) {
        return;
      }

      const targetTime = clamp(progress) * video.duration;

      if (Math.abs(video.currentTime - targetTime) < 0.035) {
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
    };

    const handleVideoSeeked = () => {
      pendingVideoSeek = false;

      if (!isMounted) {
        return;
      }

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

    loadVideo();

    observer.observe(section);
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
    requestScrollUpdate();

    return () => {
      isMounted = false;
      observer.disconnect();
      video.pause();
      window.removeEventListener("scroll", requestScrollUpdate);
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
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full bg-[#05070b] object-cover object-[62%_50%] md:object-[50%_50%]"
          muted
          playsInline
          preload="auto"
          src={HERO_VIDEO_SRC}
          aria-hidden="true"
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
