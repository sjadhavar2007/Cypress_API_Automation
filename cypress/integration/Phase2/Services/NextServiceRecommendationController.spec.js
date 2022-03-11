///<reference types="cypress" />

describe('Next Service Recommendation Controller', function(){
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
        cy.fixture('Phase2/Services/NextServiceRecommendationBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Next-service-recommendation', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/',
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
                        expect(res.body.response.content[i]).to.have.property('dieselServiceDuration')
                        expect(res.body.response.content[i]).to.have.property('dieselServiceInterval')
                        expect(res.body.response.content[i]).to.have.property('displayFlag')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('mileage')
                        expect(res.body.response.content[i]).to.have.property('modelId')
                        expect(res.body.response.content[i]).to.have.property('petrolServiceDuration')
                        expect(res.body.response.content[i]).to.have.property('petrolServiceInterval')
                        expect(res.body.response.content[i]).to.have.property('siCodeList')
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
        it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request for verifying "SI Code" in POST Method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/si-code-recommendation/',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Post Request Next-service-recommendation', function(){
        it('TC05-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/',
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": requestBody.dieselServiceDuration,
                    "dieselServiceInterval": requestBody.dieselServiceInterval,
                    "displayFlag": requestBody.displayFlag,
                    "id": requestBody.id,
                    "mileage": requestBody.mileage,
                    "modelId": requestBody.modelId,
                    "petrolServiceDuration": requestBody.petrolServiceDuration,
                    "petrolServiceInterval": requestBody.petrolServiceInterval,
                    "siCodeListId": [
                      requestBody.siCodeListId
                    ]
                  }                  
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('dieselServiceDuration', requestBody.dieselServiceDuration)
                expect(res.body.response).to.have.property('dieselServiceInterval', requestBody.dieselServiceInterval)
                expect(res.body.response).to.have.property('displayFlag', requestBody.displayFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileage', requestBody.mileage)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('petrolServiceDuration', requestBody.petrolServiceDuration)
                expect(res.body.response).to.have.property('petrolServiceInterval', requestBody.petrolServiceInterval)
                expect(res.body.response.siCodeList[0]).to.have.property('id', requestBody.siCodeListId)
            })
        })
        it('TC06-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC07-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/',
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": "",
                    "dieselServiceInterval": "",
                    "displayFlag": "",
                    "id": "",
                    "mileage": "",
                    "modelId": "",
                    "petrolServiceDuration": "",
                    "petrolServiceInterval": "",
                    "siCodeListId": [
                        ""
                    ]
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC08-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/',
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": requestBody.dieselServiceDuration,
                    "dieselServiceInterval": requestBody.dieselServiceInterval,
                    "displayFlag": requestBody.displayFlag,
                    "id": requestBody.id,
                    "mileage": requestBody.mileage,
                    "modelId": requestBody.modelId,
                    "petrolServiceDuration": requestBody.petrolServiceDuration,
                    "petrolServiceInterval": requestBody.petrolServiceInterval,
                    "siCodeListId": [
                        requestBody.siCodeListId
                    ]
                    },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request Next-service-recommendation ID', function(){
        it('TC09-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('dieselServiceDuration', requestBody.dieselServiceDuration)
                expect(res.body.response).to.have.property('dieselServiceInterval', requestBody.dieselServiceInterval)
                expect(res.body.response).to.have.property('displayFlag', requestBody.displayFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileage', requestBody.mileage)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('petrolServiceDuration', requestBody.petrolServiceDuration)
                expect(res.body.response).to.have.property('petrolServiceInterval', requestBody.petrolServiceInterval)
                expect(res.body.response.siCodeList[0]).to.have.property('id', requestBody.siCodeListId)
            })
        })
        it('TC10-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC11-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC12-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method:'GET',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Put Request Next-service-recommendation ID', function(){
        it('TC13-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id,
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": requestBody.dieselServiceDuration,
                    "dieselServiceInterval": requestBody.dieselServiceInterval,
                    "displayFlag": requestBody.displayFlag,
                    "id": id,
                    "mileage": requestBody.mileage,
                    "modelId": requestBody.modelId,
                    "petrolServiceDuration": requestBody.petrolServiceDuration,
                    "petrolServiceInterval": requestBody.petrolServiceInterval,
                    "siCodeListId": [
                        requestBody.siCodeListId
                    ]
                    },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('dieselServiceDuration', requestBody.dieselServiceDuration)
                expect(res.body.response).to.have.property('dieselServiceInterval', requestBody.dieselServiceInterval)  
                expect(res.body.response).to.have.property('displayFlag', requestBody.displayFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileage', requestBody.mileage)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('petrolServiceDuration', requestBody.petrolServiceDuration)
                expect(res.body.response).to.have.property('petrolServiceInterval', requestBody.petrolServiceInterval)
                expect(res.body.response.siCodeList[0]).to.have.property('id', requestBody.siCodeListId)
            })
        })
        it('TC14-NA-Verify the response is matching with DB or not', function(){
            
        })
        it('TC15-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id+'1',
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": "",
                    "dieselServiceInterval": "",
                    "displayFlag": "",
                    "id": id,
                    "mileage": "",
                    "modelId": "",
                    "petrolServiceDuration": "",
                    "petrolServiceInterval": "",
                    "siCodeListId": [
                        ""
                    ]
                    },
                    failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC16-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id+'1',
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": requestBody.dieselServiceDuration,
                    "dieselServiceInterval": requestBody.dieselServiceInterval,
                    "displayFlag": requestBody.displayFlag,
                    "id": id,
                    "mileage": requestBody.mileage,
                    "modelId": requestBody.modelId,
                    "petrolServiceDuration": requestBody.petrolServiceDuration,
                    "petrolServiceInterval": requestBody.petrolServiceInterval,
                    "siCodeListId": [
                        requestBody.siCodeListId
                    ]
                    },
                    failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC17-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/next-service-recommendation/'+id,
                headers:{
                    "Content-Type":contentType,
                },
                body:{
                    "dieselServiceDuration": requestBody.dieselServiceDuration,
                    "dieselServiceInterval": requestBody.dieselServiceInterval,
                    "displayFlag": requestBody.displayFlag,
                    "id": id,
                    "mileage": requestBody.mileage,
                    "modelId": requestBody.modelId,
                    "petrolServiceDuration": requestBody.petrolServiceDuration,
                    "petrolServiceInterval": requestBody.petrolServiceInterval,
                    "siCodeListId": [
                        requestBody.siCodeListId
                    ]
                    },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
})