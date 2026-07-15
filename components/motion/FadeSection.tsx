"use client";

import { ReactNode, useEffect, useRef } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { prefersReducedMotion } from "../../lib/animations/scroll";

export function FadeSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion()) {
      return;
    }

    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          once: true,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

