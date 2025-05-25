const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully!');
    await page.screenshot({ path: 'homepage-screenshot.png' });
    console.log('Screenshot taken successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
  
  await browser.close();
})();