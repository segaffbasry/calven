"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, reducedMotion } from "@/components/Motion";
import { Button, Icon } from "@/components/ui";
import { divisions, footer, sections, site, utility } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu (tablets and phones, where the main navigation folds away). The panel wipes down from the top
   edge (EASE_IO), then the items rise one line after another (EASE). One GSAP timeline in, the same timeline reversed
   out. Focus is trapped inside (the toggle is part of the trap), Esc closes, focus returns to the toggle. Every item
   scrolls to a homepage section: Calven has no other pages. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE_IO }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.05 }, 0.25);
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
            {sections.map((s) => <li key={s.href}><a href={s.href} data-menu-in>{s.label}<Icon name="arrow" /></a></li>)}
          </ul>
          <div className="menu-groups">
            {divisions.map((d) => (
              <div key={d.id} className="menu-group" data-menu-in>
                <p className="menu-group-head">{d.title}</p>
                <ul>{d.links.map((l) => <li key={l.label}><a className="uline" href={l.href} data-item={l.item}>{l.label}</a></li>)}</ul>
              </div>
            ))}
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

/* After jnj.com's two-tier header, measured: a 40px utility bar in its dark warm grey #312C2A (here Charcoal) with
   the divisions on the left and Contact and the region on the right, then an 88px solid white bar (here Warm white)
   with the logo on the left and the main navigation on the right, divided from the page by a hairline. The header
   stays in place while scrolling, as on jnj.com. On tablets and phones the navigation folds into a menu button. */
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  return (
    <>
      <header className={`site-header${open ? " is-open" : ""}`}>
        <div className="utility">
          <div className="wrap utility-in">
            <nav aria-label="Divisions" className="utility-left">
              {utility.left.map((l, i) => <a key={l.label} href={l.href} className={i === 0 ? "is-current" : undefined}>{l.label}</a>)}
            </nav>
            <nav aria-label="Utility" className="utility-right">
              {utility.right.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
              <span className="utility-region">{utility.region}</span>
            </nav>
          </div>
        </div>
        <div className="mainbar">
          <div className="wrap mainbar-in">
            <a href="#top" className="header-logo" aria-label={`${site.name}, back to the top`}><Logo id="hd" title="" /></a>
            <nav className="mainnav" aria-label="Sections">
              {sections.map((s) => <a key={s.href} href={s.href}>{s.label}</a>)}
            </nav>
            <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => (open ? close() : setOpen(true))}>
              <span className="menu-toggle-icon" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
