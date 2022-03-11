describe('Customer Profile', () => {

    before(function () {
        console.log('Enter the before function')
    })

    beforeEach(function(){
        console.log('--Enter the beforeEach function')
    })

    it('Check the state of the button bar', function(){
        window.console.log('Running test of 1st IT Block')
    })
    it('Submit form', function(){
        console.log('Running test of 2nd IT Block')
    })
    afterEach(function(){
        console.log('--Enter the afterEach function')
    })
    after(function(){
        console.log('Enter the after function')
    })

})