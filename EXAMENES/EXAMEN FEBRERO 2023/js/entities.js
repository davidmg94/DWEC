// Módulo Appliance que utiliza el patrón IIFE.
const Appliance = (function () {
   // Mapa compartido entre todas las instancias para llevar el conteo por año.
   let secByYear = new Map();

   class Appliance {
      // Campos privados
      #id;
      #brand;
      #model;
      #price;
      #creationDate;

      // Método privado para generar el ID del objeto.
      #generateId() {
         let year = this.#creationDate.getFullYear();
         let id =
            this.#brand.substring(0, 2).toLocaleUpperCase() +
            "-" +
            this.#model.substring(0, 2).toLocaleUpperCase() +
            "-" +
            year +
            "-" +
            this.#getNextId(year);

         return id;
      }

      // Método privado que incrementa el número de cada nuevo objeto instanciado.
      #getNextId(year) {
         let sec;
         // El mapa comienza de 0 cada vez que tenemos un nuevo año.
         if (secByYear.has(year)) {
            sec = secByYear.get(year);
            sec++;
         } else {
            sec = 1;
         }
         secByYear.set(year, sec);
         return sec;
      }

      constructor(brand, model, price) {
         // Verificación del operador new.
         if (!new.target) throw new InvalidAccessConstructorException(); // Verificación operador new
         if (new.target === Appliance) throw new AbstractClassException("Appliance"); // Chequeo clase abstracta

         // Validación de parámetros obligatorios.
         if (!brand) throw new EmptyValueException("brand");
         if (!model) throw new EmptyValueException("model");
         if (!price) throw new EmptyValueException("price");
         price = Number.parseFloat(price);
         if (!price || price <= 0) throw new InvalidValueException("price", price);

         // Definición de atributos privados del objeto.
         this.#brand = brand;
         this.#model = model;
         this.#price = price;
         this.#creationDate = new Date();
         this.#id = this.#generateId();
      }

      // Propiedades de acceso a los atributos privados.
      get id() {
         return this.#id;
      }

      get brand() {
         return this.#brand;
      }
      set brand(value) {
         if (!value) throw new EmptyValueException("brand");
         this.#brand = value;
      }

      get model() {
         return this.#model;
      }
      set model(value) {
         if (!value) throw new EmptyValueException("model");
         this.#model = value;
      }

      get price() {
         return this.#price;
      }
      set price(value) {
         value = Number.parseFloat(value);
         if (Number.isNaN(value) || value <= 0) throw new InvalidValueException("price", value);
         this.#price = value;
      }

      get creationDate() {
         return this.#creationDate;
      }

      // Método que devuelve una cadena con los atributos del objeto.
      toString() {
         return (
            "Id: " +
            this.#id +
            " brand: " +
            this.#brand +
            " model: " +
            this.#model +
            " price: " +
            this.#price +
            " creationDate: " +
            this.#creationDate.toLocaleDateString()
         );
      }

      // Expresión regular para validar identificadores.
      static ID = /^[A-Z]{2}\-[A-Z0-9]{2}\-\d{4}\-\d{1,}$/;
   }

   // Definición de propiedades enumerables para la clase Appliance.
   Object.defineProperty(Appliance.prototype, "id", { enumerable: true });
   Object.defineProperty(Appliance.prototype, "brand", { enumerable: true });
   Object.defineProperty(Appliance.prototype, "model", { enumerable: true });
   Object.defineProperty(Appliance.prototype, "price", { enumerable: true });
   Object.defineProperty(Appliance.prototype, "creationDate", { enumerable: true });

   return Appliance;
})();

// Clase Television que extiende de Appliance.
class Television extends Appliance {
   // Atributos privados
   #inches;

   constructor(brand, model, price, inches) {
      // Verificación del operador new.
      if (!new.target) throw new InvalidAccessConstructorException();

      // Llamada al superconstructor.
      super(brand, model, price);

      if (!inches) throw new EmptyValueException("inches");
      inches = Number.parseInt(inches);
      if (Number.isNaN(inches) || inches <= 0) throw new InvalidValueException("inches", inches);

      // Atributos privados
      this.#inches = inches;
   }

   // Propiedades de acceso para inches.
   get inches() {
      return this.#inches;
   }
   set inches(value) {
      value = Number.parseInt(value);
      if (Number.isNaN(value) || value <= 0) throw new InvalidValueException("inches", value);
      this.#inches = value;
   }
}

// Definición de propiedad enumerable para inches.
Object.defineProperty(Television.prototype, "inches", { enumerable: true });

// Clase Fridge que extiende de Appliance.
class Fridge extends Appliance {
   // Atributos privados
   #color;

   constructor(brand, model, price, color) {
      // Verificación del operador new.
      if (!new.target) throw new InvalidAccessConstructorException();

      // Llamada al superconstructor.
      super(brand, model, price);

      if (!color) throw new EmptyValueException("color");

      // Atributos privados
      this.#color = color;
   }

   // Propiedades de acceso para color.
   get color() {
      return this.#color;
   }
   set color(value) {
      if (!value) throw new EmptyValueException("color");
      this.#color = value;
   }
}

// Definición de propiedad enumerable para color.
Object.defineProperty(Fridge.prototype, "color", { enumerable: true });
