
// Definición de la clase Inmobiliaria
class Inmobiliaria {
    constructor() {
       if (typeof Inmobiliaria.instance === "object") {
          return Inmobiliaria.instance;
       }
 
       this.inmuebles = [];
       Inmobiliaria.instance = this;
       return this;
    }
 
    // Método para agregar un nuevo inmueble a la inmobiliaria
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
 
    // Iterador que devuelve los inmuebles por tipo de producto
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
 