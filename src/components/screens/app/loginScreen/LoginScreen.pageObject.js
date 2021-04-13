export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/app/login');
  }

  fillLoginForm({ user, password }) {
    this.cy.get('#RegisterForm input[name="username"]').type(user);
    this.cy.get('#RegisterForm input[name="password"]').type(password);

    return this;
  }

  submitLoginForm() {
    this.cy.get('#RegisterForm button[type="submit"]').click();

    return this;
  }
}
