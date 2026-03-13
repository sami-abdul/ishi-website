import { chromium } from '@playwright/test';

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'servicios', path: '/servicios' },
  { name: 'testimonios', path: '/testimonios' },
  { name: 'blog', path: '/blog' },
  { name: 'contacto', path: '/contacto' },
  { name: 'haz-una-cita', path: '/haz-una-cita' },
  { name: 'guia-gratis', path: '/guia-gratis' },
  { name: 'terms', path: '/terms' },
  { name: 'privacy-policy', path: '/privacy-policy' },
];

async function takeScreenshots() {
  const browser = await chromium.launch();

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const desktopPage = await desktopContext.newPage();

  for (const { name, path } of pages) {
    await desktopPage.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({
      path: `screenshots/current-${name}-desktop.png`,
      fullPage: true,
    });
    console.log(`Captured: ${name} (desktop)`);
  }

  await desktopContext.close();
  await browser.close();
  console.log('All screenshots captured!');
}

takeScreenshots().catch(console.error);
