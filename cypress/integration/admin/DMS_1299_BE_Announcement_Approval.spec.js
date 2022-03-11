///<reference types="cypress"/>

describe('DMS-1299 BE - Announcement - Approval (Announcement Controller[updateStatus])', function(){
    var commonUrl;
    var paramsInfo;
    var announcementId = 14;

    before(function(){
        cy.fixture('admin/DMS_1299/Url').then(function(data){
            commonUrl= data.URL_AnnouncementController
        })
        cy.fixture('admin/DMS_1299/params').then(function(data){
            paramsInfo= data
        })
    })
    describe('Put Request Update_Status', function(){
        it('TC01-Positive-Verify that response code is 200 ok and response data is as per the Request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+announcementId,
                qs: {
                    "status": paramsInfo.status,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('status', paramsInfo.status)
            })
        })
        it('TC02-NA-Verify that the After sending request with valid request body its reflecting in Database or not', function(){

        })
        it('TC03-Negative-Verify that response code is 403 ok and response data is as per the Request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+announcementId+1,
                qs: {
                    "status": paramsInfo.status,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-Negative-Verify that the response code is proper if It is sent without any request param', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+announcementId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC05-Negative-Verify that the response code is proper if It is sent with blank param', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+announcementId,
                qs: {
                    "status": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC06-Positive-Verify the response time for PUT request is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/status/'+announcementId,
                qs: {
                    "status": paramsInfo.status,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})