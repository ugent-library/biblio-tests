describe('The Home page', () => {
  it('should display the highlights', () => {
    cy.visit('/')

    cy.contains('New open access publications and datasets').should('be.visible')

    cy.get('.content-header-home ul:not(.list-unstyled) > li > a').as('publications').should('have.length', 6)

    function checkResearchData(index: number, shouldBeOfTypeResearchData: boolean) {
      cy.get('@publications').eq(index).click()
      cy.contains('aside .subtle dt', 'Publication type')
        .next()
        .should(shouldBeOfTypeResearchData ? 'contain' : 'not.contain', 'Research Data')
      cy.go('back')
    }

    checkResearchData(0, false)
    checkResearchData(1, false)
    checkResearchData(2, false)
    checkResearchData(3, true)
    checkResearchData(4, true)
    checkResearchData(5, true)

    cy.contains('.content-header-home', 'View all open access publications and datasets').should('be.visible')

    cy.contains('.content-header-home a', 'publications').click()
    cy.location('pathname').should('eq', '/publication')
    cy.get('ul[data-facet=type]').find(':checkbox[value=researchData]').should('not.exist')
    cy.get('a.btn-tag[href*="/type/"]')
      .should('have.length', 10)
      .map('textContent')
      .should('not.include', 'Research Data')
    cy.go('back')

    cy.contains('.content-header-home a', 'datasets').click()
    cy.location('pathname').should('eq', '/publication')
    cy.get('ul[data-facet=type]').find(':checkbox[value=researchData]').should('be.visible')
    cy.get('a.btn-tag[href*="/type/"]')
      .should('have.length', 10)
      .map('textContent')
      .unique()
      .should('eql', ['Research Data'])
  })
})
