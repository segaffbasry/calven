"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "@/components/ui";
import { stories, type Story } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Care spaces, after jnj.com's "Innovating in healthcare" block, measured: a 64px heading, then a row of three
   stories (photograph, a 24px headline, a "Read more" link with an arrow) and a row of two set at 2:1. Photographs
   have square corners. Calven has no article pages, so "Read more" opens the full story on the page in a native
   <dialog> (focus moves in and is held there by the browser, Esc closes, focus returns to the link; smooth scrolling
   pauses while it is open). */
export function Stories() {
  const [open, setOpen] = useState<Story | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (open && !d.open) { d.showModal(); getLenis()?.stop(); }
    if (!open && d.open) d.close();
  }, [open]);

  const show = (s: Story) => (e: React.MouseEvent) => { opener.current = e.currentTarget as HTMLElement; setOpen(s); };
  const onClose = () => { setOpen(null); getLenis()?.start(); opener.current?.focus({ preventScroll: true }); };

  const card = (s: Story, size: "third" | "wide" | "narrow") => (
    <li key={s.id} className={`story story-${size}`}>
      <button type="button" className="story-hit" onClick={show(s)} aria-haspopup="dialog">
        <span className="story-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image.src} width={s.image.w} height={s.image.h} alt={s.image.alt} loading="lazy" />
        </span>
        <span className="story-title">{s.title}</span>
        <span className="text-link"><span className="uline-text">Read more</span><Icon name="arrow" /></span>
      </button>
    </li>
  );

  const [a, b, c, d, e] = stories.items;
  return (
    <section className="stories section" id="stories" tabIndex={-1} aria-labelledby="stories-title">
      <div className="wrap">
        <h2 id="stories-title" className="h2 display" data-reveal="head">{stories.title}</h2>
        <ul className="story-row story-row-3" data-reveal="cards">{[a, b, c].map((s) => card(s, "third"))}</ul>
        <ul className="story-row story-row-2" data-reveal="cards">{card(d, "wide")}{card(e, "narrow")}</ul>
      </div>
      <dialog className="story-dialog" ref={dialog} onClose={onClose} aria-labelledby="story-dialog-title" data-lenis-prevent
        onClick={(ev) => { if (ev.target === dialog.current) dialog.current?.close(); }}>
        {open && (
          <article className="story-dialog-in">
            <button type="button" className="story-close" onClick={() => dialog.current?.close()} aria-label="Close story"><Icon name="close" /></button>
            <div className="story-dialog-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.image.src} width={open.image.w} height={open.image.h} alt={open.image.alt} />
            </div>
            <div className="story-dialog-copy">
              <h3 id="story-dialog-title" className="story-dialog-title display">{open.title}</h3>
              {open.body.map((p, i) => <p key={i}>{p}</p>)}
              <div onClick={() => dialog.current?.close()}><Button href="#enquire">Discuss your requirements</Button></div>
            </div>
          </article>
        )}
      </dialog>
    </section>
  );
}
