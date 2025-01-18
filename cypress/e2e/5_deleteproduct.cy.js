describe('Delete Product Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/en-US');
    cy.get('a[href="/sign-in"]').click();

    cy.get('input[name="email"]').type('skirtladzegedevan@gmail.com'); 
    cy.get('input[name="password"]').type('test123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should navigate to the product list and delete a product', () => {
  
    cy.get('a[href="/en-US/product-list"] li.text-black')
      .should('be.visible')
      .click();

    cy.url().should('eq', 'http://localhost:3000/en-US/product-list');

    cy.get('.flex.flex-col.border') 
      .first() 
      .within(() => {
        cy.contains('Delete') 
          .should('be.visible') 
          .click(); 
      });

    cy.contains('Product successfully deleted').should('be.visible'); 
    cy.get('.flex.flex-col.border').should('not.contain', 'Product Title');
  });
});
