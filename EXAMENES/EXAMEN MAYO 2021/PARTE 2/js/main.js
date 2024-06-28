$(document).ready(function () {
   // $('#tabledata .row:not(.header)').remove(); // Esta línea está comentada, se utiliza para eliminar todas las filas excepto el encabezado

   // Función para crear una nueva fila en la tabla
   $("button:eq(0)").click(function () {
      // Obtener los valores de los campos de entrada
      let firstName = $('input[tabindex="1"]').val().trim();
      let lastName = $('input[tabindex="2"]').val().trim();
      let age = $('input[tabindex="3"]').val().trim();
      let jobTitle = $('input[tabindex="4"]').val().trim();
      let location = $('input[tabindex="5"]').val().trim();

      // Validar que todos los campos estén llenos
      if (firstName === "" || lastName === "" || age === "" || jobTitle === "" || location === "") {
         alert("Todos los campos son obligatorios");
         return;
      }

      // Validar que la edad sea un número entero positivo
      if (isNaN(age) || parseInt(age) <= 0) {
         alert("La edad debe ser un número entero positivo");
         return;
      }

      // Crear una nueva fila con los datos ingresados
      let newRow =
         '<div class="row">\n' +
         '    <div class="cell" data-title="Full Name">' +
         firstName +
         " " +
         lastName +
         "</div>\n" +
         '    <div class="cell" data-title="Age">' +
         age +
         "</div>\n" +
         '    <div class="cell" data-title="Job Title">' +
         jobTitle +
         "</div>\n" +
         '    <div class="cell" data-title="Location">' +
         location +
         "</div>\n" +
         '    <div class="cell">\n' +
         '        <button class="send-btn" type="button">Send</button>\n' +
         "    </div>\n" +
         '    <div class="cell">\n' +
         '        <button class="delete-btn" type="button">Delete</button>\n' +
         "    </div>\n" +
         "</div>";

      // Agregar la nueva fila a la tabla
      $("#tabledata").append(newRow);
      // Resetear el formulario
      $("#contact")[0].reset();
   });

   // Añadir la clase "delete-btn" a los botones de eliminación existentes
   $("div")
      .find("button")
      .filter(function () {
         return $(this).text().trim() === "Delete";
      })
      .addClass("delete-btn");

   // Función para eliminar una fila de la tabla
   $(document).on("click", ".delete-btn", function () {
      $(this).closest(".row").remove();
   });

   // Función para obtener datos aleatorios del servidor PHP
   $('button[name="getrandom"]').click(function () {
      $.ajax({
         url: "http://localhost/exam/php/getEmployee.php",
         type: "GET",
         dataType: "json",
         success: function (data) {
            // Actualizar los campos del formulario con los datos obtenidos
            $('input[tabindex="1"]').val(data.firstname);
            $('input[tabindex="2"]').val(data.lastname);
            $('input[tabindex="3"]').val(data.age);
            $('input[tabindex="4"]').val(data.jobtitle);
            $('input[tabindex="5"]').val(data.location);
         },
         error: function (error) {
            console.log(error);
         },
      });
   });

   // Añadir la clase "send-btn" a los botones de envío existentes
   $("div")
      .find("button")
      .filter(function () {
         return $(this).text().trim() === "Send";
      })
      .addClass("send-btn");

   // Función para enviar datos de un empleado al servidor
   $(document).on("click", ".send-btn", function () {
      // Obtener los datos de la fila correspondiente
      let fullName = $(this).closest(".row").find('.cell[data-title="Full Name"]').text().trim();
      let age = $(this).closest(".row").find('.cell[data-title="Age"]').text().trim();
      let jobTitle = $(this).closest(".row").find('.cell[data-title="Job Title"]').text().trim();
      let location = $(this).closest(".row").find('.cell[data-title="Location"]').text().trim();

      // Crear un objeto con los datos del empleado
      let employeeData = {
         firstname: fullName.split(" ")[0],
         lastname: fullName.split(" ")[1],
         age: parseInt(age),
         jobtitle: jobTitle,
         location: location,
      };

      // Convertir el objeto a formato JSON
      let employeeJSON = JSON.stringify(employeeData);

      // Crear un objeto FormData y agregar el JSON
      let formData = new FormData();
      formData.append("data", employeeJSON);

      // Enviar los datos al servidor
      $.ajax({
         url: "http://localhost/exam/php/saveEmployee.php",
         type: "POST",
         processData: false,  // No procesar los datos de FormData
         contentType: false,  // No establecer el tipo de contenido
         data: formData, // Usar el FormData que contiene el JSON
         success: function (response) {
            console.log(`Empleado enviado: ${employeeData.firstname}`);
         },
         error: function (error) {
            console.log(error);
         },
      });
   });
});
