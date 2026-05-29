const backEndUrl = 'http://localhost:8080';

function deleteTestCard() {
  const name = 'cyTestName';
  cy.visit('/liste');
  cy.get('[data-cy="nom"]').last().should('have.text', name);
  cy.get('[data-cy="nom"]').last().click();
  cy.get('#inputNom').should('exist');
  cy.get('#inputNom').should('have.value', name);
  cy.get('[data-cy="nom"]').last().should('have.text', name);
  cy.get("[data-cy='deleteButton']").should('exist');
  cy.get("[data-cy='deleteButton']").click();
  cy.get('[data-cy="nom"]').last().should('not.have.text', name);
  cy.visit('/liste');
}
function createTestCard() {
  const name = 'cyTestName';
  const effect = 'cyTestEffect';
  const description = 'cyTestDescription';
  const type = 'créature';
  const atk = '7';
  const pdv = '7';
  const cout = '7';
  const image = 'cyTestImage';
  cy.intercept('GET', backEndUrl + '/ajouter').as('ajouter');
  cy.intercept('GET', backEndUrl + '/liste').as('liste');
  cy.visit('/ajouter');
  cy.get('#nom').type(name);
  cy.get('#nom').should('have.value', name);
  cy.get('#effet').type(effect);
  cy.get('#effet').should('have.value', effect);
  cy.get('#description').type(description);
  cy.get('#description').should('have.value', description);
  cy.get('#type').select(type);
  cy.get('#type').should('have.value', type);
  cy.get('#atk').type(atk);
  cy.get('#atk').should('have.value', atk);
  cy.get('#pdv').type(pdv);
  cy.get('#pdv').should('have.value', pdv);
  cy.get('#cout').type(cout);
  cy.get('#cout').should('have.value', cout);
  cy.get('button').click();
}

describe('liste', () => {
  beforeEach(() => {});
  it('should load page at /liste', () => {
    cy.visit('/liste');
    cy.contains(
      'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
    );
  });

  describe('formModal', () => {
    beforeEach(() => {
      cy.visit('/liste');

      cy.get('article').then((articles) => {
        if (!articles.length) {
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

  describe('newly added card', () => {
    it('should open a model if a name is already taken', () => {
      cy.visit('/liste');
      cy.wait(1000);
      cy.visit('ajouter');
      cy.wait(1000);
      cy.visit('/liste');

      //TODO go to /ajouter, attempt create a cyTestName and confirm
      const name = 'cyTestName';
      const effect = 'cyTestEffect';
      const description = 'cyTestDescription';
      const type = 'créature';
      const atk = '7';
      const pdv = '7';
      const cout = '7';
      const image = 'cyTestImage';
      createTestCard();

      cy.visit('/liste');
      cy.get('[data-cy="nom"]').last().should('have.text', name);
      cy.visit('/ajouter');
      cy.wait('@liste');
      cy.get('#nom').type(name);
      cy.get('#nom').should('have.value', name);
      cy.get('button').click();
      cy.get('#modal').should('exist');
      cy.get('#modalBackdrop').should('exist');
      cy.get('#modal').contains(
        'Une carte nommée "' + name + '" existe déjà. Êtes-vous sur de vouloir la remplacer?',
      );
      cy.get('#modalBackdrop').click();
      cy.get('#modal').should('not.exist');
      cy.get('#modalBackdrop').should('not.exist');

      deleteTestCard();

      //TODO go to /ajouter, attempt create a cyTestName and cancel
    });
    // it('should rearrange fields', () => {
    //   //TODO modify each field, save, check, reset the name for deletion
    // });
  });
});
