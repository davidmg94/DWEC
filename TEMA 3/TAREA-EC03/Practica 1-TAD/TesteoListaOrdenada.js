// Función de testeo
function testEjercicio2() {
   // Crear una LISTA_ORDENADA
   const LISTA_ORDENADA = create();

   // Verificar si la LISTA_ORDENADA está vacía
   console.log("La LISTA_ORDENADA está vacía:", isEmpty(LISTA_ORDENADA)); // Debería ser true

   // Añadir elementos a la LISTA_ORDENADA
   let book = {
      ISBN: "978-84-9804-654-0",
      title: "El Quijote",
      author: "Miguel de Cervantes",
      publicationDate: new Date(1605, 0, 1),
      price: 20,
   };
   let libro1 = { ISBN: "123-45-6789-012-3", title: "Libro 1" };
   let libro2 = { ISBN: "456-78-9012-345-6", title: "Libro 2" };
   let libro3 = { ISBN: "789-01-2345-678-9", title: "Libro 3" };

   console.log("Añadir Libro 1 - Tamaño:", add(LISTA_ORDENADA, libro1)); // Debería ser 1
   console.log("Añadir Libro 2 - Tamaño:", add(LISTA_ORDENADA, libro2)); // Debería ser 2
   console.log("Añadir Libro 3 - Tamaño:", add(LISTA_ORDENADA, libro3)); // Debería ser 3
   console.log("Añadir book - Tamaño:", add(LISTA_ORDENADA, book)); // Debería ser 4

   // Verificar el tamaño de la LISTA_ORDENADA
   console.log("Tamaño de la LISTA_ORDENADA:", size(LISTA_ORDENADA)); // Debería ser 4

   // Obtener un elemento de la LISTA_ORDENADA
   console.log("Elemento en la posición 1:", get(LISTA_ORDENADA, 1)); // Debería ser libro2

   // Convertir la LISTA_ORDENADA a una cadena
   console.log("LISTA_ORDENADA como cadena:", toString(LISTA_ORDENADA)); // Debería ser la representación en cadena de los libros

   // Buscar el índice de un elemento en la LISTA_ORDENADA
   console.log("Índice de Libro 2:", indexOf(LISTA_ORDENADA, libro2)); // Debería ser 1

   // Verificar si la LISTA_ORDENADA está llena
   console.log("La LISTA_ORDENADA está llena:", isFull(LISTA_ORDENADA)); // Debería ser false

   // Obtener la capacidad de la LISTA_ORDENADA
   console.log("Capacidad de la LISTA_ORDENADA:", capacity(LISTA_ORDENADA)); // Debería ser 5

   // Obtener el primer elemento de la LISTA_ORDENADA
   console.log("Primer elemento de la LISTA_ORDENADA:", firstElement(LISTA_ORDENADA)); // Debería ser libro1

   // Obtener el último elemento de la LISTA_ORDENADA
   console.log("Último elemento de la LISTA_ORDENADA:", lastElement(LISTA_ORDENADA)); // Debería ser book

   // Eliminar un elemento de la LISTA_ORDENADA
   console.log("Eliminar Libro 2:", remove(LISTA_ORDENADA, 1)); // Debería ser libro2
   console.log("Tamaño de la LISTA_ORDENADA después de eliminar:", size(LISTA_ORDENADA)); // Debería ser 3

   // Eliminar un elemento por valor de la LISTA_ORDENADA
   console.log("Eliminar Libro 1 por valor:", removeElement(LISTA_ORDENADA, libro1)); // Debería ser true
   console.log("Tamaño de la LISTA_ORDENADA después de eliminar por valor:", size(LISTA_ORDENADA)); // Debería ser 2

   // Limpiar la LISTA_ORDENADA
   clear(LISTA_ORDENADA);
   console.log("La LISTA_ORDENADA está vacía después de limpiar:", isEmpty(LISTA_ORDENADA)); // Debería ser true
}

// ejecuta la funcion cuando carga la pagina
window.onload = testEjercicio2;
