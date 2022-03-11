///<reference types="cypress"/>
describe('Vehicle Colour Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var vehicleColourId;
    var vehicleColourId07;
    before(function(){
        cy.fixture('master/VehicleColour/VehicleColour_url').then(function(data){
            commonUrl=data.URL_VehicleColour
        })
        cy.fixture('master/VehicleColour/VehicleColour_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('master/VehicleColour/VehicleColour_body').then(function(data){
            requestBodyInfo=data
        })
    })
    describe('Get Request Vehicle Colour', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('colourFor')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('metallicIndicator')
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){
            
        })
        it('TC03-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Vehicle Colour', function(){
        it('TC04-Positive-Verify the response code & response body is as per Request Body or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBodyInfo.active,
                    "code": requestBodyInfo.code,
                    "colourFor": requestBodyInfo.colourFor,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "metallicIndicator": requestBodyInfo.metallicIndicator,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                vehicleColourId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('code', requestBodyInfo.code)
                expect(res.body.response).to.have.property('colourFor', requestBodyInfo.colourFor)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', vehicleColourId)
                expect(res.body.response).to.have.property('metallicIndicator', requestBodyInfo.metallicIndicator)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify that after sending a valid request the request is getting created in the DB or not', function(){

        })
        it('TC06-Negative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active":"",
                    "code": "",
                    "colourFor": "",
                    "description": "",
                    "id": "",
                    "metallicIndicator": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBodyInfo.active,
                    "code": requestBodyInfo.code,
                    "colourFor": requestBodyInfo.colourFor,
                    "description": requestBodyInfo.description,
                    "id": requestBodyInfo.id,
                    "metallicIndicator": requestBodyInfo.metallicIndicator,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                vehicleColourId07=res.body.response.id
            })
        })
    })
    describe('Get Request Vehicle Colour ID', function(){
        it('TC08-Positive-Verify the Status code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleColourId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('code', requestBodyInfo.code)
                expect(res.body.response).to.have.property('colourFor', requestBodyInfo.colourFor)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('id', vehicleColourId)
                expect(res.body.response).to.have.property('metallicIndicator', requestBodyInfo.metallicIndicator)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify that the response is matching with DB for Particular ID or not', function(){

        })
        it('TC10-Negative-Verify the status code if user send request with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleColourId+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify tha response time is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleColourId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Vehicle Colour Id', function(){
        it('TC12-Positive-Verify the Status code & response body is as per Request Body or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleColourId,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "colourFor": requestBodyInfo.colourForUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": vehicleColourId,
                    "metallicIndicator": requestBodyInfo.metallicIndicatorUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('code', requestBodyInfo.codeUpdate)
                expect(res.body.response).to.have.property('colourFor', requestBodyInfo.colourForUpdate)
                expect(res.body.response).to.have.property('description', requestBodyInfo.descriptionUpdate)
                expect(res.body.response).to.have.property('id', vehicleColourId)
                expect(res.body.response).to.have.property('metallicIndicator', requestBodyInfo.metallicIndicatorUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })  
        it('TC13-NA-Verify the response body is matching with DB record for the particular ID or not', function(){

        })
        it('TC14-Negative-Verify the status code if user send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleColourId+1,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "colourFor": requestBodyInfo.colourForUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": vehicleColourId,
                    "metallicIndicator": requestBodyInfo.metallicIndicatorUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC15-Negative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleColourId,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": "",
                    "code": "",
                    "colourFor": "",
                    "description": "",
                    "id": "",
                    "metallicIndicator": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC16-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleColourId07,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "colourFor": requestBodyInfo.colourForUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "id": vehicleColourId07,
                    "metallicIndicator": requestBodyInfo.metallicIndicatorUpdate,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Vehicle  Colour Id', function(){
        it('TC17-Positive-Verify the response code is showing as 200 ok or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleColourId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('colourFor', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('metallicIndicator', null) 
            })
        })
        it('TC18-Negative-Verify the status code if user send request with invalid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleColourId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-NA-Verify that the record is getting removed from the DB for the particular ID or not', function(){
            
        })
        it('TC20-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleColourId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})