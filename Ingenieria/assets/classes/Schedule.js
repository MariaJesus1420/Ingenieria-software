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
            let intervalo = 0;


            while (horarioUI[index][intervalo]) {
                this.dias[`d${index}`].desactivarHoras(horarioUI[index][intervalo][0], horarioUI[index][intervalo][1]);
                console.log(horarioUI[index][intervalo][0]);
                
                intervalo++;
            }



        }
    }
}