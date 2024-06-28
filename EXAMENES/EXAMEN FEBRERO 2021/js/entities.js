import {
   InvalidAccessConstructorException,
   EmptyValueException,
} from "./exceptions.js";

class Product {
   //Campos privados
   #serial;
   #brand;
   #model;
   #price;
   #taxPercentage;
   #url;
   constructor(serial, brand, model, price, taxPercentage = Product.IVA, url) {
      //La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      // Verificación operador new
      if (new.target === Product) throw new AbstractClassException("Product");
      // Chequeo clase abstracta
      //Validación de parámetros obligatorios
      if (!serial) throw new EmptyValueException("serial");
      if (!brand) throw new EmptyValueException("brand");
      if (!model) throw new EmptyValueException("model");
      price = Number.parseFloat(price);
      if (!price || price <= 0) throw new InvalidValueException("price", price);
      if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException("taxPercentage", taxPercentage);
      //Definición de atributos privados del objeto
      this.#serial = serial;
      this.#brand = brand;
      this.#model = model;
      this.#price = price;
      this.#taxPercentage = taxPercentage;
      Object.defineProperty(this, "serial", {
         enumerable: true,
         get() {
            return this.#serial;
         },
         set(value) {
            if (!value) throw new EmptyValueException("serial");
            this.#serial = value;
         },
      });
      Object.defineProperty(this, "brand", {
         enumerable: true,
         get() {
            return this.#brand;
         },
         set(value) {
            if (!value) throw new EmptyValueException("brand");
            this.#brand = value;
         },
      });
      Object.defineProperty(this, "model", {
         enumerable: true,
         get() {
            return this.#model;
         },
         set(value) {
            if (!value) throw new EmptyValueException("model");
            this.#model = value;
         },
      });
      Object.defineProperty(this, "price", {
         enumerable: true,
         get() {
            return this.#price;
         },
         set(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
            this.#price = value;
         },
      });
      Object.defineProperty(this, "taxPercentage", {
         enumerable: true,
         get() {
            return this.#taxPercentage;
         },
         set(value = Product.IVA) {
            if (!value || value < 0) throw new InvalidValueException("taxPercentage", value);
            this.#taxPercentage = value;
         },
      });
      Object.defineProperty(this, "url", {
         enumerable: true,
         get() {
            return this.#url;
         },
         set(value) {
            if (!value) throw new EmptyValueException("url");
            this.#url = value;
         },
      });
   }
   static get IVA() {
      return 21;
   }
   get priceWithoutTaxes() {
      return this.price - (this.price * this.taxPercentage) / 100;
   }
   get tax() {
      return (this.price * this.taxPercentage) / 100;
   }
   toString() {
      return `Serial: ${this.serial} Brand: ${this.brand} Model: ${this.model} Price: ${this.price}€ Tax: ${this.taxPercentage}%`;
   }
}
Object.defineProperty(Product.prototype, "description", { enumerable: true, writable: true });

class Laptop extends Product {
   // Atributos privados
   #processor;
   #memory;
   #hd;
   #size;
   #system;
   constructor(
      serial,
      brand,
      model,
      price,
      taxPercentage = Product.IVA,
      url,
      processor = "unkonwn",
      memory = "0GB",
      hd = "-",
      size = "0GB",
      system = "unkonwn"
   ) {
      // La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      // Llamada al superconstructor.
      super(serial, brand, model, price, taxPercentage, url);
      // Validación de argumentos
      if (!processor) throw new EmptyValueException("processor");
      if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
      if (!/^((HDD)|(SDD)|(-))$/.test(hd)) throw new InvalidValueException("hd", hd);
      if (!/^((\d+GB)|(\d+TB))$/.test(size)) throw new InvalidValueException("size", size);
      // Atributos privados
      this.#processor = processor;
      this.#memory = memory;
      this.#hd = hd;
      this.#size = size;
      this.#system = system;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, "processor", {
         enumerable: true,
         get() {
            return this.#processor;
         },
         set(value) {
            if (!value) throw new EmptyValueException("processor");
            this.#processor = value;
         },
      });
      Object.defineProperty(this, "memory", {
         enumerable: true,
         get() {
            return this.#memory;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
            this.#memory = value;
         },
      });
      Object.defineProperty(this, "hd", {
         enumerable: true,
         get() {
            return this.#hd;
         },
         set(value) {
            if (!/^((HDD)|(SDD))$/.test(value)) throw new InvalidValueException("hd", value);
            this.#hd = value;
         },
      });
      Object.defineProperty(this, "size", {
         enumerable: true,
         get() {
            return this.#size;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("size", value);
            this.#size = value;
         },
      });
      Object.defineProperty(this, "system", {
         enumerable: true,
         get() {
            return this.#system;
         },
         set(value) {
            if (!value) throw new EmptyValueException("system");
            this.#system = value;
         },
      });
   }
   // Métodos públicos
   toString() {
      return `${super.toString()} System: ${this.system} Processor: ${this.processor} Memoria: ${this.memory} HD: ${this.hd} Size: ${this.size}`;
   }
}

