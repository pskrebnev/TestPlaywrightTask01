import { test } from '@playwright/test';

// Ensure Playwright closes the browser after the whole test run.
// Hooks can receive fixtures; `browser` is provided by Playwright's fixtures.
test.afterAll(async ({ browser }) => {
  try {
    // Close the browser instance provided by the fixture if it's still open.
    await browser.close();
  } catch (e) {
    // Ignore errors during teardown to avoid masking test failures.
    // If needed, log the error to help debugging in CI logs.
    // console.warn('Error closing browser in afterAll hook:', e);
  }
});
