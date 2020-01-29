describe('The Publications page', () => {
  beforeEach(() => cy.visit('/publication'))

  xit('should be possible to search by full text', () => {})

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
      it(`should be possible to filter by publication type ${type}`, () => {
        cy.param('type').should('be.null')

        cy.get(`:checkbox[id^="facet-type-"][value="${type}"]`)
          .as('facet')
          .next()
          .find('.text-muted')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('type').should('eq', type)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.btn-tag')
          .map('textContent')
          .unique()
          .should('include.members', [publicationTypes[type]])

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`type: ${type}`))
          .find('a')
          .click()

        cy.param('type').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
    })
  })

  describe('The publication status filter', () => {
    const publicationStatuses = ['inpress', 'published', 'unpublished']

    publicationStatuses.takeRandomSet().forEach(status => {
      it(`should be possible to filter by publication status ${status}`, () => {
        cy.param('status').should('be.null')

        cy.get(`:checkbox[id^="facet-publication_status-"][value="${status}"]`)
          .as('facet')
          .next()
          .find('.text-muted')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('publication_status').should('eq', status)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`publication_status: ${status}`))
          .find('a')
          .click()

        cy.param('publication_status').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
    })
  })

  xit('should be possible to filter by publication years', () => {})

  xit('should be possible to filter by the last 5 years', () => {})

  xit('should be possible to filter by the last 10 years', () => {})

  xit('should be possible to filter by custom years', () => {})

  describe('The file access filter', () => {
    const accessOptions = ['open', 'restricted']

    accessOptions.takeRandomSet().forEach(accessOption => {
      it(`should be possible to filter by file access ${accessOption}`, () => {
        cy.param('file_access').should('be.null')

        cy.get(`:checkbox[id^="facet-file_access-"][value="${accessOption}"]`)
          .as('facet')
          .next()
          .find('.text-muted')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('file_access').should('eq', accessOption)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`file_access: ${accessOption}`))
          .find('a')
          .click()

        cy.param('file_access').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
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
      it(`should be possible to filter by classification ${classification}`, () => {
        cy.param('classification').should('be.null')

        cy.get(`:checkbox[id^="facet-classification-"][value="${classification}"]`)
          .as('facet')
          .next()
          .find('.text-muted')
          .getCount()
          .as('facetCount')

        cy.get('@facet').click()

        cy.param('classification').should('eq', classification)

        cy.getCount().should(function(count) {
          expect(count).to.eq(this.facetCount)
        })

        cy.get('.active-filter')
          .as('filter')
          .should('have.length', 1)
          .should(f => expect(f[0].textContent.trim()).to.eq(`classification: ${classification}`))
          .find('a')
          .click()

        cy.param('classification').should('be.null')
        cy.get('@filter').should('have.length', 0)
      })
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
          .contains('span.text', new RegExp(`^\\s*${languages[language]} \\(\\d+\\)\\s*$`))
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
