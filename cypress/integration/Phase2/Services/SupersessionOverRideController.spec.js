///<reference types="Cypress" />

describe('Supersession Over Ride Controller', function(){
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
            cy.fixture('Phase2/Services/SupersessionOverRideControllerBody').then(function(data){
                requestBody = data
            })
        })
        describe('Get request Supersession_Override', function(){
            it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
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
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('newPart')
                        expect(res.body.response.content[i]).to.have.property('newPartFranchise')
                        expect(res.body.response.content[i]).to.have.property('oldPart')
                        expect(res.body.response.content[i]).to.have.property('oldPartFranchise')
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
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
        describe('Post request Supersession_Override', function(){
            it('TC04-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": requestBody.id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.status).to.eq(201)
                    id = res.body.response.id
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.newPartFranchise).to.have.property('id',requestBody.newPartFranchiseId)
                    expect(res.body.response.newPart).to.have.property('id',requestBody.newPartId)
                    expect(res.body.response.oldPartFranchise).to.have.property('id',requestBody.oldPartFranchiseId)
                    expect(res.body.response.oldPart).to.have.property('id',requestBody.oldPartId)

                })
            })
            it('TC05-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

            })
            it('TC06-NA-Verify if the request fields are as per design', function(){

            })
            it('TC07-Positive-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id":"",
                        "newPartFranchiseId": "",
                        "newPartId": "",
                        "oldPartFranchiseId":"",
                        "oldPartId": "",
                    },
                    failOnStatusCode:false,
                }).then(function(res){
                    expect(res.status).to.eq(400)
                })
            })
            it('TC08-Positive-Verify the response time of the POST request', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": requestBody.id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
            it('TC09-Positive-Verify when sending the request the "created By" parameters are showing proper username and ID as per given Authorization', function(){
                cy.request({
                    method:'POST',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/',
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": requestBody.id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.body.response).to.have.property('createdBy','cccccch@12345')
                    expect(res.body.response).to.have.property('createdById',1)
                })
            })
        })
        describe('Get request Supersession_Override_ID', function(){
            it('TC10-Positive-Verify the status code for response body is 200 and response data is as per request body', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                }).then(function(res){
                    expect(res.status).to.eq(200)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.newPartFranchise).to.have.property('id',requestBody.newPartFranchiseId)
                    expect(res.body.response.newPart).to.have.property('id',requestBody.newPartId)
                    expect(res.body.response.oldPartFranchise).to.have.property('id',requestBody.oldPartFranchiseId)
                    expect(res.body.response.oldPart).to.have.property('id',requestBody.oldPartId)
                })
            })
            it('TC11-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id+'1',
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(403)
                })
            })
            it('TC12-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

            })
            it('TC13-Positive-Verify the response time of the GET request', function(){
                cy.request({
                    method:'GET',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
        })
        describe('Put request Supersession_Override_ID', function(){
            it('TC14-Positive-Verify the status code for response body is 200 and response data is as per request body', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.status).to.eq(200)
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.newPartFranchise).to.have.property('id',requestBody.newPartFranchiseId)
                    expect(res.body.response.newPart).to.have.property('id',requestBody.newPartId)
                    expect(res.body.response.oldPartFranchise).to.have.property('id',requestBody.oldPartFranchiseId)
                    expect(res.body.response.oldPart).to.have.property('id',requestBody.oldPartId)
                })
            })
            it('TC15-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

            })
            it('TC16-Negative-Verify the status code is 403 if the request is send with an invalid ID', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id+'1',
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    },
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(403)
                })
            })
            it('TC17-Negative-Verify if the request is send with blank Mandatory Fields "" the response body shows proper validation error not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": "",
                        "newPartFranchiseId": "",
                        "newPartId": "",
                        "oldPartFranchiseId": "",
                        "oldPartId": "",
                    },
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.eq(400)
                })
            })
            it('TC18-Positive-Verify the response time for put request is less than 1 sec or not', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(1000)
                })
            })
            it('TC19-Positive-Verify when sending the request the "created By" parameters are showing proper username and ID as per given Authorization', function(){
                cy.request({
                    method:'PUT',
                    url:baseUrl+'/api/dms/services/v1/SupersessionOverRide/'+id,
                    headers:{
                        'Content-Type':contentType
                    },
                    body:{
                        "id": requestBody.id,
                        "newPartFranchiseId": requestBody.newPartFranchiseId,
                        "newPartId": requestBody.newPartId,
                        "oldPartFranchiseId": requestBody.oldPartFranchiseId,
                        "oldPartId": requestBody.oldPartId,
                    }
                }).then(function(res){
                    expect(res.body.response).to.have.property('createdBy','cccccch@12345')
                    expect(res.body.response).to.have.property('createdById',1)
                })
            })
        })
    })