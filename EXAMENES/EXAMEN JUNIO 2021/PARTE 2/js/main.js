(function ($) {
   "use strict";

   // Manejo de eventos para mostrar formularios específicos según el deporte seleccionado
   $("#basket").click(function () {
      $("#tennisForm").hide();
      $("#basketForm").show();
   });

   $("#tennis").click(function () {
      $("#basketForm").hide();
      $("#tennisForm").show();
   });
})(jQuery); // Función anónima autoinvocada con jQuery

document.addEventListener("DOMContentLoaded", function () {
   const club = new ClubDeportivo(); // Instancia del club deportivo al cargar el contenido

   // Evento al hacer clic en el botón de submit del formulario
   document.querySelector("button[name='submit']").addEventListener("click", () => {
      // Obtención de datos del formulario
      const nombre = document.getElementById("firstname").value;
      const apellido = document.getElementById("lastname").value;
      const fechaNacimiento = document.getElementById("birthdate").value;
      const deporte = document.querySelector('input[name="typePlayer"]:checked').value;

      // Validación de campos requeridos en el formulario
      if (!nombre || !apellido || !fechaNacimiento || !deporte) {
         const campoVacio = !nombre ? "Nombre" : !apellido ? "Apellido" : !fechaNacimiento ? "Fecha de Nacimiento" : !deporte ? "Deporte" : "";
         alert(`Por favor, completa el campo ${campoVacio}.`);
         return;
      }

      let jugador;

      // Creación del jugador según el deporte seleccionado
      if (deporte === "basket") {
         const posicion = document.getElementById("position").value;
         const altura = document.getElementById("height").value;

         // Validación de campos específicos para jugador de baloncesto
         if (!posicion || !altura) {
            const campoVacio = !posicion ? "Posicion" : !altura ? "Altura" : "";
            alert(`Por favor, completa el campo ${campoVacio}.`);
            return;
         }

         jugador = new JugadorBaloncesto(nombre, apellido, fechaNacimiento, posicion, altura);
      } else if (deporte === "tennis") {
         const hand = document.getElementById("hand").value;

         // Validación de campo específico para jugador de tenis
         if (!hand) {
            const campoVacio = !hand ? "Mano" : "";
            alert(`Por favor, completa el campo ${campoVacio}.`);
            return;
         }

         jugador = new JugadorTenis(nombre, apellido, fechaNacimiento, hand);
      }

      console.log(jugador); // Mostrar jugador en consola
      club.anadirJugador(jugador); // Añadir jugador al club deportivo
      mostrarJugadores(club); // Actualizar la visualización de jugadores en la interfaz
   });

   // Función para mostrar los jugadores en la interfaz gráfica
   function mostrarJugadores(club) {
      const listaBaloncesto = document.getElementById("basketPlayers");
      const listaTenis = document.getElementById("tennisPlayers");

      // Limpiar listas de jugadores antes de actualizar
      listaBaloncesto.replaceChildren();
      listaTenis.replaceChildren();

      // Creación de encabezados para listas de baloncesto y tenis
      const divHeadBasket = document.createElement("div");
      divHeadBasket.classList.add("row", "header");
      // Crear celdas para el encabezado de baloncesto
      const divNameBasket = document.createElement("div");
      divNameBasket.classList.add("cell");
      divNameBasket.textContent = "Full Name";
      const divBirthBasket = document.createElement("div");
      divBirthBasket.classList.add("cell");
      divBirthBasket.textContent = "Birth";
      const divPositionBasket = document.createElement("div");
      divPositionBasket.classList.add("cell");
      divPositionBasket.textContent = "Position";
      const divHeightBasket = document.createElement("div");
      divHeightBasket.classList.add("cell");
      divHeightBasket.textContent = "Height";
      const divDeleteBasket = document.createElement("div");
      divDeleteBasket.classList.add("cell");
      divDeleteBasket.textContent = "Delete";

      // Agregar celdas al encabezado de baloncesto
      divHeadBasket.append(divNameBasket, divBirthBasket, divPositionBasket, divHeightBasket, divDeleteBasket);
      listaBaloncesto.appendChild(divHeadBasket);

      // Crear encabezados para lista de tenis
      const divHeadTennis = document.createElement("div");
      divHeadTennis.classList.add("row", "header");
      const divNameTennis = document.createElement("div");
      divNameTennis.classList.add("cell");
      divNameTennis.textContent = "Full Name";
      const divBirthTennis = document.createElement("div");
      divBirthTennis.classList.add("cell");
      divBirthTennis.textContent = "Birth";
      const divHandTennis = document.createElement("div");
      divHandTennis.classList.add("cell");
      divHandTennis.textContent = "Hand";
      const divDeleteTennis = document.createElement("div");
      divDeleteTennis.classList.add("cell");
      divDeleteTennis.textContent = "Delete";

      // Agregar celdas al encabezado de tenis
      divHeadTennis.append(divNameTennis, divBirthTennis, divHandTennis, divDeleteTennis);
      listaTenis.appendChild(divHeadTennis);

      // Iterar sobre los jugadores del club para mostrarlos en la interfaz
      for (let jugador of club) {
         const div = document.createElement("div");
         div.classList.add("row");
         const NombreCompleto = jugador.nombre + " " + jugador.apellido;

         if (jugador instanceof JugadorBaloncesto) {
            // Crear celdas para jugador de baloncesto
            const divName = document.createElement("div");
            divName.classList.add("cell");
            divName.setAttribute("data-title", "Full Name");
            divName.textContent = NombreCompleto;
            const divBirth = document.createElement("div");
            divBirth.classList.add("cell");
            divBirth.setAttribute("data-title", "Birth");
            divBirth.textContent = jugador.fechaNacimiento;
            const divPosition = document.createElement("div");
            divPosition.classList.add("cell");
            divPosition.setAttribute("data-title", "Position");
            divPosition.textContent = jugador.posicion;
            const divHeigth = document.createElement("div");
            divHeigth.classList.add("cell");
            divHeigth.setAttribute("data-title", "Height");
            divHeigth.textContent = jugador.altura;
            const divDelete = document.createElement("div");
            divDelete.classList.add("cell");
            divDelete.setAttribute("data-title", "Delete");
            const buttonDelete = document.createElement("button");
            buttonDelete.classList.add("delete");
            buttonDelete.textContent = "Delete";
            buttonDelete.addEventListener("click", function () {
               club.eliminarJugador(jugador);
               mostrarJugadores(club);
            });
            divDelete.appendChild(buttonDelete);
            div.append(divName, divBirth, divPosition, divHeigth, divDelete);
            listaBaloncesto.appendChild(div);
         } else if (jugador instanceof JugadorTenis) {
            // Crear celdas para jugador de tenis
            const divName = document.createElement("div");
            divName.classList.add("cell");
            divName.setAttribute("data-title", "Full Name");
            divName.textContent = NombreCompleto;
            const divBirth = document.createElement("div");
            divBirth.classList.add("cell");
            divBirth.setAttribute("data-title", "Birth");
            divBirth.textContent = jugador.fechaNacimiento;
            const divHand = document.createElement("div");
            divHand.classList.add("cell");
            divHand.setAttribute("data-title", "Hand");
            divHand.textContent = jugador.manoDominante;
            const divDelete = document.createElement("div");
            divDelete.classList.add("cell");
            divDelete.setAttribute("data-title", "Delete");
            const buttonDelete = document.createElement("button");
            buttonDelete.classList.add("delete");
            buttonDelete.textContent = "Delete";
            buttonDelete.addEventListener("click", function () {
               club.eliminarJugador(jugador);
               mostrarJugadores(club);
            });
            divDelete.appendChild(buttonDelete);
            div.append(divName, divBirth, divHand, divDelete);
            listaTenis.appendChild(div);
         }
      }
   }

   // Evento al hacer clic en el botón para obtener jugadores desde la API
   document.querySelector("button[name='getplayers']").addEventListener("click", () => {
      fetch("http://localhost/examJunio/getJugadores2.php") // Petición GET a la API
         .then((response) => response.json()) // Convertir respuesta a JSON
         .then((data) => {
            for (let jugadorData of data) {
               // Verificar si el jugador ya existe en el club
               const jugadorExistente = club.jugadores.find(
                  (jugador) =>
                     jugador.nombre === jugadorData.nombre &&
                     jugador.apellido === jugadorData.apellido &&
                     jugador.fechaNacimiento === jugadorData.fechaNacimiento.date.split(" ")[0]
               );

               // Si el jugador no existe, crear instancia y añadir al club
               if (!jugadorExistente) {
                  let jugador;
                  const fechaNacimiento = jugadorData.fechaNacimiento.date.split(" ")[0];
                  if (jugadorData.posicion && jugadorData.altura) {
                     jugador = new JugadorBaloncesto(
                        jugadorData.nombre,
                        jugadorData.apellido,
                        fechaNacimiento,
                        jugadorData.posicion,
                        jugadorData.altura
                     );
                  } else if (jugadorData.mano) {
                     jugador = new JugadorTenis(jugadorData.nombre, jugadorData.apellido, fechaNacimiento, jugadorData.mano);
                  }

                  if (jugador) {
                     club.anadirJugador(jugador); // Añadir jugador al club
                  }
               }
            }
            mostrarJugadores(club); // Actualizar la interfaz con los nuevos jugadores
         })
         .catch((error) => console.error("Error:", error)); // Capturar errores de la petición
   });

   // Función para formatear una fecha a formato DD/MM/YYYY
   function formatDateToDDMMYYYY(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   }

   // Código comentado: anteriormente, el código hacía uso de jQuery para manejar una petición similar, la cual ha sido ahora reemplazada por una función de Fetch, eliminando el código innecesario.

   //    $("#getPlayersButton").click(function () {
   //       $.ajax({
   //          url: "http://localhost/examJunio/getJugadores.php",
   //          type: "GET",
   //          dataType: "json",
   //          success: function (data) {
   //             data.forEach((playerData) => {
   //                let jugador;
   //                const fechaNacimiento = new Date(playerData.fechaNacimiento.date);

   //                if (playerData.posicion && playerData.altura) {
   //                   jugador = new JugadorBaloncesto(playerData.nombre, playerData.apellido, fechaNacimiento, playerData.posicion, playerData.altura);
   //                } else if (playerData.mano) {
   //                   jugador = new JugadorTenis(playerData.nombre, playerData.apellido, fechaNacimiento, playerData.mano);
   //                }

   //                if (jugador) {
   //                   club.anadirJugador(jugador);
   //                }
   //             });
   //             mostrarJugadores(club);
   //          },
   //          error: function (xhr, status, error) {
   //             console.error("Error al obtener los jugadores:", error);
   //          },
   //       });
   //    });
});
