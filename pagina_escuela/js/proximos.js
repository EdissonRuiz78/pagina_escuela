//Variables para almacenar los eventos
var proximos = [];
var hoy;
var eventos;

$(document).ready(function () {
  console.log("Corriendo proximos");

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "http://127.0.0.1:5500/ProyectoBase/info.json"
  }).done(function (resultado) {

    //Guarda el resultado en variables
    hoy = resultado.fechaActual;
    eventos = resultado.eventos;

    //Selecciona los eventos que sean posteriores a la fecha actual del JSON
    for (var i = 0; i < eventos.length; i++) {
      if (eventos[i].fecha > hoy) {
        proximos.push(eventos[i]);
      }
    }

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    proximos = proximos.sort(function(x,y) {
      if (x.fecha > y.fecha) {
        return 1;
      }
      else {
        return -1;
      }
    });

    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = "";

    //Recorre el arreglo y concatena el HTML para cada evento
    for (var j = 0; j < proximos.length; j++) {
      html += `
                <div class="col-12 bg-light mb-4 p-3 rounded">
                <a href="./detalle.html?id=${proximos[j].id}">${proximos[j].nombre}</a>
                <p class="text-muted">Fecha: ${proximos[j].fecha} - ${proximos[j].lugar}</p>
                <p>${proximos[j].descripcion}</p>
                <p id="invitados">Invitados: ${proximos[j].invitados}</p>
                </div>
              `
    }

    //Modifica el DOM agregando el html generado dentro del div con id=evento
    document.getElementById("proximos").innerHTML = html;

  });
});
