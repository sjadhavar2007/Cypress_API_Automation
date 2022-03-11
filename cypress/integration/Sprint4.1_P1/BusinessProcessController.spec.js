///<reference types="cypress"/>

describe('Business Process Controller', () => {
    var commonUrl;
    var code;
    var businessProcessStepId;
    var body;
    before(function(){
        cy.fixture('Sprint4.1_P1/Url').then((data) => {
            commonUrl = data.URL_BusinessProcessController
        })
        cy.fixture('Sprint4.1_P1/body').then((data) => {
            body = data
        })
    })

    describe('Get request Business_Process', function(){
        it('TC01-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/business-process',
            }).then((res) => {
                expect(res.status).to.eq(200)
                code=res.body.response.content[0].code
                console.log(code)
                this.content =res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength<=0) {
                    expect(res.body.response.content.length).to.equal(0)
                } else {
                    for(let i=0; i<this.contentLength; i++){
                        expect(res.body.response.content[i]).to.have.property('businessProcessStep')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength =this.contentLinks.length
                        for(let j=0; j<this.contentLinksLength; j++){
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                }
                }
                this.links = res.body.response.links
                this.linksLength =this.links.length
                for(let k=0; k<this.linksLength; k++){
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
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
                url: commonUrl+'/business-process',
            }).then((res) => {
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request Business_Process_Code', function(){
        it('TC04-Positive-Verify the status code and response parameters are according to swagger or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/business process/'+code,
            }).then((res) => {
                expect(res.status).to.eq(200)
                this.businessProcessStep =res.body.response.businessProcessStep
                this.businessProcessStepLength = this.businessProcessStep.length
                businessProcessStepId=res.body.response.businessProcessStep[0].id
                if (this.businessProcessStepLength<=0) 
                {
                    expect(res.body.response.content.length).to.equal(0)
                } 
                else 
                {
                    for(let i=0; i<this.businessProcessStepLength; i++){
                        expect(res.body.response.businessProcessStep[i]).to.have.property('active')
                        expect(res.body.response.businessProcessStep[i]).to.have.property('businessProcessId')
                        expect(res.body.response.businessProcessStep[i]).to.have.property('id')
                        expect(res.body.response.businessProcessStep[i]).to.have.property('mandatory')
                        expect(res.body.response.businessProcessStep[i]).to.have.property('orderNumber')
                        expect(res.body.response.businessProcessStep[i]).to.have.property('steps')
                    }
                }
                expect(res.body.response).to.have.property('code')
                expect(res.body.response).to.have.property('description')
                expect(res.body.response).to.have.property('id')
                this.links = res.body.response.links
                this.linksLength =this.links.length
                for(let k=0; k<this.linksLength; k++){
                    expect(res.body.response.links[k]).to.have.property('href')
                    expect(res.body.response.links[k]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify that the response data is matching with the DATABASE entry or not', function(){

        })
        it('TC06-Positive-Verify the response time of the GET request', function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/business process/'+code,
            }).then((res) => {
                expect(res.duration).to.lessThan(1000)
                
            })
        })
    })
    describe('Put request Business_Process_Step_ID', function(){
        it('TC07-Positive-Verify the response code is 200 ok and response data is as per the request body for valid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/business process/'+businessProcessStepId,
                headers: {
                    "Content-Type": body.ContentType,
                },
                body: {
                    "active": body.active,
                    "businessProcessId": body.businessProcessId,
                    "id": body.id,
                    "mandatory": body.mandatory,
                    "orderNumber": body.orderNumber,
                    "steps": body.steps,
                  }
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('active', body.active)
                expect(res.body.response).to.have.property('id', body.id)
                expect(res.body.response).to.have.property('mandatory', body.mandatory)
                expect(res.body.response).to.have.property('orderNumber', body.orderNumber)
                expect(res.body.response).to.have.property('steps', body.steps)

            })
        })
        it('TC08-NA-Verify that after sending the request with a valid request body it is reflecting in the DATABASE or not', function(){

        })
        it('TC09-Negative-Verify the response code is 403  and response data is as per request body for invalid ID or not', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/business process/'+businessProcessStepId+121212,
                headers: {
                    "Content-Type": body.ContentType,
                },
                body: {
                    "active": body.active,
                    "businessProcessId": body.businessProcessId,
                    "id": body.id,
                    "mandatory": body.mandatory,
                    "orderNumber": body.orderNumber,
                    "steps": body.steps,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC10-Positive-Verify the response time of the PUT request', function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/business process/'+businessProcessStepId,
                headers: {
                    "Content-Type": body.ContentType,
                },
                body: {
                    "active": body.active,
                    "businessProcessId": body.businessProcessId,
                    "id": body.id,
                    "mandatory": body.mandatory,
                    "orderNumber": body.orderNumber,
                    "steps": body.steps,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})