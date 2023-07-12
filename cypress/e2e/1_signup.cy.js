const WAIT_TIME = 100000;

describe("Signup Process", () => {
  it("should sign up a new user, wait for OTP, and verify email", () => {
    cy.signup()
      .wait(WAIT_TIME)
      .then(() => {
        cy.getEmailOTP().then((otp) => {
          cy.log(otp, "Verified email");
          cy.verifyEmail(otp);
        });
      });
  });
});

describe("Login Process", () => {
  it("should log in successfully and fill out the complete profile form", () => {
    cy.login()
      .wait(WAIT_TIME)
      .then(() => {
        cy.fillCompleteProfileForm();
      });

    // Continue with your assertions or further actions after logging in
  });
});
