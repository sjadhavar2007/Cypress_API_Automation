///<reference types="Cypress"/>

describe('Part To Oil Type Mapping Controller', function(){
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
        cy.fixture('Phase2/Services/PartToOilTypeMappingController').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request part-to-oil-type-mapping', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/',
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
                        expect(res.body.response.content[i]).to.have.property('oilType')
                        expect(res.body.response.content[i]).to.have.property('part')
                        expect(res.body.response.content[i]).to.have.property('partFranchise')
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
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request for verifying "Part-Franchise" in POST method', function(){
        it('TC04-Positive-Verify the response code & response body parameters', function(){
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
        it('TC05-NA-Verify that Response body is matching with DB or not', function(){

        })
    })
    describe('Post Request part-to-oil-type-mapping', function(){
        it('TC06-Positive-Verify the status code & response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": requestBody.id,
                    "oilTypeId": requestBody.oilTypeId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                  }                  
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
            })
        })
        it('TC07-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC08-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": "",
                    "oilTypeId": "",
                    "partFranchiseId": "",
                    "partId": "",
                  },
                  failOnStatusCode: false,                  
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC09-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": requestBody.id,
                    "oilTypeId": requestBody.oilTypeId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                  }    
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request part-to-oil-type-mapping ID', function(){
        it('TC10-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
            })
        })
        it('TC11-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC12-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC13-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Put Request part-to-oil-type-mapping ID', function(){
        it('TC14-Positive-Verify the response code & response body is as per swagger or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": id,
                    "oilTypeId": requestBody.oilTypeId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                    },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.oilType).to.have.property('id', requestBody.oilTypeId)
                expect(res.body.response.partFranchise).to.have.property('id', requestBody.partFranchiseId)
                expect(res.body.response.part).to.have.property('id', requestBody.partId)
            })
        })
        it('TC15-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC16-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": "",
                    "oilTypeId": "",
                    "partFranchiseId": "",
                    "partId": "",
                    },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC17-Negative-Verify the response code, if send the request with invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id+'1',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": id,
                    "oilTypeId": requestBody.oilTypeId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/part-to-oil-type/'+id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "id": id,
                    "oilTypeId": requestBody.oilTypeId,
                    "partFranchiseId": requestBody.partFranchiseId,
                    "partId": requestBody.partId,
                },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
})