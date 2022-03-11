///<reference types="cypress"/>

describe('DMS-1200_Master_Setup_Pricing_Components(Vehicle Pricing Controller)', function(){
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
    describe('Get Request Vehicle _Price', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('brandId')
                    expect(res.body.response.content[i]).to.have.property('brandUnitName')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('effectiveDate')
                    expect(res.body.response.content[i]).to.have.property('details')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('modelCode')
                    expect(res.body.response.content[i]).to.have.property('modelDescription')
                    expect(res.body.response.content[i]).to.have.property('modelId')
                    expect(res.body.response.content[i]).to.have.property('seriesDescription')
                    expect(res.body.response.content[i]).to.have.property('seriesId')
                    expect(res.body.response.content[i]).to.have.property('status')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC01-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Vehicle _Price', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
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
                expect(res.body.response).to.have.property('brandId', requestBody.brandId)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response.details[0]).to.have.property('id', detailsId)
                expect(res.body.response.details[0]).to.have.property('locationId', requestBody.detailslocationId)
                expect(res.body.response.details[0]).to.have.property('price', requestBody.detailsprice)
                expect(res.body.response.details[0].pricingSetup).to.have.property('id', requestBody.detailssetupId)
                expect(res.body.response).to.have.property('effectiveDate', requestBody.effectiveDate)
                expect(res.body.response).to.have.property('id', ID)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('seriesId', requestBody.seriesId)
                expect(res.body.response).to.have.property('status', requestBody.status)

            })
        })
        it('TC05-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC06-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, 
                body: {
                    "brandId": "",
                    "description": "",
                    "details": [
                        {
                            "id": "",
                            "locationId":"",
                            "price": "",
                            "setupId": "",
                        }
                    ],
                    "effectiveDate": "",
                    "id": "",
                    "modelId":"",
                    "seriesId": "",
                    "status": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-NA-Verify if Request fields are as per design', function(){

        })
        it('TC08-Positive-Verify that the response time should be less than 1 second or not', function(){
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
                expect(res.duration).to.lessThan(1000)
                ID08 = res.body.response.id
            })
        })
    })
    describe('Get Request Vehicle _Price_ID', function(){
        it('TC09-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ID,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('brandId', requestBody.brandId)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response.details[0]).to.have.property('id', detailsId)
                expect(res.body.response.details[0]).to.have.property('locationId', requestBody.detailslocationId)
                expect(res.body.response.details[0]).to.have.property('price', requestBody.detailsprice)
                expect(res.body.response.details[0].pricingSetup).to.have.property('id', requestBody.detailssetupId)
                expect(res.body.response).to.have.property('effectiveDate', requestBody.effectiveDate)
                expect(res.body.response).to.have.property('id', ID)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response).to.have.property('seriesId', requestBody.seriesId)
                expect(res.body.response).to.have.property('status', requestBody.status)
            })
        })
        it('TC10-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ID08+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC12-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+ID08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)

            })
        })
    })
    describe.skip('Put Request Vehicle _Price ID', function(){
        it('TC13-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){

        })
        it('TC14-NA-Verify that the After sending request with valid request body it is reflecting in Database or not', function(){
            
        })
        it('TC15-Negative-Verify that response code is 403ok and response data is as per the Request body for invalid ID or not', function(){
            
        })
        it('TC16-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            
        })
        it('TC17-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            
        })
    })
    describe('Put Request Update_Status', function(){
        it('TC31-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
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
        it('TC32-NA-Verify that the After sending request with valid request body it is reflecting in Database or not', function(){

        })
        it('TC33-Negative-Verify that response code is 403 ok and response data is as per the Request body for invalid ID or not', function(){
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
        it('TC34-Negative-Verify that the response code is proper if It is sent without any request param', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+ID,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC35-Negative-Verify that the response code is proper if It is sent with blank param', function(){
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
        it('TC36-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
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
        it('TC18-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ID,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC19-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){

        })
        it('TC20-Negaitive-Verify that If user sends request with invalid ID Response code shows 403 or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ID,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC21-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+ID08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)

            })
        })
    })
    describe('Get Request Model_Stats', function(){
        it('TC22-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/model/stats',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('count')
                    expect(res.body.response[i]).to.have.property('field')
                }
            })
        })
        it('TC23-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC24-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/model/stats',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
               
            })
        })
    })
    describe('Get Request Pricing_Stats_By_Month', function(){
        it('TC25-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/month/stats',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('count')
                    expect(res.body.response[i]).to.have.property('field')
                }
            })
        })
        it('TC26-NA-Verify that the response data is matching with DATABASE entry  or not', function(){
            
        })
        it('TC27-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/month/stats',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
               
            })
        })
    })
    describe('Get Request Price_Stats', function(){
        it('TC28-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/stats',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength=this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('count')
                    expect(res.body.response[i]).to.have.property('field')
                }
            })
        })
        it('TC29-NA-Verify that the response data is matching with DATABASE entry  or not', function(){
            
        })
        it('TC30-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/stats',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
               
            })
        })
    })
})