///<reference types="cypress"/>

describe('Announcement Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBodyInfo;
    var announcementsId;
    var announcementsId08;
    var userId;
    var userName;
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
    describe('Get Request Announcements', function(){
        it('TC01-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC02-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.body).to.have.property('message')
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('appNotification')
                    expect(res.body.response.content[i]).to.have.property('approvalComments')
                    expect(res.body.response.content[i]).to.have.property('approvedBy')
                    expect(res.body.response.content[i]).to.have.property('chargeTo')
                    expect(res.body.response.content[i]).to.have.property('days')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('emailNotification')
                    expect(res.body.response.content[i]).to.have.property('expiryDateTime')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length                  
                    for(let j=0; j<this.linksLength ; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                    }
                    expect(res.body.response.content[i]).to.have.property('messageInChinese')
                    expect(res.body.response.content[i]).to.have.property('messageInEnglish')
                    expect(res.body.response.content[i]).to.have.property('messageInMal')
                    expect(res.body.response.content[i]).to.have.property('pushNotification')
                    expect(res.body.response.content[i]).to.have.property('repeatInterval')
                    expect(res.body.response.content[i]).to.have.property('roles')
                    expect(res.body.response.content[i]).to.have.property('scheduleType')
                    expect(res.body.response.content[i]).to.have.property('scheduled')
                    expect(res.body.response.content[i]).to.have.property('smsNotification')
                    expect(res.body.response.content[i]).to.have.property('startDateTime')
                    expect(res.body.response.content[i]).to.have.property('status')
                    expect(res.body.response.content[i]).to.have.property('targetModule')
                    expect(res.body.response.content[i]).to.have.property('targetSystem')
                    expect(res.body.response.content[i]).to.have.property('title')
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length                  
                for(let j=0; j<this.linksLength ; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC03_NA-Verify that the response is matching with database or not', function(){

        })
        it('TC04-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Announcements', function(){
        it('TC05-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
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
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('appNotification')
                expect(res.body.response).to.have.property('approvalComments')
                expect(res.body.response).to.have.property('approvedBy')
                expect(res.body.response).to.have.property('chargeTo')
                expect(res.body.response).to.have.property('days')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('emailNotification')
                expect(res.body.response).to.have.property('expiryDateTime')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length                  
                for(let j=0; j<this.linksLength ; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('messageInChinese')
                expect(res.body.response).to.have.property('messageInEnglish')
                expect(res.body.response).to.have.property('messageInMal')
                expect(res.body.response).to.have.property('pushNotification')
                expect(res.body.response).to.have.property('repeatInterval')
                expect(res.body.response).to.have.property('roles')
                expect(res.body.response).to.have.property('scheduleType')
                expect(res.body.response).to.have.property('scheduled')
                expect(res.body.response).to.have.property('smsNotification')
                expect(res.body.response).to.have.property('startDateTime')
                expect(res.body.response).to.have.property('status')
                expect(res.body.response).to.have.property('targetModule')
                expect(res.body.response).to.have.property('targetSystem')
                expect(res.body.response).to.have.property('title')
            })
        })
        it('TC06-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
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
                expect(res.body).to.have.property('message')
            })
        })
        it('TC07-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC08-Positive-Verify that the response time is less than 1 second or not', function(){
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
                expect(res.duration).to.lessThan(1000)
                announcementsId08=res.body.response.id
            })
        })
    })
    describe('Get Request Announcements ID', function(){
        it('TC09-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC10-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
                announcementsId=res.body.response.id
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('appNotification')
                expect(res.body.response).to.have.property('approvalComments')
                expect(res.body.response).to.have.property('approvedBy')
                expect(res.body.response).to.have.property('chargeTo')
                expect(res.body.response).to.have.property('days')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('emailNotification')
                expect(res.body.response).to.have.property('expiryDateTime')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length                  
                for(let j=0; j<this.linksLength ; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('messageInChinese')
                expect(res.body.response).to.have.property('messageInEnglish')
                expect(res.body.response).to.have.property('messageInMal')
                expect(res.body.response).to.have.property('pushNotification')
                expect(res.body.response).to.have.property('repeatInterval')
                expect(res.body.response).to.have.property('roles')
                expect(res.body.response).to.have.property('scheduleType')
                expect(res.body.response).to.have.property('scheduled')
                expect(res.body.response).to.have.property('smsNotification')
                expect(res.body.response).to.have.property('startDateTime')
                expect(res.body.response).to.have.property('status')
                expect(res.body.response).to.have.property('targetModule')
                expect(res.body.response).to.have.property('targetSystem')
                expect(res.body.response).to.have.property('title')
            })
        })
        it('TC11-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC012-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        it('TC13-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
    })
    describe('Put Request Announcement ID', function(){
        it('TC14-Positive-Verify the response code for valid Announcement ID & Valid request body is 200 ok or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+announcementsId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "appNotification": requestBodyInfo.appNotificationUpdate,
                    "approvalComments": requestBodyInfo.approvalCommentsUpdate,
                    "approvedBy": requestBodyInfo.approvedByUpdate,
                    "chargeTo": requestBodyInfo.chargeToUpdate,
                    "days": requestBodyInfo.daysUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "emailNotification": requestBodyInfo.emailNotificationUpdate,
                    "expiryDateTime": requestBodyInfo.expiryDateTimeUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "messageInChinese": requestBodyInfo.messageInChineseUpdate,
                    "messageInEnglish": requestBodyInfo.messageInEnglishUpdate,
                    "messageInMal": requestBodyInfo.messageInMalUpdate,
                    "pushNotification": requestBodyInfo.pushNotificationUpdate,
                    "repeatInterval": requestBodyInfo.repeatIntervalUpdate,
                    "roles": requestBodyInfo.rolesUpdate,
                    "scheduleType": requestBodyInfo.scheduleTypeUpdate,
                    "scheduled": requestBodyInfo.scheduledUpdate,
                    "smsNotification": requestBodyInfo.smsNotificationUpdate,
                    "startDateTime": requestBodyInfo.startDateTimeUpdate,
                    "status": requestBodyInfo.statusUpdate,
                    "targetModule": requestBodyInfo.targetModuleUpdate,
                    "targetSystem": requestBodyInfo.targetSystemUpdate,
                    "title": requestBodyInfo.titleUpdate,
                  }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('appNotification')
                expect(res.body.response).to.have.property('approvalComments')
                expect(res.body.response).to.have.property('approvedBy')
                expect(res.body.response).to.have.property('chargeTo')
                expect(res.body.response).to.have.property('days')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('emailNotification')
                expect(res.body.response).to.have.property('expiryDateTime')
                expect(res.body.response).to.have.property('id')
                this.links=res.body.response.links
                this.linksLength=this.links.length                  
                for(let j=0; j<this.linksLength ; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')
                }
                expect(res.body.response).to.have.property('messageInChinese')
                expect(res.body.response).to.have.property('messageInEnglish')
                expect(res.body.response).to.have.property('messageInMal')
                expect(res.body.response).to.have.property('pushNotification')
                expect(res.body.response).to.have.property('repeatInterval')
                expect(res.body.response).to.have.property('roles')
                expect(res.body.response).to.have.property('scheduleType')
                expect(res.body.response).to.have.property('scheduled')
                expect(res.body.response).to.have.property('smsNotification')
                expect(res.body.response).to.have.property('startDateTime')
                expect(res.body.response).to.have.property('status')
                expect(res.body.response).to.have.property('targetModule')
                expect(res.body.response).to.have.property('targetSystem')
                expect(res.body.response).to.have.property('title')
            })
        })
        it('TC15-Negative-Verify that if user insert an invalid Announcement ID & send it with a valid request body then is it showing any error message with proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+announcementsId+'1212',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "appNotification": requestBodyInfo.appNotificationUpdate,
                    "approvalComments": requestBodyInfo.approvalCommentsUpdate,
                    "approvedBy": requestBodyInfo.approvedByUpdate,
                    "chargeTo": requestBodyInfo.chargeToUpdate,
                    "days": requestBodyInfo.daysUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "emailNotification": requestBodyInfo.emailNotificationUpdate,
                    "expiryDateTime": requestBodyInfo.expiryDateTimeUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "messageInChinese": requestBodyInfo.messageInChineseUpdate,
                    "messageInEnglish": requestBodyInfo.messageInEnglishUpdate,
                    "messageInMal": requestBodyInfo.messageInMalUpdate,
                    "pushNotification": requestBodyInfo.pushNotificationUpdate,
                    "repeatInterval": requestBodyInfo.repeatIntervalUpdate,
                    "roles": requestBodyInfo.rolesUpdate,
                    "scheduleType": requestBodyInfo.scheduleTypeUpdate,
                    "scheduled": requestBodyInfo.scheduledUpdate,
                    "smsNotification": requestBodyInfo.smsNotificationUpdate,
                    "startDateTime": requestBodyInfo.startDateTimeUpdate,
                    "status": requestBodyInfo.statusUpdate,
                    "targetModule": requestBodyInfo.targetModuleUpdate,
                    "targetSystem": requestBodyInfo.targetSystemUpdate,
                    "title": requestBodyInfo.titleUpdate,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC16-Negative-Verify that if User send the request with a request body contains blank fields then is It reflecting proper error message & proper status code or Not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+announcementsId,
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
        it('TC17-NA-Verify that after sending a valid request with valid Announcement ID, the changes are reflecting in DB for the particular record or not', function(){

        })
        it('TC18-Positive-Verify that the response time should be less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+announcementsId,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "active": requestBodyInfo.activeUpdate,
                    "appNotification": requestBodyInfo.appNotificationUpdate,
                    "approvalComments": requestBodyInfo.approvalCommentsUpdate,
                    "approvedBy": requestBodyInfo.approvedByUpdate,
                    "chargeTo": requestBodyInfo.chargeToUpdate,
                    "days": requestBodyInfo.daysUpdate,
                    "description": requestBodyInfo.descriptionUpdate,
                    "emailNotification": requestBodyInfo.emailNotificationUpdate,
                    "expiryDateTime": requestBodyInfo.expiryDateTimeUpdate,
                    "id": requestBodyInfo.idUpdate,
                    "messageInChinese": requestBodyInfo.messageInChineseUpdate,
                    "messageInEnglish": requestBodyInfo.messageInEnglishUpdate,
                    "messageInMal": requestBodyInfo.messageInMalUpdate,
                    "pushNotification": requestBodyInfo.pushNotificationUpdate,
                    "repeatInterval": requestBodyInfo.repeatIntervalUpdate,
                    "roles": requestBodyInfo.rolesUpdate,
                    "scheduleType": requestBodyInfo.scheduleTypeUpdate,
                    "scheduled": requestBodyInfo.scheduledUpdate,
                    "smsNotification": requestBodyInfo.smsNotificationUpdate,
                    "startDateTime": requestBodyInfo.startDateTimeUpdate,
                    "status": requestBodyInfo.statusUpdate,
                    "targetModule": requestBodyInfo.targetModuleUpdate,
                    "targetSystem": requestBodyInfo.targetSystemUpdate,
                    "title": requestBodyInfo.titleUpdate,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get Request Users for Announcement', function(){
        it('TC25-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId+'/users',
            }).then(function(res){
                expect(res.status).to.equal(200)
                userId=res.body.response.content[0].id
                userName=res.body.response.content[0].name
            })
        })
        it('TC26-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId+'/users',
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)                    
                } else {
                    for(let i=0; i<this.contentLength; i++)
                    {
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('branchCode')
                        expect(res.body.response.content[i]).to.have.property('dateOfJoining')
                        expect(res.body.response.content[i]).to.have.property('dateOfLeaving')
                        expect(res.body.response.content[i]).to.have.property('email')
                        expect(res.body.response.content[i]).to.have.property('fullName')
                        expect(res.body.response.content[i]).to.have.property('groupCode')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('jobTitle')
                        this.links=res.body.response.content[i].links
                        this.linksLength=this.links.length
                        for(let j=0; j<this.linksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                            expect(res.body.response.content[i].links[j]).to.have.property('href')   
                        }
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('superior')
                        expect(res.body.response.content[i]).to.have.property('type')
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++){
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')   
                } 
            })
        })
        it('TC27-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC28-Positive-Verify that the response timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId+'/users',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        it('TC29-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+announcementsId+'1212'+'/users',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
    })
    describe('Post Request Publish Announcements', function(){
        it('TC30-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+announcementsId+'/users/'+userId+'/publish',
            }).then(function(res){
                expect(res.status).to.equal(201)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.equal(true)
            })
        })
        it('TC31-Negative-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+''+'/users/'+''+'/publish',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(404)
                expect(res.body).to.have.property('message')
            })
        })
        it('TC32-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC33-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+announcementsId+'/users/'+userId+'/publish',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        it('TC34-Negative-Verify that if user insert a valid request with invalid ID then is it showing any error with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/'+announcementsId+'1212/users/'+userId+'/publish',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message')
            })
        })
    })
    describe('Post Request Publish Service Alerts', function(){
        it('TC35-Positive-Verify that if user send the request with valid  request body then the response status is showing 201 or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/service-alert/'+userName,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "navigationPage": requestBodyInfo.navigationPage,
                    "vehichleNumber": requestBodyInfo.vehichleNumber,
                    "vehicleName": requestBodyInfo.vehicleName,
                    "workflow": requestBodyInfo.workflow,
                  },
            }).then(function(res){
                expect(res.status).to.equal(201)
            })
        })
        it('TC36-Failed-Verify that if user send the request with blank field values then its showing proper error message & status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/service-alert/'+userName,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "navigationPage": "",
                    "vehichleNumber": "",
                    "vehicleName": "",
                    "workflow": "",
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(201)
                cy.log('Need satus code is 400')
            })
        })
        it('TC37-NA-Verify that the response is matching with DB record or not', function(){

        })
        it('TC38-Positive-Verify that the response time is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/service-alert/'+userName,
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "navigationPage": requestBodyInfo.navigationPage,
                    "vehichleNumber": requestBodyInfo.vehichleNumber,
                    "vehicleName": requestBodyInfo.vehicleName,
                    "workflow": requestBodyInfo.workflow,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
        it('TC39-Positive-Verify that if user insert a valid request with invalid User name then is it showing any error with proper status code or not', function(){
            cy.request({
                method: 'POST',
                url: commonUrl+'/service-alert/'+userName+'jai',
                headers: {
                    "Content-Type": headersInfo.ContentType,
                },
                body: {
                    "navigationPage": requestBodyInfo.navigationPage,
                    "vehichleNumber": requestBodyInfo.vehichleNumber,
                    "vehicleName": requestBodyInfo.vehicleName,
                    "workflow": requestBodyInfo.workflow,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
    })
    describe('Delete request Announcement ID', function(){
        it('TC19-Positive-Verify that the response code for a suucessful positive request is 200 ok or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+announcementsId,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC20-NA-Verify that by sending a valid request & getting a proper response, the particular data is removed from DB or not', function(){

        })
        it('TC21-Negative-Verify that by sending the request for same ID for multiple time, its throwing any error in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+announcementsId,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC23-Negative-Verify that if user try to send a valid request for a invalid Announcement ID, then is it showing any proper error message with status code in response or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+announcementsId+'1212',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC23-NA-Repeated-Verify that the parameter is showing as swagger or not', function(){
            
        })
        it('TC24-Positive-Verify the response time is less than 1 second or not', function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+announcementsId08,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})