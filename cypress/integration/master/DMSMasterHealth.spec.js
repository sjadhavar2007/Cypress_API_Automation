///<reference types="cypress"/>

describe('DMS Master Health Controller', function(){
    var commonUrl;
    before(function(){
        cy.fixture('master/DMSMasterHealth/DMSMasterHealth_url').then(function(data){
            commonUrl=data.URL_DMSMasterHealth
        })
    })

    describe('Get Request Master Health', function(){
        it('TC01-Positive-Verify that if user given valid API URL & Send the request then is it respoding with status code 200 or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC02-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message',)
                expect(res.body).to.have.property('response')
            })
        })
        it('TC03-Positive-Verify that is user able to send GET request multiple Time & its response with proper success code or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC04-Positive-Verify the response time of the GET request is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})