Cypress.Commands.addQuery('getFacets', function getFacets(facetType, options) {
  const getFn = cy.now('get', `:checkbox[id^="facet-${facetType}-"]`, options)

  return () => getFn()
})
