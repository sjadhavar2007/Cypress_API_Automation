///<reference types="cypress"/>

describe('Accessory Warranty Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var vehicleWarrantyId;
    var vehicleWarrantyId06;
    var accessoryWarrantyDetailId;
    before(function(){
        cy.fixture('master/AccessoryWarrantyController/Url').then(function(data){
            commonUrl = data.URL_AccessoryWarrantyController
        })
        cy.fixture('master/AccessoryWarrantyController/headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/AccessoryWarrantyController/Body').then(function(data){
            requestBodyInfo = data
        })
    })
    describe('Get Request Accessory Warranty', function(){
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
                    expect(res.body.response.content[i]).to.have.property('effectiveFrom')
                    expect(res.body.response.content[i]).to.have.property('effectiveTo')
                    expect(res.body.response.content[i]).to.have.property('hybridIndicator')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                    expect(res.body.response.content[i]).to.have.property('series')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
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
        it('TC02-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Accessory Warranty', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brand": requestBodyInfo.brand,
                    "code": requestBodyInfo.code,
                    "description": requestBodyInfo.description,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "hybridIndicator": requestBodyInfo.hybridIndicator,
                    "series": requestBodyInfo.series,
                },
            }).then(function(res){
                expect(res.status).to.equal(201)
                vehicleWarrantyId = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brand)
                expect(res.body.response).to.have.property('code', requestBodyInfo.code)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('hybridIndicator', requestBodyInfo.hybridIndicator)
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('series', requestBodyInfo.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC06-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "brand": requestBodyInfo.brand,
                    "code": requestBodyInfo.code,
                    "description": requestBodyInfo.description,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "hybridIndicator": requestBodyInfo.hybridIndicator,
                    "series": requestBodyInfo.series,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                vehicleWarrantyId06 = res.body.response.id
            })
        })
    })
    describe('Post Request Accessory Warranty Exception Details', function(){
        it('TC19-Positive-Verify the response code & body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId+'/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months,
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyType": requestBodyInfo.warrantyType,
                    }
                  ]
            }).then(function(res){
                expect(res.status).to.equal(201)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    console.log(this.contentLength)
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC20-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC21-Negative-Verify the status code, if user send the request with Invalid ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId+'12/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months,
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyType": requestBodyInfo.warrantyType,
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC22-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+vehicleWarrantyId06+'/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months,
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyType": requestBodyInfo.warrantyType,
                    }
                  ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Accessory Warranty ID', function(){
        it('TC07-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                accessoryWarrantyDetailId= res.body.response.accessoryWarrantyDetail[0].accessoryWarrantyException[0].id
                
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brand)
                expect(res.body.response).to.have.property('code', requestBodyInfo.code)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('hybridIndicator', requestBodyInfo.hybridIndicator)
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('series', requestBodyInfo.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC08-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC09-Negative-Verify the response Code if user send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC10-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+vehicleWarrantyId,
            }).then(function(res){
                expect(res.duration).to.lessThan(403)
            })
        })
    })
    describe('Put Request Accessory Warranty ID', function(){
        it('TC11-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleWarrantyId,
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brand": requestBodyInfo.brandUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "hybridIndicator": requestBodyInfo.hybridIndicatorUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('brand', requestBodyInfo.brandUpdate)
                expect(res.body.response).to.have.property('code', requestBodyInfo.codeUpdate)
                expect(res.body.response).to.have.property('description', requestBodyInfo.descriptionUpdate)
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFromUpdate)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveToUpdate)
                expect(res.body.response).to.have.property('hybridIndicator', requestBodyInfo.hybridIndicatorUpdate)
                expect(res.body.response).to.have.property('id', vehicleWarrantyId)
                expect(res.body.response).to.have.property('series', requestBodyInfo.seriesUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC12-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC13-Negative-Verify the response Code if user send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleWarrantyId+12,
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brand": requestBodyInfo.brandUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "hybridIndicator": requestBodyInfo.hybridIndicatorUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+vehicleWarrantyId,
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "brand": requestBodyInfo.brandUpdate,
                    "code": requestBodyInfo.codeUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "hybridIndicator": requestBodyInfo.hybridIndicatorUpdate,
                    "series": requestBodyInfo.seriesUpdate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Accessory Warranty Exception Details', function(){
        it('TC23-Positive-Verify the response code & body is as per the swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryWarrantyDetailId+'/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body: 
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCodeUpdate,
                          "months": requestBodyInfo.monthsUpdate,
                        }
                      ],
                      "months": requestBodyInfo.monthsNewUpdate,
                      "warrantyType": requestBodyInfo.warrantyTypeUpdate,
                    },
                  
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC24-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC25-Negative-Verify the status code, if user send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryWarrantyDetailId+'12/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body:
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCodeUpdate,
                          "months": requestBodyInfo.monthsUpdate,
                        }
                      ],
                      "months": requestBodyInfo.monthsNewUpdate,
                      "warrantyType": requestBodyInfo.warrantyTypeUpdate,
                    },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC26-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryWarrantyDetailId+'/accessory-warranty-detail',
                headers : {
                    "Content-Type": headersInfo.ContentType,
                },
                body:{
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCodeUpdate,
                          "months": requestBodyInfo.monthsUpdate,
                        }
                      ],
                      "months": requestBodyInfo.monthsNewUpdate,
                      "warrantyType": requestBodyInfo.warrantyTypeUpdate,
                    }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Accessory Warranty ID', function(){
        it('TC15-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleWarrantyId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('brand', null)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('effectiveFrom', null)
                expect(res.body.response).to.have.property('effectiveTo', null)
                expect(res.body.response).to.have.property('hybridIndicator', false)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('series', null)
            })
        })
        it('TC16-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC17-Positive-Verify the status code if send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleWarrantyId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+vehicleWarrantyId06,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})