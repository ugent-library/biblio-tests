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

    Object.keys(publicationTypes).forEach(type => {
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

    publicationStatuses.forEach(status => {
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

  xit('should be possible to filter by access types', () => {})

  xit('should be possible to filter by subjects', () => {})

  xit('should be possible to filter by classifications', () => {})

  xit('should be possible to filter by languages', () => {})

  xit('should be possible to filter by organisations', () => {})

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
