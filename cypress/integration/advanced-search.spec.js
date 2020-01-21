describe('The Advanced Search page', () => {
  it('should load without errors', () => {
    cy.visit('/advanced-search')

    cy.contains('h1', 'Advanced search').should('be.visible')
  })
})
