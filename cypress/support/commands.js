// let SITE_URL = "https://next.hellomolly.io/";
const email = require("../../email.json");

Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://next.hellomolly.io/");

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

//request webhook Id

Cypress.Commands.add("createEmail", () => {
  const createEmailRequest = cy
    .request({
      method: "POST",
      url: "https://webhook.site/token/",
      
    })
    .then((response) => {
      const { uuid } = response.body;
      let data = {
        id: uuid,
        createdAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        }),
        email: `${uuid}@email.webhook.site`,
        password:"Smash@123",
      };

      return cy.wrap(data);
    });
  return createEmailRequest;
});

Cypress.Commands.add("getEmailOTP", () => {
  const page = 1;
  const password = "";
  const query = "";
  const sorting = "oldest";

  const url = `https://webhook.site/token/${email.id}/requests`;

  return cy
    .request({
      method: "GET",
      url,
      qs: {
        page,
        password,
        query,
        sorting,
      },
    })
    .then((response) => {
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
      return cy.wrap(content);
    });
});

// signup page

Cypress.Commands.add("signup", (email, password) => {
  cy.visit(`https://next.hellomolly.io/`);
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
  cy.visit(`https://next.hellomolly.io/`);
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
  cy.wait(5000);
});

Cypress.Commands.add("fillCompleteProfileForm", () => {
  cy.get('input[id="firstName"]').type("John");
  cy.get('input[id="lastName"]').type("Doe");
  cy.get('input[id="companyName"]').type("Example Company");
  cy.get('input[id="companyEmail"]').type("example@example.com");
  cy.get('input[id="companyWebsite"]').type("https://www.example.com");
  cy.get('input[id="companyPhone"]').type("1234567890");
  cy.get('input[id="companyAddress"]').type("123 Main St");
  cy.get("#companyIndustry").click();
  cy.get(".ant-select-dropdown")
    .contains(".ant-select-item", "Technology")
    .click();
  cy.get("#currentStage").click();
  cy.get(".ant-select-dropdown").contains(".ant-select-item", "Early").click();
  cy.get('button[type="submit"]').click();
});
