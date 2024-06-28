// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function () {
   // Crear una instancia única de la clase Company
   const compania = new Company();

   // Función para mostrar retroalimentación de validación en los campos del formulario
   function showFeedBack(input, valid, message) {
      const validClass = valid ? "is-valid" : "is-invalid";
      const messageDiv = valid ? input.parentElement.querySelector("div.valid-feedback") : input.parentElement.querySelector("div.invalid-feedback");
      for (const div of input.parentElement.getElementsByTagName("div")) {
         div.classList.remove("d-block");
         div.classList.add("d-none");
      }
      messageDiv.classList.remove("d-none");
      messageDiv.classList.add("d-block");
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
      input.classList.add(validClass);
      if (message) {
         messageDiv.textContent = message;
      }
   }

   // Obtener referencias a los elementos del formulario y la tabla
   let form = document.querySelector("form");
   let table = document.querySelector("table tbody");

   let nameElement = document.getElementById("validationDefault01");
   let lastNameElement = document.getElementById("validationDefault02");
   let ageElement = document.getElementById("validationDefault03");
   let jobElement = document.getElementById("validationDefault04");
   let locationElement = document.getElementById("validationDefault05");

   // Añadir eventos de validación a los campos del formulario
   nameElement.addEventListener("blur", validateName);
   nameElement.addEventListener("input", validateName);

   lastNameElement.addEventListener("blur", validateLastName);
   lastNameElement.addEventListener("input", validateLastName);

   ageElement.addEventListener("blur", validateAge);
   ageElement.addEventListener("input", validateAge);

   jobElement.addEventListener("blur", validateJob);
   jobElement.addEventListener("input", validateJob);

   locationElement.addEventListener("blur", validateLocation);
   locationElement.addEventListener("input", validateLocation);

   // Funciones de validación para cada campo del formulario
   function validateName() {
      let nombre = nameElement.value;
      if (!nombre) {
         showFeedBack(nameElement, false, "Por favor, ingresa un nombre.");
         return false;
      } else {
         showFeedBack(nameElement, true);
      }
      return true;
   }

   function validateLastName() {
      let apellido = lastNameElement.value;
      if (!apellido) {
         showFeedBack(lastNameElement, false, "Por favor, ingresa un apellido.");
         return false;
      } else {
         showFeedBack(lastNameElement, true);
      }
      return true;
   }

   function validateAge() {
      let edad = ageElement.value;
      if (!edad || isNaN(edad) || edad < 16) {
         showFeedBack(ageElement, false, "Por favor, ingresa una edad válida.");
         return false;
      } else {
         showFeedBack(ageElement, true);
      }
      return true;
   }

   function validateJob() {
      let puesto = jobElement.value;
      if (!puesto) {
         showFeedBack(jobElement, false, "Por favor, ingresa un puesto de trabajo.");
         return false;
      } else {
         showFeedBack(jobElement, true);
      }
      return true;
   }

   function validateLocation() {
      let localizacion = locationElement.value.trim();
      if (!localizacion) {
         showFeedBack(locationElement, false, "Por favor, ingresa una ubicación.");
      } else {
         showFeedBack(locationElement, true);
      }
      return true;
   }

   // Evento para manejar el envío del formulario
   document.querySelector(".btn-primary").addEventListener("click", function (e) {
      e.preventDefault();

      let nombre = nameElement.value;
      let apellido = lastNameElement.value;
      let edad = ageElement.value;
      let puesto = jobElement.value;
      let localizacion = locationElement.value;
      let validForm = true;

      // Validar todos los campos del formulario
      if (!validateName() || !validateLastName() || !validateAge() || !validateJob() || !validateLocation()) {
         validForm = false;
      }

      if (validForm) {
         // Limpiar la tabla antes de insertar nuevos datos
         table.replaceChildren();

         // Crear un nuevo empleado e insertarlo en la compañía
         let employee = new Employee(nombre, apellido, edad, puesto, localizacion);
         try {
            compania.insert(employee);
         } catch (error) {
            console.error(error);
         }

         // Actualizar la tabla con los datos de los empleados
         let index = 0;
         for (let employee of compania.employees) {
            console.log(index + " " + employee.toString() + "\n");
            index++;
            table.insertAdjacentHTML(
               "beforeend",
               `<tr>
                  <td>${employee.firstname} ${employee.lastname}</td>
                  <td>${employee.age}</td>
                  <td>${employee.jobtitle}</td>
                  <td>${employee.location}</td>
               </tr>`
            );
         }

         // Mostrar un mensaje de éxito en un modal
         document.querySelector(".modal-title").textContent = "Resultado";
         document.querySelector(".modal-body").textContent = `Empleado añadido: ${nombre} ${apellido}`;
         $("#exampleModal").modal("show");
         form.reset();
      } else {
         // Mostrar un mensaje de error en un modal
         document.querySelector(".modal-title").textContent = "ERROR";
         document.querySelector(".modal-body").textContent = `Hay campos que no son válidos en el formulario`;
         $("#exampleModal").modal("show");
         showFeedBack();
      }
   });

   // Evento para manejar la carga de datos de un empleado desde el servidor
   document.querySelector(".btn.btn-secondary").addEventListener("click", function () {
      fetch("http://localhost/MedinaGarciaDavid/Ejercicio2/php/getEmployee.php")
         .then((response) => response.json())
         .then((data) => {
            document.getElementById("validationDefault01").value = data.firstname;
            document.getElementById("validationDefault02").value = data.lastname;
            document.getElementById("validationDefault03").value = data.age;
            document.getElementById("validationDefault04").value = data.jobtitle;
            document.getElementById("validationDefault05").value = data.location;
         })
         .catch((error) => console.error("Error:", error));
   });

   // Evento para manejar la selección de una fila en la tabla
   let selectedRow = null;
   let row = null;
   table.addEventListener("click", function (event) {
      if (event.target.tagName === "TD") {
         row = event.target.parentNode;

         if (selectedRow === row) {
            row.classList.remove("selected");
            selectedRow = null;
         } else {
            if (selectedRow) {
               selectedRow.classList.remove("selected");
            }
            row.classList.add("selected");
            selectedRow = row;
         }
      }
   });

   // Evento para manejar la eliminación de un empleado seleccionado
   document.querySelector(".btn.btn-secondary.w-100").addEventListener("click", function (event) {
      event.stopPropagation();
      if (selectedRow) {
         let nombreCompleto = row.querySelector("td").textContent;
         let nombresApellidos = nombreCompleto.split(" ");

         let nombre = nombresApellidos[0];
         let apellidos = nombresApellidos.slice(1).join(" ");
         let employee = company.find((employee) => employee.firstname === nombre && employee.lastname === apellidos);
         try {
            company.delete(employee);
         } catch (error) {
            console.error(error);
         }

         let index = 0;
         for (let employee of compania.employees) {
            console.log(index + " " + employee.toString() + "\n");
            index++;
         }
         selectedRow.remove();
         selectedRow = null;
         document.querySelector(".modal-title").textContent = "Resultado";
         document.querySelector(".modal-body").textContent = `Empleado eliminado: ${nombre} ${apellidos}`;
         $("#exampleModal").modal("show");
      }
   });
});
