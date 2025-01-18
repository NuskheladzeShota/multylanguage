describe('signup Functionality', () => {
    it('should allow a user to register successfully', () => {
        cy.visit('http://localhost:3000/en-US');
        cy.title().should('include', 'Core Fitness');

        cy.get('a[href="/sign-up"]')
            .should('be.visible')
            .click();

        cy.url().should('include', '/sign-up');

        cy.get('input[name="email"]')
            .should('be.visible')
            .type('skirtladzegedevan@gmail.com');

        cy.get('input[name="password"]')
            .should('be.visible')
            .type('test123');

        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.url().should('eq', 'http://localhost:3000/');
    })
});