///<reference types="cypress"/>
import getCode from './UtilityAreaOperation/getCode'
describe('Area Operation Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var areaOperationId;
    var areaOperationId08;
    var codeForText;
    var codeForTextDuration;
    var codeForTextPut;
    var codeForTextPut1;
    var codeForTextPutDuration;
    before(function(){
        cy.fixture('admin/AreaOperation/AreaOperation_url').then(function(data){
            commonUrl=data.URL_AreaOperation_qa
        })
        cy.fixture('admin/AreaOperation/AreaOperation_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/AreaOperation/AreaOperation_requestBody').then(function(data){
            requestBodyInfo=data
        })
        const code=new getCode();
        codeForText=code.getCode();
        codeForTextDuration=code.getUpdatedCode(); 
        codeForTextPut= code.getCodePut();
        codeForTextPut1=code.getCodePut1();
        codeForTextPutDuration= code.getUpdatedCodePut();
    })
    describe('Get Request Area Operations', function(){
        it('TC01-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'area-operations',
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('effectiveDateFrom')
                    expect(res.body.response.content[i]).to.have.property('effectiveDateTo')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('areaOperationmanagerList')
                    expect(res.body.response.content[i]).to.have.property('name')
                   // expect(res.body.response.content[i]).to.have.property('operationUnit')
                    expect(res.body.response.content[i]).to.have.property('links')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++){
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')   
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify that the response is matching with database or not', function(){
          
        })
        it('TC03-NA-Verify that the record count between Redis Cache and database is matching or not', function(){

        })
        it('TC04-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'area-operations',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Area Operations', function(){
        it('TC05-Positive-Verify the response status CODE is 201 or not and Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'area-operations',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForText,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                areaOperationId=res.body.response.id
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('code', codeForText)
                expect(res.body.response).to.have.property('effectiveDateFrom', requestBodyInfo.effectiveDateFrom)
                expect(res.body.response).to.have.property('effectiveDateTo', requestBodyInfo.effectiveDateTo)
                expect(res.body.response).to.have.property('id', areaOperationId)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('managerId', requestBodyInfo.managerId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('operationUnitId', requestBodyInfo.operationUnitId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
                
            })
        })
        it('TC06-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'area-operations',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                   
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC07-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC08-NA-Verify that the record count between Redis Cache and database is matching or not', function(){

        })
        it('TC09-Negative-Verify if multiple post request for with same AO Code can be run or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'area-operations',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForText,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
               expect(res.status).to.equal(422)
               expect(res.body).to.have.property('message', "Error in validating the fields")
                expect(res.body.response).to.not.equal(null)
                expect(res.body.response).to.have.property('name', 'Duplicate AO Code')
            })
        })
        it('TC10-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'area-operations',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForTextDuration,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                areaOperationId08=res.body.response.id
            })
        })
    })
    describe('Get Request Area Operations ID', function(){
        it('TC11-Positive-Verify the status CODE and Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.active)
                expect(res.body.response).to.have.property('code', codeForText)
                expect(res.body.response).to.have.property('effectiveDateFrom', requestBodyInfo.effectiveDateFrom)
                expect(res.body.response).to.have.property('effectiveDateTo', requestBodyInfo.effectiveDateTo)
                expect(res.body.response).to.have.property('id', areaOperationId)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('managerId', requestBodyInfo.managerId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('operationUnitId', requestBodyInfo.operationUnitId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC12-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC13-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'area-operations'+'/'+areaOperationId+'1995',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message', "Area Operation does not exist")
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC14-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        
    })
    describe('Put Request Area Operation ID', function(){
        it('TC15-Positive-Verify the response status CODE is 200 or not and Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForTextPut,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBodyInfo.activeUpdate)
                expect(res.body.response).to.have.property('code', codeForTextPut)
                expect(res.body.response).to.have.property('effectiveDateFrom', requestBodyInfo.effectiveDateFrom)
                expect(res.body.response).to.have.property('effectiveDateTo', requestBodyInfo.effectiveDateTo)
                expect(res.body.response).to.have.property('id', areaOperationId)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('managerId', requestBodyInfo.managerId)
                expect(res.body.response).to.have.property('name', requestBodyInfo.name)
                expect(res.body.response.areaOperationmanagerList[0]).to.have.property('operationUnitId', requestBodyInfo.operationUnitId)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
                
            })
        })
        it('TC16-Negative-Verify that if user insert an invalid Area Operation ID & send it with a valid request body then is it showing any error message with proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'area-operations'+'/'+areaOperationId+'1994',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForTextPut1,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message', 'Area Operation does not exist')
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC17-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', 'Validation Error')
                expect(res.body.response).to.not.equal(null)
            })
        })
        it('TC18-NA-Verify that after sending a valid request with valid Area Operation ID, the changes are reflecting in DB for the particular record or not', function(){

        })
        it('TC19-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'area-operations'+'/'+areaOperationId08,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "areaOperationManager": [
                      {
                        "executiveIds": [
                          requestBodyInfo.executiveIds
                        ],
                        "managerId": requestBodyInfo.managerId,
                        "operationUnitId": requestBodyInfo.operationUnitId
                      }
                    ],
                    "code": codeForTextPutDuration,
                    "effectiveDateFrom": requestBodyInfo.effectiveDateFrom,
                    "effectiveDateTo": requestBodyInfo.effectiveDateTo,
                    "id": requestBodyInfo.id,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })

    })
    describe.skip('Delete request Area Operation ID', function(){
        it('TC20-Positive-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', false)
                expect(res.body.response).to.have.property('code', null)
                expect(res.body.response).to.have.property('effectiveDateFrom', null)
                expect(res.body.response).to.have.property('effectiveDateTo', null)
                expect(res.body.response).to.have.property('id', null)
                expect(res.body.response).to.have.property('manager', null)
                expect(res.body.response).to.have.property('name', null)
                expect(res.body.response).to.have.property('operationUnit', null)
            })
        })
        it('TC21-NA-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){

        })
        it('TC22-NA-Verify that the record count between Redis Cache and database is matching or not', function(){

        })
        it('TC23-Negative-Verify that by sending the request for same ID for multiple time, its throwing any error in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'area-operations'+'/'+areaOperationId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'area-operations'+'/'+areaOperationId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    
})
