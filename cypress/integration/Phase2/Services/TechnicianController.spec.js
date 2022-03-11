///<reference types="Cypress" />

describe('Technician Controller', function(){
var baseUrl;
var headers;
var requestBody;
var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            headers = data
        })
        cy.fixture('Phase2/Services/TechnicianControllerBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Technician', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/',
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
                        expect(res.body.response.content[i]).to.have.property('allotted')
                        expect(res.body.response.content[i]).to.have.property('commenceDate')
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
                        expect(res.body.response.content[i]).to.have.property('muslim')
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('salaryGroup')
                        expect(res.body.response.content[i]).to.have.property('terminateDate')
                        expect(res.body.response.content[i]).to.have.property('title')
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
        it('TC02-Positive-Verify that the Response body is showing all the listing for isAlloted = true and isAlloted = false or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/',
                qs: {
                    isAlloted: true
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/',
                qs: {
                    isAlloted: false
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
        it('TC03-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC04-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Technician', function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/technician/',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "allotted": requestBody.allotted,
                    "commenceDate": requestBody.commenceDate,
                    "id": requestBody.id,
                    "muslim": requestBody.muslim,
                    "name": requestBody.name,
                    "salaryGroupId": requestBody.salaryGroupId,
                    "terminateDate": requestBody.terminateDate,
                    "title": requestBody.title,
                  },
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('allotted', requestBody.allotted)
                expect(res.body.response).to.have.property('commenceDate')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('muslim', requestBody.muslim)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response.salaryGroup).to.have.property('id', requestBody.salaryGroupId)
                expect(res.body.response).to.have.property('terminateDate')
                expect(res.body.response).to.have.property('title', requestBody.title)
            })
        })
        it('TC06-NA-Verify that the response body is matching with the DATABASE record or not', function(){
                
        })
        it('TC07-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/technician/',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "allotted": "",
                    "commenceDate": "",
                    "id": "",
                    "muslim": "",
                    "name": "",
                    "salaryGroupId": "",
                    "terminateDate": "",
                    "title": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC09-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/technician/',
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "allotted": requestBody.allotted,
                    "commenceDate": requestBody.commenceDate,
                    "id": requestBody.id,
                    "muslim": requestBody.muslim,
                    "name": requestBody.name,
                    "salaryGroupId": requestBody.salaryGroupId,
                    "terminateDate": requestBody.terminateDate,
                    "title": requestBody.title,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Technician_ID', function(){
        it('TC10-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('allotted', requestBody.allotted)
                expect(res.body.response).to.have.property('commenceDate')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('muslim', requestBody.muslim)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response.salaryGroup).to.have.property('id', requestBody.salaryGroupId)
                expect(res.body.response).to.have.property('terminateDate')
                expect(res.body.response).to.have.property('title', requestBody.title)
            })
        })
        it('TC11-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC12-Negative-Verify the response code, if send the request with Invalid Technician_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/'+id+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC13-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/technician/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Technician_ID', function(){
        it('TC14-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/technician/'+id,
                headers: {
                    'Content-Type': headers.Content_Type,
                },
                body: {
                    "allotted": requestBody.allotted,
                    "commenceDate": requestBody.commenceDate,
                    "id": requestBody.id,
                    "muslim": requestBody.muslim,
                    "name": requestBody.name,
                    "salaryGroupId": requestBody.salaryGroupId,
                    "terminateDate": requestBody.terminateDate,
                    "title": requestBody.title,
                    },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('allotted', requestBody.allotted)
                expect(res.body.response).to.have.property('commenceDate')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('muslim', requestBody.muslim)
                expect(res.body.response).to.have.property('name', requestBody.name)
                expect(res.body.response.salaryGroup).to.have.property('id', requestBody.salaryGroupId)
                expect(res.body.response).to.have.property('terminateDate')
                expect(res.body.response).to.have.property('title', requestBody.title)
            })
        })
        it('TC15-NA-Verify that the response body is matching with the DATABASE record or not', function(){
            
        })
        it('TC16-Negative-Verify the response code, if send the request with Invalid Technician_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/technician/'+id+1,
                headers: {
                    'Content-Type': headers.Content_Type,
                },
                body: {
                    "allotted": requestBody.allotted,
                    "commenceDate": requestBody.commenceDate,
                    "id": requestBody.id,
                    "muslim": requestBody.muslim,
                    "name": requestBody.name,
                    "salaryGroupId": requestBody.salaryGroupId,
                    "terminateDate": requestBody.terminateDate,
                    "title": requestBody.title,
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC17-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/technician/'+id,
                headers: {
                    'Content-Type': headers.Content_Type, 
                },
                body: {
                    "allotted": "",
                    "commenceDate": "",
                    "id": "",
                    "muslim": "",
                    "name": "",
                    "salaryGroupId": "",
                    "terminateDate": "",
                    "title": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC18-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/technician/'+id,
                headers: {
                    'Content-Type': headers.Content_Type,
                },
                body: {
                    "allotted": requestBody.allotted,
                    "commenceDate": requestBody.commenceDate,
                    "id": requestBody.id,
                    "muslim": requestBody.muslim,
                    "name": requestBody.name,
                    "salaryGroupId": requestBody.salaryGroupId,
                    "terminateDate": requestBody.terminateDate,
                    "title": requestBody.title,
                    },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})