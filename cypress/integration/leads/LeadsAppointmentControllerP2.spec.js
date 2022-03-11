///<reference types="cypress"/>
describe('Leads Appointment Controller', () => {
    var baseUrl;
    var leadBody;
    var requestBody;
    var leadId;
    var dateTime;
    var appointmentId;
     before(function(){
         cy.fixture('Phase2/leads/CommonUrl').then(function(data){
             baseUrl = data.URL_LeadsAppointmentController
         })
         cy.fixture('Phase2/leads/LeadsControllerBody').then(function(data){
            leadBody = data
        })
        cy.fixture('Phase2/leads/LeadsAppointmentControllerBody').then(function(data){
            requestBody = data
        })
        var today = new Date();
        dateTime=today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' 0'+(today.getHours()-12)+ ":0" + today.getMinutes();
     })

     describe('Leads Controller ', function(){
        it('TCXX-Positive-To create the leads Id for appointments', function(){
            cy.request({
                method: 'POST',
                url: baseUrl,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "active": leadBody.active,
                    "adHockModel": leadBody.adHockModel,
                    "cashBuyer": leadBody.cashBuyer,
                    "closedAs": leadBody.closedAs,
                    "customerName": leadBody.customerName,
                    "customerType": leadBody.customerType,
                    "dateOfBirth": leadBody.dateOfBirth,
                    "email": leadBody.email,
                    "exteriorColorId": leadBody.exteriorColorId,
                    "gender": leadBody.gender,
                    "householdIncome": leadBody.householdIncome,
                    "id": leadBody.id,
                    "identificationNumber": leadBody.identificationNumber,
                    "identificationType": leadBody.identificationType,
                    "leadSourceId": leadBody.leadSourceId,
                    "leadSubSourceId": leadBody.leadSubSourceId,
                    "leadType": leadBody.leadType,
                    "location": leadBody.location,
                    "lostReason": leadBody.lostReason,
                    "numberOfUnits": leadBody.numberOfUnits,
                    "occupation": leadBody.occupation,
                    "orderType": leadBody.orderType,
                    "orgId": leadBody.orgId,
                    "owner": leadBody.owner,
                    "phoneNumber": leadBody.phoneNumber,
                    "prospectCategory": leadBody.prospectCategory,
                    "prospectId": leadBody.prospectId,
                    "prospectStatus": leadBody.prospectStatus,
                    "publicRelations": leadBody.publicRelations,
                    "purchaseTypeId": leadBody.purchaseTypeId,
                    "race": leadBody.race,
                    "rcoGenerated": leadBody.rcoGenerated,
                    "sellingRegionId": leadBody.sellingRegionId,
                    "status": leadBody.status,
                    "title": leadBody.title,
                    "tradeIn": leadBody.tradeIn,
                    "variantId": leadBody.variantId
                 },             
            }).then(function(res){
                expect(res.status).to.eq(201)
                leadId = res.body.response.id
            })
        })
     })
     describe('Get Request LeadID_Appointments', function(){
         it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/appointments',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength <= 0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } 
                else 
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        
                    }
                }
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
         })
         it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

         })
         it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/appointments',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
         })
     })
     describe('Post Request LeadID_Appointments', function(){
         it('TC04/TC09-Positive-Verify the status CODE & Response body as per the swagger / Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/'+leadId+'/appointments',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": dateTime+' PM',
                    "id": requestBody.id,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": dateTime+' AM',
                    "status": requestBody.status,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkManagerId": requestBody.topMarkManagerId,
                    "topMarkOutletId": requestBody.topMarkOutletId,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.status).to.eq(201)
                appointmentId = res.body.response.id
                expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', dateTime+' PM')
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', dateTime+' AM')
                expect(res.body.response).to.have.property('status', requestBody.status)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkManagerId', requestBody.topMarkManagerId)
                expect(res.body.response).to.have.property('topMarkOutletId', requestBody.topMarkOutletId)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBody.typeOfAppointment)
                expect(res.duration).to.be.lessThan(1000)
            })
         })
         it('TC05/TC06/TC07-NOT APPLICABLE FOR AUTOMATION', function(){
         
         })
         it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/'+leadId+'/appointments',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": "",
                    "endDateTime": "",
                    "id": "",
                    "location": "",
                    "notes": "",
                    "startDateTime": "",
                    "status": "",
                    "topMarkManagerContact": "",
                    "topMarkManagerId": "",
                    "topMarkOutletId": "",
                    "typeOfAppointment": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
         })
     })
     describe('Get Request LeadID_Appointment_ID', function(){
         it('TC10/TC14-Positive-Verify the status CODE & Response body as per the swagger/Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/appointments/'+appointmentId,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', dateTime+' PM')
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', dateTime+' AM')
                expect(res.body.response).to.have.property('status', requestBody.status)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkManagerId', requestBody.topMarkManagerId)
                expect(res.body.response).to.have.property('topMarkOutletId', requestBody.topMarkOutletId)
                expect(res.body.response).to.have.property('typeOfAppointment', requestBody.typeOfAppointment)
                expect(res.duration).to.be.lessThan(1000)
            })
         })
         it('TC11-NA-Verify that the response body is matching with the DATABASE record or not', function(){

         })
         it('TC12-Negative-Verify the response code, if send the request with Invalid Lead_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'1/appointments/'+appointmentId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
         })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Appointment_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/appointments/'+appointmentId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
     })
     describe('Put Request LeadID_Appointment_ID', function(){
         it('TC15/TC20-Positive-Verify the status CODE & Response body as per the swagger/Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/'+leadId+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": dateTime+' PM',
                    "id": appointmentId,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": dateTime+' AM',
                    "status": requestBody.status,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkManagerId": requestBody.topMarkManagerId,
                    "topMarkOutletId": requestBody.topMarkOutletId,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('appointmentStatus', requestBody.appointmentStatus)
                expect(res.body.response).to.have.property('endDateTime', dateTime+' PM')
                expect(res.body.response).to.have.property('id', appointmentId)
                expect(res.body.response).to.have.property('location', requestBody.location)
                expect(res.body.response).to.have.property('notes', requestBody.notes)
                expect(res.body.response).to.have.property('startDateTime', dateTime+' AM')
                expect(res.body.response).to.have.property('status', requestBody.status)
                expect(res.body.response).to.have.property('topMarkManagerContact', requestBody.topMarkManagerContact)
                expect(res.body.response).to.have.property('topMarkManagerId', requestBody.topMarkManagerId)
            })
        })
        it('TC16-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with Invalid Lead_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/'+leadId+'1/appointments/'+appointmentId,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": dateTime+' PM',
                    "id": appointmentId,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": dateTime+' AM',
                    "status": requestBody.status,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkManagerId": requestBody.topMarkManagerId,
                    "topMarkOutletId": requestBody.topMarkOutletId,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC18-Negative-Verify the response code, if send the request with Invalid Appointment_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/'+leadId+'/appointments/'+appointmentId+'1',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": requestBody.appointmentStatus,
                    "endDateTime": dateTime+' PM',
                    "id": appointmentId,
                    "location": requestBody.location,
                    "notes": requestBody.notes,
                    "startDateTime": dateTime+' AM',
                    "status": requestBody.status,
                    "topMarkManagerContact": requestBody.topMarkManagerContact,
                    "topMarkManagerId": requestBody.topMarkManagerId,
                    "topMarkOutletId": requestBody.topMarkOutletId,
                    "typeOfAppointment": requestBody.typeOfAppointment,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC19-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/'+leadId+'/appointments/'+appointmentId,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "appointmentStatus": "",
                    "endDateTime": "",
                    "id": "",
                    "location": "",
                    "notes": "",
                    "startDateTime": "",
                    "status": "",
                    "topMarkManagerContact": "",
                    "topMarkManagerId": "",
                    "topMarkOutletId": "",
                    "typeOfAppointment": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
         })
     })
     describe('Get Request LeadID_Appointment_Export', function(){
        it('TC21/TC24-Positive-Verify the status CODE & Response body as per the swagger, Response Time', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/appointments/export',
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.duration).to.be.lessThan(1000)
            })
        })
        it('TC22-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC23-NA-Verify that after hitting URL in the browser Excel File is downloaded or not', function(){

        })
     })
     describe('Get Request LeadID_Appointment_NextInteraction', function(){
         it('TC25/TC27-Positive-Verify the status CODE & Response body as per the swagger/Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/'+leadId+'/next-interaction',
                qs: {
                    "date": "12/12/2021 10:00 AM"
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.duration).to.be.lessThan(1000)
            })
         })
         it('TC26-NA-Verify that the response body is matching with the DATABASE record or not', function(){

         })
     })
     describe('Get Request Leads_LeadAppointments List', function(){
        it('TC28/TC30-Positive-Verify the status CODE & Response body as per the swagger/Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/appointments',
                
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.duration).to.be.lessThan(1000)
            })
        })
         it('TC29-NA-Verify that the response body is matching with the DATABASE record or not', function(){
         
        })
     })
})