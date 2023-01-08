function logout(){
    let ajax = PoziviAjax;
    ajax.postLogout(fnCallback);
}

function fnCallback(a){
    window.location.href="/predmeti";
}