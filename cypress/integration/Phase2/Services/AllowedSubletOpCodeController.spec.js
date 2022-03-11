///<reference types="cypress" />

describe('Allowed Sublet Op Code Controller', function(){
    var baseUrl;
    var contentType;
    var requestBody;
    var loginBody;
    var accessToken;
    var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data.Content_Type
        })
        cy.fixture('Phase2/Services/AllowedSubletOpCodeController').then(function(data){
            requestBody = data
        })
        cy.fixture('Phase2/commonBody').then(function(data){
            loginBody=data
        })
    })
    describe('Login Controller', function(){
        it('Create Bearer token for Authorization', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/admin/v1/login/auth',
                headers:{
                    "Content-Type":"application/json"
                },
                body: {
                    "name": loginBody.name,
                    "password": loginBody.password,
                    "mobileToken": loginBody.mobileToken,
                    "verificationCode": loginBody.verificationCode,
                },
            }).then(function(res){
                expect(res.status).to.eq(201)
                accessToken=res.body.response.accessToken
            })
        })
    })
    describe('Get Request allowed-sublet-op-code', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                mrthod:'GET',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/',
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else 
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('labourChargeOutAmount')
                        expect(res.body.response.content[i]).to.have.property('labourChargeOutIndicator')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('materialChargeOutAmount')
                        expect(res.body.response.content[i]).to.have.property('materialChargeOutIndicator')
                        expect(res.body.response.content[i]).to.have.property('model')
                        expect(res.body.response.content[i]).to.have.property('opCodeList')
                        expect(res.body.response.content[i]).to.have.property('partsChargeOutAmount')
                        expect(res.body.response.content[i]).to.have.property('partsChargeOutIndicator')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                    }
                }
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                mrthod:'GET',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/',
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Verify the status CODE & Response body as per the swagger', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "PRE_ALLOWED_SUBLET_AMOUNT_TYPE",

                },
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'PRE_ALLOWED_SUBLET_AMOUNT_TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify that Response body is matching with DB or not', function(){

        })
    })
    describe('Post Request allowed-sublet-op-code', function(){
        it('TC06-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/',
                headers:{
                    'Content-Type':contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "id": requestBody.id,
                    "labourChargeOutAmount": requestBody.labourChargeOutAmount,
                    "labourChargeOutIndicatorId": requestBody.labourChargeOutIndicatorId,
                    "materialChargeOutAmount": requestBody.materialChargeOutAmount,
                    "materialChargeOutIndicatorId": requestBody.materialChargeOutIndicatorId,
                    "modelId": requestBody.modelId,
                    "opCodeList": [
                      requestBody.opCodeList
                    ],
                    "partsChargeOutAmount": requestBody.partsChargeOutAmount,
                    "partsChargeOutIndicatorId": requestBody.partsChargeOutIndicatorId,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('labourChargeOutAmount', requestBody.labourChargeOutAmount)
                expect(res.body.response.labourChargeOutIndicator).to.have.property('id', requestBody.labourChargeOutIndicatorId)
                expect(res.body.response).to.have.property('materialChargeOutAmount', requestBody.materialChargeOutAmount)
                expect(res.body.response.materialChargeOutIndicator).to.have.property('id', requestBody.materialChargeOutIndicatorId)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeList)
                expect(res.body.response).to.have.property('partsChargeOutAmount', requestBody.partsChargeOutAmount)
                expect(res.body.response.partsChargeOutIndicator).to.have.property('id', requestBody.partsChargeOutIndicatorId)
            })
        })
        it('TC07-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/',
                headers:{
                    'Content-Type':contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "id": "",
                    "labourChargeOutAmount": "",
                    "labourChargeOutIndicatorId":"",
                    "materialChargeOutAmount": "",
                    "materialChargeOutIndicatorId": "",
                    "modelId": "",
                    "opCodeList": [
                      ""
                    ],
                    "partsChargeOutAmount": "",
                    "partsChargeOutIndicatorId": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/',
                headers:{
                    'Content-Type':contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "id": requestBody.id,
                    "labourChargeOutAmount": requestBody.labourChargeOutAmount,
                    "labourChargeOutIndicatorId": requestBody.labourChargeOutIndicatorId,
                    "materialChargeOutAmount": requestBody.materialChargeOutAmount,
                    "materialChargeOutIndicatorId": requestBody.materialChargeOutIndicatorId,
                    "modelId": requestBody.modelId,
                    "opCodeList": [
                      requestBody.opCodeList
                    ],
                    "partsChargeOutAmount": requestBody.partsChargeOutAmount,
                    "partsChargeOutIndicatorId": requestBody.partsChargeOutIndicatorId,
                  },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request allowed-sublet-op-code ID', function(){
        it('TC10-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('labourChargeOutAmount', requestBody.labourChargeOutAmount)
                expect(res.body.response.labourChargeOutIndicator).to.have.property('id', requestBody.labourChargeOutIndicatorId)
                expect(res.body.response).to.have.property('materialChargeOutAmount', requestBody.materialChargeOutAmount)
                expect(res.body.response.materialChargeOutIndicator).to.have.property('id', requestBody.materialChargeOutIndicatorId)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeList)
                expect(res.body.response).to.have.property('partsChargeOutAmount', requestBody.partsChargeOutAmount)
                expect(res.body.response.partsChargeOutIndicator).to.have.property('id', requestBody.partsChargeOutIndicatorId)
            })
        })
        it('TC11-NA-Verify the response is matching with DB record or not', function(){

        })
        it('TC12-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id+1,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request allowed-sublet-op-code ID ', function(){
        it('TC14-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id,
                headers: {
                    "Content-Type": contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "id": requestBody.id,
                    "labourChargeOutAmount": requestBody.labourChargeOutAmount,
                    "labourChargeOutIndicatorId": requestBody.labourChargeOutIndicatorId,
                    "materialChargeOutAmount": requestBody.materialChargeOutAmount,
                    "materialChargeOutIndicatorId": requestBody.materialChargeOutIndicatorId,
                    "modelId": requestBody.modelId,
                    "opCodeList": [
                      requestBody.opCodeList
                    ],
                    "partsChargeOutAmount": requestBody.partsChargeOutAmount,
                    "partsChargeOutIndicatorId": requestBody.partsChargeOutIndicatorId,
                  },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('labourChargeOutAmount', requestBody.labourChargeOutAmount)
                expect(res.body.response.labourChargeOutIndicator).to.have.property('id', requestBody.labourChargeOutIndicatorId)
                expect(res.body.response).to.have.property('materialChargeOutAmount', requestBody.materialChargeOutAmount)
                expect(res.body.response.materialChargeOutIndicator).to.have.property('id', requestBody.materialChargeOutIndicatorId)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.opCodeList[0]).to.have.property('id', requestBody.opCodeList)
                expect(res.body.response).to.have.property('partsChargeOutAmount', requestBody.partsChargeOutAmount)
                expect(res.body.response.partsChargeOutIndicator).to.have.property('id', requestBody.partsChargeOutIndicatorId)
            })
        })
        it('TC15-NA-Verify the response body is matching with DB record or not', function(){
                
        })
        it('TC16-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method:'PUT',
                url:baseUrl+'/api/dms/services/v1/allowed-sublet-op-code/'+ id,
                headers:{
                    'Content-Type':contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "id": "",
                    "labourChargeOutAmount": "",
                    "labourChargeOutIndicatorId":"",
                    "materialChargeOutAmount": "",
                    "materialChargeOutIndicatorId": "",
                    "modelId": "",
                    "opCodeList": [
                      ""
                    ],
                    "partsChargeOutAmount": "",
                    "partsChargeOutIndicatorId": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC17-Negative-Verify the response code, if send the request with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id+'11',
                headers: {
                    "Content-Type": contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body: {
                    "id": requestBody.id,
                    "labourChargeOutAmount": requestBody.labourChargeOutAmount,
                    "labourChargeOutIndicatorId": requestBody.labourChargeOutIndicatorId,
                    "materialChargeOutAmount": requestBody.materialChargeOutAmount,
                    "materialChargeOutIndicatorId": requestBody.materialChargeOutIndicatorId,
                    "modelId": requestBody.modelId,
                    "opCodeList": [
                      requestBody.opCodeList
                    ],
                    "partsChargeOutAmount": requestBody.partsChargeOutAmount,
                    "partsChargeOutIndicatorId": requestBody.partsChargeOutIndicatorId,
                  },
                    failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/allowed-sublet-op-code/' + id,
                headers: {
                    "Content-Type": contentType,
                    "Authorization": "Bearer "+accessToken,
                },
                body: {
                    "id": requestBody.id,
                    "labourChargeOutAmount": requestBody.labourChargeOutAmount,
                    "labourChargeOutIndicatorId": requestBody.labourChargeOutIndicatorId,
                    "materialChargeOutAmount": requestBody.materialChargeOutAmount,
                    "materialChargeOutIndicatorId": requestBody.materialChargeOutIndicatorId,
                    "modelId": requestBody.modelId,
                    "opCodeList": [
                      requestBody.opCodeList
                    ],
                    "partsChargeOutAmount": requestBody.partsChargeOutAmount,
                    "partsChargeOutIndicatorId": requestBody.partsChargeOutIndicatorId,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})