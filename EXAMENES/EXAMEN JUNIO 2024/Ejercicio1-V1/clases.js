class Person {
   constructor(firstname, lastname, age) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.age = age;
   }
   toString() {
      return `Nombre: ${this.firstname} Apellido: ${this.lastname} Edad: ${this.age}`;
   }
}

class Employee extends Person {
   constructor(firstname, lastname, age, jobtitle, location) {
      super(firstname, lastname, age);
      this.jobtitle = jobtitle;
      this.location = location;
   }
   toString() {
      return super.toString() + ` Puesto: ${this.jobtitle} Localizacion: ${this.location}`;
   }
}

class Company {
   constructor() {
      if (Company.instance) {
         return Company.instance;
      }
      this.employees = [];
      Company.instance = this;
   }
   findExistEmployee(employee) {
      return this.employees.findIndex((storedEmployee) => {
         return storedEmployee.firstname === employee.firstname && storedEmployee.lastname === employee.lastname;
      });
   }
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

   find(callback) {
      return this.employees.filter(callback)[Symbol.iterator]();
   }

   *[Symbol.iterator]() {
      for (const employee of this.employees) {
         yield employee;
      }
   }
}
