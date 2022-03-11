///<reference types="cypress"/>

describe('Demo QA site', function(){
    it('TC01-visit demoqa site', function(){
        cy.visit('https://demoqa.com/')
        cy.get(':nth-child(1) > :nth-child(1) > .card-up').click()
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0').click()
        cy.get('#userName').type('Pravin Jadhavar')
        cy.get('#userEmail').type('pravin@gmail.com')
        cy.get('#currentAddress').type('KAshidwadi')
        cy.get('#permanentAddress').type('Kaij')
        cy.get('#submit').click()
    })

    
})