///<reference types="cypress"/>
import getBrandUnit from './UtilityBrandController/getBrandUnit'
describe('Brand Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var brandUnitName;
    var brandUnitId;
    var brandId;
    var brandId08;
    var brandUnitName1;
    var brandUnitId1;
    var brandUnitNameUpdate;
    var brandUnitIdUpdate;
    var brandUnitNameUpdate1;
    var brandUnitIdUpdate1;
    before(function(){
        cy.fixture('admin/BrandController/BrandController_url').then(function(data){
            commonUrl=data.URL_BrandController_uat
        })
        cy.fixture('admin/BrandController/BrandController_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/BrandController/BrandController_requestBody.json').then(function(data){
            requestBodyInfo=data
        })
        const brandUnit=new getBrandUnit();
        brandUnitName=brandUnit.getBrandUnitName();
        brandUnitId=brandUnit.getBrandUnitId();
        brandUnitName1=brandUnit.getBrandUnitNameDuration();
        brandUnitId1=brandUnit.getBrandUnitIdDuration();
        brandUnitNameUpdate=brandUnit.getBrandUnitNameUpdate();
        brandUnitIdUpdate=brandUnit.getBrandUnitIdUpdate();
        brandUnitNameUpdate1=brandUnit.getBrandUnitNameUpdateDuration();
        brandUnitIdUpdate1=brandUnit.getBrandUnitIdUpdateDuration();
    })
    describe('Get Request Brands', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content =res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('brandUnitId')
                        expect(res.body.response.content[i]).to.have.property('brandUnitName')
                        expect(res.body.response.content[i]).to.have.property('effectiveFrom')
                        expect(res.body.response.content[i]).to.have.property('effectiveTo')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength =this.contentLinks.length
                        for(let j=0; j<this.contentLinksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                }
                }
                this.links = res.body.response.links
                this.linksLength =this.links.length
                for(let k=0; k<this.linksLength; k++){
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
        it('TC03-NA-Verify that the record count is matching with DB & Redish dashboard or not', function(){

        })
        it('TC04-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Brands', function(){
        it('TC05-Positive-Verify the response code & response body as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brandUnitId": brandUnitId,
                    "brandUnitName": brandUnitName,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "id": requestBodyInfo.id,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                brandId=res.body.response.id
                this.brandUnitId=res.body.response.brandUnitId
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('brandUnitId', this.brandUnitId)
                expect(res.body.response).to.have.property('brandUnitName', brandUnitName)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('id', brandId)
                expect(res.body.response).to.have.property('links')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC06-NA-Verify the record count is increasing in the redish dashboard or not', function(){

        })
        it('TC07-NA-Verify that after sending a valid request the request is getting created in the DB or not', function(){

        })
        it('TC08-Negative-Verify that is user able to send same request twice or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brandUnitId": brandUnitId,
                    "brandUnitName": brandUnitName,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "id": requestBodyInfo.id,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(409)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC09-Negative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": "",
                    "brandUnitId": "",
                    "brandUnitName": "",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                    "id": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC10-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brandUnitId": brandUnitId1,
                    "brandUnitName": brandUnitName1,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "id": requestBodyInfo.id,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                brandId08=res.body.response.id
            })
        })
    })
    describe('Get Request Brands ID', function(){
        it('TC11-Positive-Verify the Status code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+brandId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.brandUnitId=res.body.response.brandUnitId
                expect(res.body.response).to.have.property('active', null)
                expect(res.body.response).to.have.property('brandUnitId', this.brandUnitId)
                expect(res.body.response).to.have.property('brandUnitName', brandUnitName)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('id', brandId)
                expect(res.body.response).to.have.property('links')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC12-NA-Verify that the response is matching with DB for Particular ID or not', function(){

        })
        it('TC13-Negative-Verify the status code if user send request with invalid Brand ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+brandId+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify tha response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+brandId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Brand ID', function(){
        it('TC15-Positive-Verify the Status code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+brandId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brandUnitId": brandUnitIdUpdate,
                    "brandUnitName": brandUnitNameUpdate,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "id": requestBodyInfo.idUpdate,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.brandUnitId=res.body.response.brandUnitId
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('brandUnitId', this.brandUnitId)
                expect(res.body.response).to.have.property('brandUnitName', brandUnitNameUpdate)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFromUpdate)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveToUpdate)
                expect(res.body.response).to.have.property('id', brandId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC16-NA-Verify the response body is matching with DB record for the particular ID or not', function(){

        })
        it('TC17-NA-Verify that is there any change is reflecting in record count of redis dashboard by updating a record or not', function(){

        })
        it('TC18-Negative-Verify the status code if user send the request with Invalid Brand ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+brandId+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brandUnitId": brandUnitIdUpdate,
                    "brandUnitName": brandUnitNameUpdate,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "id": requestBodyInfo.idUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC019-Negative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+brandId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": "",
                    "brandUnitId": "",
                    "brandUnitName": "",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                    "id": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+brandId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brandUnitId": brandUnitIdUpdate1,
                    "brandUnitName": brandUnitNameUpdate1,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "id": requestBodyInfo.idUpdate,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe.skip('Delete request Brand ID', function(){
        it('TC21-Positive-Verify the response body & status is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+brandId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brandUnitId": brandUnitId,
                    "brandUnitName": brandUnitName,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "id": requestBodyInfo.id,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', null)
                expect(res.body.response).to.have.property('brandUnitId', null)
                expect(res.body.response).to.have.property('brandUnitName', null)
                expect(res.body.response).to.have.property('effectiveFrom', null)
                expect(res.body.response).to.have.property('effectiveTo', null)
                expect(res.body.response).to.have.property('id', null)
            })
        })
        it('TC22-Negative-Verify the status code if user send the same request multiple time for the same ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+brandId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brandUnitId": brandUnitId,
                    "brandUnitName": brandUnitName,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "id": requestBodyInfo.id,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC23-NA-Verify the record count is getting decreased in redis dashboard by deleteing a record or not', function(){

        })
        it('TC24-NA-erify that the record is getting removed from the DB for the particular ID or not', function(){

        })                                  
        it('TC24-Positive-Verify that the Response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+brandId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })  
    })
})