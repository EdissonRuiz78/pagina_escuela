$(document).ready(function () {
  console.log("Corriendo detalle");

  //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
  var identificador = location.search;
  let params = new URLSearchParams(identificador); 
  let id = parseInt(params.get("id"));

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "http://127.0.0.1:5500/ProyectoBase/info.json"
  }).done(function (resultado) {

  //Guarda el resultado en una variable
  var eventos = resultado.eventos;

  //Busca el elemento en el arreglo
  evento = eventos.find(function (element) {
    return element.id == id;
  })

  //Crea un string que contenga el HTML que describe el detalle del evento
  var html = `
              <div class="col-12 bg-light mb-4 p-3 rounded">
              <h2>${evento.nombre}</h2>
              <p class="text-muted">Fecha: ${evento.fecha} - ${evento.lugar}</p>
              <p>${evento.descripcion}</p>
              <p>Costo: ${evento.precio}</p>
              <p id="invitados">Invitados: ${evento.invitados}</p>
              </div>
  `

  //Modifica el DOM agregando el html generado dentro del div con id=evento
  document.getElementById("evento").innerHTML = html;

  });
});
