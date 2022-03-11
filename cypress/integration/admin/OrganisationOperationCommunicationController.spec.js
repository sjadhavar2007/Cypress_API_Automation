///<reference types="cypress"/>
import getOrgId from './UtilityOrganisationStructure/getOrgId'
describe('DMS-870-Organisation Operation Communication Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var organisationStructureId;
    var orgId;
    var requestBodyInfoNew;
    var orgOperationId;
    var orgOperationId09;

    before(function(){
        cy.fixture('admin/OrganisationOperationCommunicationController/url').then(function(data){
            commonUrl=data.URL_OrganisationOperationCommunicationController
        })
        cy.fixture('admin/OrganisationStructure/OrganisationStructure_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/OrganisationOperationCommunicationController/osBody').then(function(data){
            requestBodyInfo=data
        })
        cy.fixture('admin/OrganisationOperationCommunicationController/body').then(function(data){
            requestBodyInfoNew=data
        })

        const orgid=new getOrgId();
        orgId=orgid.getOrgId();
    })
    describe('', function(){
        it('TCXX-Positive-Post', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                        "accountingBranchCode": requestBodyInfo.accountingBranchCode,
                        "accountingCommCode": requestBodyInfo.accountingCommCode,
                        "active": requestBodyInfo.active,
                        "areaOperationSales": requestBodyInfo.areaOperationSales,
                        "areaOperationService": requestBodyInfo.areaOperationService,
                        "brand": requestBodyInfo.brand,
                        "centralizedStockyardFlag": requestBodyInfo.centralizedStockyardFlag,
                        "customDate": requestBodyInfo.customDate,
                        "customNo": requestBodyInfo.customNo,
                        "dealerAccountingBranchCode": requestBodyInfo.dealerAccountingBranchCode,
                        "dealerFinancialFlag": requestBodyInfo.dealerFinancialFlag,
                        "deliveryWindow": requestBodyInfo.deliveryWindow,
                        "description": requestBodyInfo.description,
                        "financialModel": requestBodyInfo.financialModel,
                        "gstRegNo": requestBodyInfo.gstRegNo,
                        "id": requestBodyInfo.id,
                        "jpgId": requestBodyInfo.jpgId,
                        "name": requestBodyInfo.name,
                        "operationType": requestBodyInfo.operationType,
                        "operationUnits": requestBodyInfo.operationUnits,
                        "orgId": orgId,
                        "orgType": requestBodyInfo.orgType,
                        "parentId": requestBodyInfo.parentId,
                        "pdsFlag": requestBodyInfo.pdsFlag,
                        "pricingRegion": requestBodyInfo.pricingRegion,
                        "regionCode": requestBodyInfo.regionCode,
                        "routeCode": requestBodyInfo.routeCode,
                        "salesTax": requestBodyInfo.salesTax,
                        "sapHrFlag": requestBodyInfo.sapHrFlag,
                        "serviceLabourTax": requestBodyInfo.serviceLabourTax,
                        "serviceOutletMapping": requestBodyInfo.serviceOutletMapping,
                        "sstNo": requestBodyInfo.sstNo,
                        "stateSstNo": requestBodyInfo.stateSstNo,
                        "stockyardCode": requestBodyInfo.stockyardCode,
                        "taxArea": requestBodyInfo.taxArea,
                        "topMarkMapping": requestBodyInfo.topMarkMapping,
                        "vendorCode": requestBodyInfo.vendorCode,
                      },

            }).then(function(res){
                expect(res.status).to.equal(201)
                organisationStructureId=res.body.response.id
            })
        })
    })
    describe('Get Request Organisation Operation Communication', function(){
        it('TC01-Positive-Validate that all the response code & response body parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication'
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
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC02-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC03-Negative-Verify the status code, if user send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'1'+'/org-operation-communication',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Organisation Operation Communication', function(){
        it('TC05-Positive-Verify that the response status & code is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "addressLine1": requestBodyInfoNew.addressLine1,
                      "addressLine2": requestBodyInfoNew.addressLine2,
                      "city": requestBodyInfoNew.city,
                      "email": requestBodyInfoNew.email,
                      "fax": requestBodyInfoNew.fax,
                      "manager": requestBodyInfoNew.manager,
                      "mobile": requestBodyInfoNew.mobile,
                      "operatingUnit": requestBodyInfoNew.operatingUnit,
                      "phone": requestBodyInfoNew.phone,
                      "postCode": requestBodyInfoNew.postCode,
                      "state": requestBodyInfoNew.state,
                      "website": requestBodyInfoNew.website,
                    }
                  ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                orgOperationId=res.body.response.content[0].id
                console.log(orgOperationId)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('id', orgOperationId)
                        expect(res.body.response.content[i]).to.have.property('addressLine1', requestBodyInfoNew.addressLine1)
                        expect(res.body.response.content[i]).to.have.property('addressLine2', requestBodyInfoNew.addressLine2)
                        expect(res.body.response.content[i]).to.have.property('city', requestBodyInfoNew.city)
                        expect(res.body.response.content[i]).to.have.property('email', requestBodyInfoNew.email)
                        expect(res.body.response.content[i]).to.have.property('fax', requestBodyInfoNew.fax)
                        expect(res.body.response.content[i]).to.have.property('manager', requestBodyInfoNew.manager)
                        expect(res.body.response.content[i]).to.have.property('mobile', requestBodyInfoNew.mobile)
                        expect(res.body.response.content[i]).to.have.property('operatingUnit', requestBodyInfoNew.operatingUnit)
                        expect(res.body.response.content[i]).to.have.property('phone', requestBodyInfoNew.phone)
                        expect(res.body.response.content[i]).to.have.property('postCode', requestBodyInfoNew.postCode)
                        expect(res.body.response.content[i]).to.have.property('state', requestBodyInfoNew.state)
                        expect(res.body.response.content[i]).to.have.property('website', requestBodyInfoNew.website)
                        
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC06-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC07-Negative-Verify the status code, if user send the request with invalid id', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'1'+'/org-operation-communication',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "addressLine1": requestBodyInfoNew.addressLine1,
                      "addressLine2": requestBodyInfoNew.addressLine2,
                      "city": requestBodyInfoNew.city,
                      "email": requestBodyInfoNew.email,
                      "fax": requestBodyInfoNew.fax,
                      "manager": requestBodyInfoNew.manager,
                      "mobile": requestBodyInfoNew.mobile,
                      "operatingUnit": requestBodyInfoNew.operatingUnit,
                      "phone": requestBodyInfoNew.phone,
                      "postCode": requestBodyInfoNew.postCode,
                      "state": requestBodyInfoNew.state,
                      "website": requestBodyInfoNew.website,
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC08-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "addressLine1": "",
                      "addressLine2": "",
                      "city": "",
                      "email": "",
                      "fax": "",
                      "manager": "",
                      "mobile": "",
                      "operatingUnit": "",
                      "phone": "",
                      "postCode": "",
                      "state": "",
                      "website": "",
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-Positive-Verify the Response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "addressLine1": requestBodyInfoNew.addressLine1,
                      "addressLine2": requestBodyInfoNew.addressLine2,
                      "city": requestBodyInfoNew.city,
                      "email": requestBodyInfoNew.email,
                      "fax": requestBodyInfoNew.fax,
                      "manager": requestBodyInfoNew.manager,
                      "mobile": requestBodyInfoNew.mobile,
                      "operatingUnit": requestBodyInfoNew.operatingUnit,
                      "phone": requestBodyInfoNew.phone,
                      "postCode": requestBodyInfoNew.postCode,
                      "state": requestBodyInfoNew.state,
                      "website": requestBodyInfoNew.website,
                    }
                  ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                orgOperationId09=res.body.response.content[0].id
            })
        })
    })
    describe('Get Request Organisation Operation Communication ID', function(){
        it('TC10-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: "GET",
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication/'+orgOperationId09,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('id', orgOperationId09)
                expect(res.body.response).to.have.property('addressLine1', requestBodyInfoNew.addressLine1)
                expect(res.body.response).to.have.property('addressLine2', requestBodyInfoNew.addressLine2)
                expect(res.body.response).to.have.property('city', requestBodyInfoNew.city)
                expect(res.body.response).to.have.property('email', requestBodyInfoNew.email)
                expect(res.body.response).to.have.property('fax', requestBodyInfoNew.fax)
                expect(res.body.response).to.have.property('manager', requestBodyInfoNew.manager)
                expect(res.body.response).to.have.property('mobile', requestBodyInfoNew.mobile)
                expect(res.body.response).to.have.property('operatingUnit', requestBodyInfoNew.operatingUnit)
                expect(res.body.response).to.have.property('phone', requestBodyInfoNew.phone)
                expect(res.body.response).to.have.property('postCode', requestBodyInfoNew.postCode)
                expect(res.body.response).to.have.property('state', requestBodyInfoNew.state)
                expect(res.body.response).to.have.property('website', requestBodyInfoNew.website)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC11-NA-Verify that the response is matching with Db or not', function(){

        })
        it('TC12-Negative-Verify the status code if user send the request with invalid ID', function(){
            cy.request({
                method: "GET",
                url: commonUrl+'/'+organisationStructureId+'1'+'/org-operation-communication/'+orgOperationId09,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1  second or not', function(){
            cy.request({
                method: "GET",
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication/'+orgOperationId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Organisation Operation Communication ID', function(){
        it('TC14|TC18-Positive-Verify the status code & response is showing as per swagger or not | Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication/'+orgOperationId09,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.duration).to.lessThan(1000)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('addressLine1', null)
                expect(res.body.response).to.have.property('addressLine2',null)
                expect(res.body.response).to.have.property('city', null)
                expect(res.body.response).to.have.property('email', null)
                expect(res.body.response).to.have.property('fax', null)
                expect(res.body.response).to.have.property('manager', null)
                expect(res.body.response).to.have.property('mobile', null)
                expect(res.body.response).to.have.property('operatingUnit', null)
                expect(res.body.response).to.have.property('phone', null)
                expect(res.body.response).to.have.property('postCode', null)
                expect(res.body.response).to.have.property('state', null)
                expect(res.body.response).to.have.property('website', null)
            })
        })
        it('TC15-Negative-Verify the status code if user send the same request twice for the same Operation Communication ID', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId+'/org-operation-communication/'+orgOperationId09,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-NA-Verify that record for the particualr ID get removed from DB or not', function(){

        })
        it('TC17-Negative-Verify the status code, if user send the request with invalid Org Structure ID', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId+'1'+'/org-operation-communication/'+orgOperationId09,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
    })
    describe('', function(){
        it('TCXX-Postive-Delete', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})