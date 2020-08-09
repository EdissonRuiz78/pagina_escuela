//Variables para almacenar los eventos
var pasados = [];
var proximos = [];
var hoy;
var eventos;

$(document).ready(function () {
  console.log("Corriendo index");

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "http://127.0.0.1:5500/ProyectoBase/info.json"
  }).done(function (resultado) {

    //Guarda el resultado en variables
    hoy = resultado.fechaActual;
    eventos = resultado.eventos;

    //Clasifica los eventos segun la fecha actual del JSON
    for (var i = 0; i < eventos.length; i++) {
      if (eventos[i].fecha < hoy) {
        pasados.push(eventos[i]);
      }
      else {
        proximos.push(eventos[i]);
      }
    }
 
    //Ordena los eventos pasados segun la fecha (los mas cercanos primero)
    pasados = pasados.sort(function(x,y) {
      if (x.fecha < y.fecha){
        return 1;
      }
      else {
        return -1;
      }
    });

    //Ordena los eventos proximos segun la fecha (los mas cercanos primero)
    proximos = proximos.sort(function(x,y) {
      if (x.fecha > y.fecha){
        return 1;
      }
      else {
        return -1;
      }
    });

    //String para el HTML eventos proximos
    var html = "";

    //Concatenamos todos los eventos en el HTML
    for (var j = 0; j < 2; j++) {
      html += `
                <div class="col-12 col-md-5 bg-light m-3 p-3 rounded">
                <a href="./detalle.html?id=${proximos[j].id}">${proximos[j].nombre}</a>
                <p class="text-muted">Fecha: ${proximos[j].fecha} - ${proximos[j].lugar}</p>
                <p>${proximos[j].descripcion}</p>
                </div>
              `
    }

    //String para el HTML eventos pasados
    var html1 = "";

    //Concatenamos todos los eventos en el HTML
    for (var k = 0; k < 2; k++) {
      html1 += `
                <div class="col-12 col-md-5 bg-light m-3 p-3 rounded">
                <a href="./detalle.html?id=${pasados[k].id}">${pasados[k].nombre}</a>
                <p class="text-muted">Fecha: ${pasados[k].fecha} - ${pasados[k].lugar}</p>
                <p>${pasados[k].descripcion}</p>
                </div>
              `
    }

    //Modificamos el DOM agregando el HTML
    document.getElementById("proximos").innerHTML = html;
    document.getElementById("pasados").innerHTML = html1;

  })

});
