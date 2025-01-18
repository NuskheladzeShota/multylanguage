describe('Logout Functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/en-US');
      cy.get('a[href="/sign-in"]').click();
  
      cy.get('input[name="email"]').type('skirtladzegedevan@gmail.com');
      cy.get('input[name="password"]').type('test123'); 
      cy.get('button[type="submit"]').click();

   
    });
  
    it('should refresh the page and log the user out by clicking the Sign out button', () => {
    
      cy.url().should('eq', 'http://localhost:3000/');

      cy.reload();
  
      cy.get('button[type="submit"]')
        .contains('Sign out') 
        .should('be.visible') 
        .click();
  
      cy.url().should('include', '/sign-in');
      cy.contains('Sign in').should('be.visible');
    });
  });
  