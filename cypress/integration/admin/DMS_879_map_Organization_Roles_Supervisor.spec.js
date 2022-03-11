///<reference types="cypress"/>
import getName from './UtilityUniqueName/getName'
describe('DMS-879 map Organization, Roles & Supervisor', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var dynamicName;
    var groupId;
    var userId;
    var requestBodyInfo;
    before(function(){
        cy.fixture('admin/DMS_879/DMS_879_Url').then(function(data){
            commonUrl=data.Basic_URL
        })
        cy.fixture('admin/DMS_879/DMS_879_Url').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/DMS_879/DMS_879_body').then(function(data){
            requestBody=data
        })
        cy.fixture('admin/OrganisationStructure/OrganisationStructure_body').then(function(data){
            requestBodyInfo=data
        })
        const name= new getName()
        dynamicName=name.getName();
    })

    describe('Create Group Id', function(){
        it('TC00-Positive-Create Group Id', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsgroup/group',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "name": dynamicName,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                groupId= res.body.response.id
            })
        })
    })
    describe('Get Request Dms group ID roles', function(){
        it('TC11-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsgroup/group/'+groupId+'/roles',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC12-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Group ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsgroup/group/'+groupId+'1/roles',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'dmsgroup/group/'+groupId+'/roles',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Post Request Dms group ID roles', function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsgroup/group/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    requestBody.orgId,
                  ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                       // expect(res.body.response.content[i].accessControls.length).to.equal(0)
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let k=0; k<this.linksLength; k++)
                    {
                        expect(res.body.response.content[i].links[k]).to.have.property('rel')
                        expect(res.body.response.content[i].links[k]).to.have.property('href')
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
        it('TC16-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with invalid Group ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsgroup/group/'+groupId+'1/roles',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    requestBody.orgId,
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC18-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsgroup/group/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: {

                },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC19-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'dmsgroup/group/'+groupId+'/roles',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    requestBody.orgId,
                  ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    
    describe('Create User Id', function(){
        it('TC00-Positive-Create User Id', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'v1/users',
                headers: {
                    "Content-Type": headersInfo.contentType,
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
                    "userName": dynamicName,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                userId= res.body.response.id
            })
        })
    })
    describe('Get Request Dms group ID roles', function(){
        it('TC01-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'v1/users/'+userId+'/groups',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    console.log(this.contentLength)
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
                url: commonUrl+'v1/users/'+userId+'1/groups',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'v1/users/'+userId+'/groups',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Post User ID group', function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'v1/users/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    {
                      "groupId": [
                        groupId
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    expect(res.body.response.content[0].groupId[0]).to.equal(groupId)
                    expect(res.body.response.content[0].orgId).to.equal(requestBody.orgId)
                }
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
        it('TC07-Negative-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'v1/users/'+userId+'1/groups',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    {
                      "groupId": [
                        groupId
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC07-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'v1/users/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body:{},
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-NA-Verify if the fields of the request is as per design or not', function(){

        })
        it('TC10-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'v1/users/'+userId+'/groups',
                headers: {
                    "Content-Type": headersInfo.contentType,
                },
                body: [
                    {
                      "groupId": [
                        groupId
                      ],
                      "orgId": requestBody.orgId,
                    }
                  ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})