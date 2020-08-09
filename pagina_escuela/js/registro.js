function limpiarErrores() {
  var errores = document.getElementsByClassName("error");
  for (var i = 0; i < errores.length; i++) {
    errores[i].innerHTML = "";
  }
}

function validar(formulario) {
  limpiarErrores();
  console.log("Corriendo validar");
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (formulario.nombres.value.trim() == 0) {
    document.getElementById("errornombres").innerText = "Este campo es obligatorio";
    return false;
  }

  else if (!re.test(formulario.email.value)) {
    document.getElementById("errorEmail").innerText = "Campo invàlido";
    return false;
  }

  else if (formulario.contrasena.value.trim() < 7) {
    document.getElementById("errorContrasena").innerText = "Debe tener al menos 7 caracteres";
    return false;
  }

  else if (formulario.contrasena.value != formulario.confirmacion.value) {
    document.getElementById("errorConfirmacion").innerText = "No coincide con contraseña";
    return false;
  }

  else if (formulario.tipo.value == -1) {
    document.getElementById("errorTipo").innerText = "Este campo es obligatorio";
    return false;
  }

  else if (!formulario.acepto.checked) {
    document.getElementById("errorAcepto").innerText = "Este campo es obligatorio";
    return false;
  }

  alert("Registro exitoso!");

}
