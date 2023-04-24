Cypress.Commands.add('takeRandomSet', { prevSubject: true }, (subject, numberOfItems = 3) => {
  if (Cypress._.isPlainObject(subject)) {
    subject = Object.keys(subject)
  }

  let yielded: unknown = null
  if (Cypress._.isArrayLike(subject)) {
    yielded = Cypress._.chain(subject).shuffle().take(numberOfItems).value()
  } else {
    throw new Error('Invalid subject type.')
  }

  Cypress.log({
    name: 'takeRandomSet',
    message: [numberOfItems],
    consoleProps: () => {
      return {
        subject,
        numberOfItems,
        yielded,
      }
    },
  })

  return cy.wrap(yielded, { log: false })
})

declare namespace Cypress {
  interface Chainable<Subject> {
    takeRandomSet(numberOfItems?: number): Chainable<Subject>
  }
}
