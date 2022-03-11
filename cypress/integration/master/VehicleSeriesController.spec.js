///<reference types="cypress"/>

describe('Vehicle Series Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var vehicleSeriesID1;
    var vehicleSeriesID2;
    before(function(){
        cy.fixture('master/VehicleSeriesController/VehicleSeriesController_url').then(function(data){
            commonUrl=data.URL_VehicleSeriesController
        })
        cy.fixture('master/VehicleSeriesController/VehcileSeries_Header').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/VehicleSeriesController/VehicleSeries_Body').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Vehicle Series',function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger',function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if(this.contentLength<=0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('brand')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('links')
                    this.links = res.body.response.content[i].links
                    this.linksLength = this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                }
                }
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let k=0; k<this.linksLength; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
                
            })
        })
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not',function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Vehicle Series', function(){
        it('TC04-Positive-Verify the response code & response body as per the swagger or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description    
                }
            }).then(function(res){
                vehicleSeriesID1 = res.body.response.id
                expect(res.status).to.equal(201)
                expect(res.body.response).to.have.property('active',requestBody.active)
                expect(res.body.response).to.have.property('brand',requestBody.brand)
                expect(res.body.response).to.have.property('code',requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id',vehicleSeriesID1)
                expect(res.body.response).to.have.property('links')
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let l=0; l<this.linksLength; l++)
                {
                    expect(res.body.response.links[l]).to.have.property('href')
                    expect(res.body.response.links[l]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify that after sending a valid request the request is getting created in the DB or not',function(){

        })
        it('TC06-Negative-Verify the status code if user send the blank fields in the request body',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": ""    
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message',"Validation Error")
                expect(res.body.response).to.have.property('brand',"Brand name cannot be empty")
                expect(res.body.response).to.have.property('code',"Code cannot be empty")
                expect(res.body.response).to.have.property('description',"Description cannot be empty")
            })
        })
        it('TC07-Positive-Verify that the response duration is less than 1 Second or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description    
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                vehicleSeriesID2 = res.body.response.id
            })
        })
    })
    describe('Get Request Vehicle Series ID',function(){
        it('TC08-Positive-Verify the Status code & response body is as per the swagger or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleSeriesID1
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active',requestBody.active)
                expect(res.body.response).to.have.property('brand',requestBody.brand)
                expect(res.body.response).to.have.property('code',requestBody.code)
                expect(res.body.response).to.have.property('description',requestBody.description)
                expect(res.body.response).to.have.property('id',vehicleSeriesID1)
                expect(res.body.response).to.have.property('links')
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify that the response is matching with DB for Particular ID or not',function(){

        })
        it('TC10-Negative-Verify the status code if user send request with invalid Series ID',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleSeriesID1 + 1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message', "Invalid vehicle series id")
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC11-Positive-Verify tha response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + vehicleSeriesID2
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Vehicle Series ID',function(){
        it('TC12-Positive-Verify the Status code & response body is as per swagger or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleSeriesID1,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active',requestBody.activeUpdate)
                expect(res.body.response).to.have.property('brand',requestBody.brandUpdate)
                expect(res.body.response).to.have.property('code',requestBody.codeUpdate)
                expect(res.body.response).to.have.property('description',requestBody.descriptionUpdate)
                expect(res.body.response).to.have.property('id',vehicleSeriesID1)
                expect(res.body.response).to.have.property('links')
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let n=0; n<this.linksLength; n++)
                {
                    expect(res.body.response.links[n]).to.have.property('href')
                    expect(res.body.response.links[n]).to.have.property('rel')
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record for the particular ID or not',function(){

        })
        it('TC14-Negative-Verify the status code if user send the request with Invalid Series ID',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleSeriesID1 + 1,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate
                },
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message', "Invalid vehicle series id")
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC15-Negative-Verify the status code if user send the blank fields in the request body',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleSeriesID1,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": ""
                },
                failOnStatusCode: false
            }).then(function(res){
            expect(res.status).to.equal(400)
            expect(res.body).to.have.property('message',"Validation Error")
            expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC16-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + vehicleSeriesID2,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        
        })
    })
    describe('Delete Request Vehicle Series ID',function(){
        it('TC17-Positive-Verify the response body & status is as per the swagger or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleSeriesID1
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('brand', null)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('links')
            })
        })
        it('TC18-Negative-Verify the status code if user send the same request multiple time for the same ID',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleSeriesID1,
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message', "Invalid vehicle series id")
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC19-NA-Verify that the record is getting removed from the DB for the particular ID or not',function(){

        })
        it('TC20-Positive-Verify that the Response duration is less than 1 second or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + vehicleSeriesID2,
                failOnStatuscode: false
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})