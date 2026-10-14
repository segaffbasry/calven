import type { ReactNode } from "react";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  close: <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};
export type IconName = keyof typeof glyphs;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{glyphs[name]}</svg>;
}

/* The copied interaction: jnj.com's round "Learn more" button (a.Button in its division panels, read 14 Oct 2026).
     rest    a 64px circle in the accent colour holding a white arrow; the label is there but has no width
     hover   the circle opens into a pill: padding goes from 0 to 0 32px and the underlined label slides out before
             the arrow (its own CSS: transition: background .3s, padding .3s)
   Substitutions: Teal for their red, Warm white for their white text (at the client's request; see README on
   contrast). The label stays in the accessibility tree at all times, so the link always has its name.
   Styles: "copied interaction" in globals.css. */
export function CircleCta({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <a className={`circle-cta ${className ?? ""}`} href={href} onClick={onClick}>
      <span className="circle-cta-label">{children}</span>
      <Icon name="arrow" />
    </a>
  );
}

/* jnj.com's inline link: label then a small arrow, both in the accent colour; the arrow nudges on hover. Here the
   label is Charcoal and only the arrow is Teal, since small Teal type would sit below 4.5:1. */
export function TextLink({ href, children, className, item, onClick }: { href: string; children: ReactNode; className?: string; item?: string; onClick?: () => void }) {
  return (
    <a className={`text-link ${className ?? ""}`} href={href} data-item={item} onClick={onClick}>
      <span className="uline-text">{children}</span><Icon name="arrow" />
    </a>
  );
}

/* A solid rectangular button for the form and the menu: Teal with white text (client request), or an outline. */
export function Button({ href, children, variant = "primary", className, type = "button" }: {
  href?: string; children: ReactNode; variant?: "primary" | "outline"; className?: string; type?: "button" | "submit";
}) {
  const cls = `btn btn-${variant} ${className ?? ""}`;
  const inner = <><span>{children}</span><Icon name="arrow" /></>;
  if (!href) return <button type={type} className={cls}>{inner}</button>;
  return <a className={cls} href={href}>{inner}</a>;
}

/* Heading lines that rise out of their own masks. Used by the hero only: the one place a line-by-line entrance is
   allowed (every other heading is a single "head" reveal). */
export function Lines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((l, i) => <span key={i} className="line"><span className="line-in">{l}</span></span>)}
    </span>
  );
}
