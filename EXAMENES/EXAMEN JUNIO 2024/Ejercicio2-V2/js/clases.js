"use strict";

// Definición de la clase Person
class Person {
   constructor(firstname, lastname, age) {
      this.firstname = firstname; // Nombre de la persona
      this.lastname = lastname;   // Apellido de la persona
      this.age = age;             // Edad de la persona
   }
   
   // Método que devuelve una cadena con la información de la persona
   toString() {
      return `Nombre: ${this.firstname} Apellido: ${this.lastname} Edad: ${this.age}`;
   }
}

// Definición de la clase Employee que hereda de Person
class Employee extends Person {
   constructor(firstname, lastname, age, jobtitle, location) {
      super(firstname, lastname, age); // Llamada al constructor de la clase padre
      this.jobtitle = jobtitle;        // Título del trabajo del empleado
      this.location = location;        // Localización del empleado
   }

   // Método que devuelve una cadena con la información del empleado
   toString() {
      return super.toString() + ` Puesto: ${this.jobtitle} Localizacion: ${this.location}`;
   }
}

// Definición de la clase Company que implementa el patrón Singleton
class Company {
   constructor() {
      if (Company.instance) { // Verifica si ya existe una instancia de Company
         return Company.instance; // Devuelve la instancia existente
      }
      this.employees = new Map(); // Inicializa un mapa para almacenar empleados
      Company.instance = this;    // Guarda la instancia actual en Company.instance
   }

   // Método para insertar empleados
   insert(...employees) {
      employees.forEach((emp) => {
         const key = `${emp.firstname}-${emp.lastname}`; // Clave única para cada empleado
         if (!this.employees.has(key)) { // Verifica si el empleado ya existe
            this.employees.set(key, emp); // Agrega el empleado al mapa
         } else {
            throw new Error(`Employee ${key} already exists.`); // Lanza un error si el empleado ya existe
         }
      });
      return this; // Permite el encadenamiento de métodos
   }

   // Método para eliminar empleados
   delete(...employees) {
      employees.forEach((emp) => {
         const key = `${emp.firstname}-${emp.lastname}`; // Clave única para cada empleado
         if (!this.employees.has(key)) { // Verifica si el empleado no existe
            throw new Error(`Employee ${key} not exists.`); // Lanza un error si el empleado no existe
         } else {
            this.employees.delete(key); // Elimina el empleado del mapa
         }
      });
      return this; // Permite el encadenamiento de métodos
   }

   // Método para encontrar empleados que cumplan una condición
   find(callback) {
      // Devuelve un iterador para los empleados que cumplan la condición
      return Array.from(this.employees.values()).filter(callback)[Symbol.iterator]();
   }

   // Iterador para recorrer los empleados
   *[Symbol.iterator]() {
      for (const employee of this.employees) {
         yield employee; // Devuelve cada empleado en el mapa
      }
   }
}

// Creación de una instancia única de la clase Company
const company = new Company();
