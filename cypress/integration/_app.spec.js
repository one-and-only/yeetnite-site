describe('Navigation', () => {
    it('should navigate to the features page', () => {
        // Start from the index page
        cy.visit('/');
        cy.get('a[href*="features"]').click();
        cy.url().should('include', '/features');
    });
});