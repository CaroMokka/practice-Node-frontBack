const URL_BASE = "http://localhost:3000";

$(() => {
  $("#formulario").submit(function (e) {
    e.preventDefault();
    $("#msn-rut").html("");
    $("#msn-nombre").html("");
    $("#msn-apellido").html("");

    const rut = $("#txt-rut").val();
    const nombre = $("#txt-nombre").val();
    const apellido = $("#txt-apellido").val();

    // if(rut == "") return $("#msn-rut").html("Ingrese un rut válido");
    // if(nombre == "") return $("#msn-nombre").html("Ingrese un nombre");
    // if(apellido == "") return $("#msn-apellido").html("Ingrese un apellido");

    $(".error").addClass("d-none")


    $.ajax({
      method: "GET",
      url: `${URL_BASE}/registrar-persona`,
      data: {
        rut,
        nombre,
        apellido,
      },
      success: function (data) {
        // alert("ok")
      },
      error: function (error) {
          if(error.status == 409){
              $("#alert-validation").removeClass("d-none").html(error?.responseJSON?.message || "")
          } else {
              $("#alert-error").removeClass("d-none").html(error?.responseJSON?.message || "Error interno")
          }
      
      },
    });

    function listarRegistro(listado){
        $("#table tbody").html("")
        listado.forEach(persona => {
           
            $("#table tbody").append(`
                <tr>
                <td>${persona.id}</td>
                <td>${persona.rut}</td>
                <td>${persona.nombre}</td>   
                <td>${persona.apellido}</td>
                </tr>
            `);
        });
    }

    $.get(`${URL_BASE}/listar-registro`)
      .done(function (response) {
        const { data } = response
        listarRegistro(data)
          
      })
      .fail(function (error) {
        $("#table tbody").html(`
                <tr>
                    <td colspan="4" class="text-center text-danger">No es posible consultar las personas registradas</td>
                </tr>
            `);
      });
  });
});
