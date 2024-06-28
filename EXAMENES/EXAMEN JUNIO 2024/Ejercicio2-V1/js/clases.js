// Clase Persona que representa a una persona con nombre, apellido y edad
class Person {
   constructor(firstname, lastname, age) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.age = age;
   }
   // Método para convertir la información de la persona a una cadena de texto
   toString() {
      return `Nombre: ${this.firstname} Apellido: ${this.lastname} Edad: ${this.age}`;
   }
}

// Clase Empleado que extiende a la clase Persona y añade un puesto y una ubicación
class Employee extends Person {
   constructor(firstname, lastname, age, jobtitle, location) {
      super(firstname, lastname, age);
      this.jobtitle = jobtitle;
      this.location = location;
   }
   // Método para convertir la información del empleado a una cadena de texto, incluyendo los datos de Persona
   toString() {
      return super.toString() + ` Puesto: ${this.jobtitle} Localizacion: ${this.location}`;
   }
}

// Clase Company que representa una empresa con una lista de empleados
class Company {
   constructor() {
      if (Company.instance) {
         return Company.instance;
      }
      this.employees = [];
      Company.instance = this;
   }

   // Método para encontrar un empleado existente en la lista de empleados
   findExistEmployee(employee) {
      return this.employees.findIndex((storedEmployee) => {
         return storedEmployee.firstname === employee.firstname && storedEmployee.lastname === employee.lastname;
      });
   }

   // Método para insertar uno o más empleados en la lista de empleados
   insert(...employeesInsert) {
      employeesInsert.forEach((employee) => {
         if (!(employee instanceof Employee)) {
            throw new Error("El objeto no es un Empleado.");
         }
         if (this.findExistEmployee(employee) != -1) {
            throw new Error("El empleado ya está registrado.");
         }
         this.employees.push(employee);
      });
      return this;
   }

   // Método para eliminar uno o más empleados de la lista de empleados
   delete(...employeesDelete) {
      employeesDelete.forEach((employee) => {
         const index = this.employees.indexOf(employee);
         if (index === -1) {
            throw new Error("El objeto Employee no existe en la compañia.");
         }
         this.employees.splice(index, 1);
      });
      return this;
   }

   // Método para encontrar empleados que cumplan con un criterio de búsqueda
   find(callback) {
      return this.employees.filter(callback)[Symbol.iterator]();
   }

   // Generador para iterar sobre los empleados de la compañía
   *[Symbol.iterator]() {
      for (const employee of this.employees) {
         yield employee;
      }
   }
}

// Crear una instancia única de la clase Company
const company = new Company();
