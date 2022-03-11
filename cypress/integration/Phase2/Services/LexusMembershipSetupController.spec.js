///<reference types="cypress" />

describe('Lexus Membership Setup Controller', function(){
    var baseUrl;
    var contentType;
    var requestBody;
    var id;
    before(function(){
        cy.fixture('Phase2/commonUrl').then(function(data){
            baseUrl = data.commonUrl
        })
        cy.fixture('Phase2/heraders').then(function(data){
            contentType= data.Content_Type
        })
        cy.fixture('Phase2/Services/LexusMembershipSetupController').then(function(data){
            requestBody = data
        })
    })
    describe('Get request Find_all_Lexus_Membership_Setup', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/lexus-membership-set-up/',
            }).then(function(res){
                expect(res.status).to.eq(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } else 
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i].customerVehicle).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('effectiveDate')
                        expect(res.body.response.content[i]).to.have.property('expiryDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('noOfYears')
                        expect(res.body.response.content[i]).to.have.property('totalFee')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                    }
                }
                this.Links = res.body.response.links
                this.LinksLength = this.Links.length
                for(let k=0 ; k<this.LinksLength ; k++)
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
        it('TC02-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC03-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/lexus-membership-set-up/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(1000)
            })
        })
    })
    describe('Post request Create_Lexus_Membership_Setup', function(){
        it('TC04-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/lexus-membership-set-up/',
                headers: {
                    'Content-Type': contentType
                },
                body: {
                    "customerVehicleId": 8,
                    "effectiveDate": "2021-12-22",
                    "expiryDate": "2022-12-22",
                    "id": 0,
                    "noOfYears": 1,
                    "totalFee": 5420
                  }
                  
            }).then(function(res){
                expect(res.status).to.eq(201)
            })
        })
    })
})