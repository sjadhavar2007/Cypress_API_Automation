///<reference types="cypress"/>

describe('Leads Test Drive Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBodyInfoLeadsTestDrive
    var leadsId;
    var testDriveId;
    var testDriveId09;
    before(function(){
        cy.fixture('leads/LeadsTestDriveController/Url').then(function(data){
            commonUrl = data.URL_LeadsTestDriveController
        })
        cy.fixture('leads/LeadsTestDriveController/headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadsAppointmentController/LeadsBody').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/LeadsTestDriveController/Body').then(function(data){
            requestBodyInfoLeadsTestDrive = data
        })
    })
    describe('POST Request leads ', function(){
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
    describe('Get Request leads Test Drive', function(){
        it('TC01-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives'
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
        it('TC02-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC03-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'11/test-drives',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Post Request Leads Test Drive', function(){
        it('TC05-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlots,
                    "date": requestBodyInfoLeadsTestDrive.date,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTime,
                    "id": requestBodyInfoLeadsTestDrive.id,
                    "model": requestBodyInfoLeadsTestDrive.model,
                    "name": requestBodyInfoLeadsTestDrive.name,
                    "notes": requestBodyInfoLeadsTestDrive.notes,
                    "variant": requestBodyInfoLeadsTestDrive.variant,
                },
            }).then(function(res){
                expect(res.status).to.equal(201)
                testDriveId=res.body.response.id
                expect(res.body.response).to.have.property('availableSlots', requestBodyInfoLeadsTestDrive.availableSlots)
                expect(res.body.response).to.have.property('date', requestBodyInfoLeadsTestDrive.date)
                expect(res.body.response).to.have.property('dateTime', requestBodyInfoLeadsTestDrive.dateTime)
                expect(res.body.response).to.have.property('id', testDriveId)
                expect(res.body.response).to.have.property('model', requestBodyInfoLeadsTestDrive.model)
                expect(res.body.response).to.have.property('name', requestBodyInfoLeadsTestDrive.name)
                expect(res.body.response).to.have.property('notes', requestBodyInfoLeadsTestDrive.notes)
                expect(res.body.response).to.have.property('variant', requestBodyInfoLeadsTestDrive.variant)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC06-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC07-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'12/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlots,
                    "date": requestBodyInfoLeadsTestDrive.date,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTime,
                    "id": requestBodyInfoLeadsTestDrive.id,
                    "model": requestBodyInfoLeadsTestDrive.model,
                    "name": requestBodyInfoLeadsTestDrive.name,
                    "notes": requestBodyInfoLeadsTestDrive.notes,
                    "variant": requestBodyInfoLeadsTestDrive.variant,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                
            })
        })
        it('TC08-Negative-Verify the status code if send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": "",
                    "date": "",
                    "dateTime": "",
                    "id": "",
                    "model": "",
                    "name": "",
                    "notes": "",
                    "variant": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                
            })
        })
        it('TC09-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlots,
                    "date": requestBodyInfoLeadsTestDrive.date,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTime,
                    "id": requestBodyInfoLeadsTestDrive.id,
                    "model": requestBodyInfoLeadsTestDrive.model,
                    "name": requestBodyInfoLeadsTestDrive.name,
                    "notes": requestBodyInfoLeadsTestDrive.notes,
                    "variant": requestBodyInfoLeadsTestDrive.variant,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                testDriveId09=res.body.response.id
                
            })
        })
    })
    describe('Get Request Leads Test Drive ID', function(){
        it('TC10-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('availableSlots', requestBodyInfoLeadsTestDrive.availableSlots)
                expect(res.body.response).to.have.property('date', requestBodyInfoLeadsTestDrive.date)
                expect(res.body.response).to.have.property('dateTime', requestBodyInfoLeadsTestDrive.dateTime)
                expect(res.body.response).to.have.property('id', testDriveId)
                expect(res.body.response).to.have.property('model', requestBodyInfoLeadsTestDrive.model)
                expect(res.body.response).to.have.property('name', requestBodyInfoLeadsTestDrive.name)
                expect(res.body.response).to.have.property('notes', requestBodyInfoLeadsTestDrive.notes)
                expect(res.body.response).to.have.property('variant', requestBodyInfoLeadsTestDrive.variant)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC11-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC12-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'12/test-drives/'+testDriveId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Negative-Verify the response code if send the request with Invalid Test Drive ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId+'12',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Leads Test Drive ID', function(){
        it('TC15-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlotsUpdate,
                    "date": requestBodyInfoLeadsTestDrive.dateUpdate,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTimeUpdate,
                    "id": requestBodyInfoLeadsTestDrive.idUpdate,
                    "model": requestBodyInfoLeadsTestDrive.modelUpdate,
                    "name": requestBodyInfoLeadsTestDrive.nameUpdate,
                    "notes": requestBodyInfoLeadsTestDrive.notesUpdate,
                    "variant": requestBodyInfoLeadsTestDrive.variantUpdate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('availableSlots', requestBodyInfoLeadsTestDrive.availableSlotsUpdate)
                expect(res.body.response).to.have.property('date', requestBodyInfoLeadsTestDrive.dateUpdate)
                expect(res.body.response).to.have.property('dateTime', requestBodyInfoLeadsTestDrive.dateTimeUpdate)
                expect(res.body.response).to.have.property('id', testDriveId)
                expect(res.body.response).to.have.property('model', requestBodyInfoLeadsTestDrive.modelUpdate)
                expect(res.body.response).to.have.property('name', requestBodyInfoLeadsTestDrive.nameUpdate)
                expect(res.body.response).to.have.property('notes', requestBodyInfoLeadsTestDrive.notesUpdate)
                expect(res.body.response).to.have.property('variant', requestBodyInfoLeadsTestDrive.variantUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC16-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC17-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'12/test-drives/'+testDriveId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlotsUpdate,
                    "date": requestBodyInfoLeadsTestDrive.dateUpdate,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTimeUpdate,
                    "id": requestBodyInfoLeadsTestDrive.idUpdate,
                    "model": requestBodyInfoLeadsTestDrive.modelUpdate,
                    "name": requestBodyInfoLeadsTestDrive.nameUpdate,
                    "notes": requestBodyInfoLeadsTestDrive.notesUpdate,
                    "variant": requestBodyInfoLeadsTestDrive.variantUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC18-Negative-Verify the response code if send the request with Invalid Test Drive ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId+'12',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlotsUpdate,
                    "date": requestBodyInfoLeadsTestDrive.dateUpdate,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTimeUpdate,
                    "id": requestBodyInfoLeadsTestDrive.idUpdate,
                    "model": requestBodyInfoLeadsTestDrive.modelUpdate,
                    "name": requestBodyInfoLeadsTestDrive.nameUpdate,
                    "notes": requestBodyInfoLeadsTestDrive.notesUpdate,
                    "variant": requestBodyInfoLeadsTestDrive.variantUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-Negative-Verify the status code if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": "",
                    "date": "",
                    "dateTime": "",
                    "id": "",
                    "model": "",
                    "name": "",
                    "notes": "",
                    "variant": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId09,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "availableSlots": requestBodyInfoLeadsTestDrive.availableSlotsUpdate,
                    "date": requestBodyInfoLeadsTestDrive.dateUpdate,
                    "dateTime": requestBodyInfoLeadsTestDrive.dateTimeUpdate,
                    "id": requestBodyInfoLeadsTestDrive.idUpdate,
                    "model": requestBodyInfoLeadsTestDrive.modelUpdate,
                    "name": requestBodyInfoLeadsTestDrive.nameUpdate,
                    "notes": requestBodyInfoLeadsTestDrive.notesUpdate,
                    "variant": requestBodyInfoLeadsTestDrive.variantUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Leads Test Drive ID', function(){
        it('TC21-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('availableSlots', null)
                expect(res.body.response).to.have.property('date', null)
                expect(res.body.response).to.have.property('dateTime', null)
                expect(res.body.response).to.have.property('id', 0)
                expect(res.body.response).to.have.property('model', null)
                expect(res.body.response).to.have.property('name', null)
                expect(res.body.response).to.have.property('notes', null)
                expect(res.body.response).to.have.property('variant', null)
            })
        })
        it('TC22-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC23-Negative-Verify the request code if send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC24-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'12/test-drives/'+testDriveId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC25-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request leads ID', function(){
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