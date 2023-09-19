describe('New bid appears', () => {
  beforeEach(() => {
    // Visit the server
    cy.visit('http://localhost:3000');
  });

  it('Should load the auction page', () => {
    // Check if the page has loaded by asserting the presence of an element
    cy.get('.thread').should('be.visible');
  });

  it('New bid should appear after 5 seconds', () => {
    // Wait for 5 seconds
    cy.wait(5000);

    // Check if the new bid has appeared
    // Replace '[data-id="mock-bid"]' with the selector of your new bid
    cy.get('[data-id="mock-bid"]').should('be.visible');
  });

  it('New bid should have correct value', () => {
    // Wait for 5 seconds
    cy.wait(5000);

    // Check if the new bid has the correct value
    // Replace '.bid-value' with the selector of your bid value
    cy.get('.bid-value').should('contain', '$23,100');
  });
});
