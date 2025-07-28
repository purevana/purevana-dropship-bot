import puppeteer from 'puppeteer';

async function runBot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🛍️ Searching AliExpress for skincare products...");
  await page.goto('https://www.aliexpress.com/wholesale?SearchText=skincare', { waitUntil: 'domcontentloaded' });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.manhattan--container--1lP57Ag.cards--card--2o6yJVt'));
    return items.slice(0, 3).map((item) => {
      const title = item.querySelector('h1,h2,h3')?.innerText;
      const link = item.querySelector('a')?.href;
      return { title, link };
    });
  });

  console.log("💄 Top 3 products found:", products);

  await browser.close();
}

runBot();
