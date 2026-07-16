"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { prefersReducedMotion } from "../../lib/animations/scroll";
import { metricPlaceholders } from "./homeData";

export function MetricsSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;

    if (!section || prefersReducedMotion()) {
      return;
    }

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      section.querySelectorAll("[data-metric-card]"),
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={ref} className="border-y border-[#00D9FF]/18 bg-[#06142E] px-5 py-16 text-[#F5FCFF] md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1540px]">
        <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:items-center">
          <div>
            <p className="terminal-label">Metricas</p>
            <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight md:text-5xl">
              Datos por confirmar.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 md:grid-cols-4">
            {metricPlaceholders.map((label) => (
              <article className="bg-[#031B3A] p-5" data-metric-card key={label}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00D9FF]/70">Pendiente</p>
                <p className="mt-10 text-lg font-semibold uppercase leading-tight">{label}</p>
                <p className="mt-3 text-xs leading-5 text-white/50">
                  Reemplazar cuando exista medicion real y verificable.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
