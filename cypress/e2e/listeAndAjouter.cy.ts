//TODO replace every visit with clicks on nav el
const backEndUrl = 'http://localhost:8080';

const globalName = 'cyTestName';
const globalEffect = 'cyTestEffect';
const globalDescription = 'cyTestDescription';
const globalType = 'créature';
const globalAtk = '7';
const globalPdv = '7';
const globalCout = '7';
const globalImage = 'cyTestImage';

function deleteTestCard() {
  cy.visit('/liste');
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get('[data-cy="nom"]').last().click();

  cy.get('#inputNom').should('exist');
  cy.get('#inputNom').should('have.value', globalName);
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get("[data-cy='deleteButton']").should('exist');
  cy.get("[data-cy='deleteButton']").click();
  cy.get('[data-cy="nom"]').last().should('not.have.text', globalName);
}
function createTestCard() {
  cy.visit('/ajouter');

  cy.get('#nom').type(globalName);
  cy.get('#nom').should('have.value', globalName);
  cy.get('#effet').type(globalEffect);
  cy.get('#effet').should('have.value', globalEffect);
  cy.get('#description').type(globalDescription);
  cy.get('#description').should('have.value', globalDescription);
  cy.get('#type').select(globalType);
  cy.get('#type').should('have.value', globalType);
  cy.get('#atk').type(globalAtk);
  cy.get('#atk').should('have.value', globalAtk);
  cy.get('#pdv').type(globalPdv);
  cy.get('#pdv').should('have.value', globalPdv);
  cy.get('#cout').type(globalCout);
  cy.get('#cout').should('have.value', globalCout);
  cy.get('button').click();
}

describe('liste', () => {
  it('should load page at /liste', () => {
    cy.visit('/liste');
    cy.contains(
      'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
    );
  });

  describe('create card', () => {
    beforeEach(() => {});
    it('should open a modal if a name is already taken, and the modal should disappear when clicked', () => {
      cy.visit('/ajouter');
      cy.get('#nom').type(globalName);
      cy.get('button').click();
      cy.visit('/liste');
      cy.get('[data-cy="nom"]').last().should('have.text', globalName);
      cy.get('#navAjouter').click();
      cy.get('#nom').type(globalName);
      cy.get('#nom').should('have.value', globalName);
      cy.get('button').click();
      cy.get('#modal').should('exist');
      cy.get('#modalBackdrop').should('exist');
      cy.get('#modal').contains(
        'Une carte nommée "' + globalName + '" existe déjà. Êtes-vous sur de vouloir la remplacer?',
      );
      /*the backdrop and the modal disappear on click*/
      cy.get('#modalBackdrop').click({ force: true });
      cy.get('#modal').should('not.exist');
      cy.get('#modalBackdrop').should('not.exist');

      deleteTestCard();
    });
    it('should not be possible to create from scratch instants and rituals with atk/pdv', () => {
      cy.visit('/ajouter');
      cy.get('#type').select('rituel');
      cy.get('#type').should('have.value', 'rituel');
      cy.get('#atk').should('not.exist');
      cy.get('#pdv').should('not.exist');
      cy.get('#type').select('éphémère');
      cy.get('#type').should('have.value', 'éphémère');
    });
  });
});
