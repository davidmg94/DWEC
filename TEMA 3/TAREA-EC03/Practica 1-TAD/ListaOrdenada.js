// Constante que define el número máximo de elementos en la lista
const MAX_ELEMENTOS = 5;

// Función para crear una lista vacía
function create() {
   return [];
}

// Función para verificar si la lista está vacía
function isEmpty(list) {
   return list.length === 0;
}

// Función para verificar si la lista está llena
function isFull(list) {
   return list.length === MAX_ELEMENTOS;
}

// Función para obtener el tamaño de la lista
function size(list) {
   return list.length;
}

// Función para verificar si un objeto es un libro
function isBook(elem) {
   // Verifica si el objeto existe, es de tipo 'object' y tiene una propiedad 'ISBN'
   return elem && typeof elem === "object" && "ISBN" in elem;
}

// Función para validar el formato de un ISBN
function validarISBN(isbn) {
   // Define una expresión regular que representa el formato deseado del ISBN
   const regex = /^\d{3}-\d{2}-\d{4}-\d{3}-\d{1}$/;
   // Utiliza el método test() de la expresión regular para verificar si la cadena cumple con el formato
   return regex.test(isbn);
}
// Función para añadir un elemento a la lista ordenada por ISBN
function add(list, elem) {
   // Verifica si la lista no está llena
   if (!isFull(list)) {
      // Verifica si el elemento es un libro
      if (isBook(elem)) {
         // Valida el formato del ISBN antes de añadir el elemento a la lista
         if (validarISBN(elem.ISBN)) {
            let i = 0;
            // Encuentra la posición adecuada en la lista ordenada por ISBN
            while (i < size(list) && list[i].ISBN < elem.ISBN) {
               i++;
            }
            // Utiliza el método splice para insertar el elemento en la posición específica
            list.splice(i, 0, elem);
            // Devuelve el tamaño actualizado de la lista
            return size(list);
         } else {
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         throw new Error("El elemento no es un Book. Debe tener las propiedades ISBN y title.");
      }
   } else {
      throw new Error("La lista está llena. No se puede añadir más elementos.");
   }
}

// Función para obtener el elemento en una posición específica de la lista
function get(list, index) {
   // Verifica si la lista está vacía
   if (!isEmpty(list)) {
      // Verifica la validez del índice y que la lista no esté llena
      if (index >= 0 && index < size(list)) {
         //devuelve el elemento en el indice especifico
         return list[index];
      } else {
         throw new Error("Índice está fuera de los límites de la lista.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }
}

// Función para convertir la lista a una cadena de texto
function toString(list) {
   // Verifica si la lista está vacía
   if (!isEmpty(list)) {
      return list.map((elem) => JSON.stringify(elem)).join("-");
   } else {
      throw new Error("La lista está vacía.");
   }
}

// Función para obtener el índice de un elemento en la lista
function indexOf(list, elem) {
   // Verifica si la lista está vacía
   if (!isEmpty(list)) {
      // Verifica si el elemento es un libro
      if (isBook(elem)) {
         // Valida el formato del ISBN antes de buscar el elemento en la lista
         if (validarISBN(elem.ISBN)) {
            //se almacena el ISBN del elemento a buscar
            const ISBNToFind = elem.ISBN;
            // Itera sobre la lista para encontrar el índice del elemento
            for (let i = 0; i < size(list); i++) {
               // Verifica si el ISBN del elemento en la posición i es igual al del elemento a buscar
               if (list[i].ISBN === ISBNToFind) {
                  //devuelve el indice
                  return i;
               }
            }
         } else {
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         throw new Error("El elemento no es un Book. Debe tener las propiedades ISBN y title.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }

   throw new Error("El elemento no está en la lista.");
}

// Función para obtener el último índice de un elemento en la lista
function lastIndexOf(list, elem) {
   // Verifica si la lista está vacía
   if (!isEmpty(list)) {
      // Verifica si el elemento es un libro
      if (isBook(elem)) {
         // Valida el formato del ISBN antes de buscar el elemento en la lista
         if (validarISBN(elem.ISBN)) {
            //se almacena el ISBN del elemento a buscar
            const ISBNToFind = elem.ISBN;
            // Itera sobre la lista en orden inverso para encontrar el último índice del elemento
            for (let i = size(list) - 1; i >= 0; i--) {
               // Verifica si el ISBN del elemento en la posición i es igual al del elemento a buscar
               if (list[i].ISBN === ISBNToFind) {
                  //devuelve el indice
                  return i;
               }
            }
         } else {
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         throw new Error("El elemento no es un Book. Debe tener las propiedades ISBN y title.");
      }
   } else {
      throw new Error("La lista está vacía.");
   }

   throw new Error("El elemento no está en la lista.");
}

// Función para obtener la capacidad máxima de la lista
function capacity() {
   return MAX_ELEMENTOS;
}

// Función para vaciar la lista
function clear(list) {
   list.length = 0;
}

// Función para obtener el primer elemento de la lista
function firstElement(list) {
   // Verifica si la lista está vacía
   if (isEmpty(list)) {
      throw new Error("La lista está vacía.");
   } else {
      return list[0];
   }
}

// Función para obtener el último elemento de la lista
function lastElement(list) {
   // Verifica si la lista está vacía
   if (isEmpty(list)) {
      throw new Error("La lista está vacía.");
   } else {
      return list[list.length - 1];
   }
}

// Función para eliminar un elemento en una posición específica de la lista
function remove(list, index) {
   // verifica que la lista no este vacia
   if (!isEmpty(list)) {
      // Verifica si el índice está dentro de los límites de la lista
      if (index >= 0 && index < size(list)) {
         // Utiliza el método splice para eliminar el elemento en la posición específica
         // Devuelve el elemento eliminado de la lista
         return list.splice(index, 1)[0]; // Usar [0] para devolver el elemento eliminado en lugar de un array con el elemento
      } else {
         // Si el índice está fuera de los límites, lanza un error
         throw new Error("Índice está fuera de los límites de la lista.");
      }
   } else {
      // Si el índice está fuera de los límites, lanza un error
      throw new Error("La lista esta vacia.");
   }
}

// Función para eliminar un elemento específico de la lista
function removeElement(list, elem) {
   // verificar si la lista no esta vacia
   if (!isEmpty(list)) {
      // Verifica si el elemento es un libro
      if (isBook(elem)) {
         // Valida el formato del ISBN antes de buscar y eliminar el elemento de la lista
         if (validarISBN(elem.ISBN)) {
            //se almacena el ISBN del elemento a buscar
            const index = indexOf(list, elem);
            // Verifica si el elemento está en la lista
            if (index !== -1) {
               // Elimina el elemento
               list.splice(index, 1);
               return true;
            } else {
               throw new Error("El elemento no se encuentra en la lista.");
            }
         } else {
            throw new Error("El ISBN no cumple con el formato requerido");
         }
      } else {
         throw new Error("El elemento no es un Book. Debe tener las propiedades ISBN y title.");
      }
   } else {
      // Si la lista esta vacia, lanza un error
      throw new Error("La lista esta vacia.");
   }
}
