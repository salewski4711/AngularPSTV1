const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 800 });
  
  // Navigate to the page
  await page.goto('http://localhost:4201', { waitUntil: 'networkidle' });
  
  // Take screenshot
  await page.screenshot({ path: 'navigation-comparison.png', fullPage: true });
  
  // Also take a screenshot of just the top navigation
  const topNav = await page.$('app-top-navigation');
  if (topNav) {
    await topNav.screenshot({ path: 'top-navigation.png' });
  }
  
  // And bottom navigation
  const bottomNav = await page.$('app-bottom-navigation');
  if (bottomNav) {
    await bottomNav.screenshot({ path: 'bottom-navigation.png' });
  }
  
  await browser.close();
  console.log('Screenshots saved!');
})();