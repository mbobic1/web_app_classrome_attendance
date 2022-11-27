let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    if(div==null || podaci==null){
        return {sljedecaSedmica:null,prethodnaSedmica:null}
    }
    
    var ukupnosedmica1=0;
    var uzmi123 = new Array();
    for(var j=0; j<podaci.studenti.length; j++){
        ukupnosedmica1=0;
        for(var i=0; i<podaci.prisustva.length; i++){
            if(podaci.prisustva[i].index==podaci.studenti[j].index){
            ukupnosedmica1++;   
            }
        }
        uzmi123.push(ukupnosedmica1);
    }
    console.log(uzmi123);
    var ukupnosedmica = Math.max(...uzmi123);
    console.log(ukupnosedmica);
    //privatni atribut modula trenutni2
    var trenutni2 = ukupnosedmica;

    let sljedecaSedmica;
    let prethodnaSedmica;


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
    /*for(var i =0; i<podaci.prisustva.length; i++){
        for(var j=0; j<podaci.studenti.length; j++){
            if(podaci.prisustva[i].index==podaci.studenti[j].index){

            }
        }
    }*/

    function promjeniBroj(broj){
        if(broj==1){
            return "I";
        }
        else if(broj==2){
            return "II";
        }
        else if(broj==3){
            return "III";
        }
        else if(broj==4){
            return "IV";
        }
        else if(broj==5){
            return "V";
        }
        else if(broj==6){
            return "VI";
        }
        else if(broj==7){
            return "VII";
        }
        else if(broj==8){
            return "VIII";
        }
        else if(broj==9){
            return "IX";
        }
        else if(broj==10){
            return "X";
        }
        else if(broj==11){
            return "XI";
        }
        else if(broj==12){
            return "XII";
        }
        else if(broj==13){
            return "XIII";
        }
        else if(broj==14){
            return "XIV";
        }
        else if(broj==15){
            return "XV";
        }
    }
    function napravitabelu(){
    var ukupnoVjIPr = podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno;
    //pocinje tabela 
    var tabela1 = "<h1><b> Predmet: "+ podaci.predmet + "</b></h1>";
    tabela1 += "<table class=\"table\"><thead><tr><th>Ime i Prezima </th><th>Index</th>";
    for(var i=0; i<ukupnosedmica; i++){
        if(i==ukupnosedmica-1){
            i+=1;
            tabela1+= "<td colspan=\""+ukupnoVjIPr+"\"><b>"+promjeniBroj(i)+"</b></td>";
            i-=1;
        }
        else{
            i+=1;
            tabela1+= "<th><b>"+promjeniBroj(i)+"</b></th>"
            i-=1;
        }       
    }
    if(ukupnosedmica<15){
        tabela1+= "<th><b>" + promjeniBroj(ukupnosedmica+1) + "-XV</b></th>";
    }
    tabela1+="</tr> </thead>";
    //tbodypocinje
    tabela1+="<tbody>"
        for(var i=0; i<podaci.studenti.length; i++){
            var izasaoPrIVj=0;
            tabela1+="<tr>"
            tabela1+="<td rowspan=\"2\">"+podaci.studenti[i].ime + "</td>";
            tabela1+="<td rowspan=\"2\">"+podaci.studenti[i].index + "</td>";
            for(var j = 1; j<=ukupnosedmica; j++){
                izasaoPrIVj=0;
                var izbaci=podaci.prisustva.filter(x => x.index == podaci.studenti[i].index).filter(x=> x.sedmica==j);
                if(izbaci.length==0 && ukupnosedmica==j){
                    for(var l=0; l<podaci.brojPredavanjaSedmicno; l++){
                        l+=1;
                        tabela1+="<td> p <br>"+ l + "</td>"; 
                        l-=1;
                    }
                    for(var l =0; l<podaci.brojVjezbiSedmicno; l++){
                        l+=1;
                        tabela1+="<td> v <br>"+ l + "</td>";
                        l-=1;
                    }

                }
                else if(izbaci.length==0){
                    tabela1+="<td rowspan=\"2\"></td>";
                }else{
                izasaoPrIVj+=(izbaci[0].predavanja + izbaci[0].vjezbe);
                if(ukupnosedmica==j){
                    for(var l=0; l<podaci.brojPredavanjaSedmicno; l++){
                        l+=1;
                        tabela1+="<td> p <br>"+ l + "</td>"; 
                        l-=1;
                    }
                    for(var l =0; l<podaci.brojVjezbiSedmicno; l++){
                        l+=1;
                        tabela1+="<td> v <br>"+ l + "</td>";
                        l-=1;
                    }
                    }
                    else{
                        tabela1+="<td rowspan=\"2\">"+ parseInt((izasaoPrIVj/ukupnoVjIPr)*100) +"%</td>";
                    }
                }
                
            }
            tabela1+="<td rowspan=\"2\"></td>";
            tabela1+="<tr>"
            var izbaci=podaci.prisustva.filter(x => x.index == podaci.studenti[i].index).filter(x=> x.sedmica==ukupnosedmica);
            if(izbaci.length==0){
                for(var m = 0; m<podaci.brojPredavanjaSedmicno; m++){
                        tabela1+="<td> </td>"
                    
                }
                for(var m =0; m<podaci.brojVjezbiSedmicno; m++){
                        tabela1+="<td> </td>"                    
                }
            }else{
                brojPred=izbaci[0].predavanja;
                    for(var m = 0; m<podaci.brojPredavanjaSedmicno; m++){
                        if(m<=brojPred-1){
                            tabela1+="<td class=\"zelena\"></td>"
                        }
                        else{
                            tabela1+="<td class=\"crvena\"></td>"
                        }
                    }
                    brojVjez=izbaci[0].vjezbe;
                    for(var m =0; m<podaci.brojVjezbiSedmicno; m++){
                        if(m<=brojVjez-1){
                            tabela1+="<td class=\"zelena\"></td>"
                        }
                        else{
                            tabela1+="<td class=\"crvena\"></td>"
                        }
                    }
            }
            tabela1+="</tr>"
                
            tabela1+="</tr>"
        }
    tabela1+="</tbody></table>";
    divRef.innerHTML = tabela1;
     //zavrsava tabela   
}

    napravitabelu();
    //implementacija metoda
    sljedecaSedmica = function () {
    }
    prethodnaSedmica = function () {
    }
    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};