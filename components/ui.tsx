import type { ReactNode } from "react";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};
export type IconName = keyof typeof glyphs;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{glyphs[name]}</svg>;
}

/* The copied interaction: doctronic.ai's buttons (Button.module.css, read from its stylesheet 13 Oct 2026), rebuilt
   with its structure: a <button>/<a>, a .btn-content span that carries the fill, and a .btn-shimmer span.
     shape     pill, border-radius 52px (32px on the small header size), padding 12px 24px (8px 14px small)
     rest      .15s ease-in on background-color, border-color, box-shadow, color, opacity; transform .1s ease-in
     hover     the same properties at .15s ease-out; the shimmer, a 105deg band (transparent 20%, light at 18%
               50%, transparent 80%), sweeps once from translate(-150%) to translate(150%) in .45s ease-out
     press     scale(.98)
     "hero"    (primary) accent fill with a coloured shadow 0 4px 7px accent/.39; hover darkens the fill and
               lifts the shadow to 0 6px 10px accent/.5
     secondary 1px strong border, transparent; hover fills with the solid colour and inverts the text
     solid     (dark) their "Sign up": near-black fill, cream text
   Substitutions: Teal for their blue (with Charcoal text, 5.5:1; cream on Teal would be 3:1), a Teal-and-Charcoal
   mix for the hover shade, Charcoal for their near-black, Warm white for their cream. The shimmer light is Warm
   white at 35% (18% reads on their deep blue, not on Teal). Styles: "copied interaction" in globals.css. */
type Variant = "primary" | "secondary" | "solid";
export function Button({ href, children, variant = "primary", small = false, className, type = "button", arrow = variant === "primary" }: {
  href?: string; children: ReactNode; variant?: Variant; small?: boolean; className?: string; type?: "button" | "submit"; arrow?: boolean;
}) {
  const cls = `btn btn-${variant}${small ? " btn-small" : ""} ${className ?? ""}`;
  const inner = (
    <span className="btn-content">
      <span className="btn-shimmer" aria-hidden="true" />
      <span className="btn-label">{children}</span>
      {arrow && <Icon name="arrow" className="btn-arrow" />}
    </span>
  );
  if (!href) return <button type={type} className={cls}>{inner}</button>;
  return <a className={cls} href={href}>{inner}</a>;
}

/* A floating pill in doctronic's "FeaturePill" shape: three round corners and one square one (36 36 36 0), a soft
   shadow 0 2px 16px at 10%, an icon and a short label. */
export function Pill({ children, icon = "check", className }: { children: ReactNode; icon?: IconName; className?: string }) {
  return <span className={`pill ${className ?? ""}`}><Icon name={icon} />{children}</span>;
}

/* A text link with an arrow: a hairline grows under the label and the arrow slides on. */
export function MoreLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={`more ${className ?? ""}`} href={href}>
      <span className="uline-text">{children}</span><Icon name="arrow" />
    </a>
  );
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
