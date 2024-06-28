// Clase abstracta Animal
class Animal {
   // Constructor de la clase Animal
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Verificar si se intenta instanciar directamente la clase Animal (abstracta)
      if (new.target === Animal) {
         throw new TypeError("No se puede instanciar una clase abstracta.");
      }
      // Inicializar propiedades comunes a todos los animales
      this.nombre = nombre;
      this.foto = foto;
      this.comida = comida;
      this.localizacion = localizacion;
      this.tamano = tamano;
   }

   // Métodos abstractos que deben ser implementados por las subclases
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }
   dormir() {
      console.log(`Método dormir() de la clase ${this.constructor.name}`);
   }
   rugir() {
      console.log(`Método rugir() de la clase ${this.constructor.name}`);
   }

   // Método toString para mostrar información del animal
   toString() {
      return `Nombre: ${this.nombre}, Foto: ${this.foto}, Comida: ${this.comida}, Localización: ${this.localizacion}, Tamaño: ${this.tamano}`;
   }
}

// Clase abstracta Canino que extiende de Animal
class Canino extends Animal {
   // Constructor de la clase Canino
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Animal)
      super(nombre, foto, comida, localizacion, tamano);
      // Verificar si se intenta instanciar directamente la clase Canino (abstracta)
      if (new.target === Canino) {
         throw new TypeError("No se puede instanciar una clase abstracta.");
      }
   }
   // Implementación del método rugir específico para Caninos
   rugir() {
      console.log(`Método rugir() de la clase ${this.constructor.name}`);
   }
   // Sobrescribir el método toString para agregar información específica de Canino
   toString() {
      return super.toString() + ` - Canino`;
   }
}

// Clase abstracta Felino que extiende de Animal
class Felino extends Animal {
   // Constructor de la clase Felino
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Animal)
      super(nombre, foto, comida, localizacion, tamano);
      // Verificar si se intenta instanciar directamente la clase Felino (abstracta)
      if (new.target === Felino) {
         throw new TypeError("No se puede instanciar una clase abstracta.");
      }
   }
   // Implementación del método rugir específico para Felinos
   rugir() {
      console.log(`Método rugir() de la clase ${this.constructor.name}`);
   }
   // Sobrescribir el método toString para agregar información específica de Felino
   toString() {
      return super.toString() + ` - Felino`;
   }
}

// Clase concreta Perro que extiende de Canino
class Perro extends Canino {
   // Constructor de la clase Perro
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Canino)
      super(nombre, foto, comida, localizacion, tamano);
   }

   // Implementación de los métodos abstractos de Animal
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }

   // Método específico de Perro
   vacunar() {
      console.log(`Método vacunar() de la clase ${this.constructor.name}`);
   }
   sacarPaseo() {
      console.log(`Método sacarPaseo() de la clase ${this.constructor.name}`);
   }

   // Sobrescribir el método toString para agregar información específica de Perro
   toString() {
      return super.toString() + ` - Perro`;
   }
}

// Clase concreta Lobo que extiende de Canino
class Lobo extends Canino {
   // Constructor de la clase Lobo
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Canino)
      super(nombre, foto, comida, localizacion, tamano);
   }

   // Implementación de los métodos abstractos de Animal
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }

   // Sobrescribir el método toString para agregar información específica de Lobo
   toString() {
      return super.toString() + ` - Lobo`;
   }
}

// Clase concreta Gato que extiende de Felino
class Gato extends Felino {
   // Constructor de la clase Gato
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Felino)
      super(nombre, foto, comida, localizacion, tamano);
   }

   // Implementación de los métodos abstractos de Animal
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }

   // Método específico de Gato
   vacunar() {
      console.log(`Método vacunar() de la clase ${this.constructor.name}`);
   }

   // Sobrescribir el método toString para agregar información específica de Gato
   toString() {
      return super.toString() + ` - Gato`;
   }
}

// Clase concreta Tigre que extiende de Felino
class Tigre extends Felino {
   // Constructor de la clase Tigre
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Felino)
      super(nombre, foto, comida, localizacion, tamano);
   }

   // Implementación de los métodos abstractos de Animal
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }

   // Sobrescribir el método toString para agregar información específica de Tigre
   toString() {
      return super.toString() + ` - Tigre`;
   }
}

// Clase concreta Leon que extiende de Felino
class Leon extends Felino {
   // Constructor de la clase Leon
   constructor(nombre, foto, comida, localizacion, tamano) {
      // Llamar al constructor de la clase padre (Felino)
      super(nombre, foto, comida, localizacion, tamano);
   }

   // Implementación de los métodos abstractos de Animal
   hacerRuido() {
      console.log(`Método hacerRuido() de la clase ${this.constructor.name}`);
   }
   comer() {
      console.log(`Método comer() de la clase ${this.constructor.name}`);
   }

   // Sobrescribir el método toString para agregar información específica de Leon
   toString() {
      return super.toString() + ` - Leon`;
   }
}

// Clase Singleton Protectora para gestionar los animales
class Protectora {
   constructor() {
      // Implementación del patrón Singleton para asegurar una única instancia
      if (Protectora.instance) {
         return Protectora.instance;
      }
      this.animales = []; // Inicializar arreglo para almacenar animales
      Protectora.instance = this; // Asignar la instancia única
   }
   
 
   // // Método getter para iterar sobre los animales almacenados
   // get animals() {
   //    return this.animales[Symbol.iterator]();
   // }

   // Método para agregar uno o más animales a la protectora
   addAnimal(...nuevosAnimales) {
      nuevosAnimales.forEach((animal) => {
         // Verificar si el objeto es una instancia de Animal
         if (!(animal instanceof Animal)) {
            throw new Error("El objeto no es un Animal.");
         }
         // Verificar si el animal ya está registrado en la protectora
         if (this.animales.includes(animal)) {
            throw new Error("El animal ya está registrado.");
         }
         // Agregar el animal al arreglo de animales
         this.animales.push(animal);
      });
      return this;
   }

   // Método para obtener todos los animales de un tipo específico (clase)
   getAnimals(tipo) {
      // Verificar que el tipo sea una clase válida que extiende de Animal
      if (!tipo.prototype || !(tipo.prototype instanceof Animal)) {
         throw new Error("El tipo de clase no existe.");
      }
      // Filtrar los animales según el tipo y devolver un iterador
      return this.animales.filter((animal) => animal instanceof tipo)[Symbol.iterator]();
   }

   // Método para remover uno o más animales de la protectora
   removeAnimal(...animalesARemover) {
      animalesARemover.forEach((animal) => {
         // Encontrar el índice del animal en el arreglo
         const index = this.animales.indexOf(animal);
         // Verificar si el animal existe en la protectora
         if (index === -1) {
            throw new Error("El objeto Animal no existe en la protectora.");
         }
         // Remover el animal del arreglo
         this.animales.splice(index, 1);
      });
      return this;

   }

   // Método para buscar animales en la protectora utilizando una función callback
   find(callback) {
      // Filtrar los animales según el callback y devolverlos
      return this.animales.filter(callback)[Symbol.iterator]();
   }
      // Implementación con Generador
      *[Symbol.iterator]() {
         for (const animal of this.animales) {
            yield animal;
         }
      }
}
