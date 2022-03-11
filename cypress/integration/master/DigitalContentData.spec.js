///<reference types="cypress"/>
describe('Digital Content Data Controller',function(){

    var commonUrl;
    var headersInfo;
    var paramsInfo;
    var requestBody;
    var DigitalContentID;

    before(function(){
        cy.fixture('master/DigitalContentData/DigitalContentData_url').then(function(data){
            commonUrl = data.URL_DigitalContentData
        })
        cy.fixture('master/DigitalContentData/DigitalContentData_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/DigitalContentData/DigitalContentData_params').then(function(data){
            paramsInfo = data
        })
        cy.fixture('master/DigitalContent/DigitalContent_body').then(function(data){
            requestBody=data
        })   
    })
    describe('POST DIGITAL CONTENT',function(){
        it('TC00-Required-Digital Content ID Creation',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers : {
                    "Content-Type" : headersInfo.ContentType
                },
                body : {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "series": requestBody.series,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                DigitalContentID = res.body.response.id
                console.log = DigitalContentID
            })
        })
    })
    describe('Get Request Digital Content Data Records',function(){
        it('TC01-Positive-Verify that if user send a valid request then the success response code is 200 ok or Not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + DigitalContentID + '/data',
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC02-Positive-Validate that all the get parameters are coming as per swagger',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + DigitalContentID + '/data',
            }).then(function(res){
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if(this.contentLength<=0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('dataType')
                    expect(res.body.response.content[i]).to.have.property('fileName')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('links')
                    expect(res.body.response.content[i]).to.have.property('path')
                    expect(res.body.response.content[i].dataType).to.have.property('active')
                    expect(res.body.response.content[i].dataType).to.have.property('category')
                    expect(res.body.response.content[i].dataType).to.have.property('code')
                    expect(res.body.response.content[i].dataType).to.have.property('description')
                    expect(res.body.response.content[i].dataType).to.have.property('id')
                    expect(res.body.response.content[i].dataType).to.have.property('links')
                    this.links = res.body.response.content[i].links
                    this.linksLength = this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
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
        it('TC03-Negative-Verify that if user send the request with invalid ID then is responding with proper error message & code or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + DigitalContentID + 5 + '/data',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC04-NA-Verify that the response is matching with database or not',function(){

        })
        it('TC05-Positive-Verify that the response timing is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + DigitalContentID + '/data',
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('DELETE DIGITAL CONTENT',function(){
        it('TCXX-Required-Digital Content ID Deleted',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + DigitalContentID,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
    })

})