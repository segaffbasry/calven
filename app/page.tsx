import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Divisions } from "@/components/home/Divisions";
import { Enquire } from "@/components/home/Enquire";
import { Essentials } from "@/components/home/Essentials";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Range } from "@/components/home/Range";
import { Stories } from "@/components/home/Stories";

/* Calven Medical Supplies' homepage, laid out after jnj.com: a two-tier header, a split hero, the two divisions in
   colour bars over pale panels, a story grid, the range in a grey band, a product carousel, the enquiry and a dark
   footer. Square corners, a white page and grey bands, no scroll recolouring. Copy: lib/content.ts (campaign copy,
   Ocura products and imagery). Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Divisions />
        <Stories />
        <Range />
        <Essentials />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
