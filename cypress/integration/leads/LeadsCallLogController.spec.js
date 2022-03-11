///<reference types="cypress"/>
describe('Leads Call Log Controller', function(){

    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var leadsId;
    var requestBody;
    var leadCallLogId;
    var leadCallLogId10;
    before(function(){
        cy.fixture('leads/LeadsCallLogController/Url').then(function(data){
            commonUrl=data.URL_LeadsCallLogController
        })
        cy.fixture('leads/LeadsCallLogController/headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('leads/LeadsAppointmentController/LeadsBody').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/LeadsCallLogController/Body').then(function(data){
            requestBody = data
        })
    })
    describe('create leads ', function(){
        it('TCXX-Generate Lead Id', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": requestBodyInfo.active,
                    "cashBuyer": requestBodyInfo.cashBuyer,
                    "closedAs": requestBodyInfo.closedAs,
                    "customerName": requestBodyInfo.customerName,
                    "customerType": requestBodyInfo.customerType,
                    "dateOfBirth": requestBodyInfo.dateOfBirth,
                    "email": requestBodyInfo.email,
                    "exteriorColor": requestBodyInfo.exteriorColor,
                    "gender": requestBodyInfo.gender,
                    "householdIncome": requestBodyInfo.householdIncome,
                    "id": requestBodyInfo.id,
                    "identificationNumber": requestBodyInfo.identificationNumber,
                    "identificationType": requestBodyInfo.identificationType,
                    "leadType": requestBodyInfo.leadType,
                    "location": requestBodyInfo.location,
                    "lostReason": requestBodyInfo.lostReason,
                    "occupation": requestBodyInfo.occupation,
                    "orderType": requestBodyInfo.orderType,
                    "owner": requestBodyInfo.owner,
                    "phoneNumber": requestBodyInfo.phoneNumber,
                    "prospectCategory": requestBodyInfo.prospectCategory,
                    "prospectCreatedOn": requestBodyInfo.prospectCreatedOn,
                    "prospectId": requestBodyInfo.prospectId,
                    "prospectStatus": requestBodyInfo.prospectStatus,
                    "publicRelations": requestBodyInfo.publicRelations,
                    "purchaseType": requestBodyInfo.purchaseType,
                    "race": requestBodyInfo.race,
                    "rcoGenerated": requestBodyInfo.rcoGenerated,
                    "sellingRegion": requestBodyInfo.sellingRegion,
                    "source": requestBodyInfo.source,
                    "status": requestBodyInfo.status,
                    "subSource": requestBodyInfo.subSource,
                    "title": requestBodyInfo.title,
                    "tradeIn": requestBodyInfo.tradeIn,
                    "variantId": requestBodyInfo.variantId,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                leadsId=res.body.response.id

            })
        })
    })
    
    describe('Get Request Lead Call log', function(){
        it('TC01-Positive-Verify the status code and Parameters if given proper ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/call-log',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-Negative-Verify the Status code and Response Body for Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'1/call-log',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC03-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC04-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/call-log',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Lead Call log', function(){
        it('TC05-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/call-log',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCall,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": requestBody.id,
                    "notes": requestBody.notes,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                leadCallLogId=res.body.response.id
                expect(res.body.response).to.have.property('purposeOfCall', requestBody.purposeOfCall)
                expect(res.body.response).to.have.property('callTime', requestBody.callTime)
                expect(res.body.response).to.have.property('durationInSec', requestBody.durationInSec)
                expect(res.body.response).to.have.property('id', leadCallLogId)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('leadId', leadsId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC06-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC07-Negative-Verify the response code for invalid Lead ID or blank Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'1/call-log',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCall,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": requestBody.id,
                    "notes": requestBody.notes,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-Negetive-Verify the response if user send the request with violated field type', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/call-log',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCall,
                    "callTime": "@121",
                    "durationInSec": requestBody.durationInSec,
                    "id": requestBody.id,
                    "notes": requestBody.notes,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-Negetive-Verify the response code if send the request with blank request fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/call-log',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": "",
                    "callTime": "",
                    "durationInSec": "",
                    "id": "",
                    "notes": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC10-Positive-Verify the Response time of POST request', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/call-log',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "purposeOfCall": requestBody.purposeOfCall,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": requestBody.id,
                    "notes": requestBody.notes,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                leadCallLogId10=res.body.response.id
            })
        })
    })
    describe('Get Lead Call log ID', function(){
        it('TC11-Positive-Verify the status code and Parameters if given proper ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('purposeOfCall', requestBody.purposeOfCall)
                expect(res.body.response).to.have.property('callTime', requestBody.callTime)
                expect(res.body.response).to.have.property('durationInSec', requestBody.durationInSec)
                expect(res.body.response).to.have.property('id', leadCallLogId)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('leadId', leadsId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC12-Negative-Verify the response if user given an invalid ID ', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC13-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC14-Positive-Verify that the Response time for GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Lead Call log ID', function(){
        it('TC15-Positive-Verify the response code and body if a valid request is sent', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCallUpdate,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": leadCallLogId,
                    "notes": requestBody.notesUpdate,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('purposeOfCall', requestBody.purposeOfCallUpdate)
                expect(res.body.response).to.have.property('callTime', requestBody.callTime)
                expect(res.body.response).to.have.property('durationInSec', requestBody.durationInSec)
                expect(res.body.response).to.have.property('id', leadCallLogId)
                expect(res.body.response).to.have.property('notes', requestBody.notesUpdate)
                expect(res.body.response).to.have.property('leadId', leadsId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC16-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC17-Negative-Verify the response if user send a Valid request body with an invalid ID ', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId+1,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCallUpdate,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": leadCallLogId,
                    "notes": requestBody.notesUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC18-Negative-Verify that if user send the put request, with a request body where field validations are violated, then is it throwing any error message with proper response code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCallUpdate,
                    "callTime": "@anc",
                    "durationInSec": requestBody.durationInSec,
                    "id": leadCallLogId,
                    "notes": requestBody.notesUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC19-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId+1,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": "",
                    "callTime": "",
                    "durationInSec": "",
                    "id": "",
                    "notes": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC20-Positive-Verify the response time for PUT request', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId10,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "purposeOfCall": requestBody.purposeOfCallUpdate,
                    "callTime": requestBody.callTime,
                    "durationInSec": requestBody.durationInSec,
                    "id": leadCallLogId,
                    "notes": requestBody.notesUpdate,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Lead Call log ID', function(){
        it('TC21-Positive-Verify the response code is showing as 200 ok and parameters are coming as per swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('purposeOfCall', null)
                expect(res.body.response).to.have.property('callTime', null)
                expect(res.body.response).to.have.property('durationInSec', 0)
                expect(res.body.response).to.have.property('id', 0)
                expect(res.body.response).to.have.property('notes', null)
                expect(res.body.response).to.have.property('leadId', 0)
            })
        })
        it('TC22-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){

        })
        it('TC23-Positive-Verify the response for invalid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Positive-Verify the response time for DELETE request', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/call-log/'+leadCallLogId10,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Leads', function(){
        it('TC25-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/call-log',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('callTime')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('durationInSec')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('leadId')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('notes')
                        expect(res.body.response.content[i]).to.have.property('purposeOfCall')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC26-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC27-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/call-log',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete leads ID', function(){
        it('TCXX-delete leads id ', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})