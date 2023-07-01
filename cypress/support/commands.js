let SITE_URL = "https://next.hellomolly.io/";
let WEB_HOOK = "https://webhook.site/token/";
let EMAIL = "@email.webhook.site";

const email = require("../../email.json");

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
      url: `${WEB_HOOK}`,
    })
    .then((response) => {
      const { uuid, created_at } = response.body;
      let data = {
        id: uuid,
        createdAt: created_at,
        email: `${uuid}${EMAIL}`,
      };

      return data;
    });
});

// get email data

Cypress.Commands.add("getEmailOTP", () => {
  const page = 1;
  const password = "";
  const query = "";
  const sorting = "oldest";

  const url = `${WEB_HOOK}${email.id}/requests`;
   cy.request({
    method: "GET",
    url,
    qs: {
      page,
      password,
      query,
      sorting,
    },
  }).then((response) => {
    const data = response.body.data[0].text_content;

    function extractCode(content) {
      const pattern = /\b\d{6}\b/;
      const match = content.match(pattern);

      if (match) {
        return match[0];
      } else {
        return null; // No match found
      }
    }
    const content = extractCode(data);
    cy.log(JSON.stringify(content));
    return content;
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
