// Definición de la función create que devuelve un nuevo conjunto (Set)
function create() {
   return new Set();
}

// Función isEmpty que verifica si el conjunto (Set) está vacío
function isEmpty(set) {
   return set.size === 0;
}

// Función size que devuelve el tamaño del conjunto (Set)
function size(set) {
   return set.size;
}

// Función isBook que verifica si un elemento es un libro válido
function isBook(elem) {
   return elem && typeof elem === "object" && "ISBN" in elem;
}

// Función para validar el formato de un ISBN
function validarISBN(isbn) {
   const regex = /^\d{3}-\d{2}-\d{4}-\d{3}-\d{1}$/;
   return regex.test(isbn);
}

// Función add para agregar un elemento al conjunto (Set)
function add(set, elem) {
   // Verifica si la lista está vacía
   if (!isEmpty(set)) {
      // Verifica si el elemento es un libro válido
      if (isBook(elem)) {
         // Valida el formato del ISBN del libro
         if (validarISBN(elem.ISBN)) {
            // Verifica si el conjunto no contiene ya el libro, lo agrega y devuelve el nuevo tamaño del conjunto
            if (!has(set, elem)) {
               set.add(elem);
               return size(set);
            } else {
               // Lanza un error si el libro con el mismo ISBN ya existe en el conjunto
               throw new Error("El libro con el mismo ISBN ya existe en el CONJUNTO.");
            }
         } else {
            // Lanza un error si el ISBN no cumple con el formato requerido
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         // Lanza un error si el elemento no es un Book válido
         throw new Error("El elemento no es un Book válido.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }
}

// Función has para verificar si el conjunto (Set) contiene un elemento dado
function has(set, elem) {
   // Verifica si la lista está vacía
   if (!isEmpty(set)) {
      // Verifica si el elemento es un libro válido
      if (isBook(elem)) {
         // Valida el formato del ISBN del libro
         if (validarISBN(elem.ISBN)) {
            // Devuelve true si el conjunto contiene el libro
            return set.has(elem);
         } else {
            // Lanza un error si el ISBN no cumple con el formato requerido
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         // Lanza un error si el elemento no es un Book válido
         throw new Error("El elemento no es un Book válido.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }
}

// Función toString que devuelve una cadena representando los elementos del conjunto (Set)
function toString(set) {
   // Verifica si la lista está vacía
   if (!isEmpty(set)) {
      // Convierte los elementos del conjunto a cadenas JSON y los une con un guion
      return Array.from(set)
         .map((elem) => JSON.stringify(elem))
         .join(" - ");
   } else {
      throw new Error("La lista está vacía.");
   }
}

// Función clear que elimina todos los elementos del conjunto (Set)
function clear(set) {
   set.clear();
}

// Función remove para eliminar un elemento del conjunto (Set)
function remove(set, elem) {
   // Verifica si la lista está vacía
   if (!isEmpty(set)) {
      // Verifica si el elemento es un libro válido
      if (isBook(elem)) {
         // Valida el formato del ISBN del libro
         if (validarISBN(elem.ISBN)) {
            // Verifica si el conjunto contiene el libro, lo elimina y devuelve true
            if (has(set, elem)) {
               set.delete(elem);
               return true;
            } else {
               throw new Error("El elemento no se encuentra en la lista.");
            }
         } else {
            // Devuelve false si el ISBN no cumple con el formato requerido
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         // Lanza un error si el elemento no es un Book válido
         throw new Error("El elemento no es un Book válido.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }
}
