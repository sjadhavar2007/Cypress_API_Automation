///<reference types="Cypress" />
describe('Child Code Controller', function(){
var baseUrl;
var contentType;
var requestBody;
var id;
var id1;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl= data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data
        })
        cy.fixture('Phase2/Services/ChildCodeControllerBody').then(function(data){
            requestBody= data
        })
    })
    describe('Get request Child_Code', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/child-code/',
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
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('childCode')
                        expect(res.body.response.content[i]).to.have.property('childType')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('franchise')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('jobClass')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('opYear')
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
                url: baseUrl+'/api/dms/services/v1/child-code/',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request for Verifying GET API for "category Type" in Post request', function(){
        it('TC04-Positive-Verify the status code of the GET Request', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": 'SERVICE-CATEGORY'
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
    describe('Post request Child_Code', function(){
        it('TC05-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/child-code/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "categoryId": requestBody.categoryId,
                    "childCode": requestBody.childCode,
                    "childType": requestBody.childType,
                    "description": requestBody.description,
                    "franchiseId": requestBody.franchiseId,
                    "id": requestBody.id,
                    "jobClass": requestBody.jobClass,
                    "opCodeId": requestBody.opCodeId,
                    "opYear": requestBody.opYear,
                  },                  
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response.category).to.have.property('id',requestBody.categoryId)
                expect(res.body.response).to.have.property('childCode',requestBody.childCode)
                expect(res.body.response).to.have.property('childType',requestBody.childType)
                expect(res.body.response).to.have.property('description',requestBody.description)
                expect(res.body.response.franchise).to.have.property('id',requestBody.franchiseId)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('jobClass',requestBody.jobClass)
                expect(res.body.response.opCode).to.have.property('id',requestBody.opCodeId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
            })
        })
        it('TC06-NA-Verify that after the valid body and request is send it is reflected in the DATABASE', function(){

        })
        it('TC07-NA-Verify if the request fields are as per design', function(){

        })
        it('TC08-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/child-code/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "categoryId": requestBody.categoryId,
                    "childCode": requestBody.childCode,
                    "childType": requestBody.childType,
                    "description": requestBody.description,
                    "franchiseId": requestBody.franchiseId,
                    "id": requestBody.id,
                    "jobClass": requestBody.jobClass,
                    "opCodeId": requestBody.opCodeId,
                    "opYear": requestBody.opYear,
                  },                  
            }).then(function(res){
                expect(res.status).to.eq(201)
                id1 = res.body.response.id
            })
        })
    })
    describe('Get request Child_Code_ID', function(){
        it('TC09-Positive-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/child-code/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.category).to.have.property('id',requestBody.categoryId)
                expect(res.body.response).to.have.property('childCode',requestBody.childCode)
                expect(res.body.response).to.have.property('childType',requestBody.childType)
                expect(res.body.response).to.have.property('description',requestBody.description)
                expect(res.body.response.franchise).to.have.property('id',requestBody.franchiseId)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('jobClass',requestBody.jobClass)
                expect(res.body.response.opCode).to.have.property('id',requestBody.opCodeId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
            })
        })
        it('TC10-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/child-code/'+id+1,
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
                url: baseUrl+'/api/dms/services/v1/child-code/'+id1,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put request Child_Code_ID', function(){
        it('TC13-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/child-code/'+id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "categoryId": requestBody.categoryId,
                    "childCode": requestBody.childCode,
                    "childType": requestBody.childType,
                    "description": requestBody.description,
                    "franchiseId": requestBody.franchiseId,
                    "id": id,
                    "jobClass": requestBody.jobClass,
                    "opCodeId": requestBody.opCodeId,
                    "opYear": requestBody.opYear,
                  },                  
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.category).to.have.property('id',requestBody.categoryId)
                expect(res.body.response).to.have.property('childCode',requestBody.childCode)
                expect(res.body.response).to.have.property('childType',requestBody.childType)
                expect(res.body.response).to.have.property('description',requestBody.description)
                expect(res.body.response.franchise).to.have.property('id',requestBody.franchiseId)
                expect(res.body.response).to.have.property('id',id)
                expect(res.body.response).to.have.property('jobClass',requestBody.jobClass)
                expect(res.body.response.opCode).to.have.property('id',requestBody.opCodeId)
                expect(res.body.response).to.have.property('opYear',requestBody.opYear)
            })
        })
        it('TC14-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

        })
        it('TC15-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/child-code/'+id+1,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "categoryId": requestBody.categoryId,
                    "childCode": requestBody.childCode,
                    "childType": requestBody.childType,
                    "description": requestBody.description,
                    "franchiseId": requestBody.franchiseId,
                    "id": id,
                    "jobClass": requestBody.jobClass,
                    "opCodeId": requestBody.opCodeId,
                    "opYear": requestBody.opYear,
                  },          
                  failOnStatusCode: false,        
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC16-Positive-Verify the response time for put request is less than 1 sec or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/child-code/'+id1,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "categoryId": requestBody.categoryId,
                    "childCode": requestBody.childCode,
                    "childType": requestBody.childType,
                    "description": requestBody.description,
                    "franchiseId": requestBody.franchiseId,
                    "id": id1,
                    "jobClass": requestBody.jobClass,
                    "opCodeId": requestBody.opCodeId,
                    "opYear": requestBody.opYear,
                  },                  
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
              
            })
        })
    })
})