///<reference types="cypress"/>
describe('File upload', function(){
    it('TCXX-File upload', function(){
        function form_request(method, url, formData, done){
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.onload = function () {
                done(xhr)
            }
            xhr.onerror = function () {
                done(xhr)
            }
            xhr.send(formData)
        }
        const fileName = "PostMethod.png";
        const method = "POST";
        const url = "https://dmsuat.simbiotiktech.com/api/dms/admin/v1/applications/112/logo";
        const fileType = "image/png";

        cy.fixture(fileName, "binary")
            .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
            .then((blob) => {
                const formData = new FormData();
                formData.append("file", blob, fileName)
                form_request(method, url, formData, function (res) {
                    console.log(res)
                    expect(res.status).to.eq(200)
                })
            })
    })
    
})