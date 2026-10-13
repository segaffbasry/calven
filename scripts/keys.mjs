// Keyboard and behaviour check: opens the menu from the keyboard, confirms focus moves in, Tab stays trapped, Esc
// closes and focus returns to the toggle; confirms link clicks never leave the page; opens a range row and carries
// it into the enquiry form; screenshots the copied button at rest and on hover; submits the form; and loads the page
// with reduced motion.
// Usage: node scripts/keys.mjs [outDir] [url]
import { chromium } from "playwright-core";
const [out = "shots/keys", url = "http://127.0.0.1:3055/"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto(url, { waitUntil: "load" });
await page.waitForFunction(() => document.documentElement.dataset.intro === "done");
await page.waitForTimeout(1200);
const active = () => page.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName.toLowerCase()} ${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 30)}` : "none"; });
const r = {};
await page.focus(".menu-toggle");
await page.keyboard.press("Enter");
await page.waitForTimeout(1000);
r.afterOpen = await active();
r.expanded = await page.getAttribute(".menu-toggle", "aria-expanded");
await page.screenshot({ path: `${out}/menu.jpg`, type: "jpeg", quality: 70 });
const seen = new Set();
for (let i = 0; i < 30; i++) { await page.keyboard.press("Tab"); seen.add(await page.evaluate(() => !!document.activeElement?.closest("#site-menu, .menu-toggle"))); }
r.tabTrapped = !seen.has(false);
await page.keyboard.press("Escape");
await page.waitForTimeout(900);
r.afterEsc = await active();
r.menuHidden = await page.evaluate(() => getComputedStyle(document.querySelector("#site-menu")).visibility);
// Menu link scrolls to its section
await page.click(".menu-toggle"); await page.waitForTimeout(900);
await page.click('#site-menu a[data-item="trolleys"]'); await page.waitForTimeout(2200);
r.menuRangeLink = await page.evaluate(() => ({ y: Math.round(document.querySelector("#range").getBoundingClientRect().top), open: document.querySelector(".range-row.is-active .range-name")?.textContent }));
// Range row carries its category into the form
await page.click(".range-row.is-active .more"); await page.waitForTimeout(2200);
r.topic = await page.inputValue('select[name="topic"]');
// Form
await page.fill('input[name="name"]', "Test"); await page.fill('input[name="email"]', "test@calven.example");
await page.click('.enquire-form button[type="submit"]'); await page.waitForTimeout(400);
r.formNote = await page.textContent(".form-note");
r.navigated = page.url() !== url || page.context().pages().length > 1;
// Button rest / hover
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
const btn = page.locator(".hero-actions .btn-primary");
await btn.screenshot({ path: `${out}/btn-rest.png` });
await btn.hover(); await page.waitForTimeout(200);
await btn.screenshot({ path: `${out}/btn-hover-mid.png` });
await page.waitForTimeout(500);
await btn.screenshot({ path: `${out}/btn-hover.png` });
r.btnHover = await btn.evaluate((b) => { const c = getComputedStyle(b.querySelector(".btn-content")); return { bg: c.backgroundColor, shadow: c.boxShadow, shimmer: getComputedStyle(b.querySelector(".btn-shimmer")).animationName }; });
r.errors = errors;
const rm = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await rm.goto(url, { waitUntil: "load" });
await rm.waitForTimeout(800);
r.reduced = await rm.evaluate(() => ({
  hiddenReveals: [...document.querySelectorAll("[data-reveal]")].filter((e) => getComputedStyle(e).visibility === "hidden").length,
  lenis: document.documentElement.classList.contains("lenis"),
  heroTitle: getComputedStyle(document.querySelector(".hero-title")).visibility,
}));
await rm.screenshot({ path: `${out}/reduced.jpg`, type: "jpeg", quality: 60, fullPage: true });
console.log(JSON.stringify(r, null, 1));
await browser.close();
