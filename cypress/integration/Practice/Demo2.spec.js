///<reference types="cypress"/>

describe('DMS-865 Admin_Upload_ORG_ExcelCsv', function(){
    describe('Post Request Upload Organization Work Hours', function(){
        it("XHR Way", () => {
            function form_request(method, url, formData, done) {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url)
                xhr.onload = function () {
                    done(xhr);
                };
                xhr.onerror = function () {
                    done(xhr);
                };
                xhr.send(formData);
            }
    
            const fileName = 'dms-work-hour-upload-template.csv';
            const method = 'POST';
            const url = 'https://dmsuat.simbiotiktech.com/api/dms/admin/v1/organisation-structures/4/upload-csv';
            const fileType = 'dms-work-hour-upload-template.csv';
            const inputContent2 = 'input_content2';
            const expectedAnswer = '{"msg":"X elements from the excel where successfully imported"}';
        
            // Get file from fixtures as binary
            cy.fixture(fileName, 'binary').then( (excelBin) => {
        
                // File in binary format gets converted to blob so it can be sent as Form data
                Cypress.Blob.binaryStringToBlob(excelBin, fileType).then((blob) => {
        
                    // Build up the form
                    const formData = new FormData();
                    formData.set('file', blob, fileName); //adding a file to the form
                    formData.set('input2', inputContent2); //adding a plain input to the form
                
                    
                    // Perform the request
                    cy.form_request(method, url, formData, function (response) {
                        expect(response.status).to.eq(200);
                        expect(expectedAnswer).to.eq(response.response);
                    });
        
                })
    })

        })
    })
})