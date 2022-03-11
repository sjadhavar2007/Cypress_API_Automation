///<reference types="cypress"/>
import getCode from './UtilityMasterController/getCode'
describe('Master Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var masterId;
    var masterId11;
    var changableCode;
    before(function(){
        cy.fixture('master/MasterController/Master_url').then(function(data){
            commonUrl=data.URL_MasterController
        })
        cy.fixture('master/MasterController/Master_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('master/MasterController/master_body').then(function(data){
            requestBodyInfo=data
        })
        const code=new getCode();
        changableCode=code.getCode();
    })
    describe('Get Request Master Data', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('category')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('links')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-NA-Verify that Total Element count is Same as DB and Redis', function(){

        })
        it('TC04-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Master Data', function(){
        it('TC05-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "category": requestBodyInfo.category,
                    "code": changableCode,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                  }                  
            }).then(function(res){
                expect(res.status).to.equal(201)
                masterId=res.body.response.id
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('category', requestBodyInfo.category)
                expect(res.body.response).to.have.property('code', changableCode)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', masterId)                
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC06-NA-Verify by sending the post request with valid & proper Request body, its get inserted & reflected in the Database or not', function(){

        })
        it('TC07-NA-Verify that aftersending a valid request rows in DB & Redis are increased', function(){

        })
        it('TC08-Negative-Verify that if we send the Post request without any request body then is it responding with status code 400 Bad request or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {

                  },
                  failOnStatusCode: false,                  
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC09-Negative-Verify that post request can be sent multiple times with same payload or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "category": requestBodyInfo.category,
                    "code": changableCode,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                  },
                  failOnStatusCode: false,                  
            }).then(function(res){
                expect(res.status).to.equal(422)
                expect(res.body).to.have.property('message', 'Error in validating the fields')
                expect(res.body.response).to.have.property('code','Duplicate Code')
            })
        })
        it('TC10-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": true,
                    "category": "",
                    "code": "",
                    "description": "",
                    "id": 0
                  },
                  failOnStatusCode: false,                  
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC11-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "category": requestBodyInfo.category,
                    "code": changableCode+'aa',
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                  }                  
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                masterId11=res.body.response.id
            })
        })
    })
    describe('Get Request Master Data Categories', function(){
        it('TC12-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'-categories',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=1; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.not.equal(null)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify that the response data is matching with DATABASE entry  or not', function(){
           
        })
        it('TC14-NA-Verify that aftersending a valid request rows in DB & Redis are same', function(){

        })
        it('TC15-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'-categories',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Master Data Id', function(){
        it('TC16-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not if sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+masterId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('category', requestBodyInfo.category)
                expect(res.body.response).to.have.property('code', changableCode)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', masterId)              
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC17-Negative-Verify the Status Code and Response Parameters are as per the Swagger or not if sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+masterId+'12',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403) 
                expect(res.body).to.have.property('message', 'Master does not exist')
                expect(res.body.response).to.equal(null) 
            })
        })
        it('TC18-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC19-NA-Verify that aftersending a valid request rows in DB & Redis are same', function(){
            
        })
        it('TC20-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+masterId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Master Data Id', function(){
        it('TC21-Positive-Verify the Response code for Valid request is 200 and response body as per payload', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+masterId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "category": requestBodyInfo.categoryUpdate,
                    "code": changableCode+'1212',
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                  }, 
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('category', requestBodyInfo.categoryUpdate)
                expect(res.body.response).to.have.property('code', changableCode+'1212')
                expect(res.body.response).to.have.property('description',requestBodyInfo.descriptionUpdate)
                expect(res.body.response).to.have.property('id', masterId)                
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC22-NA-verify that valid request is reflected in DB', function(){
          
        })
        it('TC23-NA-Verify that aftersending a valid request rows in DB & Redis are same', function(){

        })
        it('TC24-Negative-Verify that the if user send a Valid request body with an invalid Id then its showing the response with 403 status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+masterId+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "category": requestBodyInfo.categoryUpdate,
                    "code": changableCode+'00',
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": requestBodyInfo.idUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message','Master does not exist')
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC25-Negative-Verify that if user send the put request, with a request body where field values are blank or "null" then is It showing any error message with status code in response or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+masterId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": "",
                    "category": "",
                    "code": "",
                    "description": "",
                    "id": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC26-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+masterId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "category": requestBodyInfo.category,
                    "code": changableCode+'1414',
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                  }, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Master Data Id', function(){
        it('TC27-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+masterId,  
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('category', null)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('id', null)
            })
        })
        it('TC28-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){
            
        })
        it('TC29-NA-Verify that aftersending a valid request rows in DB & Redis are decreased', function(){

        })
        it('TC30-Negative-Verify that if user send the DELETE request for an Invalid  Master Data Id, then is it responding with a Proper response code or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+masterId,
                failOnStatusCode: false,  
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message','Master does not exist')
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC31-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+masterId11,  
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})