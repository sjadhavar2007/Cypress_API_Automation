///<reference types="cypress"/>

describe('DMS-1210 BE - Email Template (Email Template Controller)', function(){
    var commonUrl;
    var requestBody;
    var id;
    before(function(){
        cy.fixture('admin/DMS_1210/url').then(function(data){
            commonUrl=data.URL_EmailTemplateController
        })
        cy.fixture('admin/DMS_1210/body').then(function(data){
            requestBody=data
        })
    })
    describe('Post Request Email-Template', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "emailBcc": requestBody.emailBcc,
                    "emailCc": requestBody.emailCc,
                    "emailContent": requestBody.emailContent,
                    "emailSubject": requestBody.emailSubject,
                    "emailTo": requestBody.emailTo,
                    "id": requestBody.id,
                    "name": requestBody.name,
                    "workflow": requestBody.workflow,
                  }, 
            }).then(function(res){
                expect(res.status).to.equal(201)
                id=res.body.response.id
                expect(res.body.response).to.have.property('emailBcc', requestBody.emailBcc)
                expect(res.body.response).to.have.property('emailCc', requestBody.emailCc)
                expect(res.body.response).to.have.property('emailContent', requestBody.emailContent)
                expect(res.body.response).to.have.property('emailSubject', requestBody.emailSubject)
                expect(res.body.response).to.have.property('emailTo', requestBody.emailTo)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response).to.have.property('workflow', requestBody.workflow)
            })
        })
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "emailBcc": requestBody.emailBcc,
                    "emailCc": requestBody.emailCc,
                    "emailContent": requestBody.emailContent,
                    "emailSubject": requestBody.emailSubject,
                    "emailTo": requestBody.emailTo,
                    "id": requestBody.id,
                    "name": requestBody.name,
                    "workflow": requestBody.workflow,
                  }, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id=res.body.response.id
            })
        })
    })
    describe('Get Request Email-Template ID', function(){
        it('TC05-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('emailBcc', requestBody.emailBcc)
                expect(res.body.response).to.have.property('emailCc', requestBody.emailCc)
                expect(res.body.response).to.have.property('emailContent', requestBody.emailContent)
                expect(res.body.response).to.have.property('emailSubject', requestBody.emailSubject)
                expect(res.body.response).to.have.property('emailTo', requestBody.emailTo)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response).to.have.property('workflow', requestBody.workflow)
            })
        })
        it('TC06-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC07-Negative-Verify the response code, if send the request with Invalid Email Template ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC08-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Email-Template ID', function(){
        it('TC09-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "emailBcc": requestBody.emailBcc,
                    "emailCc": requestBody.emailCc,
                    "emailContent": requestBody.emailContent,
                    "emailSubject": requestBody.emailSubject,
                    "emailTo": requestBody.emailTo,
                    "id": id,
                    "name": requestBody.name+'Hasan',
                    "workflow": requestBody.workflow,
                  }, 
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('emailBcc', requestBody.emailBcc)
                expect(res.body.response).to.have.property('emailCc', requestBody.emailCc)
                expect(res.body.response).to.have.property('emailContent', requestBody.emailContent)
                expect(res.body.response).to.have.property('emailSubject', requestBody.emailSubject)
                expect(res.body.response).to.have.property('emailTo', requestBody.emailTo)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('name', requestBody.name+'Hasan')
                expect(res.body.response).to.have.property('workflow', requestBody.workflow)
            })
        })
        it('TC10-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC11-Negative-Verify the response code, if send the request with invalid Email Template ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id+1,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "emailBcc": requestBody.emailBcc,
                    "emailCc": requestBody.emailCc,
                    "emailContent": requestBody.emailContent,
                    "emailSubject": requestBody.emailSubject,
                    "emailTo": requestBody.emailTo,
                    "id": id,
                    "name": requestBody.name+'Hasan',
                    "workflow": requestBody.workflow,
                  },
                  failOnStatusCode: false, 
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    
                },
                failOnStatusCode: false, 
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "emailBcc": requestBody.emailBcc,
                    "emailCc": requestBody.emailCc,
                    "emailContent": requestBody.emailContent,
                    "emailSubject": requestBody.emailSubject,
                    "emailTo": requestBody.emailTo,
                    "id": id,
                    "name": requestBody.name+'Hasan',
                    "workflow": requestBody.workflow,
                  }, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Email-Template', function(){
        it('TC14-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++){
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdById')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('emailBcc')
                    expect(res.body.response.content[i]).to.have.property('emailCc')
                    expect(res.body.response.content[i]).to.have.property('emailContent')
                    expect(res.body.response.content[i]).to.have.property('emailSubject')
                    expect(res.body.response.content[i]).to.have.property('emailTo')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updateById')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('workflow')
                    
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
        it('TC15-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC16-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'s',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})