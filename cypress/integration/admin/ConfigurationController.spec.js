///<reference types="cypress"/>

describe('Configuration Controller', function(){
    var commonUrl;
    var headerInfo;
    var requestBodyInfo;
    var configId;
    var configId07;
    before(function(){
        cy.fixture('admin/ConfigurationController/ConfigurationController_url').then(function(data){
            commonUrl=data.URL_ConfigurationController_uat
        })
        cy.fixture('admin/ConfigurationController/ConfigurationController_headers').then(function(data){
            headerInfo=data
        })
        cy.fixture('admin/ConfigurationController/ConfigurationController_body').then(function(data){
            requestBodyInfo=data
        })
    })
    describe('Get Request Configuration', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('encrypted')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('value')
                    expect(res.body.response.content[i]).to.have.property('name')
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Configuration', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": requestBodyInfo.encrypted,
                    "name": requestBodyInfo.name,
                    "value": requestBodyInfo.value,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                configId=res.body.response.id
                expect(res.body.response).to.have.property('encrypted', true)
                expect(res.body.response).to.have.property('id', configId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                expect(res.body.response).to.have.property('value', requestBodyInfo.value)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC06-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": "",
                    "name": "",
                    "value": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
               
            })
        })
        it('TC07-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": requestBodyInfo.encrypted,
                    "name": requestBodyInfo.name,
                    "value": requestBodyInfo.value,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                configId07=res.body.response.id
            })
        })
    })
    describe('Get Request Configuration_ID', function(){
        it('TC08-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+configId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('encrypted', true)
                    expect(res.body.response).to.have.property('id', configId)
                    expect(res.body.response).to.have.property('value', requestBodyInfo.value)
                    expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                    this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC09-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+configId+'12',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC10-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC11-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+configId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Configuration_ID', function(){
        it('TC12-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+configId,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": requestBodyInfo.encryptedUpdate,
                    "name": requestBodyInfo.nameUpdate,
                    "value": requestBodyInfo.valueUpdate,
                  },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('encrypted',true)
                expect(res.body.response).to.have.property('id', configId)
                expect(res.body.response).to.have.property('value', requestBodyInfo.valueUpdate)
                expect(res.body.response).to.have.property('name', requestBodyInfo.nameUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC14-Negative-Verify that response code and response data is as per the Request body for Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+configId+'1',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": requestBodyInfo.encryptedUpdate,
                    "name": requestBodyInfo.nameUpdate,
                    "value": requestBodyInfo.valueUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC15-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+configId,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": "",
                    "name": "",
                    "value": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC16-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+configId07,
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {
                    "encrypted": requestBodyInfo.encryptedUpdate,
                    "name": requestBodyInfo.nameUpdate,
                    "value": requestBodyInfo.valueUpdate,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                expect(res.body.response).to.have.property('encrypted',true)
                expect(res.body.response).to.have.property('id', configId07)
                expect(res.body.response).to.have.property('value', requestBodyInfo.valueUpdate)
                expect(res.body.response).to.have.property('name', requestBodyInfo.nameUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
    })
    describe('Post Request Config Options', function(){
        it('TC24-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POSt',
                url: commonUrl+'/'+configId+'/config-options',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: [
                    requestBodyInfo.configOptionsValue
                ],
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++)
                    {
                   expect(res.body.response.content[i]).to.have.property('configId', configId)
                   expect(res.body.response.content[i]).to.have.property('id')
                   expect(res.body.response.content[i]).to.have.property('optionValue', requestBodyInfo.configOptionsValue)
                        this.contentLinks=res.body.response.content[i].links
                        this.contentLinksLength=this.contentLinks.length
                        for(let j=0; j<this.contentLinksLength; j++)
                            {
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
            })
        })
        it('TC25-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC26-Negative-Verify if user send the request body with blank body then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POSt',
                url: commonUrl+'/'+configId+'/config-options',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC27-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POSt',
                url: commonUrl+'/'+configId07+'/config-options',
                headers: {
                    "Content-Type": headerInfo.ContentType,
                },
                body: [
                    requestBodyInfo.configOptionsValue
                ],
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Get Request Config Options', function(){
        it('TC21-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+configId+'/config-options'
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++)
                    {
                   expect(res.body.response.content[i]).to.have.property('configId', configId)
                   expect(res.body.response.content[i]).to.have.property('id')
                   expect(res.body.response.content[i]).to.have.property('optionValue', requestBodyInfo.configOptionsValue)
                        this.contentLinks=res.body.response.content[i].links
                        this.contentLinksLength=this.contentLinks.length
                        for(let j=0; j<this.contentLinksLength; j++)
                            {
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
            })
        })
        it('TC22-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC23-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+configId07+'/config-options'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request Configuration ID', function(){
        it('TC17-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+configId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('encrypted',false)
                    expect(res.body.response).to.have.property('id', null)
                    expect(res.body.response).to.have.property('value', null)
                    expect(res.body.response).to.have.property('name', null)
            })
        })
        it('TC18-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){

        })
        it('TC19-Negative-Verify that If user sends request with invalid ID Response code shows 403 or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+configId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+configId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })

})