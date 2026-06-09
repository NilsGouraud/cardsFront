describe('main routes', () => {
  it('should load every page', () => {
    cy.visit('/');
    cy.contains(
      "Bienvenue sur la célèbre plateforme vaporware du MCBC. Vous pouvez consultez les cartes en cours d'implémentation, ou en créer de nouvelles.",
    );
    cy.visit('/liste');
    cy.contains(
      'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
    );
    cy.visit('/ajouter');
    cy.contains(
      'Vous pouvez ajouter une carte à la base de données par le biais de ce formulaire.',
    );
    cy.visit('/');
    cy.contains(
      "Bienvenue sur la célèbre plateforme vaporware du MCBC. Vous pouvez consultez les cartes en cours d'implémentation, ou en créer de nouvelles.",
    );
    cy.visit('/liste');
    cy.contains(
      'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
    );
    cy.visit('/ajouter');
    cy.contains(
      'Vous pouvez ajouter une carte à la base de données par le biais de ce formulaire.',
    );
  });
});
