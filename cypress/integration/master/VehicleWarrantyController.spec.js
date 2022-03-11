///<reference types="cypress"/>

describe('Vehicle Warranty Controller', function(){
    var commonUrl;
    var headerInfo;
    var requestBody;
    var vehicleWarrantyId;
    var vehicleWarrantyId07;
    before(function(){
        cy.fixture('master/VehicleWarrantyController/VehicleWarranty_url').then(function(data){
            commonUrl=data.URL_VehicleWarranty
        })
        cy.fixture('master/VehicleWarrantyController/VehicleWarranty_headers').then(function(data){
            headerInfo = data
         })
         cy.fixture('master/VehicleWarrantyController/VehicleWarranty_body').then(function(data){
            requestBody = data
         })
    })
    describe('Get Request Vehicle Warranty', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
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
                    expect(res.body.response.content[i]).to.have.property('brand')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('effectiveFromDate')
                    expect(res.body.response.content[i]).to.have.property('effectiveToDate')
                    expect(res.body.response.content[i]).to.have.property('effectiveUnlimited')
                    expect(res.body.response.content[i]).to.have.property('hybridIndicator')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('series')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('vehicleWarrantyDetail')
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('POST Request Vehicle Warranty',function(){
        it('TC04-Positive-Verify the response code & response body is as per the swagger or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "effectiveUnlimited": requestBody.effectiveUnlimited,
                    "hybridIndicator": requestBody.hybridIndicator,
                    "series": requestBody.series,
                  }
            }).then(function(res){
                expect(res.body.status).to.equal(201)
                vehicleWarrantyId = res.body.response.id
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBody.effectiveUnlimited)
                expect(res.body.response).to.have.property('hybridIndicator', requestBody.hybridIndicator)
                expect(res.body.response).to.have.property('series', requestBody.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC06-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": "",
                    "effectiveFromDate": "",
                    "effectiveToDate": "",
                    "effectiveUnlimited": "",
                    "hybridIndicator": "",
                    "series": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "effectiveUnlimited": requestBody.effectiveUnlimited,
                    "hybridIndicator": requestBody.hybridIndicator,
                    "series": requestBody.series,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                vehicleWarrantyId07 = res.body.response.id
                
            })
        })
    })
    describe('GET Request Vehicle warranty ID',function(){
        it('TC08-Positive-Verify the response code & response body as per the swagger',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleWarrantyId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBody.effectiveUnlimited)
                expect(res.body.response).to.have.property('hybridIndicator', requestBody.hybridIndicator)
                expect(res.body.response).to.have.property('series', requestBody.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC10-Negative-Verify the response code, if send the request with Invalid Warranty ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleWarrantyId+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 Second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleWarrantyId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Vehicle Warranty ID',function(){
        it('TC12-Positive-Verify the response code & response body as per the swagger',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleWarrantyId,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate,
                    "effectiveFromDate": requestBody.effectiveFromDateUpdate,
                    "effectiveToDate": requestBody.effectiveToDateUpdate,
                    "effectiveUnlimited": requestBody.effectiveUnlimited,
                    "hybridIndicator": requestBody.hybridIndicator,
                    "series": requestBody.seriesUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brandUpdate)
                expect(res.body.response).to.have.property('code', requestBody.codeUpdate)
                expect(res.body.response).to.have.property('description', requestBody.descriptionUpdate)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDateUpdate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDateUpdate)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBody.effectiveUnlimited)
                expect(res.body.response).to.have.property('hybridIndicator', requestBody.hybridIndicator)
                expect(res.body.response).to.have.property('series', requestBody.seriesUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC14-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleWarrantyId,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": "",
                    "effectiveFromDate": "",
                    "effectiveToDate": "",
                    "effectiveUnlimited": "",
                    "hybridIndicator": "",
                    "series": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC15-Negative-Verify the response code, if send the request with invalid warranty ID',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleWarrantyId+12,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate,
                    "effectiveFromDate": requestBody.effectiveFromDateUpdate,
                    "effectiveToDate": requestBody.effectiveToDateUpdate,
                    "effectiveUnlimited": requestBody.effectiveUnlimited,
                    "hybridIndicator": requestBody.hybridIndicator,
                    "series": requestBody.seriesUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleWarrantyId,
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "effectiveUnlimited": requestBody.effectiveUnlimited,
                    "hybridIndicator": requestBody.hybridIndicator,
                    "series": requestBody.series,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)  
            })
        })
    })
    describe('Get Request Vehicle Warranty Details', function(){
        it('TC21-Positive-Verify the request code & body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId+'/vehicle-warranties-detail',
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response.content.length).to.equal(0)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC22-NA-Verify response Body is matching With DB or not', function(){

        })
        it('TC23-Negative-Verify the request code & body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId+12+'/vehicle-warranties-detail',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC24-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId+'/vehicle-warranties-detail',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Vehicle Warranty Details', function(){
        it('TC25-Positive-Verify the Response Code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId+'/vehicle-warranties-detail',
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: [
                    {
                      "mileage": requestBody.mileage,
                      "months": requestBody.months,
                      "provisionAmount": requestBody.provisionAmount,
                      "warrantyTypeId": requestBody.warrantyTypeId,
                    }
                  ],
            }).then(function(res){
                expect(res.body.status).to.equal(201)
                expect(res.body.response.content.length).to.equal(0)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC26-NA-Verify that the response is matching with DB or not', function(){

        })
        it('TC27-Negative-Verify the status code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId+'12/vehicle-warranties-detail',
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: [
                    {
                      "mileage": requestBody.mileage,
                      "months": requestBody.months,
                      "provisionAmount": requestBody.provisionAmount,
                      "warrantyTypeId": requestBody.warrantyTypeId,
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC28-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId+'/vehicle-warranties-detail',
                headers: {
                    "Content-Type": headerInfo.ContentType
                },
                body: [
                    {
                      "mileage": requestBody.mileage,
                      "months": requestBody.months,
                      "provisionAmount": requestBody.provisionAmount,
                      "warrantyTypeId": requestBody.warrantyTypeId,
                    }
                  ],
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Vehicle Warranty ID',function(){
        it('TC17-Positive-Verify the response code & response body is as per swagger or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleWarrantyId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('brand', null)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('effectiveFromDate', null)
                expect(res.body.response).to.have.property('effectiveToDate', null)
                expect(res.body.response).to.have.property('effectiveUnlimited', false)
                expect(res.body.response).to.have.property('hybridIndicator', null)
                expect(res.body.response).to.have.property('series', null)
            })
        })
        it('TC18-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC19-Negative-Verify the response code & response body is as per swagger or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleWarrantyId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 Second or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleWarrantyId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})   