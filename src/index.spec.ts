import 'reflect-metadata';
import puppeteer, { Page } from 'puppeteer';
import { Container } from 'inversify';
import { BidObserver } from './BidObserver';
import { mockServer } from './mock/server';
import { injectable } from 'inversify';

@injectable()
class TestBidObserver extends BidObserver {}

describe('BidObserver', () => {
  let container: Container;
  let bidObserver: BidObserver;
  let page: Page;
  const serverUrl = 'http://localhost:3000';

  beforeAll(async () => {
    container = new Container();
    container.bind<BidObserver>(BidObserver).to(TestBidObserver);
    bidObserver = container.get<BidObserver>(BidObserver);

    const browser = await puppeteer.launch();
    page = await browser.newPage();

    mockServer.start();
  });

  afterAll(async () => {
    await page.browser().close();
    mockServer.stop();
  });

  it('should observe url and emit newBid event', async () => {
    const newBidPromise = new Promise((resolve) => {
      bidObserver.on('newBid', (bid) => {
        resolve(bid);
      });
    });

    await bidObserver.observeUrl(page, serverUrl);

    const newBid = await newBidPromise;

    expect(newBid).toBe(23100);
  });
});
