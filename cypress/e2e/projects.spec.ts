import { getAlphabet } from 'cypress/support/util'

describe('The Projects page', () => {
  const pages = Cypress._.pull(getAlphabet(), 'X').takeRandomSet(3)

  pages.forEach(page => {
    it(`should be possible to use pagination and the visit detail pages (${page})`, () => {
      cy.visit('/project')

      cy.contains('.pagination > li', page).click()

      cy.get('.result-item a[href*="/project/"]').random().click()
    })
  })
})
