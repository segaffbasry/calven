import { ARC, DOT, LETTERS, MARK_TRANSFORM, SUBLINE, VIEWBOX } from "@/lib/logo";

/* The real lock-up, inline so its parts can be coloured and animated. Colours come from CSS variables
   (--logo-mark, --logo-word, --logo-sub) so one component serves the teal-and-charcoal lock-up on light grounds and
   the reversed one on Charcoal and Teal. `build` tags each part for the preloader. */
export function Logo({ id, title = "Calven Medical Supplies", build = false, className }: { id: string; title?: string; build?: boolean; className?: string }) {
  const part = (name: string) => (build ? { "data-part": name } : {});
  return (
    <svg className={`logo ${className ?? ""}`} viewBox={VIEWBOX} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-labelledby={title ? `${id}-t` : undefined}>
      {title && <title id={`${id}-t`}>{title}</title>}
      <g transform={MARK_TRANSFORM} className="logo-mark">
        <path d={ARC} fill="none" strokeWidth="16" {...part("arc")} />
        <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} {...part("dot")} />
      </g>
      <g className="logo-word">
        {LETTERS.map((l) => <path key={l.id} d={l.d} {...part("letter")} />)}
      </g>
      <path className="logo-sub" d={SUBLINE} {...part("sub")} />
    </svg>
  );
}

/* The symbol alone, in its own 4 4 92 92 box (the favicon and the button badge). */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={`mark ${className ?? ""}`} viewBox="4 4 92 92" aria-hidden="true" focusable="false">
      <path d={ARC} fill="none" stroke="currentColor" strokeWidth="16" />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="currentColor" />
    </svg>
  );
}
