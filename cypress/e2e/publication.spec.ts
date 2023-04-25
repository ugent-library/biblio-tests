describe('The publication page', () => {
  it('should load without errors', () => {
    cy.visit('/publication/8565192')
  })

  it.skip('should call the times-cited API', () => {
    cy.intercept('/info/times-cited*').as('timesCited')

    cy.visit('/publication/8731393')

    cy.get('@timesCited').should('have.nested.property', 'response.statusCode', 200)
  })
})
