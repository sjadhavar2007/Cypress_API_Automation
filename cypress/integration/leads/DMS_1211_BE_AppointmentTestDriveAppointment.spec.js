///<reference types="cypress"/>
describe('DMS-1211 BE - Appointment Test Drive Appointment (Leads Test Drive Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var leadsId;
    var requestBody;
    var testDriveId;
    var testDriveId10;
    var paramsInfo;
    before(function(){
        cy.fixture('leads/DMS_1211/url').then(function(data){
            commonUrl=data.URL_LeadsTestDriveController
        })
        cy.fixture('leads/LeadController/Lead_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadController/Lead_Body').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/DMS_1211/body').then(function(data){
            requestBody = data
        })
        cy.fixture('leads/DMS_1211/params').then(function(data){
            paramsInfo = data
        })
    })
    describe('create lead Id', function(){
        it('TCXX-Positive-Create lead Id', function(){
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
    describe('Get Request Lead ID Test Drive', function(){
        it('TC01-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives'
            }).then(function(res){
                expect(res.body.status).to.equal(200)
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
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC03-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'12/test-drives',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Lead ID Test Drive', function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.name,
                    "dateTime": requestBody.dateTime,
                    "notes": requestBody.notes,
                    "variantId": requestBody.variantId,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                testDriveId= res.body.response.id
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response).to.have.property('dateTime', requestBody.dateTime)
                expect(res.body.response).to.have.property('id', testDriveId)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('variantId', requestBody.variantId)
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
                url: commonUrl+'/'+leadsId+'1/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.name,
                    "dateTime": requestBody.dateTime,
                    "notes": requestBody.notes,
                    "variantId": requestBody.variantId,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": "",
                    "dateTime": "",
                    "notes": "",
                    "variant": "",
                },
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
                url: commonUrl+'/'+leadsId+'/test-drives',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.name,
                    "dateTime": requestBody.dateTime,
                    "notes": requestBody.notes,
                    "variantId": requestBody.variantId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                testDriveId10= res.body.response.id
            })
        })
    })
    describe('Get Request Lead ID Test Drive ID', function(){
        it('TC11-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response).to.have.property('dateTime', requestBody.dateTime)
                expect(res.body.response).to.have.property('id', testDriveId)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('variantId', requestBody.variantId)
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
        it('TC13-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'1/test-drives/'+testDriveId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC14-Negative-Verify the response code, if send the request with Invalid Test Drive ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC15-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId10,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Lead ID Test Drive ID', function(){
        it('TC16-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.nameUpdate,
                    "dateTime": requestBody.dateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "variantId": requestBody.variantIdUpdate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('name', requestBody.nameUpdate)
                expect(res.body.response).to.have.property('dateTime', requestBody.dateTimeUpdate)
                expect(res.body.response).to.have.property('notes', requestBody.notesUpdate)
                expect(res.body.response).to.have.property('variantId', requestBody.variantIdUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }

            })
        })
        it('TC17-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC18-Negative-Verify the response code, if send the request with invalid Test Drive ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId+1,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.nameUpdate,
                    "dateTime": requestBody.dateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "variantId": requestBody.variantIdUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": "",
                    "dateTime": "",
                    "notes": "",
                    "variantId": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId10,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "name": requestBody.nameUpdate,
                    "dateTime": requestBody.dateTimeUpdate,
                    "notes": requestBody.notesUpdate,
                    "variantId": requestBody.variantIdUpdate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request Lead ID Test Drive ID', function(){
        it('TC21-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('name', null)
                expect(res.body.response).to.have.property('dateTime', null)
                expect(res.body.response).to.have.property('model', null)
                expect(res.body.response).to.have.property('notes', null)
                expect(res.body.response).to.have.property('variant', null)

            })
        })
        it('TC22-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC23-Negative-Verify the response code, if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/test-drives/'+testDriveId10,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Lead Test Drive (Upcoming)', function(){
        it('TC25-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive'
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('dateTime')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('notes')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                        expect(res.body.response.content[i]).to.have.property('variantDescription')
                        expect(res.body.response.content[i]).to.have.property('variantId')
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
        it('TC26-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC27-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Lead Test Drive Bookings', function(){
        it('TC28-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive/bookings',
                qs: {
                    "fromDate": paramsInfo.fromDate,
                    "toDate": paramsInfo.toDate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('dateTime')
                        expect(res.body.response.content[i].lead).to.have.property('customerName')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('variantDescription')
                        expect(res.body.response.content[i]).to.have.property('variantId')
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
        it('TC29-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC30-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive/bookings',
                qs: {
                    "fromDate": paramsInfo.fromDate,
                    "toDate": paramsInfo.toDate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Lead Test Drive Slot Available', function(){
        it('TC31-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive/slot-available',
                qs: {
                    "date": paramsInfo.date,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('booked')
                    expect(res.body.response[i]).to.have.property('time')
                }
                
            })
        })
        it('TC32-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC33-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drive/slot-available',
                qs: {
                    "date": paramsInfo.date,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Lead Test Drives', function(){
        it('TC34-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drives',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('dateTime')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('notes')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                        expect(res.body.response.content[i]).to.have.property('variantId')
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
            })
        })
        it('TC35-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC36-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/test-drives',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})