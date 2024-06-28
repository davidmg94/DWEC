// Ejemplo de uso
const club = new ClubDeportivo();

// Creación de jugadores
const jugador1 = new JugadorBaloncesto("Juan", "Martínez", "2000-02-10", "Pivot", 215);
const jugador2 = new JugadorTenis("María", "López", "1988-08-20", "Zurdo");
const jugador3 = new JugadorTenis("Claudia", "Fernandez", "1996-04-28", "Diestra");
const jugador4 = new JugadorBaloncesto("Pedro", "Baños", "1975-02-10", "Alero", 200);
const jugador5 = new JugadorTenis("Paula", "Zamora", "1986-02-10", "Zurdo", 200);
const jugador6 = new JugadorBaloncesto("Carlos", "González", "1990-05-15", "Base", 190);

// Añadir jugadores al club
club.anadirJugador(jugador1);
club.anadirJugador(jugador2);
club.anadirJugador(jugador3);
club.anadirJugador(jugador4);
club.anadirJugador(jugador5);
club.anadirJugador(jugador6);

try {
   // Intento de instanciar un jugador directamente (clase abstracta)
   let jugador = new Jugador();
} catch (error) {
   console.log(error);
}

// Mostrar todos los jugadores del club
console.log("Todos los jugadores:");
for (const jugador of club) {
   console.log(jugador.toString());
}

try {
   // Intento de añadir un jugador que ya existe (debe lanzar JugadorExistenteError)
   club.anadirJugador(jugador3);
} catch (error) {
   console.log(error);
}

console.log("\nOrdenados por nombre:");
// Ordenar y mostrar jugadores por nombre
club.ordenarPorNombre();
for (const jugador of club) {
   console.log(jugador.toString());
}

console.log("\nOrdenados por apellido:");
// Ordenar y mostrar jugadores por apellido
club.ordenarPorApellido();
for (const jugador of club) {
   console.log(jugador.toString());
}

console.log("\nOrdenados por edad:");
// Ordenar y mostrar jugadores por edad
club.ordenarPorEdad();
for (const jugador of club) {
   console.log(jugador.toString());
}

console.log("\nJugadores de baloncesto ordenados por altura:");
// Ordenar y mostrar jugadores de baloncesto por altura
club.ordenarPorAltura();
for (const jugador of club.baloncestoIterator()) {
   console.log(jugador.toString());
}

console.log("\nJugadores de baloncesto ordenados por posición:");
// Ordenar y mostrar jugadores de baloncesto por posición
club.ordenarPorPosicion();
for (const jugador of club.baloncestoIterator()) {
   console.log(jugador.toString());
}

console.log("\nJugadores de tenis ordenados por mano dominante:");
// Ordenar y mostrar jugadores de tenis por mano dominante
club.ordenarPorManoDominante();
for (const jugador of club.tenisIterator()) {
   console.log(jugador.toString());
}

// console.log("\nJugadores de baloncesto:");
// // Mostrar solo jugadores de baloncesto
// for (const jugador of club.baloncestoIterator()) {
//    console.log(jugador.toString());
// }

// console.log("\nJugadores de tenis:");
// // Mostrar solo jugadores de tenis
// for (const jugador of club.tenisIterator()) {
//    console.log(jugador.toString());
// }

// console.log(`\nEliminando jugador 1: (${jugador1.getNombre()} ${jugador1.getApellido()})`);
// // Eliminar jugador específico y mostrar jugadores restantes
// club.eliminarJugador(jugador1);
// console.log("Jugadores restantes:");
// for (const jugador of club) {
//    console.log(jugador.toString());
// }

// try {
//    // Intento de eliminar un jugador que no existe (debe lanzar JugadorNoExistenteError)
//    club.eliminarJugador(jugador1);
// } catch (error) {
//    console.log(error);
// }
