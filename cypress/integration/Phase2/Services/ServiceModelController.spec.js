///<reference types="Cypress" />
import getCode from '././Utility/getCode'
describe('Service Model Controller', function() {
    var baseUrl;
    var contentType;
    var requestBody;
    var uniqueCode;
    var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data        
        })
        cy.fixture('Phase2/Services/ServiceModelControllerBody').then(function(data){
            requestBody = data
        })
        const code=new getCode();
        uniqueCode=code.getCode();
    })
    describe('Get request Service_Model', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: "GET",
                url: baseUrl+"/api/dms/services/v1/service-model/",
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
                        expect(res.body.response.content[i]).to.have.property('engineOil')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                        expect(res.body.response.content[i]).to.have.property('vehicleModel')
                        expect(res.body.response.content[i]).to.have.property('washLabourAmount')
                        expect(res.body.response.content[i]).to.have.property('washLabourAmount2')
                        expect(res.body.response.content[i]).to.have.property('washLabourTax')
                        expect(res.body.response.content[i]).to.have.property('washLabourTax2')
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
                method: "GET",
                url: baseUrl+"/api/dms/services/v1/service-model/",
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get request for Verifying GET API for "Vehicle Model"  in Post request for Model6, OIS & Model Code fields', function(){
        it('TC04-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
            cy.request({
                method: "GET",
                url: baseUrl+"/api/dms/master/v1/vehicle-models",
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
                        expect(res.body.response.content[i]).to.have.property('model6')
                        expect(res.body.response.content[i]).to.have.property('originalImportStatus')
                        expect(res.body.response.content[i]).to.have.property('code')
                    }
                }
            })
        })
    })
    describe('Post request Service_Model', function(){
        it('TC05-Positive-Verify the status code for response body is 201 and response data is as per request body || TC09-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: "POST",
                url: baseUrl+"/api/dms/services/v1/service-model/",
                headers: {
                    "Content-Type": contentType.Content_Type,
                },
                body: {
                    "engineOil": requestBody.engineOil,
                    "id": requestBody.id,
                    "vehicleModelId": uniqueCode,
                    "washLabourAmount": requestBody.washLabourAmount,
                    "washLabourAmount2": requestBody.washLabourAmount2,
                    "washLabourTax": requestBody.washLabourTax,
                    "washLabourTax2": requestBody.washLabourTax2,
                  }
                }).then(function(res){
                    expect(res.status).to.eq(201)
                    expect(res.duration).to.be.lessThan(1000)
                    id = res.body.response.id
                    expect(res.body.response).to.have.property('engineOil', requestBody.engineOil)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.vehicleModel).to.have.property('id')
                    expect(res.body.response).to.have.property('washLabourAmount', requestBody.washLabourAmount)
                    expect(res.body.response).to.have.property('washLabourAmount2', requestBody.washLabourAmount2)
                    expect(res.body.response).to.have.property('washLabourTax', requestBody.washLabourTax)
                    expect(res.body.response).to.have.property('washLabourTax2', requestBody.washLabourTax2)
            })
        })
        it('TC06-NA-Verify that after the valid body and request is send it is reflected in the DATABASE', function(){

        })
        it('TC07-NA-Verify if the request fields are as per design', function(){

        })
        it('TC08-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
            cy.request({
                method: "POST",
                url: baseUrl+"/api/dms/services/v1/service-model/",
                headers: {
                    "Content-Type": contentType.Content_Type,
                },
                body: {
                    "engineOil": "",
                    "id": "",
                    "vehicleModelId": "",
                    "washLabourAmount": "",
                    "washLabourAmount2": "",
                    "washLabourTax": "",
                    "washLabourTax2": "",
                  },
                  failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(400)
            })
        })
    })
    describe('Get request Service_Model_ID', function(){
        it('TC10-Positive-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method: "GET",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('engineOil', requestBody.engineOil)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.vehicleModel).to.have.property('id')
                    expect(res.body.response).to.have.property('washLabourAmount', requestBody.washLabourAmount)
                    expect(res.body.response).to.have.property('washLabourAmount2', requestBody.washLabourAmount2)
                    expect(res.body.response).to.have.property('washLabourTax', requestBody.washLabourTax)
                    expect(res.body.response).to.have.property('washLabourTax2', requestBody.washLabourTax2)
            })
        })
        it('TC11-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
            cy.request({
                method: "GET",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id+"1",
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC12-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

        })
        it('TC13-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: "GET",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Put request Service_Model_ID', function(){
        it('TC14-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not || TC14-Positive-Verify the response time for put request is less than 1 sec or not', function(){
            cy.request({
                method: "PUT",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id,
                headers: {
                    "Content-Type": contentType.Content_Type,
                },
                body: {
                    "engineOil": requestBody.engineOilUpdate,
                    "id": requestBody.id,
                    "vehicleModelId": uniqueCode,
                    "washLabourAmount": requestBody.washLabourAmount,
                    "washLabourAmount2": requestBody.washLabourAmount2,
                    "washLabourTax": requestBody.washLabourTax,
                    "washLabourTax2": requestBody.washLabourTax2,
                  }
                }).then(function(res){
                    expect(res.status).to.eq(200)
                    expect(res.duration).to.be.lessThan(1000)
                    id = res.body.response.id
                    expect(res.body.response).to.have.property('engineOil', requestBody.engineOilUpdate)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.vehicleModel).to.have.property('id')
                    expect(res.body.response).to.have.property('washLabourAmount', requestBody.washLabourAmount)
                    expect(res.body.response).to.have.property('washLabourAmount2', requestBody.washLabourAmount2)
                    expect(res.body.response).to.have.property('washLabourTax', requestBody.washLabourTax)
                    expect(res.body.response).to.have.property('washLabourTax2', requestBody.washLabourTax2)
            })
        })
        it('TC15-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){

        })
        it('TC16-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method: "PUT",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id+"1",
                headers: {
                    "Content-Type": contentType.Content_Type,
                },
                body: {
                    "engineOil": requestBody.engineOilUpdate,
                    "id": requestBody.id,
                    "vehicleModelId": uniqueCode,
                    "washLabourAmount": requestBody.washLabourAmount,
                    "washLabourAmount2": requestBody.washLabourAmount2,
                    "washLabourTax": requestBody.washLabourTax,
                    "washLabourTax2": requestBody.washLabourTax2,
                  },
                  failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(403)
            })
        })
        it('TC17-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
            cy.request({
                method: "PUT",
                url: baseUrl+"/api/dms/services/v1/service-model/"+id,
                headers: {
                    "Content-Type": contentType.Content_Type,
                },
                body: {
                    "engineOil": "",
                    "id": "",
                    "vehicleModelId": "",
                    "washLabourAmount": "",
                    "washLabourAmount2": "",
                    "washLabourTax": "",
                    "washLabourTax2": "",
                    },
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(400)
            })
        })
    })
})