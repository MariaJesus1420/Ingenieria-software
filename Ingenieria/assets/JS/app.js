let bntGoogle = document.querySelector("#btnGoogle");
let btnLogin = document.querySelector("#loginBtn");
let btnRegistro = document.querySelector("#registroBtn")
let modal = document.querySelector("#signUpModal");
let labelImage = document.querySelector("#labelLogin");
let checkBoxLogin = document.querySelector('#cbLogin');
//metodo para cambiar el login y register

(function() {
    'use strict'


})();
const loggedIn = (user) => {
    // $("#labelLoginImage").toggleClass("fas fa-user fas fa-sign-out-alt fa-lg");
    document.querySelector("#labelLoginImage").classList.remove("fas", "fa-user");
    document.querySelector("#labelLoginImage").classList.add("fas", "fa-sign-out-alt", "fa-lg");
    $("#labelLoginTexto").html("Salir");
    let picture = document.createElement('img');
    let list = document.createElement("li");
    list.id = "userProfileLi";
    list.classList.add("nav-item");
    picture.src = user.photoURL;
    picture.classList.add("rounded-circle");
    // h1UserName.innerHTML = user.displayName;
    picture.id = "userPicture";
    list.append(picture);
    $("#divlogin").prepend(list);
}
labelImage.addEventListener('click', async() => {
    let user = firebase.auth().currentUser
    console.log(user);

    if (!user) {
        $('#signUpModal').modal('show')
    } else {
        console.log("false");
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

})
bntGoogle.addEventListener('click', async() => {
    if (checkBoxLogin.checked) {
        await registerUserGoogle("LOCAL");
    } else {
        await registerUserGoogle("SESSION");
    }
    console.log("saliendo");
    $('#signUpModal').modal('hide');
    let user = await firebase.auth().currentUser;
    console.log(user);

    $(location).attr('href', "loged.html");
})