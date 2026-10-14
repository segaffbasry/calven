"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Button, Lines } from "@/components/ui";
import { hero } from "@/lib/content";

/* After jnj.com's hero, measured: the statement set large and light on the left (their Johnson Display at 80px,
   line-height 1) and a square-cornered photograph on the right, on a plain white page. Here the statement is the
   campaign's "Make room for better care." in Federo, with the email's lead and a solid Teal call to action under it,
   and the photograph is Ocura's Arvada room. The entrance plays on load: the lines rise out of their masks, the copy
   follows, and the photograph opens upward. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const reduced = reducedMotion();
    const q = (s: string) => el.querySelectorAll(s);
    if (!reduced) {
      // y as well as yPercent, so GSAP never adds a stale pixel offset to the percentage.
      gsap.set(q(".line-in"), { yPercent: 110, y: 0 });
      gsap.set(q("[data-hero-in]"), { y: 18, autoAlpha: 0 });
      gsap.set(q(".hero-frame"), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q(".hero-frame img"), { scale: 1.12 });
    }
    el.classList.add("is-set");
    return onIntro(() => {
      if (reduced) return;
      gsap.timeline()
        .to(q(".line-in"), { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.09 }, 0.05)
        .to(q(".hero-frame"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE_IO }, 0.1)
        .to(q(".hero-frame img"), { scale: 1, duration: 1.6, ease: EASE }, 0.1)
        .to(q("[data-hero-in]"), { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, stagger: 0.08 }, 0.35);
    });
  }, []);

  return (
    <section className="hero" id="top" ref={root} tabIndex={-1} aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title display"><Lines lines={hero.lines} /></h1>
          <p className="hero-lead" data-hero-in>{hero.lead}</p>
          <div data-hero-in><Button href={hero.cta.href}>{hero.cta.label}</Button></div>
        </div>
        <div className="hero-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.image.src} width={hero.image.w} height={hero.image.h} alt={hero.image.alt} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
