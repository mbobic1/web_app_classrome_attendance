let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //

    const container1 = document.getElementById('divSadrzaj');
    var imaNestpUDivu=0;
    if(container1.firstChild){
        imaNestpUDivu=1;
    }
    if(imaNestpUDivu==1){
        while(container1.lastElementChild){
            container1.removeChild(container1.lastElementChild);
        }
    }


    //Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
    var myhtml = '';
    var ukupnoPv = podaci.brojPredavanjaSedmicno;
    ukupnoPv += podaci.brojVjezbiSedmicno;
    for(var i=0; i<podaci.studenti.length; i++){
        var uzmiPV=0;
        for(var j=0; j<podaci.prisustva.length; j++){
            uzmiPV=0;
            if(podaci.prisustva[j].index==podaci.studenti[i].index){
                uzmiPV+=podaci.prisustva[j].predavanja;
                uzmiPV+=podaci.prisustva[j].vjezbe;
            }
            if(uzmiPV>ukupnoPv){
                myhtml = "Podaci o prisustvu nisu validni!";
                divRef.innerHTML = myhtml;
                return;
            }
        }
    }
    //broj prisustva manji od 0 
    for(var i=0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].predavanja<0 || podaci.prisustva[i].vjezbe<0){
            myhtml = "Podaci o prisustvu nisu validni!";
                divRef.innerHTML = myhtml;
                return;
        }
    }
    //Isti student ima dva ili više unosa prisustva za istu sedmicu
    for(var i=0; i<podaci.prisustva.length; i++){
        for(var j =i+1; j<podaci.prisustva.length; j++){
            if((podaci.prisustva[j].sedmica == podaci.prisustva[i].sedmica) && (podaci.prisustva[j].index == podaci.prisustva[i].index)){
                myhtml = "Podaci o prisustvu nisu validni!";
                divRef.innerHTML = myhtml;
                return;
            }   
        }       
    }
    //Postoje dva ili više studenata sa istim indeksom u listi studenata
    for(var i=0; i<podaci.studenti.length; i++){
       for(var j=i+1; j<podaci.studenti.length; j++){
            if(podaci.studenti[j].index==podaci.studenti[i].index){
                myhtml = "Podaci o prisustvu nisu validni!";
                divRef.innerHTML = myhtml;
                return;
            }
       }
    }
    //Postoji prisustvo za studenta koji nije u listi studenata
    var baremJedan=0;
    for(var i =0; i<podaci.prisustva.length; i++){
        baremJedan=0;
        for(var j =0; j<podaci.studenti.length; j++){
            if(podaci.prisustva[i].index == podaci.studenti[j].index){
                baremJedan += 1;
            }
        }
        if(baremJedan==0){
            myhtml = "Podaci o prisustvu nisu validni!";
                divRef.innerHTML = myhtml;
                return;
        }
    }
    //Postoji sedmica, između dvije sedmice za koje je uneseno prisustvo bar 
    //jednom studentu, u kojoj nema unesenog prisustva. Npr. uneseno je 
    //prisustvo za sedmice 1 i 3 ali nijedan student nema prisustvo za sedmicu 2
    for(var i =0; i<podaci.prisustva.length; i++){
        for(var j=i+1; j<podaci.prisustva.length; j++){
            
        }
    }




    var container = document.getElementById('divSadrzaj');
    var myhtml='';
    for(var i=0; i < podaci.studenti.length; i++){
        myhtml += '<p>' + podaci.studenti[i].ime +'</p>';
    }
    divRef.innerHTML = myhtml;




    //implementacija metoda
    let sljedecaSedmica = function () {

    }

    let prethodnaSedmica = function () {

    }


    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
