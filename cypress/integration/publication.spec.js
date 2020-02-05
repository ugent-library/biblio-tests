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
      .siblings('label.plain')
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

  function selectFacetTest(facetType, facet, facetLabel = null) {
    cy.param(facetType).should('be.null')

    cy.contains('h2', Cypress._.capitalize(facetType))
      .next('.bootstrap-select')
      .children('button')
      .should('have.length', 1)
      .click()
      .next('.dropdown-menu')
      .should('be.visible')
      .contains('span.text', new RegExp(`^\\s*${escapeStringRegexp(facetLabel || facet)} \\(\\d+\\)\\s*`))
      .as('facet')
      .getCount()
      .as('facetCount')

    cy.get('@facet').click()

    cy.param(facetType).should('eq', facet)

    cy.getCount().should(function(count) {
      expect(count).to.eq(this.facetCount)
    })

    cy.get('.active-filter')
      .as('filter')
      .should('have.length', 1)
      .should(f => expect(f[0].textContent.trim()).to.eq(`${facetType}: ${facet}`))
      .find('a')
      .click()

    cy.param(facetType).should('be.null')
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

  describe('The publication year facet', () => {
    const years = require('../fixtures/year')

    years.takeRandomSet().forEach(year => {
      it(`should be possible to filter by year ${year}`, () => checkboxFacetTest('year', year))
    })

    const yearTests = [5, 10]
    yearTests.forEach(years =>
      it(`should be possible to filter by the last ${years} years`, () => {
        cy.contains('.btn', `Last ${years} years`).click()

        const year = new Date().getFullYear()
        const range = Cypress._.range(year - years, year + 1) // .range() excludes the current year
          .map(i => i.toString())
        cy.param('year').should('have.all.members', range)

        cy.get(':checkbox[id^="facet-year-"]')
          .as('facets')
          .each($el => {
            if (range.includes($el.val())) {
              expect($el).to.be.checked
            } else {
              expect($el).to.be.not.checked
            }
          })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should('contain', `year: ${year - years}-${year}`)
          .find('a')
          .click()

        cy.param('year').should('be.null')
        cy.get('@facets').should('not.be.checked')
      })
    )

    it('should be possible to filter by custom years', () => {
      cy.contains('.btn', 'Custom years').click()

      cy.contains(':radio + label', 'Between').click()

      cy.get('input[name=min_year]')
        .last() // There is an identical field with the after custom year filter
        .type('{selectall}1993')

      cy.get('input[name=max_year]')
        .last() // There is an identical field with the before custom year filter
        .type('{selectall}2005')

      cy.get('.btn[value=Apply]')
        .last() // There are identical buttons for all custom year filters
        .click()

      cy.param('year').should('be.null')
      cy.param('min_year').should('eq', '1993')
      cy.param('max_year').should('eq', '2005')

      cy.get(':checkbox[id^="facet-year-"]')
        .as('facets')
        .each($el => {
          const year = parseInt($el.val())
          if (year >= 1993 && year <= 2005) {
            expect($el).to.be.checked
          } else {
            expect($el).to.be.not.checked
          }
        })

      cy.get('.active-filter')
        .as('filter')
        .should('have.length', 1)
        .should('contain', 'year: 1993-2005')
        .find('a')
        .click()

      cy.param('year').should('be.null')
      cy.param('max_year').should('be.null')
      cy.param('min_year').should('be.null')
      cy.get('@facets').should('not.be.checked')
    })
  })

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
      it(`should be possible to filter by subject ${subject}`, () => selectFacetTest('subject', subject))
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
      it(`should be possible to filter by language ${languages[language]}`, () =>
        selectFacetTest('language', language, languages[language]))
    })
  })

  describe('The organization filter', () => {
    const organizations = require('../fixtures/organization')

    organizations.takeRandomSet().forEach(organization => {
      it(`should be possible to filter by language ${organizations[organization]}`, () =>
        selectFacetTest('organization', organization, organizations[organization]))
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
