describe('formModal', () => {
  beforeEach(() => {
    cy.visit('/liste');
    cy.get('article').then((articles) => {
      if (!articles.length) {
        //test is relevant without any data
        return;
      }
      cy.get('article').eq(0).click();
    });
  });
  it('should open a modal with a form when an article is clicked', () => {
    cy.get('[data-cy="cardInForm"]').should('exist');
  });
  it('should close the modal when cancel is clicked', () => {
    cy.get('[data-cy="cancelButton"]').click();
    cy.get('[data-cy="cardInForm"]').should('not.exist');
  });
  it('should close the modal when escape is pressed', () => {
    cy.get('body').type('{esc}');
    cy.get('[data-cy="cardInForm"]').should('not.exist');
  });
  it('should close the modal when enter is pressed', () => {
    cy.get('body').type('{enter}');
    cy.get('[data-cy="cardInForm"]').should('not.exist');
  });
});
