// Función de testeo
function testEjercicio1() {
   // Crear una LISTA
   const LISTA = create();

   // Verificar si la LISTA está vacía
   console.log("La LISTA está vacía:", isEmpty(LISTA)); // Debería ser true

   // Añadir elementos a la LISTA
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

   console.log("Añadir Libro 1 - Tamaño:", add(LISTA, libro1)); // Debería ser 1
   console.log("Añadir Libro 2 - Tamaño:", add(LISTA, libro2)); // Debería ser 2
   console.log("Añadir book - Tamaño:", add(LISTA, book)); // Debería ser 3

   //Añadir elemento en un indice especifico
   console.log("Añadir Libro 1 - Tamaño:", addAt(LISTA, libro3, 3)); // Debería ser 4

   // Verificar el tamaño de la LISTA
   console.log("Tamaño de la LISTA:", size(LISTA)); // Debería ser 4

   // Obtener un elemento de la LISTA
   console.log("Elemento en la posición 1:", get(LISTA, 1)); // Debería ser libro2

   // Convertir la LISTA a una cadena
   console.log("LISTA como cadena:", toString(LISTA)); // Debería ser la representación en cadena de los libros

   // Buscar el índice de un elemento en la LISTA
   console.log("Índice de Libro 2:", indexOf(LISTA, libro2)); // Debería ser 1

   // Buscar el último índice de un elemento en la LISTA
   console.log("Último índice de Libro 2:", lastIndexOf(LISTA, libro2)); // Debería ser 1

   // Verificar si la LISTA está llena
   console.log("La LISTA está llena:", isFull(LISTA)); // Debería ser false

   // Obtener la capacidad de la LISTA
   console.log("Capacidad de la LISTA:", capacity(LISTA)); // Debería ser 5

   // Obtener el primer elemento de la LISTA
   console.log("Primer elemento de la LISTA:", firstElement(LISTA)); // Debería ser libro1

   // Obtener el último elemento de la LISTA
   console.log("Último elemento de la LISTA:", lastElement(LISTA)); // Debería ser libro3

   // Eliminar un elemento de la LISTA
   console.log("Eliminar Libro 2:", remove(LISTA, 1)); // Debería ser libro2
   console.log("Tamaño de la LISTA después de eliminar:", size(LISTA)); // Debería ser 3

   // Eliminar un elemento por valor de la LISTA
   console.log("Eliminar Libro 1 por valor:", removeElement(LISTA, libro1)); // Debería ser true
   console.log("Tamaño de la LISTA después de eliminar por valor:", size(LISTA)); // Debería ser 2

   // Establecer un elemento en una posición
   let nuevoLibro = { ISBN: "999-99-9999-999-9", title: "Nuevo Libro" };
   console.log("Establecer Libro en posición 0:", set(LISTA, nuevoLibro, 0)); // Debería ser book
   console.log("Elemento en posición 0 después de establecer:", get(LISTA, 0)); // Debería ser nuevoLibro

   // Limpiar la LISTA
   clear(LISTA);
   console.log("La LISTA está vacía después de limpiar:", isEmpty(LISTA)); // Debería ser true
}

// ejecuta la funcion cuando carga la pagina
window.onload = testEjercicio1;
