// Definición de la clase abstracta Jugador
class Jugador {
   constructor(nombre, apellido, fechaNacimiento) {
      // Verifica si se está intentando instanciar la clase abstracta Jugador directamente
      if (this.constructor === Jugador) {
         throw new Error("No puedes instanciar un objeto de la clase abstracta Jugador.");
      }
      // Inicialización de propiedades comunes a todos los jugadores
      this.nombre = nombre;
      this.apellido = apellido;
      this.fechaNacimiento = fechaNacimiento;
   }

   // Getters para obtener los atributos del jugador
   getNombre() {
      return this.nombre;
   }

   getApellido() {
      return this.apellido;
   }

   getFechaNacimiento() {
      return this.fechaNacimiento;
   }

   // Setters para modificar los atributos del jugador
   setNombre(nombre) {
      this.nombre = nombre;
   }

   setApellido(apellido) {
      this.apellido = apellido;
   }

   setFechaNacimiento(fechaNacimiento) {
      this.fechaNacimiento = fechaNacimiento;
   }

   // Método para representar el jugador como cadena de texto
   toString() {
      return `${this.nombre} ${this.apellido} - Fecha de nacimiento: ${this.fechaNacimiento}`;
   }
}

// Definición de la clase JugadorBaloncesto que hereda de Jugador
class JugadorBaloncesto extends Jugador {
   constructor(nombre, apellido, fechaNacimiento, posicion, altura) {
      // Llama al constructor de la clase base Jugador con super()
      super(nombre, apellido, fechaNacimiento);
      // Inicialización de propiedades específicas de JugadorBaloncesto
      this.posicion = posicion;
      this.altura = altura;
   }

   // Getters para obtener los atributos específicos de JugadorBaloncesto
   getPosicion() {
      return this.posicion;
   }

   getAltura() {
      return this.altura;
   }

   // Setters para modificar los atributos específicos de JugadorBaloncesto
   setPosicion(posicion) {
      this.posicion = posicion;
   }

   setAltura(altura) {
      this.altura = altura;
   }

   // Método para representar el jugador de baloncesto como cadena de texto, incluyendo posición y altura
   toString() {
      return `${super.toString()} - Posición: ${this.posicion}, Altura: ${this.altura} cm`;
   }
}

// Definición de la clase JugadorTenis que hereda de Jugador
class JugadorTenis extends Jugador {
   constructor(nombre, apellido, fechaNacimiento, manoDominante) {
      // Llama al constructor de la clase base Jugador con super()
      super(nombre, apellido, fechaNacimiento);
      // Inicialización de propiedades específicas de JugadorTenis
      this.manoDominante = manoDominante;
   }

   // Getters para obtener los atributos específicos de JugadorTenis
   getManoDominante() {
      return this.manoDominante;
   }

   // Setters para modificar los atributos específicos de JugadorTenis
   setManoDominante(manoDominante) {
      this.manoDominante = manoDominante;
   }

   // Método para representar el jugador de tenis como cadena de texto, incluyendo mano dominante
   toString() {
      return `${super.toString()} - Mano dominante: ${this.manoDominante}`;
   }
}

// Definición de la clase ClubDeportivo
class ClubDeportivo {
   constructor() {
      // Inicialización del arreglo de jugadores
      this.jugadores = [];
   }

   // Métodos para ordenar los jugadores por diferentes atributos

   // Método para ordenar por edad
   ordenarPorEdad() {
      this.jugadores.sort(ClubDeportivo.compararEdad);
   }

   // Método para ordenar por nombre
   ordenarPorNombre() {
      this.jugadores.sort(ClubDeportivo.compararNombre);
   }

   // Método para ordenar por apellido
   ordenarPorApellido() {
      this.jugadores.sort(ClubDeportivo.compararApellido);
   }

   // Método para ordenar por altura de los jugadores de baloncesto
   ordenarPorAltura() {
      // Obtener los jugadores de baloncesto usando baloncestoIterator()
      const jugadoresBaloncesto = [...this.baloncestoIterator()];
      // Ordenar por altura usando compararAltura específico para JugadorBaloncesto
      jugadoresBaloncesto.sort(ClubDeportivo.compararAltura);
      // Actualizar this.jugadores colocando primero los baloncestistas ordenados y luego el resto
      this.jugadores = [...jugadoresBaloncesto, ...this.jugadores.filter((jugador) => !(jugador instanceof JugadorBaloncesto))];
   }

   // Método para ordenar por posición de los jugadores de baloncesto
   ordenarPorPosicion() {
      // Obtener los jugadores de baloncesto usando baloncestoIterator()
      const jugadoresBaloncesto = [...this.baloncestoIterator()];
      // Ordenar por posición usando compararPosicion específico para JugadorBaloncesto
      jugadoresBaloncesto.sort(ClubDeportivo.compararPosicion);
      // Actualizar this.jugadores colocando primero los baloncestistas ordenados y luego el resto
      this.jugadores = [...jugadoresBaloncesto, ...this.jugadores.filter((jugador) => !(jugador instanceof JugadorBaloncesto))];
   }

