///<reference types="cypress"/>
describe('Application Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var applicationId;
    var applicationId07;
    before(function(){
        cy.fixture('admin/ApplicationController/ApplicationController_url').then(function(data){
            commonUrl= data.URL_ApplicationController_uat
        })
        cy.fixture('admin/ApplicationController/ApplicationController_headers').then(function(data){
            headersInfo= data
        })
        cy.fixture('admin/ApplicationController/ApplicationController_body').then(function(data){
            requestBodyInfo= data
        })
        
    })
    describe('Get Request Applications', function(){
        it('TC01-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('appLogo')
                    expect(res.body.response.content[i]).to.have.property('appUrl')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('name')
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
        it('TC02-NA-Verify that the response data is matching with DATABASE entry  or not', function(){

        })
        it('TC03-Positive-Verify the Status Code and Response Parameters are as per the Swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Applications', function(){
        it('TC04-Positive-Verify the Response code for Valid request is 201 and response body as per payload', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": requestBodyInfo.appLogo,
                    "appUrl": requestBodyInfo.appUrl,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                applicationId=res.body.response.id
                expect(res.body.response).to.have.property('appLogo')
                expect(res.body.response).to.have.property('appUrl')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('name')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC05-NA-Verify that if valid body and request is sent, it is reflected in DB', function(){

        })
        it('TC06-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": "",
                    "appUrl": "",
                    "name": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": requestBodyInfo.appLogo,
                    "appUrl": requestBodyInfo.appUrl,
                    "name": requestBodyInfo.name,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                applicationId07=res.body.response.id
            })
        })
    })
    describe('Get Request Application_ID', function(){
        it('TC08-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+applicationId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('appLogo')
                expect(res.body.response).to.have.property('appUrl')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('name')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC09-Negative-Verify that status code is 403 if request is sent with invalid ID', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+applicationId+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
               
            })
        })
        it('TC10-NA-Verify that the response data is matching with DATABASE entry for same ID or not', function(){

        })
        it('TC11-Negative-Verify the Response time of GET request ', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+applicationId07,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
               
            })
        })
    })
    describe('Put Request Application ID', function(){
        it('TC12-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+applicationId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": requestBodyInfo.appLogoUpdate,
                    "appUrl": requestBodyInfo.appUrlUpdate,
                    "name": requestBodyInfo.nameUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                applicationId=res.body.response.id
                expect(res.body.response).to.have.property('appLogo')
                expect(res.body.response).to.have.property('appUrl')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('name')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                }
            })
        })
        it('TC13-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC14-Negative-Verify that response code is 403 and response data is as per the Request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+applicationId+'11',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": requestBodyInfo.appLogoUpdate,
                    "appUrl": requestBodyInfo.appUrlUpdate,
                    "name": requestBodyInfo.nameUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC15-Negative-Verify if user send the request body with blank fields ("") then is it throwing any error message with proper status code or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+applicationId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": "",
                    "appUrl": "",
                    "name": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                
            })
        })
        it('TC16-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+applicationId07,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "appLogo": requestBodyInfo.appLogoUpdate,
                    "appUrl": requestBodyInfo.appUrlUpdate,
                    "name": requestBodyInfo.nameUpdate,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    
    describe.skip('Delete Request Application ID', function(){
        it('TC17-Positive-Verify that status code and response params are as per swagger if request is sent with valid ID', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+applicationId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('appLogo')
                expect(res.body.response).to.have.property('appUrl')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('name')
            })
        })
        it('TC18-NA-Verify by Sending the DELETE Request for any particular ID, that record gets removed from the DB or not', function(){

        })
        it('TC19-Negative-Verify that If user sends request with invalid ID Response code shows 403 or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+applicationId+'11',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC20-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+applicationId07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    // describe('Get Request Application Logo', function(){
    //     it('TC21-Positive-Verify the Status Code is 200 ok or not', function(){
    //         cy.request({
    //             method: 'GET',
    //             url: commonUrl+'/'+applicationId+'/logo',
    //         }).then(function(res){
    //             expect(res.status).to.equal(200)
    //         })
    //     })
    //     it('TC22-Positive-Verify the Response time of GET request', function(){
    //         cy.request({
    //             method: 'GET',
    //             url: commonUrl+'/'+applicationId+'/logo',
    //         }).then(function(res){
    //             expect(res.duration).to.lessThan(1000)
    //         })
    //     })
    // })
    // describe('Post Request Application Logo', function(){
    //     it('TC23-Positive-Verify the Response code for Valid request is 200 and response body is as per uploaded file or not', () => {
    //         function form_request(method, url, formData, done) {
    //             const xhr = new XMLHttpRequest();
    //             xhr.open(method, url)
    //             xhr.onload = function () {
    //                 done(xhr);
    //             };
    //             xhr.onerror = function () {
    //                 done(xhr);
    //             };
    //             xhr.send(formData);
    //         }
    //         const fileName = "PostMethod.png";
    //         const method = "POST";
    //         const url = commonUrl+'/'+applicationId+'/logo';
    //         const fileType = "image/png";
    //         cy.fixture(fileName, "binary")
    //             .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
    //             .then((blob) => {
    //                 const formData = new FormData();
    //                 formData.append("file", blob, fileName);
    //                 form_request(method, url, formData, function (res) {
    //                     console.log(res)
    //                     expect(res.status).to.eq(200);
    //                 });
    //             });
    //     })
    //     it('TC24-Positive-Verify the Response code for Valid request is 200 and response body is as per uploaded file or not', () => {
    //         function form_request(method, url, formData, done) {
    //             const xhr = new XMLHttpRequest();
    //             xhr.open(method, url)
    //             xhr.onload = function () {
    //                 done(xhr);
    //             };
    //             xhr.onerror = function () {
    //                 done(xhr);
    //             };
    //             xhr.send(formData);
    //         }
    //         const fileName = "PostMethod.png";
    //         const method = "POST";
    //         const url = commonUrl+'/'+applicationId07+'/logo';
    //         const fileType = "image/png";
    //         cy.fixture(fileName, "binary")
    //             .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
    //             .then((blob) => {
    //                 const formData = new FormData();
    //                 formData.append("file", blob, fileName);
    //                 form_request(method, url, formData, function (res) {
    //                     console.log(res)
    //                     expect(res.status).to.eq(200);
    //                 });
    //             });
    //     }) 
    // })
})