// Definimos la subclase Camera
class Camera extends Product {
   // Atributos privados
   #type;
   #resolution;
   #size;
   constructor(serial, brand, model, price, taxPercentage = Product.IVA, url, type = "-", resolution = 0, size = 0) {
      // La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      // Llamada al superconstructor.
      super(serial, brand, model, price, taxPercentage, url);
      // Validación de argumentos
      resolution = Number.parseFloat(resolution);
      size = Number.parseFloat(size);
      if (!/^((Digital)|(Reflex)|(-))$/.test(type)) throw new InvalidValueException("type", type);
      if (Number.isNaN(resolution) || resolution < 0) throw new InvalidValueException("resolution", resolution);
      if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);
      // Atributos privados
      this.#type = type;
      this.#resolution = resolution;
      this.#size = size;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, "type", {
         enumerable: true,
         get() {
            return this.#type;
         },
         set(value) {
            if (!/^((Digital)|(Reflex)|(-))$/.test(value)) throw new InvalidValueException("type", value);
            this.#type = value;
         },
      });
      Object.defineProperty(this, "resolution", {
         enumerable: true,
         get() {
            return this.#resolution;
         },
         set(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) || value < 0) throw new InvalidValueException("resolution", value);
            this.#resolution = value;
         },
      });
      Object.defineProperty(this, "size", {
         enumerable: true,
         get() {
            return this.#size;
         },
         set(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
            this.#size = value;
         },
      });
   }
   // Métodos públicos
   toString() {
      return `${super.toString()} Tipo: ${this.type} Resolución: ${this.resolution}MP Size: ${this.size}''`;
   }
}

// Definimos la subclase Smartphone
class Smartphone extends Product {
   // Atributos privados
   #memory;
   #storage;
   #resolution;
   #size;
   constructor(serial, brand, model, price, taxPercentage = Product.IVA, url, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0) {
      // La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      // Llamada al superconstructor.
      super(serial, brand, model, price, taxPercentage, url);
      // Validación de argumentos
      if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
      if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage", storage);
      size = Number.parseFloat(size);
      if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);
      if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution", resolution);
      // Atributos privados
      this.#memory = memory;
      this.#storage = storage;
      this.#resolution = resolution;
      this.#size = size;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, "memory", {
         enumerable: true,
         get() {
            return this.#memory;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
            this.#memory = value;
         },
      });
      Object.defineProperty(this, "resolution", {
         enumerable: true,
         get() {
            return this.#resolution;
         },
         set(value) {
            if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution", value);
            this.#resolution = value;
         },
      });
      Object.defineProperty(this, "storage", {
         enumerable: true,
         get() {
            return this.#storage;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage", value);
            this.#storage = value;
         },
      });
      Object.defineProperty(this, "size", {
         enumerable: true,
         get() {
            return this.#size;
         },
         set(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
            this.#size = value;
         },
      });
   }
   // Métodos públicos
   toString() {
      return `${super.toString()} System: ${this.system} Memoria: ${this.memory} Almacenamiento: ${this.storage} Resolución: ${
         this.resolution
      } Size: ${this.size}''`;
   }
}

// Definimos la subclase Tablet
class Tablet extends Product {
   // Atributos privados
   #memory;
   #storage;
   #resolution;
   #size;
   constructor(serial, brand, model, price, taxPercentage = Product.IVA, url, memory = "0GB", storage = "0GB", resolution = "0x0", size = 0) {
      // La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();
      // Llamada al superconstructor.
      super(serial, brand, model, price, taxPercentage, url);
      // Validación de argumentos
      if (!/^((\d+GB)|(\d+TB))$/.test(memory)) throw new InvalidValueException("memory", memory);
      if (!/^((\d+GB)|(\d+TB))$/.test(storage)) throw new InvalidValueException("storage", storage);
      size = Number.parseFloat(size);
      if (Number.isNaN(size) || size < 0) throw new InvalidValueException("size", size);
      if (!/^(\d+x\d+)$/.test(resolution)) throw new InvalidValueException("resolution", resolution);
      // Atributos privados
      this.#memory = memory;
      this.#storage = storage;
      this.#resolution = resolution;
      this.#size = size;
      // Propiedades de acceso a los atributos privados
      Object.defineProperty(this, "memory", {
         enumerable: true,
         get() {
            return this.#memory;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("memory", value);
            this.#memory = value;
         },
      });
      Object.defineProperty(this, "resolution", {
         enumerable: true,
         get() {
            return this.#resolution;
         },
         set(value) {
            if (!/^(\d+x\d+)$/.test(value)) throw new InvalidValueException("resolution", value);
            this.#resolution = value;
         },
      });
      Object.defineProperty(this, "storage", {
         enumerable: true,
         get() {
            return this.#storage;
         },
         set(value) {
            if (!/^((\d+GB)|(\d+TB))$/.test(value)) throw new InvalidValueException("storage", value);
            this.#storage = value;
         },
      });
      Object.defineProperty(this, "size", {
         enumerable: true,
         get() {
            return this.#size;
         },
         set(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) || value < 0) throw new InvalidValueException("size", value);
            this.#size = value;
         },
      });
   }
   // Métodos públicos
   toString() {
      return (
         `${super.toString()} System: ` +
         ` System: ${this.system} Memoria: ${this.memory} Almacenamiento: ${this.storage} Resolución: ${this.resolution} Size: ${this.size}''`
      );
   }
}

class Category {
   #title;
   #url;
   constructor(title = "Anon", url = "https://via.placeholder.com/258x172.jpg?text=SinNombre") {
      if (!new.target) throw new InvalidAccessConstructorException();
      if (!title) throw new EmptyValueException("title");
      if (!url) throw new EmptyValueException("url");
      this.#title = title;
      this.#url = url;
      this.description = "";
      Object.defineProperty(this, "title", {
         enumerable: true,
         get() {
            return this.#title;
         },
         set(value) {
            if (!value) throw new EmptyValueException("title");
            this.#title = value;
         },
      });
      Object.defineProperty(this, "url", {
         enumerable: true,
         get() {
            return this.#url;
         },
         set(value) {
            if (!value) throw new EmptyValueException("url");
            this.#url = value;
         },
      });
   }
}
export { Product, Laptop, Camera, Smartphone, Tablet, Category };
