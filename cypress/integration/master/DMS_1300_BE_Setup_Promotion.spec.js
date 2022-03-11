///<reference types="cypress"/>

describe('DMS-1300 BE - Setup Promotion (Promotion Setup Controller)', function(){
    var commonUrl;
    var requestBody;
    var id;
    var variantId=1;

    before(function(){
        cy.fixture('master/DMS_1300/url').then(function(data){
            commonUrl = data.URL_PromotionSetupController
        })
        cy.fixture('master/DMS_1300/body').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Promotion_Setup', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                   for(let i=0; i<this.contentLength; i++){
                    expect(res.body.response.content[i]).to.have.property('accessoryDescription')
                    expect(res.body.response.content[i]).to.have.property('accessoryId')
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('colorDescription')
                    expect(res.body.response.content[i]).to.have.property('colorId')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdById')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('effectiveFromDate')
                    expect(res.body.response.content[i]).to.have.property('effectiveToDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('moduleDescription')
                    expect(res.body.response.content[i]).to.have.property('moduleId')
                    expect(res.body.response.content[i]).to.have.property('outletDescription')
                    expect(res.body.response.content[i]).to.have.property('outletId')
                    expect(res.body.response.content[i]).to.have.property('promoCode')
                    expect(res.body.response.content[i]).to.have.property('promoTypeDescription')
                    expect(res.body.response.content[i]).to.have.property('promoTypeId')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updateById')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('vehicleModelDescription')
                    expect(res.body.response.content[i]).to.have.property('vehicleModelId')
                   }
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Promotion_Setup', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":requestBody.description,
                    "moduleId": requestBody.moduleId,
                    "outletId": requestBody.outletId,
                    "promoCode": requestBody.promoCode,
                    "promoTypeId": requestBody.promoTypeId,
                    "accessoryId": requestBody.accessoryId,
                    "active": requestBody.active,
                    "colorId": requestBody.colorId,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "vehicleModelId": requestBody.vehicleModelId,
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
                id=res.body.response.id
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('moduleId', requestBody.moduleId)
                expect(res.body.response).to.have.property('outletId', requestBody.outletId)
                expect(res.body.response).to.have.property('promoCode', requestBody.promoCode)
                expect(res.body.response).to.have.property('promoTypeId', requestBody.promoTypeId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('colorId', requestBody.colorId)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('vehicleModelId', requestBody.vehicleModelId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC06-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":"",
                    "moduleId": "",
                    "outletId": "",
                    "promoCode": "",
                    "promoTypeId": "",
                    "accessoryId": "",
                    "active": "",
                    "colorId":"",
                    "effectiveFromDate": "",
                    "effectiveToDate": "",
                    "id": "",
                    "vehicleModelId": "",
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
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":requestBody.description,
                    "moduleId": requestBody.moduleId,
                    "outletId": requestBody.outletId,
                    "promoCode": requestBody.promoCode,
                    "promoTypeId": requestBody.promoTypeId,
                    "accessoryId": requestBody.accessoryId,
                    "active": requestBody.active,
                    "colorId": requestBody.colorId,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "vehicleModelId": requestBody.vehicleModelId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Promotion_Setup_ID', function(){
        it('TC09-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                id=res.body.response.id
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('moduleId', requestBody.moduleId)
                expect(res.body.response).to.have.property('outletId', requestBody.outletId)
                expect(res.body.response).to.have.property('promoCode', requestBody.promoCode)
                expect(res.body.response).to.have.property('promoTypeId', requestBody.promoTypeId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('colorId', requestBody.colorId)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('vehicleModelId', requestBody.vehicleModelId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id+1,
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
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Promotion_Setup ID', function(){
        it('TC13-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":requestBody.description+'DMS',
                    "moduleId": requestBody.moduleId,
                    "outletId": requestBody.outletId,
                    "promoCode": requestBody.promoCode,
                    "promoTypeId": requestBody.promoTypeId,
                    "accessoryId": requestBody.accessoryId,
                    "active": requestBody.active,
                    "colorId": requestBody.colorId,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "vehicleModelId": requestBody.vehicleModelId,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                id=res.body.response.id
                expect(res.body.response).to.have.property('description', requestBody.description+'DMS')
                expect(res.body.response).to.have.property('moduleId', requestBody.moduleId)
                expect(res.body.response).to.have.property('outletId', requestBody.outletId)
                expect(res.body.response).to.have.property('promoCode', requestBody.promoCode)
                expect(res.body.response).to.have.property('promoTypeId', requestBody.promoTypeId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('colorId', requestBody.colorId)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('vehicleModelId', requestBody.vehicleModelId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC14-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC15-Negative-Verify that response code is 403 and response data is as per the Request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id+1,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":requestBody.description+'DMS',
                    "moduleId": requestBody.moduleId,
                    "outletId": requestBody.outletId,
                    "promoCode": requestBody.promoCode,
                    "promoTypeId": requestBody.promoTypeId,
                    "accessoryId": requestBody.accessoryId,
                    "active": requestBody.active,
                    "colorId": requestBody.colorId,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "vehicleModelId": requestBody.vehicleModelId,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":"",
                    "moduleId": "",
                    "outletId":"",
                    "promoCode": "",
                    "promoTypeId": "",
                    "accessoryId": "",
                    "active": "",
                    "colorId": "",
                    "effectiveFromDate":"",
                    "effectiveToDate": "",
                    "id": "",
                    "vehicleModelId": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC17-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "description":requestBody.description+'DMS',
                    "moduleId": requestBody.moduleId,
                    "outletId": requestBody.outletId,
                    "promoCode": requestBody.promoCode,
                    "promoTypeId": requestBody.promoTypeId,
                    "accessoryId": requestBody.accessoryId,
                    "active": requestBody.active,
                    "colorId": requestBody.colorId,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "vehicleModelId": requestBody.vehicleModelId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Promotion_Setup_getPromotions', function(){
        it('TC18-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/lead-promotions/'+variantId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.response=res.body.response
                this.responseLength= this.response.length
                for(let i=0; i<this.responseLength; i++){
                    expect(res.body.response[i]).to.have.property('id')
                    expect(res.body.response[i]).to.have.property('promoCode')
                    expect(res.body.response[i]).to.have.property('description')
                }
                
            })
        })
        it('TC19-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC20-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/lead-promotions/'+variantId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})