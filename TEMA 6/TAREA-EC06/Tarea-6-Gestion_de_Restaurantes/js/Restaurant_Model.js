//Importamos las excepciones.
import {
   ErrorExistenceElementException,
   ElementExistsYetException,
   ElementRecordedYetException,
   ElementNotRecordedException,
} from "./Excepciones_Restaurante.js";

//Importamos las clases de los objetos.
import { Dish, Category, Allergen, Menu, Restaurant } from "./Entidades_Restaurante.js";

//Creación de la propiedad privada instance mediante Symbol.
const instance = Symbol("instancia");

/**Creación de la clase Manager la cuál sigue una estructura singleton.*/
class RestaurantsManager {
   [instance]; // Propiedad privada para almacenar la instancia única de la clase
   constructor(name) {
      this.name = name;
      this._category = [];
      this._allergens = [];
      this._dishes = [];
      this._menus = [];
      this._restaurants = [];

      //Hacemos iterables los arrays.
      // Definición de propiedades de solo lectura para acceder a las listas de categorías, alérgenos, platos, menús y restaurantes.
      Object.defineProperty(this, "categories", {
         enumerable: true,
         get() {
            const array = this._category;
            return {
               *[Symbol.iterator]() {
                  for (const arrayCat of array) {
                     yield arrayCat.category;
                  }
               },
            };
         },
      });

      Object.defineProperty(this, "allergens", {
         enumerable: true,
         get() {
            const array = this._allergens;
            return {
               *[Symbol.iterator]() {
                  for (const arrayAll of array) {
                     yield arrayAll.allergen;
                  }
               },
            };
         },
      });

      Object.defineProperty(this, "dishes", {
         enumerable: true,
         get() {
            const array = this._dishes;
            return {
               *[Symbol.iterator]() {
                  for (const dish of array) {
                     yield dish;
                  }
               },
            };
         },
      });

      Object.defineProperty(this, "menus", {
         enumerable: true,
         get() {
            const array = this._menus;
            return {
               *[Symbol.iterator]() {
                  for (const arrayMenu of array) {
                     yield arrayMenu.menu;
                  }
               },
            };
         },
      });

      Object.defineProperty(this, "restaurants", {
         enumerable: true,
         get() {
            const array = this._restaurants;
            return {
               *[Symbol.iterator]() {
                  for (const restaurant of array) {
                     yield restaurant;
                  }
               },
            };
         },
      });
   }

   //Función que devuelve una instancia de Restaurants Manager si ya existe, sino crea una nueva.
   static getInstance() {
      if (!this[instance]) {
         this[instance] = new RestaurantsManager();
      }
      return this[instance];
   }

   //Función que devuelve un iterador con la categorías creadas. Para ello utilizamos un generador.
   *getterCategories() {
      for (const iterator of this._category) {
         yield iterator;
      }
   }

   //Función que devuelve un iterador con los menús creados. Para ello utilizamos un generador.
   *getterMenus() {
      for (const iterator of this._menus) {
         yield iterator;
      }
   }

   //Función que devuelve un iterador con los alérgenos creados. Para ello utilizamos un generador.
   *getterAllergens() {
      for (const iterator of this._allergens) {
         yield iterator;
      }
   }

   //Función que devuelve un iterador con los restaurantes creados. Para ello utilizamos un generador.
   *getterRestaurants() {
      for (const iterator of this._restaurants) {
         yield iterator;
      }
   }

