let div = document.getElementById("divSadrzaj");
//instanciranje
let podaci = TabelaPrisustvo(div, {
    studenti: [
        {ime:"Neko",index:12345}, 
        {ime: "Drugi Neko",index: 12346},
], prisustva:[
    {sedmica: 3,predavanja: 1,vjezbe:1,index:12345},
    {sedmica: 3,predavanja: 2,vjezbe: 2,index: 12346},
    {sedmica: 2,predavanja: 2,vjezbe: 0,index: 12345},
    {sedmica: 2,predavanja: 2,vjezbe: 0,index: 12346},
    {sedmica: 1,predavanja: 2,vjezbe: 0,index: 12345},
    {sedmica: 1,predavanja: 1,vjezbe: 0,index: 12346},
    {sedmica: 4,predavanja: 3,vjezbe: 0,index: 12345},
    {sedmica: 4,predavanja: 3,vjezbe: 0,index: 12346}
], predmet:"WT", brojPredavanjaSedmicno:4, brojVjezbiSedmicno:2});



//pozivanje metoda
podaci.sljedecaSedmica();
podaci.prethodnaSedmica();

