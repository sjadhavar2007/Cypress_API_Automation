///<reference types="Cypress" />

describe('Elements', function() {
    before(function(){
        cy.visit('https://demoqa.com/')
    })
    it('Text Box', function() {
        
        cy.scrollTo(0,400)
        cy.get(':nth-child(1) > :nth-child(1) > .avatar > svg').click()
        cy.get('.playgound-header').contains('Elements')
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0 > .text').click()
    })
    it('Check Box', function() {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-1 > .text').click()
        cy.get('.rct-title').contains('Home').should('be.visible')
        cy.get('.rct-title').contains('Home').click()
        cy.get('#result > :nth-child(2)').contains('home').should('be.visible')
    })
})