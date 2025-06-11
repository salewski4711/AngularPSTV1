const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to button showcase
    await page.goto('http://localhost:4201/components/atoms/button', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait a bit for Angular to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Look for showcase examples
    await page.waitForSelector('.showcase-example, pst-button, [data-example]', { timeout: 10000 });
    
    // Get page content
    const pageContent = await page.content();
    console.log('Page title:', await page.title());
    
    // Check if we have any buttons at all
    const hasButtons = pageContent.includes('pst-button') || pageContent.includes('button');
    console.log('Has buttons:', hasButtons);
    
    // Try to wait for button
    try {
      await page.waitForSelector('pst-button', { timeout: 5000 });
    } catch (e) {
      console.log('No pst-button found, checking for regular buttons...');
    }
    
    // Look for buttons in showcase content
    const showcaseInfo = await page.evaluate(() => {
      // Find showcase content area
      const showcaseContent = document.querySelector('.showcase-content, .showcase-example, main, [role="main"]');
      const showcaseSelector = showcaseContent ? showcaseContent.tagName + '.' + Array.from(showcaseContent.classList).join('.') : 'document';
      
      // Look for pst-button components
      const pstButtons = Array.from(document.querySelectorAll('pst-button'));
      const buttons = [];
      
      // Get all buttons from pst-button components
      pstButtons.forEach(pstBtn => {
        const buttonEl = pstBtn.querySelector('button');
        if (buttonEl) {
          const classList = Array.from(buttonEl.classList);
          const text = buttonEl.textContent?.trim() || '';
          const computedStyle = window.getComputedStyle(buttonEl);
          
          // Check if has bg-secondary class
          const hasSecondaryBg = classList.some(cls => cls.includes('bg-secondary'));
          
          buttons.push({
            type: 'pst-button',
            text: text,
            classes: classList.join(' '),
            hasSecondaryBg: hasSecondaryBg,
            isFullWidth: classList.includes('w-full'),
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color
          });
        }
      });
      
      return {
        showcaseArea: showcaseSelector,
        totalPstButtons: pstButtons.length,
        buttons: buttons
      };
    });
    
    console.log('\nAll buttons found:');
    allButtons.forEach((btn, index) => {
      console.log(`\nButton ${index + 1}:`);
      console.log(`  Text: ${btn.text}`);
      console.log(`  Type: ${btn.type}`);
      console.log(`  Full Width: ${btn.isFullWidth}`);
      console.log(`  Background: ${btn.backgroundColor}`);
      console.log(`  Classes: ${btn.classes}`);
    });
    
    // Find the secondary button
    const secondaryButton = allButtons.find(btn => 
      btn.text.toLowerCase().includes('secondary') && 
      btn.isFullWidth
    );
    
    console.log('Secondary Button Analysis:');
    console.log(JSON.stringify(secondaryButton, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();