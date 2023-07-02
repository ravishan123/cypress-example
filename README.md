# Cypress Example Project 🚀

This repository contains an example project that demonstrates how to use Cypress to write end-to-end tests for a web application.

## Getting Started
- Install Node.js and NPM.
- Clone this repository to your local machine.
- Run `npm install` to install the dependencies.
- Run `npm run cypress:open` to open Cypress in a browser.

## Running the Tests
To run the tests, you can use the following commands:

- `npm run cypress:run` ➡️ Runs the tests in a headless browser.
- `npm run cypress:open` ➡️ Opens Cypress in a browser so you can run the tests interactively.

## Debugging the Tests
If a test fails, you can use the following commands to debug the issue:

- `npm run cypress:debug` ➡️ Opens Cypress in a debugger so you can step through the code.
- `npm run cypress:open:failed` ➡️ Opens Cypress in a browser and shows the failed tests.

## Tests
The following tests are included in this project:

- `login` ➡️ This test logs in to the application using the provided email and password.
- `storeEmailDataFile` ➡️ This test stores the email data in a file.
- `createEmail` ➡️ This test creates a new email and returns the webhook ID.
- `getEmailOTP` ➡️ This test retrieves the OTP from the email.
- `signup` ➡️ This test signs up for a new account.
- `verifyAccount` ➡️ This test verifies the account using the verification code.
- `verifyEmail` ➡️ This test verifies the email address using the OTP.
- `fillCompleteProfileForm` ➡️ This test fills out the complete profile form.

## Contributing
If you find any bugs or have any suggestions, please feel free to open an issue or submit a pull request.
