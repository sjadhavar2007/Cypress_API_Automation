///<reference types="cypress"/>

describe('Vehicle Pricing Controller', function(){
    var commonUrl;
    var paramsInfo;
    var headersInfo;
    var requestBodyInfo;
    var id;
    var id18;
    var id22;
    before(function(){
        cy.fixture('master/VehiclePricing/VehiclePricing_url').then(function(data){
            commonUrl=data.URL_VehiclePricing
        })
        cy.fixture('master/VehiclePricing/VehiclePricing_params').then(function(data){
            paramsInfo=data
        })
        cy.fixture('master/VehiclePricing/VehiclePricing_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('master/VehiclePricing/VehiclePricing_body').then(function(data){
            requestBodyInfo=data
        })
    })
    describe('Get Request Selling Price', function(){
        it('TC01-Positive-Verify that if user sends the proper request  then is it respoding with status code 200 or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationId,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC02-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationId,
                }
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('colorCharges')
                expect(res.body.response).to.have.property('sellingPrice')
            })
        })
        it('TC03-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC04-Positive-Verify that is user able to send GET request multiple Time & its response with proper success code or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationId,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC05-Positive-Verify that response body shows proper data as per request params  or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationId,
                }
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('colorCharges')
                expect(res.body.response).to.have.property('sellingPrice')
            })
        })
        it('TC06-Negative-Verify that response shows proper code and message for missing mandatory params or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(null)
                expect(res.body.responseCode).to.equal(400)
                
            })
        })
        it('TC07-Negative-Verify that response shows proper code and message for mandatory params with invalid data type or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationIdInvalid,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(null)
                expect(res.body.responseCode).to.equal(400)
                
            })
        })
        it('TC08-Negative-Verify that response shows proper code and message for mandatory params with invalid data type or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationIdInvalid,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(null)
                expect(res.body.responseCode).to.equal(400)
                
            })
        })
        it('TC09-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'selling-price',
                qs: {
                    "make": paramsInfo.make,
                    "series":paramsInfo.series,
                    "code":paramsInfo.code,
                    "locationId":paramsInfo.locationId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Vehicle Prices', function(){
        it('TC10-Positive-Verify that if user sends the proper request  then is it respoding with status code 200 or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices',
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC11-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices',
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('details')
                    expect(res.body.response.content[i]).to.have.property('effectiveDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('make')
                    expect(res.body.response.content[i]).to.have.property('series')
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
        it('TC12-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC13-Positive-Verify that is user able to send GET request multiple Time & its response with proper success code or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices',
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC14-Positive-Verify that response body shows proper data as per optional request params  or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices',
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('details')
                    expect(res.body.response.content[i]).to.have.property('effectiveDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('make')
                    expect(res.body.response.content[i]).to.have.property('series')
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
        it('TC15-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Vehicle Prices', function(){
        it('TC16-Positive-Verify by using valid request body, sending the the Post request it should show the response code as 201 Created or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.code,
                    "description": requestBodyInfo.description,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetails,
                        "labelDescription": requestBodyInfo.labelDescription,
                        "labelId": requestBodyInfo.labelId,
                        "locationDescription": requestBodyInfo.locationDescription,
                        "locationId": requestBodyInfo.locationId,
                        "price": requestBodyInfo.price,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDate,
                    "id": requestBodyInfo.id,
                    "make": requestBodyInfo.make,
                    "series": requestBodyInfo.series
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                id=res.body.response.id
                console.log(id)
            })
        })
        it('TC17-NA-Verify by sending the post request with valid & proper Request body, its get inserted & reflected in the Database or not', function(){

        })
        it('TC18-Positive-Verify that response body is showing as per the given request payload or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.code,
                    "description": requestBodyInfo.description,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetails,
                        "labelDescription": requestBodyInfo.labelDescription,
                        "labelId": requestBodyInfo.labelId,
                        "locationDescription": requestBodyInfo.locationDescription,
                        "locationId": requestBodyInfo.locationId,
                        "price": requestBodyInfo.price,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDate,
                    "id": requestBodyInfo.id,
                    "make": requestBodyInfo.make,
                    "series": requestBodyInfo.series
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                id18=res.body.response.id
                expect(res.body.response).to.have.property('code')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('effectiveDate')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('make')
                expect(res.body.response).to.have.property('series')
                this.details=res.body.response.details
                this.detailsLength=this.details.length
                for(let i=0; i<this.detailsLength; i++)
                {
                    expect(res.body.response.details[i]).to.have.property('id')
                    expect(res.body.response.details[i]).to.have.property('labelCategory')
                    expect(res.body.response.details[i]).to.have.property('labelDescription')
                    expect(res.body.response.details[i]).to.have.property('labelId')
                    expect(res.body.response.details[i]).to.have.property('locationDescription')
                    expect(res.body.response.details[i]).to.have.property('locationId')
                    expect(res.body.response.details[i]).to.have.property('price')
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC19-Negative-Verify that if we send the Post request without any request body then is it responding with status code 400 Bad request or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC20-NotNeeded-Verify that if user send the Post request with a Request body where user have violated the validations for fields, then is it showing a proper error message & status code in response or not', function(){

        })
        it('TC21-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": "",
                    "description": "",
                    "details": [
                      {
                        "id": "",
                        "labelDescription": "",
                        "labelId": "",
                        "locationDescription": "",
                        "locationId": "",
                        "price": "",
                      }
                    ],
                    "effectiveDate": "",
                    "id": "",
                    "make": "",
                    "series": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400) 
            })
        })
        it('TC22-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.code,
                    "description": requestBodyInfo.description,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetails,
                        "labelDescription": requestBodyInfo.labelDescription,
                        "labelId": requestBodyInfo.labelId,
                        "locationDescription": requestBodyInfo.locationDescription,
                        "locationId": requestBodyInfo.locationId,
                        "price": requestBodyInfo.price,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDate,
                    "id": requestBodyInfo.id,
                    "make": requestBodyInfo.make,
                    "series": requestBodyInfo.series
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id22=res.body.response.id
                
            })
        })
    })
    describe('Get Request Vehicle Prices Id', function(){
        it('TC23-Positive-Verify that if user given valid Vehicle Prices Id then is it respoding with status code 200 or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC24-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices/'+id,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('code')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('effectiveDate')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('make')
                expect(res.body.response).to.have.property('series')
                this.details=res.body.response.details
                this.detailsLength=this.details.length
                for(let i=0; i<this.detailsLength; i++)
                {
                    expect(res.body.response.details[i]).to.have.property('id')
                    expect(res.body.response.details[i]).to.have.property('labelCategory')
                    expect(res.body.response.details[i]).to.have.property('labelDescription')
                    expect(res.body.response.details[i]).to.have.property('labelId')
                    expect(res.body.response.details[i]).to.have.property('locationDescription')
                    expect(res.body.response.details[i]).to.have.property('locationId')
                    expect(res.body.response.details[i]).to.have.property('price')
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC25-Negative-Verify that if user given an invalid Vehicle Prices Id & send the API request then is It responding with status code 400 or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices/'+id+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC26-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC27-Positive-Verify that is user able to send GET request for same ID multiple Time & its response with proper success code or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC28-Positive-Verify the Response time of GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'vehicle-prices/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Vehicle Prices Id', function(){
        it('TC29-Positive-Verify that if user send the valid request body then the response code is shoiwng 200 ok or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'vehicle-prices/'+id,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetailsUpdate,
                        "labelDescription": requestBodyInfo.labelDescriptionUpdate,
                        "labelId": requestBodyInfo.labelIdUpdate,
                        "locationDescription": requestBodyInfo.locationDescriptionUpdate,
                        "locationId": requestBodyInfo.locationIdUpdate,
                        "price": requestBodyInfo.priceUpdate,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDateUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "make": requestBodyInfo.makeUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                
            })
        })
        it('TC30-Positive-Verify that the response data is as per the Request body or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'vehicle-prices/'+id,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetailsUpdate,
                        "labelDescription": requestBodyInfo.labelDescriptionUpdate,
                        "labelId": requestBodyInfo.labelIdUpdate,
                        "locationDescription": requestBodyInfo.locationDescriptionUpdate,
                        "locationId": requestBodyInfo.locationIdUpdate,
                        "price": requestBodyInfo.priceUpdate,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDateUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "make": requestBodyInfo.makeUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                  }
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('code')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('effectiveDate')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('make')
                expect(res.body.response).to.have.property('series')
                this.details=res.body.response.details
                this.detailsLength=this.details.length
                for(let i=0; i<this.detailsLength; i++)
                {
                    expect(res.body.response.details[i]).to.have.property('id')
                    expect(res.body.response.details[i]).to.have.property('labelCategory')
                    expect(res.body.response.details[i]).to.have.property('labelDescription')
                    expect(res.body.response.details[i]).to.have.property('labelId')
                    expect(res.body.response.details[i]).to.have.property('locationDescription')
                    expect(res.body.response.details[i]).to.have.property('locationId')
                    expect(res.body.response.details[i]).to.have.property('price')
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC31-Negative-Verify that the if user send a Valid request body with an invalid Id then its showing the response with 403 Bad request status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'vehicle-prices/'+id+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetailsUpdate,
                        "labelDescription": requestBodyInfo.labelDescriptionUpdate,
                        "labelId": requestBodyInfo.labelIdUpdate,
                        "locationDescription": requestBodyInfo.locationDescriptionUpdate,
                        "locationId": requestBodyInfo.locationIdUpdate,
                        "price": requestBodyInfo.priceUpdate,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDateUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "make": requestBodyInfo.makeUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC32-Positive-Verify that is user able to send same request body multiple times for update the same ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'vehicle-prices/'+id,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetailsUpdate,
                        "labelDescription": requestBodyInfo.labelDescriptionUpdate,
                        "labelId": requestBodyInfo.labelIdUpdate,
                        "locationDescription": requestBodyInfo.locationDescriptionUpdate,
                        "locationId": requestBodyInfo.locationIdUpdate,
                        "price": requestBodyInfo.priceUpdate,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDateUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "make": requestBodyInfo.makeUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                
            })
        })
        it('TC33-NotNeeded-Verify that if user send the put request, with a request body where field validations are violated, then is it throwing any error message with proper response code or not', function(){

        })
        it('TC34-Negative-Verify that if user send the put request, with a request body where field values are blank or "null" then is It showing any error message with status code in response or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'vehicle-prices/'+id,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": "",
                    "description": "",
                    "details": [
                      {
                        "id": "",
                        "labelDescription": "",
                        "labelId": "",
                        "locationDescription": "",
                        "locationId": "",
                        "price": "",
                      }
                    ],
                    "effectiveDate": "",
                    "id": "",
                    "make": "",
                    "series": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400) 
            })
        })
        it('TC35-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'vehicle-prices/'+id18,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "details": [
                      {
                        "id": requestBodyInfo.idDetailsUpdate,
                        "labelDescription": requestBodyInfo.labelDescriptionUpdate,
                        "labelId": requestBodyInfo.labelIdUpdate,
                        "locationDescription": requestBodyInfo.locationDescriptionUpdate,
                        "locationId": requestBodyInfo.locationIdUpdate,
                        "price": requestBodyInfo.priceUpdate,
                      }
                    ],
                    "effectiveDate": requestBodyInfo.effectiveDateUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "make": requestBodyInfo.makeUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Delete Request Vehicle Vehicle Prices Id', function(){
        it('TC36-Positive-Verify the response code is showing as 200 ok or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'vehicle-prices/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200) 
            })
        })
        it('TC37-Negative-Verify that Is user able to delete same Vehicle Vehicle Prices Id twice or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'vehicle-prices/'+id,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403) 
            })
        })
        it('TC38-NA-Verify by Sending the DELETE Request for any particular ID, that record  get removed from the DB or not', function(){

        })
        it('TC39-Positive-Validate that all the Delete parameters are coming as per swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'vehicle-prices/'+id18,
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body.response).to.have.property('code')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('effectiveDate')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('make')
                expect(res.body.response).to.have.property('series')
                expect(res.body.response).to.have.property('details')
            })
        })
        it('TC40-Negative-Verify that if user send the DELETE request for an Invalid Vehicle Vehicle Prices Id, then is it responding with a BAD REQUEST response code or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'vehicle-prices/'+id+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403) 
            })
        })
        it('TC41-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'vehicle-prices/'+id22,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})