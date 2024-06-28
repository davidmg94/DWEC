document.addEventListener("DOMContentLoaded", function () {
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

   let form = document.querySelector("form");
   const table = document.getElementById("results").getElementsByTagName("tbody")[0];

   let nameElement = document.getElementById("validationDefault01");
   let lastNameElement = document.getElementById("validationDefault02");
   let ageElement = document.getElementById("validationDefault03");
   let jobElement = document.getElementById("validationDefault04");
   let locationElement = document.getElementById("validationDefault05");

   // Añadir eventos de validación para cada campo del formulario
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

   // Función de validación para el nombre
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

   // Función de validación para el apellido
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

   // Función de validación para la edad
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

   // Función de validación para el puesto de trabajo
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

   // Función de validación para la ubicación
   function validateLocation() {
      let localizacion = locationElement.value.trim();
      if (!localizacion) {
         showFeedBack(locationElement, false, "Por favor, ingresa una ubicación.");
      } else {
         showFeedBack(locationElement, true);
      }
      return true;
   }

   // Evento para el botón de "Crear"
   document.querySelector(".btn-primary").addEventListener("click", function (e) {
      e.preventDefault();

      let nombre = nameElement.value;
      let apellido = lastNameElement.value;
      let edad = ageElement.value;
      let puesto = jobElement.value;
      let localizacion = locationElement.value;
      let validForm = true;

      // Validar cada campo
      if (!validateName() || !validateLastName() || !validateAge() || !validateJob() || !validateLocation()) {
         validForm = false;
      }

      if (validForm) {
         let employee = new Employee(nombre, apellido, edad, puesto, localizacion);
         try {
            compania.insert(employee);
         } catch (error) {
            console.error(error);
         }
         let index = 0;
         for (let employee of company.employees) {
            console.log(index + " " + employee.toString() + "\n");
            index++;
         }
         updateEmployeeTable();

         // Mostrar modal de éxito
         document.querySelector(".modal-title").textContent = "Resultado";
         document.querySelector(".modal-body").textContent = `Empleado añadido: ${nombre} ${apellido}`;
         $("#exampleModal").modal("show");
         form.reset();
      } else {
         // Mostrar modal de error
         document.querySelector(".modal-title").textContent = "ERROR";
         document.querySelector(".modal-body").textContent = `Hay campos que no son validos en el formulario`;
         $("#exampleModal").modal("show");
         showFeedBack();
      }
   });

   // Evento para el botón de "Get Random"
   document.querySelector(".btn-secondary").addEventListener("click", function () {
      fetch("http://localhost/MedinaGarciaDavid/Ejercicio2/php/getEmployee.php")
         .then((response) => response.json())
         .then((data) => {
            // Llenar el formulario con datos aleatorios del empleado
            document.getElementById("validationDefault01").value = data.firstname;
            document.getElementById("validationDefault02").value = data.lastname;
            document.getElementById("validationDefault03").value = data.age;
            document.getElementById("validationDefault04").value = data.jobtitle;
            document.getElementById("validationDefault05").value = data.location;
         })
         .catch((error) => console.error("Error:", error));
   });

   // Función para actualizar la tabla de empleados
   function updateEmployeeTable() {
      table.replaceChildren();
      for (let employee of company.employees.values()) {
         const row = table.insertRow();
         row.insertCell(0).innerText = `${employee.firstname} ${employee.lastname}`;
         row.insertCell(1).innerText = employee.age;
         row.insertCell(2).innerText = employee.jobtitle;
         row.insertCell(3).innerText = employee.location;
      }
   }

   let selectedRow = null;
   let row = null;
   // Evento para seleccionar una fila en la tabla
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

   // Evento para el botón de "Eliminar" en la tabla
   document.querySelector(".btn-secondary.w-100").addEventListener("click", function (event) {
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
         for (let employee of company.employees) {
            console.log(index + " " + employee.toString() + "\n");
            index++;
         }
         selectedRow.remove();
         selectedRow = null;

         // Mostrar modal de éxito
         document.querySelector(".modal-title").textContent = "Resultado";
         document.querySelector(".modal-body").textContent = `Empleado eliminado: ${nombre} ${apellidos}`;
         $("#exampleModal").modal("show");
      }
   });
});
