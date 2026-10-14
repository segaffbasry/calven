// Keyboard and behaviour check: opens the menu from the keyboard, confirms focus moves in, Tab stays trapped, Esc
// closes and focus returns to the toggle; confirms link clicks never leave the page; opens a range row and carries
// it into the enquiry form; opens and closes a story dialog; measures the copied round button at rest and on hover;
// submits the form; and loads the page
// with reduced motion.
// Usage: node scripts/keys.mjs [outDir] [url]
import { chromium } from "playwright-core";
const [out = "shots/keys", url = "http://127.0.0.1:3055/"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
// 1024 wide: the menu button shows below 1100px, where the main navigation folds away.
const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
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
await page.locator(".range-row.is-active").scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
await page.click(".range-row.is-active .text-link"); await page.waitForTimeout(2200);
r.topic = await page.inputValue('select[name="topic"]');
// Form
await page.fill('input[name="name"]', "Test"); await page.fill('input[name="email"]', "test@calven.example");
await page.click('.enquire-form button[type="submit"]'); await page.waitForTimeout(400);
r.formNote = await page.textContent(".form-note");
r.navigated = page.url() !== url || page.context().pages().length > 1;
// Story dialog: opens, holds focus, Esc closes, focus returns
await page.locator(".story-hit").first().scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
await page.locator(".story-hit").first().focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(500);
r.dialogOpen = await page.evaluate(() => document.querySelector(".story-dialog").open);
r.dialogFocus = await active();
await page.screenshot({ path: `${out}/dialog.jpg`, type: "jpeg", quality: 70 });
await page.keyboard.press("Escape"); await page.waitForTimeout(400);
r.dialogClosed = await page.evaluate(() => !document.querySelector(".story-dialog").open);
r.afterDialog = await active();
// Copied interaction: the round button opens into a pill on hover
const btn = page.locator(".division .circle-cta").first();
await btn.scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
await btn.screenshot({ path: `${out}/cta-rest.png` });
const rest = await btn.evaluate((b) => Math.round(b.getBoundingClientRect().width));
await btn.hover(); await page.waitForTimeout(600);
await btn.screenshot({ path: `${out}/cta-hover.png` });
r.ctaWidth = { rest, hover: await btn.evaluate((b) => Math.round(b.getBoundingClientRect().width)) };
r.ctaColours = await page.evaluate(() => { const c = getComputedStyle(document.querySelector(".btn")); return { bg: c.backgroundColor, color: c.color }; });
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
