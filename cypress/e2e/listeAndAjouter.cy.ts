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
  cy.visit('/liste');
}

describe('liste', () => {
  beforeEach(() => {
    cy.intercept('/liste').as('liste');
    cy.intercept('/ajouter').as('ajouter');
  });
  // it('should load page at /liste', () => {
  //   cy.visit('/liste');
  //   cy.contains(
  //     'Voici notre catalogue de cartes. Vous pouvez librement éditer chaque carte en cliquant dessus.',
  //   );
  // });

  // describe('formModal', () => {
  //   beforeEach(() => {
  //     cy.visit('/liste');
  //     cy.get('article').then((articles) => {
  //       if (!articles.length) {
  //         //test is relevant without any data
  //         return;
  //       }
  //       cy.get('article').eq(0).click();
  //     });
  //   });
  //   it('should open a modal with a form when an article is clicked', () => {
  //     cy.get('[data-cy="cardInForm"]').should('exist');
  //   });
  //   it('should close the modal when cancel is clicked', () => {
  //     cy.get('[data-cy="cancelButton"]').click();
  //     cy.get('[data-cy="cardInForm"]').should('not.exist');
  //   });
  //   it('should close the modal when escape is pressed', () => {
  //     cy.get('body').type('{esc}');
  //     cy.get('[data-cy="cardInForm"]').should('not.exist');
  //   });
  //   it('should close the modal when enter is pressed', () => {
  //     cy.get('body').type('{enter}');
  //     cy.get('[data-cy="cardInForm"]').should('not.exist');
  //   });
  // });

  describe('create card', () => {
    it('should open a modal if a name is already taken, and the modal should disappear when clicked', () => {
      //TODO go to /ajouter, attempt create a cyTestName and confirm
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
    it('should alter fields', () => {
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

      deleteTestCard();
    });
  });
});