   // Método privado para obtener la posición de un objeto en una lista
   // por el nombre según su tipo (categoría, menú, alérgeno)
   #getPosition(list, object, objectName) {
      console.log(object instanceof Category);
      if (!object || !(object instanceof objectName)) {
         throw new ErrorExistenceElementException(`${objectName} can't be null and must be ${objectName} object.`);
      } else {
         if (object instanceof Category) {
            return list.findIndex((x) => x.category.name === object._name);
         } else if (object instanceof Menu) {
            return list.findIndex((x) => x.menu.name === object._name);
         } else if (object instanceof Allergen) {
            return list.findIndex((x) => x.allergen.name === object._name);
         }
      }
   }

   // Métodos privados para obtener la posición de un plato en una categoría, menú o alérgeno específico
   #getDishPositionsInCategory(dish, category) {
      if (!category || !dish) {
         throw new ErrorExistenceElementException("Dish and Category can`t be null.");
      } else {
         const positionDishInCategory = category.dishes.findIndex((x) => x.name === dish.name);
         return positionDishInCategory;
      }
   }

   #getDishPositionsInMenu(dish, menu) {
      if (!menu || !dish) {
         throw new ErrorExistenceElementException("Dish and Menu can`t be null.");
      } else {
         const positionDishInMenu = menu.dishes.findIndex((x) => x.name === dish.name);
         return positionDishInMenu;
      }
   }

   #getDishPositionsInAllergens(dish, allergen) {
      if (!allergen || !dish) {
         throw new ErrorExistenceElementException("Dish and Allergen can`t be null.");
      } else {
         const positionDishInAllergen = allergen.dishes.findIndex((x) => x.name === dish.name);
         return positionDishInAllergen;
      }
   }

   // Método para ordenar objetos por el nombre en orden alfabetico
   #sortObjects = function (objA, objB) {
      if (objA.object instanceof Category && objB.object instanceof Category) {
         //Realizamos la comparación con la función localeCompare() ya sean de minusculas o mayusculas (función toLocaleLowerCase);
         return objA.object.name.toLocaleLowerCase().localeCompare(objB.object.name.toLocaleLowerCase());
      }

      if (objA.object instanceof Menu && objB.object instanceof Menu) {
         return objA.object.name.toLocaleLowerCase().localeCompare(objB.object.name.toLocaleLowerCase());
      }

      if (objA.object instanceof Allergen && objB.object instanceof Allergen) {
         return objA.object.name.toLocaleLowerCase().localeCompare(objB.object.name.toLocaleLowerCase());
      }

      if (objA instanceof Dish && objB instanceof Dish) {
         return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
      }

      if (objA instanceof Restaurant && objB instanceof Restaurant) {
         return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
      }

      return 0; // Si los objetos no son del mismo tipo, devuelve 0 (sin orden específico).
   };

   // Método para agregar un objeto a una lista
   #addObject(list, object, objectName) {
      const position = this.#getPosition(list, object, objectName);
      if (position !== -1) {
         // Si el objeto ya existe en la lista, lanza una excepción
         throw new ElementRecordedYetException(`${object.name} exists yet.`);
      } else {
         // Si el objeto no existe en la lista, lo agrega
         if (object instanceof Category) {
            // Si el objeto es una categoría
            let category = object;
            if (position === -1) {
               // Si la posición es -1, lo que indica que el objeto no está en la lista y lo agrega
               list.push({
                  category,
                  dishes: [],
               });
               list.sort(this.#sortObjects);
            }
         } else if (object instanceof Menu) {
            // Si el objeto es un menú
            let menu = object;
            if (position === -1) {
               // Si la posición es -1, lo que indica que el objeto no está en la lista y lo agrega
               list.push({
                  menu,
                  dishes: [],
               });
               list.sort(this.#sortObjects);
            }
         } else if (object instanceof Allergen) {
            // Si el objeto es un alérgeno
            let allergen = object;
            if (position === -1) {
               // Si la posición es -1, lo que indica que el objeto no está en la lista y lo agrega
               list.push({
                  allergen,
                  dishes: [],
               });
               list.sort(this.#sortObjects);
            }
         }
      }
   }

   // Método para eliminar un objeto de una lista y ordenarla
   #removeObject(list, object, objectName) {
      const position = this.#getPosition(list, object, objectName);
      if (position !== -1) {
         list.splice(position, 1); // Elimina el objeto de la lista
      } else {
         throw new ElementNotRecordedException(`${object.name} not recorded.`);
      }
   }

   // Métodos para agregar y eliminar categorías, menús y alérgenos
   addCategory(...categories) {
      for (const category of categories) {
         this.#addObject(this._category, category, Category);
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   removeCategory(...categories) {
      for (const category of categories) {
         this.#removeObject(this._category, category, Category);
         console.log(`Categoría: ${category.name} eliminada con éxito.`);
      }
   }

   addMenu(...menus) {
      for (const menu of menus) {
         this.#addObject(this._menus, menu, Menu);
      }
      return this;
   }

   removeMenu(...menus) {
      for (const menu of menus) {
         this.#removeObject(this._menus, menu, Menu);
         console.log(`${menu.name} : eliminado con éxito.`);
      }
   }

   addAllergen(...allergens) {
      for (const allergen of allergens) {
         this.#addObject(this._allergens, allergen, Allergen);
      }
      return this;
   }

   removeAllergens(...allergens) {
      for (const allergen of allergens) {
         this.#removeObject(this._allergens, allergen, Allergen);
         console.log(`Alérgeno: ${allergen.name} eliminado con éxito.`);
      }
   }

   // Método para obtener la posición de un plato en la lista de platos
   #getDishPosition(dish) {
      if (!dish || !(dish instanceof Dish)) {
         // Verifica si el plato es nulo o no es una instancia de la clase Dish
         throw new ErrorExistenceElementException("The dish cannot be null or is not a Dish object.");
      }
      return this._dishes.findIndex((x) => x.name === dish._name);
   }

   // Método para obtener la posición de un restaurante en la lista de restaurantes
   #getRestaurantPosition(restaurant) {
      if (!restaurant || !(restaurant instanceof Restaurant)) {
         throw new ErrorExistenceElementException("The restaurant cannot be null or is not a Restaurant object.");
      }
      return this._restaurants.findIndex((x) => x.name === restaurant.name);
   }

   // Método para agregar platos a la lista de platos
   addDish(...dishes) {
      for (const dish of dishes) {
         // Itera sobre cada plato pasado como argumento
         const position = this.#getDishPosition(dish);
         if (position === -1) {
            // Si el plato no existe en la lista
            this._dishes.push(dish); // Agrega el plato a la lista
            this._dishes.sort(this.#sortObjects); // Ordena la lista después de agregar el plato
         } else {
            // Si el plato ya existe en la lista, lanza una excepción
            throw new ElementExistsYetException(`${dish._name} exists yet.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para eliminar platos de la lista de platos
   removeDish(...dishes) {
      for (const dish of dishes) {
         // Itera sobre cada plato pasado como argumento
         const position = this.#getDishPosition(dish);
         const storedDishes = this._dishes[position];
         if (storedDishes) {
            // Si el plato existe en la lista
            for (const category of this._category) {
               // Itera sobre cada categoría en la lista de categorías
               const positionCategory = this.#getDishPositionsInCategory(storedDishes, category);
               if (positionCategory !== -1) {
                  // Si el plato está asignado a esta categoría
                  category.dishes.splice(positionCategory, 1); // Elimina el plato de la categoría
                  console.log(`Plato: ${dish.name} eliminado con exito y desasignado de: ${category.category.name} `);
               }
            }

            for (const menu of this._menus) {
               // Itera sobre cada menú en la lista de menús
               const positionMenu = this.#getDishPositionsInMenu(storedDishes, menu);
               if (positionMenu !== -1) {
                  // Si el plato está asignado a este menú
                  menu.dishes.splice(positionMenu, 1); // Elimina el plato del menú
                  console.log(`Plato: ${dish.name} eliminado con exito y desasignado de: ${menu.menu.name} `);
               }
            }

            for (const allergen of this._allergens) {
               // Itera sobre cada alérgeno en la lista de alérgenos
               const positionAllergen = this.#getDishPositionsInAllergens(storedDishes, allergen);
               if (positionAllergen !== -1) {
                  // Si el plato está asignado a este alérgeno
                  console.log(`Plato: ${dish.name} eliminado con exito y desasignado de: ${allergen.allergen.name} `);
                  allergen.dishes.splice(positionAllergen, 1); // Elimina el plato del alérgeno
               }
            }

            this._dishes.splice(position, 1); // Elimina el plato de la lista de platos
         } else {
            // Si el plato no existe en la lista, lanza una excepción
            throw new ElementNotRecordedException(`${dish.name} not exist in our records.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para agregar restaurantes a la lista de restaurantes
   addRestaurant(...restaurants) {
      for (const restaurant of restaurants) {
         const position = this.#getRestaurantPosition(restaurant);
         if (position === -1) {
            this._restaurants.push(restaurant);
            this._restaurants.sort(this.#sortObjects);
         } else {
            throw new ElementExistsYetException(`${restaurant._name} exists yet.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para eliminar restaurantes de la lista de restaurantes
   removeRestaurant(...restaurants) {
      for (const restaurant of restaurants) {
         const position = this.#getRestaurantPosition(restaurant);
         if (position !== -1) {
            this._restaurants.splice(position, 1); // Elimina el restaurante de la lista de restaurantes
         } else {
            throw new ElementNotRecordedException(`${restaurant._name} don't exists.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para asignar una categoría a un plato
   assignCategoryToDish(category, ...dishes) {
      let positionCategory = this.#getPosition(this._category, category, Category);
      if (positionCategory === -1) {
         this.addCategory(category); // Agrega la categoría si no existe en la lista
         positionCategory = this.#getPosition(this._category, category, Category); // Actualiza la posición de la categoría
      }

      // Itera sobre cada plato pasado como argumento
      for (const dish of dishes) {
         let positionDish = this.#getDishPosition(dish);
         if (positionDish === -1) {
            this.addDish(dish); // Agrega el plato si no existe en la lista de platos
            positionDish = this.#getDishPosition(dish); // Actualiza la posición del plato
         }

         // Obtiene la posición del plato en la categoría
         const position = this.#getDishPositionsInCategory(dish, this._category[positionCategory]);

         if (position === -1) {
            // Si el plato no está asignado a la categoría
            this._category[positionCategory].dishes.push(this._dishes[positionDish]); // Asigna el plato a la categoría
            this._category[positionCategory].dishes.sort(this.#sortObjects); // Ordena la lista de platos en la categoría
         } else {
            // Si el plato ya está asignado a la categoría, lanza una excepción
            throw new ElementExistsYetException(`${dish.name} exists in category records yet.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para desasignar una categoría de un plato
   deassignCategoryToDish(category, ...dishes) {
      let positionCategory = this.#getPosition(this._category, category, Category);

      if (positionCategory !== -1) {
         // Si la categoría existe en la lista de categorías
         for (let index = 0; index < dishes.length; index++) {
            let dish = dishes[index];

            // Obtiene la posición del plato en la categoría
            let positionDish = this.#getDishPositionsInCategory(dish, this._category[positionCategory]);

            if (positionDish !== -1) {
               // Si el plato está asignado a la categoría, lo elimina
               this._category[positionCategory].dishes.splice(positionDish, 1); // Elimina el plato de la categoría
               console.log(`Plato: ${dish.name} eliminado de la categoría: ${category.name}`);
            } else {
               // Si el plato no está asignado a la categoría, lanza una excepción
               throw new ElementNotRecordedException(`${dish.name} not exist in category records.`);
            }
         }
      } else {
         // Si la categoría no existe en la lista de categorías, lanza una excepción
         throw new ErrorExistenceElementException("Category don't exists.");
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para asignar un alérgeno a un plato
   assignAllergenToDish(allergen, ...dishes) {
      let positionAllergen = this.#getPosition(this._allergens, allergen, Allergen);
      if (positionAllergen === -1) {
         this.addAllergen(allergen); // Agrega el alérgeno si no existe
         positionAllergen = this.#getPosition(this._allergens, allergen, Allergen);
      }

      for (const dish of dishes) {
         // Obtiene la posición del plato en la lista de platos
         let positionDish = this.#getDishPosition(dish);
         if (positionDish === -1) {
            this.addDish(dish); // Agrega el plato si no existe
            positionDish = this.#getDishPosition(dish);
         }

         // Verifica si el plato ya está asignado al alérgeno
         const position = this.#getDishPositionsInAllergens(dish, this._allergens[positionAllergen]);

         if (position === -1) {
            // Si el plato no está asignado al alérgeno, lo asigna
            this._allergens[positionAllergen].dishes.push(this._dishes[positionDish]); // Asigna el plato al alérgeno
            this._allergens[positionAllergen].dishes.sort(this.#sortObjects); // Ordena la lista de platos en el alérgeno
         } else {
            // Si el plato ya está asignado al alérgeno, lanza una excepción
            throw new ElementRecordedYetException(`${dish.name} exists in allergens records yet.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para desasignar un alérgeno de un plato
   deassignAllergenToDish(allergen, ...dishes) {
      let positionAllergen = this.#getPosition(this._allergens, allergen, Allergen);

      if (positionAllergen !== -1) {
         // Si el alérgeno existe en la lista de alérgenos
         for (let index = 0; index < dishes.length; index++) {
            let dish = dishes[index];

            // Obtiene la posición del plato en la lista de platos asignados al alérgeno
            let positionDish = this.#getDishPositionsInAllergens(dish, this._allergens[positionAllergen]);

            if (positionDish !== -1) {
               // Si el plato está asignado al alérgeno, lo elimina
               this._allergens[positionAllergen].dishes.splice(positionDish, 1); // Elimina el plato del alérgeno
               console.log(`Plato: ${dish.name} eliminado del alérgeno: ${allergen.name}`);
            } else {
               // Si el plato no está asignado al alérgeno, lanza una excepción
               throw new ElementNotRecordedException(`${dish.name} not exist in allergens records.`);
            }
         }
      } else {
         // Si el alérgeno no existe en la lista de alérgenos, lanza una excepción
         throw new ErrorExistenceElementException("Category don't exists.");
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para asignar platos a un menú
   assignDishToMenu(menu, ...dishes) {
      // Obtiene la posición del menú en la lista de menús
      let positionMenu = this.#getPosition(this._menus, menu, Menu);
      if (positionMenu === -1) {
         this.addMenu(menu); // Agrega el menú si no existe
         positionMenu = this.#getPosition(this._menus, menu, Menu);
      }

      for (const dish of dishes) {
         // Obtiene la posición del plato en la lista de platos
         let positionDish = this.#getDishPosition(dish);
         if (positionDish === -1) {
            this.addDish(dish); // Agrega el plato si no existe
            positionDish = this.#getDishPosition(dish);
         }

         // Verifica si el plato ya está asignado al menú
         const position = this.#getDishPositionsInMenu(dish, this._menus[positionMenu]);

         if (position === -1) {
            // Si el plato no está asignado al menú, lo asigna
            this._menus[positionMenu].dishes.push(this._dishes[positionDish]); // Asigna el plato al menú
            this._menus[positionMenu].dishes.sort(this.#sortObjects); // Ordena la lista de platos en el menú
         } else {
            // Si el plato ya está asignado al menú, lanza una excepción
            throw new ElementRecordedYetException(`${dish.name} exists in menus records yet.`);
         }
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para desasignar platos de un menú
   deassignDishToMenu(menu, ...dishes) {
      // Obtiene la posición del menú en la lista de menús
      let positionMenu = this.#getPosition(this._menus, menu, Menu);

      if (positionMenu !== -1) {
         // Si el menú existe en la lista de menús
         for (let index = 0; index < dishes.length; index++) {
            let dish = dishes[index];

            // Obtiene la posición del plato en la lista de platos asignados al menú
            let positionDish = this.#getDishPositionsInMenu(dish, this._menus[positionMenu]);

            if (positionDish !== -1) {
               // Si el plato está asignado al menú, lo elimina
               this._menus[positionMenu].dishes.splice(positionDish, 1); // Elimina el plato del menú
               console.log(`Plato: ${dish.name} eliminado del ${menu.name}`);
            } else {
               // Si el plato no está asignado al menú, lanza una excepción
               throw new ElementNotRecordedException(`${dish.name} not exist in menus records.`);
            }
         }
      } else {
         // Si el menú no existe en la lista de menús, lanza una excepción
         throw new ErrorExistenceElementException("Category don't exists.");
      }
      return this; // Devuelve la instancia de la clase para permitir el encadenamiento de métodos
   }

   // Método para cambiar la posición de dos platos en un menú
   changeDishesPositionsInMenu(menu, dish1, dish2) {
      // Obtiene la posición del menú en la lista de menús
      let positionMenu = this.#getPosition(this._menus, menu, Menu);

      // Verifica que los platos no sean nulos y sean instancias de Dish
      if (dish1 === null || (!(dish1 instanceof Dish) && dish2 === null) || !(dish2 instanceof Dish)) {
         throw new ErrorExistenceElementException("Dish can't be null and must be Dish object.");
      }

      if (positionMenu !== -1) {
         // Si el menú existe en la lista de menús
         let positionDish1 = this.#getDishPositionsInMenu(dish1, this._menus[positionMenu]);
         console.log(`Posición del plato ${dish1.name} antes del intercambio: ${positionDish1}`);
         let positionDish2 = this.#getDishPositionsInMenu(dish2, this._menus[positionMenu]);
         console.log(`Posición del plato ${dish2._name} antes del intercambio: ${positionDish2}`);

         if (positionDish1 !== -1 && positionDish2 !== -1) {
            // Si ambos platos existen en el menú
            let savePosition = this._menus[positionMenu].dishes[positionDish1];
            this._menus[positionMenu].dishes[positionDish1] = this._menus[positionMenu].dishes[positionDish2];
            this._menus[positionMenu].dishes[positionDish2] = savePosition;

            let positionDishnew1 = this.#getDishPositionsInMenu(dish1, this._menus[positionMenu]);
            console.log(`Posición del plato ${dish1.name} después del intercambio: ${positionDishnew1}`);

            let positionDishnew2 = this.#getDishPositionsInMenu(dish2, this._menus[positionMenu]);
            console.log(`Posición del plato ${dish2._name} después del intercambio: ${positionDishnew2}`);
         } else {
            // Si uno o ambos platos no existen en el menú, lanza una excepción
            if (positionDish1 === -1) {
               throw new ElementNotRecordedException(`${dish1.name} not exist in menu records.`);
            } else if (positionDish2 === -1) {
               throw new ElementNotRecordedException(`${dish2._name} not exist in menu records.`);
            }
         }
      } else {
         // Si el menú no existe en la lista de menús, lanza una excepción
         throw new ElementNotRecordedException(`${menu.name} doesn't exist in the records.`);
      }
   }

   // Generador para obtener platos de una categoría
   *getDishesInCategory(category, orderFunction) {
      let positionCategory = this.#getPosition(this._category, category, Category);

      // Verifica si la categoría existe
      if (positionCategory !== -1) {
         let array = this._category[positionCategory].dishes;
         // Verifica si la categoría tiene platos
         if (array.length === 0) {
            throw new ErrorExistenceElementException(`There are no dishes in the category: ${category.name}`);
         } else {
            array.sort(orderFunction); // Ordena los platos según la función de orden
            // Itera sobre los platos y los devuelve uno por uno
            for (let i of array) {
               yield i;
            }
         }
      } else {
         // Si la categoría no está registrada, lanza una excepción
         throw new ElementNotRecordedException(`${category.name} is not recorded`);
      }
   }

   // Generador para obtener platos de un menú
   *getDishesInMenu(menu, orderFunction) {
      let positionMenu = this.#getPosition(this._menus, menu, Menu);

      // Verifica si el menú existe
      if (positionMenu !== -1) {
         let array = this._menus[positionMenu].dishes;
         // Verifica si el menú tiene platos
         if (array.length === 0) {
            throw new ErrorExistenceElementException(`There are no dishes in the menu: ${menu.name}`);
         } else {
            array.sort(orderFunction); // Ordena los platos según la función de orden
            // Itera sobre los platos y los devuelve uno por uno
            for (let i of array) {
               yield i;
            }
         }
      } else {
         // Si el menú no está registrado, lanza una excepción
         throw new ElementNotRecordedException(`${menu.name} is not recorded`);
      }
   }

   // Generador para obtener platos con un alérgeno específico
   *getDishesWithAllergen(allergen, orderFunction) {
      let positionAllergen = this.#getPosition(this._allergens, allergen, Allergen);

      // Verifica si el alérgeno existe
      if (positionAllergen !== -1) {
         let array = this._allergens[positionAllergen].dishes;
         // Verifica si el alérgeno tiene platos
         if (array.length === 0) {
            throw new ErrorExistenceElementException(`There are no dishes in the allergen: ${allergen.name}`);
         } else {
            array.sort(orderFunction); // Ordena los platos según la función de orden
            // Itera sobre los platos y los devuelve uno por uno
            for (let i of array) {
               yield i;
            }
         }
      } else {
         // Si el alérgeno no está registrado, lanza una excepción
         throw new ElementNotRecordedException(`${allergen.name} is not recorded`);
      }
   }

   // Método para buscar platos según una función de búsqueda
   *findDishes(dish, functionfind, orderFunction) {
      // Verifica si el plato no es nulo y es un objeto Dish
      if (dish === Dish || !dish) {
         throw new ErrorExistenceElementException(`Dish can't be null and must be a Dish Object.`);
      }

      // Filtra los platos según la función de búsqueda proporcionada
      const foundDishes = this._dishes.filter(functionfind);

      // Ordena los platos filtrados según la función de orden
      foundDishes.sort(orderFunction);

      // Itera sobre los platos filtrados y los devuelve uno por uno
      for (const dish of foundDishes) {
         yield dish;
      }
   }

   //Método que se encarga de obtener l una categoría dentro del manager.
   getCategoryByName(name) {
      //Recorremos todas las categorías y comprobamos si el nombre coincide con el pasado por parámetro.
      for (const category of this._category) {
         //Si concide, devolvemos la categoría.
         if (category.category.name.toLowerCase() === name.toLowerCase()) {
            return category.category;
         }
      }
   }

   //Método que se encarga de obtener un plato dentro del manager.
   getDishByName(name) {
      for (const dish of this._dishes) {
         if (dish.name.toLowerCase() === name.toLowerCase()) {
            return dish;
         }
      }
   }

   //Método que se encarga de obtener un alérgeno dentro del manager.
   getAllergenByName(name) {
      for (const allergen of this._allergens) {
         if (allergen.allergen.name.toLowerCase() === name.toLowerCase()) {
            return allergen.allergen;
         }
      }
   }

   //Método que se encarga de obtener un menú dentro del manager.
   getMenuByName(name) {
      for (const menu of this._menus) {
         if (menu.menu.name.toLowerCase() === name.toLowerCase()) {
            return menu.menu;
         }
      }
   }

   //Método que se encarga de obtener un restaurante dentro del manager.
   getRestaurantByName(name) {
      for (const restaurant of this._restaurants) {
         if (restaurant.name.toLowerCase() === name.toLowerCase()) {
            return restaurant;
         }
      }
   }

   // Método para crear un nuevo plato
   createDish(name, description, ingredients, image) {
      // Busca si ya existe un plato con el mismo nombre (ignorando mayúsculas/minúsculas)
      let dish = this._dishes.find(function (dish) {
         return dish.name.toLowerCase() === name.toLowerCase();
      });

      // Si no se encuentra un plato con el mismo nombre, se crea uno nuevo
      if (!dish) {
         dish = new Dish(name, description, ingredients, image);
      }
      return dish;
   }

   // Método para crear un nuevo menú
   createMenu(name, description) {
      // Busca si ya existe un menú con el mismo nombre (ignorando mayúsculas/minúsculas)
      let menu = this._menus.find((cat) => cat.menu.name.toLowerCase() === name.toLowerCase());

      // Si no se encuentra un menú con el mismo nombre, se crea uno nuevo
      if (!menu) {
         menu = new Menu(name, description);
      } else {
         menu = menu.menu;
      }
      return menu;
   }

   // Método para crear un nuevo alérgeno
   createAllergen(name, description) {
      // Busca si ya existe un alérgeno con el mismo nombre (ignorando mayúsculas/minúsculas)
      let allergen = this._allergens.find((cat) => cat.allergen.name.toLowerCase() === name.toLowerCase());

      // Si no se encuentra un alérgeno con el mismo nombre, se crea uno nuevo
      if (!allergen) {
         allergen = new Allergen(name, description);
      } else {
         allergen = allergen.allergen;
      }
      return allergen;
   }

   // Método para crear una nueva categoría
   createCategory(name, description) {
      // Busca si ya existe una categoría con el mismo nombre (ignorando mayúsculas/minúsculas)
      let category = this._category.find((cat) => cat.category.name.toLowerCase() === name.toLowerCase());

      // Si no se encuentra una categoría con el mismo nombre, se crea una nueva
      if (!category) {
         category = new Category(name, description);
      } else {
         category = category.category;
      }
      return category;
   }

   // Método para crear un nuevo restaurante
   createRestaurant(name, description, location) {
      // Busca si ya existe un restaurante con el mismo nombre (ignorando mayúsculas/minúsculas)
      let restaurant = this._restaurants.find(function (restaurant) {
         return restaurant.name.toLowerCase() === name.toLowerCase();
      });

      // Si no se encuentra un restaurante con el mismo nombre, se crea uno nuevo
      if (!restaurant) {
         restaurant = new Restaurant(name, description, location);
      }
      return restaurant;
   }

   //Función que devuelve un array con los menús que contienen un plato.
   dishInMenus(dish) {
      //Creamos un array vacío.
      let menusWithDish = [];
      //Obtenemos el objeto del plato.
      let dishObject = this.getDishByName(dish);
      //Si el objeto no existe, lanzamos una excepción.
      if (!dishObject) {
         throw new ElementNotRecordedException("El plato no existe en nuestra Base de datos.");
      }

      //Recorremos todos los menús y comprobamos si el plato está en el menú.
      for (const currentMenu of this._menus) {
         console.log(currentMenu.menu instanceof Menu);
         let positionMenu = this.#getPosition(this._menus, currentMenu.menu, Menu);
         let positionDish = this.#getDishPositionsInMenu(dishObject, this._menus[positionMenu]);
         //Si el plato está en el menú, lo añadimos al array.
         if (positionDish !== -1) {
            menusWithDish.push(currentMenu.menu);
         }
      }

      //Devolvemos el array.
      return menusWithDish;
   }

   //Función que devuelve un array con las categorías que contienen un plato.
   dishInCategory(dish) {
      let categoryWithDish = [];
      let dishObject = this.getDishByName(dish);
      if (!dishObject) {
         throw new ElementNotRecordedException("El plato no existe en nuestra Base de datos.");
      }
      for (const currentCategory of this._category) {
         console.log(currentCategory.category instanceof Category);
         let positionCategory = this.#getPosition(this._category, currentCategory.category, Category);
         let positionDish = this.#getDishPositionsInCategory(dishObject, this._category[positionCategory]);
         if (positionDish !== -1) {
            categoryWithDish.push(currentCategory.category);
         }
      }
      return categoryWithDish;
   }
}

export { RestaurantsManager };
