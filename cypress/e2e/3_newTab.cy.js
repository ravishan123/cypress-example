describe("Open new tab", () => {
  //Login process

  it("should log in successfully", () => {
    cy.login("waruni+11@smashtaps.com", "User@1234");
    // Continue with your assertions or further actions after logging in
    cy.wait(25000); // Replace '@networkRequest' with the alias or URL of the network request you want to wait for

    cy.get(".Sidebar_itemsWrapper__1dULO a").then(($links) => {
      const randomIndex = Math.floor(Math.random() * ($links.length - 7));
      cy.wrap($links[randomIndex]).click();
    });

    cy.get('a.Toolbar_link__2WOMy[target="_blank"]')
      .should("be.visible")
      .invoke("removeAttr", "target")
      .click();
  });
});
