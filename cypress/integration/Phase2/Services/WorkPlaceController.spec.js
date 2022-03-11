///<reference types="Cypress" />

describe('Work Place Controller', function(){
var baseUrl;
var requestBody;
var loginBody;
var accessToken;
var id;
var id1;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl= data.commonUrl
        })
        cy.fixture('Phase2/Services/WorkPlaceControllerBody').then(function(data){
            requestBody= data
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
                body:{
                    "name": loginBody.name,
                    "password": loginBody.password,
                    "mobileToken": loginBody.mobileToken,
                    "verificationCode": loginBody.verificationCode,
                },
            }).then(function(res){
                expect(res.status).to.eq(201)
                accessToken=res.body.response.accessToken
                console.log(accessToken)
            })
        })
    })
    describe('Get Request Work-place', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/work-place/',
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
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('status')
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
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/work-place/',
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Work-place', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/work-place/',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "status": requestBody.status,
                },
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('status', requestBody.status)
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }                        
            })
        })
        it('TC05-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC06-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/work-place/',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
                
            })
        })
        it('TC07-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/work-place/',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "status": requestBody.status,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id1 = res.body.response.id
            })
        })
        it('TC08-Positive-Verify in response body Createdby id is showing as per Barer Token or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/work-place/',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "status": requestBody.status,
                },
            }).then(function(res){
                expect(res.body.response).to.have.property('createdBy','Machchhindra ')
                expect(res.body.response.createdById).to.equal(1755)
            })
        })
    })
    describe('Get Request Work-place ID', function(){
        it('TC09-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('status', requestBody.status)
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }
            })
        })
        it('TC10-NA-Verify the response is matching with DB or not', function(){
            
        })
        it('TC11-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id+1,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC12-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id1,
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Work-place ID', function(){
        it('TC13-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": id,
                    "status": requestBody.statusUpdate,
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('status', requestBody.statusUpdate)
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }
            })
        })
        it('TC14-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC15-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": "",
                    "description": "",
                    "id": "",
                    "status": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC16-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id+1,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": id,
                    "status": requestBody.status,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC17-Positive-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/work-place/'+id1,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+accessToken,
                },
                body:{
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "id": id,
                    "status": requestBody.statusUpdate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})