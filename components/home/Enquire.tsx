"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Pill } from "@/components/ui";
import { enquire, range } from "@/lib/content";

/* The enquiry, from the campaign email's closing block: "Find the right fit for your space.", its three categories
   and the "Discuss your requirements" call to action, in one large soft card. Calven has no inbox, so the form
   checks its fields and then says plainly that nothing was sent. The range rows fill in "Interested in"
   ("enquire:topic"). */
export function Enquire() {
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);
  const note = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pick = (e: Event) => { setTopic((e as CustomEvent<string>).detail); setSent(false); };
    window.addEventListener("enquire:topic", pick);
    return () => window.removeEventListener("enquire:topic", pick);
  }, []);

  const topics = Array.from(new Set([...enquire.categories, ...range.items.map((r) => r.title)]));
  return (
    <section className="enquire section" id="enquire" tabIndex={-1} aria-labelledby="enquire-title" data-late>
      <div className="wrap"><div className="enquire-card">
        <div className="enquire-copy">
          <h2 id="enquire-title" className="h2 display" data-reveal="head">{enquire.title}</h2>
          <p className="lead" data-reveal="text">{enquire.text}</p>
          <ul className="enquire-cats" data-reveal="cards">
            {enquire.categories.map((c) => <li key={c}><Pill>{c}</Pill></li>)}
          </ul>
        </div>
        <form className="enquire-form" data-reveal="label" noValidate={false}
          onSubmit={(e) => { e.preventDefault(); setSent(true); requestAnimationFrame(() => note.current?.focus()); }}>
          <div className="field-row">
            <label className="field"><span>Name</span><input name="name" autoComplete="name" required /></label>
            <label className="field"><span>Organisation</span><input name="organisation" autoComplete="organization" /></label>
          </div>
          <label className="field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <label className="field"><span>Interested in</span>
            <select name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">Choose a category</option>
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="field"><span>Your space and priorities</span><textarea name="message" rows={4} /></label>
          <div className="form-foot">
            <Button type="submit">{enquire.submit}</Button>
            <p className="form-note" ref={note} tabIndex={-1} role="status" aria-live="polite">{sent ? enquire.thanks : ""}</p>
          </div>
        </form>
      </div></div>
    </section>
  );
}
