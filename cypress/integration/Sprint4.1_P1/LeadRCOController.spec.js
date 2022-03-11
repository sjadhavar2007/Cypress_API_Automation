///<reference types="cypress"/>

describe('Lead RCO Controller', function(){
    var commonUrl;
    before(function(){
        cy.fixture('Sprint4.1_P1/Url').then(function(data){
            commonUrl=data.URL_LeadRCOController
        })
    })
    describe('Get request Download_OR_File_ID', function(){
        it('TC01-Positive-Verify the status code of the Get request', function(){
            cy.request({
                method:'GET',
                url:commonUrl+'api/dms/leads/v1/leads/or/102/download',
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body).to.not.be.null
            })
        })
        it('TC02-NA-Verify that after hitting the URL in browser the pdf File is getting downloaded or not', function(){
            
        })
        it('TC03-Negative-Verify the status code is showing 403 when the request is send with an invalid ID ', function(){
            cy.request({
                method:'GET',
                url:commonUrl+'api/dms/leads/v1/leads/or/0/download',
                failOnStatusCode:false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Positive-Verify the response time is less than 1 sec or not', function(){
            cy.request({
                method:'GET',
                url:commonUrl+'api/dms/leads/v1/leads/or/102/download',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})
