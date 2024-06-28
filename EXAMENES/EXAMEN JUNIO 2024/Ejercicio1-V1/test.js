const compania = new Company();

const empleado1 = new Employee("David", "Medina", "28", "Desarrollador", "piedrabuena");
const empleado2 = new Employee("Claudia", "Fernandez", "18", "Camarera", "Porzuna");
const empleado3 = new Employee("Raul", "Garcia", "22", "Carpintero", "Ckiudad Real");
const empleado4 = new Employee("Maria", "Herrera", "35", "Profersora", "piedrabuena");

try {
   compania.insert(empleado1, empleado2, empleado3, empleado4);
} catch (error) {
   console.error(error.message);
}

console.log("Todos los empleados en la compania:");
for (let employee of compania.employees) {
   console.log(employee.toString());
}

console.log("error al insertar un empleado existente");
try {
   compania.insert(empleado1);
} catch (error) {
   console.error(error.message);
}

console.log("Empleados piedrabuena:");
for (let employee of compania.find((employee) => employee.location === "piedrabuena")) {
   console.log(employee.toString());
}

console.log("eliminar empleado 1");
try {
   compania.delete(empleado1);
} catch (error) {
   console.error(error.message);
}

console.log("Todos los empleados en la compania despues de eliminar a empleado 1:");
for (let employee of compania.employees) {
   console.log(employee.toString());
}

console.log("error al eliminar un empleado que no existe");
try {
   compania.delete(empleado1);
} catch (error) {
   console.error(error.message);
}
