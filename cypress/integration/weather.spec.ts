describe('Weather page', () => {
  const weatherUrl = '/data/2.5/weather?q=*';

  describe('No data', () => {
    beforeEach(() => {
      cy.intercept('GET', weatherUrl, undefined).as('getEmptyWeather');
      cy.visit('/weather');
    });

    it('Displays message when no weather data was returned', () => {
      cy.contains('No weather data exists yet.');
    });
  });

  describe('Fixture data', () => {
    beforeEach(() => {
      cy.intercept('GET', weatherUrl, { fixture: 'weather.json' }).as(
        'getWeather',
      );
      cy.visit('/weather');
    });

    it('Displays weather table with 10 rows', () => {
      cy.get('#weatherInfo').find('tr').should('have.length', 10);
    });

    it('Displays description from fixture in second td', () => {
      cy.get('#weatherInfo')
        .find('td:nth-child(2):first')
        .should(($cell) => {
          expect($cell).to.have.text('clear sky test');
        });
    });
  });
});
