"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Button } from "@/components/ui";
import { footer, range, sections, site } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu on a soft Teal-tinted Warm white. The panel wipes down from the top edge (EASE_IO), then the items rise one line after
   another (EASE). One GSAP timeline in, the same timeline reversed out. Focus is trapped inside (the header toggle,
   now "Close", is part of the trap), Esc closes, focus returns to the toggle. Every item scrolls to a homepage
   section: Calven has no other pages. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: EASE_IO }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.05 }, 0.3);
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    const lenis = getLenis();
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 100 : 1).play();
      lenis?.stop();
      const focusables = () => [document.querySelector<HTMLElement>(".menu-toggle"), ...Array.from(el.querySelectorAll<HTMLElement>("a[href], button"))].filter((f): f is HTMLElement => !!f);
      focusables()[1]?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { close(); return; }
        if (e.key !== "Tab") return;
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (t.progress() > 0) { lenis?.start(); t.timeScale(reducedMotion() ? 100 : 1.5).reverse(); }
  }, [open, close]);

  // "#" links close the menu first, then the page scrolls (the link guard in Motion does the scrolling; range links
  // carry data-item, which components/home/Range.tsx reads to open that category).
  const onClick = (e: React.MouseEvent) => { if ((e.target as Element).closest('a[href^="#"]')) close(); };

  return (
    <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" inert={!open} data-lenis-prevent onClick={onClick}>
      <div className="menu-inner wrap">
        <nav aria-label="Main" className="menu-main">
          <ul className="menu-big">
            {sections.map((s) => <li key={s.href}><a href={s.href} data-menu-in>{s.label}</a></li>)}
          </ul>
          <div className="menu-group" data-menu-in>
            <p className="menu-group-head">The range</p>
            <ul>{range.items.map((r) => <li key={r.id}><a className="uline" href="#range" data-item={r.id}>{r.title}</a></li>)}</ul>
          </div>
        </nav>
        <div className="menu-foot" data-menu-in>
          <p>{footer.line}</p>
          <Button href="#enquire">Discuss your requirements</Button>
        </div>
      </div>
    </div>
  );
}

/* After doctronic.ai's header: the logo on the left; on the right a small outline pill, a small solid pill, a hairline
   and the menu button. Unlike theirs there is no bar behind it (the pills carry their own grounds). The logo takes its
   colour from the ground under it (the footer declares data-tone="dark"); the header slides away on the way down and
   returns on the way up. The section links live in the menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  // Kept in state, not added with classList: React rewrites className on every render (opening the menu is one).
  const [entered, setEntered] = useState(false);
  const [tone, setTone] = useState<"light" | "teal" | "dark">("light");
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY, frame = 0;
    const tones = () => Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const update = () => {
      frame = 0;
      const y = window.scrollY, d = y - last;
      const probe = 44;
      const under = tones().filter((s) => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; }).pop();
      const t = under?.dataset.tone;
      setTone(t === "dark" || t === "teal" ? t : "light");
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < 6) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    update();
    const off = onIntro(() => setEntered(true));
    return () => { window.removeEventListener("scroll", queue); cancelAnimationFrame(frame); off(); };
  }, []);

  useEffect(() => { if (open) bar.current?.classList.remove("is-hidden"); }, [open]);

  const shown = open ? "light" : tone;
  return (
    <>
      <header className={`site-header tone-${shown}${entered ? " is-in" : ""}${open ? " is-open" : ""}`} ref={bar}>
        <a href="#top" className="header-logo" aria-label={`${site.name}, back to the top`}><Logo id="hd" title="" /></a>
        <div className="header-right">
          <nav className="header-actions" aria-label="Quick links">
            <Button href="#range" variant="secondary" small>The range</Button>
            <Button href="#enquire" variant="solid" small arrow={false}>Enquire</Button>
          </nav>
          <span className="header-rule" aria-hidden="true" />
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => (open ? close() : setOpen(true))}>
            <span className="menu-toggle-icon" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
