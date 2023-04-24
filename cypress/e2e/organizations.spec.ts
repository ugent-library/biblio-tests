describe('The Organizations page', () => {
  it('should be possible to visit detail pages', () => {
    cy.visit('/organization')

    cy.get('.result-item a').map<JQuery<HTMLAnchorElement>, string>('href').takeRandomSet().each(cy.visit)
  })
})
