///<reference types="cypress"/>

describe('Post Request Accessory Config', function(){
    var accessoryConfigId;
    it('TC04-Positive-Verify the response code & response body as per the request body or not', function(){
        cy.request({
            method: 'POST',
            url: "https://dmsqa.simbiotiktech.com/api/dms/master/v1/accessory-config",
            
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer A1067A07-B9D9-4C33-9762-DAD0665E3A78"
            },
            body: {
                "code": "sevag",
                "description": "Toyota",
                "active": true,
                "id": 0
            },
            
        }).then(function(res){
            expect(res.status).to.equal(201)
            accessoryConfigId=res.body.response.id
            console.log(accessoryConfigId)
        })
    })
})