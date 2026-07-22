"use client";

import Image from "next/image";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { prefersReducedMotion } from "../../lib/animations/scroll";
import { processSteps } from "./homeData";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);
  const manualSelectionUntilRef = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const selectStep = useCallback((index: number, manual = false) => {
    if (manual) {
      manualSelectionUntilRef.current = Date.now() + 1200;
    }
    activeStepRef.current = index;
    setActiveStep(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    if (!section || !desktop || prefersReducedMotion()) {
      return;
    }

    const { ScrollTrigger } = getGsap();
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (Date.now() < manualSelectionUntilRef.current) {
          return;
        }
        const next = Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length));

        if (next !== activeStepRef.current) {
          selectStep(next);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [selectStep]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content || prefersReducedMotion()) {
      return;
    }

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      content.querySelectorAll("[data-process-copy]"),
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.035,
        ease: "power3.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, [activeStep]);

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = processSteps.length - 1;
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    selectStep(next, true);
    tabRefs.current[next]?.focus();
  };

  const active = processSteps[activeStep];

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative bg-[var(--color-brand-dark)] text-[var(--color-brand-text)] md:h-[440vh]"
      aria-labelledby="process-heading"
    >
      <h2 id="process-heading" className="sr-only">Proceso operativo</h2>

      <div className="space-y-6 px-5 py-20 md:hidden">
        <p className="terminal-label">Proceso operativo</p>
        {processSteps.map((step) => (
          <article
            className="overflow-hidden rounded-lg border border-[var(--color-brand-cyan)]/22 bg-[var(--color-brand-ink)]"
            key={step.number}
            aria-labelledby={`mobile-process-${step.number}`}
          >
            <div className="relative aspect-[8/5] overflow-hidden">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                unoptimized
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)]/72 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-4xl font-black leading-none text-[var(--color-brand-lime)] sm:text-5xl">
                {step.number}
              </span>
            </div>
            <div className="p-5">
              <h3 id={`mobile-process-${step.number}`} className="text-2xl font-semibold uppercase">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/72">{step.text}</p>
              {step.highlight ? (
                <p className="mt-5 border-l-2 border-[var(--color-brand-lime)] pl-4 text-sm font-semibold leading-6 text-white">
                  {step.highlight}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="sticky top-0 mx-auto hidden h-screen max-w-[1540px] grid-cols-[0.78fr_1.22fr] items-center gap-10 px-10 py-16 md:grid lg:px-14">
        <div ref={contentRef} className="relative z-10">
          <p data-process-copy className="terminal-label">Proceso operativo</p>
          <p data-process-copy className="process-number mt-8 text-[clamp(2.25rem,3vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--color-brand-lime)]">
            {active.number}
          </p>
          <h3 data-process-copy className="mt-1 text-[clamp(2.4rem,4.4vw,4.8rem)] font-semibold uppercase leading-[0.94]">
            {active.title}
          </h3>
          <p data-process-copy className="mt-6 max-w-xl text-lg leading-8 text-white/72">{active.text}</p>
          {active.highlight ? (
            <p data-process-copy className="mt-5 max-w-xl border-l-2 border-[var(--color-brand-lime)] pl-4 text-sm font-semibold leading-6 text-white/88">
              {active.highlight}
            </p>
          ) : null}

          <div className="mt-9 h-px bg-white/14">
            <div
              className="h-px bg-[var(--color-brand-lime)] transition-[width] duration-500"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            />
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2" role="tablist" aria-label="Etapas del proceso operativo">
            {processSteps.map((step, index) => (
              <button
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`process-tab-${index}`}
                className={`min-h-11 rounded-sm border px-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-lime)] ${
                  activeStep === index
                    ? "border-[var(--color-brand-lime)] bg-[var(--color-brand-lime)] text-[var(--color-brand-dark)]"
                    : "border-[var(--color-brand-cyan)]/25 text-white/62 hover:border-[var(--color-brand-lime)]/60 hover:text-white"
                }`}
                key={step.number}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="process-panel"
                tabIndex={activeStep === index ? 0 : -1}
                onClick={() => selectStep(index, true)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                {step.number}
              </button>
            ))}
          </div>
        </div>

        <div
          id="process-panel"
          className="relative min-h-[500px] overflow-hidden rounded-md border border-[var(--color-brand-cyan)]/20 bg-[var(--color-brand-cyan)]/8"
          role="tabpanel"
          aria-labelledby={`process-tab-${activeStep}`}
          tabIndex={0}
        >
          {processSteps.map((step, index) => (
            <Image
              key={step.number}
              src={step.image.src}
              alt={activeStep === index ? step.image.alt : ""}
              aria-hidden={activeStep !== index}
              fill
              unoptimized
              sizes="58vw"
              className={`object-cover transition duration-700 ease-out ${activeStep === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.015] opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)]/76 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/18 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/68">
            <span>Operación refrigerada</span>
            <span>{active.number} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
