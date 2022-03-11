///<reference types="Cypress" />

describe('Prepaid Package Job Part Controller', function(){
var baseUrl;
var contentType;
var requestBody;
var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data
        })
        cy.fixture('Phase2/Services/PrepaidPackageJobPartControllerBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Prepaid Package Maintenance - Job_Part', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/',
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
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('part')
                        expect(res.body.response.content[i]).to.have.property('partFranchise')
                        expect(res.body.response.content[i]).to.have.property('partsAmount')
                        expect(res.body.response.content[i]).to.have.property('prepaidPackageJob')
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
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request for verifying "Part No" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/part/',
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": 'PART-FRANCHISE'
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Post Request Prepaid Package Maintenance - Job_Part', function(){
        it('TC06-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": requestBody.id,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "partsAmount": requestBody.partsAmount,
                    "prepaidPackageJobId": requestBody.prepaidPackageJobId,
                  },
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response.prepaidPackageJob).to.have.property('id', requestBody.prepaidPackageJobId)
                expect(res.body.response).to.have.property('partsAmount', requestBody.partsAmount)
            })
        })
        it('TC07-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC08-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC09-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": "",
                    "partFranchiseId": "",
                    "partId": "",
                    "partsAmount": "",
                    "prepaidPackageJobId": "",
                    },
                    failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC10-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": requestBody.id,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "partsAmount": requestBody.partsAmount,
                    "prepaidPackageJobId": requestBody.prepaidPackageJobId,
                    },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Prepaid Package Maintenance - Job_Part_ID', function(){
        it('TC11-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response.prepaidPackageJob).to.have.property('id', requestBody.prepaidPackageJobId)
                expect(res.body.response).to.have.property('partsAmount', requestBody.partsAmount)
            })
        })
        it('TC12-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Prepaid Package Maintenance - Job_Part_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id + '1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Prepaid Package Maintenance - Job_Part_ID', function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": id,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "partsAmount": requestBody.partsAmount,
                    "prepaidPackageJobId": requestBody.prepaidPackageJobId,
                    },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response.prepaidPackageJob).to.have.property('id', requestBody.prepaidPackageJobId)
                expect(res.body.response).to.have.property('partsAmount', requestBody.partsAmount)
            })
        })
        it('TC15-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC16-Negative-Verify the response code, if send the request with invalid Prepaid Package Maintenance - Job_Part_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id + '1',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": id,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "partsAmount": requestBody.partsAmount,
                    "prepaidPackageJobId": requestBody.prepaidPackageJobId,
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC17-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": "",
                    "partFranchiseId": "",
                    "partId": "",
                    "partsAmount": "",
                    "prepaidPackageJobId": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC18-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/prepaid-package-job-part/' + id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body: {
                    "id": id,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "partsAmount": requestBody.partsAmount,
                    "prepaidPackageJobId": requestBody.prepaidPackageJobId,
                    },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})