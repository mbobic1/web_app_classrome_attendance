function logout(){
    let ajax = PoziviAjax;
    ajax.postLogout(fnCallback);
}

function fnCallback(a){
    window.location.href="/prijava";
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

function togglecolor(element) {
    if (element.className == "zelena") { element.className = "crvena"; }
    else if(element.className == "crvena"){ element.className = "zelena"; }
}