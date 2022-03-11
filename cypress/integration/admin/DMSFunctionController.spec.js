///<reference types="cypress"/>
import getName from './UtilityDMSFunctionController/getName'
describe('DMS Function Controller', function(){
    var commonUrl;
    var headerInfo;
    var requestBodyInfo;
    var dynamicName;
    var functionId;
    var functionId08;
    before(function(){
        cy.fixture('admin/DMSFunctionController/DMSFunctionController_url').then(function(data){
            commonUrl= data.URL_DMSFunctionController
        })
        cy.fixture('admin/DMSFunctionController/DMSFunctionController_headers').then(function(data){
            headerInfo= data
        })
        cy.fixture('admin/DMSFunctionController/DMSFunctionController_body').then(function(data){
            requestBodyInfo= data
        })

        const name= new getName()
        dynamicName=name.getName();
    })

    describe('Get Request DMS FUNCTION', function(){
        it('TC01-Positive-Verify that the response status code  & body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsfunction/'
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
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
                    //expect(res.body.response.content[i]).to.have.property('module')
                    expect(res.body.response.content[i]).to.have.property('moduleId')
                    expect(res.body.response.content[i]).to.have.property('name')
                    
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
        it('TC02-NA-Verify that the response is matching with DB or not', function(){
            
        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsfunction/'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request DMS FUNCTION', function(){
        it('TC04-Positive-Verify that the response status code  & body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsfunction/',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "moduleId": requestBodyInfo.moduleId,
                    "name": dynamicName
                }
            }).then(function(res){
                expect(res.body.status).to.equal(201)
                functionId= res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', functionId)
               // expect(res.body.response).to.have.property('module')
                expect(res.body.response).to.have.property('moduleId', requestBodyInfo.moduleId)
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
                url: commonUrl+'dmsfunction/',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": "",
                    "description": "",
                    "id": "",
                    "moduleId": "",
                    "name": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Negative-Verify that two record using same request can be created or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsfunction/',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "moduleId": requestBodyInfo.moduleId,
                    "name": dynamicName
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('name')
                
            })
        })
        it('TC08-Positive-Verify the Response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsfunction/',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.active,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "moduleId": requestBodyInfo.moduleId,
                    "name": dynamicName+'a'
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                functionId08= res.body.response.id
            })
        })
    })
    describe('Get Request DMS FUNCTION ID', function(){
        it('TC09-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsfunction/'+functionId,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', functionId)
               // expect(res.body.response).to.have.property('module')
                expect(res.body.response).to.have.property('moduleId', requestBodyInfo.moduleId)
                expect(res.body.response).to.have.property('name', dynamicName)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-NA-Verify that the response is matching with DB or not', function(){
            
        })
        it('TC11-Negative-Verify the status code if user send the request with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsfunction/'+functionId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsfunction/'+functionId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request DMS FUNCTION ID', function(){
        it('TC13-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'dmsfunction/'+functionId,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "moduleId": requestBodyInfo.moduleIdUpdate,
                    "name": dynamicName+'AA'
                }
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('description', requestBodyInfo.descriptionUpdate)
                expect(res.body.response).to.have.property('id', functionId)
              //  expect(res.body.response).to.have.property('module')
                expect(res.body.response).to.have.property('moduleId', requestBodyInfo.moduleIdUpdate)
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
        it('TC15-Negative-Verify the status code if user send request with invalid DMS FUNCTION ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'dmsfunction/'+functionId+'11',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "moduleId": requestBodyInfo.moduleIdUpdate,
                    "name": dynamicName+'Aaa'
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsfunction/'+functionId,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": "",
                    "description": "",
                    "id": "",
                    "moduleId": "",
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
                url: commonUrl+'dmsfunction/'+functionId08,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                }, 
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "moduleId": requestBodyInfo.moduleIdUpdate,
                    "name": dynamicName+'AAA'
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request DMS FUNCTION', function(){
        it('TC18-Positive-Verify that the response status code  & body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'dmsfunction/'+functionId,
                
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('module',null)
                expect(res.body.response).to.have.property('moduleId', null)
                expect(res.body.response).to.have.property('name', null)
            })
        })
        it('TC19-Positive-Verify the status code if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'dmsfunction/'+functionId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-NA-Verify that the record is getting removed from the DB or not', function(){

        })
        it('TC21-Positive-Verify the Response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'dmsfunction/'+functionId08, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})