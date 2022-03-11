///<reference types="cypress"/>

describe('DMS-1292 BE - Rule Assignment (Lead Rule Controller)', function(){
    var commonUrl;
    var requestBody;
    var ruleId;
    var ruleId08;
    before(function(){
        cy.fixture('master/DMS_1292/Url').then(function(data){
            commonUrl= data.URL_LeadRuleController
        })
        cy.fixture('master/DMS_1292/body').then(function(data){
            requestBody= data
        })
    })
    describe('Get Request Lead_Rule', function(){
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
                } else{
                   for(let i=0; i<this.contentLength; i++){
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('attribute')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdById')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('order')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updateById')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    this.userIds=res.body.response.content[i].userIds
                    this.userIdsLength=this.userIds.length
                    for(let k=0; k<this.userIdsLength; k++){
                        expect(res.body.response.content[i].userIds[k]).to.not.equal(null)
                    }
                    expect(res.body.response.content[i]).to.have.property('value')
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
        it('TC03-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Lead_Rule', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": requestBody.attribute,
                    "id": requestBody.id,
                    "order": requestBody.order,
                    "userIds": [
                      requestBody.userIds
                    ],
                    "value": requestBody.value,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                ruleId=res.body.response.id
                expect(res.body.response).to.have.property('attribute', requestBody.attribute)
                expect(res.body.response).to.have.property('id', ruleId)
                expect(res.body.response).to.have.property('order', requestBody.order)
                expect(res.body.response).to.have.property('value', requestBody.value)
                this.userIds=res.body.response.userIds
                this.userIdsLength=this.userIds.length
                for(let k=0; k<this.userIdsLength; k++){
                    expect(res.body.response.userIds[k]).to.not.equal(null)
                }
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
        it('TC06-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": "",
                    "id": "",
                    "order": "",
                    "userIds": [
                      ""
                    ],
                    "value": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-NA-Verify if Request fields are as per design', function(){

        })
        it('TC08-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": requestBody.attribute,
                    "id": requestBody.id,
                    "order": requestBody.order,
                    "userIds": [
                      requestBody.userIds
                    ],
                    "value": requestBody.value,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                ruleId08=res.body.response.id
            })
        })
    })
    describe('Get Request Lead_Rule_ID', function(){
        it('TC09-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ruleId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('attribute', requestBody.attribute)
                expect(res.body.response).to.have.property('id', ruleId)
                expect(res.body.response).to.have.property('order', requestBody.order)
                expect(res.body.response).to.have.property('value', requestBody.value)
                this.userIds=res.body.response.userIds
                this.userIdsLength=this.userIds.length
                for(let k=0; k<this.userIdsLength; k++){
                    expect(res.body.response.userIds[k]).to.not.equal(null)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ruleId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC12-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ruleId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Lead_Rule ID', function(){
        it('TC13-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url:  commonUrl+'/'+ruleId,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": requestBody.attribute,
                    "id": ruleId,
                    "order": requestBody.order,
                    "userIds": [
                      requestBody.userIds
                    ],
                    "value": requestBody.value,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('attribute', requestBody.attribute)
                expect(res.body.response).to.have.property('id', ruleId)
                expect(res.body.response).to.have.property('order', requestBody.order)
                expect(res.body.response).to.have.property('value', requestBody.value)
                this.userIds=res.body.response.userIds
                this.userIdsLength=this.userIds.length
                for(let k=0; k<this.userIdsLength; k++){
                    expect(res.body.response.userIds[k]).to.not.equal(null)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC14-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC15-Negative-Verify that response code is 403ok and response data is as per the Request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url:  commonUrl+'/'+ruleId+1,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": requestBody.attribute,
                    "id": ruleId,
                    "order": requestBody.order,
                    "userIds": [
                      requestBody.userIds
                    ],
                    "value": requestBody.value,
                  }, failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url:  commonUrl+'/'+ruleId,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": "",
                    "id": "",
                    "order": "",
                    "userIds": [
                      ""
                    ],
                    "value": "",
                  }, failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC17-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url:  commonUrl+'/'+ruleId08,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    
                    "attribute": requestBody.attribute,
                    "id": ruleId,
                    "order": requestBody.order,
                    "userIds": [
                      requestBody.userIds
                    ],
                    "value": requestBody.value,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
        })
        })
    })
    describe.skip('Delete Request Lead_Rule ID', function(){
        it('TC18-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ruleId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('attribute', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('order', null)
                expect(res.body.response).to.have.property('value', null)
            })
        })
        
        it('TC19-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){

        })
        it('TC20-Negative-Verify that If user sends request with invalid ID Response code shows 403 or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ruleId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })   
        it('TC21-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ruleId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})