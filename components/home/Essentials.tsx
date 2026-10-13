"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { essentials } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Everyday essentials: medivide.io's slow marquee of product shots on white cards set at staggered heights
   (nectar_scrolling_text, scroll_speed "slowest"), dressed as doctronic.ai's soft cards (hairline border, round corners, a
   quiet image well; sunflowermedical.co.uk's lift and shadow on hover).
   The six products are the cut-outs from Ocura's homepage strip. The strip drifts left at 28px a second, speeds up
   with the scroll (Lenis velocity, either direction pushes it on) and rests while the pointer is over it, so a card
   can be looked at. With reduced motion it is a plain row that scrolls sideways. */
export function Essentials() {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current; if (!el || reducedMotion()) return;
    el.classList.add("is-moving");
    let x = 0, hover = false, boost = 0;
    const half = () => el.scrollWidth / 2;
    const tick = (_t: number, dt: number) => {
      const v = Math.abs(getLenis()?.velocity ?? 0);
      boost += (Math.min(v, 60) * 6 - boost) * 0.08; // eased, so a flick swells and settles
      const speed = hover ? 0 : 28 + boost;
      x -= (speed * dt) / 1000;
      const w = half();
      if (w > 0 && -x >= w) x += w;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    const enter = () => { hover = true; }, leave = () => { hover = false; };
    el.addEventListener("pointerenter", enter); el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", enter); el.addEventListener("focusout", leave);
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", enter); el.removeEventListener("focusout", leave);
    };
  }, []);

  // Two copies make the loop seamless; the second is hidden from assistive technology.
  const cards = (copy: number) => essentials.items.map((p, i) => (
    <li key={`${copy}-${i}`} className="tile" aria-hidden={copy ? true : undefined}>
      <div className="tile-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} width={p.w} height={p.h} alt={copy ? "" : p.label} loading="lazy" />
      </div>
      <p className="tile-label">{p.label}</p>
    </li>
  ));

  return (
    <section className="essentials section" id="essentials" tabIndex={-1} aria-labelledby="essentials-title">
      <div className="wrap essentials-head">
        <h2 id="essentials-title" className="h2 display" data-reveal="head">{essentials.title}</h2>
        <p className="lead" data-reveal="text">{essentials.lead}</p>
      </div>
      <div className="ticker" data-reveal="label">
        <ul className="ticker-track" ref={track} aria-label="Everyday essentials">
          {cards(0)}{cards(1)}
        </ul>
      </div>
    </section>
  );
}
