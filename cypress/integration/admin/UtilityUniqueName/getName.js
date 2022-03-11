///<reference types="cypress"/>
class getName{

    getName(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 5; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getName;