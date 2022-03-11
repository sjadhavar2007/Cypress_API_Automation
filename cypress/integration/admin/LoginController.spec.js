///<reference types="cypress"/>

describe('Login Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    before(function(){
        cy.fixture('admin/LoginController/LoginController_url').then(function(data){
            commonUrl=data.URL_LoginController
        })
        cy.fixture('admin/LoginController/LoginController_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/LoginController/LoginController_requestBody').then(function(data){
            requestBodyInfo=data
        })
    })

    describe('Post Request Login', function(){
        it('TC01-Positive-Verify that the success response have the status code of 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "mobileToken": requestBodyInfo.mobileToken,
                    "name": requestBodyInfo.name,
                    "password": requestBodyInfo.password
                }
            }).then(function(res){
                expect(res.status).to.equal(201)
            })
        })
        it('TC02-Negative-Verify that if send the request with invalid field data (credentials) then is It responsing with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "mobileToken": requestBodyInfo.mobileToken,
                    "name": requestBodyInfo.nameInvalid,
                    "password": requestBodyInfo.passwordInvalid,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC03-Positive-Verify that in the response is it getting any access token or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "mobileToken": requestBodyInfo.mobileToken,
                    "name": requestBodyInfo.name,
                    "password": requestBodyInfo.password
                }
            }).then(function(res){
                expect(res.body.status).to.equal(201)
                expect(res.body.response).to.have.property('accessToken')
                expect(res.body.response).to.have.property('email')
                expect(res.body.response).to.have.property('fullName')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('jobTitle')
                expect(res.body.response).to.have.property('lastRequestDateTime')
                expect(res.body.response).to.have.property('type')
                expect(res.body.response).to.have.property('type')
                expect(res.body.response).to.have.property('links')
               
            })
        })
        it('TC04-Positive-Verify that the response body is matching with request body or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "mobileToken": requestBodyInfo.mobileToken,
                    "name": requestBodyInfo.name,
                    "password": requestBodyInfo.password
                }
            }).then(function(res){   
                expect(res.body.response).to.have.property('name','testuser')
               
            })
        })
        it('TC05-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "mobileToken": requestBodyInfo.mobileToken,
                    "name": requestBodyInfo.name,
                    "password": requestBodyInfo.password
                }
            }).then(function(res){   
                expect(res.duration).to.lessThan(1000)
               
            })
        })
        it('TC06-Negative-Verify that if send the request with blank field value then is it showing any proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){   
                expect(res.status).to.equal(400)
               
            })
        })
    })
})