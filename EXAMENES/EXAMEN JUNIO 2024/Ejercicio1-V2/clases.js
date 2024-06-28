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
      this.employees = new Map();
      Company.instance = this;
   }

   insert(...employees) {
      employees.forEach((emp) => {
         const key = `${emp.firstname}-${emp.lastname}`;
         if (!this.employees.has(key)) {
            this.employees.set(key, emp);
         } else {
            console.error(`Employee ${key} already exists.`);
         }
      });
      return this;
   }

   delete(...employees) {
      employees.forEach((emp) => {
         const key = `${emp.firstname}-${emp.lastname}`;
         if (!this.employees.has(key)) {
            console.error(`Employee ${key} not exists.`);
         } else {
            this.employees.delete(key);
         }
      });
      return this;
   }

   find(callback) {
      return Array.from(this.employees.values()).filter(callback)[Symbol.iterator]();
   }
   
   *[Symbol.iterator]() {
      for (const employee of this.employees) {
         yield employee;
      }
   }
}

const company = new Company();
