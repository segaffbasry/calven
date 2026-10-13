"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { EASE, EASE_DRAW, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { ARC, ARC_LENGTH, DOT, LETTERS, MARK_TRANSFORM, SUBLINE, VIEW, VIEWBOX } from "@/lib/logo";
import { getLenis } from "@/lib/scroll";

/* The company signing its name, built from the real lock-up (lib/logo.ts) and finished where it starts: in the centre
   of the screen. Nothing flies to the corner (client feedback). The lock-up is laid out complete from the first
   frame, so no part travels across the screen; each part arrives in place.
     0.00 to 1.00  the symbol's arc is drawn with stroke-dashoffset over a faint track of the same arc, while a
                   counter runs 00 to 100 beneath it (the arc is the progress element)
     0.85 to 1.15  the dot pops into the opening (back.out)
     0.95 to 1.40  C A L V E N rise one by one out of a baseline mask (EASE, 50ms apart)
     1.20 to 1.50  MEDICAL SUPPLIES is wiped in from the left (EASE_IO)
     1.55          handover: the hero's centred headline starts rising under the logo
     1.55 to 2.15  exit: the lock-up lifts 16px and fades, and the Warm white ground draws up like a soft curtain
                   (clip-path from the bottom edge), uncovering the hero. Same ground colour, so nothing jumps.
   Plays on every load; skipped with reduced motion; hidden without JavaScript; never holds the page past ~3s. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.classList.add("logo-landed");
      html.dataset.intro = "done";
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const q = (s: string) => el.querySelectorAll(s);
    const counter = el.querySelector<HTMLElement>(".pl-count")!;
    const progress = { v: 0 };

    gsap.set(q('[data-part="arc"]'), { attr: { "stroke-dasharray": ARC_LENGTH, "stroke-dashoffset": ARC_LENGTH } });
    gsap.set(q('[data-part="dot"]'), { scale: 0, svgOrigin: `${DOT.cx} ${DOT.cy}` });
    gsap.set(q('[data-part="letter"]'), { y: 112 });
    gsap.set(q(".pl-wipe"), { attr: { width: 0 } });
    el.classList.add("is-ready");

    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; } });
    tl.to(progress, { v: 100, duration: 1, ease: EASE_DRAW, onUpdate: () => { counter.textContent = String(Math.round(progress.v)).padStart(2, "0"); } }, 0)
      .to(q('[data-part="arc"]'), { attr: { "stroke-dashoffset": 0 }, duration: 1, ease: EASE_DRAW }, 0)
      .to(q('[data-part="dot"]'), { scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 0.85)
      .to(q('[data-part="letter"]'), { y: 0, duration: 0.5, ease: EASE, stagger: 0.05 }, 0.95)
      .to(q(".pl-track"), { autoAlpha: 0, duration: 0.3 }, 1.0)
      .to(q(".pl-wipe"), { attr: { width: VIEW.w }, duration: 0.3, ease: EASE_IO }, 1.2)
      .to(counter, { autoAlpha: 0, duration: 0.25 }, 1.25)
      .add(handover, 1.55)
      .to(q(".pl-stage"), { y: -16, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 1.55)
      .fromTo(q(".pl-ground"), { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: EASE_IO }, 1.6);

    // Never hold the page for long: if the tab was hidden or throttled, finish anyway.
    const failsafe = window.setTimeout(() => { tl.progress(1); }, 3000);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-ground" />
      <div className="pl-stage">
        <svg className="logo pl-logo" viewBox={VIEWBOX}>
          <defs>
            {/* CALVEN rises from behind its own baseline; MEDICAL SUPPLIES is revealed by a widening rectangle. */}
            <clipPath id="pl-word-mask"><rect x={VIEW.x} y={-10} width={VIEW.w} height={114} /></clipPath>
            <clipPath id="pl-sub-mask"><rect className="pl-wipe" x={200} y={120} width={VIEW.w} height={50} /></clipPath>
          </defs>
          <g transform={MARK_TRANSFORM} className="logo-mark">
            <path className="pl-track" d={ARC} fill="none" strokeWidth="16" />
            <path d={ARC} fill="none" strokeWidth="16" strokeLinecap="butt" data-part="arc" />
            <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} data-part="dot" />
          </g>
          <g className="logo-word" clipPath="url(#pl-word-mask)">
            {LETTERS.map((l) => <path key={l.id} d={l.d} data-part="letter" />)}
          </g>
          <path className="logo-sub" d={SUBLINE} clipPath="url(#pl-sub-mask)" />
        </svg>
        <span className="pl-count">00</span>
      </div>
    </div>
  );
}
