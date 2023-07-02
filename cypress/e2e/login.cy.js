const email = require('../../email.json')
// Login process
describe('Login', () => {
  it('should log in successfully', () => {
    cy.login(email.email, 'Smash@123');
    // Continue with your assertions or further actions after logging in
  });
});

