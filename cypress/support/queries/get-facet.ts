Cypress.Commands.addQuery('getFacet', function getFacet(facetType, facet, options) {
  const getFn = cy.now('get', `:checkbox[id^="facet-${facetType}-"][value="${facet}"]`, options) as (
    subject: any
  ) => any

  return subject => getFn(subject)
})

declare namespace Cypress {
  interface Chainable {
    getFacet(facetType: string, facet: string, options?: {}): Chainable<JQuery<HTMLInputElement>>
  }
}
