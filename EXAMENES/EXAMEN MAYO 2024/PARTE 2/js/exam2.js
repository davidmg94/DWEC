// Función para mostrar retroalimentación visual y mensajes de validación
function showFeedBack(input, valid, message) {
   // Clase CSS para indicar si el campo es válido o no
   const validClass = valid ? "is-valid" : "is-invalid";
   
   // Obtener el div que muestra el mensaje de retroalimentación
   const messageDiv = valid ? input.parentElement.querySelector("div.valid-feedback") : input.parentElement.querySelector("div.invalid-feedback");
   
   // Ocultar todos los divs de retroalimentación
   for (const div of input.parentElement.getElementsByTagName("div")) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
   }
   
   // Mostrar el div de retroalimentación correspondiente
   messageDiv.classList.remove("d-none");
   messageDiv.classList.add("d-block");
   
   // Agregar la clase CSS para indicar si el campo es válido o no
   input.classList.remove("is-valid");
   input.classList.remove("is-invalid");
   input.classList.add(validClass);
   
   // Mostrar el mensaje de retroalimentación
   if (message) {
      messageDiv.textContent = message;
   }
}


// Obtener los elementos del formulario
let formElement = document.querySelector("form");
let nameElement = document.getElementById("validationDefault01");
let lastNameElement = document.getElementById("validationDefault02");
let ageElement = document.getElementById("validationDefault03");
let jobElement = document.getElementById("validationDefault04");
let locationElement = document.getElementById("validationDefault05");
let textArea = document.getElementById("selected-employee");
const employeeModal = new bootstrap.Modal(document.getElementById("exampleModal"));

