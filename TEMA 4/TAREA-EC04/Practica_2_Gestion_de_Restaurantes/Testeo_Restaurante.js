import { Coordinate } from "./Objetos_Restaurante.js";
import { RestaurantsManager } from "./Gestion_Restaurantes.js";

try {
   // Creación de categorías
   const category1 = RestaurantsManager.getInstance().createCategory("Carne");
   const category2 = RestaurantsManager.getInstance().createCategory("Pescados");
   const category3 = RestaurantsManager.getInstance().createCategory("Postres");

   // Asignación de descripciones a las categorías
   category1.description = "Platos especializados en carne";
   category2.description = "Platos especializados en pescado";
   category3.description = "Platos especializados en postres";

   console.group("---CREACIÓN DE CATEGORÍAS Y MUESTRA---");

   // Añadir las categorías al gestor de restaurantes
   RestaurantsManager.getInstance().addCategory(category1, category2, category3);

   // Mostrar las categorías
   console.log("Mostramos las categorias con la funcion getterCategories()");
   let iteratorCategories = RestaurantsManager.getInstance().getterCategories();
   for (let iterator of iteratorCategories) {
      console.log(`Categorias: ${JSON.stringify(iterator.category)}`);
   }

   console.groupEnd();

   console.group("---CREACIÓN DE MENUS Y MUESTRA---");

   // Creación de menús
   const menu1 = RestaurantsManager.getInstance().createMenu("Menú Carne y Pescado.");
   const menu2 = RestaurantsManager.getInstance().createMenu("Menú Premium.");
   const menu3 = RestaurantsManager.getInstance().createMenu("Menú Del Dia.");

   // Añadir los menús al gestor de restaurantes
   RestaurantsManager.getInstance().addMenu(menu1, menu2, menu3);

   // Mostrar los menús
   console.log("Mostramos los menús.");
   let iteratorMenus = RestaurantsManager.getInstance().getterMenus();
   for (let iterator of iteratorMenus) {
      console.log(`Menus: ${iterator.menu.toString()}`);
   }

   console.groupEnd();

   console.group("---CREACIÓN DE ALÉRGENOS Y MUESTRA---");

   // Creación de alérgenos
   const allergen1 = RestaurantsManager.getInstance().createAllergen("Gluten");
   const allergen2 = RestaurantsManager.getInstance().createAllergen("Marisco");
   const allergen3 = RestaurantsManager.getInstance().createAllergen("Lácteos");
   const allergen4 = RestaurantsManager.getInstance().createAllergen("Huevos");
   const allergen5 = RestaurantsManager.getInstance().createAllergen("Frutos Secos");

   // Añadir los alérgenos al gestor de restaurantes
   RestaurantsManager.getInstance().addAllergen(allergen1, allergen2, allergen3, allergen4, allergen5);

   // Mostrar los alérgenos
   console.log("Mostramos los alérgenos");
   let iteratorAllergens = RestaurantsManager.getInstance().getterAllergens();

   for (let iterator of iteratorAllergens) {
      console.log(`Alérgenos: ${iterator.allergen.toString()}`);
   }

   console.groupEnd();

   console.group("---CREACIÓN DE PLATOS---");

   // Creación de platos
   const dish1 = RestaurantsManager.getInstance().createDish("Pierna de cordero lechal");
   const dish2 = RestaurantsManager.getInstance().createDish("Salmón a la naranja");
   const dish3 = RestaurantsManager.getInstance().createDish("Carrillera iberica en salsa");
   const dish4 = RestaurantsManager.getInstance().createDish("Brocheta de verduras y pollo al limón");
   const dish5 = RestaurantsManager.getInstance().createDish("Tarta de queso de la casa");
   const dish6 = RestaurantsManager.getInstance().createDish("Mousse de frutas del bosque");
   const dish7 = RestaurantsManager.getInstance().createDish("Brownie de chocolate");

   // Asignación de ingredientes a algunos platos
   dish1.ingredients = "cordero";
   dish2.ingredients = "salmon";
   dish3.ingredients = "cerdo";
   dish4.ingredients = "pollo";
   dish5.ingredients = "queso";

   // Mostrar información de los platos
   const arraydishes = [dish1, dish2, dish3, dish4, dish5, dish6, dish7];
   for (let index = 1; index < arraydishes.length; index++) {
      console.log(arraydishes[index].toString());
   }

   // Añadir los platos al gestor de restaurantes
   RestaurantsManager.getInstance().addDish(dish1, dish2, dish3, dish4, dish5, dish6, dish7);

   console.groupEnd();
   console.group("---CREACIÓN DE RESTAURANTES Y MUESTRA---");

   // Creación de restaurantes
   const restaurant1 = RestaurantsManager.getInstance().createRestaurant("Asador Los Pucheros.");
   const restaurant2 = RestaurantsManager.getInstance().createRestaurant("Restaurante La Mancha.");
   const restaurant3 = RestaurantsManager.getInstance().createRestaurant("Bar Manolo.");

   // Definición de coordenadas para los restaurantes
   const coordinate1 = new Coordinate(39.56137324819614, -3.031722303395402);
   const coordinate2 = new Coordinate(40.26573591150155, -3.3299865153460198);
   const coordinate3 = new Coordinate(39.76800025384604, -3.11506989348932);

   // Asignación de coordenadas a los restaurantes
   restaurant1.location = coordinate1;
   restaurant2.location = coordinate2;
   restaurant3.location = coordinate3;

   // Añadir los restaurantes al gestor de restaurantes
   RestaurantsManager.getInstance().addRestaurant(restaurant1, restaurant2, restaurant3);

   // Mostrar los restaurantes
   let iteratorRestaurants = RestaurantsManager.getInstance().getterRestaurants();
   for (let iterator of iteratorRestaurants) {
      console.log(`Restaurantes: ${iterator.toString()}`);
   }

   // Eliminar un restaurante y mostrar los actualizados
   RestaurantsManager.getInstance().removeRestaurant(restaurant2);
   let iteratorRestaurants2 = RestaurantsManager.getInstance().getterRestaurants();
   console.log("Actualización de restaurantes");
   for (let iterator of iteratorRestaurants2) {
      console.log(`Restaurantes: ${iterator.toString()}`);
   }

   console.groupEnd();

   console.group("---ASIGNACIÓN, DESIGNACIÓN Y MUESTRA DE PLATOS A CATEGORÍAS---");

   // Asignar platos a una categoría
   RestaurantsManager.getInstance().assignCategoryToDish(category1, dish1, dish3);

   // Mostrar los platos en la categoría asignada
   let iteratorDishesInCategory = RestaurantsManager.getInstance().getDishesInCategory(category1, function (objA, objB) {
      return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
   });
   for (let iterator of iteratorDishesInCategory) {
      console.log(`Platos en la categoría carne: ${iterator.toString()}`);
   }

   // Desasignar un plato de la categoría y mostrar la actualización
   console.log("DESASIGNACIÓN DEL PLATO 1 - PIERNA DE CORDERO DE LA CATEGORÍA CARNE.");
   RestaurantsManager.getInstance().deassignCategoryToDish(category1, dish1);

   console.groupEnd();

   console.group("---ASIGNACIÓN, DESIGNACIÓN Y MUESTRA DE PLATOS A MENUS---");

   // Asignar platos a un menú
   RestaurantsManager.getInstance().assignDishToMenu(menu1, dish1, dish2, dish3, dish5);

   // Mostrar los platos en el menú asignado
   let iteratorDishesInMenu = RestaurantsManager.getInstance().getDishesInMenu(menu1, function (objA, objB) {
      return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
   });
   for (let iterator of iteratorDishesInMenu) {
      console.log(`Platos en el ${menu1._name}: ${iterator.toString()}`);
   }

   // Desasignar un plato del menú y mostrar la actualización
   console.log("DESASIGNACIÓN DEL PLATO 3 - CARRILLERA DEL MENÚ CARNE Y PESCADO.");
   RestaurantsManager.getInstance().deassignDishToMenu(menu1, dish3);

   console.groupEnd();
   console.group("---ASIGNACIÓN, DESIGNACIÓN Y MUESTRA DE PLATOS A ALÉRGENOS---");

   // Asignar platos a un alérgeno y mostrar los platos en el alérgeno asignado
   RestaurantsManager.getInstance().assignAllergenToDish(allergen3, dish5, dish7);

   let iteratorDishesInAllergen = RestaurantsManager.getInstance().getDishesWithAllergen(allergen3, function (objA, objB) {
      return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
   });

   for (let iterator of iteratorDishesInAllergen) {
      console.log(`Platos en el alérgeno ${allergen3._name}: ${iterator.toString()}`);
   }

   // Desasignar un plato del alérgeno y mostrar la actualización
   console.log("DESASIGNACIÓN DEL PLATO 5 - SOLOMILLO DEL ALÉRGENO LACTEOS.");
   RestaurantsManager.getInstance().deassignAllergenToDish(allergen3, dish5);

   console.groupEnd();

   console.group("---INTERCAMBIO DE POSICIONES DE DOS PLATOS EN UN MENÚ---");

   // Intercambiar las posiciones de dos platos en un menú
   RestaurantsManager.getInstance().changeDishesPositionsInMenu(menu1, dish5, dish1);

   console.groupEnd();

   console.group("---ENCONTRAR PLATOS SEGÚN FUNCIÓN CALLBACK---");

   // Encontrar platos según una función de búsqueda y mostrar los resultados
   let iteratorFind = RestaurantsManager.getInstance().findDishes(
      dish3,
      function (otherDish) {
         const ingredients = dish3.ingredients.split(",");
         const otherDishIngredients = otherDish.ingredients.split(",");

         return ingredients.some((ingredient) => otherDishIngredients.includes("queso"));
      },
      function (objA, objB) {
         return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
      }
   );

   for (let iterator of iteratorFind) {
      console.log(iterator);
   }

   console.groupEnd();

   console.group("---COMPROBAR FLYWEIGHT---");

   // Comprobar el patrón de diseño Flyweight
   const category4 = RestaurantsManager.getInstance().createCategory("Postres");
   console.log(category4 === category3);

   const restaurant4 = RestaurantsManager.getInstance().createRestaurant("Bar Manolo.");
   console.log(restaurant3 === restaurant4);

   const menu4 = RestaurantsManager.getInstance().createMenu("Menú Premium.");
   console.log(menu4 === menu2);

   const allergen6 = RestaurantsManager.getInstance().createAllergen("Marisco");
   console.log(allergen6 === allergen1);

   const dish8 = RestaurantsManager.getInstance().createDish("Salmón a la naranja");
   console.log(dish8 === dish2);

   console.groupEnd();

   console.group("---ELIMINANDO ELEMENTOS---");

   // Eliminar elementos (categoría, menú, alérgenos, plato) y mostrar los resultados
   console.log("Método para eliminar una categoría.");
   RestaurantsManager.getInstance().removeCategory(category1);
   RestaurantsManager.getInstance().removeMenu(menu2);
   RestaurantsManager.getInstance().removeAllergens(allergen1);
   RestaurantsManager.getInstance().removeDish(dish2);

   let iteratorDishesInAllergen3 = RestaurantsManager.getInstance().getDishesWithAllergen(allergen3, function (objA, objB) {
      return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
   });

   console.groupEnd();
} catch (error) {
   console.log(error);
}
