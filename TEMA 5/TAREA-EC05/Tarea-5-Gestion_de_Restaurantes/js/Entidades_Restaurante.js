// Importa las excepciones personalizadas desde el archivo "Excepciones_Restaurante.js"
import { AttributeRequiredException, EmptyValueException } from "./Excepciones_Restaurante.js";

// Definición de la clase Dish (Plato)
class Dish {
   constructor(name) {
      // Verifica si se proporcionó el nombre del plato
      if (!name) {
         throw new AttributeRequiredException("Attribute name required.");
      }
      // Asigna el nombre del plato y establece valores predeterminados para la descripción, ingredientes e imagen
      this._name = name;
      this.description = "There is not description.";
      this.ingredients = "There is not ingredients.";
      this.image = "There is not images.";

      // Define una propiedad de solo lectura "name" para acceder al nombre del plato
      Object.defineProperty(this, "name", {
         enumerable: true,
         get() {
            return this._name;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para el nombre del plato
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._name = value;
         },
      });
   }

   // Método para representar el plato como una cadena de texto
   toString() {
      return `Name: ${this._name}, Description: ${this.description}, Ingredients: ${this.ingredients}, Image: ${this.image} `;
   }
}

// Definición de la clase Category (Categoría)
class Category {
   constructor(name) {
      // Verifica si se proporcionó el nombre de la categoría
      if (!name) {
         throw new AttributeRequiredException("Attribute name required.");
      }
      // Asigna el nombre de la categoría y establece una descripción predeterminada
      this._name = name;
      this.description = "There is not description.";

      // Define una propiedad de solo lectura "name" para acceder al nombre de la categoría
      Object.defineProperty(this, "name", {
         enumerable: true,
         get() {
            return this._name;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para el nombre de la categoría
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._name = value;
         },
      });
   }

   // Método para representar la categoría como una cadena de texto
   toString() {
      return `Name: ${this._name}, Description: ${this.description}. `;
   }
}

// Definición de la clase Allergen (Alérgeno)
class Allergen {
   constructor(name) {
      // Verifica si se proporcionó el nombre del alérgeno
      if (!name) {
         throw new AttributeRequiredException("Attribute name required.");
      }
      // Asigna el nombre del alérgeno y establece una descripción predeterminada
      this._name = name;
      this.description = "There is not description.";

      // Define una propiedad de solo lectura "name" para acceder al nombre del alérgeno
      Object.defineProperty(this, "name", {
         enumerable: true,
         get() {
            return this._name;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para el nombre del alérgeno
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._name = value;
         },
      });
   }

   // Método para representar el alérgeno como una cadena de texto
   toString() {
      return `Name: ${this._name}, Description: ${this.description}. `;
   }
}

// Definición de la clase Menu (Menú)
class Menu {
   constructor(name) {
      // Verifica si se proporcionó el nombre del menú
      if (!name) {
         throw new AttributeRequiredException("Attribute name required.");
      }
      // Asigna el nombre del menú y establece una descripción predeterminada
      this._name = name;
      this.description = "There is not description.";

      // Define una propiedad de solo lectura "name" para acceder al nombre del menú
      Object.defineProperty(this, "name", {
         enumerable: true,
         get() {
            return this._name;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para el nombre del menú
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._name = value;
         },
      });
   }

   // Método para representar el menú como una cadena de texto
   toString() {
      return `Name: ${this._name}, Description: ${this.description}. `;
   }
}

// Definición de la clase Restaurant (Restaurante)
class Restaurant {
   constructor(name) {
      // Verifica si se proporcionó el nombre del restaurante
      if (!name) {
         throw new EmptyValueException("Attribute name required.");
      }
      // Asigna el nombre del restaurante y establece valores predeterminados para la descripción y la ubicación
      this._name = name;
      this.description = "There is not description.";
      this.location = "There is not location information.";

      // Define una propiedad de solo lectura "name" para acceder al nombre del restaurante
      Object.defineProperty(this, "name", {
         enumerable: true,
         get() {
            return this._name;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para el nombre del restaurante
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._name = value;
         },
      });
   }

   // Método para representar el restaurante como una cadena de texto
   toString() {
      return `Name: ${this._name}, Description: ${this.description}, Location: ${this.location}.`;
   }
}

// Definición de la clase Coordinate (Coordenada)
class Coordinate {
   constructor(latitude, longitude) {
      // Verifica si se proporcionaron la latitud y longitud
      if (!latitude && !longitude) {
         throw new AttributeRequired("Attribute latitude and longitud required.");
      }
      // Asigna la latitud y longitud
      this._latitude = latitude;
      this._longitude = longitude;

      // Define una propiedad de solo lectura "latitude" para acceder a la latitud
      Object.defineProperty(this, "latitude", {
         enumerable: true,
         get() {
            return this._latitude;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para la latitud
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._latitude = value;
         },
      });

      // Define una propiedad de solo lectura "longitude" para acceder a la longitud
      Object.defineProperty(this, "longitude", {
         enumerable: true,
         get() {
            return this._longitude;
         },
         set(value) {
            // Verifica si se proporciona un valor vacío para la longitud
            if (!value) throw new EmptyValueException("Attribute name required.");
            this._longitude = value;
         },
      });
   }

   // Método para representar las coordenadas como una cadena de texto
   toString() {
      return `Latitude: ${this._latitude}, Longitude: ${this._longitude}`;
   }
}

// Exporta todas las clases para que estén disponibles para su uso en otros archivos
export { Dish, Category, Allergen, Menu, Restaurant, Coordinate };
