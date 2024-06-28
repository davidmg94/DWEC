// Definición de la clase abstracta Inmueble
class Inmueble {
   constructor(precio, superficie, direccion, ubicacion) {
      if (this.constructor === Inmueble) {
         throw new Error("No se puede instanciar un objeto de la clase abstracta Inmueble");
      }
      this.precio = precio;
      this.superficie = superficie;
      this.direccion = direccion;
      this.ubicacion = ubicacion;
   }

   // Getters y setters para las propiedades
   get precio() {
      return this._precio;
   }

   set precio(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("El precio debe ser un número positivo.");
      }
      this._precio = value;
   }

   get superficie() {
      return this._superficie;
   }

   set superficie(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("La superficie debe ser un número positivo.");
      }
      this._superficie = value;
   }

   get direccion() {
      return this._direccion;
   }

   set direccion(value) {
      if (typeof value !== "string") {
         throw new Error("La dirección debe ser una cadena de caracteres.");
      }
      this._direccion = value;
   }

   get ubicacion() {
      return this._ubicacion;
   }

   set ubicacion(value) {
      if (!this.validarUbicacion(value)) {
         throw new Error("La ubicación no tiene un formato válido.");
      }
      this._ubicacion = value;
   }

   // Método para validar el formato de la ubicación
   validarUbicacion(ubicacion) {
      const regex = /^[NS]\d{1,2}°\d{1,2}'\d{1,2}'' [EO]\d{1,3}°\d{1,2}'\d{1,2}''$/;
      return regex.test(ubicacion);
   }

   // Método para devolver una representación en cadena del objeto
   toString() {
      return `Precio: ${this.precio}, Superficie: ${this.superficie}, Dirección: ${this.direccion}, Ubicación: ${this.ubicacion}`;
   }
}

// Definición de la clase abstracta Vivienda que hereda de Inmueble
class Vivienda extends Inmueble {
   constructor(precio, superficie, direccion, ubicacion, numHabitaciones, numBanos) {
    super(precio, superficie, direccion, ubicacion);
      if (this.constructor === Vivienda) {
         throw new Error("No se puede instanciar un objeto de la clase abstracta Vivienda");
      }
      this.numHabitaciones = numHabitaciones;
      this.numBanos = numBanos;
   }

   // Getters y setters para las propiedades adicionales
   get numHabitaciones() {
      return this._numHabitaciones;
   }

   set numHabitaciones(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("El número de habitaciones debe ser un número positivo.");
      }
      this._numHabitaciones = value;
   }

   get numBanos() {
      return this._numBanos;
   }

   set numBanos(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("El número de baños debe ser un número positivo.");
      }
      this._numBanos = value;
   }

   // Método para devolver una representación en cadena del objeto
   toString() {
      return `${super.toString()}, Número de Habitaciones: ${this.numHabitaciones}, Número de Baños: ${this.numBanos}`;
   }
}

// Definición de la clase Casa que hereda de Vivienda
class Casa extends Vivienda {
   constructor(precio, superficie, direccion, ubicacion, numHabitaciones, numBanos, numPlantas, tieneJardin) {
      super(precio, superficie, direccion, ubicacion, numHabitaciones, numBanos);
      this.numPlantas = numPlantas;
      this.tieneJardin = tieneJardin;
   }

   // Método para devolver una representación en cadena del objeto
   toString() {
      return `Casa - ${super.toString()}, Número de Plantas: ${this.numPlantas}, Tiene Jardín: ${this.tieneJardin}`;
   }
}

// Definición de la clase Apartamento que hereda de Vivienda
class Apartamento extends Vivienda {
   constructor(precio, superficie, direccion, ubicacion, numHabitaciones, numBanos, planta, tieneGaraje, tieneTrastero) {
      super(precio, superficie, direccion, ubicacion, numHabitaciones, numBanos);
      this.planta = planta;
      this.tieneGaraje = tieneGaraje;
      this.tieneTrastero = tieneTrastero;
   }

   // Método para devolver una representación en cadena del objeto
   toString() {
      return `Apartamento - ${super.toString()}, Planta: ${this.planta}, Tiene Garaje: ${this.tieneGaraje}, Tiene Trastero: ${this.tieneTrastero}`;
   }
}

// Definición de la clase LocalComercial que hereda de Inmueble
class LocalComercial extends Inmueble {
   constructor(precio, superficie, direccion, ubicacion, numPlantas, metrosFachada) {
      super(precio, superficie, direccion, ubicacion);
      this.numPlantas = numPlantas;
      this.metrosFachada = metrosFachada;
   }

   // Getters y setters para las propiedades adicionales
   get numPlantas() {
      return this._numPlantas;
   }

   set numPlantas(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("El número de plantas debe ser un número positivo.");
      }
      this._numPlantas = value;
   }

   get metrosFachada() {
      return this._metrosFachada;
   }

   set metrosFachada(value) {
      if (typeof value !== "number" || value <= 0) {
         throw new Error("Los metros de fachada deben ser un número positivo.");
      }
      this._metrosFachada = value;
   }

   // Método para devolver una representación en cadena del objeto
   toString() {
      return `Local Comercial - ${super.toString()}, Número de Plantas: ${this.numPlantas}, Metros de Fachada: ${this.metrosFachada}`;
   }
}

// Definición de la clase Inmobiliaria
class Inmobiliaria {
   constructor() {
      if (typeof Inmobiliaria.instance === "object") {
         return Inmobiliaria.instance;
      }

      // Lista de inmuebles
      this.inmuebles = [];
      // Singleton
      Inmobiliaria.instance = this;
      return this;
   }

   // Método para agregar uno o más inmuebles a la inmobiliaria
   agregarInmueble(...inmuebles) {
      this.inmuebles.push(...inmuebles);
      return this;
   }

   // Iterador que devuelve los inmuebles ordenados por número de habitaciones
   *inmueblesPorNumHabitaciones() {
      const inmueblesOrdenados = this.inmuebles.slice().sort((a, b) => {
         if (a.numHabitaciones && b.numHabitaciones) {
            return a.numHabitaciones - b.numHabitaciones;
         }
         return 0;
      });
      yield* inmueblesOrdenados;
   }

   // Iterador que devuelve los inmuebles filtrados por tipo
   *inmueblesPorTipo(tipo) {
      const inmueblesFiltrados = this.inmuebles.filter((inmueble) => inmueble.constructor.name === tipo);
      yield* inmueblesFiltrados;
   }

   // Método que devuelve un iterador con los inmuebles que cumplen un criterio específico
   *inmueblesPorCriterio(criterio) {
      const inmueblesFiltrados = this.inmuebles.filter(criterio);
      yield* inmueblesFiltrados;
   }
}
