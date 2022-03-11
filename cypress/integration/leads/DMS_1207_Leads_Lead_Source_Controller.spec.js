///<reference types="cypress"/>
import getName from './UtilityLeadsController/getName'
describe('DMS-1207_Leads_Lead Source_Controller (Lead Source Controller)', function(){
    var commonUrl;
    var requestBody;
    var dynamicName;
    var sourceId;
    var sourceId07;
    before(function(){
        cy.fixture('leads/DMS_1207/DMS_1207_url').then(function(data){
            commonUrl = data.URL_LeadSourceController
        })
        cy.fixture('leads/DMS_1207/body').then(function(data){
            requestBody = data
        })
        const name= new getName();
        dynamicName= name.getName();
    })
    describe('Get Request Lead Source', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('active')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
                    }
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Lead Source', function(){
        it('TC04-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": requestBody.category,
                    "code": requestBody.code,
                    "name": dynamicName,
                    "active": requestBody.active,
                    "id": requestBody.id
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                sourceId = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('category', requestBody.category)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('name', dynamicName)
                expect(res.body.response).to.have.property('id', sourceId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC06-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": "",
                    "code": "",
                    "name": "",
                    "active": "",
                    "id": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": requestBody.category,
                    "code": requestBody.code,
                    "name": dynamicName+'a',
                    "active": requestBody.active,
                    "id": requestBody.id
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                sourceId07 = res.body.response.id
            })
        })
    })
    describe('Get Request Lead Source Id', function(){
        it('TC08-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('category', requestBody.category)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('name', dynamicName)
                expect(res.body.response).to.have.property('id', sourceId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC09-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC10-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId07+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Lead Source Id', function(){
        it('TC12-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+sourceId,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": requestBody.category,
                    "code": requestBody.code,
                    "name": dynamicName+'AA',
                    "active": requestBody.active,
                    "id": sourceId,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('category', requestBody.category)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('name', dynamicName+'AA')
                expect(res.body.response).to.have.property('id', sourceId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC14-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+sourceId07,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": "",
                    "code": "",
                    "name": "",
                    "active": "",
                    "id": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC15-Negative-Verify the response code, if send the request with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+sourceId07+12,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": requestBody.category,
                    "code": requestBody.code,
                    "name": dynamicName+'abb',
                    "active": requestBody.active,
                    "id": sourceId07,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+ sourceId07,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "category": requestBody.category,
                    "code": requestBody.code,
                    "name": dynamicName+'ab',
                    "active": requestBody.active,
                    "id": sourceId07,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Lead Source Id', function(){
        it('TC17-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('category', null)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('name', null)
                expect(res.body.response).to.have.property('id', null)
            })
        })
        it('TC18-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC19-Negative-Verify the response code, if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})