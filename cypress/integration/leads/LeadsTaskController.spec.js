///<reference types="cypress"/>

describe('DMS-941-Leads Task Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBody;
    var leadsId;
    var leadTaskId;
    var leadTaskId07;
    before(function(){
        cy.fixture('leads/LeadsTaskController/LeadsTask_url').then(function(data){
            commonUrl = data.URL_LeadsTaskController
        })
        cy.fixture('leads/LeadsTaskController/LeadsTask_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadsAppointmentController/LeadsBody').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/LeadsTaskController/LeadsTask_body').then(function(data){
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
    describe('Get Request Leads Task', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/task'
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
        it('TC02-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC03-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/task'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Leads Task', function(){
        it('TC04-Positive-Verify the response status CODE is 201 or not and Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/task',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": requestBody.subject,
                    "endDateTime": requestBody.endDateTime,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "status": requestBody.status,
                },
            }).then(function(res){
                expect(res.status).to.equal(201)
                leadTaskId=res.body.response.id
                expect(res.body.response).to.have.property('subject', requestBody.subject)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTime)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTime)
                expect(res.body.response).to.have.property('status', requestBody.status)
                expect(res.body.response).to.have.property('id', leadTaskId)
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
        it('TC05-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC06-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/task',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": "",
                    "endDateTime": "",
                    "notes": "",
                    "startDateTime": "",
                    "status": ""
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/task',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": requestBody.subject,
                    "endDateTime": requestBody.endDateTime,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "status": requestBody.status,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                leadTaskId07=res.body.response.id
            })
        })
    })
    describe('Get Request Leads Task ID', function(){
        it('TC08-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('subject', requestBody.subject)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTime)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTime)
                expect(res.body.response).to.have.property('status', requestBody.status)
                expect(res.body.response).to.have.property('id', leadTaskId)
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
        it('TC09-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC10-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId07+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Leads Task ID', function(){
        it('TC12-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": requestBody.subjectUpdate,
                    "endDateTime": requestBody.endDateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "startDateTime": requestBody.startDateTimeUpdate,
                    "status": requestBody.statusUpdate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('subject', requestBody.subjectUpdate)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTimeUpdate)
                expect(res.body.response).to.have.property('notes', requestBody.notesUpdate)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTimeUpdate)
                expect(res.body.response).to.have.property('status', requestBody.statusUpdate)
                expect(res.body.response).to.have.property('id', leadTaskId)
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
        it('TC13-NA-Verify that valid request is reflected in DB', function(){

        })
        it('TC14-Negative-Verify that if user send the put request, with a request body where field values are blank or "null" then is It showing any error message with status code in response or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": "",
                    "endDateTime": "",
                    "notes": "",
                    "startDateTime": "",
                    "status": ""
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC15-Negative-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId+1,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": requestBody.subjectUpdate,
                    "endDateTime": requestBody.endDateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "startDateTime": requestBody.startDateTimeUpdate,
                    "status": requestBody.statusUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId07,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "subject": requestBody.subjectUpdate,
                    "endDateTime": requestBody.endDateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "startDateTime": requestBody.startDateTimeUpdate,
                    "status": requestBody.statusUpdate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })

    })
    describe('Delete Request Leads Task ID', function(){
        it('TC17-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC18-NA-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){

        })
        it('TC19-Negative-Verify that if user send the DELETE request for an Invalid Id, then is it responding with a Proper response code or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/task/'+leadTaskId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Leads', function(){
        it('TC21-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/tasks',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('endDateTime')
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
                        expect(res.body.response.content[i]).to.have.property('startDateTime')
                        expect(res.body.response.content[i]).to.have.property('status')
                        expect(res.body.response.content[i]).to.have.property('subject')
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
        it('TC22-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC23-NN-Verify that if invalid prameters are passed then it is showing error or not', function(){

        })
        it('TC24-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/tasks',
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