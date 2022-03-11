///<reference types="cypress" />

describe('Technician Leave Controller', function(){
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
        cy.fixture('Phase2/Services/TechnicianLeaveController').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Technician-Leave', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician-leave/',
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
                        expect(res.body.response.content[i]).to.have.property('dayOfWeekFrom')
                        expect(res.body.response.content[i]).to.have.property('dayOfWeekTo')
                        expect(res.body.response.content[i]).to.have.property('fromDate')
                        expect(res.body.response.content[i]).to.have.property('fromTime')
                        expect(res.body.response.content[i]).to.have.property('id')
                        expect(res.body.response.content[i]).to.have.property('leaveType')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('technician')
                        expect(res.body.response.content[i]).to.have.property('toTime')
                        expect(res.body.response.content[i]).to.have.property('toDate')
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician-leave/',
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request for verifying "Technician Details Fields" in POST method', function(){
        it('TC04-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician/',
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
                        expect(res.body.response.content[i]).to.have.property('allotted')
                        expect(res.body.response.content[i]).to.have.property('commenceDate')
                        expect(res.body.response.content[i]).to.have.property('createdBy')
                        expect(res.body.response.content[i]).to.have.property('createdById')
                        expect(res.body.response.content[i]).to.have.property('createdDate')
                        expect(res.body.response.content[i]).to.have.property('id')
                        this.contentLinks = res.body.response.content[i].links
                        this.contentLinksLength = this.contentLinks.length
                        for(let j=0 ; j<this.contentLinksLength ; j++)
                        {
                            expect(res.body.response.content[i].links[j]).to.have.property('href')
                            expect(res.body.response.content[i].links[j]).to.have.property('rel')
                        }
                        expect(res.body.response.content[i]).to.have.property('muslim')
                        expect(res.body.response.content[i]).to.have.property('name')
                        expect(res.body.response.content[i]).to.have.property('salaryGroup')
                        expect(res.body.response.content[i]).to.have.property('terminateDate')
                        expect(res.body.response.content[i]).to.have.property('title')
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
        it('TC05-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
    })
    describe('Post Request Technician-Leave', function(){
        it('TC06-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/technician-leave/',
                headers: {
                    'Content-Type': contentType
                },
                body: { 
                    "dayOfWeekFrom": requestBody.dayOfWeekFrom,
                    "dayOfWeekTo": requestBody.dayOfWeekTo,
                    "fromDate": requestBody.fromDate,
                    "fromTime": requestBody.fromTime,
                    "id": 0,
                    "leaveTypeId": requestBody.leaveTypeId,
                    "technicianId": requestBody.technicianId,
                    "toDate": requestBody.toDate,
                    "toTime": requestBody.toTime,
                },
            }).then(function(res){
                expect(res.status).to.eq(201)
                id = res.body.response.id
                expect(res.body.response).to.have.property('dayOfWeekFrom', requestBody.dayOfWeekFrom)
                expect(res.body.response).to.have.property('dayOfWeekTo', requestBody.dayOfWeekTo)
                expect(res.body.response).to.have.property('fromDate', '2022-01-03')
                expect(res.body.response).to.have.property('fromTime', '10:00:00')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.leaveType).to.have.property('id', requestBody.leaveTypeId)
                expect(res.body.response.technician).to.have.property('id', requestBody.technicianId)
                expect(res.body.response).to.have.property('toDate', "2022-01-03")
                expect(res.body.response).to.have.property('toTime', "11:00:00")
            })
        })
        it('TC07-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC08-NA-Verify that the request & response body is matching with Design & URS or not', function(){

        })
        it('TC09-Positive-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/technician-leave/',
                headers: {
                    'Content-Type': contentType
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC10-Positive-Verify that the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'POST',
                url: baseUrl+'/api/dms/services/v1/technician-leave/',
                headers: {
                    'Content-Type': contentType
                },
                body: { 
                    "dayOfWeekFrom": requestBody.dayOfWeekFrom,
                    "dayOfWeekTo": requestBody.dayOfWeekTo,
                    "fromDate": requestBody.fromDate,
                    "fromTime": requestBody.fromTime,
                    "id": 0,
                    "leaveTypeId": requestBody.leaveTypeId,
                    "technicianId": requestBody.technicianId,
                    "toDate": requestBody.toDate,
                    "toTime": requestBody.toTime,
                },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Get Request Technician-Leave_ID', function(){
        it('TC11-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id,
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('dayOfWeekFrom', requestBody.dayOfWeekFrom)
                expect(res.body.response).to.have.property('dayOfWeekTo', requestBody.dayOfWeekTo)
                expect(res.body.response).to.have.property('fromDate', '2022-01-03')
                expect(res.body.response).to.have.property('fromTime', '10:00:00')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.leaveType).to.have.property('id', requestBody.leaveTypeId)
                expect(res.body.response.technician).to.have.property('id', requestBody.technicianId)
                expect(res.body.response).to.have.property('toDate', "2022-01-03")
                expect(res.body.response).to.have.property('toTime', "11:00:00")
            })
        })
        it('TC12-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC13-Negative-Verify the response code, if send the request with Invalid Technician-Leave_ID', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id+'1',
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'GET',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id,
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
    describe('Put Request Technician-Leave_ID', function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: { 
                    "dayOfWeekFrom": requestBody.dayOfWeekFrom,
                    "dayOfWeekTo": requestBody.dayOfWeekTo,
                    "fromDate": requestBody.fromDate,
                    "fromTime": requestBody.fromTime,
                    "id": id,
                    "leaveTypeId": requestBody.leaveTypeId,
                    "technicianId": requestBody.technicianId,
                    "toDate": requestBody.toDate,
                    "toTime": requestBody.toTime,
                },
            }).then(function(res){
                expect(res.status).to.eq(200)
                expect(res.body.response).to.have.property('dayOfWeekFrom', requestBody.dayOfWeekFrom)
                expect(res.body.response).to.have.property('dayOfWeekTo', requestBody.dayOfWeekTo)
                expect(res.body.response).to.have.property('fromDate', '2022-01-03')
                expect(res.body.response).to.have.property('fromTime', '10:00:00')
                expect(res.body.response).to.have.property('id', id)
                expect(res.body.response.leaveType).to.have.property('id', requestBody.leaveTypeId)
                expect(res.body.response.technician).to.have.property('id', requestBody.technicianId)
                expect(res.body.response).to.have.property('toDate', "2022-01-03")
                expect(res.body.response).to.have.property('toTime', "11:00:00")
            })
        })
        it('TC16-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC17-Negative-Verify the response code, if send the request with invalid Technician-Leave_ID', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id+'1',
                headers: {
                    'Content-Type': contentType
                },
                body:{ 
                    "dayOfWeekFrom": requestBody.dayOfWeekFrom,
                    "dayOfWeekTo": requestBody.dayOfWeekTo,
                    "fromDate": requestBody.fromDate,
                    "fromTime": requestBody.fromTime,
                    "id": id,
                    "leaveTypeId": requestBody.leaveTypeId,
                    "technicianId": requestBody.technicianId,
                    "toDate": requestBody.toDate,
                    "toTime": requestBody.toTime,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(403)
            })
        })
        it('TC18-Negative-Verify the Status code if user send the request with Blank request body', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: {

                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.eq(400)
            })
        })
        it('TC19-Positive-Verify the response duration is less than 2 second or not', function(){
            cy.request({
                method: 'PUT',
                url: baseUrl+'/api/dms/services/v1/technician-leave/'+id,
                headers: {
                    'Content-Type': contentType
                },
                body: { 
                    "dayOfWeekFrom": requestBody.dayOfWeekFrom,
                    "dayOfWeekTo": requestBody.dayOfWeekTo,
                    "fromDate": requestBody.fromDate,
                    "fromTime": requestBody.fromTime,
                    "id": id,
                    "leaveTypeId": requestBody.leaveTypeId,
                    "technicianId": requestBody.technicianId,
                    "toDate": requestBody.toDate,
                    "toTime": requestBody.toTime,
                },
            }).then(function(res){
                expect(res.duration).to.be.lessThan(2000)
            })
        })
    })
})