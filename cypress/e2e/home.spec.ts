describe('The Home page', () => {
  it('should display the highlighted publications and datasets', () => {
    cy.visit('/')

    cy.contains('New open access publications and datasets').should('be.visible')

    cy.get<HTMLAnchorElement>('.content-header-home ul:not(.list-unstyled) > li > a')
      .should('have.length.gte', 4)
      .should('have.length.lte', 6)
      .each(($el, index) => {
        cy.visit($el.prop('href'))

        cy.contains('aside .subtle dt', 'Publication type')
          .next()
          // First 3 highlights are publications, next 3 (or less) are datasets
          .should(index >= 3 ? 'contain' : 'not.contain', 'Research Data')
      })
  })

  it('should link the publications and datasets search pages', () => {
    cy.visit('/')

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
      .should('have.length.gte', 1)
      .map('textContent')
      .unique()
      .should('eql', ['Research Data'])
  })
})
