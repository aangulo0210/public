let valPassword = document.getElementById("password");
let valorEntradaPassword = valPassword.value;
//let valRepPassword = document.getElementById("repPassword");
//let valorRepEntradaPassword = valRepPassword.value;
let valEmail = document.getElementById("email");
let valorEntradaEmail = valEmail.value;

function validarEmail(a) {
  let valEmail = document.getElementById("email");
  let valorEntradaEmail = valEmail.value;
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(valorEntradaEmail)) {
    document.getElementById("mensajeEmail").innerText = "";
  } else {
    if (valorEntradaEmail.trim().length == 0) {
      document.getElementById("mensajeEmail").innerText =
        "El correo no puede estar vacio";
      console.log("Correo vacío");
    } else {
      document.getElementById("mensajeEmail").innerText =
        "Formato de correo no valido";
    }
  }
}

function validarPassword(b) {
  let valPassword = document.getElementById("password");
  let valorEntradaPassword = valPassword.value;
  if (valorEntradaPassword.trim().length == 0) {
    document.getElementById("mensajePassword").innerText =
      "Este campo no puede estar vacío";
  } else if (
    valorEntradaPassword.trim().length <= 7 &&
    valorEntradaPassword.trim().length > 0
  ) {
    document.getElementById("mensajePassword").innerText =
      "La contraseña no puede ser inferior a 8 caracteres";
  } else {
    document.getElementById("mensajePassword").innerText = "";
  }
}

function validarPasswordRep(c) {
  let valPassword = document.getElementById("password");
  let valorEntradaPassword = valPassword.value;
  let valRepPassword = document.getElementById("repPassword");
  let valorRepEntradaPassword = valRepPassword.value;
  if (valorRepEntradaPassword.trim().length == 0) {
    document.getElementById("mensajeRepPassword").innerText =
      "Este campo no puede estar vacío";
  } else if (valorEntradaPassword !== valorRepEntradaPassword) {
    document.getElementById("mensajeRepPassword").innerText =
      "La contraseñas no coinciden";
  } else {
    document.getElementById("mensajeRepPassword").innerText = "";
  }
}

function validarLoguin() {
  let valEmail = document.getElementById("email");
  let valorEntradaEmail = valEmail.value;
  let valPassword = document.getElementById("password");
  let valorEntradaPassword = valPassword.value;
  validarEmail(valorEntradaEmail);
  validarPassword(valorEntradaPassword);
}

function validarRegistro() {
  let valEmail = document.getElementById("email");
  let valorEntradaEmail = valEmail.value;
  let valPassword = document.getElementById("password");
  let valorEntradaPassword = valPassword.value;
  let valRepPassword = document.getElementById("repPassword");
  let valorRepEntradaPassword = valRepPassword.value;
  validarEmail(valorEntradaEmail);
  validarPassword(valorEntradaPassword);
  validarPasswordRep(valorRepEntradaPassword);
}

document.getElementById("useForm").addEventListener("submit", async (event) => {

  event.preventDefault();

  const reEmail = document.getElementById("email").value;
  const reContra = document.getElementById("password").value;
  const data = { 
    email: reEmail,
    password: reContra 
  };

  try {

    const response = await fetch("https:/f157-181-54-0-83.ngrok-free.app/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });


    if ( response.status ) {
      const responseData = await response.json();
      
      localStorage.setItem("token", responseData.token)

      window.location.href = "./../public/Bienvenido.html";

    }
  } catch (error) {
    console.log(error);
  }
});

document.addEventListener('DOMContentLoaded', () =>{ 

  const token = localStorage.getItem('token');

  if ( token ) {
    window.location.href = "./../public/Bienvenido.html"
  }

})
