import { test, expect } from '@playwright/test';

const BASE_URL = 'https://toolsqa.com/';

test.describe('ToolsQA Rest Assured flow', () => {
  test('open Rest Assured article and navigate to HTTP Request', async ({ page }) => {
    // 1. open url
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // 2. click on "Rest Assured" logo/link — try a few robust locator strategies
    const restLinkByRole = page.getByRole('link', { name: /Rest Assured/i });
    if (await restLinkByRole.count() > 0) {
      await Promise.all([
        page.waitForURL(/rest-assured/i),
        restLinkByRole.first().click(),
      ]);
    } else if (await page.locator('img[alt*="Rest Assured"]').count() > 0) {
      await Promise.all([
        page.waitForURL(/rest-assured/i),
        page.locator('img[alt*="Rest Assured"]').first().click(),
      ]);
    } else {
      // fallback: click any visible text link or element that contains "Rest Assured"
      const fallback = page.getByText(/Rest Assured/i).first();
      await Promise.all([
        page.waitForURL(/rest-assured/i),
        fallback.click(),
      ]);
    }

    // 3. ensure the title of the page has text "Rest Assured"
    await expect(page).toHaveTitle(/Rest Assured/i);

    // 4. ensure the article has title "Rest Assured Tutorial for REST API Automation Testing"
    // Use role=heading first, then a text fallback
    const articleHeading = page.getByRole('heading', {
      name: 'Rest Assured Tutorial for REST API Automation Testing',
    });
    if (await articleHeading.count() > 0) {
      await expect(articleHeading.first()).toBeVisible();
    } else {
      await expect(page.getByText('Rest Assured Tutorial for REST API Automation Testing', { exact: true })).toBeVisible();
    }

    // 5. then click on "HTTP Request" link
    const httpLink = page.getByRole('link', { name: /HTTP Request/i });
    if (await httpLink.count() > 0) {
      await Promise.all([
        page.waitForURL(/http-request/i),
        httpLink.first().click(),
      ]);
    } else {
      // fallback to clicking any visible text matching HTTP Request
      await Promise.all([
        page.waitForURL(/http-request/i),
        page.getByText(/HTTP Request/i).first().click(),
      ]);
    }

    // 6. ensure that opened page has title "What is HTTP Request?"
    // The HTML <title> on the site may be longer (e.g. "HTTP Request - What is it? ...").
    // Verify either the document title contains the phrase or the page H1 equals the expected heading.
    const expectedHeading = 'What is HTTP Request?';
    await expect(page).toHaveTitle(new RegExp(expectedHeading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')).catch(async () => {
      // Fallback: assert the visible H1 heading text
      const h1 = page.locator('h1').first();
      await expect(h1).toHaveText(expectedHeading, { timeout: 5000 });
    });
  });
});
