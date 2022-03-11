///<reference types="cypress" />

describe('Job Details Controller', function(){
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
        cy.fixture('Phase2/Services/JobDetailsController').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Job Details', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/job-details/',
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
                        expect(res.body.response.content[i]).to.have.property('classDisc')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('customerPay')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('flatRate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('jobType')
                        expect(res.body.response.content[i]).to.have.property('labour')
                        expect(res.body.response.content[i]).to.have.property('labourTax')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('packageDisc')
                        expect(res.body.response.content[i]).to.have.property('parentId')
                        expect(res.body.response.content[i]).to.have.property('parentType')
                        expect(res.body.response.content[i]).to.have.property('part')
                        expect(res.body.response.content[i]).to.have.property('partTax')
                        expect(res.body.response.content[i]).to.have.property('prepaidDisc')
                        expect(res.body.response.content[i]).to.have.property('promoDisc')
                        expect(res.body.response.content[i]).to.have.property('rate')
                        expect(res.body.response.content[i]).to.have.property('sublet')
                        expect(res.body.response.content[i]).to.have.property('total')
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
                url: baseUrl+'/api/dms/services/v1/job-details/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request for verifying "Job Type" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "JOB-TYPE",
                },
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
                        expect(res.body.response.content[i]).to.have.property('category', 'JOB-TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })  
    describe('Post Request Job Details', function(){
        it('TC06-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/job-details',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "classDisc": requestBody.classDisc,
                    "customerPay": requestBody.customerPay,
                    "description": requestBody.description,
                    "flatRate": requestBody.flatRate,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labour": requestBody.labour,
                    "labourTax": requestBody.labourTax,
                    "packageDisc": requestBody.packageDisc,
                    "parentId": requestBody.parentId,
                    "parentType": requestBody.parentType,
                    "part": requestBody.part,
                    "partTax": requestBody.partTax,
                    "prepaidDisc": requestBody.prepaidDisc,
                    "promoDisc": requestBody.promoDisc,
                    "rate": requestBody.rate,
                    "sublet": requestBody.sublet,
                    "total": requestBody.total,
                  },                  
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('classDisc', requestBody.classDisc)
                expect(res.body.response).to.have.property('customerPay', requestBody.customerPay)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('flatRate', requestBody.flatRate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labour', requestBody.labour)
                expect(res.body.response).to.have.property('labourTax', requestBody.labourTax)
                expect(res.body.response).to.have.property('packageDisc', requestBody.packageDisc)
                expect(res.body.response).to.have.property('parentId', requestBody.parentId)
                expect(res.body.response).to.have.property('parentType', requestBody.parentType)
                expect(res.body.response).to.have.property('part', requestBody.part)
                expect(res.body.response).to.have.property('partTax', requestBody.partTax)
                expect(res.body.response).to.have.property('prepaidDisc', requestBody.prepaidDisc)
                expect(res.body.response).to.have.property('promoDisc', requestBody.promoDisc)
                expect(res.body.response).to.have.property('rate', requestBody.rate)
                expect(res.body.response).to.have.property('sublet', requestBody.sublet)
                expect(res.body.response).to.have.property('total', requestBody.total)
            })
        })
        it('TC07-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC08-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC09-Positive-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/job-details',
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
                url: baseUrl+'/api/dms/services/v1/job-details',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "classDisc": requestBody.classDisc,
                    "customerPay": requestBody.customerPay,
                    "description": requestBody.description,
                    "flatRate": requestBody.flatRate,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labour": requestBody.labour,
                    "labourTax": requestBody.labourTax,
                    "packageDisc": requestBody.packageDisc,
                    "parentId": requestBody.parentId,
                    "parentType": requestBody.parentType,
                    "part": requestBody.part,
                    "partTax": requestBody.partTax,
                    "prepaidDisc": requestBody.prepaidDisc,
                    "promoDisc": requestBody.promoDisc,
                    "rate": requestBody.rate,
                    "sublet": requestBody.sublet,
                    "total": requestBody.total,
                  },                  
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request Job Details_ID', function(){
        it('TC11-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('classDisc', requestBody.classDisc)
                expect(res.body.response).to.have.property('customerPay', requestBody.customerPay)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('flatRate', requestBody.flatRate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labour', requestBody.labour)
                expect(res.body.response).to.have.property('labourTax', requestBody.labourTax)
                expect(res.body.response).to.have.property('packageDisc', requestBody.packageDisc)
                expect(res.body.response).to.have.property('parentId', requestBody.parentId)
                expect(res.body.response).to.have.property('parentType', requestBody.parentType)
                expect(res.body.response).to.have.property('part', requestBody.part)
                expect(res.body.response).to.have.property('partTax', requestBody.partTax)
                expect(res.body.response).to.have.property('prepaidDisc', requestBody.prepaidDisc)
                expect(res.body.response).to.have.property('promoDisc', requestBody.promoDisc)
                expect(res.body.response).to.have.property('rate', requestBody.rate)
                expect(res.body.response).to.have.property('sublet', requestBody.sublet)
                expect(res.body.response).to.have.property('total', requestBody.total)
            })
        })
        it('TC12-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Job Details_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put Request Job Details_ID', function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "classDisc": requestBody.classDisc,
                    "customerPay": requestBody.customerPay,
                    "description": requestBody.description,
                    "flatRate": requestBody.flatRate,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labour": requestBody.labour,
                    "labourTax": requestBody.labourTax,
                    "packageDisc": requestBody.packageDisc,
                    "parentId": requestBody.parentId,
                    "parentType": requestBody.parentType,
                    "part": requestBody.part,
                    "partTax": requestBody.partTax,
                    "prepaidDisc": requestBody.prepaidDisc,
                    "promoDisc": requestBody.promoDisc,
                    "rate": requestBody.rate,
                    "sublet": requestBody.sublet,
                    "total": requestBody.total,
                  },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('classDisc', requestBody.classDisc)
                expect(res.body.response).to.have.property('customerPay', requestBody.customerPay)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('flatRate', requestBody.flatRate)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labour', requestBody.labour)
                expect(res.body.response).to.have.property('labourTax', requestBody.labourTax)
                expect(res.body.response).to.have.property('packageDisc', requestBody.packageDisc)
                expect(res.body.response).to.have.property('parentId', requestBody.parentId)
                expect(res.body.response).to.have.property('parentType', requestBody.parentType)
                expect(res.body.response).to.have.property('part', requestBody.part)
                expect(res.body.response).to.have.property('partTax', requestBody.partTax)
                expect(res.body.response).to.have.property('prepaidDisc', requestBody.prepaidDisc)
                expect(res.body.response).to.have.property('promoDisc', requestBody.promoDisc)
                expect(res.body.response).to.have.property('rate', requestBody.rate)
                expect(res.body.response).to.have.property('sublet', requestBody.sublet)
                expect(res.body.response).to.have.property('total', requestBody.total)
            })
        })
        it('TC16-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with invalid Job Details_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body:{
                    "classDisc": requestBody.classDisc,
                    "customerPay": requestBody.customerPay,
                    "description": requestBody.description,
                    "flatRate": requestBody.flatRate,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labour": requestBody.labour,
                    "labourTax": requestBody.labourTax,
                    "packageDisc": requestBody.packageDisc,
                    "parentId": requestBody.parentId,
                    "parentType": requestBody.parentType,
                    "part": requestBody.part,
                    "partTax": requestBody.partTax,
                    "prepaidDisc": requestBody.prepaidDisc,
                    "promoDisc": requestBody.promoDisc,
                    "rate": requestBody.rate,
                    "sublet": requestBody.sublet,
                    "total": requestBody.total,
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/job-details/'+id,
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
                url: baseUrl+'/api/dms/services/v1/job-details/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "classDisc": requestBody.classDisc,
                    "customerPay": requestBody.customerPay,
                    "description": requestBody.description,
                    "flatRate": requestBody.flatRate,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labour": requestBody.labour,
                    "labourTax": requestBody.labourTax,
                    "packageDisc": requestBody.packageDisc,
                    "parentId": requestBody.parentId,
                    "parentType": requestBody.parentType,
                    "part": requestBody.part,
                    "partTax": requestBody.partTax,
                    "prepaidDisc": requestBody.prepaidDisc,
                    "promoDisc": requestBody.promoDisc,
                    "rate": requestBody.rate,
                    "sublet": requestBody.sublet,
                    "total": requestBody.total,
                  },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})