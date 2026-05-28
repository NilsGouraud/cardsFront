describe('liste', () => {
  it('should load page at /liste', () => {
    cy.visit('/liste');
    cy.contains(
      'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
    );
  });
  beforeEach(() => {
    cy.visit('/liste');
  });

  it('should open a modal with a form when an article is clicked', () => {
    cy.get('article').then((articles) => {
      if (!articles.length) {
        return;
      }
      cy.get('article').eq(0).click();
      cy.get('[data-cy="cardInForm"]').should('exist');
    });
  });
});
