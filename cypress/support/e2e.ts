import 'cypress-common'

import './commands'
import './queries'

declare global {
  interface Array<T> {
    takeRandomSet(numberOfItems?: number): T[]
  }

  interface Object {
    takeRandomSet<T, K extends keyof T>(this: T, numberOfItems?: number): K[]
  }
}

Object.defineProperty(Array.prototype, 'takeRandomSet', {
  value: function <T>(numberOfItems = 3) {
    return Cypress._.take<T>(Cypress._.shuffle(this), numberOfItems)
  },
})

Object.defineProperty(Object.prototype, 'takeRandomSet', {
  value: function <T, K extends keyof T>(numberOfItems = 3): K[] {
    const keys = Object.keys(this) as K[]

    return keys.takeRandomSet(numberOfItems)
  },
})
