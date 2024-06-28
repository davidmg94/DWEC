class Animal {
   constructor(nombre, foto, comida, localizacion, tamano) {
      if (new.target === Animal) {
         throw new "no se puede instanciar una clase abstracta"();
      }
      this.nombre = nombre;
      this.foto = foto;
      this.comida = comida;
      this.localizacion = localizacion;
      this.tamano = tamano;
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   dormir() {
      console.log(`dormir desde ${this.constructor.name}`);
   }
   rugir() {
      console.log(`rugir desde ${this.constructor.name}`);
   }
   toString() {
      return `Nombre: ${this.nombre}, Foto: ${this.foto}, Comida: ${this.comida}, Localización: ${this.localizacion}, Tamaño: ${this.tamano}`;
   }
}

class Felino extends Animal {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
      if (new.target === Felino) {
         throw new TypeError("No se puede instanciar una clase abstracta.");
      }
   }

   rugir() {
      console.log(`rugir desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + ` - Canino`;
   }
}
class Canino extends Animal {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
      if (new.target === Canino) {
         throw new TypeError("No se puede instanciar una clase abstracta.");
      }
   }

   rugir() {
      console.log(`rugir desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + ` - Canino`;
   }
}
class Leon extends Felino {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + "- Leon";
   }
}
class Tigre extends Felino {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + "- Tigre";
   }
}
class Gato extends Felino {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   vacunar() {
      console.log(`vacunar desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + "- Gato";
   }
}
class Lobo extends Canino {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + "- Lobo";
   }
}
class Perro extends Canino {
   constructor(nombre, foto, comida, localizacion, tamano) {
      super(nombre, foto, comida, localizacion, tamano);
   }
   comer() {
      console.log(`comer desde ${this.constructor.name}`);
   }
   hacerRuido() {
      console.log(`hacer ruido desde ${this.constructor.name}`);
   }
   vacunar() {
      console.log(`vacunar desde ${this.constructor.name}`);
   }
   sacarPaseo() {
      console.log(`sacar paseo desde ${this.constructor.name}`);
   }
   toString() {
      return super.toString() + "- Perro";
   }
}

class Protectora {
   constructor() {
      if (Protectora.instance) {
         return Protectora.instance;
      }
      this.animales = [];
      Protectora.instance = this; // Asignar la instancia única


   }
   addAnimal(...animales) {
      animales.forEach((animal) => {
         if (animal instanceof Animal && !this.animales.includes(animal)) {
            this.animales.push(animal);
         }
      });
      return this;
   }
   removeAnimal(...animales) {
      animales.forEach((animal) => {
         const index = this.animales.indexOf(animal);
         if (animal instanceof Animal && this.animales.includes(animal)) {
            if (index != 1) {
               this.animales.splice(index, 1);
            }
         }
      });
      return this;
   }
   getAnimals(tipo) {
      if (!tipo.prototype || !(tipo.prototype instanceof Animal)) {
         throw new "no existe clase de ese tipo"();
      }
      return this.animales.filter((animal) => animal instanceof tipo)[Symbol.iterator]();
   }
   find(funcion) {
    return this.animales.filter(funcion)[Symbol.iterator]();

   }
   // Implementación con Generador
   *[Symbol.iterator]() {
      for (const animal of this.animales) {
         yield animal;
      }
   }
}
