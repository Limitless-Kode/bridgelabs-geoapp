/// <reference types="cypress" />

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays all page contents properly', () => {
    cy.get('#search').should('exist')
    cy.get('#search>input').should('exist')
    cy.get('#search>button').should('exist')
    cy.get('#map').should('exist')
  })

  it('Shows country maps correctly', () => {
    cy.get('#united-kingdom').should('exist')
    cy.get('#canada').should('exist')
    cy.get('#ghana').should('exist')
    cy.get('#nigeria').should('exist')
  })

  it('shows shimmer effect when loading', () => {
    cy.get('#shimmer').should('exist')
  })

  it('Search Box is enabled for typing', () => {
    const country = 'Ghana'
    cy.get('#search>input').type(`${country}{enter}`)
  })

  it('can search for country on search button press', () => {
    const country = 'Ghana'
    cy.get('#search>input').type(`${country}`)
    cy.get('#search>button').click()
    cy.get('#shimmer').should('exist')

    cy.get('#ghana-result').should('exist')
  })

  it('can show multiple results', () => {
    const country = 'J'
    cy.get('#search>input').type(`${country}`)
    cy.get('#search>button').click()
    cy.get('#shimmer').should('exist')

    cy.get('.result').should('have.length', 5)
  })

  it('can show details for a selected country', () => {
    const country = 'Ni'
    cy.get('#search>input').type(`${country}`)
    cy.get('#search>button').click()
    cy.get('#shimmer').should('exist')

    cy.get('#nigeria').click()

    cy.get('#country-details-sheet').should('exist')
  })
});