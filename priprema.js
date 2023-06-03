const db = require('./baza/db.js')
db.sequelize.sync({force:true}).then(function(){
    inicializacija()
});


function inicializacija(){
    function asinhronoDajRandom(predmet) {
        return new Promise(function (resolve, reject) {
            db.predmeti.create({naziv:predmet.predmet,brojPredavanjaSedmicno:predmet.brojPredavanjaSedmicno,brojVjezbiSedmicno:predmet.brojVjezbiSedmicno}).then(function(k){
                for(var i=0; i<predmet.studenti.length; i++){
                    let b = predmet.studenti[i].index;
                    db.studenti.create({name:predmet.studenti[i].ime,index:predmet.studenti[i].index}).then(function(m){
                        let n = predmet.prisustva.filter(a => a.index == b);
                        console.log("ispisujem studente: ",b);
                        for(var j=0; j<n.length; j++){
                            db.prisustva.create({sedmica:n[j].sedmica,predavanja:n[j].predavanja,vjezbe:n[j].vjezbe,index:n[j].index}).then(function(y){
                                m.setPrisustvas([y]);
                                k.setPrisustvas([y]);
                                //m.setStudent(y);                
                            })
                        } 
                    })
                }
            })
        });
     }
     function asinhronoDodajNastavnika( nastavnik3) {
        return new Promise(function (resolve, reject) {
            db.nastavnik.create({username:nastavnik3.nastavnik.username,password_hash:nastavnik3.nastavnik.password_hash}).then(function(k){
                for(var i=0; i<nastavnik3.predmeti.length; i++){
                    db.predmeti.findOrCreate({
                        where:{naziv:nastavnik3.predmeti[i]
                        },
                    defaults:{naziv:nastavnik3.predmeti[i]
                    }}).then(function(m){
                        k.setPredmets([m[0]]);      
                                   
                    })
                }
            
            });
        });
     }
     
    let prisustva = require('./public/data/prisustva.json');
    let nizPromisea = [];
    for (var i = 0; i < prisustva.length; i++) {
        nizPromisea.push(asinhronoDajRandom(prisustva[i]));
    }
    Promise.all(nizPromisea);

    let nastavnici1 = require('./public/data/nastavnici.json');
    let nizPromisea1 = [];
    for(var i=0; i<nastavnici1.length; i++){
        nizPromisea1.push(asinhronoDodajNastavnika(nastavnici1[i]));
    }
    Promise.all(nizPromisea1);
}