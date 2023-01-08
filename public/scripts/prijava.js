function prijavi(){
    let ajax = PoziviAjax;
    ajax.postLogin(document.getElementById("Username").value, document.getElementById("Password").value, fnCallback);
}

function fnCallback(a){
    if(a.poruka == "Uspješna prijava"){
        window.location.href="/predmeti";
    }
    else document.getElementById("Login").innerHTML = a.poruka;
}