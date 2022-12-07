Cypress.Commands.addQuery('getFacet', function getFacet(facetType, facet, options) {
  const getFn = cy.now('get', `:checkbox[id^="facet-${facetType}-"][value="${facet}"]`, options)

  return subject => getFn(subject)
})
