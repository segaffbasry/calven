"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/* One curve family, taken from medivide.io (the look reference). Its Salient theme moves every button, arrow and
   link wrap on cubic-bezier(.25,1,.33,1) over .45s (".nectar-cta .link_wrap", read from its stylesheet).
     EASE      "calven"        that curve, for everything that settles. CSS twin: --ease in globals.css.
     EASE_IO   "power3.inOut"  frames and curtains that open: image clips, the menu panel, the preloader exit.
     EASE_DRAW "power2.inOut"  the preloader's arc, drawn at an even pace like a pen stroke. */
CustomEase.create("calven", "0.25,1,0.33,1");
export const EASE = "calven";
export const EASE_IO = "power3.inOut";
export const EASE_DRAW = "power2.inOut";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero, header and scroll wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}

/* Page-wide behaviour:
   - the link guard: a private demo, so nothing leaves the page. Calven has no live site, so every link is a "#"
     section link anyway; the guard routes those through Lenis and blocks anything else, in case.
   - Lenis on the GSAP ticker, synced with ScrollTrigger, stopped while the preloader or the menu is open.
     lerp .12, not a fixed duration (a fixed duration read as a jump at the bottom of the page on an earlier demo).
   - the reveal vocabulary, declared in markup with data-reveal (the table in README.md):
       head    a heading: the whole phrase fades and rises once
       text    a paragraph: its words rise out of a line mask
       label   small lines, buttons and form rows: a short fade and rise
       cards   a list: its children rise in batches as they arrive
       image   a frame that opens upward from its bottom edge; an <img data-parallax> inside drifts about 10%
     Anything inside [data-late] (the later sections) plays at 0.75 of the duration. */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      // A link inside the menu fires while the menu still has Lenis stopped; start() first so this scroll survives.
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.4 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      if (typeof target !== "number") target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    const lenis = new Lenis({ lerp: 0.12 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? 0.75 : 1);
      const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 * pace(el), ease: EASE, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1 * pace(el), ease: EASE, stagger: 0.008, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 * pace(el), ease: EASE, scrollTrigger: once(el, "top 94%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: 32, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1 * pace(list), ease: EASE, stagger: 0.08, clearProps: "transform" }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 * pace(el), ease: EASE_IO, scrollTrigger: once(el, "top 90%") });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        const amount = Number(img.dataset.parallax) || 5; // yPercent each way: about 10% of travel in all
        gsap.fromTo(img, { yPercent: -amount, scale: 1.12 }, {
          yPercent: amount, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
