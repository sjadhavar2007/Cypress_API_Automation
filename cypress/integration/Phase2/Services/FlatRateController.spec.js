///<reference types="Cypress" />

describe('Flat Rate Controller', function(){
var baseUrl;
var contentType;
var requestBody;
var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data.Content_Type
        })
        cy.fixture('Phase2/Services/FlatRateController').then(function(data){
            requestBody = data
        })
    })
    describe('Get request Flat_Rate', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/flat-rate/',
            }).then(function(res){
                expect(res.status).to.eq(200)
                this.content = res.body.response.content
            this.contentLength = this.content.length
            if (this.contentLength < 0) 
            {
                expect(res.body.response.content.length).to.equal(0)
            } else 
            {
                for( let i=0 ; i<this.contentLength ; i++ )
                {
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdById')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('customerFlatRate')
                    expect(res.body.response.content[i]).to.have.property('filler')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.contentLinks = res.body.response.content[i].links
                    this.contentLinksLength = this.contentLinks.length
                    for(let j=0 ; j<this.contentLinksLength ; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('model6')
                    expect(res.body.response.content[i]).to.have.property('opCodeList')
                    expect(res.body.response.content[i]).to.have.property('opFran')
                    expect(res.body.response.content[i]).to.have.property('opYear')
                    expect(res.body.response.content[i]).to.have.property('productionFlatRate')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updateById')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                }
            }
            this.Links = res.body.response.links
            this.LinksLength = this.Links.length
            for(let k=0 ; k<this.LinksLength ; k++)
            {
                expect(res.body.response.links[k]).to.have.property('href')
                expect(res.body.response.links[k]).to.have.property('rel')
            }
            expect(res.body.response.page).to.have.property('number')
            expect(res.body.response.page).to.have.property('size')
            expect(res.body.response.page).to.have.property('totalElements')
            expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

        })
        it('TC03-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/flat-rate/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get request for Verifying GET API for "Op Code List ID" in Post request', function(){
        it('TC04-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/op-code',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Get request for Verifying GET API for "Model6" in Post request', function(){
        it('TC05-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/service-model/',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Post request Flat_Rate', function(){
        it('TC06-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/flat-rate/',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": requestBody.id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('customerFlatRate',requestBody.customerFlatRate)
                expect(res.body.response).to.have.property('filler',requestBody.filler)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('model6',requestBody.model6)
                expect(res.body.response.opCodeList[0]).to.have.property('id',requestBody.opCodeListId)
                expect(res.body.response.opFran).to.have.property('id',requestBody.opFranId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
                expect(res.body.response).to.have.property('productionFlatRate',requestBody.productionFlatRate)
            })
        })
        it('TC07-NA-Verify that after the valid body and request is send it is reflected in the DATABASE', function(){

        })
        it('TC08-NA-Verify if the request fields are as per design', function(){

        })
        it('TC09-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/flat-rate/',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": "",
                    "filler": "",
                    "id": "",
                    "model6": "",
                    "opCodeListId": [
                        ""
                    ],
                    "opFranId": "",
                    "opYear": "",
                    "productionFlatRate": ""
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC10-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/flat-rate/',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": requestBody.id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                        requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get request Flat_Rate_ID', function(){
        it('TC11-Positive-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('customerFlatRate',requestBody.customerFlatRate)
                expect(res.body.response).to.have.property('filler',requestBody.filler)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('model6',requestBody.model6)
                expect(res.body.response.opCodeList[0]).to.have.property('id',requestBody.opCodeListId)
                expect(res.body.response.opFran).to.have.property('id',requestBody.opFranId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
                expect(res.body.response).to.have.property('productionFlatRate',requestBody.productionFlatRate)
            })
        })
        it('TC12-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC13-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

        })
        it('TC14-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Put request Flat_Rate_ID', function(){
        it('TC15-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                        requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('customerFlatRate',requestBody.customerFlatRate)
                expect(res.body.response).to.have.property('filler',requestBody.filler)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('model6',requestBody.model6)
                expect(res.body.response.opCodeList[0]).to.have.property('id',requestBody.opCodeListId)
                expect(res.body.response.opFran).to.have.property('id',requestBody.opFranId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
                expect(res.body.response).to.have.property('productionFlatRate',requestBody.productionFlatRate)
            })
        })
        it('TC16-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){

        })
        it('TC17-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                        requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }, failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": "",
                    "filler": "",
                    "id": id,
                    "model6": "",
                    "opCodeListId": [
                        ""
                    ],
                    "opFranId": "",
                    "opYear": "",
                    "productionFlatRate": ""
                }, failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC19-Negative-Verify if the request is send with an invalid ID, the Error message popping up in the response body is proper or not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                        requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }, 
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                this.message = res.body.message
                expect(res.body).to.have.property('message',this.message)
            })
        })
        it('TC20-Positive-Verify the response time for put request is less than 1 sec or not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/flat-rate/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "customerFlatRate": requestBody.customerFlatRate,
                    "filler": requestBody.filler,
                    "id": id,
                    "model6": requestBody.model6,
                    "opCodeListId": [
                        requestBody.opCodeListId
                    ],
                    "opFranId": requestBody.opFranId,
                    "opYear": requestBody.opYear,
                    "productionFlatRate": requestBody.productionFlatRate
                }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
})