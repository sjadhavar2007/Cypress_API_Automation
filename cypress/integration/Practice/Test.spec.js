///<reference types="cypress"/>

describe("Upload a File SUITE", () => {
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
        const fileName = "PostMethod.png";
        const method = "POST";
        const url = "https://dmsuat.simbiotiktech.com/api/dms/admin/v1/applications/158/logo";
        const fileType = "image/png";

        cy.fixture(fileName, "binary")
            .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
            .then((blob) => {
                const formData = new FormData();
                formData.append("file", blob, fileName);
                form_request(method, url, formData, function (res) {
                    console.log(res)
                    expect(res.status).to.eq(200);
                });
            });
    })
    // it('TC21-Positive-Verify the Status Code is 200 ok or not', function(){
    //     cy.request({
    //         method: 'GET',
    //         url: 'https://dmsuat.simbiotiktech.com/api/dms/admin/v1/applications/157/logo',
    //     }).then(function(res){
    //         expect(res.status).to.equal(200)
    //     })
    // })
});