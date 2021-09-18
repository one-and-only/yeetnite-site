describe('Index Page', () => {
    it('should navigate to each page from the index page', () => {
        // test navigation to all pages

        // visit features page
        cy.visit('/');
        cy.get('a[href*="features"]').click();
        cy.url().should('include', '/features');
        // visit download page
        cy.visit('/');
        cy.get('a[href*="download"]').click();
        cy.url().should('include', '/download');
        // visit setup page
        cy.visit('/');
        cy.get('a[href*="setup"]').click();
        cy.url().should('include', '/setup');
    });
});