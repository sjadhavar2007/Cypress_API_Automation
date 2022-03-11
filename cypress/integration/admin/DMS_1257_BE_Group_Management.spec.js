///<reference types="cypress"/>
import getName from './UtilityUniqueName/getName'
describe('DMS_1257_BE_Group_Management (DMS Group Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var dynamicName;
    var groupId;
    var groupId04;
    before(function(){
        cy.fixture('admin/DMS_1257/url').then(function(data){
            commonUrl=data.URL_DMSGroupController
        })
        cy.fixture('admin/DMS_1257/headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/DMS_1257/body').then(function(data){
            requestBody=data
        })
        const name= new getName()
        dynamicName=name.getName();
    })
    describe('Post Request Dms group', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "name": dynamicName,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                groupId= res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', groupId)
                expect(res.body.response).to.have.property('name', dynamicName)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": "",
                    "description": "",
                    "id": "",
                    "name": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "name": dynamicName+'a',
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                groupId04= res.body.response.id
            })
        })
    })
    describe('Get Request Dms group ID roles', function(){
        it('TC05-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+groupId+'/roles',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC06-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC07-Negative-Verify the response code, if send the request with Invalid Group ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+groupId+'1/roles',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC08-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+groupId+'/roles',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Dms group ID roles', function(){
        it('TC09-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: [
                    0
                ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC11-Negative-Verify the response code, if send the request with invalid Group ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+groupId+'1/roles',
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: [
                    0
                ],
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {}, 
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: [
                    0
                ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Dms group', function(){
        it('TC14-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s'
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('name')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.links[j]).to.have.property('rel')
                            expect(res.body.response.links[j]).to.have.property('href')   
                        }
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC15-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC16-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Dms group ID', function(){
        it('TC17-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s/'+groupId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', groupId)
                expect(res.body.response).to.have.property('name', dynamicName)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC18-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC19-Negative-Verify the response code, if send the request with Invalid Group ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s/'+groupId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url:commonUrl+'s/'+groupId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Dms group ID', function(){
        it('TC21-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'s/'+groupId,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": groupId,
                    "name": dynamicName+'aa',
                  },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', groupId)
                expect(res.body.response).to.have.property('name', dynamicName+'aa')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC22-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC23-Negative-Verify the response code, if send the request with invalid Group ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'s/'+groupId+1,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": groupId,
                    "name": dynamicName+'b',
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC24-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'s/'+groupId,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": "",
                    "description": "",
                    "id": "",
                    "name": "",
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                
            })
        })
        it('TC25-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url:commonUrl+'s/'+groupId04,
                headers: {
                    "Content-Type": headersInfo.Contenttype,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": groupId,
                    "name": dynamicName+'1',
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request Dms group ID', function(){
        it('TC26-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'s/'+groupId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('name', null)
            })
        })
        it('TC27-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC28-Negative-Verify the response code, if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'s/'+groupId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC29-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'s/'+groupId04,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})