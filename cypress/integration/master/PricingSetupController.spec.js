///<reference types="cypress"/>
import getName from './UtilityPricingSetupController/getName'
describe('Pricing Setup Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var nameUnique;
    var id;
    var id08;
    before(function(){
        cy.fixture('master/PricingSetupController/PricingSetup_url').then(function(data){
            commonUrl = data.URL_PricingSetupController
        })
        cy.fixture('master/PricingSetupController/PricingSetup_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/PricingSetupController/PricingSetup_body').then(function(data){
            requestBodyInfo = data
        })
        const code=new getName();
        nameUnique=code.getName();
    })

    describe('Get Request Pricing Setup', function(){
        it('TC01-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('groupName')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('operation')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC03-Negative-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Pricing Setup', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "groupName": requestBodyInfo.groupName,
                    "id": requestBodyInfo.id,
                    "name": nameUnique,
                    "operation": requestBodyInfo.operation,
                },
            }).then(function(res){
                expect(res.status).to.equal(201)
                id=res.body.response.id
                expect(res.body.response).to.have.property('groupName', requestBodyInfo.groupName)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', nameUnique)
                expect(res.body.response).to.have.property('operation', requestBodyInfo.operation)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC06-Negative-Verify that if user send the request with blank field values then showing error', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "groupName": "",
                    "id": "",
                    "name": "",
                    "operation": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Negative-Verify if multiple post request with same name can be run or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "groupName": requestBodyInfo.groupName,
                    "id": requestBodyInfo.id,
                    "name": nameUnique,
                    "operation": requestBodyInfo.operation,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC08-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "groupName": requestBodyInfo.groupName,
                    "id": requestBodyInfo.id,
                    "name": nameUnique+'A',
                    "operation": requestBodyInfo.operation,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id08=res.body.response.id
            })
        })
    })
    describe('Get Request Pricing Setup ID', function(){
        it('TC09-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('groupName', requestBodyInfo.groupName)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', nameUnique)
                expect(res.body.response).to.have.property('operation', requestBodyInfo.operation)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC11-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC12-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Put Request Pricing Setup ID', function(){
       it('TC13-Positive-Verify the Response code for Valid request is 200 and response body as per payload', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "groupName": requestBodyInfo.groupName,
                "id": id,
                "name": nameUnique+'aa',
                "operation": requestBodyInfo.operation,
            },
        }).then(function(res){
            expect(res.status).to.equal(200)
            expect(res.body.response).to.have.property('groupName', requestBodyInfo.groupName)
            expect(res.body.response).to.have.property('id', id)
            expect(res.body.response).to.have.property('name', nameUnique+'aa')
            expect(res.body.response).to.have.property('operation', requestBodyInfo.operation)
            this.links=res.body.response.links
            this.linksLength=this.links.length
            for(let j=0; j<this.linksLength; j++){
                expect(res.body.response.links[j]).to.have.property('rel')
                expect(res.body.response.links[j]).to.have.property('href')   
            }
        })
       })
       it('TC14-NA-Verify that after sending a valid request with valid Pricing Setup ID, the changes are reflecting in DB for the particular record or not', function(){

       })
       it('TC15-Negative-Verify that if user insert an invalid Pricing Setup ID & send it with a valid request body then is it showing any error message with proper status code or Notd', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id+12,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "groupName": requestBodyInfo.groupName,
                "id": id,
                "name": nameUnique+'b',
                "operation": requestBodyInfo.operation,
            },
            failOnStatusCode: false,
        }).then(function(res){
            expect(res.status).to.equal(403)
        })
       })
       it('TC16-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "groupName": "",
                "id": "",
                "name": "",
                "operation":"",
            },
            failOnStatusCode: false,
        }).then(function(res){
            expect(res.status).to.equal(400)
        })
       })
       it('TC17-Positive-Verify that the response time should be less than 1 second or not', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id08,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "groupName": requestBodyInfo.groupName,
                "id": id08,
                "name": nameUnique+'bb',
                "operation": requestBodyInfo.operation,
            },
        }).then(function(res){
            expect(res.duration).to.lessThan(1000)
          
        })
       })
    })
    describe('DELETE Request Pricing Setup', function(){
        it('TC18-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC19-NA-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){

        })
        it('TC20-Negative-Verify that by an invalid ID its throwing any error in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id,
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC21-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})