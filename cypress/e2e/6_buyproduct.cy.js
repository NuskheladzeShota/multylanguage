describe('Buy Product Functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/en-US');
      cy.get('a[href="/sign-in"]').click();
  
     
      cy.get('input[name="email"]').type('skirtladzegedevan@gmail.com'); 
      cy.get('input[name="password"]').type('test123');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('eq', 'http://localhost:3000/');
    });
  
    it('should navigate to product list, buy a product, and complete the purchase', () => {
 
      cy.get('a[href="/en-US/product-list"] li.text-black')
        .should('be.visible')
        .click();
  
      cy.url().should('eq', 'http://localhost:3000/en-US/product-list');
  
      cy.get('button.bg-green-500')
        .should('be.visible')
        .first() 
        .click();
  
      cy.window().then((win) => {
        const newUrl = win.open;
        cy.wrap(newUrl).should('exist');
      });
  
      cy.get('.SubmitButton-IconContainer')
        .should('be.visible')
        .within(() => {
          cy.get('.SubmitButton-Icon--current svg')
            .should('exist');
        });
  
      cy.get('.SubmitButton-IconContainer .SubmitButton-Icon--current')
        .click();
  
    });
  });
  