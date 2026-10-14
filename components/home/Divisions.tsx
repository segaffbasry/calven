import { CircleCta, Icon, TextLink } from "@/components/ui";
import { divisions } from "@/lib/content";

/* The two divisions, after jnj.com's pair of division panels, measured: two halves side by side, each a full-colour
   bar (theirs red, 92px tall, padding 32px 80px, the title at 24px with an arrow) above a pale warm panel (#F9F8F7,
   80px bottom padding) holding a paragraph, a row of inline links with arrows, and the round arrow button. Here the
   bars are Teal with Warm white titles and the panels Stone-tinted; the links scroll to the range or the essentials.
   Range links carry data-item so the range opens on that category. */
export function Divisions() {
  return (
    <section className="divisions" aria-label="Our divisions">
      {divisions.map((d) => (
        <article key={d.id} className="division" id={d.id} tabIndex={-1}>
          <a className="division-bar" href={d.cta.href}>
            <h2 className="division-title">{d.title}</h2><Icon name="arrow" />
          </a>
          <div className="division-panel" data-reveal="label">
            <p>{d.text}</p>
            <ul className="division-links">
              {d.links.map((l) => <li key={l.label}><TextLink href={l.href} item={l.item}>{l.label}</TextLink></li>)}
            </ul>
            <CircleCta href={d.cta.href}>{d.cta.label}</CircleCta>
          </div>
        </article>
      ))}
    </section>
  );
}
