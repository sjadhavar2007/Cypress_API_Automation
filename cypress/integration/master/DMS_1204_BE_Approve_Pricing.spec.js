///<reference types="cypress"/>
describe('DMS_1204_BE_Approve_Pricing (Vehicle Pricing Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var detailsId;
    var paramsInfo;
    var ID;
    var ID08;
    before(function(){
        cy.fixture('master/DMS_916and1200/DMS_916_Url').then(function(data){
            commonUrl= data.URL_VehiclePricing
        })
        cy.fixture('master/DMS_916and1200/DMS_916_headers').then(function(data){
            headersInfo= data
        })
        cy.fixture('master/DMS_916and1200/DMS_916_body').then(function(data){
            requestBody= data
        })
        cy.fixture('master/DMS_916and1200/DMS_916_params').then(function(data){
            paramsInfo= data
        })
    })
    describe('Post Request Vehicle _Price', function(){
        it('TC00-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, 
                body: {
                    "brandId": requestBody.brandId,
                    "description": requestBody.description,
                    "details": [
                        {
                            "id": requestBody.detailsid,
                            "locationId":requestBody.detailslocationId,
                            "price": requestBody.detailsprice,
                            "setupId": requestBody.detailssetupId,
                        }
                    ],
                    "effectiveDate": requestBody.effectiveDate,
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "seriesId": requestBody.seriesId,
                    "status": requestBody.status,
                }
                
            }).then(function(res){
                expect(res.status).to.equal(201)
                detailsId = res.body.response.details[0].id
                ID = res.body.response.id
            })
        })
    })
    describe('Put Request Update_Status', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+ID,
                qs: {
                    "status": paramsInfo.status,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('status', paramsInfo.status)
            })
        })
        it('TC02-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC03-Negative-Verify the response code, if send the request with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+ID+1,
                qs: {
                    "status": paramsInfo.status,
                }, failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Negative-Verify the Status code if user send the request with Blank parameter', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+ID,
                qs: {
                    "status": "",
                }, 
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+ID,
                qs: {
                    "status": paramsInfo.status,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Vehicle _Price ID', function(){
        it('TC00-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ID,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})