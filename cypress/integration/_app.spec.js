describe('Navigation', () => {
    it('Navigate to the features page', () => {
        // Start from the index page
        cy.visit('/');
        cy.get('#responsive-navbar-nav > div.me-auto.navbar-nav > div:nth-child(2) > a').click();
        cy.url().should('include', '/features');
    });
});