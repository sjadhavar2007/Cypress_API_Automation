///<reference types="cypress"/>
import getName from './UtilityUniqueName/getName'
describe('DMS_886_BE_Roles_Maintenance_Amendment(Role Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var dynamicName;
    var roleId;
    var roleId09;
    before(function(){
        cy.fixture('admin/DMS_886/DMS_886_Url').then(function(data){
            commonUrl=data.URL_DMS_886
        })
        cy.fixture('admin/DMS_886/RoleController_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/DMS_886/Body').then(function(data){
            requestBody=data
        })
        const name= new getName()
        dynamicName=name.getName();
    })
    describe('Get Request Role', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('accessControls')
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let k=0; k<this.linksLength; k++){
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-Positive-Verify the Response time of GET request ', function(){
            cy.request({
                method: 'GET',
                url: commonUrl
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Role', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName,
                    "description": requestBody.description,
                    "id": requestBody.id
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                roleId= res.body.response.id
                expect(res.body.response.accessControls[0]).to.have.property('id', requestBody.accessControls)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', dynamicName)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', roleId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC06-Negative-Verify that if multiple request can be sent with same body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName,
                    "description": requestBody.description,
                    "id": requestBody.id
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC07-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      ""
                    ],
                    "active": "",
                    "code": "",
                    "description": "",
                    "id": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-NA-Verify if Request fields are as per design', function(){

        })
        it('TC09-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName+'a',
                    "description": requestBody.description,
                    "id": requestBody.id
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                roleId09= res.body.response.id
            })
        })
    })
    describe('Get Request Role_ID', function(){
        it('TC10-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response.accessControls[0]).to.have.property('id', requestBody.accessControls)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', dynamicName)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', roleId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC11-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC13-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Role ID', function(){
        it('TC14-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName+'V',
                    "description": requestBody.description,
                    "id": roleId
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('accessControls')
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', dynamicName+'V')
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', roleId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC15-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC16-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId09+12,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName+'VV',
                    "description": requestBody.description,
                    "id": roleId,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC17-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId09,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                     ""
                    ],
                    "active": "",
                    "code":"",
                    "description": "",
                    "id": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC18-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+roleId09,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "accessControls": [
                      requestBody.accessControls
                    ],
                    "active": requestBody.active,
                    "code": dynamicName+'w',
                    "description": requestBody.description,
                    "id": roleId
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Role_Access', function(){
        it('TC19-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'/access-controls',
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
                        for(let k=0; k<this.linksLength; k++){
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
        it('TC20-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC21-Negative-Verify the response if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId+'12/access-controls',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC22-Negative-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+roleId09+'/access-controls',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Role_Access', function(){
        it('TC23-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType
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
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('name')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let k=0; k<this.linksLength; k++){
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
        it('TC24-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC25-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC26-NA-Verify if Request fields are as per design', function(){

        })
        it('TC27-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+roleId+'/access-controls',
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: [
                    1
                ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})