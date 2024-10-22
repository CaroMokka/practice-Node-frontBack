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

    if(rut == "") return $("#msn-rut").html("Ingrese un rut válido");
    if(nombre == "") return $("#msn-nombre").html("Ingrese un nombre");
    if(apellido == "") return $("#msn-apellido").html("Ingrese un apellido");

    // rut != "" ? rut : $("#msn-rut").html("Ingrese un rut válido");
    // nombre != "" ? nombre : $("#msn-nombre").html("Ingrese un nombre");
    // apellido != "" ? apellido : $("#msn-apellido").html("Ingrese un apellido");

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
        alert("Error");
      },
    });

    $.get(`${URL_BASE}/listar-registro`)
      .done(function (response) {
        console.log("Éxito de respuesta", response);
      })
      .fail(function (jqXHR, errorThrown) {
        console.log(
          "Error de respuesta",
          jqXHR.status,
          jqXHR.statusText,
          errorThrown
        );
      });
  });
});
