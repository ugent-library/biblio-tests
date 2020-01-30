import escapeStringRegexp from 'escape-string-regexp'

describe('The Publications page', () => {
  beforeEach(() => cy.visit('/publication'))

  xit('should be possible to search by full text', () => {})

  function checkboxFacetTest(facetType, facet, facetLabel = null, testForPublicationTag = false) {
    cy.param(facetType).should('be.null')

    cy.get(`:checkbox[id^="facet-${facetType}-"]`)
      .as('facets')
      .should('not.be.checked')
      .filter(`[value="${facet}"]`)
      .as('facet')
      .next()
      .find('.text-muted')
      .getCount()
      .as('facetCount')

    cy.get('@facet').click()

    cy.param(facetType).should('eq', facet)

    cy.getCount().should(function(count) {
      expect(count).to.eq(this.facetCount)
    })

    cy.get('@facet').should('be.checked')
    cy.get('@facets')
      .filter(`[value!="${facet}"]`)
      .should('not.be.checked')

    if (testForPublicationTag) {
      cy.get('.btn-tag')
        .map('textContent')
        .unique()
        .should('include.members', [facetLabel || facet])
    }

    cy.get('.active-filter')
      .as('filter')
      .should('have.length', 1)
      .should(f => expect(f[0].textContent.trim()).to.eq(`${facetType}: ${facet}`))
      .find('a')
      .click()

    cy.param(facetType).should('be.null')
    cy.get('@facets').should('not.be.checked')
    cy.get('@filter').should('have.length', 0)
  }

  describe('The publication type filter', () => {
    const publicationTypes = {
      book: 'Book',
      bookChapter: 'Book Chapter',
      bookEditor: 'Book Editor',
      conference: 'Conference Paper',
      dissertation: 'PhD Thesis',
      issueEditor: 'Issue Editor',
      journalArticle: 'Journal Article',
      misc: 'Miscellaneous'
      // 'preprint': '...',
      // 'researchData': '...
    }

    publicationTypes.takeRandomSet().forEach(type => {
      it(`should be possible to filter by publication type ${type}`, () =>
        checkboxFacetTest('type', type, publicationTypes[type], true))
    })
  })

  describe('The publication status filter', () => {
    const publicationStatuses = ['inpress', 'published', 'unpublished']

    publicationStatuses.forEach(status => {
      it(`should be possible to filter by publication status ${status}`, () =>
        checkboxFacetTest('publication_status', status))
    })
  })

  xit('should be possible to filter by publication years', () => {})

  xit('should be possible to filter by the last 5 years', () => {})

  xit('should be possible to filter by the last 10 years', () => {})

  xit('should be possible to filter by custom years', () => {})

  describe('The file access filter', () => {
    const accessOptions = ['open', 'restricted']

    accessOptions.forEach(accessOption => {
      it(`should be possible to filter by file access ${accessOption}`, () =>
        checkboxFacetTest('file_access', accessOption))
    })
  })

  describe('The subject filter', () => {
    const subjects = require('../fixtures/subject')

    subjects.takeRandomSet().forEach(subject => {
      it(`should be possible to filter by subject ${subject}`, () => {
        cy.param('subject').should('be.null')

        cy.contains('h2', 'Subject')
          .next('.bootstrap-select')
          .children('button')
          .should('have.length', 1)
          .click()

        cy.contains(subject)
          .as('facet')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('subject').should('eq', subject)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`subject: ${subject}`))
          .find('a')
          .click()

        cy.param('subject').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
    })
  })

  describe('The classification filter', () => {
    const classifications = require('../fixtures/classification')

    classifications.takeRandomSet().forEach(classification => {
      it(`should be possible to filter by classification ${classification}`, () =>
        checkboxFacetTest('classification', classification))
    })
  })

  describe('The language filter', () => {
    const languages = require('../fixtures/language')

    languages.takeRandomSet().forEach(language => {
      it(`should be possible to filter by language ${languages[language]}`, () => {
        cy.param('language').should('be.null')

        cy.contains('h2', 'Language')
          .next('.bootstrap-select')
          .children('button')
          .should('have.length', 1)
          .click()
          .next('.dropdown-menu')
          .should('be.visible')
          .contains('span.text', new RegExp(`^\\s*${escapeStringRegexp(languages[language])} \\(\\d+\\)\\s*$`))
          .as('facet')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('language').should('eq', language)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`language: ${language}`))
          .find('a')
          .click()

        cy.param('language').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
    })
  })

  describe('The organization filter', () => {
    const organizations = require('../fixtures/organization')

    organizations.takeRandomSet().forEach(organization => {
      it(`should be possible to filter by language ${organizations[organization]}`, () => {
        cy.param('organization').should('be.null')

        cy.contains('h2', 'Organization')
          .next('.bootstrap-select')
          .children('button')
          .should('have.length', 1)
          .click()
          .next('.dropdown-menu')
          .should('be.visible')
          .contains('span.text', organizations[organization])
          .as('facet')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('organization').should('eq', organization)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`organization: ${organization}`))
          .find('a')
          .click()

        cy.param('organization').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
    })
  })

  xit('should be possible to filter by title', () => {})

  xit('should be possible to filter by book, series or journal title', () => {})

  xit('should be possible to filter by author', () => {})

  xit('should be possible to filter by keyword', () => {})

  xit('should be possible to filter by project', () => {})

  xit('should be possible to filter by conference', () => {})

  xit('should be possible to combine all filters', () => {})

  xit('should be possible to jump through pages of search results', () => {})

  xit('should be possible to change the number of search results per page', () => {})

  xit('should be possible to sort the search results', () => {})
})
