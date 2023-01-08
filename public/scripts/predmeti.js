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
    console.log(a);
    var divRef = document.getElementById("ucrtaj");
    var k = TabelaPrisustvo(divRef,a)
    k.prethodnaSedmica();
    k.sljedecaSedmica();
}