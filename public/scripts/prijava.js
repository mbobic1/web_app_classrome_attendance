function prijavi(){
    let ajax = PoziviAjax;
    console.log(document.getElementById("Username").value)
    console.log(document.getElementById("Password").value);
    ajax.postLogin(document.getElementById("Username").value, document.getElementById("Password").value, fnCallback);
}

function fnCallback(a){
    if(a.poruka == "Uspješna prijava"){
        window.location.href="/predmeti";
    }
    else document.getElementById("Login").innerHTML = a.poruka;
}