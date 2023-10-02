import 'reflect-metadata';
import puppeteer, { Page } from 'puppeteer';
import { mockServer } from './server';
import { BidObserver } from '../../src/BidObserver';

let page: Page;
let browser: any;
let bidObserver: any;

jest.setTimeout(30000); // Set timeout to 30 seconds

beforeAll(async () => {
  mockServer.start();
  browser = await puppeteer.launch({ headless: 'new' });
  page = await browser.newPage();
  bidObserver = new BidObserver();
});

afterAll(() => {
  mockServer.stop();
  browser.close();
});

test('should emit newBid event when new bid appears', async () => {
  const mockFn = jest.fn();
  bidObserver.on('newBid', mockFn);

  await bidObserver.observeUrl(page, 'http://localhost:3000');

  // Wait for the mock server to insert the new bid
  await new Promise((resolve) => setTimeout(resolve, 5000));

  expect(mockFn).toHaveBeenCalledTimes(1); // Check if the function was called
  expect(mockFn).toHaveBeenCalledWith(23100); // Check if it was called with the correct argument
});
