/**
 * E2E Test Helper — Playwright browser automation utilities
 *
 * Usage from CLI:
 *   npx tsx e2e-results/playwright-helper.ts smoke
 *   npx tsx e2e-results/playwright-helper.ts login <email> <password>
 *   npx tsx e2e-results/playwright-helper.ts save-auth
 *   npx tsx e2e-results/playwright-helper.ts screenshot <route> <name>
 *   npx tsx e2e-results/playwright-helper.ts screenshot-all
 *
 * Configuration:
 *   Set BASE_URL env var or edit the default below.
 *   Routes are defined in ALL_ROUTES — customize for your app.
 */

import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// --- CUSTOMIZE THESE FOR YOUR PROJECT ---
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const STORAGE_STATE_PATH = path.join(__dirname, 'auth-state.json');

// All app routes — generated during reconnaissance
// Replace this with your actual routes
const ALL_ROUTES: Array<{ path: string; name: string; phase: number }> = [
  // Example routes — replace with your app's routes:
  // { path: '/', name: 'dashboard', phase: 1 },
  // { path: '/items', name: 'items-list', phase: 2 },
  // { path: '/items/new', name: 'item-create', phase: 3 },
  // { path: '/settings', name: 'settings', phase: 4 },
];
// --- END CUSTOMIZATION ---

interface ConsoleEntry {
  type: string;
  text: string;
  url: string;
}

interface NetworkError {
  url: string;
  status: number;
  statusText: string;
}

interface PageReport {
  route: string;
  name: string;
  screenshotPath: string;
  consoleErrors: ConsoleEntry[];
  networkErrors: NetworkError[];
  loadTimeMs: number;
  title: string;
  redirectedTo?: string;
}

async function createContext(browser: Browser): Promise<BrowserContext> {
  if (fs.existsSync(STORAGE_STATE_PATH)) {
    return browser.newContext({
      storageState: STORAGE_STATE_PATH,
      viewport: { width: 1440, height: 900 },
    });
  }
  return browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
}

async function setupPageListeners(page: Page): Promise<{
  consoleErrors: ConsoleEntry[];
  networkErrors: NetworkError[];
}> {
  const consoleErrors: ConsoleEntry[] = [];
  const networkErrors: NetworkError[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text(),
        url: page.url(),
      });
    }
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
      });
    }
  });

  return { consoleErrors, networkErrors };
}

async function takeScreenshot(page: Page, name: string): Promise<string> {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const filepath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: filepath, fullPage: true });
  return filepath;
}

async function navigateAndScreenshot(
  page: Page,
  routePath: string,
  name: string,
  listeners: { consoleErrors: ConsoleEntry[]; networkErrors: NetworkError[] }
): Promise<PageReport> {
  const start = Date.now();
  const url = `${BASE_URL}${routePath}`;

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const loadTimeMs = Date.now() - start;
  const title = await page.title();
  const finalUrl = page.url();
  const screenshotPath = await takeScreenshot(page, name);
  const redirectedTo = finalUrl !== url ? finalUrl : undefined;

  return {
    route: routePath,
    name,
    screenshotPath,
    consoleErrors: [...listeners.consoleErrors],
    networkErrors: [...listeners.networkErrors],
    loadTimeMs,
    title,
    redirectedTo,
  };
}

// --- CLI Commands ---

async function smoke(): Promise<void> {
  console.log('[helper] Running smoke test...');
  console.log(`[helper] Target: ${BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const context = await createContext(browser);
  const page = await context.newPage();
  const listeners = await setupPageListeners(page);

  try {
    const report = await navigateAndScreenshot(page, '/', 'smoke-test', listeners);

    if (report.redirectedTo) {
      console.log(`[helper] Redirected to: ${report.redirectedTo}`);
      if (report.redirectedTo.includes('/login') || report.redirectedTo.includes('/sign-in')) {
        console.log('[helper] WARN: Redirected to login. Need to save auth state.');
        console.log('[helper] Run: npx tsx e2e-results/playwright-helper.ts login <email> <password>');
      }
    }

    console.log(`[helper] Page title: ${report.title}`);
    console.log(`[helper] Load time: ${report.loadTimeMs}ms`);
    console.log(`[helper] Console errors: ${report.consoleErrors.length}`);
    console.log(`[helper] Network errors: ${report.networkErrors.length}`);
    console.log(`[helper] Screenshot: ${report.screenshotPath}`);
    console.log('[helper] Smoke test PASSED');
  } catch (err) {
    console.error(`[helper] Smoke test FAILED: ${err}`);
    await takeScreenshot(page, 'smoke-test-error');
    process.exit(1);
  } finally {
    await browser.close();
  }
}

async function saveAuth(): Promise<void> {
  console.log('[helper] Opening browser to save auth state...');
  console.log('[helper] Sign in manually, then the state will be saved.');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/login`);

  console.log('[helper] Waiting for you to sign in...');
  console.log('[helper] (Watching for navigation away from /login)');

  await page.waitForURL((url) => !url.pathname.includes('/login') && !url.pathname.includes('/sign-in'), {
    timeout: 120000,
  });

  await page.waitForTimeout(3000);
  console.log(`[helper] Authenticated! Now at: ${page.url()}`);

  await context.storageState({ path: STORAGE_STATE_PATH });
  console.log(`[helper] Auth state saved to: ${STORAGE_STATE_PATH}`);

  await browser.close();
}

