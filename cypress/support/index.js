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

Array.prototype.takeRandomSet = function(numberOfItems = 3) {
  return Cypress._.take(Cypress._.shuffle(this), numberOfItems)
}

Object.prototype.takeRandomSet = function(numberOfItems = 3) {
  return Object.keys(this).takeRandomSet(numberOfItems)
}
