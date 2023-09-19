import { injectable } from 'inversify';
import EventEmitter from 'events';
import { Page } from 'puppeteer';

@injectable()
export class BidObserver extends EventEmitter {
  public async observeUrl(page: Page, url: string): Promise<void> {
    await page.exposeFunction('onBid', (url: string, numericBid: number) => {
      this.emit('newBid', numericBid);
    });

    await page.goto(url);

    await page.waitForSelector('.thread');

    await page.evaluate((url) => {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof Element && node.classList.contains('bid')) {
                const bidElement = node.querySelector('.bid-value');
                if (bidElement) {
                  const rawBid = (bidElement as HTMLElement).innerText;
                  const numericBid = Number.parseInt(
                    rawBid.replace(/[$,]/g, '')
                  );
                  window.onBid(url, numericBid);
                }
              }
            });
          }
        }
      });
      const ul = document.querySelector('.thread');

      if (ul) {
        observer.observe(ul, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      } else {
        console.log('Target node not found');
      }
    }, url);
  }
}
