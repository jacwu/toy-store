const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to homepage...');
  // Navigate to the homepage
  await page.goto('http://localhost:3001');
  
  console.log('Taking homepage screenshot...');
  // Take a screenshot
  await page.screenshot({ path: '/home/runner/work/toy-store/toy-store/homepage.png', fullPage: true });
  
  console.log('Screenshot saved: homepage.png');
  
  await browser.close();
})().catch(err => {
  console.error('Error occurred:', err);
  process.exit(1);
});