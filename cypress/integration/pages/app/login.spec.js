/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/loginScreen/LoginScreen.pageObject';

const API_URL = 'https://instalura-api-git-master-omariosouto.vercel.app';

describe('/pages/app/login/', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      cy.intercept(`${API_URL}/api/login`)
        .as('userLogin');

      const loginScreen = new LoginScreenPageObject(cy);

      loginScreen
        .fillLoginForm({ user: 'omariosouto', password: 'senhasegura' })
        .submitLoginForm();

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
});
