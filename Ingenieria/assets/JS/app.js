let bntGoogle = document.querySelector("#btnGoogle");
let btnLogin = document.querySelector("#loginBtn");
let btnRegistro = document.querySelector("#registroBtn")
let modal = document.querySelector("#signUpModal");
let labelImage = document.querySelector("#labelLogin");
let checkBoxLogin = document.querySelector('#cbLogin');
let canLogin = true;
let btnConfirm_loginRegist = document.querySelector('#btnConfirm_loginRegist');
let inputEmail = document.querySelector('#inputEmail');
let inputPassword = document.querySelector('#inputPassword');
let divConfirmPassword = document.querySelector('#divConfirmPassword');
let inputConfirmPassword = document.querySelector('#inputConfirmPassword');
document.addEventListener('DOMContentLoaded', () => {
    divConfirmPassword.style.display = "none";

})
btnConfirm_loginRegist.addEventListener('click', async() => {
    let db = new DataBase();
    if (canLogin) {
        let user = await db.loginEmailPassword(inputEmail.value, inputPassword.value, "SESSION");
        if (user) $(location).attr('href', "loged.html");
        else {
        $('#modalContent').text("Las credenciales son incorrectas o el usuario no se encuentra registrado");
        $('#modalMessages').modal('show');
        $('#signUpModal').modal('hide');
        }
        // $(location).attr('href', "loged.html")
    } else if(inputPassword.value===inputConfirmPassword.value){
        registerUser(inputEmail.value, inputPassword.value);
        $('#signUpModal').modal('hide');
    }else{
        $('#modalContent').text("Las contraseñas no coinciden o el email es invalido");
        $('#modalMessages').modal('show');
    }
    let user = await firebase.auth().currentUser;
    console.log(user);
})

const btnClick = (btnOn, btnOff) => {
    btnOn.classList.add("btnOnClick");
    btnOff.classList.remove("btnOnClick");

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
btnLogin.addEventListener("click", () => {
    btnClick(btnLogin, btnRegistro);
    canLogin = true;
    divConfirmPassword.style.display = "none";
})
btnRegistro.addEventListener("click", () => {
    btnClick(btnRegistro, btnLogin);
    canLogin = false;
    divConfirmPassword.style.display = "block";
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