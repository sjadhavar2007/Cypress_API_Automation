///<reference types="cypress"/>
import getName from './UtilityUniqueName/getName'
describe('DMS-1258 BE - Roles & changes across modules (User Controller [userGroups-GET & POST])', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var userId;
    var dynamicUsername;
    before(function(){
        cy.fixture('admin/DMS_1258/url').then(function(data){
            commonUrl= data.URL_UserController
        })
        cy.fixture('admin/DMS_1258/headers').then(function(data){
            headersInfo= data
        })
        cy.fixture('admin/DMS_1258/body').then(function(data){
            requestBody= data
        })
        const name= new getName()
        dynamicUsername=name.getName();
    })
    describe('create user Id', function(){
        it('TCXX-Positive-', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "contact": requestBody.contact,
                    "dateOfJoining": requestBody.dateOfJoining,
                    "dateOfLeaving": requestBody.dateOfLeaving,
                    "email": requestBody.email,
                    "fullName": requestBody.fullName,
                    "id": requestBody.id,
                    "jobTitle": requestBody.jobTitle,
                    "password": requestBody.password,
                    "preferedLanguage": requestBody.preferedLanguage,
                    "type": requestBody.type,
                    "userName": dynamicUsername,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                userId=res.body.response.id
            })
        })
    })
    describe('Get User ID group', function(){
        it('TC01-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'/groups'
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
        it('TC02-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC03-Negative-Verify the response code, if send the request with Invalid User ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'1/groups',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+userId+'/groups'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post User ID group', function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "groupId": [
                        requestBody.groupId,
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ],
            }).then(function(res){
                expect(res.status).to.equal(201)
                expect(res.body.response.content[0].groupId[0]).to.not.equal(null)
                expect(res.body.response.content[0]).to.have.property('orgId', requestBody.orgId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC06-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC07-Negative-Verify the response code, if send the request with invalid User ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'1/groups',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "groupId": [
                        requestBody.groupId,
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {},
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-NA-Verify if the fields of the request is as per design or not', function(){

        })
        it('TC10-Positive-Verify the response duration is approximately 1.5 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "groupId": [
                        requestBody.groupId,
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ],
            }).then(function(res){
                expect(res.duration).to.lessThan(1500)
            })
        })
    })
})