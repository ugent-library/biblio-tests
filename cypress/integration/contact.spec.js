describe('The Contact page', () => {
  it('should load without errors', () => {
    cy.visit('/contact')

    cy.contains('h1', 'Contact').should('be.visible')
  })
})
