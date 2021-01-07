describe('The Download & API page', () => {
  it('should load without errors', () => {
    cy.visit('/doc/api')

    cy.contains('h1', 'Download & API').should('be.visible')
  })
})
