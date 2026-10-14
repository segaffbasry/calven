"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { essentials } from "@/lib/content";

/* Everyday essentials, after jnj.com's "Learn more about how we are innovating" carousel, measured: a heading, a
   row of cards (a square-cornered image, a headline, a link) running off the right edge, then a hairline with the
   previous and next round arrow buttons at its end, the inactive one greyed. Here the cards are the six product
   cut-outs from Ocura's homepage strip on Stone image wells. The row is a native horizontal scroller with snap
   points, so touch, trackpad and keyboard all work; the arrows move it one card at a time. */
export function Essentials() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current; if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };

  return (
    <section className="essentials section" id="essentials" tabIndex={-1} aria-labelledby="essentials-title">
      <div className="wrap">
        <div className="essentials-head">
          <h2 id="essentials-title" className="h2 display" data-reveal="head">{essentials.title}</h2>
          <p className="lead" data-reveal="text">{essentials.lead}</p>
        </div>
      </div>
      <ul className="carousel" ref={track} aria-label="Everyday essentials" data-lenis-prevent-horizontal data-reveal="cards">
        {essentials.items.map((p) => (
          <li key={p.label} className="product">
            <div className="product-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} width={p.w} height={p.h} alt={p.label} loading="lazy" />
            </div>
            <h3 className="product-title">{p.label}</h3>
            <p className="product-text">{p.text}</p>
            <a className="text-link" href="#enquire">
              <span className="uline-text">Enquire</span><Icon name="arrow" />
            </a>
          </li>
        ))}
      </ul>
      <div className="wrap carousel-foot">
        <span className="carousel-rule" aria-hidden="true" />
        <button type="button" className="round-btn" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous products"><Icon name="left" /></button>
        <button type="button" className="round-btn" onClick={() => step(1)} disabled={edge.end} aria-label="Next products"><Icon name="arrow" /></button>
      </div>
    </section>
  );
}
