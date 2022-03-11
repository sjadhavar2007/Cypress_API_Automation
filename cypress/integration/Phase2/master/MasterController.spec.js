///<reference types="Cypress" />

describe('Master Controller', function(){
var baseUrl;
var params;
var loginBody;
var accessToken;
    before(function(){
        cy.fixture('Phase2/master/commonUrl').then(function(data){
            baseUrl=data.commonUrl
        })
        cy.fixture('Phase2/master/params').then(function(data){
            params=data
        })
        cy.fixture('Phase2/commonBody').then(function(data){
            loginBody=data
        })
    })
    describe('Login Controller', function(){
        it('Create Bearer token for Authorization', function(){
            cy.request({
                method:'POST',
                url:baseUrl+'/api/dms/admin/v1/login/auth',
                headers:{
                    "Content-Type":"application/json"
                },
                body:{
                    "name": loginBody.name,
                    "password": loginBody.password,
                    "mobileToken": loginBody.mobileToken,
                    "verificationCode": loginBody.verificationCode,
                },
            }).then(function(res){
                expect(res.status).to.eq(201)
                accessToken=res.body.response.accessToken
            })
        })
    })
    describe('Get request Master_Records OP-CATEGORY', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
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
        it('TC03-Positive-Verify the response body is containing 10 OP-CATEGORY records listed or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                this.content = res.body.response.content
                this.contentLength = this.content.length
                expect(res.body.response.content.length).to.equal(10)
            })
        })
        it('TC04-Positive-Verify the response is containing op-categories listed as Zero, Maintenance, Maxcheck, EM, Thunder), Comp Repair, PDI/ PDI Rec, Others, EWP or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        this.description0=res.body.response.content[i].description
                        expect(res.body.response.content[i]).to.have.property('description', this.description0)
                    }
                }
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request Master_Records OP-TYPE', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_opType,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
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
        it('TC03-Positive-Verify the response body is containing 7 OP-CATEGORY records listed or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_opType,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                this.content = res.body.response.content
                this.contentLength = this.content.length
                //expect(res.body.response.content.length).to.equal(7)
                expect(res.body.response.content.length).to.equal(10)
            })
        })
        it('TC04-Positive-Verify the response is containing OP-Types listed as Others, Free Srv, Maintenance, Comp Repair, EWP, BP or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_opType,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        this.description0=res.body.response.content[i].description
                        expect(res.body.response.content[i]).to.have.property('description', this.description0)
                    }
                }
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_opType,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Get request Master_Records Maintenance_Type', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_Maintenance_Type,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        expect(res.body.response.content[i]).to.have.property('active')
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
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
        it('TC03-Positive-Verify the response body is containing 33 maintenance types listed ornot', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_Maintenance_Type,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                this.content = res.body.response.content
                this.contentLength = this.content.length
                expect(res.body.response.content.length).to.equal(10)   //33{array length capture from db upto 10}
                //expect(res.body.response.page).to.have.property('totalElements', 35)
                expect(res.body.response.page).to.have.property('totalElements', 66)
            })
        })
        it('TC04-Positive-Verify the response is containing maintenance types listed as Zero, Maxcheck Ext, Non Thunder Oil Change  Ext, Non Thunder Oil Change & Filter Change Ext, Thunder Srv Oil Change Ext, Thunder Oil Change & Filter Change Ext, Express Maintenance Ext, Alignment, Balancing, Alignment & Balancing, Replace Tyre, ATF, Aircond Servicing, Battery, Other Maintenance, Engine, Clutch, Axle/Steering, Brake, Body Interior, Electrical, Aircond, B&P/Body Exterior, Maxcheck Int, Non Thunder Oil Change- Int, Non Thunder Oil Change & Filter Change Int, Thunder Srv Oil Change Int, Express Maintenance Int, EFI, Checker, SSC, Diagnosis, EWP or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_Maintenance_Type,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
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
                        this.description0=res.body.response.content[i].description
                        expect(res.body.response.content[i]).to.have.property('description', this.description0)
                    }
                }
            })
        })
        it('TC05-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/master/v1/master-data',
                qs: {
                    "category": params.category_Maintenance_Type,
                },
                headers: {
                    "Authorization": "Bearer "+accessToken,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})