///<reference types="cypress"/>
import getName from './UtilityDMSModuleController/getName'
describe('DMS Module Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var dynamicName;
    var moduleId;
    var moduleId08;
    before(function(){
        cy.fixture('admin/DMSModuleController/DMSModuleController_url').then(function(data){
            commonUrl=data.URL_DMSModuleController
        })
        cy.fixture('admin/DMSModuleController/headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/DMSModuleController/body').then(function(data){
            requestBodyInfo=data
        })
        const name= new getName()
        dynamicName=name.getName();
    })
    describe('Get Request DMS Module Controller', function(){
        it('TC01-Positive-Validate that all the response code & response body parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('name')
                }}
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
        it('TC02-Positive-Verify that the response is matching with DB or not', function(){

        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request DMS Module Controller', function(){
        it('TC04-Positive-Verify that the response status & code is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "name": dynamicName,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                moduleId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', moduleId)
                expect(res.body.response).to.have.property('name', dynamicName)
                this.links=res.body.response.links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.links[j]).to.have.property('rel')
                        expect(res.body.response.links[j]).to.have.property('href')   
                    }
            })
        })
        it('TC05-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC06-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
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
        it('TC07-negative-Verify that two record using same request can be created or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "name": dynamicName,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC08-Positive-Verify the Response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "name": dynamicName+'a',
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                moduleId08=res.body.response.id
               
            })
        })
    })
    describe('Get Request DMS Module Controller', function(){
        it('TC09-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+moduleId,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', moduleId)
                expect(res.body.response).to.have.property('name', dynamicName)
                this.links=res.body.response.links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.links[j]).to.have.property('rel')
                        expect(res.body.response.links[j]).to.have.property('href')   
                    }
            })
        })
        it('TC10-Positive-Verify that the response is matching with DB or not', function(){

        })
        it('TC11-Negative-Verify the status code if user send the request with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+moduleId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+moduleId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request DMS Module Controller ID', function(){
        it('TC13-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+moduleId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "name": dynamicName+'AA',
                  }
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('description', requestBodyInfo.descriptionUpdate)
                expect(res.body.response).to.have.property('id', moduleId)
                expect(res.body.response).to.have.property('name', dynamicName+'AA')
                this.links=res.body.response.links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.links[j]).to.have.property('rel')
                        expect(res.body.response.links[j]).to.have.property('href')   
                    }
            })
        })
        it('TC14-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC15-Negative-Verify the status code if user send request with invalid DMS Module Controller ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+moduleId+'11',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "name": dynamicName+'AAk',
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+moduleId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
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
        it('TC17-Positive-Verify the response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+moduleId08,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "name": dynamicName+'A4',
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})