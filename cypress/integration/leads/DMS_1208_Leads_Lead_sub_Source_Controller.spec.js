///<reference types="cypress"/>
import getName from './UtilityLeadsController/getName'
describe('DMS-1208_Leads_Lead_sub_Source_Controller (Lead Sub Source Controller)', function(){
    var commonUrl;
    var requestBody;
    var dynamicName;
    var sourceId;
    var sourceId07;
    before(function(){
        cy.fixture('leads/DMS_1208/url').then(function(data){
            commonUrl = data.URL_LeadSubSourceController
        })
        cy.fixture('leads/DMS_1208/body').then(function(data){
            requestBody = data
        })
        const name= new getName();
        dynamicName= name.getName();
    })
    describe('Get Request Lead sub Source', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
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
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('cost')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('effectiveFrom')
                        expect(res.body.response.content[i]).to.have.property('effectiveTo')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('outlet')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
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
    describe('Post Request Lead Source', function(){
        it('TC04-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "code": requestBody.code,
                    "cost":requestBody.cost,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id":requestBody.id,
                    "leadSourceId": requestBody.leadSourceId,
                    "name": dynamicName,
                    "outlet": requestBody.outlet,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                sourceId = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('cost', requestBody.cost)
                expect(res.body.response).to.have.property('effectiveFrom')
                expect(res.body.response).to.have.property('effectiveTo') 
                expect(res.body.response).to.have.property('id', sourceId)
                expect(res.body.response).to.have.property('leadSourceId')
                expect(res.body.response).to.have.property('name', dynamicName)
                expect(res.body.response).to.have.property('outlet', requestBody.outlet)
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
        it('TC06-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": "",
                    "code": "",
                    "cost":"",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                    "id":"",
                    "leadSourceId": "",
                    "name": "",
                    "outlet": "",
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
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "code": requestBody.code,
                    "cost":requestBody.cost,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id":requestBody.id,
                    "leadSourceId": requestBody.leadSourceId,
                    "name": dynamicName+'A',
                    "outlet": requestBody.outlet,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                sourceId07 = res.body.response.id
            })
        })
    })
    describe('Get Request Lead Source Id', function(){
        it('TC08-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('cost', requestBody.cost)
                expect(res.body.response).to.have.property('effectiveFrom')
                expect(res.body.response).to.have.property('effectiveTo') 
                expect(res.body.response).to.have.property('id', sourceId)
                expect(res.body.response).to.have.property('leadSourceId')
                expect(res.body.response).to.have.property('name', dynamicName)
                expect(res.body.response).to.have.property('outlet', requestBody.outlet)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC09-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC10-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId07+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+sourceId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Lead Source Id', function(){
        it('TC12-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+sourceId,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "code": requestBody.code,
                    "cost":requestBody.cost,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id":requestBody.id,
                    "leadSourceId": requestBody.leadSourceId,
                    "name": dynamicName+'AA',
                    "outlet": requestBody.outlet,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('cost', requestBody.cost)
                expect(res.body.response).to.have.property('effectiveFrom')
                expect(res.body.response).to.have.property('effectiveTo') 
                expect(res.body.response).to.have.property('id', sourceId)
                expect(res.body.response).to.have.property('leadSourceId')
                expect(res.body.response).to.have.property('name', dynamicName+'AA')
                expect(res.body.response).to.have.property('outlet', requestBody.outlet)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC14-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+sourceId07,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": "",
                    "code": "",
                    "cost":"",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                    "id":"",
                    "leadSourceId": "",
                    "name": "",
                    "outlet": "",
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC15-Negative-Verify the response code, if send the request with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+sourceId07+12,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "code": requestBody.code,
                    "cost":requestBody.cost,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id":requestBody.id,
                    "leadSourceId": requestBody.leadSourceId,
                    "name": dynamicName+'b',
                    "outlet": requestBody.outlet,
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+ sourceId07,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "active": requestBody.active,
                    "code": requestBody.code,
                    "cost":requestBody.cost,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id":requestBody.id,
                    "leadSourceId": requestBody.leadSourceId,
                    "name": dynamicName+'ab',
                    "outlet": requestBody.outlet,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Lead Source Id', function(){
        it('TC17-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('cost', null)
                expect(res.body.response).to.have.property('effectiveFrom', null)
                expect(res.body.response).to.have.property('effectiveTo', null) 
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('leadSourceId', null)
                expect(res.body.response).to.have.property('name', null)
                expect(res.body.response).to.have.property('outlet', null)
            })
        })
        it('TC18-NA-Verify the response body is matching with DB record or not', function(){

        })
        it('TC19-Negative-Verify the response code, if user send the same request twice', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+sourceId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})