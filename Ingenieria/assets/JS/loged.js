const btnSalir = document.querySelector('#salir');
const nombreUsuario = document.querySelector('#nombreUsuario');
const btnHome = document.querySelector('#btnHome');
let btnAgregar = document.querySelector('#btnAgregar');
let btnModalAgregar = document.querySelector('#btnAgregarMedidor');


$(document).ready(async() => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);

            nombreUsuario.innerText = "Bienvenid@: " + user.displayName;
            loadData2();
        } else {
            // No user is signed in.
        }
    });
});

btnSalir.addEventListener('click', e => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("salio de la sesion");
        $(location).attr('href', "index.html");
    }).catch((error) => {
        // An error happened.
    });

})

btnAgregar.addEventListener('click', e => {
    // validateWaterMeter(inputMeterID.value);
    // addWaterMeter(inputMeterID.value);

    $('#modalAgregarMedidor').modal('show');
})

btnModalAgregar.addEventListener('click', async() => {
    // validateWaterMeter(inputMeterID.value);
    // addWaterMeter(inputMeterID.value);
    let db = new DataBase();
    await db.agregarDispositivo(inputId.value);
    $('#modalAgregarMedidor').modal('hide');
    loadData2();
})

const cardNueva2 = (customName, id, lastValue) => {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top");
    imgCard.alt = "Sensor de ruido";
    imgCard.src = "https://images-na.ssl-images-amazon.com/images/I/71hEtk3aCpL._SL1500_.jpg";
    divCard.appendChild(imgCard);
    let divBody = document.createElement("div");
    divBody.classList.add("card-body");
    let titleCard = document.createElement("h5");
    titleCard.classList.add("card-title");
    titleCard.innerText = customName;
    divBody.appendChild(titleCard);
    let paragraphCard = document.createElement("p");
    paragraphCard.classList.add("card-text");
    paragraphCard.innerText = lastValue;
    divBody.appendChild(paragraphCard);
    let buttonCard = document.createElement("a");
    buttonCard.classList.add("btn-primary", "btn");
    buttonCard.innerText = "Configurar";
    buttonCard.href = id;
    divBody.appendChild(buttonCard);
    divCard.appendChild(divBody);

    return divCard;
}
const loadData2 = async() => {
    let db = new DataBase();

    let user = await firebase.auth().currentUser;
    let resultado = await db.obtenerDocumento('Users', user.uid);
    console.log(resultado);
    resultado = Object.entries(resultado.devices);
    let customName;
    let id;
    let lastValue;
    let divContainer = document.createElement("div");
    divContainer.classList.add("container-fluid");
    let cardDiv = document.querySelector("#Cards");
    let divRow;
    let divCol;
    let card;
    let counter = 0;
    while (cardDiv.firstChild) {
        cardDiv.removeChild(cardDiv.firstChild);
    }
    for (let index = 0; index < resultado.length; index++) {
        console.log("CaRTA");
        if (index === 0 || counter === 4) {
            divRow = document.createElement("div");
            divRow.classList.add("row");
            divContainer.append(divRow);
            counter = 0;
        }

        divCol = document.createElement("div");
        divCol.classList.add("col-sm-6", "col-md-6", "col-xl-3");
        customName = resultado[index][1].customName;
        lastValue = resultado[index][1].lastValue;
        id = resultado[index][0];
        card = cardNueva2(customName, id, lastValue);


        console.log({ card });

        divCol.append(card);
        divRow.append(divCol);

        counter++;
    }
    cardDiv.append(divContainer);
}