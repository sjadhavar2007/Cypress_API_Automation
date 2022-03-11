///<reference types="cypress"/>

describe('DMS-935-Lead-Lead Details(Lead RCO Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var leadId;
    var paramsInfo;
    var requestBody;
    var rcoId;
        before(function(){
            cy.fixture('leads/DMS_935/DMS_935_Url').then(function(data){
                commonUrl = data.URL_LeadRCOController
            })
            cy.fixture('leads/LeadController/Lead_headers').then(function(data){
                headersInfo = data
            })
            cy.fixture('leads/LeadController/Lead_Body').then(function(data){
                requestBodyInfo = data
            })
            cy.fixture('leads/DMS_935/DMS_935_params').then(function(data){
                paramsInfo = data
            })
            cy.fixture('leads/DMS_935/DMS_935_body').then(function(data){
                requestBody = data
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
    describe('Get Request leads RCO', function(){
        it('TC01-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'/rco',
                qs: {
                    "isRco": paramsInfo.isRco,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    console.log(this.contentLength)
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
        it('TC02-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC03-Negative-Verify the response code, send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'1/rco',
                qs: {
                    "isRco": paramsInfo.isRco,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the Response Duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'/rco',
                qs: {
                    "isRco": paramsInfo.isRco,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Lead RCO', function(){
        it('TC05-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "bookingFee": requestBody.bookingFee,
                    "colorCharges": requestBody.colorCharges,
                    "downPaymentPromotionAmount": requestBody.downPaymentPromotionAmount,
                    "dvr": requestBody.dvr,
                    "estimatedTradeIn": requestBody.estimatedTradeIn,
                    "exemptionType": requestBody.exemptionType,
                    "exteriorColor": requestBody.exteriorColor,
                    "finalDownPayment": requestBody.finalDownPayment,
                    "financialCompanies": requestBody.financialCompanies,
                    "hpCompany": requestBody.hpCompany,
                    "hpPackage": requestBody.hpPackage,
                    "id": requestBody.id,
                    "insurance": requestBody.insurance,
                    "leadRCOAccessories": [
                        {
                            "accessoryId": requestBody.accessoryId1,
                            "id": requestBody.id1,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        },
                        {
                            "accessoryId":requestBody.accessoryId2,
                            "id": requestBody.id2,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        }
                    ],
                    "leadRCOPrepaidPackages": [
                        {
                            "id": requestBody.accessoryId3,
                            "prepaidPackageId": requestBody.id3,
                            "price": requestBody.price3,
                            "rcoId": requestBody.rcoId3,
                        },
                        {
                            "id": requestBody.id4,
                            "prepaidPackageId": requestBody.prepaidPackageId4,
                            "price": requestBody.price4,
                            "rcoId": requestBody.rcoId4,
                        }
                    ],
                    "leadRCOPromotions": [
                        {
                            "id": requestBody.id5,
                            "promotionId": requestBody.promotionId5,
                            "rcoId": requestBody.rcoId5,
                        },
                        {
                            "id": requestBody.id6,
                            "promotionId": requestBody.promotionId6,
                            "rcoId": requestBody.rcoId6,
                        }
                    ],
                    "loanInterest":requestBody.loanInterest,
                    "loanPercentage": requestBody.loanPercentage,
                    "loanYear": requestBody.loanYear,
                    "monthlyInstalment": requestBody.monthlyInstalment,
                    "navRevCamera": requestBody.navRevCamera,
                    "orderType": requestBody.orderType,
                    "promotion": requestBody.promotion,
                    "purchaseType": requestBody.purchaseType,
                    "retailSellingPrice": requestBody.retailSellingPrice,
                    "sellingPrice": requestBody.sellingPrice,
                    "settlementAmount": requestBody.settlementAmount,
                    "specialPricingRequest": requestBody.specialPricingRequest,
                    "taxExemption": requestBody.taxExemption,
                    "tradeIn": requestBody.tradeIn,
                    "valueAddedCharges": requestBody.valueAddedCharges,
                    "variantId": requestBody.variantId,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                rcoId = res.body.response.id
                console.log(res.body)
                expect(res.body.response).to.have.property('bookingFee', requestBody.bookingFee)
                expect(res.body.response).to.have.property('colorCharges', requestBody.colorCharges)
                expect(res.body.response).to.have.property('downPaymentPromotionAmount', requestBody.downPaymentPromotionAmount)
                expect(res.body.response).to.have.property('dvr', requestBody.dvr)
                expect(res.body.response).to.have.property('estimatedTradeIn', requestBody.estimatedTradeIn)
                expect(res.body.response).to.have.property('exemptionType', requestBody.exemptionType)
                expect(res.body.response).to.have.property('exteriorColor', requestBody.exteriorColor)
                expect(res.body.response).to.have.property('finalDownPayment', requestBody.finalDownPayment)
                expect(res.body.response).to.have.property('financialCompanies', requestBody.financialCompanies)
                expect(res.body.response).to.have.property('hpCompany', requestBody.hpCompany)
                expect(res.body.response).to.have.property('hpPackage', requestBody.hpPackage)
                expect(res.body.response).to.have.property('id', rcoId)
                expect(res.body.response).to.have.property('insurance', requestBody.insurance)
                expect(res.body.response).to.have.property('loanInterest', requestBody.loanInterest)
                expect(res.body.response).to.have.property('loanPercentage', requestBody.loanPercentage)
                expect(res.body.response).to.have.property('loanYear', requestBody.loanYear)
                expect(res.body.response).to.have.property('monthlyInstalment', requestBody.monthlyInstalment)
                expect(res.body.response).to.have.property('navRevCamera', requestBody.navRevCamera)
                expect(res.body.response).to.have.property('orderType', requestBody.orderType)
                expect(res.body.response).to.have.property('promotion', requestBody.promotion)
                expect(res.body.response).to.have.property('purchaseType', requestBody.purchaseType)
                expect(res.body.response).to.have.property('retailSellingPrice', requestBody.retailSellingPrice)
                expect(res.body.response).to.have.property('sellingPrice', requestBody.sellingPrice)
                expect(res.body.response).to.have.property('settlementAmount', requestBody.settlementAmount)
                expect(res.body.response).to.have.property('specialPricingRequest', requestBody.specialPricingRequest)
                expect(res.body.response).to.have.property('taxExemption', requestBody.taxExemption)
                expect(res.body.response).to.have.property('tradeIn', requestBody.tradeIn)
                expect(res.body.response).to.have.property('valueAddedCharges', requestBody.valueAddedCharges)
                expect(res.body.response).to.have.property('variantId', requestBody.variantId)
            })
        })
        it('TC06-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC07-Negative-Verify the response code, send the request with Invalid Lead ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'11/rco',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "bookingFee": requestBody.bookingFee,
                    "colorCharges": requestBody.colorCharges,
                    "downPaymentPromotionAmount": requestBody.downPaymentPromotionAmount,
                    "dvr": requestBody.dvr,
                    "estimatedTradeIn": requestBody.estimatedTradeIn,
                    "exemptionType": requestBody.exemptionType,
                    "exteriorColor": requestBody.exteriorColor,
                    "finalDownPayment": requestBody.finalDownPayment,
                    "financialCompanies": requestBody.financialCompanies,
                    "hpCompany": requestBody.hpCompany,
                    "hpPackage": requestBody.hpPackage,
                    "id": requestBody.id,
                    "insurance": requestBody.insurance,
                    "leadRCOAccessories": [
                        {
                            "accessoryId": requestBody.accessoryId1,
                            "id": requestBody.id1,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        },
                        {
                            "accessoryId":requestBody.accessoryId2,
                            "id": requestBody.id2,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        }
                    ],
                    "leadRCOPrepaidPackages": [
                        {
                            "id": requestBody.accessoryId3,
                            "prepaidPackageId": requestBody.id3,
                            "price": requestBody.price3,
                            "rcoId": requestBody.rcoId3,
                        },
                        {
                            "id": requestBody.id4,
                            "prepaidPackageId": requestBody.prepaidPackageId4,
                            "price": requestBody.price4,
                            "rcoId": requestBody.rcoId4,
                        }
                    ],
                    "leadRCOPromotions": [
                        {
                            "id": requestBody.id5,
                            "promotionId": requestBody.promotionId5,
                            "rcoId": requestBody.rcoId5,
                        },
                        {
                            "id": requestBody.id6,
                            "promotionId": requestBody.promotionId6,
                            "rcoId": requestBody.rcoId6,
                        }
                    ],
                    "loanInterest":requestBody.loanInterest,
                    "loanPercentage": requestBody.loanPercentage,
                    "loanYear": requestBody.loanYear,
                    "monthlyInstalment": requestBody.monthlyInstalment,
                    "navRevCamera": requestBody.navRevCamera,
                    "orderType": requestBody.orderType,
                    "promotion": requestBody.promotion,
                    "purchaseType": requestBody.purchaseType,
                    "retailSellingPrice": requestBody.retailSellingPrice,
                    "sellingPrice": requestBody.sellingPrice,
                    "settlementAmount": requestBody.settlementAmount,
                    "specialPricingRequest": requestBody.specialPricingRequest,
                    "taxExemption": requestBody.taxExemption,
                    "tradeIn": requestBody.tradeIn,
                    "valueAddedCharges": requestBody.valueAddedCharges,
                    "variantId": requestBody.variantId,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-Positive-Verify the Response Duration is less than 1 Second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+leadId+'/rco',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "bookingFee": requestBody.bookingFee,
                    "colorCharges": requestBody.colorCharges,
                    "downPaymentPromotionAmount": requestBody.downPaymentPromotionAmount,
                    "dvr": requestBody.dvr,
                    "estimatedTradeIn": requestBody.estimatedTradeIn,
                    "exemptionType": requestBody.exemptionType,
                    "exteriorColor": requestBody.exteriorColor,
                    "finalDownPayment": requestBody.finalDownPayment,
                    "financialCompanies": requestBody.financialCompanies,
                    "hpCompany": requestBody.hpCompany,
                    "hpPackage": requestBody.hpPackage,
                    "id": requestBody.id,
                    "insurance": requestBody.insurance,
                    "leadRCOAccessories": [
                        {
                            "accessoryId": requestBody.accessoryId1,
                            "id": requestBody.id1,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        },
                        {
                            "accessoryId":requestBody.accessoryId2,
                            "id": requestBody.id2,
                            "price": requestBody.price1,
                            "rcoId": requestBody.rcoId1,
                        }
                    ],
                    "leadRCOPrepaidPackages": [
                        {
                            "id": requestBody.accessoryId3,
                            "prepaidPackageId": requestBody.id3,
                            "price": requestBody.price3,
                            "rcoId": requestBody.rcoId3,
                        },
                        {
                            "id": requestBody.id4,
                            "prepaidPackageId": requestBody.prepaidPackageId4,
                            "price": requestBody.price4,
                            "rcoId": requestBody.rcoId4,
                        }
                    ],
                    "leadRCOPromotions": [
                        {
                            "id": requestBody.id5,
                            "promotionId": requestBody.promotionId5,
                            "rcoId": requestBody.rcoId5,
                        },
                        {
                            "id": requestBody.id6,
                            "promotionId": requestBody.promotionId6,
                            "rcoId": requestBody.rcoId6,
                        }
                    ],
                    "loanInterest":requestBody.loanInterest,
                    "loanPercentage": requestBody.loanPercentage,
                    "loanYear": requestBody.loanYear,
                    "monthlyInstalment": requestBody.monthlyInstalment,
                    "navRevCamera": requestBody.navRevCamera,
                    "orderType": requestBody.orderType,
                    "promotion": requestBody.promotion,
                    "purchaseType": requestBody.purchaseType,
                    "retailSellingPrice": requestBody.retailSellingPrice,
                    "sellingPrice": requestBody.sellingPrice,
                    "settlementAmount": requestBody.settlementAmount,
                    "specialPricingRequest": requestBody.specialPricingRequest,
                    "taxExemption": requestBody.taxExemption,
                    "tradeIn": requestBody.tradeIn,
                    "valueAddedCharges": requestBody.valueAddedCharges,
                    "variantId": requestBody.variantId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)               
            })
        })
    })
    describe('Get Request Lead RCOs', function(){
        it('TC09-Positive-Verify that the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'/rco/'+rcoId,  
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('bookingFee', requestBody.bookingFee)
                expect(res.body.response).to.have.property('colorCharges', requestBody.colorCharges)
                expect(res.body.response).to.have.property('downPaymentPromotionAmount', requestBody.downPaymentPromotionAmount)
                expect(res.body.response).to.have.property('dvr', requestBody.dvr)
                expect(res.body.response).to.have.property('estimatedTradeIn', requestBody.estimatedTradeIn)
                expect(res.body.response).to.have.property('exemptionType', requestBody.exemptionType)
                expect(res.body.response).to.have.property('exteriorColor', requestBody.exteriorColor)
                expect(res.body.response).to.have.property('finalDownPayment', requestBody.finalDownPayment)
                expect(res.body.response).to.have.property('financialCompanies', requestBody.financialCompanies)
                expect(res.body.response).to.have.property('hpCompany', requestBody.hpCompany)
                expect(res.body.response).to.have.property('hpPackage', requestBody.hpPackage)
                expect(res.body.response).to.have.property('id', rcoId)
                expect(res.body.response).to.have.property('insurance', requestBody.insurance)
                expect(res.body.response).to.have.property('loanInterest', requestBody.loanInterest)
                expect(res.body.response).to.have.property('loanPercentage', requestBody.loanPercentage)
                expect(res.body.response).to.have.property('loanYear', requestBody.loanYear)
                expect(res.body.response).to.have.property('monthlyInstalment', requestBody.monthlyInstalment)
                expect(res.body.response).to.have.property('navRevCamera', requestBody.navRevCamera)
                expect(res.body.response).to.have.property('orderType', requestBody.orderType)
                expect(res.body.response).to.have.property('promotion', requestBody.promotion)
                expect(res.body.response).to.have.property('purchaseType', requestBody.purchaseType)
                expect(res.body.response).to.have.property('retailSellingPrice', requestBody.retailSellingPrice)
                expect(res.body.response).to.have.property('sellingPrice', requestBody.sellingPrice)
                expect(res.body.response).to.have.property('settlementAmount', requestBody.settlementAmount)
                expect(res.body.response).to.have.property('specialPricingRequest', requestBody.specialPricingRequest)
                expect(res.body.response).to.have.property('taxExemption', requestBody.taxExemption)
                expect(res.body.response).to.have.property('tradeIn', requestBody.tradeIn)
                expect(res.body.response).to.have.property('valueAddedCharges', requestBody.valueAddedCharges)
                expect(res.body.response).to.have.property('variantId', requestBody.variantId)
            })
        })
        it('TC10-NA-Verify the response is getting match with DB or not', function(){

        })
        it('TC11-Negative-Verify the response code, send the request with Invalid RCO ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'/rco/'+rcoId+12,
                failOnStatusCode: false,  
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC12-Positive-Verify the Response Duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+leadId+'/rco/'+rcoId,  
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})