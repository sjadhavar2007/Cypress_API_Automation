///<reference types="cypress" />

describe('Op Code Accessory Controller', function(){
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
        cy.fixture('Phase2/Services/OpCodeAccessoryController').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Op Code_Accessory', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/',
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
                        expect(res.body.response.content[i]).to.have.property('accessory')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('jobType')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('model')
                        expect(res.body.response.content[i]).to.have.property('opCode')
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/',
            }).then(function(res){
                expect(res.duration).to.lessThan(2000)
            })
        })
    })
    describe('Get Request for verifying "Model code" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/service-model/',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('engineOil')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('vehicleModel')
                        expect(res.body.response.content[i]).to.have.property('washLabourAmount')
                        expect(res.body.response.content[i]).to.have.property('washLabourAmount2')
                        expect(res.body.response.content[i]).to.have.property('washLabourTax')
                        expect(res.body.response.content[i]).to.have.property('washLabourTax2')
                    }
                }
            })
        })
        it('TC05-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Get Request for verifying "Accessory" in POST method', function(){
        it('TC06-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "ACCESSORY",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'ACCESSORY')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC07-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Get Request for verifying "Job Type" in POST method', function(){
        it('TC08-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "JOB-TYPE",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'JOB-TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC09-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Get Request for verifying "Op Fran" in POST method', function(){
        it('TC10-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "FRANCHISE",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        this.franchise = res.body.response.content[i].category
                        expect(res.body.response.content[i]).to.have.property('category', this.franchise)
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC11-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Post Request Op Code_Accessory', function(){
        it('TC12-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/op-code-accessory/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "accessoryId": requestBody.accessoryId,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "modelId": [
                    requestBody.modelId
                    ],
                    "opCodeId": [
                    requestBody.opCodeId
                    ],
                    "opFranId": requestBody.opFranId,
                    "status": requestBody.status,
                    }
                }).then(function(res){
                    expect(res.status).to.equal(201)
                    id = res.body.response.id
                    expect(res.body.response.accessory).to.have.property('id', requestBody.accessoryId)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                    expect(res.body.response.model[0]).to.have.property('id', requestBody.modelId)
                    expect(res.body.response.opCode[0]).to.have.property('id', requestBody.opCodeId)
                    expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                    expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC13-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC14-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC15-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/op-code-accessory/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "accessoryId": "",
                    "id": "",
                    "jobTypeId": "",
                    "modelId": [
                    ""
                    ],
                    "opCodeId": [
                    ""
                    ],
                    "opFranId": "",
                    "status": "",
                    },
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.equal(400)
            })
        })
        it('TC16-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/op-code-accessory/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "accessoryId": requestBody.accessoryId,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "modelId": [
                    requestBody.modelId
                    ],
                    "opCodeId": [
                    requestBody.opCodeId
                    ],
                    "opFranId": requestBody.opFranId,
                    "status": requestBody.status,
                    }
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request Op Code_Accessory_ID', function(){
        it('TC17-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.accessory).to.have.property('id', requestBody.accessoryId)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response.model[0]).to.have.property('id', requestBody.modelId)
                expect(res.body.response.opCode[0]).to.have.property('id', requestBody.opCodeId)
                expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC18-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC19-Negative-Verify the response code, if send the request with Invalid Op Code_Accessory_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put Request Op Code_Accessory_ID', function(){
        it('TC21-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "accessoryId": requestBody.accessoryId,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "modelId": [
                    requestBody.modelId
                    ],
                    "opCodeId": [
                    requestBody.opCodeId
                    ],
                    "opFranId": requestBody.opFranId,
                    "status": requestBody.status,
                    },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.accessory).to.have.property('id', requestBody.accessoryId)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                    expect(res.body.response.model[0]).to.have.property('id', requestBody.modelId)
                    expect(res.body.response.opCode[0]).to.have.property('id', requestBody.opCodeId)
                    expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                    expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC22-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC23-Negative-Verify the response code, if send the request with invalid Op Code_Accessory_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "accessoryId": requestBody.accessoryId,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "modelId": [
                    requestBody.modelId
                    ],
                    "opCodeId": [
                    requestBody.opCodeId
                    ],
                    "opFranId": requestBody.opFranId,
                    "status": requestBody.status,
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC24-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "accessoryId": "",
                    "id": "",
                    "jobTypeId": "",
                    "modelId": [
                    ""
                    ],
                    "opCodeId": [
                    ""
                    ],
                    "opFranId": "",
                    "status": "",
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC25-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/op-code-accessory/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "accessoryId": requestBody.accessoryId,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "modelId": [
                    requestBody.modelId
                    ],
                    "opCodeId": [
                    requestBody.opCodeId
                    ],
                    "opFranId": requestBody.opFranId,
                    "status": requestBody.status,
                    }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})