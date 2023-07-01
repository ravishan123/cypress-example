const WAIT_TIME = 10000;
const email = require("../../email.json");

describe("Example Test", () => {
  it("should make a POST API call and extract the UUID", () => {
    // cy.createEmail()
    //   .then((data) => {
    //     cy.log("UUID:", data);
    //     cy.then(() => {
    //       cy.storeEmailDataFile(data).then((storedData) => {
    //         cy.log("Stored Data:", storedData);
    //       });
    //     });
    //   }).wait(WAIT_TIME).then(() => {
    //     cy.log("Timeout");
    // });
  });
});

describe("Example Test", () => {
  it("should sign up a new user", () => {
    if (email.email) {
      cy.signup(email.email, "Smash@123")
        .wait(WAIT_TIME)
        .then(() => {
          // cy.verifyEmail('123456');
        });
    }

    cy.log(email.email);
  });
});
