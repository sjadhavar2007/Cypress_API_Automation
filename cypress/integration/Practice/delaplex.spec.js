///<reference types="Cypress" />

describe('Everything about your Pets', function(){
    var id;
    it('TC01-POST', function(){
        cy.request({
            method: 'POST',
            url: "https://petstore.swagger.io/v2/pet",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "id": 0,
                "category": {
                  "id": 0,
                  "name": "Automation"
                },
                "name": "doggie",
                "photoUrls": [
                  "string"
                ],
                "tags": [
                  {
                    "id": 0,
                    "name": "string"
                  }
                ],
                "status": "available"
              }
        }).then((res) => {
            id=res.body.id
            console.log(id)
            expect(res.status).to.eq(200)
            expect(res.body.category).to.have.property('id', 0)
            expect(res.body.category).to.have.property('name', 'Automation')
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('name', 'doggie')
            expect(res.body.photoUrls[0]).to.eq('string')
            expect(res.body).to.have.property('status', 'available')
            expect(res.body.tags[0]).to.have.property('id', 0)
            expect(res.body.tags[0]).to.have.property('name', 'string')
            expect(res.duration).to.be.lessThan(1000)
            
        })
    })
    it('TC02-GET', function(){
        cy.request({
            method: 'GET',
            url: "https://petstore.swagger.io/v2/pet/findByStatus",
            qs: {
                "status": "pending",
            }
        }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.duration).to.be.lessThan(2000)
                this.array=res.body
                this.length=this.array.length
                console.log(this.length)
                if(this.length<=0){
                   expect(res.body.length).to.equal(0)
                }
            else{
                for(let i=0 ;i>this.length; i++){
                    expect(res.body[i]).to.have.property('status', 'pending')
                }
            }
        })
    })
  
})