// Validación del campo de nombre
nameElement.addEventListener("blur", function () {
   let name = nameElement.value;
   if (!name) {
      showFeedBack(nameElement, false, "Please enter a firstname"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(nameElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});
nameElement.addEventListener("input", function () {
   let name = nameElement.value;
   if (!name) {
      showFeedBack(nameElement, false, "Please enter a firstname"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(nameElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});

// Validación del campo de apellido
lastNameElement.addEventListener("blur", function () {
   let lastName = lastNameElement.value;
   if (!lastName) {
      showFeedBack(lastNameElement, false, "Please enter a lastname"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(lastNameElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});
lastNameElement.addEventListener("input", function () {
   let lastName = lastNameElement.value;
   if (!lastName) {
      showFeedBack(lastNameElement, false, "Please enter a lastname"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(lastNameElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});

// Validación del campo de edad
ageElement.addEventListener("blur", function () {
   let age = ageElement.value;
   if (!age || isNaN(age) || age < 0) {
      showFeedBack(ageElement, false, "Please enter a valid age"); // Mostrar retroalimentación si la edad no es válida
   } else {
      showFeedBack(ageElement, true); // Mostrar retroalimentación positiva si la edad es válida
   }
});
ageElement.addEventListener("input", function () {
   let age = ageElement.value;
   if (!age || isNaN(age) || age < 0) {
      showFeedBack(ageElement, false, "Please enter a valid age"); // Mostrar retroalimentación si la edad no es válida
   } else {
      showFeedBack(ageElement, true); // Mostrar retroalimentación positiva si la edad es válida
   }
});

// Validación del campo de trabajo
jobElement.addEventListener("blur", function () {
   let job = jobElement.value;
   if (!job) {
      showFeedBack(jobElement, false, "Please enter a job"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(jobElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});
jobElement.addEventListener("input", function () {
   let job = jobElement.value;
   if (!job) {
      showFeedBack(jobElement, false, "Please enter a job"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(jobElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});

// Validación del campo de ubicación
locationElement.addEventListener("input", function () {
   let location = locationElement.value.trim(); // Obtener el valor y eliminar espacios en blanco al principio y al final
   if (!location) {
      showFeedBack(locationElement, false, "Please enter a location"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(locationElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});

locationElement.addEventListener("blur", function () {
   let location = locationElement.value;
   if (!location) {
      showFeedBack(locationElement, false, "Please enter a location"); // Mostrar retroalimentación si el campo está vacío
   } else {
      showFeedBack(locationElement, true); // Mostrar retroalimentación positiva si el campo no está vacío
   }
});

// Obtener los botones
const buttons = document.getElementsByTagName("button");
let buttonCreate = buttons[0];
let buttonRandom = buttons[1];
let buttonSend = buttons[2];
let buttonDelete = buttons[3];

let tableBody = document.getElementsByTagName("tbody")[0];

// Evento para crear un nuevo empleado
buttonCreate.addEventListener("click", function (event) {
   // Obtener los valores de los campos del formulario
   let name = nameElement.value;
   let lastName = lastNameElement.value;
   let age = ageElement.value;
   let job = jobElement.value;
   let location = locationElement.value;
   event.preventDefault(); // Evitar que el formulario se envíe automáticamente

   let validForm = true; // Bandera para verificar la validez del formulario

   // Validar el campo de nombre
   if (!name) {
      showFeedBack(nameElement, false, "Please enter a firstname");
      validForm = false;
   } else {
      showFeedBack(nameElement, true);
   }

   // Validar el campo de apellido
   if (!lastName) {
      showFeedBack(lastNameElement, false, "Please enter a lastname");
      validForm = false;
   } else {
      showFeedBack(lastNameElement, true);
   }

   // Validar el campo de edad
   if (!age || isNaN(age) || age < 0) {
      showFeedBack(ageElement, false, "Please enter a  valid age");
      validForm = false;
   } else {
      showFeedBack(ageElement, true);
   }

   // Validar el campo de trabajo
   if (!job) {
      showFeedBack(jobElement, false, "Please enter a job");
      validForm = false;
   } else {
      showFeedBack(jobElement, true);
   }

   // Validar el campo de ubicación
   if (!location) {
      showFeedBack(locationElement, false, "Please enter a location");
      validForm = false;
   } else {
      showFeedBack(locationElement, true);
   }

   // Si el formulario es válido, crear una nueva fila de empleado
   if (validForm) {
      let row = document.createElement("tr");
      let fullNameCell = document.createElement("td");
      let ageCell = document.createElement("td");
      let jobCell = document.createElement("td");
      let locationCell = document.createElement("td");

      // Agregar los valores a las celdas de la fila
      fullNameCell.textContent = `${name} ${lastName}`;
      ageCell.textContent = age;
      jobCell.textContent = job;
      locationCell.textContent = location;

      // Agregar las celdas a la fila
      row.appendChild(fullNameCell);
      row.appendChild(ageCell);
      row.appendChild(jobCell);
      row.appendChild(locationCell);

      // Mostrar mensaje modal indicando que el empleado ha sido añadido
      document.querySelector(".modal-title").textContent = "Empleado añadido";
      document.querySelector(".modal-body").textContent = fullNameCell.textContent;
      $("#exampleModal").modal("show");
      formElement.reset(); // Reiniciar el formulario después de agregar el empleado

      // Evento para seleccionar cada fila de empleado
      row.addEventListener("click", function (e) {
         if (row.classList.contains("selectedEmployee")) {
            row.classList.remove("selectedEmployee");
            textArea.textContent = " ";
         } else {
            // Crear un objeto empleado con la información de la fila seleccionada
            let employee = {
               name: name,
               lastName: lastName,
               age: age,
               job: job,
               location: location,
            };

            // Convertir el objeto empleado a formato JSON
            let employeeJSON = JSON.stringify(employee);
            textArea.textContent = employeeJSON;

            // Desmarcar cualquier otra fila seleccionada
            for (let j = 0; j < tableBody.children.length; j++) {
               if (tableBody.children[j].classList.contains("selectedEmployee")) {
                  tableBody.children[j].classList.remove("selectedEmployee");
               }
            }

            // Marcar la fila actual como seleccionada
            row.classList.add("selectedEmployee");
         }
      });

      // Agregar la fila a la tabla de empleados
      tableBody.appendChild(row);
   }
});

// Para seleccionar cada fila de empleado (para los ya creados)
for (let i = 0; i < tableBody.children.length; i++) {
   tableBody.children[i].addEventListener("click", function (e) {
      if (tableBody.children[i].classList.contains("selectedEmployee")) {
         // Si la fila ya está seleccionada, deseleccionarla
         tableBody.children[i].classList.remove("selectedEmployee");
         textArea.textContent = " "; // Limpiar el área de texto
      } else {
         // Obtener los datos de la fila seleccionada
         let fullName = tableBody.children[i].children[0].textContent;
         let arrFullName = fullName.split(" ");
         let name = arrFullName[0];
         let lastName = arrFullName[1];
         let age = tableBody.children[i].children[1].textContent;
         let job = tableBody.children[i].children[2].textContent;
         let location = tableBody.children[i].children[3].textContent;

         // Crear un objeto con los datos del empleado seleccionado
         let employee = {
            name: name,
            lastName: lastName,
            age: age,
            job: job,
            location: location,
         };

         // Convertir el objeto a formato JSON
         let employeeJSON = JSON.stringify(employee);
         textArea.textContent = employeeJSON; // Mostrar los datos en el área de texto

         // Deseleccionar cualquier otra fila seleccionada
         for (let j = 0; j < tableBody.children.length; j++) {
            if (tableBody.children[j].classList.contains("selectedEmployee")) {
               tableBody.children[j].classList.remove("selectedEmployee");
            }
         }

         // Marcar la fila actual como seleccionada
         tableBody.children[i].classList.add("selectedEmployee");
      }
   });
}

// Recibir datos del getEmployee.php
buttonRandom.addEventListener("click", function () {
   $.ajax({
      url: "http://localhost/exam/php/getEmployee.php",
      method: "GET",
      dataType: "json",
      success: function (data) {
         // Rellenar los campos del formulario con los datos recibidos
         nameElement.value = data.firstname;
         lastNameElement.value = data.lastname;
         ageElement.value = data.age;
         jobElement.value = data.jobtitle;
         locationElement.value = data.location;
      },
      error: function (xhr, status, error) {
         console.error("Error al obtener datos del empleado:", error);
         console.error(xhr.responseText);
      },
   });
});

// Borrar un empleado
buttonDelete.addEventListener("click", function () {
   let rowSelected = document.querySelector(".selectedEmployee");

   if (rowSelected) {
      // Eliminar la fila seleccionada
      rowSelected.remove();
      textArea.textContent = " "; // Limpiar el área de texto
   }
});

// Enviar un empleado
buttonSend.addEventListener("click", function () {
   let rowSelected = document.querySelector(".selectedEmployee");

   if (rowSelected) {
      // Obtener los datos del empleado seleccionado
      let fullName = rowSelected.children[0].textContent;
      let arrFullName = fullName.split(" ");
      let name = arrFullName[0];
      let lastName = arrFullName[1];
      let age = rowSelected.children[1].textContent;
      let job = rowSelected.children[2].textContent;
      let location = rowSelected.children[3].textContent;

      // Crear un objeto con los datos del empleado
      let employee = {
         firstname: name,
         lastname: lastName,
         age: age,
         job: job,
         location: location,
      };

      // Convertir el objeto a formato JSON
      let employeeJSON = JSON.stringify(employee);

      // Crear un objeto FormData y agregar los datos del empleado
      var formData = new FormData();
      formData.append("data", employeeJSON);

      // Enviar los datos al saveEmployee.php usando fetch
      fetch("http://localhost/exam/php/saveEmployee.php", {
         method: "POST",
         body: formData,
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Error al guardar el archivo.");
            }
         })
         .then((data) => {
            // Mostrar mensaje modal indicando que el empleado ha sido enviado correctamente
            console.log("Archivo guardado correctamente:", employee);
            document.querySelector(".modal-title").textContent = "Empleado enviado";
            document.querySelector(".modal-body").textContent = `${employee.firstname} ${employee.lastname}`;
            employeeModal.show(); // Mostrar el modal
         })
         .catch((error) => {
            console.error("Error al guardar el archivo:", error);
         });
   }
});

