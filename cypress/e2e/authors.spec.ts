import { getAlphabet } from 'cypress/support/util'

describe('The Authors page', () => {
  const pages = getAlphabet().takeRandomSet(3)

  pages.forEach(page => {
    it(`should be possible to use pagination and the visit detail pages (${page})`, () => {
      cy.visit('/person')

      cy.contains('.pagination > li', page).click()

      cy.get('.result-item a[href*="/person/"]').random().click()
    })
  })
})
