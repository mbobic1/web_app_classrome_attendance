const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const session = require('express-session');
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
    res.write('<!DOCTYPE html><html><link rel=\"stylesheet\" href=\"predmeti.css\"</link><link rel=\"stylesheet\" href=\"prisustvo.css\"</link><body>')
    res.write('<div id="menu"> <ul>');
    if(req.session.predmeti!=null){
        for(var i=0; i<req.session.predmeti.length; i++){
            res.write('<li><button value=\"'+req.session.predmeti[i]+'\" onclick=\"klikpredmeta(this.value)\">'+req.session.predmeti[i]+'</button></li>');
        }
    }else{
        res.write('<h2>Nije prijavljen ni na jedan predmet</h2>');
    }
    res.write('</ul><button onclick=\"logout()\">Logout</button></div><div id=\"ucrtaj\"></div>');
    res.write('<script src=\"TabelaPrisustvo.js\"></script><script src=\"poziviAjax.js\"></script><script src=\"predmeti.js\"></script>')
    res.end('</body></html>');
 });


 app.get('/predmet/:NAZIV', function(req, res){
    fs.readFile(__dirname+"/public/data/prisustva.json", function(err, data){
        var ima =0;
        if(err){
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Doslo je do greske prilikom citanja fajla');
        }
        const fileContent = JSON.parse(data); 
        for(var i=0; i<fileContent.length; i++){
            if(fileContent[i].predmet==req.params.NAZIV){
                ima = 1;
                res.send(JSON.stringify(fileContent[i]));
                break;
            }
        }
        if(ima==0){
            console.log("Nema predmeta sa unutar fajla");
        }
    });
 });

 app.post('/prisustvo/predmet/:NAZIV/student/:index', function(req,res){
    fs.readFile(__dirname+"/public/data/prisustva.json", function(err, data){
        if(err){
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Doslo je do greske prilikom citanja fajla');
        }
        const fileContent = JSON.parse(data); 
        var bijeloPolje =0;
        for(var i=0; i<fileContent.length; i++){
            if(fileContent[i].predmet==req.params.NAZIV){
                for(var j=0; j<fileContent[i].studenti.length; j++){
                    if(fileContent[i].studenti[j].index==req.params.index){
                        for(var k=0; k<fileContent[i].prisustva.length; k++){
                            if(fileContent[i].prisustva[k].sedmica==req.body['sedmica'] && fileContent[i].prisustva[k].index==req.params.index){
                                bijeloPolje=1;
                                fileContent[i].prisustva[k].predavanja=req.body['predavanja'];
                                fileContent[i].prisustva[k].vjezbe=req.body['vjezbe'];
                                var m = fileContent[i];
                                fs.writeFile(__dirname+"/public/data/prisustva.json", JSON.stringify(fileContent), err=>{
                                    res.json(m);
                                });
                                break;
                            }
                        }
                        if(bijeloPolje==0){
                            var napraviPolje = {"sedmica":req.body['sedmica'],"predavanja":req.body['predavanja'],"vjezbe":req.body['vjezbe'],"index":req.params.index};
                            fileContent[i].prisustva.push(napraviPolje);
                            var el=fileContent[i];
                            fs.writeFile(__dirname+"/public/data/prisustva.json", JSON.stringify(fileContent), err=>{
                            res.json(el);
                            });
                           break;
                        }
                    }
                }
            }
        }
    });
 });
app.listen(3000);

bcrypt.hash("12", 10, function(err, hash) {
    console.log(hash);
});
    