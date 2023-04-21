Cypress.Commands.addQuery('getFacets', function getFacets(facetType, options) {
  const getFn = cy.now('get', `:checkbox[id^="facet-${facetType}-"]`, options) as () => any

  return () => getFn()
})

declare namespace Cypress {
  interface Chainable {
    getFacets(facetType: string, options?: {}): Chainable<JQuery<HTMLInputElement>>
  }
}
