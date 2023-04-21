// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-common'

import './commands'
import './queries'

declare global {
  interface Array<T> {
    takeRandomSet(numberOfItems?: number): T[]
  }

  interface Object {
    takeRandomSet(numberOfItems?: number): string[]
  }
}

Object.defineProperty(Array.prototype, 'takeRandomSet', {
  value: function <T>(numberOfItems = 3) {
    return Cypress._.take<T>(Cypress._.shuffle(this), numberOfItems)
  },
})

Object.defineProperty(Object.prototype, 'takeRandomSet', {
  value: function (numberOfItems = 3) {
    return Object.keys(this).takeRandomSet(numberOfItems)
  },
})
