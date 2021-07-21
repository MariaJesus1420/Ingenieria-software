document.addEventListener("DOMContentLoaded", async function () {
  var xValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  var yValues = [
    1, 1, 2, 3, 5, 8, 7, 4, 2, 10, 8, 6, 5, 0, 8, 5, 11, 2, 3, 4, 8,
  ];

  let datosAnual1 = [];
  let datosAnual2 = [];

  let labelDatosAnual1;
  let labelDatosAnual2;

  const cargarAnual = async (year , datosAnual) => {
    
    let db = new DataBase();
    let meterId = "IpKIPkC3fIBHVH4YnMaE";
    let resumenAnual = await db.obtenerDocumento(
      `Readings/${meterId}/${year}`,
      "resumen"
    );
    for (let index = 1; index < 13; index++) {
      datosAnual[index - 1] = resumenAnual[`${index}`].total;
    }
    return year;
  };
  labelDatosAnual1 = await cargarAnual(new Date().getFullYear(), datosAnual1);
  labelDatosAnual2 = await cargarAnual(new Date().getFullYear()-1, datosAnual2);
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: datosAnual1,
        },
      ],
    },
    options: {
      legend: { display: true },
      title: {
        display: true,
        text: "Mensual",
        fontSize: 30,
      },
      scales: {
        yAxes: [
          { ticks: { min: Math.min(datosAnual1), max: Math.max(datosAnual1) } },
        ],
      },
    },
  });
  var xValuesM = [
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
  var yValuesM = [
    1, 1, 2, 3, 5, 8, 7, 4, 2, 10, 8, 6, 5, 0, 8, 5, 11, 2, 3, 4, 8,
  ];

  var yValuesM2 = [
    3, 4, 5, 36, 24, 4, 1, 3, 14, 5, 6, 5, 0, 8, 5, 11, 2, 3, 4, 8,
  ];
  new Chart("chartAnual", {
    type: "line",
    data: {
      labels: xValuesM,
      datasets: [
        {
          fill: true,
          lineTension: 0.4,
          label: labelDatosAnual1,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:  'rgba(255, 99, 132, 1)',
          data: datosAnual1,
        },
        {
          fill: true,
          lineTension: 0.4,
          label: labelDatosAnual2,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: datosAnual2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,

      title: {
        display: true,
        text: "Diario",
        fontSize: 30,
      },
    },
  });
  console.log(datosAnual1);
  console.log(Math.min(datosAnual1));
  new Chart("myChartMonth3", {
    type: "line",
    data: {
      labels: xValuesM,
      datasets: [
        {
          fill: true,
          tension: 0.3,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: yValuesM,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Anual",
        fontSize: 30,
      },
    },
  });
});
