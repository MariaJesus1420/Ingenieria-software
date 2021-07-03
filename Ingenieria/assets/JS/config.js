let btnAgregar = document.querySelector('#btnAgregarUsuario');
let inputIdMeter = document.querySelector('#inputIdMeter');
let inputIdUser= document.querySelector('#inputIdUser');
let inputEmail= document.querySelector('#inputEmail');
let inputRol= document.querySelector('#inputRol');
let btnEliminar= document.querySelector('#btnEliminarMedidor');
let mensajeError=document.querySelector("#mensajeError");
let contenidoConfig=document.querySelector("#v-pills-tabContent");
let meterId;
$(function () {
    console.log(document.referrer);
    
    console.log("READY");
    meterId= sessionStorage.getItem("id");
    console.log(meterId);

    if(meterId===""||meterId===null){
        console.log("NO ID");
        
        mensajeError.classList.remove("hideElement");
        mensajeError.classList.add("showElement");
        contenidoConfig.classList.remove("showElement");
        contenidoConfig.classList.add("hideElement");
    }else{
        console.log("ES ID");
        
        mensajeError.classList.add("hideElement");
        mensajeError.classList.remove("showElement");
        contenidoConfig.classList.add("showElement");
        contenidoConfig.classList.remove("hideElement");
    }
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
btnEliminar.addEventListener('click',async ()=>{
    let db = new DataBase();
    await db.eliminarDispositivo(inputIdMeter.value);
})
window.onbeforeunload = function(){
    if (document.referrer === "") {
        sessionStorage.removeItem("id");
      } else {
        // do foo
      }
};

window.onload = function(){
    if (document.referrer === "") {
        sessionStorage.removeItem("id");
      } else {
        // do foo
      }
};