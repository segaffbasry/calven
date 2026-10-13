import { Button } from "@/components/ui";
import { guide } from "@/lib/content";

/* Planning a care space: the campaign's third post ("3 ways to build a better care space"), its three points set as
   photographic cards. The post numbers its points 01 to 03; the cards drop the numbers, since the headline already
   counts them. Photographs from Ocura: a nurse with a seated patient, a same-day care unit, a diagnostic centre. */
export function Guide() {
  return (
    <section className="guide section fade" id="guide" tabIndex={-1} aria-labelledby="guide-title" data-late>
      <div className="wrap">
        <div className="guide-head">
          <h2 id="guide-title" className="h2 display" data-reveal="head">
            {guide.lines.map((l, i) => <span key={i} className="br">{l} </span>)}
          </h2>
          <p className="lead" data-reveal="text">{guide.lead}</p>
        </div>
        <ul className="guide-cards" data-reveal="cards">
          {guide.items.map((g) => (
            <li key={g.title} className="guide-card">
              <div className="guide-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image.src} width={g.image.w} height={g.image.h} alt={g.image.alt} loading="lazy" />
              </div>
              <h3 className="h3">{g.title}</h3>
              <p>{g.text}</p>
            </li>
          ))}
        </ul>
        <div className="guide-close" data-reveal="label">
          <p>{guide.close}</p>
          <Button href="#enquire" variant="secondary" arrow>Discuss your requirements</Button>
        </div>
      </div>
    </section>
  );
}
