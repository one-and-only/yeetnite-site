describe('Index Page', () => {
    it('Navigate to each page from the index page', () => {
        // test navigation to all pages

        // visit features page
        cy.visit('/');
        cy.get('#responsive-navbar-nav > div.me-auto.navbar-nav > div:nth-child(2) > a').click();
        cy.url().should('include', '/features');
        // visit download page
        cy.visit('/');
        cy.get('#responsive-navbar-nav > div.me-auto.navbar-nav > div:nth-child(3) > a').click();
        cy.url().should('include', '/download');
        // visit setup page
        cy.visit('/');
        cy.get('#responsive-navbar-nav > div.me-auto.navbar-nav > div:nth-child(4) > a').click();
        cy.url().should('include', '/setup');
    });
});