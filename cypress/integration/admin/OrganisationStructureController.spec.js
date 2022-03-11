///<reference types="cypress"/>
import getOrgId from './UtilityOrganisationStructure/getOrgId'
describe('Organisation Structure Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var orgId;
    var updateOrgId;
    var organisationStructureId;
    var organisationStructureId09;
    before(function(){
        cy.fixture('admin/OrganisationStructure/OrganisationStructure_url').then(function(data){
            commonUrl=data.URL_OrganisationStructure
        })
        cy.fixture('admin/OrganisationStructure/OrganisationStructure_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/OrganisationStructure/OrganisationStructure_body').then(function(data){
            requestBodyInfo=data
        })
        const orgid=new getOrgId();
        orgId=orgid.getOrgId();
        updateOrgId=orgid.getUpdateOrgId();
    })
    describe('Get Request Organisation Structure', function(){ 
        it('TC01-Positive-Validate that all the response code & response body parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('accountingBranchCode')
                    expect(res.body.response.content[i]).to.have.property('accountingCommCode')
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('areaOperationSales')
                    expect(res.body.response.content[i]).to.have.property('areaOperationService')
                    expect(res.body.response.content[i]).to.have.property('brand')
                    expect(res.body.response.content[i]).to.have.property('centralizedStockyardFlag')
                    this.children=res.body.response.content[i].children
                    this.childrenLength=this.children.length
                    if (this.childrenLength<=0) {
                        expect(res.body.response.content[i].children.length).to.equal(0)
                    } else {
                        for(let j=0; j<this.childrenLength; j++){
                    expect(res.body.response.content[i].children[j]).to.have.property('accountingBranchCode')
                    expect(res.body.response.content[i].children[j]).to.have.property('accountingCommCode')
                     expect(res.body.response.content[i].children[j]).to.have.property('active')
                    expect(res.body.response.content[i].children[j]).to.have.property('areaOperationSales')
                    expect(res.body.response.content[i].children[j]).to.have.property('areaOperationService')
                    expect(res.body.response.content[i].children[j]).to.have.property('brand')
                    expect(res.body.response.content[i].children[j]).to.have.property('centralizedStockyardFlag')
                    expect(res.body.response.content[i].children[j]).to.have.property('customDate')
                    expect(res.body.response.content[i].children[j]).to.have.property('customNo')
                    expect(res.body.response.content[i].children[j]).to.have.property('dealerAccountingBranchCode')
                    expect(res.body.response.content[i].children[j]).to.have.property('dealerFinancialFlag')
                    expect(res.body.response.content[i].children[j]).to.have.property('deliveryWindow')
                    expect(res.body.response.content[i].children[j]).to.have.property('description')
                    expect(res.body.response.content[i].children[j]).to.have.property('financialModel')
                    expect(res.body.response.content[i].children[j]).to.have.property('gstRegNo')
                    expect(res.body.response.content[i].children[j]).to.have.property('id')
                    expect(res.body.response.content[i].children[j]).to.have.property('jpgId')
                    expect(res.body.response.content[i].children[j]).to.have.property('name')
                    expect(res.body.response.content[i].children[j]).to.have.property('operationType')
                    expect(res.body.response.content[i].children[j]).to.have.property('operationUnits')
                    expect(res.body.response.content[i].children[j]).to.have.property('orgId')
                    expect(res.body.response.content[i].children[j]).to.have.property('orgType')
                    expect(res.body.response.content[i].children[j]).to.have.property('parentId')
                    expect(res.body.response.content[i].children[j]).to.have.property('parentName')
                    expect(res.body.response.content[i].children[j]).to.have.property('pdsFlag')
                    expect(res.body.response.content[i].children[j]).to.have.property('pricingRegion')
                    expect(res.body.response.content[i].children[j]).to.have.property('regionCode')
                    expect(res.body.response.content[i].children[j]).to.have.property('routeCode')
                    expect(res.body.response.content[i].children[j]).to.have.property('salesTax')
                    expect(res.body.response.content[i].children[j]).to.have.property('sapHrFlag')
                    expect(res.body.response.content[i].children[j]).to.have.property('serviceLabourTax')
                    expect(res.body.response.content[i].children[j]).to.have.property('serviceOutletMapping')
                    expect(res.body.response.content[i].children[j]).to.have.property('sstNo')
                    expect(res.body.response.content[i].children[j]).to.have.property('stateSstNo')
                    expect(res.body.response.content[i].children[j]).to.have.property('stockyardCode')
                    expect(res.body.response.content[i].children[j]).to.have.property('taxArea')
                    expect(res.body.response.content[i].children[j]).to.have.property('topMarkMapping')
                    expect(res.body.response.content[i].children[j]).to.have.property('vendorCode')
                        }
                    }
                    expect(res.body.response.content[i]).to.have.property('customDate')
                    expect(res.body.response.content[i]).to.have.property('customNo')
                    expect(res.body.response.content[i]).to.have.property('dealerAccountingBranchCode')
                    expect(res.body.response.content[i]).to.have.property('dealerFinancialFlag')
                    expect(res.body.response.content[i]).to.have.property('deliveryWindow')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('financialModel')
                    expect(res.body.response.content[i]).to.have.property('gstRegNo')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('jpgId')
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('operationType')
                    expect(res.body.response.content[i]).to.have.property('operationUnits')
                    expect(res.body.response.content[i]).to.have.property('orgId')
                    expect(res.body.response.content[i]).to.have.property('orgType')
                    expect(res.body.response.content[i]).to.have.property('parentId')
                    expect(res.body.response.content[i]).to.have.property('parentName')
                    expect(res.body.response.content[i]).to.have.property('pdsFlag')
                    expect(res.body.response.content[i]).to.have.property('pricingRegion')
                    expect(res.body.response.content[i]).to.have.property('regionCode')
                    expect(res.body.response.content[i]).to.have.property('routeCode')
                    expect(res.body.response.content[i]).to.have.property('salesTax')
                    expect(res.body.response.content[i]).to.have.property('sapHrFlag')
                    expect(res.body.response.content[i]).to.have.property('serviceLabourTax')
                    expect(res.body.response.content[i]).to.have.property('serviceOutletMapping')
                    expect(res.body.response.content[i]).to.have.property('sstNo')
                    expect(res.body.response.content[i]).to.have.property('stateSstNo')
                    expect(res.body.response.content[i]).to.have.property('stockyardCode')
                    expect(res.body.response.content[i]).to.have.property('taxArea')
                    expect(res.body.response.content[i]).to.have.property('topMarkMapping')
                    expect(res.body.response.content[i]).to.have.property('vendorCode') 
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let k=0; k<this.linksLength; k++)
                    {
                        expect(res.body.response.content[i].links[k]).to.have.property('rel')
                        expect(res.body.response.content[i].links[k]).to.have.property('href')
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC03-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Organisation Structure', function(){
        it('TC04-Positive-Verify that the response status code & body is as per the swagger or not', function(){
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
                expect(res.body.response).to.have.property('accountingBranchCode', requestBodyInfo.accountingBranchCode)
                expect(res.body.response).to.have.property('accountingCommCode', requestBodyInfo.accountingCommCode)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('areaOperationSales', requestBodyInfo.areaOperationSales)
                expect(res.body.response).to.have.property('areaOperationService', requestBodyInfo.areaOperationService)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brand)
                expect(res.body.response).to.have.property('centralizedStockyardFlag', requestBodyInfo.centralizedStockyardFlag)
                expect(res.body.response).to.have.property('customDate', requestBodyInfo.customDate)
                expect(res.body.response).to.have.property('customNo', requestBodyInfo.customNo)
                expect(res.body.response).to.have.property('dealerAccountingBranchCode', requestBodyInfo.dealerAccountingBranchCode)
                expect(res.body.response).to.have.property('dealerFinancialFlag', requestBodyInfo.dealerFinancialFlag)
                expect(res.body.response).to.have.property('deliveryWindow', requestBodyInfo.deliveryWindow)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('financialModel', requestBodyInfo.financialModel)
                expect(res.body.response).to.have.property('gstRegNo', requestBodyInfo.gstRegNo)
                expect(res.body.response).to.have.property('id', organisationStructureId)
                expect(res.body.response).to.have.property('jpgId', requestBodyInfo.jpgId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                expect(res.body.response).to.have.property('operationType', requestBodyInfo.operationType)
                expect(res.body.response.operationUnits).to.not.equal(null)
                expect(res.body.response).to.have.property('orgId', orgId)
                expect(res.body.response).to.have.property('orgType', requestBodyInfo.orgType)
                expect(res.body.response).to.have.property('parentId', requestBodyInfo.parentId)
                expect(res.body.response).to.have.property('pdsFlag', requestBodyInfo.pdsFlag)
                expect(res.body.response).to.have.property('pricingRegion', requestBodyInfo.pricingRegion)
                expect(res.body.response).to.have.property('regionCode', requestBodyInfo.regionCode)
                expect(res.body.response).to.have.property('routeCode', requestBodyInfo.routeCode)
                expect(res.body.response).to.have.property('salesTax', requestBodyInfo.salesTax)
                expect(res.body.response).to.have.property('sapHrFlag', requestBodyInfo.sapHrFlag)
                expect(res.body.response).to.have.property('serviceLabourTax', requestBodyInfo.serviceLabourTax)
                expect(res.body.response).to.have.property('serviceOutletMapping', requestBodyInfo.serviceOutletMapping)
                expect(res.body.response).to.have.property('sstNo', requestBodyInfo.sstNo)
                expect(res.body.response).to.have.property('stateSstNo', requestBodyInfo.stateSstNo)
                expect(res.body.response).to.have.property('stockyardCode', requestBodyInfo.stockyardCode)
                expect(res.body.response).to.have.property('taxArea', requestBodyInfo.taxArea)
                expect(res.body.response).to.have.property('topMarkMapping', requestBodyInfo.topMarkMapping)
                expect(res.body.response).to.have.property('vendorCode', requestBodyInfo.vendorCode)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC05-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC06-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "accountingBranchCode": "",
                    "accountingCommCode": "",
                    "active": "",
                    "areaOperationSales": "",
                    "areaOperationService": "",
                    "brand": "",
                    "centralizedStockyardFlag": "",
                    "customDate": "",
                    "customNo": "",
                    "dealerAccountingBranchCode": "",
                    "dealerFinancialFlag": "",
                    "deliveryWindow": "",
                    "description": "",
                    "financialModel": "",
                    "gstRegNo": "",
                    "id": "",
                    "jpgId": "",
                    "name": "",
                    "operationType": "",
                    "operationUnits": "",
                    "orgId": "",
                    "orgType": "",
                    "parentId": "",
                    "pdsFlag": "",
                    "pricingRegion": "",
                    "regionCode": "",
                    "routeCode": "",
                    "salesTax": "",
                    "sapHrFlag": "",
                    "serviceLabourTax": "",
                    "serviceOutletMapping": "",
                    "sstNo": "",
                    "stateSstNo": "",
                    "stockyardCode": "",
                    "taxArea": "",
                    "topMarkMapping": "",
                    "vendorCode": "",
                  },
                failOnStatusCode: false,           
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Negative-Verify that two record using same request can be created or not', function(){
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
                failOnStatusCode: false,           
            }).then(function(res){
                expect(res.status).to.equal(422)
            })
        })
        it('TC08-Positive-Verify the Response duration is less than 1 seocnd or not', function(){
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
                    "orgId": updateOrgId,
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
                expect(res.duration).to.lessThan(1000)
                organisationStructureId09=res.body.response.id
            })
        })
    })
    describe('Put Request Organisation Structure ID', function(){
        it('TC09-Positive-Verify the response code for valid ORG ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: "PUT",
                url: commonUrl+'/'+organisationStructureId,
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
                    "id": organisationStructureId,
                    "jpgId": requestBodyInfo.jpgId,
                    "name": requestBodyInfo.name+'d',
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
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('accountingBranchCode', requestBodyInfo.accountingBranchCode)
                expect(res.body.response).to.have.property('accountingCommCode', requestBodyInfo.accountingCommCode)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('areaOperationSales', requestBodyInfo.areaOperationSales)
                expect(res.body.response).to.have.property('areaOperationService', requestBodyInfo.areaOperationService)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brand)
                expect(res.body.response).to.have.property('centralizedStockyardFlag', requestBodyInfo.centralizedStockyardFlag)
                expect(res.body.response).to.have.property('customDate', requestBodyInfo.customDate)
                expect(res.body.response).to.have.property('customNo', requestBodyInfo.customNo)
                expect(res.body.response).to.have.property('dealerAccountingBranchCode', requestBodyInfo.dealerAccountingBranchCode)
                expect(res.body.response).to.have.property('dealerFinancialFlag', requestBodyInfo.dealerFinancialFlag)
                expect(res.body.response).to.have.property('deliveryWindow', requestBodyInfo.deliveryWindow)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('financialModel', requestBodyInfo.financialModel)
                expect(res.body.response).to.have.property('gstRegNo', requestBodyInfo.gstRegNo)
                expect(res.body.response).to.have.property('id', organisationStructureId)
                expect(res.body.response).to.have.property('jpgId', requestBodyInfo.jpgId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name+'d')
                expect(res.body.response).to.have.property('operationType', requestBodyInfo.operationType)
                expect(res.body.response.operationUnits).to.not.equal(null)
                expect(res.body.response).to.have.property('orgId', orgId)
                expect(res.body.response).to.have.property('orgType', requestBodyInfo.orgType)
                expect(res.body.response).to.have.property('parentId', requestBodyInfo.parentId)
                expect(res.body.response).to.have.property('pdsFlag', requestBodyInfo.pdsFlag)
                expect(res.body.response).to.have.property('pricingRegion', requestBodyInfo.pricingRegion)
                expect(res.body.response).to.have.property('regionCode', requestBodyInfo.regionCode)
                expect(res.body.response).to.have.property('routeCode', requestBodyInfo.routeCode)
                expect(res.body.response).to.have.property('salesTax', requestBodyInfo.salesTax)
                expect(res.body.response).to.have.property('sapHrFlag', requestBodyInfo.sapHrFlag)
                expect(res.body.response).to.have.property('serviceLabourTax', requestBodyInfo.serviceLabourTax)
                expect(res.body.response).to.have.property('serviceOutletMapping', requestBodyInfo.serviceOutletMapping)
                expect(res.body.response).to.have.property('sstNo', requestBodyInfo.sstNo)
                expect(res.body.response).to.have.property('stateSstNo', requestBodyInfo.stateSstNo)
                expect(res.body.response).to.have.property('stockyardCode', requestBodyInfo.stockyardCode)
                expect(res.body.response).to.have.property('taxArea', requestBodyInfo.taxArea)
                expect(res.body.response).to.have.property('topMarkMapping', requestBodyInfo.topMarkMapping)
                expect(res.body.response).to.have.property('vendorCode', requestBodyInfo.vendorCode)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC10-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC11-Negative-Verify the status code if user send request with invalid Organisation structure ID', function(){
            cy.request({
                method: "PUT",
                url: commonUrl+'/'+organisationStructureId+'1',
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
                    "id": organisationStructureId,
                    "jpgId": requestBodyInfo.jpgId,
                    "name": requestBodyInfo.name+'d',
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
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC12-Negative-Verify the status code if user send the request with blank fields', function(){
            cy.request({
                method: "PUT",
                url: commonUrl+'/'+organisationStructureId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "accountingBranchCode": "",
                    "accountingCommCode": "",
                    "active": "",
                    "areaOperationSales": "",
                    "areaOperationService": "",
                    "brand": "",
                    "centralizedStockyardFlag": "",
                    "customDate": "",
                    "customNo": "",
                    "dealerAccountingBranchCode": "",
                    "dealerFinancialFlag": "",
                    "deliveryWindow": "",
                    "description": "",
                    "financialModel": "",
                    "gstRegNo": "",
                    "id": "",
                    "jpgId": "",
                    "name": "",
                    "operationType": "",
                    "operationUnits": "",
                    "orgId": "",
                    "orgType": "",
                    "parentId": "",
                    "pdsFlag": "",
                    "pricingRegion": "",
                    "regionCode": "",
                    "routeCode": "",
                    "salesTax": "",
                    "sapHrFlag": "",
                    "serviceLabourTax": "",
                    "serviceOutletMapping": "",
                    "sstNo": "",
                    "stateSstNo": "",
                    "stockyardCode": "",
                    "taxArea": "",
                    "topMarkMapping": "",
                    "vendorCode": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1 seocnd or not', function(){
            cy.request({
                method: "PUT",
                url: commonUrl+'/'+organisationStructureId09,
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
                    "id": organisationStructureId09,
                    "jpgId": requestBodyInfo.jpgId,
                    "name": requestBodyInfo.name+'d',
                    "operationType": requestBodyInfo.operationType,
                    "operationUnits": requestBodyInfo.operationUnits,
                    "orgId": updateOrgId,
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
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Organisation Structure', function(){
        it('TC14-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/treeView/'+organisationStructureId,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('accountingBranchCode', requestBodyInfo.accountingBranchCode)
                expect(res.body.response).to.have.property('accountingCommCode', requestBodyInfo.accountingCommCode)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('areaOperationSales', requestBodyInfo.areaOperationSales)
                expect(res.body.response).to.have.property('areaOperationService', requestBodyInfo.areaOperationService)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brand)
                expect(res.body.response).to.have.property('centralizedStockyardFlag', requestBodyInfo.centralizedStockyardFlag)
                expect(res.body.response).to.have.property('customDate', requestBodyInfo.customDate)
                expect(res.body.response).to.have.property('customNo', requestBodyInfo.customNo)
                expect(res.body.response).to.have.property('dealerAccountingBranchCode', requestBodyInfo.dealerAccountingBranchCode)
                expect(res.body.response).to.have.property('dealerFinancialFlag', requestBodyInfo.dealerFinancialFlag)
                expect(res.body.response).to.have.property('deliveryWindow', requestBodyInfo.deliveryWindow)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('financialModel', requestBodyInfo.financialModel)
                expect(res.body.response).to.have.property('gstRegNo', requestBodyInfo.gstRegNo)
                expect(res.body.response).to.have.property('id', organisationStructureId)
                expect(res.body.response).to.have.property('jpgId', requestBodyInfo.jpgId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name+'d')
                expect(res.body.response).to.have.property('operationType', requestBodyInfo.operationType)
                expect(res.body.response.operationUnits).to.not.equal(null)
                expect(res.body.response).to.have.property('orgId', orgId)
                expect(res.body.response).to.have.property('orgType', requestBodyInfo.orgType)
                expect(res.body.response).to.have.property('parentId', requestBodyInfo.parentId)
                expect(res.body.response).to.have.property('pdsFlag', requestBodyInfo.pdsFlag)
                expect(res.body.response).to.have.property('pricingRegion', requestBodyInfo.pricingRegion)
                expect(res.body.response).to.have.property('regionCode', requestBodyInfo.regionCode)
                expect(res.body.response).to.have.property('routeCode', requestBodyInfo.routeCode)
                expect(res.body.response).to.have.property('salesTax', requestBodyInfo.salesTax)
                expect(res.body.response).to.have.property('sapHrFlag', requestBodyInfo.sapHrFlag)
                expect(res.body.response).to.have.property('serviceLabourTax', requestBodyInfo.serviceLabourTax)
                expect(res.body.response).to.have.property('serviceOutletMapping', requestBodyInfo.serviceOutletMapping)
                expect(res.body.response).to.have.property('sstNo', requestBodyInfo.sstNo)
                expect(res.body.response).to.have.property('stateSstNo', requestBodyInfo.stateSstNo)
                expect(res.body.response).to.have.property('stockyardCode', requestBodyInfo.stockyardCode)
                expect(res.body.response).to.have.property('taxArea', requestBodyInfo.taxArea)
                expect(res.body.response).to.have.property('topMarkMapping', requestBodyInfo.topMarkMapping)
                expect(res.body.response).to.have.property('vendorCode', requestBodyInfo.vendorCode)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                }
            })
        })
        it('TC15-NA-Verify that the response is matching with Db or not', function(){

        })
        it('TC16-Negative-Verify the status code if user send the request with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/treeView/'+organisationStructureId+'11',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)     
            })
        })
        it('TC17-Positive-Verify the response duration is less than 1  second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/treeView/'+organisationStructureId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete request Organisation Structure ID', function(){
        it('TC18-Postive-Verify the status code & response is showing as per swagger or not', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC19-Negative-Verify the status code if user send the same request twice', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20_-NA-Verify that record for the particualr ID get removed from DB or not', function(){

        })
        it('TC21-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})