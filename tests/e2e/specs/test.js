describe("TagsTextAreaComponent", () => {
  beforeEach(() => {
    cy.visit("/"); // Replace with the URL of your Vue app
  });

  it("should display input field", () => {
    cy.get('[data-cy="text-field"]').should("exist");
  });

  it("should type in the input field and show suggestions", () => {
    const inputText = "#liver";

    cy.get('[data-cy="text-field"]').type(inputText);

    cy.get('[data-cy="tags-list-suggestion"').should("have.length.gt", 0);
    cy.get('[data-cy="tags-list-suggestion"').each((item) => {
      cy.wrap(item).should("contain.text", inputText);
    });
  });

  it("should select a suggestion and update the input value", () => {
    const suggestionText = "#liver";
    const typeText = "liv";

    cy.get('[data-cy="text-field"]').type(typeText);
    cy.contains('[data-cy="tags-list-suggestion"]', suggestionText).click();
    cy.get('input[type="text"]').should("have.value", suggestionText);
  });

  it("should create a new tag and show the tooltip", () => {
    const newTag = "new tag";

    cy.get('[data-cy="text-field"]').type(newTag);
    cy.get('[data-cy="trigger-button"]').click();

    cy.get('[ data-cy="tooltip"]').should("be.visible");
    cy.contains('[ data-cy="tooltip"]', `A new #${newTag} tag was created`);
  });
});
