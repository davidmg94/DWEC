// Función de testeo
function testEjercicio3() {
   // Crear un CONJUNTO
   const CONJUNTO = create();

   // Verificar si el CONJUNTO está vacío
   console.log("El CONJUNTO está vacío:", isEmpty(CONJUNTO)); // Debería ser true

   // Añadir elementos al CONJUNTO
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

   console.log("Añadir Libro 1 - Tamaño:", add(CONJUNTO, libro1)); // Debería ser 1
   console.log("Añadir Libro 2 - Tamaño:", add(CONJUNTO, libro2)); // Debería ser 2
   console.log("Añadir Libro 3 - Tamaño:", add(CONJUNTO, libro3)); // Debería ser 3
   console.log("Añadir book - Tamaño:", add(CONJUNTO, book)); // Debería ser 4

   // Verificar el tamaño del CONJUNTO
   console.log("Tamaño del CONJUNTO:", size(CONJUNTO)); // Debería ser 4

   // Convertir el CONJUNTO a una cadena
   console.log("Conjunto como cadena:", toString(CONJUNTO)); // Debería ser la representación en cadena de los libros

   // Verificar si el CONJUNTO contiene un elemento
   console.log("El CONJUNTO contiene Libro 2:", has(CONJUNTO, libro2)); // Debería ser true

   // Verificar si el CONJUNTO contiene un elemento no válido
   //elementos de prueba
   let libroInvalido1 = { title: "Libro Invalido1" };
   let libroInvalido2 = { ISBN: "978-835-9804-654-0", title: "Libro Invalido2" }; //para pruebas con el ISBN
   try {
      console.log("El CONJUNTO contiene Libro Invalido:", has(CONJUNTO, libroInvalido1)); // Debería lanzar un error
      // console.log("El CONJUNTO contiene Libro Invalido:", has(CONJUNTO, libroInvalido2)); // Debería lanzar un error
   } catch (error) {
      console.error(error.message);
   }

   //Añadir un elemento invalido al array
   try {
      // console.log("El CONJUNTO contiene Libro Invalido:", add(CONJUNTO, libroInvalido1)); // Debería lanzar un error
      console.log("El CONJUNTO contiene Libro Invalido:", add(CONJUNTO, libroInvalido2)); // Debería lanzar un error
   } catch (error) {
      console.error(error.message);
   }

   // Eliminar un elemento del CONJUNTO
   console.log("Eliminar Libro 2:", remove(CONJUNTO, libro2)); // Debería ser true
   console.log("Tamaño del CONJUNTO después de eliminar:", size(CONJUNTO)); // Debería ser 3

   // Limpiar el CONJUNTO
   clear(CONJUNTO);
   console.log("El CONJUNTO está vacío después de limpiar:", isEmpty(CONJUNTO)); // Debería ser true
}

// ejecuta la funcion cuando carga la pagina
window.onload = testEjercicio3;
