document.addEventListener("DOMContentLoaded", async function () {
  var xValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  var yValues = [
    1, 1, 2, 3, 5, 8, 7, 4, 2, 10, 8, 6, 5, 0, 8, 5, 11, 2, 3, 4, 8,
  ];

  let numeroDias = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  let meterId = "a7DUMvS4Ls1g8hj2T8ju";
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

  let datosMensual1 = [];
  let datosMensual2 = [];

  let datosDiario1 = [];
  let datosDiario2 = [];

  let labelDatosMensual1;
  let labelDatosMensual2;

  let labelDatoDiarios1;
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

    console.log(resumenDiario);
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
    console.log(datosDiario);
    return nombreMeses[month];
  };
  labelDatoDiarios1 = await cargarDiario(
    new Date().getMonth(),
    new Date().getFullYear(),
    datosDiario1
  );
  labelDatosDiarios2 = await cargarDiario(
    new Date().getMonth() - 1,
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

  const laodCharts = () => {
    new Chart("chartActual", {
      type: "line",
      data: {
        labels: nombreHoras,
        datasets: [
          {
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: datosMensual1,
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

    new Chart("chartMensual", {
      type: "line",
      data: {
        labels: nombreMeses,
        datasets: [
          {
            fill: true,
            lineTension: 0.4,
            label: labelDatosMensual1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: datosMensual1,
          },
          {
            fill: true,
            lineTension: 0.4,
            label: labelDatosMensual2,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: datosMensual2,
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

    new Chart("chartDiario", {
      type: "line",
      data: {
        labels: numeroDias,
        datasets: [
          {
            label: labelDatoDiarios1,
            fill: true,
            tension: 0.3,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: datosDiario1,
          },
          {
            label: labelDatosDiarios2,
            fill: true,
            tension: 0.3,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: datosDiario2,
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
  };

  laodCharts();
});
