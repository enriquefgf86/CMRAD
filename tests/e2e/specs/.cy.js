// tagsTextArea.spec.js

describe('TagsTextAreaComponent', () => {
  beforeEach(() => {
    cy.visit('/'); // Assuming the component is rendered on a specific page
  });

  it('should highlight hashtags when clicked', () => {
    // Type a string with a hashtag
    cy.get('[data-cy=textarea]').type('Hello #world');

    // Verify that the hashtag is highlighted
    cy.get('.hashtag').should('have.text', '#world');

   

    // Custom assertion or verification
    // Add your assertions here to check the behavior after clicking the hashtag
  });

  it('should create a new tag when submitting with Enter key', () => {
    // Type a string with a new tag
    cy.get('[data-cy=textarea]').type('New #tag{enter}');

    // Verify that the input text is cleared
    cy.get('[data-cy=textarea]').should('have.value', '');

    // Verify that the new tag is displayed
    cy.get('.hashtag').should('have.text', '#tag');

    // Custom assertion or verification
    // Add your assertions here to check the behavior after creating a new tag
  });

  // Add more test cases as needed
});
