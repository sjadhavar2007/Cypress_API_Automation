///<reference types="cypress"/>

describe('Leads Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var leadsId;
    var leadsId04;
    before(function(){
        cy.fixture('leads/LeadController/Lead_url').then(function(data){
            commonUrl = data.URL_LeadsController
        })
        cy.fixture('leads/LeadController/Lead_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('leads/LeadController/Lead_Body').then(function(data){
            requestBodyInfo = data
        })
    })
    describe('', function(){
        it('TCXX-', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
    describe.only('Post Request Leads', function(){
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
                leadsId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('cashBuyer', requestBodyInfo.cashBuyer)
                expect(res.body.response).to.have.property('closedAs', requestBodyInfo.closedAs)
                expect(res.body.response).to.have.property('customerName', requestBodyInfo.customerName)
                expect(res.body.response).to.have.property('customerType', requestBodyInfo.customerType)
                expect(res.body.response).to.have.property('dateOfBirth', requestBodyInfo.dateOfBirth)
                expect(res.body.response).to.have.property('email', requestBodyInfo.email)
                expect(res.body.response).to.have.property('exteriorColor', requestBodyInfo.exteriorColor)
                expect(res.body.response).to.have.property('gender', requestBodyInfo.gender)
                expect(res.body.response).to.have.property('householdIncome', requestBodyInfo.householdIncome)
                expect(res.body.response).to.have.property('id', leadsId)
                expect(res.body.response).to.have.property('identificationNumber', requestBodyInfo.identificationNumber)
                expect(res.body.response).to.have.property('identificationType', requestBodyInfo.identificationType)
                expect(res.body.response).to.have.property('leadType', requestBodyInfo.leadType)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                expect(res.body.response).to.have.property('location', requestBodyInfo.location)
                expect(res.body.response).to.have.property('lostReason', requestBodyInfo.lostReason)
                expect(res.body.response).to.have.property('occupation', requestBodyInfo.occupation)
                expect(res.body.response).to.have.property('orderType', requestBodyInfo.orderType)
                expect(res.body.response).to.have.property('owner', requestBodyInfo.owner)
                expect(res.body.response).to.have.property('phoneNumber', requestBodyInfo.phoneNumber)
                expect(res.body.response).to.have.property('prospectCategory', requestBodyInfo.prospectCategory)
                expect(res.body.response).to.have.property('prospectCreatedOn', requestBodyInfo.prospectCreatedOn)
                expect(res.body.response).to.have.property('prospectId', requestBodyInfo.prospectId)
                expect(res.body.response).to.have.property('prospectStatus', requestBodyInfo.prospectStatus)
                expect(res.body.response).to.have.property('publicRelations', requestBodyInfo.publicRelations)
                expect(res.body.response).to.have.property('purchaseType', requestBodyInfo.purchaseType)
                expect(res.body.response).to.have.property('race', requestBodyInfo.race)
                expect(res.body.response).to.have.property('rcoGenerated', requestBodyInfo.rcoGenerated)
                expect(res.body.response).to.have.property('sellingRegion', requestBodyInfo.sellingRegion)
                expect(res.body.response).to.have.property('source', requestBodyInfo.source)
                expect(res.body.response).to.have.property('status', requestBodyInfo.status)
                expect(res.body.response).to.have.property('subSource', requestBodyInfo.subSource)
                expect(res.body.response).to.have.property('title', requestBodyInfo.title)
                expect(res.body.response).to.have.property('tradeIn', requestBodyInfo.tradeIn)
                expect(res.body.response).to.have.property('variantId', requestBodyInfo.variantId)
            })
        })
        it('TC02-NA-Verify that the response is matching with DB records or not', function(){

        })
        it('TC03-Negative-Verify the status code, if user send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": "",
                    "cashBuyer": "",
                    "closedAs": "",
                    "customerName": "",
                    "customerType": "",
                    "dateOfBirth": "",
                    "email": "",
                    "exteriorColor": "",
                    "gender": "",
                    "householdIncome": "",
                    "id": "",
                    "identificationNumber": "",
                    "identificationType": "",
                    "leadType": "",
                    "location": "",
                    "lostReason": "",
                    "occupation": "",
                    "orderType": "",
                    "owner": "",
                    "phoneNumber": "",
                    "prospectCategory": "",
                    "prospectCreatedOn": "",
                    "prospectId": "",
                    "prospectStatus": "",
                    "publicRelations": "",
                    "purchaseType": "",
                    "race": "",
                    "rcoGenerated": "",
                    "sellingRegion": "",
                    "source": "",
                    "status": "",
                    "subSource": "",
                    "title": "",
                    "tradeIn": "",
                    "variantId": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the Response duration is less than 1 second or not', function(){
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
                expect(res.duration).to.lessThan(1000)
                leadsId04=res.body.response.id
            })
        })
    })
    describe.only('Get Request Leads Id', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not if sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('cashBuyer', requestBodyInfo.cashBuyer)
                expect(res.body.response).to.have.property('closedAs', requestBodyInfo.closedAs)
                expect(res.body.response).to.have.property('customerName', requestBodyInfo.customerName)
                expect(res.body.response).to.have.property('customerType', requestBodyInfo.customerType)
                expect(res.body.response).to.have.property('dateOfBirth', requestBodyInfo.dateOfBirth)
                expect(res.body.response).to.have.property('email', requestBodyInfo.email)
                expect(res.body.response).to.have.property('exteriorColor', requestBodyInfo.exteriorColor)
                expect(res.body.response).to.have.property('gender', requestBodyInfo.gender)
                expect(res.body.response).to.have.property('householdIncome', requestBodyInfo.householdIncome)
                expect(res.body.response).to.have.property('id', leadsId)
                expect(res.body.response).to.have.property('identificationNumber', requestBodyInfo.identificationNumber)
                expect(res.body.response).to.have.property('identificationType', requestBodyInfo.identificationType)
                expect(res.body.response).to.have.property('leadType', requestBodyInfo.leadType)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                expect(res.body.response).to.have.property('location', requestBodyInfo.location)
                expect(res.body.response).to.have.property('lostReason', requestBodyInfo.lostReason)
                expect(res.body.response).to.have.property('occupation', requestBodyInfo.occupation)
                expect(res.body.response).to.have.property('orderType', requestBodyInfo.orderType)
                expect(res.body.response).to.have.property('owner', requestBodyInfo.owner)
                expect(res.body.response).to.have.property('phoneNumber', requestBodyInfo.phoneNumber)
                expect(res.body.response).to.have.property('prospectCategory', requestBodyInfo.prospectCategory)
                expect(res.body.response).to.have.property('prospectCreatedOn', requestBodyInfo.prospectCreatedOn)
                expect(res.body.response).to.have.property('prospectId', requestBodyInfo.prospectId)
                expect(res.body.response).to.have.property('prospectStatus', requestBodyInfo.prospectStatus)
                expect(res.body.response).to.have.property('publicRelations', requestBodyInfo.publicRelations)
                expect(res.body.response).to.have.property('purchaseType', requestBodyInfo.purchaseType)
                expect(res.body.response).to.have.property('race', requestBodyInfo.race)
                expect(res.body.response).to.have.property('rcoGenerated', requestBodyInfo.rcoGenerated)
                expect(res.body.response).to.have.property('sellingRegion', requestBodyInfo.sellingRegion)
                expect(res.body.response).to.have.property('source', requestBodyInfo.source)
                expect(res.body.response).to.have.property('status', requestBodyInfo.status)
                expect(res.body.response).to.have.property('subSource', requestBodyInfo.subSource)
                expect(res.body.response).to.have.property('title', requestBodyInfo.title)
                expect(res.body.response).to.have.property('tradeIn', requestBodyInfo.tradeIn)
                expect(res.body.response).to.have.property('variantId', requestBodyInfo.variantId)
            })
        })
        it('TC02-Negative-Verify the Status Code and Response Parameters are as per the Swagger or not if sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC03-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC04-Positive-Verify the Response time of GET request ', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadsId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.only('Put Request Leads ID', function(){
        it('TC01-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": requestBodyInfo.active,
                    "cashBuyer": requestBodyInfo.cashBuyer,
                    "closedAs": requestBodyInfo.closedAs,
                    "customerName": requestBodyInfo.customerName+'khole',
                    "customerType": requestBodyInfo.customerType,
                    "dateOfBirth": requestBodyInfo.dateOfBirth,
                    "email": requestBodyInfo.email,
                    "exteriorColor": requestBodyInfo.exteriorColor,
                    "gender": requestBodyInfo.gender,
                    "householdIncome": requestBodyInfo.householdIncome,
                    "id": leadsId,
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
                expect(res.status).to.equal(200)
                leadsId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('cashBuyer', requestBodyInfo.cashBuyer)
                expect(res.body.response).to.have.property('closedAs', requestBodyInfo.closedAs)
                expect(res.body.response).to.have.property('customerName', requestBodyInfo.customerName+'khole')
                expect(res.body.response).to.have.property('customerType', requestBodyInfo.customerType)
                expect(res.body.response).to.have.property('dateOfBirth', requestBodyInfo.dateOfBirth)
                expect(res.body.response).to.have.property('email', requestBodyInfo.email)
                expect(res.body.response).to.have.property('exteriorColor', requestBodyInfo.exteriorColor)
                expect(res.body.response).to.have.property('gender', requestBodyInfo.gender)
                expect(res.body.response).to.have.property('householdIncome', requestBodyInfo.householdIncome)
                expect(res.body.response).to.have.property('id', leadsId)
                expect(res.body.response).to.have.property('identificationNumber', requestBodyInfo.identificationNumber)
                expect(res.body.response).to.have.property('identificationType', requestBodyInfo.identificationType)
                expect(res.body.response).to.have.property('leadType', requestBodyInfo.leadType)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                expect(res.body.response).to.have.property('location', requestBodyInfo.location)
                expect(res.body.response).to.have.property('lostReason', requestBodyInfo.lostReason)
                expect(res.body.response).to.have.property('occupation', requestBodyInfo.occupation)
                expect(res.body.response).to.have.property('orderType', requestBodyInfo.orderType)
                expect(res.body.response).to.have.property('owner', requestBodyInfo.owner)
                expect(res.body.response).to.have.property('phoneNumber', requestBodyInfo.phoneNumber)
                expect(res.body.response).to.have.property('prospectCategory', requestBodyInfo.prospectCategory)
                expect(res.body.response).to.have.property('prospectCreatedOn', requestBodyInfo.prospectCreatedOn)
                expect(res.body.response).to.have.property('prospectId', requestBodyInfo.prospectId)
                expect(res.body.response).to.have.property('prospectStatus', requestBodyInfo.prospectStatus)
                expect(res.body.response).to.have.property('publicRelations', requestBodyInfo.publicRelations)
                expect(res.body.response).to.have.property('purchaseType', requestBodyInfo.purchaseType)
                expect(res.body.response).to.have.property('race', requestBodyInfo.race)
                expect(res.body.response).to.have.property('rcoGenerated', requestBodyInfo.rcoGenerated)
                expect(res.body.response).to.have.property('sellingRegion', requestBodyInfo.sellingRegion)
                expect(res.body.response).to.have.property('source', requestBodyInfo.source)
                expect(res.body.response).to.have.property('status', requestBodyInfo.status)
                expect(res.body.response).to.have.property('subSource', requestBodyInfo.subSource)
                expect(res.body.response).to.have.property('title', requestBodyInfo.title)
                expect(res.body.response).to.have.property('tradeIn', requestBodyInfo.tradeIn)
                expect(res.body.response).to.have.property('variantId', requestBodyInfo.variantId)
            })
        })
        it('TC02-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC03-Negative-Verify the response code, if send the request with  invalid Lead ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId+'1',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": requestBodyInfo.active,
                    "cashBuyer": requestBodyInfo.cashBuyer,
                    "closedAs": requestBodyInfo.closedAs,
                    "customerName": requestBodyInfo.customerName+'khole',
                    "customerType": requestBodyInfo.customerType,
                    "dateOfBirth": requestBodyInfo.dateOfBirth,
                    "email": requestBodyInfo.email,
                    "exteriorColor": requestBodyInfo.exteriorColor,
                    "gender": requestBodyInfo.gender,
                    "householdIncome": requestBodyInfo.householdIncome,
                    "id": leadsId,
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
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Negative-Verify the response code if send the request with blank request fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadsId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": "",
                    "cashBuyer": "",
                    "closedAs": "",
                    "customerName": "",
                    "customerType": "",
                    "dateOfBirth": "",
                    "email": "",
                    "exteriorColor": "",
                    "gender": "",
                    "householdIncome": "",
                    "id": "",
                    "identificationNumber": "",
                    "identificationType": "",
                    "leadType": "",
                    "location": "",
                    "lostReason": "",
                    "occupation": "",
                    "orderType": "",
                    "owner": "",
                    "phoneNumber": "",
                    "prospectCategory": "",
                    "prospectCreatedOn": "",
                    "prospectId": "",
                    "prospectStatus": "",
                    "publicRelations": "",
                    "purchaseType": "",
                    "race": "",
                    "rcoGenerated": "",
                    "sellingRegion": "",
                    "source": "",
                    "status": "",
                    "subSource": "",
                    "title": "",
                    "tradeIn": "",
                    "variantId": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+leadsId04,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                    "active": requestBodyInfo.active,
                    "cashBuyer": requestBodyInfo.cashBuyer,
                    "closedAs": requestBodyInfo.closedAs,
                    "customerName": requestBodyInfo.customerName+'khole',
                    "customerType": requestBodyInfo.customerType,
                    "dateOfBirth": requestBodyInfo.dateOfBirth,
                    "email": requestBodyInfo.email,
                    "exteriorColor": requestBodyInfo.exteriorColor,
                    "gender": requestBodyInfo.gender,
                    "householdIncome": requestBodyInfo.householdIncome,
                    "id": leadsId04,
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
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.only('Patch Request Convert Lead To Prospect', function(){
        it('TC01-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'PATCH',
                url: commonUrl+'/convertToProspect/'+leadsId,
                qs: {
                    "ignoreRequestBody": false,
                },
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "cashBuyer": requestBodyInfo.cashBuyerPatch,
                    "exteriorColor": requestBodyInfo.exteriorColorPatch,
                    "prospectCategory": requestBodyInfo.prospectCategoryPatch,
                    "prospectStatus": requestBodyInfo.prospectStatusPatch,
                    "purchaseType": requestBodyInfo.purchaseTypePatch,
                    "sellingRegion": requestBodyInfo.sellingRegionPatch,
                    "tradeIn": requestBodyInfo.tradeInPatch
                  },
                  
            }).then(function(res){
                
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('cashBuyer', requestBodyInfo.cashBuyerPatch)
                expect(res.body.response).to.have.property('exteriorColor', requestBodyInfo.exteriorColorPatch)
                expect(res.body.response).to.have.property('prospectCategory', requestBodyInfo.prospectCategoryPatch)
                expect(res.body.response).to.have.property('prospectStatus', requestBodyInfo.prospectStatusPatch)
                expect(res.body.response).to.have.property('purchaseType', requestBodyInfo.purchaseTypePatch)
                expect(res.body.response).to.have.property('sellingRegion', requestBodyInfo.sellingRegionPatch)
                expect(res.body.response).to.have.property('tradeIn', requestBodyInfo.tradeInPatch)
            })
        })
        it('TC02-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC03-Negative-Verify the status Code if send the request with invalid Lead ID', function(){
            cy.request({
                method: 'PATCH',
                url: commonUrl+'/convertToProspect/'+leadsId+'1',
                qs: {
                    "ignoreRequestBody": false,
                },
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "cashBuyer": requestBodyInfo.cashBuyerPatch,
                    "exteriorColor": requestBodyInfo.exteriorColorPatch,
                    "prospectCategory": requestBodyInfo.prospectCategoryPatch,
                    "prospectStatus": requestBodyInfo.prospectStatusPatch,
                    "purchaseType": requestBodyInfo.purchaseTypePatch,
                    "sellingRegion": requestBodyInfo.sellingRegionPatch,
                    "tradeIn": requestBodyInfo.tradeInPatch
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Negative-Verify the status code if send the request with blank fields', function(){
            cy.request({
                method: 'PATCH',
                url: commonUrl+'/convertToProspect/'+leadsId,
                qs: {
                    "ignoreRequestBody": false,
                },
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "cashBuyer": "",
                    "exteriorColor": "",
                    "prospectCategory": "",
                    "prospectStatus": "",
                    "purchaseType": "",
                    "sellingRegion": "",
                    "tradeIn": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PATCH',
                url: commonUrl+'/convertToProspect/'+leadsId04,
                qs: {
                    "ignoreRequestBody": false,
                },
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "cashBuyer": requestBodyInfo.cashBuyerPatch,
                    "exteriorColor": requestBodyInfo.exteriorColorPatch,
                    "prospectCategory": requestBodyInfo.prospectCategoryPatch,
                    "prospectStatus": requestBodyInfo.prospectStatusPatch,
                    "purchaseType": requestBodyInfo.purchaseTypePatch,
                    "sellingRegion": requestBodyInfo.sellingRegionPatch,
                    "tradeIn": requestBodyInfo.tradeInPatch
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('', function(){
        it('', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+leadsId04,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})