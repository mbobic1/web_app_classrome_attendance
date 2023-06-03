function logout(){
    let ajax = PoziviAjax;
    ajax.postLogout(fnCallback);
}

function fnCallback(a){
    window.location.href="/prijava.html";
}

function klikpredmeta(a){
    let ajax = PoziviAjax;
    console.log(a);
    ajax.getPredmet(a,fnCallback4);
}

function fnCallback4(a){
    var divRef = document.getElementById("ucrtaj");
    var k = TabelaPrisustvo(divRef,a)
    k.prethodnaSedmica();
    k.sljedecaSedmica();
}

function togglecolor(element, naziv,  index, sedmica, predavanja, vjezbe) {
    if (element.className == "zelena") {
        let ajax = PoziviAjax;
        ajax.postPrisustvo(naziv,index,{sedmica,predavanja,vjezbe},fnCallback5);
    }
    else if(element.className == "crvena"){
        let ajax = PoziviAjax;
        ajax.postPrisustvo(naziv,index,{sedmica,predavanja,vjezbe},fnCallback5); 
    }
    else if(element.className == "bijela"){
        let ajax = PoziviAjax;
        ajax.postPrisustvo(naziv,index,{sedmica,predavanja,vjezbe},fnCallback5); 
    }
}

function fnCallback5(a){
    console.log(a);
    var divRef = document.getElementById("ucrtaj");
    var k = TabelaPrisustvo(divRef,a)
    k.prethodnaSedmica();
    k.sljedecaSedmica();
}