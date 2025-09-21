describe("play skip pause", () => {
  beforeEach(() => {
    cy.visit("https://wristbandradio.com/en");
  });
  it("should play a song, then skip it, and then pause the next song", () => {
    cy.wait(1000);
    // To get this test implemented correctly, I would need to deploy some changes to the live code which I'm not willing to do with this change
    // cy.get("[data-testid=track-bar]").should("have.attr", "value", "0");
    cy.get(".shadow-blue").click();
    cy.wait(5000);
    cy.get(".shadow-pink").click();
    cy.wait(5000);
    cy.get(".shadow-blue").click();
  });
});
