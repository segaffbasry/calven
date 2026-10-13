import { Logo } from "@/components/Logo";
import { footer } from "@/lib/content";

/* Charcoal footer: the lock-up reversed (Teal symbol and name, Warm white strapline), the campaign's closing line,
   and two link groups that scroll to the homepage sections. No reveals here: animations firing in the last pixels
   of the page read as a jump on an earlier demo. No social accounts exist for Calven, so there are no social icons. */
export function Footer() {
  return (
    <footer className="footer tone-dark" data-tone="dark">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <a href="#top" className="footer-logo" aria-label="Calven Medical Supplies, back to the top"><Logo id="ft" title="" /></a>
          <p>{footer.line}</p>
        </div>
        {footer.groups.map((g) => (
          <nav key={g.title} className="footer-group" aria-label={g.title}>
            <p className="footer-head">{g.title}</p>
            <ul>{g.links.map((l) => <li key={l.label}><a className="uline" href={l.href} data-item={"item" in l ? l.item : undefined}>{l.label}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="wrap footer-base">
        <p>{footer.legal}</p>
        <a className="uline" href="#top">Back to the top</a>
      </div>
    </footer>
  );
}
