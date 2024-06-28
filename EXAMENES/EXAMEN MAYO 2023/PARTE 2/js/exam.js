$(document).ready(function () {
   // let eliminar = $("td")
   //    .find("button")
   //    .filter(function () {
   //       return $(this).text().trim() === "Delete";
   //    });

   // let enviar = $("td")
   //    .find("button")
   //    .filter(function () {
   //       return $(this).text().trim() === "Send";
   //    });

   $(".btn.btn-primary.w-100").click(function () {
      let row = $(this).closest("tr");
      let nombreCompleto = row.find("td:eq(0)").text().trim();
      let edad = row.find("td:eq(1)").text().trim();
      let puesto = row.find("td:eq(2)").text().trim();
      let localizacion = row.find("td:eq(3)").text().trim();

      let [nombre, apellido] = nombreCompleto.split(" ");

      // Crear objeto con los datos del empleado
      let employee = {
         firstname: nombre,
         lastname: apellido,
         age: edad,
         job: puesto,
         location: localizacion,
      };

      // Convertir objeto a JSON
      let employeeJSON = JSON.stringify(employee);

      // Crear objeto FormData y agregar el JSON como dato
      var formData = new FormData();
      formData.append("data", employeeJSON);

      // Enviar datos al servidor usando Fetch API
      fetch("http://localhost/exam/php/saveEmployee.php", {
         method: "POST",
         body: formData,
      })
         .then((response) => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
               throw new Error("Error al guardar el archivo.");
            }
         })
         .then((data) => {
            // Mostrar en consola mensaje de éxito
            console.log("Archivo guardado correctamente:", employee);
         })
         .catch((error) => console.error("Error:", error));
   });

   // Función para elimniar una fila de la tabla
   $(".btn.btn-secondary.w-100").click(function () {
      $(this).closest("tr").remove(); // Eliminar la fila correspondiente
   });
   
   // Función para agregar una nueva fila a la tabla
   function addRow(firstname, lastname, age, jobtitle, location) {
      let nombreCompleto = firstname + " " + lastname;
      let newRow = $("<tr>");

      // Crear celdas con los datos del empleado
      newRow.append($("<td>").text(nombreCompleto));
      newRow.append($("<td>").text(age));
      newRow.append($("<td>").text(jobtitle));
      newRow.append($("<td>").text(location));

      // Botón de enviar (Send)
      let sendButton = $("<button>").text("Send").addClass("btn btn-primary w-100");
      $("td")
         .find("button")
         .filter(function () {
            return $(this).text().trim() === "Send";
         })
         .addClass("btn btn-primary w-100");

      // Botón de eliminar (Delete)
      let deleteButton = $("<button>").text("Delete").addClass("btn btn-secondary w-100");

      // Agregar botones a la nueva fila
      newRow.append($("<td>").append(sendButton));
      newRow.append($("<td>").append(deleteButton));

      // Agregar la nueva fila a la tabla
      $("table tbody").append(newRow);
   }

   // Botón para crear una nueva fila con los datos ingresados
   $('.btn-primary:contains("Create")').click(function () {
      // Definir campos requeridos y sus identificadores
      let fields = [
         { id: "#validationDefault01", name: "First name" },
         { id: "#validationDefault02", name: "Last name" },
         { id: "#validationDefault03", name: "Age" },
         { id: "#validationDefault04", name: "Job Title" },
         { id: "#validationDefault05", name: "Location" },
      ];

      let valid = true;
      let firstname, lastname, age, jobtitle, location;

      // Validar que todos los campos estén llenos
      fields.forEach((field) => {
         let value = $(field.id).val().trim();
         if (!value) {
            alert(`El campo "${field.name}" es obligatorio.`);
            valid = false;
         } else {
            switch (field.name) {
               case "First name":
                  firstname = value;
                  break;
               case "Last name":
                  lastname = value;
                  break;
               case "Age":
                  age = value;
                  break;
               case "Job Title":
                  jobtitle = value;
                  break;
               case "Location":
                  location = value;
                  break;
            }
         }
      });

      if (!valid) {
         return;
      }

      // Llamar a la función para agregar una nueva fila con los datos ingresados
      addRow(firstname, lastname, age, jobtitle, location);

      // Limpiar el formulario después de agregar la fila
      $("form")[0].reset();
   });

   // Botón para obtener datos aleatorios del servidor
   $('.btn-secondary:contains("Get Random")').click(function () {
      // Obtener datos aleatorios del servidor usando Fetch API
      fetch("http://localhost/exam/php/getEmployee.php")
         .then((response) => response.json())
         .then((data) => {
            // Mostrar los datos obtenidos en los campos correspondientes del formulario
            $("#validationDefault01").val(data.firstname);
            $("#validationDefault02").val(data.lastname);
            $("#validationDefault03").val(data.age);
            $("#validationDefault04").val(data.jobtitle);
            $("#validationDefault05").val(data.location);
         })
         .catch((error) => console.error("Error:", error));
   });
});
