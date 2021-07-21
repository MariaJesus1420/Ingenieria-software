document.addEventListener('DOMContentLoaded',async function(){
    const btnSalir = document.querySelector('#salir');
    const formPermisos=document.getElementById('formPermisos');
    let db = new DataBase();
    let selectedUserId = sessionStorage.getItem("selectedId");
    let selectedUserEmail = sessionStorage.getItem("selectedEmail");
    let meterId = sessionStorage.getItem("id");
    console.log(selectedUserEmail,selectedUserId);
    document.getElementById("nombreUsuario").innerText=""+selectedUserEmail+" en el medidor "+meterId;
    // medotos para modificar todos los permisos
    formPermisos.addEventListener('submit',async e=>{
        e.preventDefault();
        let switchNombre=document.getElementById("switchNombre").checked;
        let switchfunciones=document.getElementById("switchfunciones").checked;
        let switchHorario=document.getElementById("switchHorario").checked;
        let rolModalPermisos=document.getElementById("rolModalPermisos");
        let selected = rolModalPermisos.options[rolModalPermisos.selectedIndex].text;
        console.log(meterId,selectedUserId,selectedUserEmail,selected,switchNombre,switchfunciones,switchHorario);
        // await db.addPermisosUserEnMedidor(meterId,selectedUserId,selectedUserEmail,selected,switchNombre,switchHorario,switchfunciones);
    })
    btnSalir.addEventListener('click', e => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("salio de la sesion");
            $(location).attr('href', "index.html");
        }).catch((error) => {
            // An error happened.
        });
    
    })
})