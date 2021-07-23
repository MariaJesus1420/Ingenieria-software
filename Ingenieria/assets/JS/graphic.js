document.addEventListener("DOMContentLoaded", async function () {
  let numeroDias = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  let meterId = "COFG9yKTnL6t0DPIShSz";

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
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
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
    console.log("EVALUATING", (lenghtDataGrafica < datosActual.length));
    if((datosActual.length > 0) && (lenghtDataGrafica < datosActual.length)){
      console.log("UPDATING");
      console.log( chart.data.datasets[0]);
      chart.data.datasets[0].data[lenghtDataGrafica ] = datosActual[datosActual.length-1];
      datosActual[datosActual.length - 1];

    chart.update();
    console.log("HOLA");
    }
    
  }

  $("#generarData").on("click", async () => {
    let db = new DataBase();
    await db.simularLecturas(meterId, 2020);
    console.log("DONE");
  });

  let datosMensual1 = [];
  let datosMensual2 = [];

  let datosDiario1 = [];
  let datosDiario2 = [];

  let datosActual = [];

  let labelDatosActual = nombreDias[new Date().getDay() - 1];

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
    for (let index = 1; index < 13; index++) {
      datosMensual[index - 1] = resumenMensual[`${index}`].total;
    }

    return year;
  };

  const cargarDiario = async (month, year, datosDiario) => {
    let db = new DataBase();

    let resumenDiario = await db.obtenerDocumento(
      `Readings/${meterId}/${year}`,
      `${month}`
    );

    let dia = 1;
    let acumuladoDia = 0;

    while (resumenDiario[dia] != undefined) {
      let lectura = 0;
      let lecturas = Object.entries(resumenDiario[dia]);

      while (lecturas[lectura] != undefined) {
        acumuladoDia += lecturas[lectura][1].valor;
        lectura++;
      }

      datosDiario[dia - 1] = acumuladoDia;
      acumuladoDia = 0;

      dia++;
    }

    return nombreMeses[month-1];
  };

  const cargarActual = async () => {
    let db = new DataBase();
    let resumenActual = await db.obtenerDocumento(
      `Readings/${meterId}/${new Date().getFullYear()}`,
      `${new Date().getMonth() + 1}`
    );

    let datosDelDia = Object.entries(resumenActual[new Date().getDate()]);

    let hora = 0;
    let datosActualSort = [];
    while (datosDelDia[hora] != undefined) {
      datosActualSort[hora] = {
        fechaGenerado: datosDelDia[hora][1].fechaGenerado.seconds,
        valor: datosDelDia[hora][1].valor,
      };
      hora++;
    }
    let result = _.sortBy(datosActualSort, "fechaGenerado").map((x) => x.valor);
    datosActual = result.slice();
    return null;
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
    new Date().getFullYear() - 1,
    datosMensual2
  );

  await cargarActual();

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
        display: true,
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
  console.log("LISTO CHART ACTUAL");
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
        display: true,
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
        display: true,
        text: "Diario",
        fontSize: 30,
      },
    },
  });
});
