///<reference types="cypress"/>

describe('DMS-1093 BE - Lead Duplicate API (Lead RCO Controller[compareDuplicate])', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var paramsInfo;
    var leadId;
    before(function(){
        cy.fixture('leads/DMS_1093/DMS_1093_Url').then(function(data){
            commonUrl = data.URL_DMS_1093
        })
        cy.fixture('leads/LeadController/Lead_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadController/Lead_Body').then(function(data){
            requestBodyInfo = data
        })
        cy.fixture('leads/DMS_1093/DMS_1093_params').then(function(data){
            paramsInfo = data
        })
    })

    describe('Create Lead Id', function(){
        it('TC01-Positive-Verify the response code & response body is as per the swagger or not', function(){
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
                leadId=res.body.response.id
            })
        })
    })
    describe('Post Request Compare Duplicate', function(){
        it('TC01-Negative-Verify that the response code & response body is proper when duplicate exists', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
                expect(res.body.responseCode).to.equal(422)
                expect(res.body).to.have.property('message', "Error in validating the fields")
                expect(res.body.response).to.have.property('customer', 'Duplicate Customer')
            })
        })
        it('TC02-Positive-Verify that the response code & response body is proper when duplicate does not exists', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption1,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message', null)
                expect(res.body).to.have.property('response', 'Lead Converted to Customer successfully')
            })
        })
        it('TC03-Positive-Verify the response code & response body  when Optional Params value is "Existing"', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption1,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message', null)
                expect(res.body).to.have.property('response', 'Lead Converted to Customer successfully')
            })
        })
        it('TC04-Positive-Verify the response code & response body  when Optional Params value is  "Override"', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption2,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message', null)
                expect(res.body).to.have.property('response', 'Lead Converted to Customer successfully')
            })
        })
        it('TC05-Negative-Verify the response code & response body  when Optional Param is sent with invalid Value', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption3,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(422)
                expect(res.body.responseCode).to.equal(422)
                expect(res.body).to.have.property('message', "Error in validating the fields")
                expect(res.body.response).to.have.property('duplicate Option', "Invalid Duplicate Option")
            })
        })
        it('TC06-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC07-Negative-Verify the response code, send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'1/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption1,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-Positive-Verify the Response Duration is less than 1 Second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco/duplicate',
                qs: {
                    "duplicateOption": paramsInfo.duplicateOption1,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })

    describe('Delete lead Id', function(){
        it('TC', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})