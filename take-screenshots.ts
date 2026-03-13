import { chromium } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = "/Users/javeriaabdulsami/Projects/Content/ai60/ishi-website/screenshots";

const pages = [
  { name: "homepage", path: "/" },
  { name: "servicios", path: "/servicios" },
  { name: "testimonios", path: "/testimonios" },
  { name: "blog", path: "/blog" },
  { name: "contacto", path: "/contacto" },
  { name: "haz-una-cita", path: "/haz-una-cita" },
  { name: "guia-gratis", path: "/guia-gratis" },
  { name: "terms", path: "/terms" },
  { name: "privacy-policy", path: "/privacy-policy" },
];

async function takeScreenshots() {
  const browser = await chromium.launch();

  // Desktop screenshots
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const p of pages) {
    const page = await desktopContext.newPage();
    await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/desktop-${p.name}.png`,
      fullPage: true,
    });
    await page.close();
    console.log(`Desktop: ${p.name}`);
  }

  await desktopContext.close();

  // Mobile screenshots
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });

  for (const p of pages) {
    const page = await mobileContext.newPage();
    await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/mobile-${p.name}.png`,
      fullPage: true,
    });
    await page.close();
    console.log(`Mobile: ${p.name}`);
  }

  await mobileContext.close();
  await browser.close();
  console.log("Screenshots complete!");
}

takeScreenshots();
