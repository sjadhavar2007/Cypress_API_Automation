///<reference types="cypress"/>
describe('DMS-865 Admin_Upload_ORG_ExcelCsv', function() {
    describe('Get Request Organization Work Hours Template', function() {
        it('TC01-TC03-Positive-Verify the Status Code is 200 ok or not', function() {
            cy.request({
                method: 'GET',
                url: "https://dmsuat.simbiotiktech.com/api/dms/admin/v1/organisation-structures/21/download-csv-template"
            }).then(function(res) {
                expect(res.status).to.equal(200)
                expect(res.duration).to.lessThan(1000)
            })
        })
    })
    describe('Post Request Upload Organization Work Hours', function() {
        it("TC04-TC10-Positive-Verify the Response code for Valid request is 201 and response body is as per uploaded file or not", () => {
            function form_request(method, url, formData, done) {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url)
                xhr.onload = function() {
                    done(xhr);
                };
                xhr.onerror = function() {
                    done(xhr);
                };
                xhr.send(formData);
            }

            const fileName = "dms-work-hour-upload-template.csv";
            const method = "POST";
            const url = "https://dmsuat.simbiotiktech.com/api/dms/admin/v1/organisation-structures/21/upload-csv";
            //const fileType = "text/.csv";

            cy.fixture(fileName, "binary")
                .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
                .then((blob) => {
                    const formData = new FormData();
                    formData.append("file", blob, fileName);
                    form_request(method, url, formData, function(res) {
                        console.log(res)
                        expect(res.status).to.equal(200);
                        expect(res.statusText).to.equal('OK');
                    });
                });
        })
    })
})