// Importamos excepciones personalizadas y clases de entidades
import {
   InvalidAccessConstructorException,
   ProductNotExistInCategoryException,
   ObjecManagerException,
   CategoryExistsException,
   CategoryNotExistException,
   ProductExistsException,
   ProductNotExistInManagerException,
   ProductExistInCategoryException,
} from "./exceptions.js";
import { Product, Laptop, Camera, Smartphone, Tablet, Category } from "./entities.js";

// Definición del patrón Singleton para la clase Manager
const Manager = (function () {
   // Variable para guardar la instancia única
   let instantiated;

   // Clase Manager
   class Manager {
      // Propiedades privadas
      #categories = [];
      #products = [];
      #order = {
         serial: (productA, productB) => {
            return productA.serial < productB.serial ? -1 : 1;
         },
         brand: (productA, productB) => {
            return productA.brand < productB.brand ? -1 : 1;
         },
         model: (productA, productB) => {
            return productA.model < productB.model ? -1 : 1;
         },
         price: (productA, productB) => {
            return productA.price < productB.price ? -1 : 1;
         },
      };

      // Constructor de la clase Manager
      constructor() {
         // Asegura que la función se invoque con 'new'
         if (!new.target) throw new InvalidAccessConstructorException();

         // Definición de la propiedad 'categories' con un iterador
         Object.defineProperty(this, "categories", {
            enumerable: true,
            get() {
               const array = this.#categories;
               return {
                  *[Symbol.iterator]() {
                     for (const arrayCat of array) {
                        yield arrayCat.category;
                     }
                  },
               };
            },
         });

         // Definición de la propiedad 'products' con un iterador
         Object.defineProperty(this, "products", {
            enumerable: true,
            get() {
               const array = this.#products;
               return {
                  *[Symbol.iterator]() {
                     for (const product of array) {
                        yield product;
                     }
                  },
               };
            },
         });
      }

      // Método privado para obtener la posición de una categoría
      #getCategoryPosition(category) {
         return this.#categories.findIndex((x) => x.category.title === category.title);
      }

      // Función de comparación para ordenar categorías
      #sortCategoriesFunc = (catA, catB) => (catA.category.title.toLocaleLowerCase() < catB.category.title.toLocaleLowerCase() ? -1 : 1);

      // Método para añadir categorías
      addCategory(...categories) {
         for (const category of categories) {
            // Verifica que la categoría sea una instancia de Category
            if (!(category instanceof Category)) {
               throw new ObjecManagerException("category", "Category");
            }
            const position = this.#getCategoryPosition(category);
            // Si la categoría no existe, la añade y ordena las categorías
            if (position === -1) {
               this.#categories.push({ category, products: [] });
               this.#categories.sort(this.#sortCategoriesFunc);
            } else {
               throw new CategoryExistsException(category);
            }
         }
         return this;
      }

      // Método privado para obtener la posición de un producto
      #getProductPosition(product) {
         return this.#products.findIndex((x) => x.serial === product.serial);
      }

      // Función de comparación para ordenar productos
      #sortProductsFunc = (productA, productB) => {
         if (productA.brand.toLocaleLowerCase() < productB.brand.toLocaleLowerCase()) {
            return -1;
         }
         if (productA.brand.toLocaleLowerCase() > productB.brand.toLocaleLowerCase()) {
            return 1;
         }
         return productA.model.toLocaleLowerCase() < productB.model.toLocaleLowerCase() ? -1 : 1;
      };

      // Método para añadir productos
      addProduct(...products) {
         for (const product of products) {
            // Verifica que el producto sea una instancia de Product
            if (!(product instanceof Product)) {
               throw new ObjecManagerException("product", "Product");
            }
            const position = this.#getProductPosition(product);
            // Si el producto no existe, lo añade y ordena los productos
            if (position === -1) {
               this.#products.push(product);
               this.#products.sort(this.#sortProductsFunc);
            } else {
               throw new ProductExistsException(product);
            }
         }
         return this;
      }

      // Método privado para obtener la posición de un producto en una categoría
      #getProductPositionInCategory(product, category) {
         return category.products.findIndex((x) => x.serial === product.serial);
      }

      // Función de comparación para ordenar productos en una categoría
      #sortProductsInCategoryFunc = (productA, productB) => (productA.price > productB.price ? -1 : 1);

      // Método para añadir productos a una categoría
      addProductInCategory(category, ...products) {
         // Verifica que la categoría sea una instancia de Category
         if (!(category instanceof Category)) {
            throw new ObjecManagerException("category", "Category");
         }
         let pCategory = this.#getCategoryPosition(category);
         // Si la categoría no existe, la añade
         if (pCategory === -1) {
            this.addCategory(category);
            pCategory = this.#getCategoryPosition(category);
         }
         for (const product of products) {
            // Verifica que el producto sea una instancia de Product
            if (!(product instanceof Product)) {
               throw new ObjecManagerException("product", "product");
            }
            let pProduct = this.#getProductPosition(product);
            // Si el producto no existe, lo añade
            if (pProduct === -1) {
               this.addProduct(product);
               pProduct = this.#getProductPosition(product);
            }
            const position = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
            // Si el producto no existe en la categoría, lo añade y ordena
            if (position === -1) {
               this.#categories[pCategory].products.push(this.#products[pProduct]);
               this.#categories[pCategory].products.sort(this.#sortProductsInCategoryFunc);
            } else {
               throw new ProductExistInCategoryException(product, category);
            }
         }
         return this;
      }

      // Generador para obtener productos de una categoría
      *getCategoryProducts(category) {
         // Verifica que la categoría sea una instancia de Category
         if (!(category instanceof Category)) {
            throw new ObjecManagerException("category", "Category");
         }
         let position = this.#getCategoryPosition(category);
         if (position !== -1) {
            let array = this.#categories[position].products;
            for (let product of array) {
               yield product;
            }
         } else {
            throw new CategoryNotExistException(category);
         }
      }

      // Método para eliminar categorías
      removeCategory(...categories) {
         for (const category of categories) {
            // Verifica que la categoría sea una instancia de Category
            if (!(category instanceof Category)) {
               throw new ObjecManagerException("category", "Category");
            }
            const position = this.#getCategoryPosition(category);
            // Si la categoría existe, la elimina
            if (position !== -1) {
               this.#categories.splice(position, 1);
            } else {
               throw new CategoryNotExistException(category);
            }
         }
         return this;
      }

      // Método para eliminar productos
      removeProduct(...products) {
         for (const product of products) {
            // Verifica que el producto sea una instancia de Product
            if (!(product instanceof Product)) {
               throw new ObjecManagerException("product", "product");
            }
            const position = this.#getProductPosition(product);
            // Si el producto existe, lo elimina de todas las categorías y de la lista de productos
            if (position !== -1) {
               const storedProduct = this.#products[position];
               for (const category of this.#categories) {
                  const pProduct = this.#getProductPositionInCategory(storedProduct, category);
                  if (pProduct !== -1) {
                     category.products.splice(pProduct, 1);
                  }
               }
               this.#products.splice(position, 1);
            } else {
               throw new ProductNotExistInManagerException(product);
            }
         }
         return this;
      }

      // Método para eliminar productos de una categoría específica
      removeProductInCategory(category) {
         // Verifica que la categoría sea una instancia de Category
         if (!(category instanceof Category)) {
            throw new ObjecManagerException("category", "Category");
         }
         let pCategory = this.#getCategoryPosition(category);
         if (pCategory !== -1) {
            for (let i = 1; i < arguments.length; i++) {
               let product = arguments[i];
               // Verifica que el producto sea una instancia de Product
               if (!(product instanceof Product)) {
                  throw new ObjecManagerException("product", "product");
               }
               let pProduct = this.#getProductPositionInCategory(product, this.#categories[pCategory]);
               // Si el producto existe en la categoría, lo elimina
               if (pProduct !== -1) {
                  this.#categories[pCategory].products.splice(pProduct, 1);
               } else {
                  throw new ProductNotExistInCategoryException(product, this.#categories[pCategory].category);
               }
            }
         } else {
            throw new CategoryNotExistException(category);
         }
         return this;
      }

      // Generador para obtener productos de un tipo específico
      *getTypeProducts(type, field) {
         const array = this.#products.filter((product) => product instanceof type);
         // Ordena los productos según el campo especificado
         if (this.#order[field]) {
            array.sort(this.#order[field]);
         }
         for (const product of array) {
            yield product;
         }
      }

      // Método para limpiar todas las categorías y productos
      clear() {
         this.#categories.length = 0;
         this.#products.length = 0;
      }

      // Método para convertir la información del manager a un string
      toString(separator = "\n") {
         let str = "";
         for (const category of this.categories) {
            str += category.title + separator;
            for (const product of this.getCategoryProducts(category)) {
               str += product.toString() + separator;
            }
         }
         return str;
      }
   }

   // Función para inicializar el singleton
   function init() {
      const manager = new Manager();
      Object.freeze(manager);
      return manager;
   }

   // Objeto retornado que maneja la instancia única
   return {
      getInstance() {
         if (!instantiated) {
            instantiated = init();
         }
         return instantiated;
      },
   };
})();

export { Manager };
