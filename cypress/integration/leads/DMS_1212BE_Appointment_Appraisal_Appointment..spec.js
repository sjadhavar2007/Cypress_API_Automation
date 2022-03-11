///<reference types="cypress"/>

describe('DMS-1212 BE - Appointment Appraisal Appointment(Leads Appointment Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBody;
    var leadsId;
    var appointmentId;
    var appointmentId09;
    var paramsInfo;
    before(function(){
        cy.fixture('leads/DMS_1212/Url').then(function(data){
            commonUrl = data.URL_LeadsAppointmentController
        })
        cy.fixture('leads/DMS_1212/headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadController/Lead_Body').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/DMS_1212/Body').then(function(data){
            requestBody= data
        })
        cy.fixture('leads/DMS_1212/params').then(function(data){
            paramsInfo= data
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
    describe('Get Request LeadID Appointment', function(){
        it('TC01-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments'
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
        it('TC02-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC03-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'1'+'/appointments',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request LeadID Appointment', function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": requestBody.endDateTime,
                    "id": requestBody.id,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "topMarkManager": requestBody.topMarkManager,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkOutlet": requestBody.topMarkOutlet,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                appointmentId=res.body.response.id
                expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBody.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBody.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBody.typeOfAppointment)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC06-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC07-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": "",
                    "endDateTime": "",
                    "id": "",
                    "location": "",
                    "notes": "",
                    "startDateTime": "",
                    "topMarkManager": "",
                    "topMarkManagerContact": "",
                    "topMarkOutlet": "",
                    "typeOfAppointment": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            })
        })
        it('TC08-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": requestBody.endDateTime,
                    "id": requestBody.id,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "topMarkManager": requestBody.topMarkManager,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkOutlet": requestBody.topMarkOutlet,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                appointmentId09=res.body.response.id
            })
        })
    })
    describe('Get Request LeadID Appointment ID', function(){
        it('TC09-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBody.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBody.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBody.typeOfAppointment)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC10-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC11-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request LeadID Appointment ID', function(){
        it('TC13-Positive-Verify the response code & response body as per the swagger', function(){
                cy.request({
                    method: 'PUT',
                    url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                    headers: {
                        "Content-Type": headersInfo.ContentType,
                    },
                    body: {
                        "appointmentStatus": requestBody.appointmentStatus,
                        "endDateTime": requestBody.endDateTime,
                        "id": appointmentId,
                        "location": requestBody.location,
                        "notes": requestBody.notes,
                        "startDateTime": requestBody.startDateTime,
                        "topMarkManager": requestBody.topMarkManager,
                        "topMarkManagerContact": requestBody.topMarkManagerContact,
                        "topMarkOutlet": requestBody.topMarkOutlet,
                        "typeOfAppointment": requestBody.typeOfAppointment,
                      },
                }).then(function(res){
                    expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', requestBody.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBody.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBody.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBody.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBody.typeOfAppointment)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                })
        })
        it('TC14-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC15-Negative-Verify the response code, if send the request with invalid Lead ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'1'+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": requestBody.endDateTime,
                    "id":appointmentId,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "topMarkManager": requestBody.topMarkManager,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkOutlet": requestBody.topMarkOutlet,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC16-Negative-Verify the response code, if send the request with invalid Appointment ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId+'1',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": requestBody.endDateTime,
                    "id": appointmentId,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "topMarkManager": requestBody.topMarkManager,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkOutlet": requestBody.topMarkOutlet,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC17-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": "",
                    "endDateTime": "",
                    "id": "",
                    "location": "",
                    "notes": "",
                    "startDateTime": "",
                    "topMarkManager": "",
                    "topMarkManagerContact": "",
                    "topMarkOutlet": "",
                    "typeOfAppointment": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId09,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": requestBody.endDateTime,
                    "id": appointmentId09,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": requestBody.startDateTime,
                    "topMarkManager": requestBody.topMarkManager,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkOutlet": requestBody.topMarkOutlet,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request LeadID Appointment ID', function(){
        it('TC19-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC20-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC21-Negative-Verify the response code, if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC22-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId09,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
    describe('Get Request Lead Appointment', function(){
        it('TC23-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/appointments'
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('appointmentStatus')
                        expect(res.body.response.content[i]).to.have.property('endDateTime')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('leadCustomerName')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let m=0; m<this.linksLength; m++)
                        {
                            expect(res.body.response.links[m]).to.have.property('href')
                            expect(res.body.response.links[m]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('location')
                        expect(res.body.response.content[i]).to.have.property('notes')
                        expect(res.body.response.content[i]).to.have.property('startDateTime')
                        expect(res.body.response.content[i]).to.have.property('topMarkManager')
                        expect(res.body.response.content[i]).to.have.property('topMarkManagerContact')
                        expect(res.body.response.content[i]).to.have.property('topMarkOutlet')
                        expect(res.body.response.content[i]).to.have.property('typeOfAppointment')
                        
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
        it('TC24-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC25-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/appointments'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Lead Next-interaction', function(){
        it('TC26-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/next-interaction',
                qs: {
                    "date": paramsInfo.date,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response.last).to.have.property('appointmentStatus')
                expect(res.body.response.last).to.have.property('endDateTime')
                expect(res.body.response.last).to.have.property('id')
                expect(res.body.response.last).to.have.property('leadCustomerName')
                expect(res.body.response.last).to.have.property('location')
                expect(res.body.response.last).to.have.property('notes')
                expect(res.body.response.last).to.have.property('startDateTime')
                expect(res.body.response.last).to.have.property('topMarkManager')
                expect(res.body.response.last).to.have.property('topMarkManagerContact')
                expect(res.body.response.last).to.have.property('topMarkOutlet')
                expect(res.body.response.last).to.have.property('typeOfAppointment')
                this.links=res.body.response.last.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.last.links[m]).to.have.property('href')
                    expect(res.body.response.last.links[m]).to.have.property('rel')
                }
                expect(res.body.response.links.length).to.equal(0)
                expect(res.body.response.next).to.have.property('appointmentStatus')
                expect(res.body.response.next).to.have.property('endDateTime')
                expect(res.body.response.next).to.have.property('id')
                expect(res.body.response.next).to.have.property('leadCustomerName')
                expect(res.body.response.next).to.have.property('location')
                expect(res.body.response.next).to.have.property('notes')
                expect(res.body.response.next).to.have.property('startDateTime')
                expect(res.body.response.next).to.have.property('topMarkManager')
                expect(res.body.response.next).to.have.property('topMarkManagerContact')
                expect(res.body.response.next).to.have.property('topMarkOutlet')
                expect(res.body.response.next).to.have.property('typeOfAppointment')
                this.links=res.body.response.next.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.next.links[m]).to.have.property('href')
                    expect(res.body.response.next.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC27-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC28-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/next-interaction',
                qs: {
                    "date": paramsInfo.date,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})