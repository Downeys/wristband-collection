describe("submit contact us form", () => {
  beforeEach(() => {
    cy.visit("https://wristbandradio.com/en/contact");
  });
  it("should submit the form successfully if it is completely filled out with valid values", () => {
    cy.get("textarea")
      .type("test message.")
      .prev()
      .type("1112223333")
      .prev()
      .type("test@email.com")
      .prev()
      .type("Valid Name")
      .get("button")
      .click();

    cy.get("p").should("contain", "Message sent successfully");
  });
});
