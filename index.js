const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const session = require("express-session");
var bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public/html'));
app.use('/', express.static(__dirname + '/public/css'));
app.use('/', express.static(__dirname + '/public/icone'));
app.use('/', express.static(__dirname + '/public/scripts'));

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));

 app.post('/login', function(req, res){
    fs.readFile(__dirname+"/public/data/nastavnici.json", 'utf-8', function(err, data){
        if(err){
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Doslo je do greske prilikom citanja fajla');
        }
        var loginUspjesan = false;
        const fileContent = JSON.parse(data); 
        for(var i=0; i<fileContent.length; i++){
            if(fileContent[i].nastavnik.username == req.body['username']){
                bcrypt.compare(req.body['password'], fileContent[i].nastavnik.password_hash, function(err, res1) {
                    if (err){
                        console.error(err);
                        res.send(JSON.stringify('Doslo je do greske sa ovim passwordom'));
                    }
                    if (res1) {
                        loginUspjesan = true;
                        req.session.username = fileContent[i].nastavnik.username;
                        req.session.predmeti = fileContent[i].predmeti;
                        const response = {
                            poruka: loginUspjesan ? "Uspješna prijava" : "Neuspješna prijava"
                        };
                        res.send(JSON.stringify(response));                         
                    } else {
                      // response is OutgoingMessage object that server response http request
                        if(i == fileContent.length){
                            const response = {
                                poruka: loginUspjesan ? "Uspješna prijava" : "Neuspješna prijava"
                            };
                            res.send(JSON.stringify(response));              
                        }
                    }
                  });
                break;
            }
        }        
    });

 });
 app.post('/logout', function(req,res){
    req.session.destroy();
    res.send(JSON.stringify('Obrisano je'));
 })

 app.get('/predmeti', function(req, res){
    if(req.session.username == null){
        res.send(JSON.stringify("greska:”Nastavnik nije loginovan”"));
    }
    res.write('<!DOCTYPE html><html><link rel=\"stylesheet\" href=\"predmeti.css\"</link><body>')
    res.write('<div id="menu"> <ul>');
    for(var i=0; i<req.session.predmeti.length; i++){
        res.write('<li><button>'+req.session.predmeti[i]+'</button></li>');
    }
    res.write('</ul><button onclick=\"logout()\">Logout</button></div>');
    res.write('<script src=\"poziviAjax.js\"></script><script src=\"predmeti.js\"></script>')
    res.end('</body></html>');
 });

app.listen(3000);

bcrypt.hash("12", 10, function(err, hash) {
    console.log(hash);
});
    