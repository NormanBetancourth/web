var ActiveDirectory = require('activedirectory');
const express = require('express');
const path = require('path');
const bp = require('body-parser')
//https://www.npmjs.com/package/activedirectory
//Norman Betancourtt
//Rebeca Servellon
//Maria Cruz

const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))





const a = 'CN=Norman Betancourtt,CN=Users,DC=home-proyect-one,DC=eastus,DC=cloudapp,DC=azure,DC=com';
const b = 'ldap://10.1.0.4:389/CN=Norman%20Betancourtt,CN=Users,DC=home-proyect-one,DC=eastus,DC=cloudapp,DC=azure,DC=com';
const mail = 'norman@home-proyect-one.eastus.cloudapp.azure.com';
const base = 'DC=home-proyect-one,DC=eastus,DC=cloudapp,DC=azure,DC=com';
//=======================================================================================
// Initialize
var config = {
    url: 'ldap://20.70.136.202:389',
    baseDN: base
};
var ad = new ActiveDirectory(config);

function login(){
    var username = $("#id-usr")[0].value;
    var password = $("#pwd-usr")[0].value;
    console.log(username);
    console.log(password);

    // Authenticate
    ad.authenticate(username, password, function(err, auth) {
        if (err) {
            console.log('ERROR: '+JSON.stringify(err));
            return;
        }
        if (auth) {
            console.log('Authenticated!');
        }
        else {
                console.log('Authentication failed!');
        }
});

}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
    
});
app.post('/login', function(req, res){
    
    
    let username = req.body.username;
	let password = req.body.password;
   try {
        ad.authenticate(username, password, function(err, auth) {
            if (auth) {
                res.send('Authenticated!');
            }
            else {
                    res.send('Authentication failed!');
            }
            });
   } catch (error) {
        console.log('ERROR: '+JSON.stringify(err));
        res.send('Authentication failed!');
   }
    

    

   
    
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
