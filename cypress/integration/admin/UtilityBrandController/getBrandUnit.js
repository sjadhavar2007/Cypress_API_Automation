///<reference types="cypress"/>

class getBrandUnit{
    getBrandUnitName(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitId(){
        var Text = "";
        var possible = "1234567890";
             for (var i = 0; i < 3; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitNameDuration(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitIdDuration(){
        var Text = "";
        var possible = "1234567890";
             for (var i = 0; i < 3; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitNameUpdate(){
        var Text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 5; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitIdUpdate(){
        var Text = "";
        var possible = "0987654321";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitNameUpdateDuration(){
        var Text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 5; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getBrandUnitIdUpdateDuration(){
        var Text = "";
        var possible = "0987654321";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getBrandUnit