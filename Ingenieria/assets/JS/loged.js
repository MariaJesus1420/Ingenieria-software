document.addEventListener("DOMContentLoaded", async function () {
  const btnSalir = document.querySelector("#salir");
  const nombreUsuario = document.querySelector("#nombreUsuario");
  const btnHome = document.querySelector("#btnHome");
  let btnAgregar = document.querySelector("#btnAgregarMedidor");
  let btnModalAgregar = document.querySelector("#btnAgregarMedidorModal");
  let inputId = document.querySelector("#inputId");
  let btnRandomMedidor = document.querySelector("#btnCrearRandomMedidorModal");
  let divCargando = document.querySelector("#divCargando");

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      console.log(user);
      user.displayName
        ? (nombreUsuario.innerText = user.displayName)
        : (nombreUsuario.innerText = user.email);
      await loadData2();
      divCargando.classList.remove("showElement");
      divCargando.classList.add("hideElement");
    } else {
      // No user is signed in.
    }
  });
  btnSalir.addEventListener("click", (e) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("salio de la sesion");
        $(location).attr("href", "index.html");
      })
      .catch((error) => {
        // An error happened.
      });
  });

  btnAgregar.addEventListener("click", (e) => {
    $("#modalAgregarMedidor").modal("show");
  });
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  btnRandomMedidor.addEventListener("click", async () => {
    let db = new DataBase();
    let types = "WaterMeter";
    shuffleArray(types);
    console.log(types);

    let device = new Device(generateName(), "", false, 0, types, false);
    let id = await db.agregarMedidor(device);

    let user = firebase.auth().currentUser;
    await db.activarDispositivo(id, user.uid, user.email, "Admin");
    $("#modalAgregarMedidor").modal("hide");
    loadData2();
  });

  btnModalAgregar.addEventListener("click", async (event) => {
    event.preventDefault();

    let db = new DataBase();
    console.log("ADDING NEW METER");
    let user = firebase.auth().currentUser;
    console.log(inputId.value);
    await db.activarDispositivo(inputId.value, user.uid, user.email, "Admin");
    console.log("DONE ADDING");
    $("#modalAgregarMedidor").modal("hide");
    loadData2();
  });

  const cardNueva2 = (customName, id, lastValue, type) => {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top");
    imgCard.alt = "Sensor de ruido";
    if (type === "WaterMeter") {
      imgCard.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/1200px-Pok%C3%A9mon_Water_Type_Icon.svg.png";
    } else {
      imgCard.src =
        "https://icons.iconarchive.com/icons/custom-icon-design/mono-general-4/512/sound-icon.png";
    }

    divCard.appendChild(imgCard);
    let divBody = document.createElement("div");
    divBody.classList.add("card-body");
    let titleCard = document.createElement("h5");
    titleCard.classList.add("card-title");
    titleCard.innerText = customName;
    divBody.appendChild(titleCard);
    let paragraphCard = document.createElement("p");
    paragraphCard.classList.add("card-text");
    
    divBody.appendChild(paragraphCard);

   
    let iconReportes = document.createElement("i");

    iconReportes.classList.add("bi", "bi-bar-chart-fill");
    iconReportes.style = "font-size: 1.3rem;";


    let iconConfigurar = document.createElement("i");

    iconConfigurar.classList.add("bi", "bi-gear-fill");
    iconConfigurar.style = "font-size: 1.3rem;";

    let buttonReportes = document.createElement("a");
    buttonReportes.classList.add("btn-outline-success", "btn");
    buttonReportes.href = "#"
    buttonReportes.text = " Reportes";
    buttonReportes.style = "margin-top: 10px";
    
    buttonReportes.prepend(iconReportes);

    let buttonConfigurar = document.createElement("a");
    buttonConfigurar.classList.add("btn-outline-primary", "btn");
    buttonConfigurar.text = " Configurar";
    buttonConfigurar.href = "#";

    buttonConfigurar.prepend(iconConfigurar);

    divBody.style = "display:flex;flex-direction:column;";
    divBody.appendChild(buttonConfigurar);
    divBody.appendChild(buttonReportes);
    divCard.appendChild(divBody);
    buttonConfigurar.addEventListener("click", () => {
      sessionStorage.setItem("id", id);
      $(location).attr("href", "config.html");
    });

    buttonReportes.addEventListener("click", () => {
      sessionStorage.setItem("id", id);
      $(location).attr("href", "Graphic.html");
    });
    return divCard;
  };
  const loadData2 = async () => {
    let db = new DataBase();
    console.log("LOADING NEW METERS");

    let user = await firebase.auth().currentUser;
    let resultado = await db.obtenerDocumento("Users", user.uid);
    console.log(resultado);
    if (resultado) {
      if (resultado.devices) {
        resultado = Object.entries(resultado.devices);
        let customName;
        let id;
        let lastValue;
        let type;
        let divContainer = document.createElement("div");

        let cardDiv = document.querySelector("#Cards");
        let divRow;
        let divCol;
        let card;
        let counter = 0;
        while (cardDiv.children.length > 1) {
          cardDiv.removeChild(cardDiv.lastChild);
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
          type = resultado[index][1].type;
          id = resultado[index][0];

          card = cardNueva2(customName, id, lastValue, type);

          console.log({
            card,
          });

          divCol.append(card);
          divRow.append(divCol);

          counter++;
        }
        cardDiv.append(divContainer);
      } else {
      }
    }
  };
});
