///<reference types="cypress"/>
import getName from './UtilityPricingSetupController/getName'
describe('DMS-1201_Setup_Pricing (Pricing Setup Controller)', function(){
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
                    expect(res.body.response.content[i]).to.have.property('componentId')
                    expect(res.body.response.content[i]).to.have.property('componentName')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('name')
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
        it('TC3-NA-Verify the response parameters are matching with Approved design or not', function(){

        })
        it('TC04-Negative-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Pricing Setup', function(){
        it('TC05-Positive-Verify the response status & body is showing as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "id": requestBodyInfo.id,
                    "name": nameUnique,
                    "componentId": requestBodyInfo.componentId,
                },
            }).then(function(res){
                expect(res.status).to.equal(201)
                id=res.body.response.id
            //    expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', nameUnique)
                expect(res.body.response).to.have.property('componentId', requestBodyInfo.componentId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC06-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC07-Negative-Verify the response & Request body keys are matching with UI fields or not', function(){
        
        })
        it('TC08-Negative-Verify the status code, if try to send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "id": "",
                    "name": "",
                    "componentId": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })    
        it('TC09-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "id": requestBodyInfo.id,
                    "name": nameUnique+'A',
                    "componentId": requestBodyInfo.componentId,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id08=res.body.response.id
            })
        })
    })
    describe('Get Request Pricing Setup ID', function(){
        it('TC10-Positive-Verify the status code & response body is showing as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', nameUnique)
                expect(res.body.response).to.have.property('componentId', requestBodyInfo.componentId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC11-NA-Verify the response is get match with DB or not', function(){

        })
        it('TC12-NA-Verify the response is matching with Approved UI or not', function(){

        })
        it('TC13-Negative-Verify the status code if send the request with invalid pricing setup ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC14-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Pricing Setup ID', function(){
       it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "id": id,
                "name": nameUnique+'aa',
                "componentId": requestBodyInfo.componentId,
            },
        }).then(function(res){
            expect(res.status).to.equal(200)
            expect(res.body.response).to.have.property('id', id)
            expect(res.body.response).to.have.property('name', nameUnique+'aa')
            expect(res.body.response).to.have.property('componentId', requestBodyInfo.componentId)
            this.links=res.body.response.links
            this.linksLength=this.links.length
            for(let j=0; j<this.linksLength; j++){
                expect(res.body.response.links[j]).to.have.property('rel')
                expect(res.body.response.links[j]).to.have.property('href')   
            }
        })
       })
       it('TC16-NA-Verify the response is matching with DB or not', function(){

       })
       it('TC17-NA-Verify the response is matching with Approved UI or not', function(){

        })
       it('TC18-Negative-Verify the status code, if try to send the request with blank fields', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                
                "id": "",
                "name": "",
                "componentId":"",
            },
            failOnStatusCode: false,
        }).then(function(res){
            expect(res.status).to.equal(400)
        })
       })
       it('TC19-Negative-Verify the status code if user send the request with an invalid pricing setup ID', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id+12,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
               
                "id": id,
                "name": nameUnique+'b',
                "componentId": requestBodyInfo.componentId,
            },
            failOnStatusCode: false,
        }).then(function(res){
            expect(res.status).to.equal(403)
        })
       })
       it('TC20-Positive-Verify that the response time should be less than 1 second or not', function(){
        cy.request({
            method: 'PUT',
            url: commonUrl+'/'+id08,
            headers: {
                "Content-Type": headersInfo.ContentType,
            },
            body: {
                "id": id08,
                "name": nameUnique+'bb',
                "componentId": requestBodyInfo.componentId,
            },
        }).then(function(res){
            expect(res.duration).to.lessThan(1000)
          
        })
       })
    })
    describe('DELETE Request Pricing Setup', function(){
        it('TC21-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC22-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC23-Negative-Verify the status code if send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id,
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})