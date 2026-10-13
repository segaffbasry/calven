import { MoreLink } from "@/components/ui";
import { feature } from "@/lib/content";

/* Patients and the teams who care for them: the campaign's second post, set as one of doctronic.ai's soft cards (radius 32px, hairline border): the photograph
   (Ocura's clinic treatment room, riser recliners) leads on the left with a clip-open and parallax, and the headline
   keeps the post's own three-line break on the right, above a dashed rule and the link. */
export function Feature() {
  return (
    <section className="feature section" id="feature" tabIndex={-1} aria-labelledby="feature-title">
      <div className="wrap"><div className="feature-card">
        <div className="feature-frame frame" data-reveal="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={feature.image.src} width={feature.image.w} height={feature.image.h} alt={feature.image.alt} loading="lazy" data-parallax="5" />
        </div>
        <div className="feature-copy">
          <h2 id="feature-title" className="h2 display" data-reveal="head">
            {feature.lines.map((l, i) => <span key={i} className="br">{l} </span>)}
          </h2>
          <p className="lead" data-reveal="text">{feature.text}</p>
          <div data-reveal="label"><MoreLink href={feature.cta.href}>{feature.cta.label}</MoreLink></div>
        </div>
      </div></div>
    </section>
  );
}
