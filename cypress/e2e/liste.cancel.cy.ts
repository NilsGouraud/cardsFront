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
  cy.intercept('GET', '**/liste').as('liste');
  cy.wait('@liste');
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get('[data-cy="nom"]').last().click();
  cy.get('#inputNom').should('exist');
  cy.get('#inputNom').should('have.value', globalName);
  cy.get('[data-cy="nom"]').last().should('have.text', globalName);
  cy.get("[data-cy='deleteButton']").should('exist');
  cy.get("[data-cy='deleteButton']").click();
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
describe('cancelAndAlter', () => {
  it('should be possible to cancel changes', () => {
    //TODO change field, save, check
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
    cy.visit('/liste');
    const alteredName = 'cyTestName';
    const alteredEffect = 'mmm';
    const alteredDescription = 'mmm';
    const alteredType = 'éphémère';
    const alteredCout = '0';
    cy.get('[data-cy="nom"]').last().should('have.text', alteredName);

    cy.visit('/ajouter');

    cy.get('#nom').type(alteredName);
    cy.get('#nom').should('have.value', alteredName);
    cy.get('#effet').type(alteredEffect);
    cy.get('#effet').should('have.value', alteredEffect);
    cy.get('#description').type(alteredDescription);
    cy.get('#description').should('have.value', alteredDescription);
    cy.get('#type').select(alteredType);
    cy.get('#type').should('have.value', alteredType);
    cy.get('#atk').should('not.exist');
    cy.get('#pdv').should('not.exist');
    cy.get('#cout').type(alteredCout);
    cy.get('#cout').should('have.value', alteredCout);

    cy.get('button').click();
    cy.get('#cancelButton').click();
    cy.visit('/liste');
    cy.get('article').last().click();

    cy.get('#inputNom').should('have.value', globalName);
    cy.get('#inputEffet').should('have.value', globalEffect);
    cy.get('#inputDescription').should('have.value', globalDescription);
    cy.get('#inputType').find('option:selected').should('have.value', globalType);
    cy.get('#inputPdv').should('have.value', globalPdv);
    cy.get('#inputAtk').should('have.value', globalAtk);
    cy.get('#inputCout').should('have.value', globalCout);

    /*delete for further tests*/
    deleteTestCard();
  });
});
