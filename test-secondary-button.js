const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Open browser window
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to button showcase...');
    await page.goto('http://localhost:4201/components/atoms/button', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('Waiting for Angular to load...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Take a screenshot
    await page.screenshot({ path: 'button-showcase.png', fullPage: true });
    console.log('Screenshot saved as button-showcase.png');
    
    // Keep browser open for 10 seconds
    console.log('Browser will close in 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();