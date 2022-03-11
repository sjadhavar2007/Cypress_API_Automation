///<reference types="cypress"/>
class getCode{

    getCode(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
             for (var i = 0; i < 4; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getCode;