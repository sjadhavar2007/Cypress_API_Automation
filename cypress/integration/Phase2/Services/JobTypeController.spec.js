///<reference types="Cypress" />

describe('Job Type Controller', function(){
var baseUrl;
var requestBody;
var id;
var id02;

    before(function(){
        cy.fixture('Phase2/Services/CommonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/Services/JobTypeControllerBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get request Find_all_Job_Type_Controller', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/job-type/',
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
                        expect(res.body.response.content[i].chargingType).to.have.property('code')
                        expect(res.body.response.content[i].chargingType).to.have.property('description')
                        expect(res.body.response.content[i].chargingType).to.have.property('id')
                        expect(res.body.response.content[i].chargingType).to.have.property('links')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i].jobType).to.have.property('code')
                        expect(res.body.response.content[i].jobType).to.have.property('description')
                        expect(res.body.response.content[i].jobType).to.have.property('id')
                        expect(res.body.response.content[i].jobType).to.have.property('links')
                        expect(res.body.response.content[i]).to.have.property('labourPayment')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i].module).to.have.property('code')
                        expect(res.body.response.content[i].module).to.have.property('description')
                        expect(res.body.response.content[i].module).to.have.property('id')
                        expect(res.body.response.content[i].module).to.have.property('links')
                        expect(res.body.response.content[i]).to.have.property('partPayment')
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
        it('TC02-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC03-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/job-type/',
            }).then(function(res){
                expect(res.duration).to.lessThan(2000)
            })
        })
    })
    describe('Get Request To Verify the Charging Type Dropdown', function(){
        it('TC04-Positive-Verify the response code & response body parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "CHARGINGTYPE",
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
                        expect(res.body.response.content[i]).to.have.property('category', 'CHARGINGTYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC06-Positive-Verify the response code & response body parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "MODULE",
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
                        expect(res.body.response.content[i]).to.have.property('category', 'MODULE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC07-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC08-Positive-Verify the response code & response body parameters', function(){
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
        it('TC09-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Post request Create_Job_Type_controller', function(){
        it('TC10-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/job-type/',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "chargingTypeId": requestBody.chargingTypeId,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labourPayment": requestBody.labourPayment,
                    "moduleId": requestBody.moduleId,
                    "partPayment": requestBody.partPayment,
                  }
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response.chargingType).to.have.property('id', requestBody.chargingTypeId)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labourPayment', requestBody.labourPayment)
                expect(res.body.response.module).to.have.property('id', requestBody.moduleId)
                expect(res.body.response).to.have.property('partPayment', requestBody.partPayment)

            })
        })
        it('TC11-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC12-NA-Verify the request & response body is as per the design & URS or not', function(){

        })
        it('TC13-Negative-Verify the response if send the request with blank mandatory field', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/job-type/',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "chargingTypeId": "",
                    "description": "",
                    "id": "",
                    "jobTypeId": "",
                    "labourPayment": "",
                    "moduleId": "",
                    "partPayment": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/job-type/',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body:{
                    "chargingTypeId": requestBody.chargingTypeId,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labourPayment": requestBody.labourPayment,
                    "moduleId": requestBody.moduleId,
                    "partPayment": requestBody.partPayment,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(2000)
                id02 = res.body.response.id
            })
        })
    })
    describe('Get Request Find_by_ID_Job_Type_Controller', function(){
        it('TC15-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.chargingType).to.have.property('id', requestBody.chargingTypeId)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labourPayment', requestBody.labourPayment)
                expect(res.body.response.module).to.have.property('id', requestBody.moduleId)
                expect(res.body.response).to.have.property('partPayment', requestBody.partPayment)
            })
        })
        it('TC16-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC17-Negative-Verify the response code if send the request with invalid Job Type ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id02,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Update_Job_Type_Controller', function(){
        it('TC19-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "chargingTypeId": requestBody.chargingTypeId,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labourPayment": requestBody.labourPayment,
                    "moduleId": requestBody.moduleId,
                    "partPayment": requestBody.partPayment,
                  }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response.chargingType).to.have.property('id', requestBody.chargingTypeId)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.jobType).to.have.property('id', requestBody.jobTypeId)
                expect(res.body.response).to.have.property('labourPayment', requestBody.labourPayment)
                expect(res.body.response.module).to.have.property('id', requestBody.moduleId)
                expect(res.body.response).to.have.property('partPayment', requestBody.partPayment)
            })
        })
        it('TC20-NA-Verify the response is matching with DB or not', function(){
                
        })
        it('TC21-Negative-Verify the response code if send the request with invalid Job Type id', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id02+'11',
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "chargingTypeId": requestBody.chargingTypeId,
                    "description": requestBody.description,
                    "id": id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labourPayment": requestBody.labourPayment,
                    "moduleId": requestBody.moduleId,
                    "partPayment": requestBody.partPayment,
                    },
                    failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC22-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/job-type/' + id02,
                headers: {
                    "Content-Type": requestBody.Content_Type,
                },
                body: {
                    "chargingTypeId": requestBody.chargingTypeId,
                    "description": requestBody.description,
                    "id": requestBody.id,
                    "jobTypeId": requestBody.jobTypeId,
                    "labourPayment": requestBody.labourPayment,
                    "moduleId": requestBody.moduleId,
                    "partPayment": requestBody.partPayment,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(2000)
            })
        })
    })
})