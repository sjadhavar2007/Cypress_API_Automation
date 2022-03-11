///<reference types="cypress"/>
import getName from './UtilityUserController/getName'
describe('User Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBodyInfoRole;
    var userId;
    var userId09;
    var name;
    
    before(function(){
        cy.fixture('admin/UserController/UserController_url').then(function(data){
            commonUrl=data.URL_UserController
        })
        cy.fixture('admin/UserController/UserController_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/UserController/UserController_body').then(function(data){
            requestBodyInfo=data
        })
        cy.fixture('admin/UserController/UserController_bodyRoles').then(function(data){
            requestBodyInfoRole=data
        })
        const role= new getName();
        name=role.getName();
    })
    describe('Get Request User Controller', function(){
        it('TC01-Positive-Verify that the response is as per the swager or not', function(){
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
                    expect(res.body.response.content[i]).to.have.property('branchCode')
                    expect(res.body.response.content[i]).to.have.property('dateOfJoining')
                    expect(res.body.response.content[i]).to.have.property('dateOfLeaving')
                    expect(res.body.response.content[i]).to.have.property('email')
                    expect(res.body.response.content[i]).to.have.property('fullName')
                    expect(res.body.response.content[i]).to.have.property('groupCode')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('jobTitle')
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('superior')
                    expect(res.body.response.content[i]).to.have.property('type')
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
        it('TC02-NA-Verify that the response is matching with database or not', function(){
            
        })
        it('TC03-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
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
    describe('Post Request User Controller', function(res){
        it('TC05-Positive-Verify that by sending a valid request its responding with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": name,
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  }
            }).then(function(res){
                expect(res.body.status).to.equal(201)
                userId=res.body.response.id
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('branchCode')
                expect(res.body.response).to.have.property('dateOfJoining')
                expect(res.body.response).to.have.property('dateOfLeaving')
                expect(res.body.response).to.have.property('email')
                expect(res.body.response).to.have.property('fullName')                    
                expect(res.body.response).to.have.property('groupCode')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('jobTitle')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('superior')
                expect(res.body.response).to.have.property('type')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC06-Negative-Verify that if user send "null" as field values in request body then is it responding with valid status code & error message or not', function(){
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
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('name')
            })
        })
        it('TC07-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": "",
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('name')
            })
        })
        it('TC08-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC09-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": name+"aa",
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                userId09=res.body.response.id
                
            })
        })
    })
    describe('Get Request User ID', function(res){
        it('TC10-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('branchCode')
                expect(res.body.response).to.have.property('dateOfJoining')
                expect(res.body.response).to.have.property('dateOfLeaving')
                expect(res.body.response).to.have.property('email')
                expect(res.body.response).to.have.property('fullName')                    
                expect(res.body.response).to.have.property('groupCode')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('jobTitle')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('superior')
                expect(res.body.response).to.have.property('type')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC11-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC12-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC13-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify that the timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request User ID', function(res){
        it('TC15-Positive-Verify the response code for valid User ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+userId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": name+'abc',
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('branchCode')
                expect(res.body.response).to.have.property('dateOfJoining')
                expect(res.body.response).to.have.property('dateOfLeaving')
                expect(res.body.response).to.have.property('email')
                expect(res.body.response).to.have.property('fullName')                    
                expect(res.body.response).to.have.property('groupCode')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('jobTitle')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('superior')
                expect(res.body.response).to.have.property('type')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC16-Negative-Verify that if user insert an invalid User ID & send it with a valid request body then is it showing any error message with proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+userId+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": name+'ab',
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
               
            })
        })
        it('TC17-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+userId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": "",
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('name')
            })
        })
        it('TC18-Negative-Verify that if user send the request with a request body contains "null" as field values then is it throwing proper error message with status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+userId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('name')
            })
        })
        it('TC19-NA-Verify that after sending a valid request with valid User ID, the changes are reflecting in DB for the particular record or not', function(){

        })
        it('TC20-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+userId09,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "branchCode": requestBodyInfo.branchCode,
                    "dateOfJoining": requestBodyInfo.dateOfJoining,
                    "dateOfLeaving": requestBodyInfo.dateOfLeaving,
                    "email": requestBodyInfo.email,
                    "fullName": requestBodyInfo.fullName,
                    "groupCode": requestBodyInfo.groupCode,
                    "id": requestBodyInfo.id,
                    "jobTitle": requestBodyInfo.jobTitle,
                    "name": name+'abb',
                    "password": requestBodyInfo.password,
                    "superiorId": requestBodyInfo.superiorId,
                    "type": requestBodyInfo.type,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request User Roles', function(){
        it('TC26-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'/roles',
            }).then(function(res){
                expect(res.status).to.equal(200)
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
        it('TC28-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'/roles',
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC29-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'1212'+'/roles',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC30-Positive-Verify that the timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'/roles',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request User Roles', function(){
        it('TC31-Positive-Verify the response code for valid User ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/roles',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: requestBodyInfoRole, 
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC32-Negative-Verify that if user insert an invalid User ID & send it with a valid request body then is it showing any error message with proper status code or Not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'1212'+'/roles',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: requestBodyInfoRole,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC33-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/roles',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "orgId": "",
                      "roles": [
                        ""
                      ]
                    }
                  ],
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC34-Negative-Verify that if user send the request with a request body contains "null" as field values then is it throwing proper error message with status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/roles',
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
        it('TC35-NA-Verify that after sending a valid request with valid User ID, the changes are reflecting in DB for the particular record or not', function(){

        })
        it('TC36-Positive-Verify the response code for valid User ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId09+'/roles',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: requestBodyInfoRole, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })

    
    describe('DELETE', function(){
        it('TC21|TC22-Positive-Verify that the response is showing as per the swagger or not | Verify that after sending the valid request its responding with proper status code or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+userId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('branchCode')
                expect(res.body.response).to.have.property('dateOfJoining')
                expect(res.body.response).to.have.property('dateOfLeaving')
                expect(res.body.response).to.have.property('email')
                expect(res.body.response).to.have.property('fullName')                    
                expect(res.body.response).to.have.property('groupCode')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('jobTitle')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('superior')
                expect(res.body.response).to.have.property('type')
            })
        })
        it('TC23-NA-Verify that the deleted record is getting removed from DB or not', function(){

        })
        it('TC24-Negative-Verify that if we send the delete request with same ID twice, then is it showing any error message with proper status code or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+userId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC25-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+userId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})