// Ejemplo de uso

// Creación de una instancia de Inmobiliaria
const inmobiliaria = new Inmobiliaria();

// Creación de objetos de diferentes tipos de inmuebles
const casa1 = new Casa(200000, 150, "Calle A, 123", "N40°12'34'' E3°45'56''", 2, 2, 2, "Si");
const casa2 = new Casa(300000, 200, "Calle B, 456", "S38°59'20'' O1°24'30''", 3, 3, 3, "No");
const apartamento1 = new Apartamento(150000, 100, "Calle C, 789", "N41°18'46'' E2°5'30''", 2, 2, "primera", "Si", "Si");
const apartamento2 = new Apartamento(180000, 120, "Calle D, 1011", "S36°43'12'' O4°25'18''", 4, 3, "segunda", "Si", "No");
const local1 = new LocalComercial(350000, 150, "Calle D, 1011", "S36°43'12'' O4°25'18''", 1, 80);

// Agregar inmuebles a la inmobiliaria
inmobiliaria.agregarInmueble(casa1, casa2, apartamento1, apartamento2, local1);

// Listar y mostrar las viviendas ordenadas por número de habitaciones
console.log("Viviendas ordenados por número de habitaciones:");
for (const inmueble of inmobiliaria.inmueblesPorNumHabitaciones()) {
   console.log(inmueble.toString());
}

// Listar y mostrar los inmuebles de tipo Casa
console.log("\nInmuebles de tipo Casa:");
for (const inmueble of inmobiliaria.inmueblesPorTipo("Casa")) {
   console.log(inmueble.toString());
}

// Listar y mostrar las viviendas que tienen más de 2 habitaciones
console.log("\nViviendas que cumplen el criterio de tener más de 2 habitaciones:");
for (const inmueble of inmobiliaria.inmueblesPorCriterio((inmueble) => inmueble.numHabitaciones > 2)) {
   console.log(inmueble.toString());
}

// Listar y mostrar los inmuebles que tienen un precio entre 100000 y 200000
console.log("\nInmuebles que cumplen el criterio de tener un precio entre 100000 y 200000:");
for (const inmueble of inmobiliaria.inmueblesPorCriterio((inmueble) => inmueble.precio >= 100000 && inmueble.precio <= 200000)) {
   console.log(inmueble.toString());
}
