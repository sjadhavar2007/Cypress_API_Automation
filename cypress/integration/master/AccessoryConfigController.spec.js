///<reference types="cypress"/>

import getCode from "./UtilityAccessoryConfigController/getName";

describe('Accessory Config Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var uniqueCode;
    var accessoryConfigId;
    var accessoryConfigId07;
    before(function(){
        cy.fixture('master/AccessoryConfigController/AccessoryConfig_url').then(function(data){
            commonUrl = data.URL_AccessoryConfigController
        })
        cy.fixture('master/AccessoryConfigController/AccessoryConfig_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/AccessoryConfigController/AccessoryConfig_body').then(function(data){
            requestBodyInfo = data
        })
        const code=new getCode();
        uniqueCode=code.getCode();
    })

    describe('Get Request Accessory Config', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger or not', function(){
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
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
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
    describe('Post Request Accessory Config', function(){
        it('TC04-Positive-Verify the response code & response body as per the request body or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                auth: {
                    "Bearer Tokan": "A1067A07-B9D9-4C33-9762-DAD0665E3A78"
                },
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "code": uniqueCode,
                    "description": requestBodyInfo.description,
                    "active": requestBodyInfo.active,
                    "id": requestBodyInfo.id
                },
                
            }).then(function(res){
                expect(res.status).to.equal(201)
                accessoryConfigId=res.body.response.id
                expect(res.body.response).to.have.property('code', uniqueCode)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('id', accessoryConfigId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that after sending a valid request the request is getting created in the DB or not', function(){

        })
        it('TC06-PNegative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": "",
                    "description": "",
                    "active": "",
                    "id": "",
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
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": uniqueCode+'a',
                    "description": requestBodyInfo.description,
                    "active": requestBodyInfo.active,
                    "id": requestBodyInfo.id
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                accessoryConfigId07=res.body.response.id
            })
        })
    })
    describe('Get Request Accessory Config ID', function(){
        it('TC08-Positive-Verify the Status code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+accessoryConfigId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('code', uniqueCode)
                expect(res.body.response).to.have.property('description', requestBodyInfo.description)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('id', accessoryConfigId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
                
            })
        })
        it('TC09-NA-Verify that the response is matching with DB for Particular ID or not', function(){

        })
        it('TC10-Negative-Verify the status code if user send request with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+accessoryConfigId+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify tha response time is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+accessoryConfigId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Accessory Config ID', function(){
        it('TC12-Positive-Verify the response code & response body as per the request body or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryConfigId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": uniqueCode+'AA',
                    "description": requestBodyInfo.description+'NEW',
                    "active": requestBodyInfo.active,
                    "id": accessoryConfigId,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('code', uniqueCode+'AA')
                expect(res.body.response).to.have.property('description', requestBodyInfo.description+'NEW')
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('id', accessoryConfigId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record for the particular ID or not', function(){

        })
        it('TC14-Negative-Verify the status code if user send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryConfigId+12,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": uniqueCode+'b',
                    "description": requestBodyInfo.description+'NEW',
                    "active": requestBodyInfo.active,
                    "id": accessoryConfigId,
                },
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC15-Negative-Verify the status code if user send the blank fields in the request body', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryConfigId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": "",
                    "description": "",
                    "active": "",
                    "id": "",
                },
                failOnStatusCode: false
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC16-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+accessoryConfigId07,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                }, body: {
                    "code": uniqueCode+'b',
                    "description": requestBodyInfo.description+'NEW',
                    "active": requestBodyInfo.active,
                    "id": accessoryConfigId07,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Accessory Config ID', function(){
        it('TC17-Positive-Verify the response body & status is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+accessoryConfigId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('description', null)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('id', null)
                
            })
        })
        it('TC18-Negative-Verify the status code if user send the invalid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+accessoryConfigId,
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
                url: commonUrl+'/'+accessoryConfigId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})