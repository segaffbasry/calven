"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, EASE_IO, reducedMotion } from "@/components/Motion";
import { Icon } from "@/components/ui";
import { range } from "@/lib/content";

/* The range, after jnj.com's "Careers at J&J" band, measured: a warm grey band, a 64px heading, a list of rows
   divided by hairlines each ending in an arrow, and a square-cornered photograph to the right. Six categories from Ocura's "Healthcare Furniture Solutions"
   block. Pointing at a row (or focusing, or tapping it) makes it the open one: its line of text unfolds and the large
   frame on the right wipes to its photograph. All six photographs load up front (eager, low priority) so a swap
   never shows an empty frame. The frame stays in view beside the list on desktop (CSS sticky, no scroll pin); on
   phones it sits above the list. Menu and footer range links (a[data-item]) open their category here, and each
   row's enquiry link carries its category into the form ("enquire:topic"). */
export function Range() {
  const [active, setActive] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    // Range links in the menu and footer carry data-item; the link guard does the scrolling.
    const show = (e: MouseEvent) => {
      const id = (e.target as Element | null)?.closest?.<HTMLElement>("a[data-item]")?.dataset.item;
      const i = range.items.findIndex((r) => r.id === id);
      if (i >= 0) setActive(i);
    };
    document.addEventListener("click", show);
    return () => document.removeEventListener("click", show);
  }, []);

  // The new photograph wipes up over the old one; the old one stays beneath until the wipe ends.
  useEffect(() => {
    const el = frame.current; if (!el) return;
    const imgs = Array.from(el.querySelectorAll<HTMLElement>(".range-img"));
    if (first.current) { first.current = false; imgs.forEach((im, i) => im.classList.toggle("is-on", i === active)); return; }
    const next = imgs[active];
    imgs.forEach((im) => { im.classList.remove("is-top"); gsap.killTweensOf(im); });
    next.classList.add("is-top", "is-on");
    if (reducedMotion()) { imgs.forEach((im) => im !== next && im.classList.remove("is-on")); return; }
    gsap.fromTo(next, { clipPath: "inset(100% 0% 0% 0%)" }, {
      clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: EASE_IO,
      onComplete: () => imgs.forEach((im) => im !== next && im.classList.remove("is-on")),
    });
    gsap.fromTo(next.querySelector("img"), { scale: 1.12 }, { scale: 1, duration: 1.1, ease: EASE });
  }, [active]);

  return (
    <section className="range section band" id="range" tabIndex={-1} aria-labelledby="range-title">
      <div className="wrap range-grid">
        <div className="range-copy">
          <h2 id="range-title" className="h2 display" data-reveal="head">{range.title}</h2>
          <p className="lead" data-reveal="text">{range.lead}</p>
          <ul className="range-list" data-reveal="cards">
            {range.items.map((r, i) => (
              <li key={r.id} className={`range-row${i === active ? " is-active" : ""}`} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
                <button type="button" className="range-head" aria-expanded={i === active} aria-controls={`range-${r.id}`} onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                  <span className="range-name">{r.title}</span>
                  <Icon name="arrow" className="range-icon" />
                </button>
                <div className="range-body" id={`range-${r.id}`} role="region" aria-label={r.title}>
                  <div className="range-body-in">
                    <p>{r.text}</p>
                    <a className="text-link" href="#enquire" onClick={() => window.dispatchEvent(new CustomEvent("enquire:topic", { detail: r.title }))}>
                      <span className="uline-text">Ask about {r.title.toLowerCase()}</span><Icon name="arrow" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="range-media">
          <div className="range-frame" ref={frame} data-reveal="image" aria-live="polite">
            {range.items.map((r, i) => (
              <figure key={r.id} className="range-img" aria-hidden={i !== active}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image.src} width={r.image.w} height={r.image.h} alt={r.image.alt} loading="eager" fetchPriority="low" style={r.image.pos ? { objectPosition: r.image.pos } : undefined} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
