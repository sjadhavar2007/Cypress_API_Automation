///<reference types="cypress"/>

describe('DMS-1092 BE - Status data(Leads Stats Controller) ', function(){
    var commonUrl;
    var paramsInfo;
    before(function(){
        cy.fixture('leads/DMS_1092/DMS_1092_Url').then(function(data){
            commonUrl=data.URL_LeadsStatsController
        })
        cy.fixture('leads/DMS_1092/DMS_1092_params').then(function(data){
            paramsInfo=data
        })
    })
    describe('Get Request Lead_Stats', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'leadStats',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++)
                {
                    expect(res.body.response[i]).to.have.property('actual')
                    expect(res.body.response[i]).to.have.property('label')
                    expect(res.body.response[i]).to.have.property('percentage')
                    expect(res.body.response[i]).to.have.property('target')
                    expect(res.body.response[i].links.length).to.equal(0)
                }
            })
        })
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'leadStats',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Stats', function(){
        it('TC04-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'stats',
                qs: {
                    "from": paramsInfo.from,
                    "to": paramsInfo.to,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('actual')
                    expect(res.body.response[i]).to.have.property('label')
                    expect(res.body.response[i]).to.have.property('percentage')
                    expect(res.body.response[i]).to.have.property('target')
                    expect(res.body.response[i].links.length).to.equal(0)
                }
            })
        })
        it('TC05-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC06-Negative-Verify that the response code is proper if It is sent without mandatory param', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'stats',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Negative-Verify that the response code is proper if It is sent with blank param', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'stats',
                qs: {
                    "from": "",
                    "to": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC08-Negative-Verify that the response code is proper if It is sent with invalid mandatory param', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'stats',
                qs: {
                    "from": 'ERROR'+paramsInfo.from,
                    "to": 'ERROR'+paramsInfo.to,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC09-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'stats',
                qs: {
                    "from": paramsInfo.from,
                    "to": paramsInfo.to,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})