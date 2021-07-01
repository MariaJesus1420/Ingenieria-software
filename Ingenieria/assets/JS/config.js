let btnAgregar = document.querySelector('#btnAgregarUsuario');
let inputIdMeter = document.querySelector('#inputIdMeter');
let inputIdUser= document.querySelector('#inputIdUser');
let inputEmail= document.querySelector('#inputEmail');
let inputRol= document.querySelector('#inputRol');

$(function () {
    console.log("READY");
    $('#weekly-schedule').dayScheduleSelector({
        /* options */

        // Sun - Sat
        days: [0, 1, 2, 3, 4, 5, 6],

        // HH:mm format
        startTime: '00:00',

        // HH:mm format       
        endTime: '24:00',

        // minutes                
        interval: 30,

        stringDays: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
    });
    console.log("HOLAAA");
});

btnAgregar.addEventListener('click', async() => {
    let db = new DataBase();
    console.log("ADDING NEW METER");
    console.log(inputIdMeter.value);
    console.log(inputIdUser.value);
    await db.agregarDispositivo(inputIdMeter.value, inputIdUser.value, inputEmail.value, inputRol.value);

    console.log("DONE ADDING");

})