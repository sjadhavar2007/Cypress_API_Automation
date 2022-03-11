///<reference types="cypress"/>
describe('Leads Event Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var leadsId;

    before(function(){
        cy.fixture('leads/LeadsEventController/LeadsEvent_url').then(function(data){
            commonUrl = data.URL_LeadsEventController
        })
        cy.fixture('leads/LeadsEventController/LeadsEvent_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadsAppointmentController/LeadsBody').then(function(data){
            requestBodyInfo = data
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
    describe('Get Request Leads event', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/lead-event',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('event')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('leadId')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('updatedDateTime')
                        expect(res.body.response.content[i]).to.have.property('userName')
                    }
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'/lead-event',
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