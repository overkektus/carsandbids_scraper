setTimeout(() => {
  const mockBidElement = document.querySelector('[data-id="mock-bid"]');
  const threadElement = document.querySelector('.thread');

  // Insert the mockBidElement at the beginning of the threadElement
  threadElement.insertBefore(mockBidElement, threadElement.firstChild);
}, 5000);
