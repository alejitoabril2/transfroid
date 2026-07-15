"use client";

import { useEffect, useMemo, useRef } from "react";
import { getGsap } from "../../lib/animations/gsap";
import { prefersReducedMotion } from "../../lib/animations/scroll";

export function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion()) {
      return;
    }

    const { gsap } = getGsap();
    const targets = element.querySelectorAll("[data-word]");
    const tween = gsap.fromTo(
      targets,
      { opacity: 0.25, y: 18 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 76%",
          end: "bottom 48%",
          scrub: 0.35,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span className="inline-block overflow-hidden" key={`${word}-${index}`}>
          <span data-word className="inline-block">
            {word}
          </span>
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </p>
  );
}

