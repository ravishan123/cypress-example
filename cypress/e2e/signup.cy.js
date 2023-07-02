const WAIT_TIME = 50000;
const email = require("../../email.json");

describe("Email Creation", () => {
  it("should make a POST API call to create an email and extract the UUID", () => {
    cy.createEmail().then((data) => {
      cy.log("UUID:", data);
      
      cy.storeEmailDataFile(data).then((storedData) => {
        cy.log("Stored Data:", JSON.stringify(storedData));

        expect(storedData).to.exist;
        expect(storedData.id).to.equal(data.id);
      });
    });
  });
});

describe("Signup Process", () => {
  it("should sign up a new user, wait for OTP, and verify email", () => {
    if (email.email) {
      cy.signup(email.email, "Smash@123")
        .wait(WAIT_TIME)
        .then(() => {
          cy.getEmailOTP().then((otp) => {
            cy.log(otp, "Verified email");
            cy.verifyEmail(otp);
          });
        });
    }
  });
});

describe("Login Process", () => {
  it("should log in successfully and fill out the complete profile form", () => {
    cy.login(email.email, "Smash@123")
      .wait(10000)
      .then(() => {
        cy.fillCompleteProfileForm();
      });

    // Continue with your assertions or further actions after logging in
  });
});
