///<reference types="cypress"/>

class getOrgId{

    getOrgId(){
        var Text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
             for (var i = 0; i < 2; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
    getUpdateOrgId(){
        var Text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
             for (var i = 0; i < 3; i++)
                Text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return Text;
    }
}
export default getOrgId