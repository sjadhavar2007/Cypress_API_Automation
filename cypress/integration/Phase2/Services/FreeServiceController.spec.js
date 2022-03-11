///<reference types="Cypress" />

describe('Free Service Controller', function() {
var baseUrl;
var headers;
var requestBody;
var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            headers = data
        })
        cy.fixture('Phase2/Services/FreeServiceControllerBody').then(function(data){
            requestBody = data
        })
    })

    describe('Get request Free_Service', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/free-service/',
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
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('endDate')
                        expect(res.body.response.content[i]).to.have.property('expiryDays')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('modelId')
                        expect(res.body.response.content[i]).to.have.property('noOfEntitlement')
                        expect(res.body.response.content[i]).to.have.property('opCodeList')
                        expect(res.body.response.content[i]).to.have.property('startDate')
                        expect(res.body.response.content[i]).to.have.property('status')
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
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/free-service/',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request for Verifying GET API  "Service Model" for Brand Field present in URS :-', function(){
        it('TC04-Positive-Verify the status code of the GET Request & Verify the DB as per the Response', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/service-model/',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Post request Free_Service', function(){
        it('TC05-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/free-service/',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "description": requestBody.description,
                    "endDate": requestBody.endDate,
                    "expiryDays": requestBody.expiryDays,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "noOfEntitlement": requestBody.noOfEntitlement,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "startDate": requestBody.startDate,
                    "status": requestBody.status,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('endDate', requestBody.endDate)
                expect(res.body.response).to.have.property('expiryDays', requestBody.expiryDays)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('noOfEntitlement', requestBody.noOfEntitlement)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeListId)
                expect(res.body.response).to.have.property('startDate', requestBody.startDate)
                expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC06-NA-Verify that after the valid body and request is send it is reflected in the DATABASE', function(){
                
        })
        it('TC07-NA-Verify if the request fields are as per design', function(){

        })
        it('TC08-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/free-service/',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "description": requestBody.description,
                    "endDate": requestBody.endDate,
                    "expiryDays": requestBody.expiryDays,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "noOfEntitlement": requestBody.noOfEntitlement,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "startDate": requestBody.startDate,
                    "status": requestBody.status,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request Free_Service_ID', function(){
        it('TC09-Positive-Verify the status code of the GET Request & Verify the DB as per the Response', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('endDate', requestBody.endDate)
                expect(res.body.response).to.have.property('expiryDays', requestBody.expiryDays)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('noOfEntitlement', requestBody.noOfEntitlement)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeListId)
                expect(res.body.response).to.have.property('startDate', requestBody.startDate)
                expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC10-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC11-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

        })
        it('TC12-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put request Free_Service_ID', function(){
        it('TC13-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id,
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "description": requestBody.description,
                    "endDate": requestBody.endDate,
                    "expiryDays": requestBody.expiryDays,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "noOfEntitlement": requestBody.noOfEntitlement,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "startDate": requestBody.startDate,
                    "status": requestBody.statusUpdate,
                  },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('endDate', requestBody.endDate)
                expect(res.body.response).to.have.property('expiryDays', requestBody.expiryDays)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('noOfEntitlement', requestBody.noOfEntitlement)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeListId)
                expect(res.body.response).to.have.property('startDate', requestBody.startDate)
                expect(res.body.response).to.have.property('status', requestBody.statusUpdate)
            })
        })
        it('TC14-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){
                
        })
        it('TC15-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id+'1',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "description": requestBody.description,
                    "endDate": requestBody.endDate,
                    "expiryDays": requestBody.expiryDays,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "noOfEntitlement": requestBody.noOfEntitlement,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "startDate": requestBody.startDate,
                    "status": requestBody.statusUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/free-service/'+id,
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "description": requestBody.description,
                    "endDate": requestBody.endDate,
                    "expiryDays": requestBody.expiryDays,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "noOfEntitlement": requestBody.noOfEntitlement,
                    "opCodeListId": [
                      requestBody.opCodeListId
                    ],
                    "startDate": requestBody.startDate,
                    "status": requestBody.status,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})