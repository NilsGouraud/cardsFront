describe('ajouter', () => {
  it('should page at /ajouter', () => {
    cy.visit('/ajouter');
    cy.contains(
      'Vous pouvez ajouter une carte à la base de données par le biais de ce formulaire.',
    );
  });
});
