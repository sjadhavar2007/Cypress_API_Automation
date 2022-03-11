///<reference types="cypress"/>

describe('Admin Health Controller', function(){
    var commonUrl;
    before(function(){
        cy.fixture('admin/AdminHealth/AdminHealth_url').then(function(data){
            commonUrl=data.URL_HealthController
        })
    })
    describe('Get Request User', function(){
        it('TC01-Positive-Verify that the response is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.not.equal(null)
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('response')
            })
        })
        it('TC02-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC03-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})
