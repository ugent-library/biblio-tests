describe('The Advanced Search page', () => {
  it('should load without errors', () => {
    cy.visit('/advanced-search')

    cy.contains('ol.breadcrumb > li', 'Advanced search').should('be.visible')
  })
})
