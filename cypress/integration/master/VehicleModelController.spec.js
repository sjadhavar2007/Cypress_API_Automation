///<reference types="cypress"/>
describe('Vehicle Model Controller', function(){
    var commonUrl;
    var headersInfo;
    var requestBody;
    var modelID;
    var modelID07;            
    before(function(){
        cy.fixture('master/VehicleModel/VehicleModel_url').then(function(data){
            commonUrl=data.URL_VehicleModel
        })
        cy.fixture('master/VehicleModel/VehicleModel_headers').then(function(data){
            headersInfo = data
        })
        cy.fixture('master/VehicleModel/VehicleModel_body').then(function(data){
            requestBody = data
        })
    })
    describe('Get Request Vehicle Model', function(){
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
                        expect(res.body.response.content[i].batteryType).to.have.property('active')
                        expect(res.body.response.content[i].batteryType).to.have.property('category')
                        expect(res.body.response.content[i].batteryType).to.have.property('code')
                        expect(res.body.response.content[i].batteryType).to.have.property('createdBy')
                        expect(res.body.response.content[i].batteryType).to.have.property('createdDate')
                        expect(res.body.response.content[i].batteryType).to.have.property('description')
                        expect(res.body.response.content[i].batteryType).to.have.property('id')
                        expect(res.body.response.content[i].batteryType.links.length).to.equal(0)
                        expect(res.body.response.content[i].batteryType).to.have.property('updateBy')
                        expect(res.body.response.content[i].batteryType).to.have.property('updatedDate')
                        
                        expect(res.body.response.content[i].bodyType).to.have.property('active')
                        expect(res.body.response.content[i].bodyType).to.have.property('category')
                        expect(res.body.response.content[i].bodyType).to.have.property('code')
                        expect(res.body.response.content[i].bodyType).to.have.property('createdBy')
                        expect(res.body.response.content[i].bodyType).to.have.property('createdDate')
                        expect(res.body.response.content[i].bodyType).to.have.property('description')
                        expect(res.body.response.content[i].bodyType).to.have.property('id')
                        expect(res.body.response.content[i].bodyType.links.length).to.equal(0)
                        expect(res.body.response.content[i].bodyType).to.have.property('updateBy')
                        expect(res.body.response.content[i].bodyType).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('brand')
                    expect(res.body.response.content[i]).to.have.property('carburetion')
                    expect(res.body.response.content[i]).to.have.property('code')
                    expect(res.body.response.content[i]).to.have.property('createdBy')
                    expect(res.body.response.content[i]).to.have.property('createdDate')
                    expect(res.body.response.content[i]).to.have.property('description')
                    expect(res.body.response.content[i]).to.have.property('drivePosition')
                    expect(res.body.response.content[i]).to.have.property('engineCapacity')
                    expect(res.body.response.content[i]).to.have.property('engineClass')
                    expect(res.body.response.content[i].bodyType).to.have.property('active')
                        expect(res.body.response.content[i].engineType).to.have.property('category')
                        expect(res.body.response.content[i].engineType).to.have.property('code')
                        expect(res.body.response.content[i].engineType).to.have.property('createdBy')
                        expect(res.body.response.content[i].engineType).to.have.property('createdDate')
                        expect(res.body.response.content[i].engineType).to.have.property('description')
                        expect(res.body.response.content[i].engineType).to.have.property('id')
                        expect(res.body.response.content[i].engineType.links.length).to.equal(0)
                        expect(res.body.response.content[i].engineType).to.have.property('updateBy')
                        expect(res.body.response.content[i].engineType).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('engineType')
                    expect(res.body.response.content[i]).to.have.property('familyCode')
                    expect(res.body.response.content[i]).to.have.property('frR4WheelDrive')
                    expect(res.body.response.content[i].engineType).to.have.property('category')
                        expect(res.body.response.content[i].fuelType).to.have.property('code')
                        expect(res.body.response.content[i].fuelType).to.have.property('createdBy')
                        expect(res.body.response.content[i].fuelType).to.have.property('createdDate')
                        expect(res.body.response.content[i].fuelType).to.have.property('description')
                        expect(res.body.response.content[i].fuelType).to.have.property('id')
                        expect(res.body.response.content[i].fuelType.links.length).to.equal(0)
                        expect(res.body.response.content[i].fuelType).to.have.property('updateBy')
                        expect(res.body.response.content[i].fuelType).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('govDutyCode')
                    expect(res.body.response.content[i]).to.have.property('grossVehicleWtKg')
                    expect(res.body.response.content[i]).to.have.property('id')
                    expect(res.body.response.content[i]).to.have.property('kerbGrossVehichleWtKg')
                    this.links=res.body.response.content[i].links
                    this.linksLength=this.links.length
                    for(let j=0; j<this.linksLength; j++)
                    {
                        expect(res.body.response.content[i].links[j]).to.have.property('href')
                        expect(res.body.response.content[i].links[j]).to.have.property('rel')
                    }
                    expect(res.body.response.content[i]).to.have.property('lotPrefix')
                    expect(res.body.response.content[i]).to.have.property('lotSize')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('code')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('createdBy')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('createdDate')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('description')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('id')
                        expect(res.body.response.content[i].manufactorCode.links.length).to.equal(0)
                        expect(res.body.response.content[i].manufactorCode).to.have.property('updateBy')
                        expect(res.body.response.content[i].manufactorCode).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('multipleTrimColor')
                    expect(res.body.response.content[i]).to.have.property('noOfCylinders')
                    expect(res.body.response.content[i]).to.have.property('noOfDoors')
                    expect(res.body.response.content[i]).to.have.property('noOfSeat')
                    expect(res.body.response.content[i]).to.have.property('noOfSpeed')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('code')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('createdBy')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('createdDate')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('description')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('id')
                        expect(res.body.response.content[i].originalImportStatus.links.length).to.equal(0)
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('updateBy')
                        expect(res.body.response.content[i].originalImportStatus).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('productionMonth')
                        expect(res.body.response.content[i].series).to.have.property('code')
                        expect(res.body.response.content[i].series).to.have.property('createdBy')
                        expect(res.body.response.content[i].series).to.have.property('createdDate')
                        expect(res.body.response.content[i].series).to.have.property('description')
                        expect(res.body.response.content[i].series).to.have.property('id')
                        expect(res.body.response.content[i].series).to.have.property('updateBy')
                        expect(res.body.response.content[i].series).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('salesPrice')
                    expect(res.body.response.content[i]).to.have.property('sequence')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('code')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('createdBy')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('createdDate')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('description')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('id')
                        expect(res.body.response.content[i].salesPlanStatus.links.length).to.equal(0)
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('updateBy')
                        expect(res.body.response.content[i].salesPlanStatus).to.have.property('updatedDate')

                        expect(res.body.response.content[i].transmission).to.have.property('code')
                        expect(res.body.response.content[i].transmission).to.have.property('createdBy')
                        expect(res.body.response.content[i].transmission).to.have.property('createdDate')
                        expect(res.body.response.content[i].transmission).to.have.property('description')
                        expect(res.body.response.content[i].transmission).to.have.property('id')
                        expect(res.body.response.content[i].transmission.links.length).to.equal(0)
                        expect(res.body.response.content[i].transmission).to.have.property('updateBy')
                        expect(res.body.response.content[i].transmission).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('trimColor')
                    expect(res.body.response.content[i]).to.have.property('updateBy')
                    expect(res.body.response.content[i]).to.have.property('updatedDate')
                    expect(res.body.response.content[i]).to.have.property('vehicleDescription')
                    expect(res.body.response.content[i]).to.have.property('vehicleType')    
                    expect(res.body.response.content[i]).to.have.property('wheelBaseCode')
                    expect(res.body.response.content[i]).to.have.property('wheelBaseLengthMm')
                    
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
        it('TC02-NA-Verify that the response body is matching with the DATABASE record or not', function(){

        })
        it('TC03-Positive-Verify that the response duration is less than 1 second or not', function(){
            cy.request({
                method: 'GET',
                url: commonUrl,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Vehicle Mode',function(){
        it('TC04-Positive-Verify the response code & response body as per the swagger or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "active": requestBody.active,
                    "batteryTypeId": requestBody.batteryTypeId,
                    "bodyTypeId": requestBody.bodyTypeId,
                    "carburetion": requestBody.carburetion,
                    "controlMocd": requestBody.controlMocd,
                    "drivePosition": requestBody.drivePosition,
                    "engineCapacity": requestBody.engineCapacity,
                    "engineClass": requestBody.engineClass,
                    "engineTypeId": requestBody.engineTypeId,
                    "familyCode": requestBody.familyCode,
                    "frR4WheelDrive": requestBody.frR4WheelDrive,
                    "fuelTypeId": requestBody.fuelTypeId,
                    "govDutyCode": requestBody.govDutyCode,
                    "grossVehicleWtKg": requestBody.grossVehicleWtKg,
                    "id": requestBody.id,
                    "kerbGrossVehichleWtKg": requestBody.kerbGrossVehichleWtKg,
                    "lotPrefix": requestBody.lotPrefix,
                    "lotSize": requestBody.lotSize,
                    "manufactorCodeId": requestBody.manufactorCode,
                    "model6": requestBody.model6,
                    "multipleTrimColor": requestBody.multipleTrimColor,
                    "noOfCylinders": requestBody.noOfCylinders,
                    "noOfDoors": requestBody.noOfDoors,
                    "noOfSeat": requestBody.noOfSeat,
                    "noOfSpeed": requestBody.noOfSpeed,
                    "originalImportStatusId": requestBody.originalImportStatusId,
                    "productionMonth": requestBody.productionMonth,
                    "pulishedModelCode": requestBody.pulishedModelCode,
                    "salesPlanStatusId": requestBody.salesPlanStatus,
                    "salesPrice": requestBody.salesPrice,
                    "sequence": requestBody.sequence,
                    "seriesId": requestBody.seriesId,
                    "suffixCode": requestBody.suffixCode,
                    "transmissionId": requestBody.transmissionId,
                    "trimColor": requestBody.trimColor,
                    "vehicleDescription": requestBody.vehicleDescription,
                    "vehicleTypeId": requestBody.vehicleTypeId,
                    "wheelBaseCode": requestBody.wheelBaseCode,
                    "wheelBaseLengthMm": requestBody.wheelBaseLengthMm,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                modelID = res.body.response.id
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('batteryType')
                expect(res.body.response).to.have.property('bodyType')
                expect(res.body.response).to.have.property('carburetion', requestBody.carburetion)
            //    expect(res.body.response).to.have.property('controlMocd', requestBody.controlMocd)
                expect(res.body.response).to.have.property('drivePosition', requestBody.drivePosition)
                expect(res.body.response).to.have.property('engineCapacity', requestBody.engineCapacity)
                expect(res.body.response).to.have.property('engineClass', requestBody.engineClass)
                expect(res.body.response).to.have.property('engineType')
                expect(res.body.response).to.have.property('familyCode', requestBody.familyCode)
                expect(res.body.response).to.have.property('frR4WheelDrive', requestBody.frR4WheelDrive)
                expect(res.body.response).to.have.property('fuelType')
                expect(res.body.response).to.have.property('govDutyCode', requestBody.govDutyCode)
                expect(res.body.response).to.have.property('grossVehicleWtKg', requestBody.grossVehicleWtKg)
                expect(res.body.response).to.have.property('id', modelID)
                expect(res.body.response).to.have.property('kerbGrossVehichleWtKg', requestBody.kerbGrossVehichleWtKg)
                expect(res.body.response).to.have.property('lotPrefix', requestBody.lotPrefix)
                expect(res.body.response).to.have.property('lotSize', requestBody.lotSize)
                expect(res.body.response).to.have.property('manufactorCode')
                expect(res.body.response).to.have.property('model6', requestBody.model6)
                expect(res.body.response).to.have.property('multipleTrimColor', requestBody.multipleTrimColor)
                expect(res.body.response).to.have.property('noOfCylinders', requestBody.noOfCylinders)
                expect(res.body.response).to.have.property('noOfDoors', requestBody.noOfDoors)
                expect(res.body.response).to.have.property('noOfSeat', requestBody.noOfSeat)
                expect(res.body.response).to.have.property('noOfSpeed', requestBody.noOfSpeed)
                expect(res.body.response).to.have.property('originalImportStatus')
                expect(res.body.response).to.have.property('productionMonth', requestBody.productionMonth)
                expect(res.body.response).to.have.property('pulishedModelCode', requestBody.pulishedModelCode)
                expect(res.body.response).to.have.property('salesPlanStatus')
                expect(res.body.response).to.have.property('salesPrice', requestBody.salesPrice)
                expect(res.body.response).to.have.property('sequence', requestBody.sequence)
                expect(res.body.response).to.have.property('series')
                expect(res.body.response).to.have.property('suffixCode', requestBody.suffixCode)
                expect(res.body.response).to.have.property('transmission')
                expect(res.body.response).to.have.property('trimColor', requestBody.trimColor)
                expect(res.body.response).to.have.property('vehicleDescription', requestBody.vehicleDescription)
                expect(res.body.response).to.have.property('vehicleType')
                expect(res.body.response).to.have.property('wheelBaseCode', requestBody.wheelBaseCode)
                expect(res.body.response).to.have.property('wheelBaseLengthMm', requestBody.wheelBaseLengthMm)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC05-NA-Verify that after sending a valid request the request is getting created in the DB or not', function(){

        })
        it('TC06-Negative-Verify the status code if user send the blank fields in the request body',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": "",
                    "code": "",
                    "description": "",
                    "active": "",
                    "batteryTypeId": "",
                    "bodyTypeId": "",
                    "carburetion": "",
                    "controlMocd": "",
                    "drivePosition": "",
                    "engineCapacity": "",
                    "engineClass": "",
                    "engineTypeId": "",
                    "familyCode": "",
                    "frR4WheelDrive": "",
                    "fuelTypeId": "",
                    "govDutyCode": "",
                    "grossVehicleWtKg": "",
                    "id": "",
                    "kerbGrossVehichleWtKg": "",
                    "lotPrefix": "",
                    "lotSize": "",
                    "manufactorCodeId": "",
                    "model6": "",
                    "multipleTrimColor": "",
                    "noOfCylinders": "",
                    "noOfDoors": "",
                    "noOfSeat": "",
                    "noOfSpeed": "",
                    "originalImportStatusId": "",
                    "productionMonth": "",
                    "pulishedModelCode": "",
                    "salesPlanStatusId": "",
                    "salesPrice": "",
                    "sequence": "",
                    "seriesId": "",
                    "suffixCode": "",
                    "transmissionId": "",
                    "trimColor": "",
                    "vehicleDescription": "",
                    "vehicleTypeId": "",
                    "wheelBaseCode": "",
                    "wheelBaseLengthMm": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC07-Positive-Verify that the response duration is less than 1 Second or not',function(){
            cy.request({
                method: 'POST',
                url: commonUrl,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": requestBody.brand,
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "active": requestBody.active,
                    "batteryTypeId": requestBody.batteryTypeId,
                    "bodyTypeId": requestBody.bodyTypeId,
                    "carburetion": requestBody.carburetion,
                    "controlMocd": requestBody.controlMocd,
                    "drivePosition": requestBody.drivePosition,
                    "engineCapacity": requestBody.engineCapacity,
                    "engineClass": requestBody.engineClass,
                    "engineTypeId": requestBody.engineTypeId,
                    "familyCode": requestBody.familyCode,
                    "frR4WheelDrive": requestBody.frR4WheelDrive,
                    "fuelTypeId": requestBody.fuelTypeId,
                    "govDutyCode": requestBody.govDutyCode,
                    "grossVehicleWtKg": requestBody.grossVehicleWtKg,
                    "id": requestBody.id,
                    "kerbGrossVehichleWtKg": requestBody.kerbGrossVehichleWtKg,
                    "lotPrefix": requestBody.lotPrefix,
                    "lotSize": requestBody.lotSize,
                    "manufactorCodeId": requestBody.manufactorCode,
                    "model6": requestBody.model6,
                    "multipleTrimColor": requestBody.multipleTrimColor,
                    "noOfCylinders": requestBody.noOfCylinders,
                    "noOfDoors": requestBody.noOfDoors,
                    "noOfSeat": requestBody.noOfSeat,
                    "noOfSpeed": requestBody.noOfSpeed,
                    "originalImportStatusId": requestBody.originalImportStatusId,
                    "productionMonth": requestBody.productionMonth,
                    "pulishedModelCode": requestBody.pulishedModelCode,
                    "salesPlanStatusId": requestBody.salesPlanStatus,
                    "salesPrice": requestBody.salesPrice,
                    "sequence": requestBody.sequence,
                    "seriesId": requestBody.seriesId,
                    "suffixCode": requestBody.suffixCode,
                    "transmissionId": requestBody.transmissionId,
                    "trimColor": requestBody.trimColor,
                    "vehicleDescription": requestBody.vehicleDescription,
                    "vehicleTypeId": requestBody.vehicleTypeId,
                    "wheelBaseCode": requestBody.wheelBaseCode,
                    "wheelBaseLengthMm": requestBody.wheelBaseLengthMm,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
                modelID07 = res.body.response.id
                
            })
        })
    })
    describe('Get Request Vehicle Model ID',function(){
        it('TC08-Positive-Verify the Status code & response body is as per the swagger or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+modelID,
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand)
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('batteryType')
                expect(res.body.response).to.have.property('bodyType')
                expect(res.body.response).to.have.property('carburetion', requestBody.carburetion)
            //    expect(res.body.response).to.have.property('controlMocd', requestBody.controlMocd)
                expect(res.body.response).to.have.property('drivePosition', requestBody.drivePosition)
                expect(res.body.response).to.have.property('engineCapacity', requestBody.engineCapacity)
                expect(res.body.response).to.have.property('engineClass', requestBody.engineClass)
                expect(res.body.response).to.have.property('engineType')
                expect(res.body.response).to.have.property('familyCode', requestBody.familyCode)
                expect(res.body.response).to.have.property('frR4WheelDrive', requestBody.frR4WheelDrive)
                expect(res.body.response).to.have.property('fuelType')
                expect(res.body.response).to.have.property('govDutyCode', requestBody.govDutyCode)
                expect(res.body.response).to.have.property('grossVehicleWtKg', requestBody.grossVehicleWtKg)
                expect(res.body.response).to.have.property('id', modelID)
                expect(res.body.response).to.have.property('kerbGrossVehichleWtKg', requestBody.kerbGrossVehichleWtKg)
                expect(res.body.response).to.have.property('lotPrefix', requestBody.lotPrefix)
                expect(res.body.response).to.have.property('lotSize', requestBody.lotSize)
                expect(res.body.response).to.have.property('manufactorCode')
                expect(res.body.response).to.have.property('model6', requestBody.model6)
                expect(res.body.response).to.have.property('multipleTrimColor', requestBody.multipleTrimColor)
                expect(res.body.response).to.have.property('noOfCylinders', requestBody.noOfCylinders)
                expect(res.body.response).to.have.property('noOfDoors', requestBody.noOfDoors)
                expect(res.body.response).to.have.property('noOfSeat', requestBody.noOfSeat)
                expect(res.body.response).to.have.property('noOfSpeed', requestBody.noOfSpeed)
                expect(res.body.response).to.have.property('originalImportStatus')
                expect(res.body.response).to.have.property('productionMonth', requestBody.productionMonth)
                expect(res.body.response).to.have.property('pulishedModelCode', requestBody.pulishedModelCode)
                expect(res.body.response).to.have.property('salesPlanStatus')
                expect(res.body.response).to.have.property('salesPrice', requestBody.salesPrice)
                expect(res.body.response).to.have.property('sequence', requestBody.sequence)
                expect(res.body.response).to.have.property('series')
                expect(res.body.response).to.have.property('suffixCode', requestBody.suffixCode)
                expect(res.body.response).to.have.property('transmission')
                expect(res.body.response).to.have.property('trimColor', requestBody.trimColor)
                expect(res.body.response).to.have.property('vehicleDescription', requestBody.vehicleDescription)
                expect(res.body.response).to.have.property('vehicleType')
                expect(res.body.response).to.have.property('wheelBaseCode', requestBody.wheelBaseCode)
                expect(res.body.response).to.have.property('wheelBaseLengthMm', requestBody.wheelBaseLengthMm)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC09-NA-Verify that the response is matching with DB for Particular ID or not', function(){

        })
        it('TC10-Negative-Verify the status code if user send request with invalid Model ID',function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+modelID+1,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC11-Positive-Verify tha response duration is less than 1 second or not',function(){
            cy.request({
                method: 'GET',
                url: commonUrl+'/'+modelID07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Put Request Vehicle Model ID', function(){
        it('TC12-Positive-Verify the response code & response body as per the swagger or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+modelID,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": requestBody.brand+'New',
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "active": requestBody.active,
                    "batteryTypeId": requestBody.batteryTypeId,
                    "bodyTypeId": requestBody.bodyTypeId,
                    "carburetion": requestBody.carburetion,
                    "controlMocd": requestBody.controlMocd,
                    "drivePosition": requestBody.drivePosition,
                    "engineCapacity": requestBody.engineCapacity,
                    "engineClass": requestBody.engineClass,
                    "engineTypeId": requestBody.engineTypeId,
                    "familyCode": requestBody.familyCode,
                    "frR4WheelDrive": requestBody.frR4WheelDrive,
                    "fuelTypeId": requestBody.fuelTypeId,
                    "govDutyCode": requestBody.govDutyCode,
                    "grossVehicleWtKg": requestBody.grossVehicleWtKg,
                    "id": modelID,
                    "kerbGrossVehichleWtKg": requestBody.kerbGrossVehichleWtKg,
                    "lotPrefix": requestBody.lotPrefix,
                    "lotSize": requestBody.lotSize,
                    "manufactorCodeId": requestBody.manufactorCode,
                    "model6": requestBody.model6,
                    "multipleTrimColor": requestBody.multipleTrimColor,
                    "noOfCylinders": requestBody.noOfCylinders,
                    "noOfDoors": requestBody.noOfDoors,
                    "noOfSeat": requestBody.noOfSeat,
                    "noOfSpeed": requestBody.noOfSpeed,
                    "originalImportStatusId": requestBody.originalImportStatusId,
                    "productionMonth": requestBody.productionMonth,
                    "pulishedModelCode": requestBody.pulishedModelCode,
                    "salesPlanStatusId": requestBody.salesPlanStatus,
                    "salesPrice": requestBody.salesPrice,
                    "sequence": requestBody.sequence,
                    "seriesId": requestBody.seriesId,
                    "suffixCode": requestBody.suffixCode,
                    "transmissionId": requestBody.transmissionId,
                    "trimColor": requestBody.trimColor,
                    "vehicleDescription": requestBody.vehicleDescription,
                    "vehicleTypeId": requestBody.vehicleTypeId,
                    "wheelBaseCode": requestBody.wheelBaseCode,
                    "wheelBaseLengthMm": requestBody.wheelBaseLengthMm,
                }
            }).then(function(res){
                expect(res.status).to.equal(200)
                expect(res.body.response).to.have.property('active', requestBody.active)
                expect(res.body.response).to.have.property('brand', requestBody.brand+'New')
                expect(res.body.response).to.have.property('code', requestBody.code)
                expect(res.body.response).to.have.property('description', requestBody.description)
                expect(res.body.response).to.have.property('batteryType')
                expect(res.body.response).to.have.property('bodyType')
                expect(res.body.response).to.have.property('carburetion', requestBody.carburetion)
            //    expect(res.body.response).to.have.property('controlMocd', requestBody.controlMocd)
                expect(res.body.response).to.have.property('drivePosition', requestBody.drivePosition)
                expect(res.body.response).to.have.property('engineCapacity', requestBody.engineCapacity)
                expect(res.body.response).to.have.property('engineClass', requestBody.engineClass)
                expect(res.body.response).to.have.property('engineType')
                expect(res.body.response).to.have.property('familyCode', requestBody.familyCode)
                expect(res.body.response).to.have.property('frR4WheelDrive', requestBody.frR4WheelDrive)
                expect(res.body.response).to.have.property('fuelType')
                expect(res.body.response).to.have.property('govDutyCode', requestBody.govDutyCode)
                expect(res.body.response).to.have.property('grossVehicleWtKg', requestBody.grossVehicleWtKg)
                expect(res.body.response).to.have.property('id', modelID)
                expect(res.body.response).to.have.property('kerbGrossVehichleWtKg', requestBody.kerbGrossVehichleWtKg)
                expect(res.body.response).to.have.property('lotPrefix', requestBody.lotPrefix)
                expect(res.body.response).to.have.property('lotSize', requestBody.lotSize)
                expect(res.body.response).to.have.property('manufactorCode')
                expect(res.body.response).to.have.property('model6', requestBody.model6)
                expect(res.body.response).to.have.property('multipleTrimColor', requestBody.multipleTrimColor)
                expect(res.body.response).to.have.property('noOfCylinders', requestBody.noOfCylinders)
                expect(res.body.response).to.have.property('noOfDoors', requestBody.noOfDoors)
                expect(res.body.response).to.have.property('noOfSeat', requestBody.noOfSeat)
                expect(res.body.response).to.have.property('noOfSpeed', requestBody.noOfSpeed)
                expect(res.body.response).to.have.property('originalImportStatus')
                expect(res.body.response).to.have.property('productionMonth', requestBody.productionMonth)
                expect(res.body.response).to.have.property('pulishedModelCode', requestBody.pulishedModelCode)
                expect(res.body.response).to.have.property('salesPlanStatus')
                expect(res.body.response).to.have.property('salesPrice', requestBody.salesPrice)
                expect(res.body.response).to.have.property('sequence', requestBody.sequence)
                expect(res.body.response).to.have.property('series')
                expect(res.body.response).to.have.property('suffixCode', requestBody.suffixCode)
                expect(res.body.response).to.have.property('transmission')
                expect(res.body.response).to.have.property('trimColor', requestBody.trimColor)
                expect(res.body.response).to.have.property('vehicleDescription', requestBody.vehicleDescription)
                expect(res.body.response).to.have.property('vehicleType')
                expect(res.body.response).to.have.property('wheelBaseCode', requestBody.wheelBaseCode)
                expect(res.body.response).to.have.property('wheelBaseLengthMm', requestBody.wheelBaseLengthMm)
                this.links=res.body.response.links
                this.linksLength=this.links.length
                for(let m=0; m<this.linksLength; m++)
                {
                    expect(res.body.response.links[m]).to.have.property('href')
                    expect(res.body.response.links[m]).to.have.property('rel')
                }
            })
        })
        it('TC13-NA-Verify the response body is matching with DB record for the particular ID or not', function(){

        })
        it('TC14-Negative-Verify the response code & response body as per the swagger or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+modelID+1,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": requestBody.brand+'New',
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "active": requestBody.active,
                    "batteryTypeId": requestBody.batteryTypeId,
                    "bodyTypeId": requestBody.bodyTypeId,
                    "carburetion": requestBody.carburetion,
                    "controlMocd": requestBody.controlMocd,
                    "drivePosition": requestBody.drivePosition,
                    "engineCapacity": requestBody.engineCapacity,
                    "engineClass": requestBody.engineClass,
                    "engineTypeId": requestBody.engineTypeId,
                    "familyCode": requestBody.familyCode,
                    "frR4WheelDrive": requestBody.frR4WheelDrive,
                    "fuelTypeId": requestBody.fuelTypeId,
                    "govDutyCode": requestBody.govDutyCode,
                    "grossVehicleWtKg": requestBody.grossVehicleWtKg,
                    "id": modelID,
                    "kerbGrossVehichleWtKg": requestBody.kerbGrossVehichleWtKg,
                    "lotPrefix": requestBody.lotPrefix,
                    "lotSize": requestBody.lotSize,
                    "manufactorCodeId": requestBody.manufactorCode,
                    "model6": requestBody.model6,
                    "multipleTrimColor": requestBody.multipleTrimColor,
                    "noOfCylinders": requestBody.noOfCylinders,
                    "noOfDoors": requestBody.noOfDoors,
                    "noOfSeat": requestBody.noOfSeat,
                    "noOfSpeed": requestBody.noOfSpeed,
                    "originalImportStatusId": requestBody.originalImportStatusId,
                    "productionMonth": requestBody.productionMonth,
                    "pulishedModelCode": requestBody.pulishedModelCode,
                    "salesPlanStatusId": requestBody.salesPlanStatus,
                    "salesPrice": requestBody.salesPrice,
                    "sequence": requestBody.sequence,
                    "seriesId": requestBody.seriesId,
                    "suffixCode": requestBody.suffixCode,
                    "transmissionId": requestBody.transmissionId,
                    "trimColor": requestBody.trimColor,
                    "vehicleDescription": requestBody.vehicleDescription,
                    "vehicleTypeId": requestBody.vehicleTypeId,
                    "wheelBaseCode": requestBody.wheelBaseCode,
                    "wheelBaseLengthMm": requestBody.wheelBaseLengthMm,
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
                
            })
        })
        it('TC15-Negative-Verify the status code if user send the blank fields in the request body',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+modelID,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": "",
                    "code": "",
                    "description": "",
                    "active": "",
                    "batteryTypeId": "",
                    "bodyTypeId": "",
                    "carburetion": "",
                    "controlMocd": "",
                    "drivePosition": "",
                    "engineCapacity": "",
                    "engineClass": "",
                    "engineTypeId": "",
                    "familyCode": "",
                    "frR4WheelDrive": "",
                    "fuelTypeId": "",
                    "govDutyCode": "",
                    "grossVehicleWtKg": "",
                    "id": "",
                    "kerbGrossVehichleWtKg": "",
                    "lotPrefix": "",
                    "lotSize": "",
                    "manufactorCodeId": "",
                    "model6": "",
                    "multipleTrimColor": "",
                    "noOfCylinders": "",
                    "noOfDoors": "",
                    "noOfSeat": "",
                    "noOfSpeed": "",
                    "originalImportStatusId": "",
                    "productionMonth": "",
                    "pulishedModelCode": "",
                    "salesPlanStatusId": "",
                    "salesPrice": "",
                    "sequence": "",
                    "seriesId": "",
                    "suffixCode": "",
                    "transmissionId": "",
                    "trimColor": "",
                    "vehicleDescription": "",
                    "vehicleTypeId": "",
                    "wheelBaseCode": "",
                    "wheelBaseLengthMm": "",
                },
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(400)
            })
        })
        it('TC16-Positive-Verify the response duration is less than 1 second or not',function(){
            cy.request({
                method: 'PUT',
                url: commonUrl+'/'+modelID07,
                headers: {
                    "Content-Type": headersInfo.ContentType
                },
                body: {
                    "brand": requestBody.brand+'New',
                    "code": requestBody.code,
                    "description": requestBody.description,
                    "active": requestBody.active,
                    "batteryTypeId": requestBody.batteryTypeId,
                    "bodyTypeId": requestBody.bodyTypeId,
                    "carburetion": requestBody.carburetion,
                    "controlMocd": requestBody.controlMocd,
                    "drivePosition": requestBody.drivePosition,
                    "engineCapacity": requestBody.engineCapacity,
                    "engineClass": requestBody.engineClass,
                    "engineTypeId": requestBody.engineTypeId,
                    "familyCode": requestBody.familyCode,
                    "frR4WheelDrive": requestBody.frR4WheelDrive,
                    "fuelTypeId": requestBody.fuelTypeId,
                    "govDutyCode": requestBody.govDutyCode,
                    "grossVehicleWtKg": requestBody.grossVehicleWtKg,
                    "id": modelID,
                    "kerbGrossVehichleWtKg": requestBody.kerbGrossVehichleWtKg,
                    "lotPrefix": requestBody.lotPrefix,
                    "lotSize": requestBody.lotSize,
                    "manufactorCodeId": requestBody.manufactorCode,
                    "model6": requestBody.model6,
                    "multipleTrimColor": requestBody.multipleTrimColor,
                    "noOfCylinders": requestBody.noOfCylinders,
                    "noOfDoors": requestBody.noOfDoors,
                    "noOfSeat": requestBody.noOfSeat,
                    "noOfSpeed": requestBody.noOfSpeed,
                    "originalImportStatusId": requestBody.originalImportStatusId,
                    "productionMonth": requestBody.productionMonth,
                    "pulishedModelCode": requestBody.pulishedModelCode,
                    "salesPlanStatusId": requestBody.salesPlanStatus,
                    "salesPrice": requestBody.salesPrice,
                    "sequence": requestBody.sequence,
                    "seriesId": requestBody.seriesId,
                    "suffixCode": requestBody.suffixCode,
                    "transmissionId": requestBody.transmissionId,
                    "trimColor": requestBody.trimColor,
                    "vehicleDescription": requestBody.vehicleDescription,
                    "vehicleTypeId": requestBody.vehicleTypeId,
                    "wheelBaseCode": requestBody.wheelBaseCode,
                    "wheelBaseLengthMm": requestBody.wheelBaseLengthMm,
                }
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Delete Request Vehicle Model ID',function(){
        it('TC17-Positive-Verify the response body & status is as per the swagger or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+modelID,
            }).then(function(res){
                expect(res.status).to.equal(200)
            })
        })
        it('TC18-Negative-Verify the status code if user send the same request multiple time for the same ID',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+modelID,
                failOnStatusCode: false,
            }).then(function(res){
                expect(res.status).to.equal(403)
            })
        })
        it('TC19-NA-Verify that the record is getting removed from the DB for the particular ID or not', function(){

        })
        it('TC20-Positive-Verify the response code & response body as per the swagger or not',function(){
            cy.request({
                method: 'DELETE',
                url: commonUrl+'/'+modelID07,
            }).then(function(res){
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
})   