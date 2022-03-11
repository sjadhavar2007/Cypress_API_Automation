///<reference types="cypress"/>

describe('Warranty Setup Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var warrantySetupId;
    var warrantySetupId03;
    before(function(){
        cy.fixture('master/WarrantySetupController/url').then(function(data){
            commonUrl=data.URL_WarrantySetupController
        })
        cy.fixture('master/WarrantySetupController/heders').then(function(data){
            headersInfo=data
        })
        cy.fixture('master/WarrantySetupController/body').then(function(data){
            requestBodyInfo=data
        })
    })
    describe('Post Request Warranty Setup', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "effectiveUnlimited": requestBodyInfo.effectiveUnlimited,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                warrantySetupId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('createdBy')
                expect(res.body.response).to.have.property('createdDate')
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBodyInfo.effectiveUnlimited)
                expect(res.body.response).to.have.property('id', warrantySetupId)
                expect(res.body.response).to.have.property('updateBy')
                expect(res.body.response).to.have.property('updatedDate')
                expect(res.body.response).to.have.property('warrantySetupDetail')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC02-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "effectiveFrom": requestBodyInfo.effectiveFrom,
                    "effectiveTo": requestBodyInfo.effectiveTo,
                    "effectiveUnlimited": requestBodyInfo.effectiveUnlimited,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                warrantySetupId03=res.body.response.id

            })
        })
    })
    describe('Get Request Warranty Setup ID', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url:commonUrl+'/'+warrantySetupId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('createdBy')
                expect(res.body.response).to.have.property('createdDate')
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFrom)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveTo)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBodyInfo.effectiveUnlimited)
                expect(res.body.response).to.have.property('id', warrantySetupId)
                expect(res.body.response).to.have.property('updateBy')
                expect(res.body.response).to.have.property('updatedDate')
                expect(res.body.response).to.have.property('warrantySetupDetail')
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
        it('TC06-Negative-Verify the status code if user send the request with Invalid Warranty Setup ID', function(){
            cy.request({
                method: 'GET',
                url:commonUrl+'/'+warrantySetupId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC07-Negative-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url:commonUrl+'/'+warrantySetupId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Warranty Setup ID', function(){
        it('TC08-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url:commonUrl+'/'+warrantySetupId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "effectiveUnlimited": requestBodyInfo.effectiveUnlimited,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('createdBy')
                expect(res.body.response).to.have.property('createdDate')
                expect(res.body.response).to.have.property('effectiveFrom', requestBodyInfo.effectiveFromUpdate)
                expect(res.body.response).to.have.property('effectiveTo', requestBodyInfo.effectiveToUpdate)
                expect(res.body.response).to.have.property('effectiveUnlimited', requestBodyInfo.effectiveUnlimited)
                expect(res.body.response).to.have.property('id', warrantySetupId)
                expect(res.body.response).to.have.property('updateBy')
                expect(res.body.response).to.have.property('updatedDate')
                expect(res.body.response).to.have.property('warrantySetupDetail')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC10-Negative-Verify the status code if user send the request with Invalid Warranty Setup ID', function(){
            cy.request({
                method: 'PUT',
                url:commonUrl+'/'+warrantySetupId+'1',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "effectiveUnlimited": requestBodyInfo.effectiveUnlimited,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url:commonUrl+'/'+warrantySetupId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "effectiveFrom": requestBodyInfo.effectiveFromUpdate,
                    "effectiveTo": requestBodyInfo.effectiveToUpdate,
                    "effectiveUnlimited": requestBodyInfo.effectiveUnlimited,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Warranty Setup Details', function(){
        it('TC16-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+warrantySetupId+'/warranty-setup-detail',
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
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC17-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC18-Negative-Verify the status code if user send the request with Invalid Warranty Setup ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+warrantySetupId+'1'+'/warranty-setup-detail',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC19-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+warrantySetupId03+'/warranty-setup-detail',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Warranty Setup Details', function(){
        it('TC20-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+warrantySetupId+'/warranty-setup-detail',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyTypeId": requestBodyInfo.warrantyTypeId
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
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC21-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC22-Negative-Verify the status code if user send the request with Invalid Warranty Setup ID', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+warrantySetupId+'1'+'/warranty-setup-detail',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyTypeId": requestBodyInfo.warrantyTypeId
                    }
                  ],
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC23-Positive-Verify the Response Duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+warrantySetupId+'/warranty-setup-detail',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: [
                    {
                      "accessoryWarrantyException": [
                        {
                          "accyCode": requestBodyInfo.accyCode,
                          "months": requestBodyInfo.months
                        }
                      ],
                      "months": requestBodyInfo.monthsNew,
                      "warrantyTypeId": requestBodyInfo.warrantyTypeId
                    }
                  ]
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Warranty Setup ID', function(){
        it('TC12-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+warrantySetupId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC13-NA-Verify the record is getting removed from with DB or not', function(){

        })
        it('TC14-Negative-Verify the status code, if try to send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+warrantySetupId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC15-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+warrantySetupId03,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    
})