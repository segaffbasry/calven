import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Enquire } from "@/components/home/Enquire";
import { Essentials } from "@/components/home/Essentials";
import { Feature } from "@/components/home/Feature";
import { Footer } from "@/components/home/Footer";
import { Guide } from "@/components/home/Guide";
import { Hero } from "@/components/home/Hero";
import { Range } from "@/components/home/Range";

/* Calven Medical Supplies' homepage: the look after medivide.io, the range layout after sunflowermedical.co.uk, the
   copy from Calven's campaign and the products and photography from ocura.co.uk. Grounds: a Warm white page with
   Stone bands (Essentials, Guide), one Teal section (the enquiry) and the Charcoal footer. No scroll recolouring.
   Copy: lib/content.ts. Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Range />
        <Essentials />
        <Feature />
        <Guide />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}
