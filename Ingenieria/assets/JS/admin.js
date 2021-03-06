document.addEventListener('DOMContentLoaded',async function(){
    const btnVolver = document.querySelector('#volver');
    const formPermisos=document.getElementById('formPermisos');
    let db = new DataBase();
    let selectedUserId = sessionStorage.getItem("selectedId");
    let selectedUserEmail = sessionStorage.getItem("selectedEmail");
    let meterId = sessionStorage.getItem("id");
    console.log(selectedUserEmail,selectedUserId);
    document.getElementById("nombreUsuario").innerText=""+selectedUserEmail+" en el medidor "+await  db.getMeterName(meterId);

    // let btnSimular=document.getElementById('btnSimular');
    let formEliminar=document.getElementById('formEliminar');
    // medotos para modificar todos los permisos
    formPermisos.addEventListener('submit',async e=>{

        e.preventDefault();
        let rolModalPermisos=document.getElementById("rolModalPermisos");
        let selected = rolModalPermisos.options[rolModalPermisos.selectedIndex].text;
        await db.cambiarEl_RolEnMedidor(meterId,selectedUserId,selectedUserEmail,selected);
        alert('Cambio de rol exitoso');
    })
    btnVolver.addEventListener('click', e => {
        $(location).attr('href', "config.html");
    })
    // btnSimular.addEventListener('click',async e=>{
    //     // await db.simularLecturas(meterId);
    // })
    formEliminar.addEventListener('submit',async e=>{
        e.preventDefault();
        await db.eliminarUsuarioDeMedidor(meterId,document.getElementById('inputEmail').value)
        $(location).attr('href', "config.html");
    })
})