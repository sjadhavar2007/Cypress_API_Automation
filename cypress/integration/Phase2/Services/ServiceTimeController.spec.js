///<reference types="Cypress" />

describe('Service Time Controller', function(){
    var baseUrl;
    var contentType;
    var requestBody;
    var id;
    var serviceTime;
        before(function(){
            cy.fixture('Phase2/commonUrl').then(function(data){
                baseUrl = data.commonUrl
            })
            cy.fixture('Phase2/heraders').then(function(data){
                contentType= data.Content_Type
            })
            cy.fixture('Phase2/Services/ServiceTimeController').then(function(data){
                requestBody = data
            })
        })
        describe('Get request Service_Time', function(){
            it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/',
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
                        expect(res.body.response.content[i]).to.have.property('headCount')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('model')
                        expect(res.body.response.content[i]).to.have.property('opCode')
                        expect(res.body.response.content[i]).to.have.property('opFran')
                        expect(res.body.response.content[i]).to.have.property('serviceTime')
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
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/',
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
        describe('Get request for Verifying GET API for "Model ID" in Post request', function(){
            it('TC04-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/service-model/',
                }).then(function(res){
                    expect(res.status).to.eq(200)
                })
            })
        })
        describe('Get request for Verifying GET API for "Op Code ID" in Post request', function(){
            it('TC05-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/op-code',
                }).then(function(res){
                    expect(res.status).to.eq(200)
                })
            })
        })
        describe('Get request for Verifying GET API for "Op Code ID" in Post request', function(){
            it('TC06-Positive-Verify the status code of the GET Request & check if the Response is as per DB or not', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/master/v1/master-data',
                    qs: {
                        "category": "OP_FRAN"
                    },
                }).then(function(res){
                    expect(res.status).to.eq(200)
                })
            })
        })
        describe('Post request Service_Time', function(){
            it('TC07-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": requestBody.id,
                        "modelId": requestBody.modelId,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        }
                    }).then(function(res){
                        expect(res.status).to.eq(201)
                        id = res.body.response.id
                        expect(res.body.response).to.have.property('headCount', requestBody.headCount)
                        expect(res.body.response).to.have.property('id', id)
                        expect(res.body.response.model).to.have.property('id', requestBody.modelId)
                        expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                        expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                        serviceTime= res.body.response.serviceTime
                        expect(res.body.response).to.have.property('serviceTime', serviceTime)

                })
            })
            it('TC08-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

            })
            it('TC09-NA-Verify if the request fields are as per design', function(){

            })
            it('TC10-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": "",
                        "id": "",
                        "modelId": "",
                        "opCodeId": "",
                        "opFranId": "",
                        "serviceTime": "",
                        },
                        failOnStatusCode:false,
                    }).then(function(res){
                        expect(res.status).to.eq(400)
                })
            })
            it('TC11-Positive-Verify if the response time is less than 1 sec or not', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": requestBody.id,
                        "modelId": requestBody.modelId,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        }
                    }).then(function(res){
                        expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
        describe('Get request Service_Time_ID', function(){
            it('TC12-Positive-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                }).then(function(res){
                    expect(res.status).to.eq(200)
                    expect(res.body.response).to.have.property('headCount', requestBody.headCount)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.model).to.have.property('id', requestBody.modelId)
                    expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                    expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                    expect(res.body.response).to.have.property('serviceTime', serviceTime)
                })
            })
            it('TC13-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id+'1',
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(403)
                })
            })
            it('TC14-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

            })
            it('TC15-Positive-Verify the response time of the GET request', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
        describe('Put request Service_Time_ID', function(){
            it('TC16-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": id,
                        "modelId": requestBody.modelId,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        }
                    }).then(function(res){
                        expect(res.status).to.eq(200)
                        expect(res.body.response).to.have.property('headCount', requestBody.headCount)
                        expect(res.body.response).to.have.property('id', id)
                        expect(res.body.response.model).to.have.property('id', requestBody.modelId)
                        expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                        expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                        expect(res.body.response).to.have.property('serviceTime', serviceTime)
                })
            })
            it('TC17-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){

            })
            it('TC18-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id+'1',
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": id,
                        "modelId": requestBody.modelId,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        },
                        failOnStatusCode:false,
                    }).then(function(res){
                        expect(res.status).to.eq(403)
                })
            })
            it('TC19-NA-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": "",
                        "id": "",
                        "modelId": "",
                        "opCodeId": "",
                        "opFranId": "",
                        "serviceTime": "",
                        },
                        failOnStatusCode:false,
                    }).then(function(res){
                        expect(res.status).to.eq(400)
                })
            })
            it('TC20-Positive-Verify when changing the model ID parameter in the request body from 3 to 2 to update with a valid ID, the response shows proper status code or not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": id,
                        "modelId": 2,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        }
                    }).then(function(res){
                        expect(res.status).to.eq(200)
                        
                })
            })
            it('TC21-Positive-Verify the response time for put request is less than 1 sec or not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/ServiceTime/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body: {
                        "headCount": requestBody.headCount,
                        "id": id,
                        "modelId": requestBody.modelId,
                        "opCodeId": requestBody.opCodeId,
                        "opFranId": requestBody.opFranId,
                        "serviceTime": requestBody.serviceTime,
                        }
                    }).then(function(res){
                        expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
    })