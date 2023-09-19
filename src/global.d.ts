export {};

declare global {
  interface Window {
    onBid: (url: string, numericBid: number) => void;
  }
}