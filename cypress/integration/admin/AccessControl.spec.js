///<reference types="cypress"/>

describe('Access Control Controller', function(){
    var commonUrl;
    var id;
    var headersInfo;
    before(function(){
        cy.fixture('admin/AccessControl/AccessControl_url').then(function(data){
            commonUrl=data.URL_AccessControls
        })
        cy.fixture('admin/AccessControl/AccessControl_headers').then(function(data){
            headersInfo=data
        })
    })
    describe('Get Request User', function(){
        it('TC01-Positive-Verify that the response is as per the swager or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)    
                expect(res.body).to.have.property('message')
                id=res.body.response.content[0].id
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('name')
                    expect(res.body.response.content[i]).to.have.property('links')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                    }
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let k=0; k<this.linksLength; k++)
                {
                    expect(res.body.response.links[k]).to.have.property('rel')
                    expect(res.body.response.links[k]).to.have.property('href')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
                
            })
        })
        it('TC02-NA-Verify that the response is matching with database or not', function(){

        })
        it('TC03-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
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
    describe('Get Request User ID', function(){
        it('TC05-Positive-Validate that all the get parameters are coming as per swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+ '/' +id,
                headers: {
                    "Content-Type":headersInfo.ContentType,
                },
            }).then(function(res){
                expect(res.body.status).to.equal(200)
                expect(res.body).to.have.property('message')
                expect(res.body.response).to.have.property('active')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('id')
                expect(res.body.response).to.have.property('name')
                expect(res.body.response).to.have.property('links')
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let j=0; j<this.linksLength; j++)
                {
                    expect(res.body.response.links[j]).to.have.property('rel')
                    expect(res.body.response.links[j]).to.have.property('href')
                }
                    
            })
        })
        it('TC06-NA-Verify that the response is matching with database or not', function(){
           
        })
        it('TC07-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+ '/' +id,
                headers: {
                    "Content-Type":headersInfo.ContentType,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)  
            })
        })
        it('TC08-Negative-Verify that if user send the request with an invalid ID then is it showing any error in response message or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+ '/' +id+'a',
                headers: {
                    "Content-Type":headersInfo.ContentType,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)    
            })
        })
        it('TC09-Positive-Verify that the timing is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+ '/' +id,
                headers: {
                    "Content-Type":headersInfo.ContentType,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)  
            })
        })
    })
})