   // Método para ordenar por mano dominante de los jugadores de tenis
   ordenarPorManoDominante() {
      // Obtener los jugadores de tenis usando tenisIterator()
      const jugadoresTenis = [...this.tenisIterator()];
      // Ordenar por mano dominante usando compararManoDominante específico para JugadorTenis
      jugadoresTenis.sort(ClubDeportivo.compararManoDominante);
      // Actualizar this.jugadores colocando primero los tenistas ordenados y luego el resto
      this.jugadores = [...jugadoresTenis, ...this.jugadores.filter((jugador) => !(jugador instanceof JugadorTenis))];
   }

   // Método para añadir un jugador al club deportivo
   anadirJugador(jugador) {
      const index = this.jugadores.indexOf(jugador);
      if (index === -1) {
         this.jugadores.push(jugador);
      } else {
         throw new JugadorExistenteError("El jugador ya existe en el club deportivo.");
      }
   }

   // Método para eliminar un jugador del club deportivo
   eliminarJugador(jugador) {
      const index = this.jugadores.indexOf(jugador);
      if (index !== -1) {
         this.jugadores.splice(index, 1);
      } else {
         throw new JugadorNoExistenteError("El jugador no existe en el club deportivo.");
      }
   }

   // Método generador para iterar sobre todos los jugadores del club deportivo
   *[Symbol.iterator]() {
      yield* this.jugadores;
   }

   // Método generador para iterar sobre jugadores de baloncesto
   *baloncestoIterator() {
      for (const jugador of this.jugadores) {
         if (jugador instanceof JugadorBaloncesto) {
            yield jugador;
         }
      }
   }

   // Método generador para iterar sobre jugadores de tenis
   *tenisIterator() {
      for (const jugador of this.jugadores) {
         if (jugador instanceof JugadorTenis) {
            yield jugador;
         }
      }
   }

   // Métodos estáticos de comparación para diferentes atributos de Jugador

   // Comparar por edad
   static compararEdad(jugador1, jugador2) {
      const fecha1 = new Date(jugador1.fechaNacimiento);
      const fecha2 = new Date(jugador2.fechaNacimiento);
      if (fecha1 < fecha2) {
         return -1;
      } else {
         return 0;
      }
   }

   // Comparar por nombre
   static compararNombre(jugador1, jugador2) {
      const nombre1 = jugador1.nombre.toLowerCase();
      const nombre2 = jugador2.nombre.toLowerCase();
      if (nombre1 < nombre2) {
         return -1;
      } else {
         return 0;
      }
   }

   // Comparar por apellido
   static compararApellido(jugador1, jugador2) {
      const apellido1 = jugador1.apellido.toLowerCase();
      const apellido2 = jugador2.apellido.toLowerCase();
      if (apellido1 < apellido2) {
         return -1;
      }
      if (apellido1 > apellido2) {
         return 1;
      }
      return 0;
   }

   // Métodos estáticos de comparación específicos para JugadorBaloncesto

   // Comparar por posición
   static compararPosicion(jugador1, jugador2) {
      if (jugador1 instanceof JugadorBaloncesto && jugador2 instanceof JugadorBaloncesto) {
         const posicion1 = jugador1.posicion;
         const posicion2 = jugador2.posicion;
         if (posicion1 < posicion2) {
            return -1;
         } else {
            return 0;
         }
      } else {
         return 0; // Si alguno de los dos no es JugadorBaloncesto, retorna 0 (iguales)
      }
   }

   // Comparar por altura
   static compararAltura(jugador1, jugador2) {
      if (jugador1 instanceof JugadorBaloncesto && jugador2 instanceof JugadorBaloncesto) {
         const altura1 = jugador1.altura;
         const altura2 = jugador2.altura;
         return altura1 - altura2; // Comparación directa de alturas
      } else {
         return 0; // Si alguno de los dos no es JugadorBaloncesto, retorna 0 (iguales)
      }
   }

   // Métodos estáticos de comparación específicos para JugadorTenis

   // Comparar por mano dominante
   static compararManoDominante(jugador1, jugador2) {
      if (jugador1 instanceof JugadorTenis && jugador2 instanceof JugadorTenis) {
         const mano1 = jugador1.manoDominante;
         const mano2 = jugador2.manoDominante;
         if (mano1 < mano2) {
            return -1;
         } else {
            return 0;
         }
      } else {
         return 0; // Si alguno de los dos no es JugadorTenis, retorna 0 (iguales)
      }
   }

   // Método toString para representar el club deportivo como cadena de texto
   toString() {
      let clubString = "Club Deportivo:\n";
      for (const jugador of this.jugadores) {
         clubString += `- ${jugador.toString()}\n`;
      }
      return clubString;
   }
}

// Definición de error personalizado: JugadorExistenteError
class JugadorExistenteError extends Error {
   constructor(message) {
      super(message);
      this.name = "JugadorExistenteError";
   }
}

// Definición de error personalizado: JugadorNoExistenteError
class JugadorNoExistenteError extends Error {
   constructor(message) {
      super(message);
      this.name = "JugadorNoExistenteError";
   }
}
