var xValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var yValues = [1,1,2,3,5,8,7,4,2,10,8,6,5,0,8,5,11,2,3,4,8];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Consumo mensual",
      fontSize: 30
    },
    scales: {
      yAxes: [{ticks: {min: 1, max:20}}],
    }

  }
});
var xValuesM = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var yValuesM = [1,1,2,3,5,8,7,4,2,10,8,6,5,0,8,5,11,2,3,4,8];
new Chart("myChartMonth", {
  type: "line",
  data: {
    labels: xValuesM,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      data: yValuesM
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Consumo anual",
      fontSize: 30
    },
    scales: {
      yAxes: [{ticks: {min: 1, max:20}}],
    }

  }
});
 