///<reference types="Cypress" />
var baseUrl;
var requestBody;
var id;
var id1;

describe('Bulk Oil Controller', function(){
    before(function(){
        cy.fixture('Phase2/Services/CommonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/Services/BulkOilControllerBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get request Find_all_Bulk_oil_Controller', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/',
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
                        expect(res.body.response.content[i]).to.have.property('modelId')
                        expect(res.body.response.content[i].opCode).to.have.property('code')
                        expect(res.body.response.content[i].opCode).to.have.property('description')
                        expect(res.body.response.content[i].opCode).to.have.property('id')
                        expect(res.body.response.content[i].opCode).to.have.property('links')
                        expect(res.body.response.content[i].opFran).to.have.property('code')
                        expect(res.body.response.content[i].opFran).to.have.property('description')
                        expect(res.body.response.content[i].opFran).to.have.property('id')
                        expect(res.body.response.content[i].opFran).to.have.property('links')
                        expect(res.body.response.content[i]).to.have.property('part')
                        expect(res.body.response.content[i].partFranchise).to.have.property('code')
                        expect(res.body.response.content[i].partFranchise).to.have.property('description')
                        expect(res.body.response.content[i].partFranchise).to.have.property('id')
                        expect(res.body.response.content[i].partFranchise).to.have.property('links')
                        expect(res.body.response.content[i]).to.have.property('qty')
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
        it('TC03-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
    
        })
    })
    describe('Get Request for verify the Part Franchise ID', function(){
        it('TC04-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "PART-FRANCHISE",
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
                        expect(res.body.response.content[i]).to.have.property('category', 'PART-FRANCHISE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC06-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "OIL-TYPE",
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
                        expect(res.body.response.content[i]).to.have.property('category', 'OIL-TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC07-NA-Verify the response body is matching with DB or not', function(){
            
        })
    })
    describe('Post request Create_Bulk_oil_controller', function(){
        it('TC08-Positive-Verify the status code for response body is 201 and response data parameters', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/',
            headers: {
                'Content-Type': requestBody.Content_Type,
            },
            body: {
                "id": requestBody.id,
                "modelId": requestBody.modelId,
                "oilTypeId": requestBody.oilTypeId,
                "opCodeId": requestBody.opCodeId,
                "opFranId": requestBody.opFranId,
                "partFranchiseId": requestBody.partFranchiseId,
                "partId": requestBody.partId,
                "qty": requestBody.qty,
              },
            }).then(function(res){
                expect(res.status).to.eq(201)
                id =res.body.response.id
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response).to.have.property('qty', requestBody.qty)
            })                  
        })
        it('TC09-NA-Verify the response body is matching with DB or not', function(){
                
        })
        it('TC10-NA-Verify the request & response body is as per the design & URS or not', function(){

        })
        it('TC11-Negative-Verify the response if send the request with blank mandatory field', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/',
            headers: {
                'Content-Type': requestBody.Content_Type,
            },
            body: {
                "active": "",
                "franchiseId": "",
                "id": "",
                "modelId": "",
                "oilTypeId": "",
                "opCodeId": "",
                "partFranchiseId": "",
                "partId": "",
                "qty": "",
              },
              failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC12-Negative-Verify the response if send the request where QTY field value must be greater than or equal to 1', function(){
            cy.request({
            method: 'POST',
            url: baseUrl + '/api/dms/services/v1/bulk-oil/',
            headers: {
                'Content-Type': requestBody.Content_Type,
            },
            body: {
                "id": requestBody.id,
                "modelId": requestBody.modelId,
                "oilTypeId": requestBody.oilTypeId,
                "opCodeId": requestBody.opCodeId,
                "opFranId": requestBody.opFranId,
                "partFranchiseId": requestBody.partFranchiseId,
                "partId": requestBody.partId,
                "qty": 0,
              },
              failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
                expect(res.body).to.have.property('message', "Validation Error")
                expect(res.body.response).to.have.property('qty', "must be greater than or equal to 1")
            })
        })
        it('TC13-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/',
            headers: {
                'Content-Type': requestBody.Content_Type,
            },
            body: {
                "id": requestBody.id,
                "modelId": requestBody.modelId,
                "oilTypeId": requestBody.oilTypeId,
                "opCodeId": requestBody.opCodeId,
                "opFranId": requestBody.opFranId,
                "partFranchiseId": requestBody.partFranchiseId,
                "partId": requestBody.partId,
                "qty": requestBody.qty,
              },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
                id1=res.body.response.id
            })
        })
    })
    describe('Get Request Find_by_ID_Bulk_oil_Controller', function(){
        it('TC14-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response).to.have.property('qty', requestBody.qty)
            })
        })
        it('TC15-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC16-Negative-Verify the response code if send the request with invalid Bulk Oil ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC17-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id1,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put request Update_by_ID_Bulk_oil_controller', function(){
        it('TC18-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id,
            headers: {
                'Content-Type': requestBody.Content_Type,
            },
            body: {
                "id": requestBody.id,
                "modelId": requestBody.modelId,
                "oilTypeId": requestBody.oilTypeId,
                "opCodeId": requestBody.opCodeId,
                "opFranId": requestBody.opFranId,
                "partFranchiseId": requestBody.partFranchiseId,
                "partId": requestBody.partId,
                "qty": requestBody.qty,
              },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('modelId', requestBody.modelId)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.opCode).to.have.property('id', requestBody.opCodeId)
                expect(res.body.response.opFran).to.have.property('id', requestBody.opFranId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
                expect(res.body.response).to.have.property('qty', requestBody.qty)
            })
        })
        it('TC19-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC20-Negative-Verify the response code if send the request with invalid Bulk Oil ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id+'1',
                headers: {
                    'Content-Type': requestBody.Content_Type,
                },
                body: {
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "oilTypeId": requestBody.oilTypeId,
                    "opCodeId": requestBody.opCodeId,
                    "opFranId": requestBody.opFranId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "qty": requestBody.qty,
                  },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC21-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/bulk-oil/'+id1,
                headers: {
                    'Content-Type': requestBody.Content_Type,
                },
                body: {
                    "id": requestBody.id,
                    "modelId": requestBody.modelId,
                    "oilTypeId": requestBody.oilTypeId,
                    "opCodeId": requestBody.opCodeId,
                    "opFranId": requestBody.opFranId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    "qty": requestBody.qty,
                  },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})