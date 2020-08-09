//Variables para almacenar los eventos
var pasados = [];
var hoy;
var eventos;

$(document).ready(function () {
  console.log("Corriendo pasados");
  //Se cargan los datos del info.json via AJAX
  $.ajax({
    url: "http://127.0.0.1:5500/ProyectoBase/info.json"
  }).done(function (resutaldo) {

    //Se guardan los resultados
    hoy = resutaldo.fechaActual;
    eventos = resutaldo.eventos;

    //Filtramos eventos pasados
    for (var i = 0; i < eventos.length; i++) {
      if (eventos[i].fecha < hoy) {
        pasados.push(eventos[i]);
      }
    }

    //Ordenamos los eventos, recientes primero
    pasados = pasados.sort(function(x,y) {
      if (x.fecha < y.fecha) {
        return 1;
      }
      else {
        return -1;
      }
    });

    //String para el HTML 
    var html = "";

    //Concatenamos todos los eventos en el HTML
    for (var j = 0; j < pasados.length; j++) {
      html += `
                <div class="col-12 bg-light mb-4 p-3 rounded">
                <a href="./detalle.html?id=${pasados[j].id}">${pasados[j].nombre}</a>
                <p class="text-muted">Fecha: ${pasados[j].fecha} - ${pasados[j].lugar}</p>
                <p>${pasados[j].descripcion}</p>
                <p id="invitados">Invitados: ${pasados[j].invitados}</p>
                </div>
              `
    }

    //Modificamos el DOM agregando el HTML
    document.getElementById("pasados").innerHTML = html
  })
});
