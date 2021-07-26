document.addEventListener("DOMContentLoaded", async function () {
  let meterId = sessionStorage.getItem("id");
  let numeroDias = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let divsCargando = document.querySelectorAll(".divCargando");
  //falta hacer consulta
  let costoLitro = 0;

  const cargarCostoPorLitro = async () => {
    let db = new DataBase();
    let result = await db.obtenerDocumento("Devices", meterId);
    costoLitro = result.costoLitro;
    if (!costoLitro) {
      costoLitro = 0;
    }
  };

  cargarCostoPorLitro();

  const quitarDivsCargando = () => {
    for (let index = 0; index < divsCargando.length; index++) {
      divsCargando[index].classList.replace("showElement", "hideElement");
    }
  };

  const calcularCosto = (labelCosto, datos, costoPorLitro) => {
    let formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "CRC",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    let acumulado = 0;
    for (let index = 0; index < datos.length; index++) {
      acumulado += datos[index] * costoPorLitro;
    }
    console.log(acumulado);
    labelCosto.innerText = formatter.format(acumulado);
  };

  const mostrarGraficas = () => {
    let errorGraficaActual = document.querySelector("#errorGraficaActual");
    let errorGraficaMensual = document.querySelector("#errorGraficaMensual");
    let errorGraficaDiario = document.querySelector("#errorGraficoDiario");

    let graficaActual = document.querySelector("#graficaActual");
    let graficaMensual = document.querySelector("#graficaMensual");
    let graficaDiario = document.querySelector("#graficaDiario");

    if (datosActual.length === 0) {
      errorGraficaActual.classList.replace("hideElement", "showElement");
    } else {
      errorGraficaActual.classList.replace("showElement", "hideElement");
      graficaActual.classList.replace("hideElement", "showElement");

      calcularCosto(
        document.querySelector("#labelCostoActual"),
        datosActual,
        costoLitro
      );
    }

    if (datosMensual1.length === 0) {
      errorGraficaMensual.classList.replace("hideElement", "showElement");
    } else {
      errorGraficaMensual.classList.replace("showElement", "hideElement");
      graficaMensual.classList.replace("hideElement", "showElement");
      calcularCosto(
        document.querySelector("#labelCostoMensual"),
        datosMensual1,
        costoLitro
      );
    }

    if (datosDiario1.length === 0) {
      console.log("VACIO");
      errorGraficaDiario.classList.replace("hideElement", "showElement");
    } else {
      errorGraficaDiario.classList.replace("showElement", "hideElement");
      errorGraficaDiario.classList.remove("showElement");
      errorGraficaDiario.classList.add("hideElement");
      graficaDiario.classList.replace("hideElement", "showElement");
      graficaDiario.classList.add("showElement");
      calcularCosto(
        document.querySelector("#labelCostoAnual"),
        datosDiario1,
        costoLitro
      );
    }

    if (meterId) {
      calcularCosto(
        document.querySelector("#labelCostoLitro"),
        [1],
        costoLitro
      );
    }

    //containerChartCostos.classList.replace("hideElement","showElement");
  };

  let nombreHoras = [
    "0h",
    "1h",
    "2h",
    "3h",
    "4h",
    "5h",
    "6h",
    "7h",
    "8h",
    "9h",
    "10h",
    "11h",
    "12h",
    "13h",
    "14h",
    "15h",
    "16h",
    "17h",
    "18h",
    "19h",
    "20h",
    "21h",
    "22h",
    "23h",
  ];

  let nombreDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    
  ];
  let nombreMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  function updateData(chart) {
    let lenghtDataGrafica = chart.data.datasets[0].data.length;

    if (datosActual.length > 0 && lenghtDataGrafica < datosActual.length) {
      chart.data.datasets[0].data[lenghtDataGrafica] =
        datosActual[datosActual.length - 1];
      datosActual[datosActual.length - 1];
      calcularCosto(
        document.querySelector("#labelCostoActual"),
        datosActual,
        costoLitro
      );
      chart.update();
      $("#liveToast").toast("show");
    }
  }

  $("#generarData").on("click", async () => {
    let db = new DataBase();
    await db.simularLecturas(meterId, 2021);
  });

  let datosMensual1 = [];
  let datosMensual2 = [];

  let datosDiario1 = [];
  let datosDiario2 = [];

  let datosActual = [];

  let labelDatosActual;

  let labelDatosMensual1;
  let labelDatosMensual2;

  let labelDatosDiarios1;
  let labelDatosDiarios2;

  const cargarMensual = async (year, datosMensual) => {
    let db = new DataBase();

    let resumenMensual = await db.obtenerDocumento(
      `Readings/${meterId}/${year}`,
      "resumen"
    );
    if (resumenMensual) {
      for (let index = 1; index < 13; index++) {
        datosMensual[index - 1] = resumenMensual[`${index}`].total;
      }
    }

    return year;
  };

  const cargarDiario = async (month, year, datosDiario, label) => {
    let db = new DataBase();

    let resumenDiario = await db.obtenerDocumento(
      `Readings/${meterId}/${year}`,
      `${month}`
    );

    let dia = 1;
    let acumuladoDia = 0;
    console.log(resumenDiario);
    if (resumenDiario) {
      while (resumenDiario[`d${dia}`] != undefined) {
        let lectura = 0;
        let lecturas = Object.entries(resumenDiario[`d${dia}`]);

        while (lecturas[lectura] != undefined) {
          acumuladoDia += lecturas[lectura][1].valor;
          lectura++;
        }

        datosDiario[dia - 1] = acumuladoDia;
        acumuladoDia = 0;

        dia++;
      }
    }
    return nombreMeses[month - 1];
  };

  const cargarActual = async () => {
    let db = new DataBase();
    let resumenActual = await db.obtenerDocumento(
      `Readings/${meterId}/${new Date().getFullYear()}`,
      `${new Date().getMonth() + 1}`
    );
    if (resumenActual != null && resumenActual != undefined) {
      console.log(resumenActual);
      let datosDelDia = Object.entries(resumenActual[`d${1}`]);

      let hora = 0;
      let datosActualSort = [];
      while (datosDelDia[hora] != undefined) {
        datosActualSort[hora] = {
          fechaGenerado: datosDelDia[hora][1].fechaGenerado.seconds,
          valor: datosDelDia[hora][1].valor,
        };
        hora++;
      }
      let result = _.sortBy(datosActualSort, "fechaGenerado").map(
        (x) => x.valor
      );
      datosActual = result.slice();
    }

    return nombreDias[new Date().getDay()];
  };
  labelDatosDiarios1 = await cargarDiario(
    new Date().getMonth() + 1,
    new Date().getFullYear(),
    datosDiario1
  );
  labelDatosDiarios2 = await cargarDiario(
    new Date().getMonth(),
    new Date().getFullYear(),
    datosDiario2
  );
  labelDatosMensual1 = await cargarMensual(
    new Date().getFullYear(),
    datosMensual1
  );

  labelDatosMensual2 = await cargarMensual(
    new Date().getFullYear() - 2,
    datosMensual2
  );

  labelDatosActual = await cargarActual();
  quitarDivsCargando();
  mostrarGraficas();

  let dataBase = new DataBase();

  let chartActual = new Chart("chartActual", {
    type: "line",
    data: {
      labels: nombreHoras,
      datasets: [
        {
          fill: true,
          lineTension: 0.4,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          data: datosActual,
          label: labelDatosActual,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: true },
      title: {
        display: false,
        text: "Hoy",
        fontSize: 30,
      },
    },
  });
  await dataBase.db
    .collection(`Readings/${meterId}/${new Date().getFullYear()}`)
    .doc(`${new Date().getMonth() + 1}`)
    .onSnapshot(async (doc) => {
      await cargarActual();
      updateData(chartActual);
    });

  let chartMensual = new Chart("chartMensual", {
    type: "line",
    data: {
      labels: nombreMeses,
      datasets: [
        {
          fill: true,
          tension: 0.3,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: datosMensual1,
          label: labelDatosMensual1,
        },
        {
          fill: true,
          lineTension: 0.4,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          data: datosMensual2,
          label: labelDatosMensual2,
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: "Mensual",
        fontSize: 30,
      },
    },
  });

  let chartDiario = new Chart("chartDiario", {
    type: "line",
    data: {
      labels: numeroDias,
      datasets: [
        {
          fill: true,
          tension: 0.3,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: datosDiario1,
          label: labelDatosDiarios1,
        },
        {
          fill: true,
          lineTension: 0.4,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          data: datosDiario2,
          label: labelDatosDiarios2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,

      responsive: true,
      legend: { display: true },
      title: {
        display: false,
        text: "Diario",
        fontSize: 30,
      },
    },
  });
  chartActual.update();
  window.onbeforeunload = function () {
    if (document.referrer === "") {
      sessionStorage.removeItem("id");
    } else {
      // do foo
    }
  };

  window.onload = function () {
    if (document.referrer === "") {
      sessionStorage.removeItem("id");
    } else {
      // do foo
    }
  };
  document.getElementById("btnFactura").addEventListener("click", async (e) => {
    try {
      let user = await firebase.auth().currentUser;
      console.log(user.email, costoLitro);
      e.preventDefault();
      const email = user.email;
      firebase
        .firestore()
        .collection("Notificacion")
        .add({ email, costoLitro })
        .then((r) => {
          console.log(r);
          alert("Correo Enviado");
        });
    } catch (w) {
      console.log(w);
    }
  });
});
