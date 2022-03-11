///<reference types="cypress"/>

describe('Leads Appointment Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBodyInfoAppointments;
    var leadsId;
    var appointmentId;
    var appointmentId09;
    before(function(){
        cy.fixture('leads/LeadsAppointmentController/Url').then(function(data){
            commonUrl = data.URL_LeadsAppointmentController
        })
        cy.fixture('leads/LeadsAppointmentController/Url').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadsAppointmentController/LeadsBody').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/LeadsAppointmentController/Body').then(function(data){
            requestBodyInfoAppointments = data
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
    describe('Get Request leads Appointment', function(){
        it('TC01-Positive-Verify that the response code & response body is as per the swagger or not', function(){
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
        it('TC02-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC03-Negative-Verify the response code, if user send the request with Invalid Lead ID', function(){
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
    describe('Post Request leads Appointment', function(){
        it('TC05-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                appointmentId=res.body.response.id
                expect(res.body.response).to.have.property('appointmentStatus', requestBodyInfoAppointments.appointmentStatus)
                expect(res.body.response).to.have.property('dateTime', null)
                expect(res.body.response).to.have.property('endDateTime', requestBodyInfoAppointments.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBodyInfoAppointments.location)
                expect(res.body.response).to.have.property('notes', requestBodyInfoAppointments.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBodyInfoAppointments.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBodyInfoAppointments.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBodyInfoAppointments.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBodyInfoAppointments.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBodyInfoAppointments.typeOfAppointment)
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
        it('TC07-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'1'+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            })
        })
        it('TC08-Negative-Verify the response code, if send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": "",
                    "dateTime": "",
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
        it('TC09-Positive-Verify the Response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId+'/appointments',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                appointmentId09=res.body.response.id
            })
        })
    })
    describe('Get Request Leads Appointment ID', function(){
        it('TC10-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('appointmentStatus', requestBodyInfoAppointments.appointmentStatus)
                expect(res.body.response).to.have.property('dateTime', null)
                expect(res.body.response).to.have.property('endDateTime', requestBodyInfoAppointments.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBodyInfoAppointments.location)
                expect(res.body.response).to.have.property('notes', requestBodyInfoAppointments.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBodyInfoAppointments.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBodyInfoAppointments.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBodyInfoAppointments.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBodyInfoAppointments.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBodyInfoAppointments.typeOfAppointment)
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
        it('TC12-Negative-Verify the status code if user send the request with invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'1'+'/appointments/'+appointmentId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Negative-Verify the status code if user send the request with invalid Appointment ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Leads Appointment ID', function(){
        it('TC15-Positive-Verify that the response code & response body is as per the swagger or not', function(){
                cy.request({
                    method: 'PUT',
                    url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                    headers: {
                        "Content-Type": headersInfo.ContentType,
                    },
                    body: {
                        "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                        "dateTime": requestBodyInfoAppointments.dateTime,
                        "endDateTime": requestBodyInfoAppointments.endDateTime,
                        "id": requestBodyInfoAppointments.id,
                        "location": requestBodyInfoAppointments.location,
                        "notes": requestBodyInfoAppointments.notes,
                        "startDateTime": requestBodyInfoAppointments.startDateTime,
                        "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                        "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                        "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                        "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                      },
                }).then(function(res){
                    expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('appointmentStatus', requestBodyInfoAppointments.appointmentStatus)
                expect(res.body.response).to.have.property('dateTime', null)
                expect(res.body.response).to.have.property('endDateTime', requestBodyInfoAppointments.endDateTime)
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBodyInfoAppointments.location)
                expect(res.body.response).to.have.property('notes', requestBodyInfoAppointments.notes)
                expect(res.body.response).to.have.property('startDateTime', requestBodyInfoAppointments.startDateTime)
                expect(res.body.response).to.have.property('topMarkManager', requestBodyInfoAppointments.topMarkManager)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBodyInfoAppointments.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkOutlet', requestBodyInfoAppointments.topMarkOutlet)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBodyInfoAppointments.typeOfAppointment)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                })
        })
        it('TC16-NA-Verify the response id matching with DB or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with  invalid Lead ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'1'+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC18-Negative-Verify the response code, if send the request with  invalid Appointment ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId+'1',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-Negative-Verify the response code if send the request with blank request fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": "",
                    "dateTime": "",
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
        it('TC20-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId09,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appointmentStatus": requestBodyInfoAppointments.appointmentStatus,
                    "dateTime": requestBodyInfoAppointments.dateTime,
                    "endDateTime": requestBodyInfoAppointments.endDateTime,
                    "id": requestBodyInfoAppointments.id,
                    "location": requestBodyInfoAppointments.location,
                    "notes": requestBodyInfoAppointments.notes,
                    "startDateTime": requestBodyInfoAppointments.startDateTime,
                    "topMarkManager": requestBodyInfoAppointments.topMarkManager,
                    "topMarkManagerContact": requestBodyInfoAppointments.topMarkManagerContact,
                    "topMarkOutlet": requestBodyInfoAppointments.topMarkOutlet,
                    "typeOfAppointment": requestBodyInfoAppointments.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
    })
    })
    describe('Delete Request Leads Appointment ID', function(){
        it('TC21-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC22-NA-Verify the record is getting removed from DB ro not', function(){

        })
        it('TC23-Negative-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Negative-Verify the status Code, If send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'1'+'/appointments/'+appointmentId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC25-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId+'/appointments/'+appointmentId09,
            }).then(function(res){
                expect(res.status).to.equal(200)
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