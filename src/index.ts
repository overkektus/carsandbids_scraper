import puppeteer from 'puppeteer';
import { container } from './inversify.config';
import { BidObserver } from './BidObserver';

const bidObserver = container.get<BidObserver>('BidObserver');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Only for production
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'font' || req.resourceType() === 'image') {
      req.abort();
    } else {
      req.continue();
    }
  });

  bidObserver.on('newBid', (bid) => {
    console.log(`New bid: ${bid}`);
  });

  await bidObserver.observeUrl(
    page,
    'https://carsandbids.com/auctions/37MnX8Gx/2000-honda-s2000'
  );
})();
