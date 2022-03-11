describe('DMS_1205_Setup_Digital_Content(Digital Content Controller)', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var digitalContentID1;
    var digitalContentID2;
    before(function(){
        cy.fixture('master/DigitalContent/DigitalContent_url').then(function(data){
            commonUrl=data.URL_DigitalContentController_uat
        })
        cy.fixture('master/DigitalContent/DigitalContent_headers').then(function(data){
            headersInfo = data.ContentType
        })
        cy.fixture('master/DigitalContent/DigitalContent_body').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Setup Digital Content', function(){
        it('TC01-Positive-Verify the status CODE & Response body as per the swagger', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.status).to.equal(200)
                this.content=res.body.response.content
                this.contentLength=this.content.length
                for(let i=0; i<this.contentLength; i++)
                {
                    expect(res.body.response.content[i]).to.have.property('active')
                    expect(res.body.response.content[i]).to.have.property('brand')
                    expect(res.body.response.content[i]).to.have.property('code')
                    this.contentSpecificTypeList=res.body.response.content[i].contentSpecificTypeList
                    this.contentSpecificTypeListLength=this.contentSpecificTypeList.length
                    if (this.contentSpecificTypeListLength<=0) {
                        expect(res.body.response.content[i].contentSpecificTypeList.length).to.equal(0)                        
                    } else {
                        for(let j=0; j<this.contentSpecificTypeListLength; j++)
                        {
                            expect(res.body.response.content[i].contentSpecificTypeList[j].dataType).to.have.property('active')
                            expect(res.body.response.content[i].contentSpecificTypeList[j].dataType).to.have.property('category')
                            expect(res.body.response.content[i].contentSpecificTypeList[j].dataType).to.have.property('code')
                            expect(res.body.response.content[i].contentSpecificTypeList[j].dataType).to.have.property('description')
                            expect(res.body.response.content[i].contentSpecificTypeList[j].dataType).to.have.property('id')
                            this.links=res.body.response.content[i].contentSpecificTypeList[j].dataType.links
                            this.linksLength=this.links.length
                            if (this.linksLength<=0) {
                                expect(res.body.response.content[i].contentSpecificTypeList[j].dataType.links.length).to.equal(0)                               
                            } else {
                                for(let k=0; k<this.linksLength; k++)
                                {
                                    expect(res.body.response.content[i].links[l]).to.have.property('href')
                                    expect(res.body.response.content[i].links[l]).to.have.property('rel')
                                }
                            }
                            expect(res.body.response.content[i].contentSpecificTypeList[j]).to.have.property('fileName')
                            expect(res.body.response.content[i].contentSpecificTypeList[j]).to.have.property('id')
                            expect(res.body.response.content[i].contentSpecificTypeList[j]).to.have.property('links')
                            this.links=res.body.response.content[i].contentSpecificTypeList[j].links
                            this.linksLength=this.links.length
                            if (this.linksLength<=0) {
                                expect(res.body.response.content[i].contentSpecificTypeList[j].links.length).to.equal(0)                               
                            } else {
                                for(let p=0; p<this.linksLength; p++)
                                {
                                    expect(res.body.response.content[i].links[p]).to.have.property('href')
                                    expect(res.body.response.content[i].links[p]).to.have.property('rel')
                                }
                            }
                            expect(res.body.response.content[i].contentSpecificTypeList[j]).to.have.property('path')
                            

                        }
                    }
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('effectiveFromDate')
                    expect(res.body.response.content[i]).to.have.property('effectiveToDate')
                    expect(res.body.response.content[i]).to.have.property('id')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let l=0; l<this.linksLength; l++)
                    {
                        expect(res.body.response.content[i].links[l]).to.have.property('href')
                        expect(res.body.response.content[i].links[l]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('series')
                }
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
                expect(res.body.response.page).to.have.property('number')
                expect(res.body.response.page).to.have.property('size')
                expect(res.body.response.page).to.have.property('totalElements')
                expect(res.body.response.page).to.have.property('totalPages')
            })
        })
        it('TC02-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC03-NA-Verify the response keys are matching with UI or not', function(){

        })
        it('TC04-Positive-Verify the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Setup Digital Content',function(){
        it('TC05-Positive-Verify the status CODE & Response body as per the swagger or not',function(){
            cy.request({
                method : 'POST',
                url : commonUrl,
                headers : {
                    "Content-Type" : headersInfo,
                },
                body : {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "series": requestBody.series                
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.status).to.equal(201)
                digitalContentID1 = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('id', digitalContentID1)
                expect(res.body.response).to.have.property('series', requestBody.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC06-NA-Verify the response is matching with DB or not',function(){
           
        })
        it('TC07-NA-Verify the response keys are matching with UI or not',function(){

        })
        it('TC08-Negative-Verify the status code, if send the request with blank fields',function(){
            cy.request({
                method : 'POST',
                url : commonUrl,
                headers : {
                    "Content-Type" : headersInfo
                },
                body : {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": "",
                    "effectiveFromDate": "",
                    "effectiveToDate": "",
                    "id": "",
                    "series": ""                
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC09-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method : 'POST',
                url : commonUrl,
                headers : {
                    "Content-Type" : headersInfo
                },
                body : {
                    "active": requestBody.active,
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "effectiveFromDate": requestBody.effectiveFromDate,
                    "effectiveToDate": requestBody.effectiveToDate,
                    "id": requestBody.id,
                    "series": requestBody.series                
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                digitalContentID2 = res.body.response.id
            })
        })
    })
    describe('Get Request Setup Digital Content',function(){
        it('TC10-Positive-Verify the status CODE & Response body as per the swagger',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + digitalContentID1
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDate)
                expect(res.body.response).to.have.property('id', digitalContentID1)
                expect(res.body.response).to.have.property('series', requestBody.series)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC11-NA-Verify the response is matching with DB or not',function(){
            
        })
        it('TC12-NA-Verify the response keys are matching with UI or not',function(){

        })
        it('TC13-Negative-Verify the status code, if try to send the request with an invalid ID',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + digitalContentID1+2,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC14-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl + '/' + digitalContentID1
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Setup Digital Content',function(){
        it('TC15-Positive-Verify the status CODE & Response body as per the swagger',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + digitalContentID1,
                headers: {
                    "Content-Type": headersInfo
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate,
                    "effectiveFromDate": requestBody.effectiveFromDateUpdate,
                    "effectiveToDate": requestBody.effectiveToDateUpdate,
                    "id": digitalContentID1,
                    "series": requestBody.seriesUpdate,
                },
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.activeUpdate)
                expect(res.body.response).to.have.property('brand', requestBody.brandUpdate)
                expect(res.body.response).to.have.property('code', requestBody.codeUpdate)
                expect(res.body.response).to.have.property('description', requestBody.descriptionUpdate)
                expect(res.body.response).to.have.property('effectiveFromDate', requestBody.effectiveFromDateUpdate)
                expect(res.body.response).to.have.property('effectiveToDate', requestBody.effectiveToDateUpdate)
                expect(res.body.response).to.have.property('id', digitalContentID1)
                expect(res.body.response).to.have.property('series', requestBody.seriesUpdate)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC16-NA-Verify the response is matching with DB or not', function(){

        })
        it('TC17-NA-Verify the response keys are matching with UI or not', function(){
            
        })
        it('TC18-Negative-Verify the response Code, if try to send the request with invalid ID',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + digitalContentID1+12,
                headers: {
                    "Content-Type": headersInfo
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate,
                    "effectiveFromDate": requestBody.effectiveFromDateUpdate,
                    "effectiveToDate": requestBody.effectiveToDateUpdate,
                    "id": digitalContentID2,
                    "series": requestBody.seriesUpdate,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-Negative-Verify the response Code, if try to send the request with blank fields',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + digitalContentID1,
                headers: {
                    "Content-Type": headersInfo
                },
                body: {
                    "active": "",
                    "brand": "",
                    "code": "",
                    "description": "",
                    "effectiveFromDate": "",
                    "effectiveToDate": "",
                    "id": "",
                    "series": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC20-Positive-Verify the response duration is less than 1 second Or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl + '/' + digitalContentID2,
                headers: {
                    "Content-Type": headersInfo
                },
                body: {
                    "active": requestBody.activeUpdate,
                    "brand": requestBody.brandUpdate,
                    "code": requestBody.codeUpdate,
                    "description": requestBody.descriptionUpdate,
                    "effectiveFromDate": requestBody.effectiveFromDateUpdate,
                    "effectiveToDate": requestBody.effectiveToDateUpdate,
                    "id": digitalContentID2,
                    "series": requestBody.seriesUpdate,
                },
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Setup Digital Content',function(){
        it('TC21-Positive-Verify the status CODE & Response body as per the swagger',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + digitalContentID1,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC22-NA-Verify the response is matching with DB or not',function(){
            
        })
        it('TC23-Negative-Verify  the status code, if send the same request twice',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + digitalContentID1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC24-Positive-Verify the rersponse duration is less than 1 Second or Not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl + '/' + digitalContentID2,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})