
// Definición de la clase ClubDeportivo
class ClubDeportivo {
    constructor() {
       this.jugadores = [];
    }
 
    añadirJugador(jugador) {
       this.jugadores.push(jugador);
    }
 
    eliminarJugador(jugador) {
       const index = this.jugadores.indexOf(jugador);
       if (index !== -1) {
          this.jugadores.splice(index, 1);
       }
    }
 
    *[Symbol.iterator]() {
       yield* this.jugadores;
    }
 
    *baloncestoIterator() {
       for (const jugador of this.jugadores) {
          if (jugador instanceof JugadorBaloncesto) {
             yield jugador;
          }
       }
    }
 
    *tenisIterator() {
       for (const jugador of this.jugadores) {
          if (jugador instanceof JugadorTenis) {
             yield jugador;
          }
       }
    }
 }
 