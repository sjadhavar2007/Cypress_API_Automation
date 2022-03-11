///<reference types = "Cypress" />

describe('Audit Active Directory Controller',function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var activeDirectoryId1;
    var activeDirectoryId2;
    before(function(){
        cy.fixture('admin/AuditActiveDirectoryController/AuditActiveDirectory_url').then(function(data){
            commonUrl = data.URL_AuditActiveDirectory
        })
        cy.fixture('admin/AuditActiveDirectoryController/AuditActiveDirectory_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('admin/AuditActiveDirectoryController/AuditActiveDirectory_body').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Audit Active Directory',function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('action')
                    expect(res.body.response.content[i]).to.have.property('error')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('links')
                    expect(res.body.response.content[i]).to.have.property('status')
                    expect(res.body.response.content[i]).to.have.property('userName')
                    this.links = res.body.response.content[i].links
                    this.linksLength = this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                }
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let k=0; k<this.linksLength; k++)
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
        it('TC02-NA-Verify that the response body is matching with DB or not',function(){

        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Audit Active Directory',function(){
        it('TC04-Positive-Verify that the status code & response body is as per the swagger or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body:{
                    "action": requestBody.action,
                    "error": requestBody.error,
                    "status": requestBody.status,
                    "userName": requestBody.userName
                }
            }).then(function(res){
                activeDirectoryId1 = res.body.response.id
                expect(res.status).to.equal(201)
                expect(res.body.response).to.have.property('action',requestBody.action)
                expect(res.body.response).to.have.property('error',requestBody.error)
                expect(res.body.response).to.have.property('id',activeDirectoryId1)
                expect(res.body.response).to.have.property('status',requestBody.status)
                expect(res.body.response).to.have.property('userName',requestBody.userName)
                expect(res.body.response).to.have.property('links')
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let l=0; l<this.linksLength; l++)
                {
                    expect(res.body.response.links[l]).to.have.property('href')
                    expect(res.body.response.links[l]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify that the newly created record is reflecting in DB or not',function(){

        })
        it('TC06-Negative-Verify the status code if user send the request with blank field values',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body:{
                    "action": "",
                    "error": "",
                    "status": "",
                    "userName": ""
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message', "Validation Error")
                expect(res.body.response).to.not.equal(null) 
            })
        })
        it('TC07-Positive-Verify that the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body:{
                    "action": requestBody.action,
                    "error": requestBody.error,
                    "status": requestBody.status,
                    "userName": requestBody.userName
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                activeDirectoryId2 = res.body.response.id
            })
        })
    })
    describe('Get Request Audit Active Directory ID',function(){
        it('TC08-Positive-Verify that the status code & response body is as per the swagger or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + activeDirectoryId1,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('action',requestBody.action)
                expect(res.body.response).to.have.property('error',requestBody.error)
                expect(res.body.response).to.have.property('id',activeDirectoryId1)
                expect(res.body.response).to.have.property('status',requestBody.status)
                expect(res.body.response).to.have.property('userName',requestBody.userName)
                this.links = res.body.response.links
                this.linksLength = this.links.length
                for(let l=0; l<this.linksLength; l++)
                {
                    expect(res.body.response.links[l]).to.have.property('href')
                    expect(res.body.response.links[l]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify that the response body is matching with DB or not',function(){

        })
        it('TC10-Negative-Verify the status code if user send the request with invalid ID',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + activeDirectoryId1+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                expect(res.body).to.have.property('message',"Invalid auditActiveDirectory id")
                expect(res.body.response).to.equal(null)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + activeDirectoryId2
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    // describe('Put Request Audit Active Directory ID',function(){
    //     it('TC12-Positive-Verify the status code & response body is showing as per the swagger or not',function(){
    //         cy.request({
    //             method: 'PUT',
    //             url: commonUrl + '/' + activeDirectoryId1,
    //             headers: {
    //                 "Content-Type": headersInfo.ContentType
    //             },
    //             body:{
    //                 "action": requestBody.actionUpdate,
    //                 "error": requestBody.errorUpdate,
    //                 "status": requestBody.statusUpdate,
    //                 "userName": requestBody.userNameUpdate
    //             }
    //         }).then(function(res){
    //             expect(res.status).to.equal(200)
    //             expect(res.body.response).to.have.property('action',requestBody.actionUpdate)
    //             expect(res.body.response).to.have.property('error',requestBody.errorUpdate)
    //             expect(res.body.response).to.have.property('id',activeDirectoryId1)
    //             expect(res.body.response).to.have.property('status',requestBody.statusUpdate)
    //             expect(res.body.response).to.have.property('userName',requestBody.userNameUpdate)
    //             this.links = res.body.response.links
    //             this.linksLength = this.links.length
    //             for(let l=0; l<this.linksLength; l++)
    //             {
    //                 expect(res.body.response.links[l]).to.have.property('href')
    //                 expect(res.body.response.links[l]).to.have.property('rel')
    //             }
    //         })
    //     })
    //     it('TC13-NA-Verify that the particular ID get updated in the DB or not',function(){

    //     })
    //     it('TC14-Negative-Verify the status code if user send the request with invalid ID',function(){
    //         cy.request({
    //             method: 'PUT',
    //             url: commonUrl + '/' + activeDirectoryId1+1,
    //             headers: {
    //                 "Content-Type": headersInfo.ContentType
    //             },
    //             body:{
    //                 "action": requestBody.actionUpdate,
    //                 "error": requestBody.errorUpdate,
    //                 "status": requestBody.statusUpdate,
    //                 "userName": requestBody.userNameUpdate
    //             },
    //             failOnStatusCode: false
    //         }).then(function(res){
    //             expect(res.status).to.equal(403)
    //             expect(res.body).to.have.property('message',"Invalid auditActiveDirectory id")
    //             expect(res.body.response).to.equal(null)
    //         })
    //     })
    //     it('TC15-Negative-Verify the status code if user send  the request with blank fields',function(){
    //         cy.request({
    //             method: 'PUT',
    //             url: commonUrl + '/' + activeDirectoryId1,
    //             headers: {
    //                 "Content-Type": headersInfo.ContentType
    //             },
    //             body:{
    //                 "action": "",
    //                 "error": "",
    //                 "status": "",
    //                 "userName": ""
    //             },
    //             failOnStatusCode: false,
    //         }).then(function(res){
    //             expect(res.status).to.equal(400)
    //             expect(res.body).to.have.property('message', "Validation Error")
    //             expect(res.body.response).to.not.equal(null)
    //         })
    //     })
    //     it('TC16-Positive-Verify the response duration is less than 1 second or not',function(){
    //         cy.request({
    //             method: 'PUT',
    //             url: commonUrl + '/' + activeDirectoryId2,
    //             headers: {
    //                 "Content-Type": headersInfo.ContentType
    //             },
    //             body: {
    //                 "action": requestBody.actionUpdate,
    //                 "error": requestBody.errorUpdate,
    //                 "status": requestBody.statusUpdate,
    //                 "userName": requestBody.userNameUpdate
    //             }
    //         }).then(function(res){
    //             expect(res.duration).to.lessThan(1000)
    //         })
    //     })
    // })
    // describe('Delete Request Audit Active Directory ID',function(){
    //     it('TC17-Positive-Verify the response body & status code is as per the swagger or not',function(){
    //         cy.request({
    //             method: 'DELETE',
    //             url: commonUrl + '/' + activeDirectoryId1,
    //         }).then(function(res){
    //             expect(res.status).to.equal(200)
    //             expect(res.body.response).to.have.property('action', null)
    //             expect(res.body.response).to.have.property('error', null)
    //             expect(res.body.response).to.have.property('id', null)
    //             expect(res.body.response).to.have.property('status', null)
    //             expect(res.body.response).to.have.property('userName', null)
    //         })
    //     })
    //     it('TC18-NA-Verify that after deleteing the record the data is getting from DB or not',function(){

    //     })
    //     it('TC19-Negative-Verify the status code if we send the same request twice',function(){
    //         cy.request({
    //             method: 'DELETE',
    //             url: commonUrl + '/' + activeDirectoryId1,
    //             failOnStatusCode: false,
    //         }).then(function(res){
    //             expect(res.status).to.equal(403)
    //             expect(res.body).to.have.property('message',"Invalid auditActiveDirectory id")
    //             expect(res.body.response).to.equal(null)
    //         })
    //     })
    //     it('TC20-Positive-Verify the response duration is less than 1 second or not',function(){
    //         cy.request({
    //             method: 'DELETE',
    //             url: commonUrl + '/' + activeDirectoryId2,
    //         }).then(function(res){
    //             expect(res.duration).to.lessThan(1000)
    //         })
    //     })
    // })

})