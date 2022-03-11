///<reference types="Cypress" />

describe('Service Bay And Availability Controller', function() {
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
        cy.fixture('Phase2/Services/ServiceBayAndAvailabilityBody').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Service-bay-and-availability', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/service-bay-and-availability/',
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
                        expect(res.body.response.content[i]).to.have.property('bayName')
                        expect(res.body.response.content[i]).to.have.property('bayNo')
                        expect(res.body.response.content[i]).to.have.property('baySuspendedFrom')
                        expect(res.body.response.content[i]).to.have.property('baySuspendedTo')
                        expect(res.body.response.content[i]).to.have.property('bayType')
                        expect(res.body.response.content[i]).to.have.property('emFlag')
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
                url: baseUrl+'/api/dms/services/v1/service-bay-and-availability/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Get Request for verifying "Part No" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": 'BAY_TYPE'
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
            })
        })
    })
    describe('Post Request Service-bay-and-availability', function(){
        it('TC05-Positive-Verify the response code & response body is as per the swagger or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedTo,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": requestBody.id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                      requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                      requestBody.techniciansListId
                    ]
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('bayName', requestBody.bayName)
                expect(res.body.response).to.have.property('bayNo', requestBody.bayNo)
                expect(res.body.response).to.have.property('baySuspendedFrom', requestBody.baySuspendedFrom)
                expect(res.body.response).to.have.property('baySuspendedTo', requestBody.baySuspendedTo)
                expect(res.body.response.bayType).to.have.property('id', requestBody.bayTypeId)
                expect(res.body.response).to.have.property('emFlag', requestBody.emFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('insertBefore', requestBody.insertBefore)
                expect(res.body.response).to.have.property('sequenceNo', requestBody.sequenceNo)
                expect(res.body.response.subletWorkerList[0]).to.have.property('id', requestBody.subletWorkerListId)
                expect(res.body.response.techniciansList[0]).to.have.property('id', requestBody.techniciansListId)

            })
        })
        it('TC06-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC07-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": "",
                    "bayNo": "",
                    "baySuspendedFrom": "",
                    "baySuspendedTo": "",
                    "bayTypeId": "",
                    "emFlag":"",
                    "id": "",
                    "insertBefore": "",
                    "sequenceNo":"",
                    "subletWorkerListId": [
                      ""
                    ],
                    "techniciansListId": [
                      ""
                    ]
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.be.equal(400)
            })  
        })
        it('TC08-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedTo,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": requestBody.id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                      requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                      requestBody.techniciansListId
                    ]
                  }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
        it('TC09-Positive-Verify in response body Createdby id is showing as per Barer Token or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedTo,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": requestBody.id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                        requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                        requestBody.techniciansListId
                    ]
                    },
            }).then(function(res){
                expect(res.body.response.createdById).to.equal(1)
            })
        })
    })
    describe('Get Request Service-bay-and-availability ID', function(){
        it('TC10-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('bayName', requestBody.bayName)
                expect(res.body.response).to.have.property('bayNo', requestBody.bayNo)
                expect(res.body.response).to.have.property('baySuspendedFrom', requestBody.baySuspendedFrom)    
                expect(res.body.response).to.have.property('baySuspendedTo', requestBody.baySuspendedTo)
                expect(res.body.response.bayType).to.have.property('id', requestBody.bayTypeId)
                expect(res.body.response).to.have.property('emFlag', requestBody.emFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('insertBefore', requestBody.insertBefore)
                expect(res.body.response).to.have.property('sequenceNo', requestBody.sequenceNo)
                expect(res.body.response.subletWorkerList[0]).to.have.property('id', requestBody.subletWorkerListId)
                expect(res.body.response.techniciansList[0]).to.have.property('id', requestBody.techniciansListId)
            })
        })
        it('TC11-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC12-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC13-Negative-Verify the response duration is less than 1 Second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Put Request Service-bay-and-availability ID', function(){
        it('TC14-Positive-Verify the response code & response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedFrom,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                      requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                      requestBody.techniciansListId
                    ]
                  }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('bayName', requestBody.bayName)
                expect(res.body.response).to.have.property('bayNo', requestBody.bayNo)
                expect(res.body.response).to.have.property('baySuspendedFrom', requestBody.baySuspendedFrom)    
                expect(res.body.response).to.have.property('baySuspendedTo', requestBody.baySuspendedTo)
                expect(res.body.response.bayType).to.have.property('id', requestBody.bayTypeId)
                expect(res.body.response).to.have.property('emFlag', requestBody.emFlag)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('insertBefore', requestBody.insertBefore)
                expect(res.body.response).to.have.property('sequenceNo', requestBody.sequenceNo)
                expect(res.body.response.subletWorkerList[0]).to.have.property('id', requestBody.subletWorkerListId)
                expect(res.body.response.techniciansList[0]).to.have.property('id', requestBody.techniciansListId)
            })
        })
        it('TC15-NA-Verify the response body is matching with DB record or not', function(){
            
        })
        it('TC16-Negative-Verify the status code, if send the request with blank fields', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": "",
                    "bayNo": "",
                    "baySuspendedFrom": "",
                    "baySuspendedTo": "",
                    "bayTypeId": "",
                    "emFlag":"",
                    "id": "",
                    "insertBefore": "",
                    "sequenceNo":"",
                    "subletWorkerListId": [
                      ""
                    ],
                    "techniciansListId": [
                      ""
                    ]
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC17-Negative-Verify the response code, if send the request with Invalid ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id+'1',
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedFrom,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                      requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                      requestBody.techniciansListId
                    ]
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Positive-Verify the response duration is less than 1 Second or not', function(){   
            cy.request({
                method: 'PUT',
                url: baseUrl+ '/api/dms/services/v1/service-bay-and-availability/'+id,
                headers: {
                    'Content-Type': contentType.Content_Type,
                },
                body:{
                    "bayName": requestBody.bayName,
                    "bayNo": requestBody.bayNo,
                    "baySuspendedFrom": requestBody.baySuspendedFrom,
                    "baySuspendedTo": requestBody.baySuspendedTo,
                    "bayTypeId": requestBody.bayTypeId,
                    "emFlag": requestBody.emFlag,
                    "id": id,
                    "insertBefore": requestBody.insertBefore,
                    "sequenceNo": requestBody.sequenceNo,
                    "subletWorkerListId": [
                      requestBody.subletWorkerListId
                    ],
                    "techniciansListId": [
                      requestBody.techniciansListId
                    ]
                  }
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
})