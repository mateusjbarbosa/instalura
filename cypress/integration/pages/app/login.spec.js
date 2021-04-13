/// <reference types="cypress" />

const API_URL = 'https://instalura-api.omariosouto.vercel.app/api/login';

describe('app/login/', () => {
  it('Should fill in the fields and go to the page app/profile/', () => {
    cy.intercept(API_URL)
      .as('userLogin');

    cy.visit('/app/login/');

    cy.get('#RegisterForm input[name="username"]').type('omariosouto');
    cy.get('#RegisterForm input[name="password"]').type('senhasegura');
    cy.get('#RegisterForm button[type="submit"]').click();

    cy.url().should('include', '/app/profile');

    cy.wait('@userLogin')
      .then((intercept) => {
        const { token } = intercept.response.body.data;

        cy.getCookie('APP_TOKEN')
          .should('exist')
          .should('have.property', 'value', token);
      });
  });
});
