// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
   // Función para mostrar retroalimentación visual y mensajes de validación
   function showFeedBack(input, valid, message) {
      const validClass = valid ? "is-valid" : "is-invalid"; // Clase CSS para indicar si el campo es válido o no
      const messageDiv = valid ? input.parentElement.querySelector("div.valid-feedback") : input.parentElement.querySelector("div.invalid-feedback"); // Obtener el div que muestra el mensaje de retroalimentación
      for (const div of input.parentElement.getElementsByTagName("div")) {
         // Ocultar todos los divs de retroalimentación
         div.classList.remove("d-block");
         div.classList.add("d-none");
      }
      messageDiv.classList.remove("d-none"); // Mostrar el div de retroalimentación correspondiente
      messageDiv.classList.add("d-block");
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
      input.classList.add(validClass); // Agregar la clase CSS para indicar si el campo es válido o no
      if (message) {
         messageDiv.textContent = message; // Mostrar el mensaje de retroalimentación
      }
   }

   // Obtener el formulario
   let form = document.querySelector("form");

   let nameElement = document.getElementById("validationDefault01");
   let lastNameElement = document.getElementById("validationDefault02");
   let ageElement = document.getElementById("validationDefault03");
   let jobElement = document.getElementById("validationDefault04");
   let locationElement = document.getElementById("validationDefault05");

   // Añadir eventos de blur e input para validar los campos del formulario mientras el usuario escribe o sale del campo
   nameElement.addEventListener("blur", validateName); // Validar el nombre cuando pierde el foco
   nameElement.addEventListener("input", validateName); // Validar el nombre mientras se escribe

   lastNameElement.addEventListener("blur", validateLastName); // Validar el apellido cuando pierde el foco
   lastNameElement.addEventListener("input", validateLastName); // Validar el apellido mientras se escribe

   ageElement.addEventListener("blur", validateAge); // Validar la edad cuando pierde el foco
   ageElement.addEventListener("input", validateAge); // Validar la edad mientras se escribe

   jobElement.addEventListener("blur", validateJob); // Validar el trabajo cuando pierde el foco
   jobElement.addEventListener("input", validateJob); // Validar el trabajo mientras se escribe

   locationElement.addEventListener("blur", validateLocation); // Validar la ubicación cuando pierde el foco
   locationElement.addEventListener("input", validateLocation); // Validar la ubicación mientras se escribe

   // Función para validar el nombre
   function validateName() {
      let nombre = nameElement.value; // Obtener el valor del campo de nombre
      if (!nombre) {
         // Si el campo está vacío
         showFeedBack(nameElement, false, "Por favor, ingresa un nombre."); // Mostrar retroalimentación de error
         return false; // Devolver falso para indicar que la validación falló
      } else {
         showFeedBack(nameElement, true); // Mostrar retroalimentación de éxito
      }
      return true; // Devolver verdadero para indicar que la validación fue exitosa
   }

   // Función para validar el apellido
   function validateLastName() {
      let apellido = lastNameElement.value; // Obtener el valor del campo de apellido
      if (!apellido) {
         // Si el campo está vacío
         showFeedBack(lastNameElement, false, "Por favor, ingresa un apellido."); // Mostrar retroalimentación de error
         return false; // Devolver falso para indicar que la validación falló
      } else {
         showFeedBack(lastNameElement, true); // Mostrar retroalimentación de éxito
      }
      return true; // Devolver verdadero para indicar que la validación fue exitosa
   }

   // Función para validar la edad
   function validateAge() {
      let edad = ageElement.value; // Obtener el valor del campo de edad
      if (!edad || isNaN(edad) || edad < 16) {
         // Si la edad está vacía, no es un número o es menor que 16
         showFeedBack(ageElement, false, "Por favor, ingresa una edad válida."); // Mostrar retroalimentación de error
         return false; // Devolver falso para indicar que la validación falló
      } else {
         showFeedBack(ageElement, true); // Mostrar retroalimentación de éxito
      }
      return true; // Devolver verdadero para indicar que la validación fue exitosa
   }

   // Función para validar el puesto de trabajo
   function validateJob() {
      let puesto = jobElement.value; // Obtener el valor del campo de puesto de trabajo
      if (!puesto) {
         // Si el campo está vacío
         showFeedBack(jobElement, false, "Por favor, ingresa un puesto de trabajo."); // Mostrar retroalimentación de error
         return false; // Devolver falso para indicar que la validación falló
      } else {
         showFeedBack(jobElement, true); // Mostrar retroalimentación de éxito
      }
      return true; // Devolver verdadero para indicar que la validación fue exitosa
   }

   // Función para validar la ubicación
   function validateLocation() {
      let localizacion = locationElement.value.trim(); // Obtener el valor del campo de ubicación y eliminar espacios en blanco al principio y al final
      if (!localizacion) {
         // Si el campo está vacío
         showFeedBack(locationElement, false, "Por favor, ingresa una ubicación."); // Mostrar retroalimentación de error
         return false; // Devolver falso para indicar que la validación falló
      } else {
         showFeedBack(locationElement, true); // Mostrar retroalimentación de éxito
      }
      return true; // Devolver verdadero para indicar que la validación fue exitosa
   }

   // Obtener el cuerpo de la tabla donde se añadirán las nuevas filas
   let table = document.querySelector("table tbody");
   // Agregar un evento 'click' al botón con la clase 'btn btn-primary'
   document.querySelector(".btn.btn-primary").addEventListener("click", function (e) {
      e.preventDefault(); // Evitar que el formulario se envíe automáticamente
      // Obtener los valores de los campos del formulario
      let nombre = nameElement.value;
      let apellido = lastNameElement.value;
      let edad = ageElement.value;
      let puesto = jobElement.value;
      let localizacion = locationElement.value;
      let validForm = true; // Variable para rastrear la validez del formulario

      // Validar cada campo del formulario
      if (!validateName() || !validateLastName() || !validateAge() || !validateJob() || !validateLocation()) {
         validForm = false; // Si algún campo no es válido, establecer validForm como falso
      }

      // Si el formulario es válido, agregar una nueva fila a la tabla
      if (validForm) {
         // Añadir la nueva fila al cuerpo de la tabla
         table.insertAdjacentHTML("beforeend", `<tr><td>${nombre} ${apellido}</td><td>${edad}</td><td>${puesto}</td><td>${localizacion}</td></tr>`);

         // Mostrar un modal con el resultado
         document.querySelector(".modal-title").textContent = "Resultado";
         document.querySelector(".modal-body").textContent = `Empleado añadido: ${nombre} ${apellido}`;
         $("#exampleModal").modal("show"); // Mostrar el modal
         // Resetear el formulario para limpiar los campos
         form.reset();
      } else {
         // Si el formulario no es válido, mostrar un modal con un mensaje de error
         document.querySelector(".modal-title").textContent = "ERROR";
         document.querySelector(".modal-body").textContent = `Hay campos que no son validos en el formulario`;
         $("#exampleModal").modal("show"); // Mostrar el modal
         showFeedBack();
      }
   });

   // Obtener el área de texto donde se mostrarán los datos del empleado seleccionado
   let textarea = document.getElementById("selected-employee");

   // Variable para almacenar la fila seleccionada actualmente
   let selectedRow = null;

   // Agregar un evento 'click' al cuerpo de la tabla
   table.addEventListener("click", function (event) {
      // Verificar si el elemento clicado es una celda de la tabla (TD)
      if (event.target.tagName === "TD") {
         // Obtener la fila (TR) correspondiente a la celda clicada
         let row = event.target.parentNode;

         // Verificar si la fila clicada ya está seleccionada
         if (selectedRow === row) {
            // Si la fila ya está seleccionada, deseleccionarla y limpiar el área de texto
            row.classList.remove("selected");

            selectedRow = null;
            textarea.value = "";
         } else {
            // Si hay otra fila seleccionada, quitar la selección de la fila anterior
            if (selectedRow) {
               selectedRow.classList.remove("selected");
            }
            // Seleccionar la nueva fila clicada
            row.classList.add("selected");
            selectedRow = row;

            // Crear un objeto para almacenar los datos de la fila seleccionada
            let data = {};
            // Obtener el nombre completo del primer td
            let nombreCompleto = row.querySelector("td").textContent;
            // Separar el nombre y apellidos
            let nombresApellidos = nombreCompleto.split(" ");
            data["Nombre"] = nombresApellidos[0];
            data["Apellidos"] = nombresApellidos.slice(1).join(" "); // Concatenar los apellidos
            // Obtener los datos de las celdas de la fila y almacenarlos en el objeto
            row.querySelectorAll("td").forEach((td, index) => {
               if (index > 0) {
                  // Comenzar a contar desde el segundo <td> para obtener los datos de edad, puesto y localización
                  let keys = ["Edad", "Puesto", "Localización"];
                  data[keys[index - 1]] = td.textContent; // Restar 1 al índice para mapear correctamente las claves
               }
            });

            // Mostrar los datos del empleado seleccionado en el área de texto en formato JSON
            textarea.value = JSON.stringify(data, null, 2);
         }
      }
   });

   // Agregar un evento 'click' al botón de eliminar
   document.querySelector(".btn.btn-secondary.w-100").addEventListener("click", function (event) {
      // Prevenir el evento 'click' de la celda de la tabla
      event.stopPropagation();
      // Elimina la fila y limpia el textarea
      if (selectedRow) {
         selectedRow.remove();
         selectedRow = null;
         textarea.value = "";
      }
   });

   // Agregar un evento de clic al botón de envío
   document.querySelector(".btn.btn-primary.w-100").addEventListener("click", function (event) {
      // Obtener la fila seleccionada
      let rowSelected = document.querySelector(".selected");

      // Comprobar si se ha seleccionado una fila
      if (rowSelected) {
         // Obtener los valores de cada celda de la fila seleccionada
         let fullName = rowSelected.children[0].textContent; // Nombre completo
         let arrFullName = fullName.split(" "); // Dividir el nombre completo en nombre y apellido
         let nombre = arrFullName[0]; // Nombre
         let apellido = arrFullName.splice(1).join(" "); // Apellido
         let edad = rowSelected.children[1].textContent; // Edad
         let puesto = rowSelected.children[2].textContent; // Puesto de trabajo
         let localizacion = rowSelected.children[3].textContent; // Ubicación

         // Crear un objeto de empleado con los valores obtenidos
         let employee = {
            firstname: nombre,
            lastname: apellido,
            age: edad,
            job: puesto,
            location: localizacion,
         };

         // Convertir el objeto de empleado a formato JSON
         let employeeJSON = JSON.stringify(employee);

         // Crear un objeto FormData y agregar el JSON como dato
         let formData = new FormData();
         formData.append("data", employeeJSON);

         // Enviar los datos al servidor usando fetch
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
               // Mostrar el modal con el nombre del empleado enviado
               console.log("Archivo guardado correctamente:", employee);
               document.querySelector(".modal-title").textContent = "Empleado enviado";
               document.querySelector(".modal-body").textContent = `${employee.firstname} ${employee.lastname}`;
               $("#exampleModal").modal("show"); // Mostrar el modal
            })
            .catch((error) => {
               // Manejar errores y mostrarlos en el modal
               document.querySelector(".modal-title").textContent = "ERROR";
               document.querySelector(".modal-body").textContent = error;
               $("#exampleModal").modal("show"); // Mostrar el modal
            });
      } else {
         // Si no se ha seleccionado ninguna fila, mostrar un mensaje de error en el modal
         document.querySelector(".modal-title").textContent = "ERROR";
         document.querySelector(".modal-body").textContent = "No hay ningún empleado seleccionado";
         $("#exampleModal").modal("show"); // Mostrar el modal
      }
   });

   // Agrega un evento de clic al botón con la clase ".btn.btn-secondary"
   document.querySelector(".btn.btn-secondary").addEventListener("click", function () {
      // Realiza una solicitud fetch al archivo getEmployee.php en el servidor local
      fetch("http://localhost/exam/php/getEmployee.php")
         // Maneja la respuesta como JSON
         .then((response) => response.json())
         // Una vez que se reciba el JSON, actualiza los campos del formulario con los datos del empleado
         .then((data) => {
            document.getElementById("validationDefault01").value = data.firstname;
            document.getElementById("validationDefault02").value = data.lastname;
            document.getElementById("validationDefault03").value = data.age;
            document.getElementById("validationDefault04").value = data.jobtitle;
            document.getElementById("validationDefault05").value = data.location;
         })
         // Maneja cualquier error que ocurra durante la solicitud
         .catch((error) => console.error("Error:", error));
   });
});
