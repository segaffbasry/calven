import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import { site } from "@/lib/content";
import "./globals.css";

// Private demo: never indexed, never followed, no sitemap.
export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#FAF9F6" };

/* Runs before first paint. There is no preloader (removed at the client's request): the page is ready at once, so
   `data-intro="done"` is set here and the hero's entrance plays as soon as it mounts. Unless reduced motion is
   requested it also adds `js`, so reveal targets can start hidden without a flash. Without JavaScript nothing is
   hidden (see the <noscript> style). */
const boot = "(function(){var d=document.documentElement;d.dataset.intro='done';d.classList.add('logo-landed');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/federo-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero.webp" as="image" />
        <noscript><style>{".site-header{opacity:1!important;visibility:visible!important}.header-logo{visibility:visible!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
