const empleado1 = new Employee("David", "Medina", "28", "Desarrollador", "piedrabuena");
const empleado2 = new Employee("Claudia", "Fernandez", "18", "Camarera", "Porzuna");
const empleado3 = new Employee("Raul", "Garcia", "22", "Carpintero", "Ciudad Real");
const empleado4 = new Employee("Maria", "Herrera", "35", "Profersora", "piedrabuena");

try {
   company.insert(empleado1, empleado2, empleado3, empleado4);
} catch (error) {
   console.error(error.message);
}

console.log("Todos los empleados en la company:");
for (let employee of company.employees) {
   console.log(employee.toString());
}

console.log("error al insertar un empleado existente");
try {
   company.insert(empleado1);
} catch (error) {
   console.error(error.message);
}

console.log("Empleados piedrabuena:");
for (let employee of company.find((employee) => employee.location === "piedrabuena")) {
   console.log(employee.toString());
}

console.log("eliminar empleado 1");
try {
   company.delete(empleado1);
} catch (error) {
   console.error(error.message);
}

console.log("Todos los empleados en la company despues de eliminar a empleado 1:");
for (let employee of company.employees) {
   console.log(employee.toString());
}

console.log("error al eliminar un empleado que no existe");
try {
   company.delete(empleado1);
} catch (error) {
   console.error(error.message);
}
