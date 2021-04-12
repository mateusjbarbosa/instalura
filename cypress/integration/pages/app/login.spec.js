/// <reference types="cypress" />

describe('app/login/', () => {
  it('Should fill in the fields and go to the page app/profile/', () => {
    cy.visit('/app/login/');

    cy.get('#RegisterForm input[name="username"]').type('mateusjbarbosa');
    cy.get('#RegisterForm input[name="password"]').type('senhasegura');
    cy.get('#RegisterForm button[type="submit"]').click();

    cy.url().should('include', '/app/profile');
  });
});
