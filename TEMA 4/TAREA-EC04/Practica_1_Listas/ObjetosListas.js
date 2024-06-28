import { ListFullError, ListLimitError, NotObject, ListEmpty, ElementNotExist, NotSameType, ElementExists } from "./exceptions.js";

// Símbolo para la propiedad privada que almacena los elementos de la lista
const _elements = Symbol("elements");

// Definición de la clase base List
class List {
   constructor(capacity) {
      // Inicializacion del array de elementos y capacidad
      this[_elements] = [];
      this.capacity = capacity;
   }

   // Método para verificar si la lista está vacía
   isEmpty() {
      return this[_elements].length === 0;
   }

   // Método para verificar si la lista está llena
   isFull() {
      return this[_elements].length === this.capacity;
   }

   // Método para obtener el tamaño de la lista
   size() {
      return this[_elements].length;
   }

   // Método para agregar un elemento a la lista
   add(elem) {
      if (this.isFull()) {
         throw new ListFullError("La lista esta llena.");
      } else {
         this[_elements].push(elem);
      }
      return this.size();
   }

   // Método para obtener un elemento en una posición específica de la lista
   get(index) {
      if (index < 0 || index >= this[_elements].length) {
         throw new ListLimitError("El índice se encuentra fuera de los límites.");
      }
      return this[_elements][index];
   }

   // Método para obtener una representación en cadena de la lista
   toString() {
      if (this.isEmpty()) {
         throw new ListEmpty("La lista no tiene contenido.");
      } else {
         return "Contenido de la lista: \n" + this[_elements].join(" - ");
      }
   }

   // Método para obtener el índice de un elemento en la lista
   indexOf(elem) {
      // Se utiliza findIndex para buscar el índice del elemento en _elements.
      const index = this[_elements].findIndex(function (item) {
         // Se verifica si el tipo del elemento actual es diferente al tipo del elemento buscado.
         if (typeof item !== typeof elem) {
            // Si los tipos son diferentes, se lanza una excepción de NotSameType.
            throw new NotSameType("El elemento indicado no coincide con el tipo del elemento similar.");
         } else {
            // Si los tipos son iguales, se compara el elemento actual con el elemento buscado.
            return item === elem;
         }
      });

      // Si el índice es -1, significa que el elemento no se encontró en la lista.
      if (index === -1) {
         // Se lanza una excepción de ElementNotExist.
         throw new ElementNotExist("Elemento no encontrado o no existe.");
      } else {
         // Si se encuentra el elemento, se devuelve su índice.
         return index;
      }
   }

   // Método para obtener la capacidad máxima de la lista
   getCapacity() {
      return this.capacity;
   }

   // Método para vaciar la lista
   clear() {
      if (this.isEmpty()) {
         throw new ListEmpty("La lista esta vacía.");
      } else {
         this[_elements].splice(0, this[_elements].length);
      }
   }

   // Método para obtener el primer elemento de la lista
   firstElement() {
      if (this.isEmpty()) {
         throw new ListEmpty("La lista esta vacía.");
      } else {
         return this[_elements][0];
      }
   }

   // Método para obtener el último elemento de la lista
   lastElement() {
      if (this.isEmpty()) {
         throw new ListEmpty("La lista esta vacía.");
      } else {
         return this[_elements][this[_elements].length - 1];
      }
   }

   // Método para eliminar un elemento en una posición específica de la lista
   remove(index) {
      if (index < 0 || index >= this[_elements].length) {
         throw new ListLimitError("El índice se encuentra fuera de los límites.");
      } else {
         return this[_elements].splice(index, 1);
      }
   }

   // Método para eliminar un elemento específico de la lista
   removeElement(elem) {
      const index = this.indexOf(elem);

      if (index !== -1) {
         this[_elements].splice(index, 1);
         return true;
      } else {
         throw new ElementNotExist("El elemento no existe.");
      }
   }
}

// Definición de la clase ObjectList que hereda de List
class ObjectList extends List {
   constructor(capacity, type) {
      super(capacity);
      this.type = type;
   }

   // Método para agregar un elemento a la lista
   add(elem) {
      // Verificar si el elemento es un objeto
      if (typeof elem !== "object" || elem === null) {
         throw new NotObject("El elemento no es un objeto.");
      }

      // Verificar si el elemento es del mismo tipo que la lista
      if (this.type !== elem.type) {
         throw new NotSameType("El elemento a añadir no es del mismo tipo que la lista.");
      }

      // Verificar si la lista está llena
      if (this.isFull()) {
         throw new ListFullError("La lista esta llena.");
      }

      // Verificar si el elemento ya existe en la lista
      if (this[_elements].includes(elem)) {
         throw new ElementExists("El elemento ya se encuentra en la lista.");
      }

      // Agregar el elemento a la lista
      this[_elements].push(elem);
      return this.size();
   }

   // Método para obtener una representación en cadena de la lista
   toString() {
      // Verificar si la lista está vacía
      if (this.isEmpty()) {
         // Si la lista está vacía, lanzar una excepción de ListEmpty
         throw new ListEmpty("La lista no tiene contenido.");
      } else {
         // Si la lista no está vacía, convertir cada objeto a una cadena JSON
         let textObject = this[_elements].map(function (object) {
            return JSON.stringify(object);
         });

         // Unir las cadenas JSON con saltos de línea para formar una cadena continua
         let objectChain = textObject.join(".\n ");

         // Devolver la cadena formada
         return `${objectChain}`;
      }
   }

   // Método para eliminar un elemento específico de la lista
   removeElement(elem) {
      // Verificar si el elemento es un objeto
      if (typeof elem !== "object" || elem === null) {
         throw new NotObject("El elemento no es un objeto.");
      }

      // Llamar al método removeElement de la clase base List
      return super.removeElement(elem);
   }
}

// Definición de la clase ObjectOrderedList que hereda de ObjectList
class OrderedObjectList extends ObjectList {
   constructor(capacity, type, orderFunction) {
      super(capacity, type);
      this.order = orderFunction;
   }

   // Método para agregar un elemento a la lista
   add(elem) {
      // Verificar si el elemento es un objeto
      if (typeof elem !== "object" || elem === null) {
         throw new NotObject("El elemento no es un objeto.");
      }

      // Verificar si el elemento es del mismo tipo que la lista
      if (this.type !== elem.type) {
         throw new NotSameType("El elemento a añadir no es del mismo tipo que la lista.");
      }

      // Verificar si la lista está llena
      if (this.isFull()) {
         throw new ListFullError("La lista esta llena.");
      }

      // Verificar si el elemento ya existe en la lista
      if (this[_elements].includes(elem)) {
         throw new ElementExists("El elemento ya se encuentra en la lista.");
      }

      // Agregar el elemento a la lista
      this[_elements].push(elem);
      // Ordenar la lista según la función de orden
      this[_elements].sort(this.order);
      return this.size();
   }
}
// Exporta las clases
export { List, ObjectList, OrderedObjectList };
