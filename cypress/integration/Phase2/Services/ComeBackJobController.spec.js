///<reference types="cypress" />

describe('Come Back Job Controller', function(){
    var baseUrl;
    var contentType;
    var requestBody;
    var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data.Content_Type
        })
        cy.fixture('Phase2/Services/ComeBackJobController').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Come Back Job', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/come-back-job/',
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
                        expect(res.body.response.content[i]).to.have.property('comeBackJob')
                        expect(res.body.response.content[i]).to.have.property('comeBackJobName')
                        expect(res.body.response.content[i]).to.have.property('daysSinceLastService')
                        expect(res.body.response.content[i]).to.have.property('excludeJobType')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('mileageCheck')
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
        it('TC03-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/come-back-job/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request for verifying "Exclude Job type" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": "JOB-TYPE"
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
                        expect(res.body.response.content[i]).to.have.property('category', 'JOB-TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Post Request Come Back Job', function(){
        it('TC06-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/come-back-job/',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                "comeBackJob": requestBody.comeBackJob,
                "comeBackJobName": requestBody.comeBackJobName,
                "daysSinceLastService": requestBody.daysSinceLastService,
                "excludeJobTypeId": [
                    requestBody.excludeJobTypeId
                ],
                "id": requestBody.id,
                "mileageCheck": requestBody.mileageCheck,
              }
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('comeBackJob', requestBody.comeBackJob)
                expect(res.body.response).to.have.property('comeBackJobName', requestBody.comeBackJobName)
                expect(res.body.response).to.have.property('daysSinceLastService', requestBody.daysSinceLastService)
                expect(res.body.response.excludeJobType[0]).to.equal(null)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileageCheck', requestBody.mileageCheck)
            })
        })
        it('TC07-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC08-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC09-Positive-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/come-back-job/',
                headers: {
                    'Content-Type': contentType
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC10-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/come-back-job/',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                "comeBackJob": requestBody.comeBackJob,
                "comeBackJobName": requestBody.comeBackJobName,
                "daysSinceLastService": requestBody.daysSinceLastService,
                "excludeJobTypeId": [
                    requestBody.excludeJobTypeId
                ],
                "id": requestBody.id,
                "mileageCheck": requestBody.mileageCheck,
                }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request Come Back Job_ID', function(){
        it('TC11-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('comeBackJob', requestBody.comeBackJob)
                expect(res.body.response).to.have.property('comeBackJobName', requestBody.comeBackJobName)
                expect(res.body.response).to.have.property('daysSinceLastService', requestBody.daysSinceLastService)
                expect(res.body.response.excludeJobType[0]).to.equal(null)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileageCheck', requestBody.mileageCheck)
            })
        })
        it('TC12-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Come Back Job_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put Request Come Back Job_ID', function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                "comeBackJob": requestBody.comeBackJob,
                "comeBackJobName": requestBody.comeBackJobName,
                "daysSinceLastService": requestBody.daysSinceLastService,
                "excludeJobTypeId": [
                    requestBody.excludeJobTypeId
                ],
                "id": requestBody.id,
                "mileageCheck": requestBody.mileageCheck,
                }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('comeBackJob', requestBody.comeBackJob)
                expect(res.body.response).to.have.property('comeBackJobName', requestBody.comeBackJobName)
                expect(res.body.response).to.have.property('daysSinceLastService', requestBody.daysSinceLastService)
                expect(res.body.response.excludeJobType[0]).to.equal(null)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('mileageCheck', requestBody.mileageCheck)
            })
        })
        it('TC16-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with invalid Come Back Job_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                "comeBackJob": requestBody.comeBackJob,
                "comeBackJobName": requestBody.comeBackJobName,
                "daysSinceLastService": requestBody.daysSinceLastService,
                "excludeJobTypeId": [
                    requestBody.excludeJobTypeId
                ],
                "id": requestBody.id,
                "mileageCheck": requestBody.mileageCheck,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Positive-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC19-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/come-back-job/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                "comeBackJob": requestBody.comeBackJob,
                "comeBackJobName": requestBody.comeBackJobName,
                "daysSinceLastService": requestBody.daysSinceLastService,
                "excludeJobTypeId": [
                    requestBody.excludeJobTypeId
                ],
                "id": requestBody.id,
                "mileageCheck": requestBody.mileageCheck,
                }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})