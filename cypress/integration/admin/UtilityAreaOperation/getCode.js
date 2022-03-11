///<reference types="cypress"/>

class getCode{

    getCode(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getUpdatedCode(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getCodePut(){
        var Text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getCodePut1(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getUpdatedCodePut(){
        var Text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz123456789";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getCode