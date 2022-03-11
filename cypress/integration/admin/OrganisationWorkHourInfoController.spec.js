///<reference types="cypress"/>
import getOrgId from './UtilityOrganisationStructure/getOrgId'
describe('DMS-866-Organisation Work Hour Info Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var requestBody;
    var orgId;
    var updateOrgId;
    var organisationStructureId;
    var organisationStructureId2;
    var orgWorkHourInfoId;
    var orgWorkHourInfoId09;
    before(function(){
        cy.fixture('admin/OrganisationWorkHourInfoController/OrganisationStructure_url').then(function(data){
            commonUrl=data.URL_OrganisationStructure
        })
        cy.fixture('admin/OrganisationWorkHourInfoController/OrganisationStructure_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/OrganisationWorkHourInfoController/OrganisationStructure_body').then(function(data){
            requestBodyInfo=data
        })
        cy.fixture('admin/OrganisationWorkHourInfoController/OrganisationStructure_body').then(function(data){
            requestBodyInfo=data
        })
        cy.fixture('admin/OrganisationWorkHourInfoController/OrganisationWorkHourInfo_body').then(function(data){
            requestBody=data
        })
        const orgid=new getOrgId();
        orgId=orgid.getOrgId();
        updateOrgId=orgid.getUpdateOrgId();
    })

    describe('Create Org Id', function(){
        it('TC00-Positive-', function(){
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
        it('TC00-Positive-', function(){
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
                expect(res.status).to.equal(201)
                organisationStructureId2=res.body.response.id
            })
        })
    })
    describe('Get Request Organisation Work Hour Info', function(){
        it('TC01-Positive-Validate that all the response code & response body parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info'
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
                url: commonUrl+'/'+organisationStructureId+'1/work-hour-info',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info'
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('POST Request Organisation Work Hour Info', function(){
        it('TC05-Positive-Verify that the response status & code is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info',
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body: [
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleFor,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  }
                ],
            }).then(function(res){
                expect(res.status).to.equal(201)
                orgWorkHourInfoId =res.body.response.content[0].id
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++){
                    expect(res.body.response.content[i]).to.have.property('breakEnd1', requestBody.breakEnd1)
                    expect(res.body.response.content[i]).to.have.property('breakEnd2', requestBody.breakEnd2)
                    expect(res.body.response.content[i]).to.have.property('breakEnd3', requestBody.breakEnd3)
                    expect(res.body.response.content[i]).to.have.property('breakStart1', requestBody.breakStart1)
                    expect(res.body.response.content[i]).to.have.property('breakStart2', requestBody.breakStart2)
                    expect(res.body.response.content[i]).to.have.property('breakStart3', requestBody.breakStart3)
                    expect(res.body.response.content[i]).to.have.property('endTime', requestBody.endTime)
                    expect(res.body.response.content[i]).to.have.property('friday', requestBody.friday)
                    expect(res.body.response.content[i]).to.have.property('monday', requestBody.monday)
                    expect(res.body.response.content[i]).to.have.property('operationHourDate')
                    expect(res.body.response.content[i]).to.have.property('operationHourType')
                    expect(res.body.response.content[i]).to.have.property('saturday', requestBody.saturday)
                    expect(res.body.response.content[i]).to.have.property('scheduleFor', requestBody.scheduleFor)
                    expect(res.body.response.content[i]).to.have.property('sunday', requestBody.sunday)
                    expect(res.body.response.content[i]).to.have.property('thursday', requestBody.thursday)
                    expect(res.body.response.content[i]).to.have.property('tuesday', requestBody.tuesday)
                    expect(res.body.response.content[i]).to.have.property('wednesday', requestBody.wednesday)
                    expect(res.body.response.content[i]).to.have.property('id', orgWorkHourInfoId)
                    this.ContentLinks=res.body.response.content[i].links
                    this.contentLinksLength=this.ContentLinks.length
                    for(let j=0; j<this.contentLinksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
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
        it('TC07-Negative-Verify the status code, if user send the request with invalid Organisation id', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+organisationStructureId+'1/work-hour-info',
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body: [
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleFor,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
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
                url: commonUrl+'/'+organisationStructureId+'1/work-hour-info',
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body: [
                    {
                      "breakEnd1": "",
                      "breakEnd2": "",
                      "breakEnd3": "",
                      "breakStart1": "",
                      "breakStart2": "",
                      "breakStart3": "",
                      "endTime": "",
                      "friday": "",
                      "monday": "",
                      "operationHourDate": "",
                      "operationHourType": "",
                      "saturday": "",
                      "scheduleFor": "",
                      "startTime": "",
                      "sunday": "",
                      "thursday": "",
                      "tuesday": "",
                      "wednesday": ""
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
                url: commonUrl+'/'+organisationStructureId2+'/work-hour-info',
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body: [
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleFor,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  }
                ],
            }).then(function(res){
                expect(res.status).to.equal(201)
                orgWorkHourInfoId09 =res.body.response.content[0].id
            })
        })
    })
    describe('Get Request Organisation Work Hour Info ID', function(){
        it('TC10-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('breakEnd1', requestBody.breakEnd1)
                    expect(res.body.response).to.have.property('breakEnd2', requestBody.breakEnd2)
                    expect(res.body.response).to.have.property('breakEnd3', requestBody.breakEnd3)
                    expect(res.body.response).to.have.property('breakStart1', requestBody.breakStart1)
                    expect(res.body.response).to.have.property('breakStart2', requestBody.breakStart2)
                    expect(res.body.response).to.have.property('breakStart3', requestBody.breakStart3)
                    expect(res.body.response).to.have.property('endTime', requestBody.endTime)
                    expect(res.body.response).to.have.property('friday', requestBody.friday)
                    expect(res.body.response).to.have.property('monday', requestBody.monday)
                    expect(res.body.response).to.have.property('operationHourDate')
                    expect(res.body.response).to.have.property('operationHourType')
                    expect(res.body.response).to.have.property('saturday', requestBody.saturday)
                    expect(res.body.response).to.have.property('scheduleFor', requestBody.scheduleFor)
                    expect(res.body.response).to.have.property('sunday', requestBody.sunday)
                    expect(res.body.response).to.have.property('thursday', requestBody.thursday)
                    expect(res.body.response).to.have.property('tuesday', requestBody.tuesday)
                    expect(res.body.response).to.have.property('wednesday', requestBody.wednesday)
                    expect(res.body.response).to.have.property('id', orgWorkHourInfoId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                } 
            })
        })
        it('TC11-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC12-Negative-Verify the status code if user send the request with invalid Organization ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId2+'1/work-hour-info/'+orgWorkHourInfoId09,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC13-Negative-Verify the status code if user send the request with invalid Work Hour info ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId2+'/work-hour-info/'+orgWorkHourInfoId09+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1  second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+organisationStructureId2+'/work-hour-info/'+orgWorkHourInfoId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Organisation Work Hour Info ID', function(){
        it('TC15-Positive-Verify the status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body:
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleForUpdate,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  },
            }).then(function(res){
                expect(res.status).to.equal(200)
                    expect(res.body.response).to.have.property('breakEnd1', requestBody.breakEnd1)
                    expect(res.body.response).to.have.property('breakEnd2', requestBody.breakEnd2)
                    expect(res.body.response).to.have.property('breakEnd3', requestBody.breakEnd3)
                    expect(res.body.response).to.have.property('breakStart1', requestBody.breakStart1)
                    expect(res.body.response).to.have.property('breakStart2', requestBody.breakStart2)
                    expect(res.body.response).to.have.property('breakStart3', requestBody.breakStart3)
                    expect(res.body.response).to.have.property('endTime', requestBody.endTime)
                    expect(res.body.response).to.have.property('friday', requestBody.friday)
                    expect(res.body.response).to.have.property('monday', requestBody.monday)
                    expect(res.body.response).to.have.property('operationHourDate')
                    expect(res.body.response).to.have.property('operationHourType')
                    expect(res.body.response).to.have.property('saturday', requestBody.saturday)
                    expect(res.body.response).to.have.property('scheduleFor', requestBody.scheduleForUpdate)
                    expect(res.body.response).to.have.property('sunday', requestBody.sunday)
                    expect(res.body.response).to.have.property('thursday', requestBody.thursday)
                    expect(res.body.response).to.have.property('tuesday', requestBody.tuesday)
                    expect(res.body.response).to.have.property('wednesday', requestBody.wednesday)
                    expect(res.body.response).to.have.property('id', orgWorkHourInfoId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let l=0; l<this.linksLength; l++)
                 {
                    expect(res.body.response.links[l]).to.have.property('rel')
                    expect(res.body.response.links[l]).to.have.property('href')
                } 
            })
        })
        it('TC16-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC17-Negative-Verify the status code if user send the resquest with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body: {
                    "breakEnd1": "",
                    "breakEnd2": "",
                    "breakEnd3": "",
                    "breakStart1": "",
                    "breakStart2": "",
                    "breakStart3": "",
                    "endTime": "",
                    "friday": "",
                    "monday": "",
                    "operationHourDate": "",
                    "operationHourType": "",
                    "saturday": "",
                    "scheduleFor": "",
                    "startTime": "",
                    "sunday": "",
                    "thursday": "",
                    "tuesday": "",
                    "wednesday": ""
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC18-Negative-Verify the status code if user send the request with invalid Organisation ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+organisationStructureId+'1/work-hour-info/'+orgWorkHourInfoId,
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body:
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleForUpdate,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC19-Negative-Verify the status code if user send the request with invalid Work Hour Info ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId+1,
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body:
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleForUpdate,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify the status code if user send the request with invalid Work Hour Info ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
                headers:{
                    "Content-type": headersInfo.ContentType,
                },
                body:
                    {
                    "breakEnd1": requestBody.breakEnd1,
                    "breakEnd2": requestBody.breakEnd2,
                    "breakEnd3": requestBody.breakEnd3,
                    "breakStart1": requestBody.breakStart1,
                    "breakStart2": requestBody.breakStart2,
                    "breakStart3": requestBody.breakStart3,
                    "endTime": requestBody.endTime,
                    "friday": requestBody.friday,
                    "monday": requestBody.monday,
                    "operationHourDate": requestBody.operationHourDate,
                    "operationHourType": requestBody.operationHourType,
                    "saturday": requestBody.saturday,
                    "scheduleFor": requestBody.scheduleForUpdate,
                    "startTime": requestBody.startTime,
                    "sunday": requestBody.sunday,
                    "thursday": requestBody.thursday,
                    "tuesday": requestBody.tuesday,
                    "wednesday": requestBody.wednesday
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete Request Organisation Work Hour Info ID', function(){
        it('TC21-Positive-Verify the status code & response is showing as per swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
            }).then(function(res){
                expect(res.status).to.equal(200) 
            })
        })
        it('TC22-Negative-Verify the status code if user send the same request twice for the same Work Hour Info ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+organisationStructureId+'/work-hour-info/'+orgWorkHourInfoId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403) 
            })
        })
        it('TC23-NA-Verify that record for the particualr ID get removed from DB or not', function(){

        })
        it('TC24-Negative-Verify the status code, if user send the request with invalid Org Structure ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+organisationStructureId+'1/work-hour-info/'+orgWorkHourInfoId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400) 
            })
        })
        it('TC025-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+organisationStructureId2+'/work-hour-info/'+orgWorkHourInfoId09,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe.skip('Delete Org Id', function(){
        it('TC00-Postive', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC00-Postive-', function(){
            cy.request({
                method: "DELETE",
                url: commonUrl+'/'+organisationStructureId2,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})