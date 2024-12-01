

document.addEventListener("DOMContentLoaded", async() => {

    const token = localStorage.getItem('token')

    if (!token) {
        window.location.href = "./../public/index.html"
    }

    const response = await fetch('https:/f157-181-54-0-83.ngrok-free.app/api/getUsers', {
        headers: {
            "Authorization": "Bearer "+ token
        }
    })

    const data = await response.json();

    if ( !data.status ) {
        window.location.href = "./../public/Usuarios.html"
    }

    const listausers = data.users;
    const tableBody = document.querySelector("#usersTable")
    let filas = ""; // Inicializamos la variable para almacenar las filas como cadena
    const modalBody = document.querySelector('.modal-body');
    const titleModal = document.querySelector('.modal-title');
    // Iteramos sobre cada usuario y generamos las filas
    listausers.forEach(user => {
        filas += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button
                        data-id="${user.id}"
                        data-name="${user.name}"
                        data-email="${user.email}"
                        data-role="${user.role}"
                        class="btn btn-primary editUsersBtn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#staticBackdrop"
                    >
                        Opciones
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = filas;

    const botonEditar = document.querySelectorAll(".editUsersBtn");
    const guardarUsuarioBtn = document.querySelector('#guardarUsuarioBtn');
    const botonEliminar = document.querySelectorAll(".deleteUsersBtn");

    botonEditar.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            const name = btn.getAttribute('data-name');
            const email = btn.getAttribute('data-email');
            const role = btn.getAttribute('data-role');
            const id   = btn.getAttribute('data-id')       
            
            modalBody.innerHTML = "";

            titleModal.innerHTML = "Editar Usuario";

            const formulario = `
                <form id="GuardarUsuarioEdit">
                    <input
                        type="hidden"
                        value="${id}"
                        id="id"
                    ></input>
                    <label for="floatingInput">Nombre</label>
                    <input
                        value="${name}"
                        id="nameInput"
                        placeholder="Nombre de usuario"
                        class="form-control mt-2 mb-1"
                        type="text"
                        name="name"
                    ></input>
                    <label for="floatingInput">Email</label>
                    <input
                        value="${email}"
                        placeholder="Email"
                        class="form-control mt-2 mb-1"
                        type="text"
                        name="email"
                        id="emailInput"
                    ></input>
                    <label for="floatingInput">Role: admin o user</label>
                     <input
                        value="${role}"
                        placeholder="Rol"
                        class="form-control mt-2 mb-1"
                        type="text"
                        name="role"
                        id="roleInput"
                    ></input>
                    <label for="floatingInput">Contraseña</label>
                    <input
                        value=""
                        placeholder="Digite la nueva contraseña"
                        class="form-control mt-2 mb-1"
                        type="password"
                        name="password"
                        id="passwordInput"
                    ></input>
                </form>
            `;

            modalBody.innerHTML = formulario;  

        });
    })

    botonEliminar.forEach(btn => {
        btn.addEventListener("click", (event)=>{
            event.preventDefault();

            const name = btn.getAttribute('data-name');
            const id   = btn.getAttribute('data-id');
            const email = btn.getAttribute('data-email');

            modalBody.innerHTML = "";

            titleModal.innerHTML = "Eliminar Usuario";


            const formulario = `
                <form id="EliminarUsuarioEdit">
                <p>¿Desea eliminar el siguiente usuario?</p>
                    <input
                        type="hidden"
                        value="${id}"
                        id="id"
                    ></input>
                    <label for="floatingInput">Nombre</label>
                    <input
                        id="disabledTextInput"
                        placeholder="${name}"
                        class="form-control mt-2 mb-1"
                        type="text"
                        name="name"
                    ></input>
                    <label for="floatingInput">Correo</label>
                    <input
                        id="disabledTextInput"
                        placeholder="${email}"
                        class="form-control mt-2 mb-1"
                        type="text"
                        name="email"
                    ></input>
                </form>
            `;

            modalBody.innerHTML=formulario;
            guardarUsuarioBtn.setAttribute("type","hidden")

        })
    })

    guardarUsuarioBtn.addEventListener('click', async() => {
        const formulario = document.querySelector('#GuardarUsuarioEdit');
        
        const name = formulario.querySelector('input#nameInput').value;
        const email = formulario.querySelector('input#emailInput').value;
        const password = formulario.querySelector('input#passwordInput').value;
        const role = formulario.querySelector('input#roleInput').value;
        const id = formulario.querySelector('input#id').value;
        
        const data = {
            name,
            email,
            password,
            role
        }
        
        const token = localStorage.getItem('token');
        
        const response = await fetch(`https:/f157-181-54-0-83.ngrok-free.app/api/user/update/${id}`, {
            headers: {
                "Authorization": "Bearer "+ token,
                "content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        });
        
        const dataResponse = await response.json();
        
        if (dataResponse.status) {
            console.log(dataResponse.message);
            window.location.reload();
        }
        
    });
    
    const eliminarUsuarioBtn = document.querySelector('#eliminarUsuarioBtn');
    eliminarUsuarioBtn.addEventListener('click', async() => {

        const formulario = document.querySelector('#GuardarUsuarioEdit');
        
        const name = formulario.querySelector('input#nameInput').value;
        const email = formulario.querySelector('input#emailInput').value;
        const password = formulario.querySelector('input#passwordInput').value;
        const role = formulario.querySelector('input#roleInput').value;
        const id = formulario.querySelector('input#id').value;

        const data = {
            name,
            email,
            password,
            role
        }

        const token = localStorage.getItem('token');

        const response = await fetch(`https:/f157-181-54-0-83.ngrok-free.app/api/user/delete/${id}`, {
            headers: {
                "Authorization": "Bearer "+ token,
                "content-type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify(data)
        });

        const dataResponse = await response.json();

        if (dataResponse.status) {
            console.log(dataResponse.message);
            window.location.reload();
        }

    });

    const salirUsuarioBtn = document.querySelector('#salirUsuarioBtn');
    salirUsuarioBtn.addEventListener('click', async() => {
     localStorage.removeItem('token');
     window.location.href = "./../public/index.html"
     window.location.reload();
    })
})