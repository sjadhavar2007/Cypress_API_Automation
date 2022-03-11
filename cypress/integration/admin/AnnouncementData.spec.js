///<reference types="cypress"/>
describe('Announcement Data Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var announcementsId;
    before(function(){
        cy.fixture('admin/Announcement/announcement_url').then(function(data){
            commonUrl=data.URL_Announcements
        })
        cy.fixture('admin/Announcement/Announcement_headers').then(function(data){
            headersInfo=data
        })
        cy.fixture('admin/Announcement/Announcement_requestBody').then(function(data){
            requestBodyInfo=data
        })
    })
    describe('Post Request Announcements', function(){
        it('TC00-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.active,
                    "appNotification": requestBodyInfo.appNotification,
                    "approvalComments": requestBodyInfo.approvalComments,
                    "approvedBy": requestBodyInfo.approvedBy,
                    "chargeTo": requestBodyInfo.chargeTo,
                    "days": requestBodyInfo.days,
                    "description": requestBodyInfo.description,
                    "emailNotification": requestBodyInfo.emailNotification,
                    "expiryDateTime": requestBodyInfo.expiryDateTime,
                    "id": requestBodyInfo.id,
                    "messageInChinese": requestBodyInfo.messageInChinese,
                    "messageInEnglish": requestBodyInfo.messageInEnglish,
                    "messageInMal": requestBodyInfo.messageInMal,
                    "pushNotification": requestBodyInfo.pushNotification,
                    "repeatInterval": requestBodyInfo.repeatInterval,
                    "roles": requestBodyInfo.roles,
                    "scheduleType": requestBodyInfo.scheduleType,
                    "scheduled": requestBodyInfo.scheduled,
                    "smsNotification": requestBodyInfo.smsNotification,
                    "startDateTime": requestBodyInfo.startDateTime,
                    "status": requestBodyInfo.status,
                    "targetModule": requestBodyInfo.targetModule,
                    "targetSystem": requestBodyInfo.targetSystem,
                    "title": requestBodyInfo.title,
                  }
            }).then(function(res){
                expect(res.status).to.equal(201)
                announcementsId=res.body.response.id
            })
        })
    })
    describe('Get Request Announcement Data', function(){
        it('TC01-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                    method: 'GET',
                    url: commonUrl+'/'+announcementsId+'/data',
                }).then(function(res){
                    expect(res.status).to.equal(200)
                    this.content=res.body.response.content
                    this.contentLength=this.content.length
                    if (this.contentLength<=0) {
                        expect(res.body.response.content.length).to.equal(0)                        
                    } else {
                        for(let i=0; i<this.contentLength; i++)
                    {

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
        it('TC02-Negative-Verify that if send the request with invalid announcement data then is it showing any proper response or not', function(){
            cy.request({
                    method: 'GET',
                    url: commonUrl+'/'+announcementsId+'1212'+'/data',
                    failOnStatusCode: false,
                }).then(function(res){
                    expect(res.status).to.equal(403)
            })
        })
        it('TC03-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC04-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                    method: 'GET',
                    url: commonUrl+'/'+announcementsId+'/data',
                }).then(function(res){
                    expect(res.duration).to.lessThan(1000)
            })
        })
    })


    describe('Delete request Announcement ID', function(){
        it('TC00-Positive-Verify that the response code for a suucessful positive request is 200 ok or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+announcementsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })
})  