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
  cy.wait('@liste');
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get('[data-cy="nom"]').last().click();
  cy.get('#inputNom').should('exist');
  cy.get('#inputNom').should('have.value', globalName);
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get("[data-cy='deleteButton']").should('exist');
  cy.get("[data-cy='deleteButton']").click();
  cy.wait('@liste');
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
    beforeEach(() => {
      cy.intercept('GET', '**/liste').as('liste');

      createTestCard();
    });
    afterEach(() => {
      deleteTestCard();
    });
    it('should use the form to create and the liste modal to delete', () => {});
    it('should display the right fields in liste', () => {
      cy.visit('/liste');
      cy.wait('@liste');
      cy.get('article').last();
      cy.get('article').last().contains(globalEffect);
      cy.get('article').last().contains(globalName);
      cy.get('article').last().contains(globalDescription);
      cy.get('article').last().contains(globalType);
      cy.get('article').last().contains(globalAtk);
      cy.get('article').last().contains(globalPdv);
      cy.get('article').last().contains(globalCout);
      cy.get('article').last().contains(globalName);
      cy.get('article').last().contains(globalName);
    });
    it('should display the right fields in the edit form', () => {
      cy.visit('/liste');
      cy.wait('@liste');
      cy.get('article').last().click();
      //   cy.wait(100);
      cy.get('#inputNom').should('have.value', globalName);
      cy.get('#inputEffet').should('have.value', globalEffect);
      cy.get('#inputDescription').should('have.value', globalDescription);
      cy.get('#inputType').should('have.value', globalType);
      cy.get('#inputAtk').should('have.value', globalAtk);
      cy.get('#inputPdv').should('have.value', globalPdv);
      cy.get('#inputCout').should('have.value', globalCout);
    });
  });
});
