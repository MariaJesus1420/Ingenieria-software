class Schedule {
    dias = {};
    esActual;

    constructor(esActual) {
        this.esActual = esActual;
        this.initListaDias();
    }

    initListaDias() {

        for (let index = 0; index < 7; index++) {
            this.dias[`d${index}`] = new Day()

        }
    }

    actualizar(horarioUI) {
     
        for (let index = 0; index < 7; index++) {
            if (horarioUI[index][0] && horarioUI[index][0]) {
              

                this.dias[`d${index}`].desactivarHoras(horarioUI[index][0][0], horarioUI[index][0][1]);
            }

        }
    }
}