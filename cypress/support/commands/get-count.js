Cypress.Commands.add('getCount', { prevSubject: ['element', 'optional'] }, subject => {
  if (!subject) {
    subject = Cypress.$('.breadcrumb > .total')
  }

  let text = subject.prop('textContent')
  let count = parseInt(text.replace(/[,\(\)]/g, ''))

  Cypress.log({
    name: 'getCount',
    message: [count],
    consoleProps: () => {
      return {
        count: count
      }
    }
  })

  return cy.wrap(count, { log: false })
})