async function login(email: string, password: string): Promise<void> {
  console.log(`[helper] Logging in as ${email}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Fill login form — adapts to common patterns
  await page.fill('input[type="email"], input[name="email"], input[placeholder*="email" i]', email);
  await page.fill('input[type="password"], input[name="password"], input[placeholder*="password" i]', password);

  // Click sign in
  await page.click('button:has-text("Sign In"), button:has-text("Sign in"), button:has-text("Log in"), button[type="submit"]');

  try {
    await page.waitForURL((url) => !url.pathname.includes('/login') && !url.pathname.includes('/sign-in'), {
      timeout: 15000,
    });
    await page.waitForTimeout(2000);

    console.log(`[helper] Authenticated! Now at: ${page.url()}`);
    await context.storageState({ path: STORAGE_STATE_PATH });
    console.log(`[helper] Auth state saved to: ${STORAGE_STATE_PATH}`);
    await takeScreenshot(page, 'post-login');
  } catch {
    console.error('[helper] Login failed — check credentials or page structure');
    await takeScreenshot(page, 'login-failed');
    process.exit(1);
  }

  await browser.close();
}

async function screenshotRoute(routePath: string, name: string): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await createContext(browser);
  const page = await context.newPage();
  const listeners = await setupPageListeners(page);

  try {
    const report = await navigateAndScreenshot(page, routePath, name, listeners);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
}

async function screenshotAll(): Promise<void> {
  console.log('[helper] Taking screenshots of all routes...');

  if (ALL_ROUTES.length === 0) {
    console.error('[helper] No routes defined. Edit ALL_ROUTES in this file.');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await createContext(browser);
  const page = await context.newPage();

  const reports: PageReport[] = [];
  let idx = 0;

  for (const route of ALL_ROUTES) {
    idx++;
    const paddedIdx = String(idx).padStart(2, '0');
    const name = `${paddedIdx}-${route.name}`;

    console.log(`[helper] [${paddedIdx}/${ALL_ROUTES.length}] ${route.path}`);

    const listeners = await setupPageListeners(page);

    try {
      const report = await navigateAndScreenshot(page, route.path, name, listeners);
      reports.push(report);

      if (report.consoleErrors.length > 0) {
        console.log(`  ! ${report.consoleErrors.length} console error(s)`);
      }
      if (report.networkErrors.length > 0) {
        console.log(`  ! ${report.networkErrors.length} network error(s)`);
      }
      if (report.redirectedTo) {
        console.log(`  -> Redirected to ${report.redirectedTo}`);
      }
    } catch (err) {
      console.error(`  x Failed: ${err}`);
      reports.push({
        route: route.path,
        name,
        screenshotPath: '',
        consoleErrors: [],
        networkErrors: [],
        loadTimeMs: -1,
        title: 'ERROR',
        redirectedTo: `ERROR: ${err}`,
      });
    }
  }

  const summaryPath = path.join(__dirname, 'screenshot-report.json');
  fs.writeFileSync(summaryPath, JSON.stringify(reports, null, 2));
  console.log(`\n[helper] Report saved to: ${summaryPath}`);

  const errors = reports.filter((r) => r.consoleErrors.length > 0 || r.networkErrors.length > 0);
  const redirects = reports.filter((r) => r.redirectedTo);
  const failures = reports.filter((r) => r.loadTimeMs === -1);

  console.log(`[helper] Total: ${reports.length} pages`);
  console.log(`[helper] With errors: ${errors.length}`);
  console.log(`[helper] With redirects: ${redirects.length}`);
  console.log(`[helper] Failures: ${failures.length}`);

  await browser.close();
}

// --- CLI Entry Point ---

const [, , command, ...args] = process.argv;

switch (command) {
  case 'smoke':
    smoke();
    break;
  case 'save-auth':
    saveAuth();
    break;
  case 'login':
    if (args.length < 2) {
      console.error('Usage: playwright-helper.ts login <email> <password>');
      process.exit(1);
    }
    login(args[0], args[1]);
    break;
  case 'screenshot':
    if (args.length < 2) {
      console.error('Usage: playwright-helper.ts screenshot <route> <name>');
      process.exit(1);
    }
    screenshotRoute(args[0], args[1]);
    break;
  case 'screenshot-all':
    screenshotAll();
    break;
  default:
    console.log('Commands: smoke | save-auth | login <email> <password> | screenshot <route> <name> | screenshot-all');
    process.exit(1);
}
