///<reference types="cypress"/>
import getName from './UtilityRoleController/getName'
describe('Role Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var roleId;
    var roleId08;
    var name;
    before(function(){
        cy.fixture('admin/RoleController/RoleController_url').then(function(data){
            commonUrl=data.URL_RoleController
        })
        cy.fixture('admin/RoleController/RoleController_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/RoleController/RoleController_body').then(function(data){
            requestBodyInfo=data
        })
        const role= new getName();
        name=role.getName();

    })
    describe('Get Request Role Controller', function(){
        it('TC01-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC02-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('autoAssign')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('group')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('model')
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('publicAssign')
                    
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let k=0; k<this.linksLength; k++)
                    {
                        expect(res.body.response.content[i].links[k]).to.have.property('rel')
                        expect(res.body.response.content[i].links[k]).to.have.property('href')
                    }
            }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC03-NA-Verify that the response is matching with database or not', function(){
            
        })
        it('TC04-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Roles', function(res){
        it('TC05-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": name,
                    "publicAssign": requestBodyInfo.publicAssign,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                roleId=res.body.response.id
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('autoAssign')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('group')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('model')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('publicAssign')
            })
        })
        it('TC06-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
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
               
            })
        })
        it('TC07-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC08-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": name+"A",
                    "publicAssign": requestBodyInfo.publicAssign,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                roleId08=res.body.response.id
                
            })
        })
    })
    describe('Get Request Roles ID', function(){
        it('TC09-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC10-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('autoAssign')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('group')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('model')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('publicAssign')
            })
        })
        it('TC11-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC12-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        it('TC13-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'121',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
    })
    describe('Put Request Role ID', function(){
        it('TC14-Positive-Verify the response code for valid Role ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": name+"Aa",
                    "publicAssign": requestBodyInfo.publicAssign,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('autoAssign')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('group')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('model')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('publicAssign')
            })
        })
        it('TC15-Negative-Verify that if user insert an invalid Role ID & send it with a valid request body then is it showing any error message with proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": name+"Aaa",
                    "publicAssign": requestBodyInfo.publicAssign,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": "",
                    "publicAssign": requestBodyInfo.publicAssign,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
               
            })
        })
        it('TC17-NA-Verify that after sending a valid request with valid Role ID, the changes are reflecting in DB for the particular record or not', function(){

        })
        it('TC18-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "autoAssign": requestBodyInfo.autoAssign,
                    "description": requestBodyInfo.description,
                    "group": requestBodyInfo.group,
                    "id": requestBodyInfo.id,
                    "model": requestBodyInfo.model,
                    "name": name+"bb",
                    "publicAssign": requestBodyInfo.publicAssign,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Get Request Role ID Access control', function(){
        it('TC25-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'/access-controls',
            }).then(function(res){
                expect(res.status).to.equal(200)

            })
        })
        it('TC26-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'/access-controls',
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message')
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)                    
                } else {
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC27-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC28-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'/access-controls',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)

            })
        })
        it('TC29-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'1212'+'/access-controls',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
    })
    describe('Post Request Roles ID Access controls', function(){
        it('TC30-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    1
                ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)                    
                } else {
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })  
        })
        it('TC31-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {

                },
                failOnStatusCode:false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })  
        })
        it('TC32-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC33-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId08+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    1
                ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })  
        })
        it('TC34-Positive-Verify That can multiple access control record be created for a particular Role ID or Not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    1
                ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)                    
                } else {
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })  
        })
        it('TC35-Negative-Verify that the if user send a valid request with invalid Role ID then is it showing any error message or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'1212'+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    1
                ],
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
               
            })  
        })

    })
    describe('Delete request Role ID', function(){
        it('TC19-Positive-Verify that the response code for a suucessful positive request is 200 ok or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+roleId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC20-NA-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){

        })
        it('TC21-Negative-Verify that by sending the request for same ID for multiple time, its throwing any error in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+roleId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC22-Negative-Verify that if user try to send a valid request for a invalid Role ID, then is it showing any proper error message with status code in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+roleId+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC23-NA-Verify that the parameter is showing as swagger or not', function(){

        })
        it('TC24-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+roleId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })  
    })
})