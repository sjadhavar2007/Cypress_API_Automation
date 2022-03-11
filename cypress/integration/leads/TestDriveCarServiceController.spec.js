///<reference types="cypress"/>

describe('Test Drive Car Service Controller', function(){
    var commonUrl;
    var requestBody;
    var id;
    var id08;
    var params;
    before(function(){
        cy.fixture('leads/TestDriveCarServiceController/url').then(function(data){
            commonUrl = data.URL_TestDriveCarServiceController
        })
        cy.fixture('leads/TestDriveCarServiceController/body').then(function(data){
            requestBody = data
        })
        cy.fixture('leads/TestDriveCarServiceController/params').then(function(data){
            params = data
        })
    })
    describe('Get request Test_Drive_Car_Service', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('endTime')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('remark')
                        expect(res.body.response.content[i]).to.have.property('serviceEndDate')
                        expect(res.body.response.content[i]).to.have.property('serviceStartDate')
                        expect(res.body.response.content[i]).to.have.property('startTime')
                        expect(res.body.response.content[i]).to.have.property('testDriveCar')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
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
        it('TC02-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

        })
        it('TC03-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post request Test_Drive_Car_Service', function(){
        it('TC04-Positive-Verify the status code for response body is 201 and response data is as per request body', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": requestBody.endTime,
                    "id": requestBody.id,
                    "remark": requestBody.remark,
                    "serviceEndDate": requestBody.serviceEndDate,
                    "serviceStartDate": requestBody.serviceStartDate,
                    "startTime": requestBody.startTime,
                    "testDriveCar": requestBody.testDriveCar,
                  }, 
            }).then(function(res){
                expect(res.status).to.equal(201)
                id =res.body.response.id
                expect(res.body.response).to.have.property('endTime', requestBody.endTime)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('remark', requestBody.remark)
                expect(res.body.response).to.have.property('serviceEndDate', requestBody.serviceEndDate)
                expect(res.body.response).to.have.property('serviceStartDate', requestBody.serviceStartDate)
                expect(res.body.response).to.have.property('startTime', requestBody.startTime)
                expect(res.body.response).to.have.property('testDriveCar', requestBody.testDriveCar)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that after the valid body and request is send it is reflected in the DATABASE', function(){

        })
        it('TC06-Negative-Verify if the user send the request body with blanks fields ("") then is it showing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": "",
                    "id":"",
                    "remark": "",
                    "serviceEndDate": "",
                    "serviceStartDate": "",
                    "startTime": "",
                    "testDriveCar": "",
                  }, 
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
               
            })
        })
        it('TC07-NA-Verify if the request fields are as per design', function(){

        })
        it('TC08-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": requestBody.endTime,
                    "id": requestBody.id,
                    "remark": requestBody.remark,
                    "serviceEndDate": requestBody.serviceEndDate,
                    "serviceStartDate": requestBody.serviceStartDate,
                    "startTime": requestBody.startTime,
                    "testDriveCar": requestBody.testDriveCar,
                  }, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id08 =res.body.response.id
            })
        })
    })
    describe('Get request Test_Drive_Car_Service_ID', function(){
        it('TC09-Positive-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('endTime', requestBody.endTime)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('remark', requestBody.remark)
                expect(res.body.response).to.have.property('serviceEndDate', requestBody.serviceEndDate)
                expect(res.body.response).to.have.property('serviceStartDate', requestBody.serviceStartDate)
                expect(res.body.response).to.have.property('startTime', requestBody.startTime)
                expect(res.body.response).to.have.property('testDriveCar', requestBody.testDriveCar)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-Negative-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-NA-Verify if the response data is matching with the DATABASE entry for the same ID or not', function(){

        })
        it('TC12-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put request Test_Drive_Car_Service_ID', function(){
        it('TC13-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": requestBody.endTime,
                    "id": id,
                    "remark": requestBody.remark,
                    "serviceEndDate": requestBody.serviceEndDate,
                    "serviceStartDate": requestBody.serviceStartDate,
                    "startTime": requestBody.startTime,
                    "testDriveCar": requestBody.testDriveCar,
                  }, 
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('endTime', requestBody.endTime)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response).to.have.property('remark', requestBody.remark)
                expect(res.body.response).to.have.property('serviceEndDate', requestBody.serviceEndDate)
                expect(res.body.response).to.have.property('serviceStartDate', requestBody.serviceStartDate)
                expect(res.body.response).to.have.property('startTime', requestBody.startTime)
                expect(res.body.response).to.have.property('testDriveCar', requestBody.testDriveCar)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC14-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){

        })
        it('TC15-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id+1,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": requestBody.endTime,
                    "id": id,
                    "remark": requestBody.remark,
                    "serviceEndDate": requestBody.serviceEndDate,
                    "serviceStartDate": requestBody.serviceStartDate,
                    "startTime": requestBody.startTime,
                    "testDriveCar": requestBody.testDriveCar,
                  }, 
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify if the user sends the request body with blank fields ("") then is it showing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id+1,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": "",
                    "id":"",
                    "remark": "",
                    "serviceEndDate": "",
                    "serviceStartDate": "",
                    "startTime": "",
                    "testDriveCar": "",
                  }, 
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC17-Positive-Verify the response time for put request is less than 1 sec or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+id08,
                headers: {
                    "Content-Type": requestBody.ContentType,
                },
                body: {
                    "endTime": requestBody.endTime,
                    "id": id,
                    "remark": requestBody.remark,
                    "serviceEndDate": requestBody.serviceEndDate,
                    "serviceStartDate": requestBody.serviceStartDate,
                    "startTime": requestBody.startTime,
                    "testDriveCar": requestBody.testDriveCar,
                  }, 
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete request Test_Drive_Car_Service _ID', function(){
        it('TC18-Positive-Verify the status code and response params are as per swagger if request is send with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC19-NA-Verify by sending the delete request for any particular ID, the records gets removed from DATABASE or not', function(){

        })
        it('TC20-Negative-Verify if the user sends the request with invalid ID response code shows 403 or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id+12,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })  
        it('TC21-Positive-Verify if the response time is less than 1 sec or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+id08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request Test_Drive_Car_Service_Date', function(){
        it('TC22-Positive-Verify the status code and response parameters are according to swagger if request is send with a valid Date', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/by/date',
                qs: {
                    "from": params.from,
                    "to": params.to,
                    "testDriveCarId": params.testDriveCarId,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else{

                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC10-Negative-Verify the status code and response parameters are according to swagger if request is send with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/by/date',
                qs: {
                    "from": params.from,
                    "to": params.to,
                    "testDriveCarId": 0,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-NA-Verify if the response data is matching with the DATABASE entry for the same Date or not', function(){

        })
        it('TC12-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/by/date',
                qs: {
                    "from": params.from,
                    "to": params.to,
                    "testDriveCarId": params.testDriveCarId,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})