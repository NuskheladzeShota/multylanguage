describe('Add Product to Stripe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/en-US');
    cy.get('a[href="/sign-in"]').click();

    cy.get('input[name="email"]').type('skirtladzegedevan@gmail.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.reload(); 
  });

  it('should fill the form and submit to add a product to Stripe', () => {

    cy.get('a[href="/en-US/addNewProduct"] li.text-black')
      .should('be.visible')
      .click();

    cy.url().should('include', '/en-US/addNewProduct');

    cy.get('input[name="title_en"]').type('Product Title EN');
    cy.get('input[name="title_ge"]').type('პროდუქტის სათაური GE');
    cy.get('textarea[name="description_en"]').type('This is a description in English.');
    cy.get('textarea[name="description_ge"]').type('ეს არის აღწერა ქართულად.');
    cy.get('select[name="gender"]').select('woman');
    cy.get('select[name="category"]').select('pants');
    cy.get('select[name="size"]').select('M');
    cy.get('input[name="price"]').type('100');

    cy.get('input[name="tag-0"]').type('Tag1');
    cy.get('input[name="tag-1"]').type('Tag2');
    cy.get('input[name="tag-2"]').type('Tag3');

    const filePath = 'cypress/fixtures/image.jpg';
    cy.get('input#ImgInput').selectFile(filePath, { force: true });

    cy.get('button[type="submit"]')
      .contains('Add Product to Stripe')
      .should('be.visible')
      .click();

  });
});
