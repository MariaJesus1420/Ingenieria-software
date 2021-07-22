document.addEventListener('DOMContentLoaded',async function(){
    const btnVolver = document.querySelector('#volver');
    const formPermisos=document.getElementById('formPermisos');
    let db = new DataBase();
    let selectedUserId = sessionStorage.getItem("selectedId");
    let selectedUserEmail = sessionStorage.getItem("selectedEmail");
    let meterId = sessionStorage.getItem("id");
    console.log(selectedUserEmail,selectedUserId);
    document.getElementById("nombreUsuario").innerText=""+selectedUserEmail+" en el medidor "+meterId;
    let btnLecturas=document.getElementById('btnLecturas');
    // medotos para modificar todos los permisos
    formPermisos.addEventListener('submit',async e=>{
        e.preventDefault();
        let rolModalPermisos=document.getElementById("rolModalPermisos");
        let selected = rolModalPermisos.options[rolModalPermisos.selectedIndex].text;
        // console.log(meterId,selectedUserId,selectedUserEmail,selected,switchNombre,switchfunciones,switchHorario);
        await db.cambiarEl_RolEnMedidor(meterId,selectedUserId,selectedUserEmail,selected);
        alert('Cambio de rol exitoso');
    })
    btnVolver.addEventListener('click', e => {
        $(location).attr('href', "loged.html");
    })
    
})