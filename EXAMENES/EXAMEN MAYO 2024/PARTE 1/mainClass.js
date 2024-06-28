
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
 
    // Método getter para iterar sobre los animales almacenados
    get animals() {
       return this.animales[Symbol.iterator]();
    }
 
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
    }
 
    // Método para buscar animales en la protectora utilizando una función callback
    find(callback) {
       // Filtrar los animales según el callback y devolverlos
       return this.animales.filter(callback)[Symbol.iterator]();
    }
 }
 