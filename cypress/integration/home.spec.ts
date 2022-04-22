describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Displays the header', () => {
    cy.contains('My App');
  });
});
