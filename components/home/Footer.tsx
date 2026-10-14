"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button, Icon } from "@/components/ui";
import { footer } from "@/lib/content";

/* After jnj.com's footer, measured: a dark warm grey ground (#312C2A, here Charcoal) with 80px padding, the wordmark
   large in white, three columns of link groups, then key links and small print. Here: the reversed lock-up, the
   campaign's closing line, three groups (Discover Calven and the two divisions), a "Get in touch" block, and the
   copyright. Every link scrolls to a homepage section. No reveals here: animations firing in the last pixels of the
   page read as a jump on an earlier demo. Also jnj.com's round back-to-top button, fixed bottom right, shown once
   the page has scrolled past the first screen. */
export function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <footer className="footer tone-dark" data-tone="dark">
        <div className="wrap">
          <a href="#top" className="footer-logo" aria-label="Calven Medical Supplies, back to the top"><Logo id="ft" title="" /></a>
          <div className="footer-grid">
            {footer.groups.map((g) => (
              <nav key={g.title} className="footer-group" aria-label={g.title}>
                <p className="footer-head">{g.title}</p>
                <ul>{g.links.map((l) => <li key={l.label}><a className="uline" href={l.href} data-item={l.item}>{l.label}</a></li>)}</ul>
              </nav>
            ))}
          </div>
          <div className="footer-touch">
            <div>
              <p className="footer-head">{footer.touch.title}</p>
              <p>{footer.touch.text}</p>
            </div>
            <Button href={footer.touch.cta.href}>{footer.touch.cta.label}</Button>
          </div>
          <div className="footer-base">
            <p>{footer.line}</p>
            <p>{footer.legal}</p>
          </div>
        </div>
      </footer>
      <a href="#top" className={`to-top${show ? " is-on" : ""}`} aria-label="Back to the top" tabIndex={show ? 0 : -1}><Icon name="up" /></a>
    </>
  );
}
