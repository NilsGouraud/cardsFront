describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains(
      "Bienvenue sur la célèbre plateforme vaporware du MCBC. Vous pouvez consultez les cartes en cours d'implémentation, ou en créer de nouvelles.",
    );
  });
});
