"use strict";

// Excepción específica para los componentes del gestor MaestreComponentes.
class MaestreComponentesException extends BaseException {
   constructor(message = "Error: MaestreComponentes Exception.", fileName, lineNumber) {
      super(message, fileName, lineNumber);
      this.name = "MaestreComponentesException";
   }
}

// Singleton con estructura de Array para almacenar los componentes.
const MaestreComponentesArray = (function () {
   class MaestreComponentes {
      #appliances; // Propiedad privada para almacenar los componentes.

      // Método privado para encontrar la posición de un componente en el array.
      #findAppliancePosition(appliance) {
         return this.#appliances.findIndex((storedAppliance) => {
            return storedAppliance.id === appliance.id;
         });
      }

      // Constructor que inicializa el array de componentes.
      constructor() {
         this.#appliances = [];
      }

      // Método para insertar uno o más componentes.
      insert(...apliances) {
         apliances.forEach((appliance) => {
            if (appliance instanceof Appliance) {
               // Verifica que el argumento es una instancia de Appliance.
               if (this.#findAppliancePosition(appliance) === -1) {
                  this.#appliances.push(appliance);
                  this.#appliances.sort((a, b) => a.id.localeCompare(b.id)); // Ordena el array por ID.
               } else {
                  throw new MaestreComponentesException(`The appliance ${appliance.id} already exists.`);
               }
            } else {
               throw new MaestreComponentesException(`The argument is not an Appliance.`);
            }
         });
         return this; // Permite encadenar métodos.
      }

      // Método que devuelve una cadena con todos los objetos en la colección.
      toString(sortFunction) {
         let array;
         if (sortFunction instanceof Function) {
            array = Array.from(this.#appliances.values()); // Copia el array para no perder el orden actual.
            array.sort(sortFunction);
         } else {
            array = this.#appliances;
         }
         return array.join("\n"); // Devuelve el array como una cadena separada por saltos de línea.
      }

      // Método generador para filtrar los componentes según una función de filtro.
      *filter(filterFunction) {
         if (!filterFunction) throw new MaestreComponentesException("Filter function");
         for (let index = 0; index < this.#appliances.length; index++) {
            if (filterFunction(this.#appliances[index])) {
               yield this.#appliances[index];
            }
         }
      }

      // Método para eliminar un componente por su ID.
      delete(id) {
         if (!Appliance.ID.test(id)) throw new MaestreComponentesException("The id is not correct.");
         let position = this.#appliances.findIndex((a) => a.id === id);
         if (position === -1) throw new MaestreComponentesException(`The ${id} doesn't exist.`);
         this.#appliances.splice(position, 1);
         return this;
      }
      // Transformamos MaestreComponentes en un iterable
      // Al implementar el método como generador también es un iterador.
      // Método generador para hacer el objeto iterable.
      *[Symbol.iterator]() {
         for (const appliance of this.#appliances) {
            yield appliance;
         }
      }
   }

   let instanciated;

   // Función para inicializar la instancia.
   function init() {
      return new MaestreComponentes();
   }

   return {
      // Método para obtener la instancia única (Singleton).
      getInstance: function () {
         if (!instanciated) instanciated = init();
         return instanciated;
      },
   };
})();

// Singleton con estructura de Map para almacenar los componentes.
const MaestreComponentesMap = (function () {
   class MaestreComponentes {
      #appliances; // Propiedad privada para almacenar los componentes.

      // Constructor que inicializa el Map de componentes.
      constructor() {
         this.#appliances = new Map();
      }

      // Método para insertar uno o más componentes.
      insert(...apliances) {
         apliances.forEach((appliance) => {
            if (appliance instanceof Appliance) {
               // Verifica que el argumento es una instancia de Appliance.
               if (!this.#appliances.has(appliance.id)) {
                  this.#appliances.set(appliance.id, appliance); // Añade el componente al Map.
               } else {
                  throw new MaestreComponentesException(`The appliance ${appliance.id} already exists.`);
               }
            } else {
               throw new MaestreComponentesException(`The argument is not an Appliance.`);
            }
         });
         return this; // Permite encadenar métodos.
      }

      // Método que devuelve una cadena con todos los objetos en la colección.
      toString(sortFunction = (a, b) => a.id.localeCompare(b.id)) {
         let array = Array.from(this.#appliances.values()); // Convierte el Map a array.
         array.sort(sortFunction); // Ordena el array.
         return array.join("\n"); // Devuelve el array como una cadena separada por saltos de línea.
      }

      // Método generador para filtrar los componentes según una función de filtro.
      *filter(filterFunction) {
         if (!filterFunction) throw new MaestreComponentesException("Filter function");
         for (let appliance of this.#appliances.values()) {
            if (filterFunction(appliance)) {
               yield appliance;
            }
         }
      }

      // Método para eliminar un componente por su ID.
      delete(id) {
         if (!Appliance.ID.test(id)) throw new MaestreComponentesException("The id is not correct.");
         if (this.#appliances.has(id)) {
            this.#appliances.delete(id); // Elimina el componente del Map.
         } else {
            throw new MaestreComponentesException(`The ${id} doesn't exist.`);
         }
         return this;
      }

      // Método generador para hacer el objeto iterable.
      *[Symbol.iterator]() {
         for (const appliance of this.#appliances.values()) {
            yield appliance;
         }
      }
   }

   let instanciated;

   // Función para inicializar la instancia.
   function init() {
      return new MaestreComponentes();
   }

   return {
      // Método para obtener la instancia única (Singleton).
      getInstance: function () {
         if (!instanciated) instanciated = init();
         return instanciated;
      },
   };
})();
