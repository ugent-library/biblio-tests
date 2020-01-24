Cypress.Commands.add('getCount', { prevSubject: ['element', 'optional'] }, subject => {
  if (!subject) {
    subject = Cypress.$('.breadcrumb > .total')
  }

  let text = subject.prop('textContent')

  let matches
  if ((matches = text.match(/\((?<count>\d+)\)/))) {
    text = matches.groups.count
  }

  let count = parseInt(text)

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
