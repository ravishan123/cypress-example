let SITE_URL = "https://next.hellomolly.io/";

Cypress.Commands.add("login", (email, password) => {
  cy.visit(SITE_URL);

  cy.get("#email").type(email); // Assuming the email input has the id "email"
  cy.get("#password").type(password); // Assuming the password input has the id "password"

  cy.get('button[type="submit"]').click(); // Assuming the submit button has a "type" attribute with value "submit"
});

Cypress.Commands.add("storeEmailDataFile", (data) => {
  const jsonData = JSON.stringify(data, null, 2);

  cy.writeFile("email.json", jsonData).then(() => {
    return data;
  });
});

// request webhook Id
Cypress.Commands.add("createEmail", () => {
  return cy
    .request({
      method: "POST",
      url: "https://webhook.site/token/",
    })
    .then((response) => {
      const { uuid, created_at } = response.body;
      let data = {
        id: uuid,
        createdAt: created_at,
        email: `${uuid}@email.webhook.site`,
      };

      return data;
    });
});

// signup page

Cypress.Commands.add("signup", (email, password) => {
  cy.visit(SITE_URL);
  cy.get('a[href="/signup"]')
    .click()
    .then(() => {
      cy.get("input#email").type(email);
      cy.get("input#password").type(password);
      cy.get("input#confirm-password").type(password);
      cy.get('button[type="submit"]').click();
    });
});

Cypress.Commands.add("verifyAccount", (email, password) => {
  cy.visit(SITE_URL);
  cy.get('a[href="/signup"]')
    .click()
    .then(() => {
      cy.get("input#email").type(email);
      cy.get("input#password").type(password);
      cy.get("input#confirm-password").type(password);
      cy.get('button[type="submit"]').click();
    });
});

Cypress.Commands.add("verifyEmail", (verificationCode) => {
  cy.get("#verificationCode").type(verificationCode);

  cy.get('button[type="submit"]').click();
});
