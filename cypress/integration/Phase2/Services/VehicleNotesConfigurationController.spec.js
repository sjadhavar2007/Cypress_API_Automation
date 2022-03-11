///<reference types="cypress" />

describe('Vehicle Notes Configuration Controller', function(){
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
        cy.fixture('Phase2/Services/VehicleNotesConfigurationController').then(function(data){
            requestBody = data
        })
    })
    describe('Get request Find_all_Vehicle_notes_configuration_Controller', function(){
        it('TC01-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/vehicle-notes-configuration/'
            }).then(function(res){
                expect(res.status).to.equal(200)
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
                        expect(res.body.response.content[i]).to.have.property('customerVehicle')
                        expect(res.body.response.content[i]).to.have.property('display')
                        expect(res.body.response.content[i]).to.have.property('division')
                        expect(res.body.response.content[i]).to.have.property('editFlag')
                        expect(res.body.response.content[i]).to.have.property('effectiveFrom')
                        expect(res.body.response.content[i]).to.have.property('effectiveTo')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        
                        expect(res.body.response.content[i]).to.have.property('priority')
                        expect(res.body.response.content[i]).to.have.property('type')
                        expect(res.body.response.content[i]).to.have.property('updateBy')
                        expect(res.body.response.content[i]).to.have.property('updateById')
                        expect(res.body.response.content[i]).to.have.property('updatedDate')
                        expect(res.body.response.content[i]).to.have.property('vehicleNotes')
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
        it('TC03-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/vehicle-notes-configuration/'
            }).then(function(res){
                expect(res.duration).to.lessThan(2000)
            })
        })
    })
    describe('Get request For Verify the Division drop down list', function(){
        it('TC04-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "NOTES_DIVISION",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'NOTES_DIVISION')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC05-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Get Request To verify the Type dropdown List', function(){
        it('TC06-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "NOTES_TYPE",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'NOTES_TYPE')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC07-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Get Request To verify the Type dropdown List', function(){
        it('TC08-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "NOTES_PRIORITY",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'NOTES_PRIORITY')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC09-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Get Request To verify the Type dropdown List', function(){
        it('TC10-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "NOTES_DISPLAY",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'NOTES_DISPLAY')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC11-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Get Request To verify the Type dropdown List', function(){
        it('TC12-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/master/v1/master-data',
                qs: {
                    "category": "NOTES_EDIT_FLAG",
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content = res.body.response.content
                this.contentLength = this.content.length
                if (this.contentLength < 0)
                {
                    expect(res.body.response.content.length).to.equal(0)
                }
                else
                {
                    for( let i=0 ; i<this.contentLength ; i++ )
                    {
                        expect(res.body.response.content[i]).to.have.property('category', 'NOTES_EDIT_FLAG')
                        expect(res.body.response.content[i]).to.have.property('description')
                    }
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB or not', function(){

        })
    })
    describe('Post request Create_Vehicle_notes_configuration_Controller', function(){
        it('TC14-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": requestBody.id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                }).then(function(res){
                    expect(res.status).to.equal(201)
                    id = res.body.response.id
                    expect(res.body.response.customerVehicle).to.have.property('id', requestBody.customerVehicleId)
                    expect(res.body.response.display).to.have.property('id', requestBody.displayId)
                    expect(res.body.response.division).to.have.property('id', requestBody.divisionId)
                    expect(res.body.response.editFlag).to.have.property('id', requestBody.editFlagId)
                    expect(res.body.response).to.have.property('effectiveFrom')
                    expect(res.body.response).to.have.property('effectiveTo')
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.priority).to.have.property('id', requestBody.priorityId)
                    expect(res.body.response.type).to.have.property('id', requestBody.typeId)
                    expect(res.body.response).to.have.property('vehicleNotes', requestBody.vehicleNotes)
            })
        })
        it('TC15-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC16-NA-Verify the response & request Body fields are matching with Design & Requirement document or not', function(){

        })
        it('TC17-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": requestBody.id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get request Find_by_ID_Vehicle_notes_configuration_Controller', function(){
        it('TC18-Positive-Verify the status code for response body is 200 and response data parameters', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response.customerVehicle).to.have.property('id', requestBody.customerVehicleId)
                expect(res.body.response.display).to.have.property('id', requestBody.displayId)
                expect(res.body.response.division).to.have.property('id', requestBody.divisionId)
                expect(res.body.response.editFlag).to.have.property('id', requestBody.editFlagId)
                expect(res.body.response).to.have.property('effectiveFrom')
                expect(res.body.response).to.have.property('effectiveTo')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.priority).to.have.property('id', requestBody.priorityId)
                expect(res.body.response.type).to.have.property('id', requestBody.typeId)
                expect(res.body.response).to.have.property('vehicleNotes', requestBody.vehicleNotes)
            })
        })
        it('TC19-NA-Verify the response body is matching with DB or not', function(){

        })
        it('TC20-Negative-Verify the response status code is 403 or not, if send the request with invalid Vehicle notes configuration ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' +id + '1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC21-Positive-Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put Request Update_Vehicle_notes_configuration_Controller', function(){
        it('TC22-Positive-Verify the response status code & response body parameters', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                }).then(function(res){
                    expect(res.status).to.equal(200)
                    expect(res.body.response.customerVehicle).to.have.property('id', requestBody.customerVehicleId)
                    expect(res.body.response.display).to.have.property('id', requestBody.displayId)
                    expect(res.body.response.division).to.have.property('id', requestBody.divisionId)
                    expect(res.body.response.editFlag).to.have.property('id', requestBody.editFlagId)
                    expect(res.body.response).to.have.property('effectiveFrom')
                    expect(res.body.response).to.have.property('effectiveTo')
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.priority).to.have.property('id', requestBody.priorityId)
                    expect(res.body.response.type).to.have.property('id', requestBody.typeId)
                    expect(res.body.response).to.have.property('vehicleNotes', requestBody.vehicleNotes)
            })
        })
        it('TC23-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC24-Negative-Verify the response status code is 403 or not, if send the request with invalid Vehicle notes configuration ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id + '1',
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC25-NA-Verify the response & request Body fields are matching with Design & Requirement document or not', function(){

        })
        it('TC26-Positive-Verify by updating a record, new record is creating or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                }).then(function(res){
                    expect(res.status).to.equal(200)
                    expect(res.body.response.customerVehicle).to.have.property('id', requestBody.customerVehicleId)
                    expect(res.body.response.display).to.have.property('id', requestBody.displayId)
                    expect(res.body.response.division).to.have.property('id', requestBody.divisionId)
                    expect(res.body.response.editFlag).to.have.property('id', requestBody.editFlagId)
                    expect(res.body.response).to.have.property('effectiveFrom')
                    expect(res.body.response).to.have.property('effectiveTo')
                    expect(res.body.response).to.have.property('id', id)
                    expect(res.body.response.priority).to.have.property('id', requestBody.priorityId)
                    expect(res.body.response.type).to.have.property('id', requestBody.typeId)
                    expect(res.body.response).to.have.property('vehicleNotes', requestBody.vehicleNotes)
            })
        })
        it('TC27-Positive- Verify the response duration is less than 2 Seconds or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl + '/api/dms/services/v1/vehicle-notes-configuration/' + id,
                headers: {
                    'Content-Type': contentType,
                },
                body: {
                    "customerVehicleId": requestBody.customerVehicleId,
                    "displayId": requestBody.displayId,
                    "divisionId": requestBody.divisionId,
                    "editFlagId": requestBody.editFlagId,
                    "effectiveFrom": requestBody.effectiveFrom,
                    "effectiveTo": requestBody.effectiveTo,
                    "id": id,
                    "priorityId": requestBody.priorityId,
                    "typeId": requestBody.typeId,
                    "vehicleNotes": requestBody.vehicleNotes,
                },
                }).then(function(res){
                    expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})