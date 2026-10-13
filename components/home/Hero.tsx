"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { EASE, onIntro, reducedMotion } from "@/components/Motion";
import { Button, Lines, Pill } from "@/components/ui";
import { hero } from "@/lib/content";

/* After doctronic.ai's hero: a centred serif headline at a calm size (theirs: Fraunces 48px, -1% tracking), a short
   lead, one accent pill and one outline pill, a small reassurance line, and below them a collage of rounded
   photographs set at slight angles with soft pills floating over them. Here the headline is the campaign's
   "Make room for better care." in Federo; the centre photograph is Ocura's Arvada room, flanked by a nurse with a
   patient and a reception lounge; the pills are the email's three categories.
   The entrance plays on load: the two lines rise out of their masks, the copy follows, then the photographs rise and settle into their angles
   and the pills pop in. Each photograph drifts with the pointer at its own depth (the one heavier motion allowed
   on the page). */
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
      gsap.set(q(".collage-photo"), { y: 80, autoAlpha: 0, rotation: 0 });
      gsap.set(q(".collage .pill"), { scale: 0.85, autoAlpha: 0 });
    }
    el.classList.add("is-set");
    const off = onIntro(() => {
      if (reduced) return;
      gsap.timeline()
        .to(q(".line-in"), { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.09 }, 0.05)
        .to(q("[data-hero-in]"), { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, stagger: 0.07 }, 0.3)
        .to(q(".collage-photo"), { y: 0, autoAlpha: 1, rotation: (_i: number, t: HTMLElement) => Number(t.dataset.tilt) || 0, duration: 1.3, ease: EASE, stagger: 0.1 }, 0.45)
        .to(q(".collage .pill"), { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.8)", stagger: 0.12 }, 1.0);
    });

    // Pointer drift: each photograph leans towards the pointer by its own depth (data-depth, in px).
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return off;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]")).map((l) => ({
      d: Number(l.dataset.depth), x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3.out" }), y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3.out" }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * l.d); l.y(ny * l.d * 0.6); });
    };
    el.addEventListener("pointermove", move);
    return () => { off(); el.removeEventListener("pointermove", move); };
  }, []);

  const [left, right] = hero.side;
  return (
    <section className="hero" id="top" ref={root} tabIndex={-1} aria-labelledby="hero-title">
      <div className="wrap hero-copy">
        <h1 id="hero-title" className="hero-title display"><Lines lines={hero.lines} /></h1>
        <p className="hero-lead" data-hero-in>{hero.lead}</p>
        <div className="hero-actions" data-hero-in>
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="secondary">{hero.secondary.label}</Button>
        </div>
        <p className="hero-note" data-hero-in>{hero.note}</p>
      </div>
      <div className="wrap">
        <div className="collage">
          <div className="collage-layer collage-main" data-depth="-10">
            <figure className="collage-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.image.src} width={hero.image.w} height={hero.image.h} alt={hero.image.alt} fetchPriority="high" />
            </figure>
          </div>
          <div className="collage-layer collage-left" data-depth="22">
            <figure className="collage-photo" data-tilt="-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={left.src} width={left.w} height={left.h} alt={left.alt} />
            </figure>
          </div>
          <div className="collage-layer collage-right" data-depth="30">
            <figure className="collage-photo" data-tilt="5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={right.src} width={right.w} height={right.h} alt={right.alt} />
            </figure>
          </div>
          {hero.chips.map((c, i) => <Pill key={c} className={`chip-${i}`}>{c}</Pill>)}
        </div>
      </div>
    </section>
  );
}
