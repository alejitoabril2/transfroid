"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { prefersReducedMotion } from "../../lib/animations/scroll";
import { processSteps } from "./homeData";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    const { ScrollTrigger } = getGsap();
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const next = Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length));
        setActiveStep((current) => (current === next ? current : next));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const active = processSteps[activeStep];

  return (
    <section id="proceso" ref={sectionRef} className="relative h-[420svh] bg-[#031B3A] text-[#F5FCFF] md:h-[440vh]">
      <div className="sticky top-0 mx-auto grid h-[100svh] max-w-[1540px] grid-rows-[auto_1fr] gap-5 px-5 pb-8 pt-24 md:h-screen md:grid-cols-[0.78fr_1.22fr] md:grid-rows-1 md:items-center md:gap-10 md:px-10 md:py-16 lg:px-14">
        <div className="relative z-10">
          <p className="terminal-label">Proceso operativo</p>
          <div className="mt-4 overflow-hidden md:mt-8">
            <p className="process-number text-[clamp(3.2rem,9vw,9.5rem)] font-semibold leading-none tracking-[-0.04em] text-[#00D9FF]/24">
              {active.number}
            </p>
          </div>
          <h2 className="mt-1 text-[clamp(1.9rem,4.4vw,4.8rem)] font-semibold uppercase leading-[0.94]">
            {active.title}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/68 md:mt-6 md:text-lg md:leading-8">{active.text}</p>
          <div className="mt-5 h-px bg-white/14 md:mt-10">
            <div
              className="h-px bg-[#B7FF00] transition-all duration-500"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            />
          </div>
          <div className="mt-5 flex gap-3">
            {processSteps.map((step, index) => (
              <button
                className={`h-2 flex-1 rounded-full transition ${activeStep === index ? "bg-[#B7FF00]" : "bg-[#00D9FF]/20"}`}
                key={step.number}
                type="button"
                aria-label={`Ver paso ${step.number}: ${step.title}`}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-0 overflow-hidden rounded-md border border-[#00D9FF]/20 bg-[#00D9FF]/8 md:min-h-[460px]" data-process-step={active.number}>
          {processSteps.map((step, index) => (
            <Image
              key={step.number}
              src={step.frame}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 58vw"
              className={`object-cover transition duration-700 ${activeStep === index ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#031B3A]/76 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/18 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/62">
            <span>Operacion refrigerada</span>
            <span>{active.number} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
