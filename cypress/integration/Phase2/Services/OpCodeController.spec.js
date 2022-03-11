///<reference types="Cypress" />
import getCode from '././Utility/getCode'
describe('Op Code Controller', function(){
    var baseUrl;
    var requestBody;
    var uniqueCode;
    var id;
    var id07;

    before(function(){
        cy.fixture('Phase2/Services/CommonUrl').then(function(data){
            baseUrl = data.URL_OpCodeController;
        })
        cy.fixture('Phase2/Services/OpCodeControllerBody').then(function(data){
            requestBody = data
        })
        const code=new getCode();
        uniqueCode=code.getCode();
    })
    describe('Get request Find_all_Op-Code_Controller', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl,
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
                        expect(res.body.response.content[i]).to.have.property('blockPart')
                        expect(res.body.response.content[i]).to.have.property('category')
                        expect(res.body.response.content[i]).to.have.property('checkLinkParts')
                        expect(res.body.response.content[i]).to.have.property('code')
                        expect(res.body.response.content[i]).to.have.property('codeClass')
                        expect(res.body.response.content[i]).to.have.property('codeGroup')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('description')
                        expect(res.body.response.content[i]).to.have.property('firOpCodeExclusion')
                        expect(res.body.response.content[i]).to.have.property('fran')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('maintenanceType')
                        expect(res.body.response.content[i]).to.have.property('opType')
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
                url: baseUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post request Create_Op-Code_Controller', function(){
        it('TC04-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'POST',
                url: baseUrl,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "blockPart": requestBody.blockPart,
                    "categoryId": requestBody.categoryId,
                    "checkLinkParts": requestBody.checkLinkParts,
                    "code": uniqueCode,
                    "codeClass": requestBody.codeClass,
                    "codeGroup": requestBody.codeGroup,
                    "description": requestBody.description,
                    "firOpCodeExclusion": requestBody.firOpCodeExclusion,
                    "franId": requestBody.franId,
                    "id": requestBody.id,
                    "maintenanceTypeId": requestBody.maintenanceTypeId,
                    "opTypeId": requestBody.opTypeId,
                  }
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('blockPart', requestBody.blockPart)
                expect(res.body.response.category).to.have.property('id', requestBody.categoryId)
                expect(res.body.response).to.have.property('checkLinkParts', requestBody.checkLinkParts)
                expect(res.body.response).to.have.property('code', uniqueCode)
                expect(res.body.response).to.have.property('codeClass', requestBody.codeClass)
                expect(res.body.response).to.have.property('codeGroup', requestBody.codeGroup)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('firOpCodeExclusion', requestBody.firOpCodeExclusion)
                expect(res.body.response.fran).to.have.property('id', requestBody.franId)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.maintenanceType).to.have.property('id', requestBody.maintenanceTypeId)
                expect(res.body.response.opType).to.have.property('id', requestBody.opTypeId)

            })
        })
        it('TC05-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC06-NA-Verify the request body is matching with design or not', function(){

        })
        it('TC07-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "blockPart": requestBody.blockPart,
                    "categoryId": requestBody.categoryId,
                    "checkLinkParts": requestBody.checkLinkParts,
                    "code": uniqueCode+1,
                    "codeClass": requestBody.codeClass,
                    "codeGroup": requestBody.codeGroup,
                    "description": requestBody.description,
                    "firOpCodeExclusion": requestBody.firOpCodeExclusion,
                    "franId": requestBody.franId,
                    "id": requestBody.id,
                    "maintenanceTypeId": requestBody.maintenanceTypeId,
                    "opTypeId": requestBody.opTypeId,
                  }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                id07 = res.body.response.id
            })
        })
    })
    describe('Get request Find_by_ID_Op-Code_Controller', function(){
        it('TC08-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('blockPart', requestBody.blockPart)
                expect(res.body.response.category).to.have.property('id', requestBody.categoryId)
                expect(res.body.response).to.have.property('checkLinkParts', requestBody.checkLinkParts)
                expect(res.body.response).to.have.property('code', uniqueCode)
                expect(res.body.response).to.have.property('codeClass', requestBody.codeClass)
                expect(res.body.response).to.have.property('codeGroup', requestBody.codeGroup)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('firOpCodeExclusion', requestBody.firOpCodeExclusion)
                expect(res.body.response.fran).to.have.property('id', requestBody.franId)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.maintenanceType).to.have.property('id', requestBody.maintenanceTypeId)
                expect(res.body.response.opType).to.have.property('id', requestBody.opTypeId)
            })
        })
        it('TC09-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC10-Negative-Verify the response status code is 403 or not, if send the request with invalid Op-Code ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+id+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC11-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+id07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Update_Op-Code_Controller', function(){
        it('TC12-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+id,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "blockPart": requestBody.blockPart,
                    "categoryId": requestBody.categoryId,
                    "checkLinkParts": requestBody.checkLinkParts,
                    "code": uniqueCode+2,
                    "codeClass": requestBody.codeClass,
                    "codeGroup": requestBody.codeGroup,
                    "description": requestBody.description,
                    "firOpCodeExclusion": requestBody.firOpCodeExclusion,
                    "franId": requestBody.franId,
                    "id": id,
                    "maintenanceTypeId": requestBody.maintenanceTypeId,
                    "opTypeId": requestBody.opTypeId,
                  },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('blockPart', requestBody.blockPart)
                expect(res.body.response.category).to.have.property('id', requestBody.categoryId)
                expect(res.body.response).to.have.property('checkLinkParts', requestBody.checkLinkParts)
                expect(res.body.response).to.have.property('code', uniqueCode+2)
                expect(res.body.response).to.have.property('codeClass', requestBody.codeClass)
                expect(res.body.response).to.have.property('codeGroup', requestBody.codeGroup)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('firOpCodeExclusion', requestBody.firOpCodeExclusion)
                expect(res.body.response.fran).to.have.property('id', requestBody.franId)
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.maintenanceType).to.have.property('id', requestBody.maintenanceTypeId)
                expect(res.body.response.opType).to.have.property('id', requestBody.opTypeId)
            })
        })
        it('TC13-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC14-Negative-Verify the response status code is 403 or not, if send the request with invalid Op-Code ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+id+1,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "blockPart": requestBody.blockPart,
                    "categoryId": requestBody.categoryId,
                    "checkLinkParts": requestBody.checkLinkParts,
                    "code": uniqueCode+'3',
                    "codeClass": requestBody.codeClass,
                    "codeGroup": requestBody.codeGroup,
                    "description": requestBody.description,
                    "firOpCodeExclusion": requestBody.firOpCodeExclusion,
                    "franId": requestBody.franId,
                    "id": id,
                    "maintenanceTypeId": requestBody.maintenanceTypeId,
                    "opTypeId": requestBody.opTypeId,
                  },
                  failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC15-NA-Verify by updating a record, new record is creating or not', function(){

        })
        it('TC16-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+id07,
                headers: {
                    "Content-Type": requestBody.contentType,
                },
                body: {
                    "active": requestBody.active,
                    "blockPart": requestBody.blockPart,
                    "categoryId": requestBody.categoryId,
                    "checkLinkParts": requestBody.checkLinkParts,
                    "code": uniqueCode+'a',
                    "codeClass": requestBody.codeClass,
                    "codeGroup": requestBody.codeGroup,
                    "description": requestBody.description,
                    "firOpCodeExclusion": requestBody.firOpCodeExclusion,
                    "franId": requestBody.franId,
                    "id": id07,
                    "maintenanceTypeId": requestBody.maintenanceTypeId,
                    "opTypeId": requestBody.opTypeId,
                  },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})