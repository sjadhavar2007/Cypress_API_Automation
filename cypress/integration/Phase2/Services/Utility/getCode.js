///<reference types="cypress"/>

class getCode{

    getCode(){
        var Text = "";
        var possible = "123456789";
             for (var i = 0; i < 3; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getCode