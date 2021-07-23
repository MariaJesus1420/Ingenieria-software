document.addEventListener('DOMContentLoaded',async function(){
    const btnVolver = document.querySelector('#volver');
    const formPermisos=document.getElementById('formPermisos');
    let db = new DataBase();
    let selectedUserId = sessionStorage.getItem("selectedId");
    let selectedUserEmail = sessionStorage.getItem("selectedEmail");
    let meterId = sessionStorage.getItem("id");
    console.log(selectedUserEmail,selectedUserId);
    document.getElementById("nombreUsuario").innerText=""+selectedUserEmail+" en el medidor "+meterId;
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
        $(location).attr('href', "loged.html");
    })
    // btnSimular.addEventListener('click',async e=>{
    //     // await db.simularLecturas(meterId);
    // })
    formEliminar.addEventListener('submit',async e=>{
        e.preventDefault();
        await db.eliminarUsuarioDeMedidor(meterId,document.getElementById('inputEmail').value)
        $(location).attr('href', "loged.html");
    })
    // document.getElementById('formTest').addEventListener('submit',e=>{
    //     e.preventDefault();
    //     const email=e.target.email.value;
    //     firebase
    //     .firestore()
    //     .collection("Notificacion")
    //     .add({email})
    //     .then(r=>{
    //         console.log(r);
    //         alert('se');
    //     })
    //   })
})