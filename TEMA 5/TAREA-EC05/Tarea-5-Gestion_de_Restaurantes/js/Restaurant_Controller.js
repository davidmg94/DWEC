"use strict";
// Importamos la clase Coordinate desde el archivo "Entidades_Restaurante.js"
import { Coordinate } from "./Entidades_Restaurante.js";

/**Creamos las propiedades privadas de nuestro controlador a través de Symbol. Estas propiedades son
 * el modelo (capa donde se recuperarán los datos almacenados), la vista (encargada de visualizar el
 * contenido de la aplicación) y el bread (encargado de gestionar las migas de pan de nuestra web).
 */
const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const BREAD = Symbol("Bread");

// Método privado para realizar la carga inicial de objetos desde el modelo
const LOAD_MANAGER_OBJECTS = Symbol("loadManagerObjects");

/**Clase que funciona como controlador, haciendo de intermediario entre el modelo y la vista. */
class RestaurantController {
   /**El constructor recibe como parámetros el modelo, la vista y el bread. Además, para la realización de
    * la carga inicial de datos, se llama al método onLoad(). En este método se crean las categorías,
    * alérgenos, menus, platos y restaurantes, para posteriormente mostrarlos en la web mediante la vista.
    * También recibe el método bindInit de la vista, para los enlaces del logo e Inicio.
    */
   constructor(model, view, bread) {
      this[MODEL] = model;
      this[VIEW] = view;
      this[BREAD] = bread;
      this.onLoad();
      this[VIEW].bindInit(this.handleInit);
   }

   /**Método privado que se encarga de realizar la carga inicial de objetos a través de la funcionalidad de la
    * capa de modelo.
    */
   [LOAD_MANAGER_OBJECTS]() {
      try {
         //Llamamos al método createCateogry() del modelo, para crear las categorías y recuperarlas (factorías).
         const category1 = this[MODEL].createCategory("Carnes");
         const category2 = this[MODEL].createCategory("Pescados");
         const category3 = this[MODEL].createCategory("Postres");

         category1.description = "Platos compuestos principalmente por carne";
         category2.description = "Platos compuestos principalmente por pescado";
         category3.description = "Postres artesanales de la casa";

         category1.url = "/Imagenes/categorias/carnes.jpg";
         category2.url = "/Imagenes/categorias/pescados.jpg";
         category3.url = "/Imagenes/categorias/postres.jpg";

         //Llamamos al método addCategory() del modelo, para añadir las categorías creadas al modelo.
         this[MODEL].addCategory(category1, category2, category3);

         //Creamos los platos llamando al método createDish() del modelo, para crearlos y recuperarlos (factorías).
         const dish1 = this[MODEL].createDish("Pierna de cordero lechal al horno");
         const dish2 = this[MODEL].createDish("Salmón a la naranja");
         const dish3 = this[MODEL].createDish("Solomillo de ternera con salsa roquefort");
         const dish4 = this[MODEL].createDish("Pechuga de pollo al limón con espárragos");
         const dish5 = this[MODEL].createDish("Secreto de cerdo ibérico a la plancha");
         const dish6 = this[MODEL].createDish("Lubina a la espalda");
         const dish7 = this[MODEL].createDish("Sopa de pescado y marisco");
         const dish8 = this[MODEL].createDish("Dorada gratinada con pan rallado sobre compota de tomate");
         const dish9 = this[MODEL].createDish("Arroz con leche casero");
         const dish10 = this[MODEL].createDish("Tarta de tres chocolates");
         const dish11 = this[MODEL].createDish("Flan de huevo casero");
         const dish12 = this[MODEL].createDish("Natillas caseras");

         /**Creación de la propiedad ingredientes, imagen y descripción para los platos. */
         dish1.ingredients = ["Cordero", "Patata"];
         dish2.ingredients = ["Salmón", "Naranja", "Patata"];
         dish3.ingredients = ["Ternera", "Salsa roquefort", "Pimiento", "Patata"];
         dish4.ingredients = ["Pollo", "Limón", "Espárragos"];
         dish5.ingredients = ["Cerdo", "Patata", "Tomate"];
         dish6.ingredients = ["Lubina", "Patatas"];
         dish7.ingredients = ["Gambas", "Almejas", "Rape", "Mejillones"];
         dish8.ingredients = ["Dorada", "Tomate", "Patata"];
         dish9.ingredients = ["Arroz", "Leche", "Canela"];
         dish10.ingredients = ["Chocolate Negro", "Chocolate con leche", "Chocolate Blanco", "Galleta"];
         dish11.ingredients = ["Huevo", "Leche", "Azúcar", "Vainilla"];
         dish12.ingredients = ["Leche", "Vainilla", "Canela", "Galleta"];

         dish1.image = "/Imagenes/Platos/cordero.jpg";
         dish2.image = "/Imagenes/Platos/salmon.jpg";
         dish3.image = "/Imagenes/Platos/solomillo.jpg";
         dish4.image = "/Imagenes/Platos/pollo.jpg";
         dish5.image = "/Imagenes/Platos/secreto.jpg";
         dish6.image = "/Imagenes/Platos/Lubina.jpg";
         dish7.image = "/Imagenes/Platos/sopa_pescado.jpg";
         dish8.image = "/Imagenes/Platos/dorada.jpg";
         dish9.image = "/Imagenes/Platos/arroz.jpg";
         dish10.image = "/Imagenes/Platos/tarta.jpg";
         dish11.image = "/Imagenes/Platos/flan.png";
         dish12.image = "/Imagenes/Platos/natillas.png";

         dish1.description = `La "Pierna de cordero asado" es un plato clásico y reconfortante que ofrece una experiencia culinaria inigualable. Preparada con cuidado y sazonada con hierbas aromáticas, esta jugosa pierna de cordero se asa lentamente en el horno hasta lograr un exterior dorado y crujiente, y un interior tierno y lleno de sabor.`;
         dish2.description = `El salmón a la naranja es una deliciosa combinación de sabores donde el salmón fresco se cocina a la perfección y se cubre con una salsa cítrica de naranja que realza su sabor. La naranja aporta un toque de frescura y acidez que complementa perfectamente la suavidad y textura firme del salmón. Este plato es una opción elegante y saludable que deleitará a los amantes del pescado.`;
         dish3.description = `El solomillo de ternera con salsa Roquefort es un plato exquisito que combina la ternura y jugosidad del solomillo de ternera con la intensidad y cremosidad de la salsa de queso Roquefort. El solomillo se cocina a la perfección, ya sea a la parrilla, a la plancha o al horno, y se sirve cubierto con una generosa porción de salsa Roquefort, que realza su sabor y lo convierte en una experiencia culinaria única.`;
         dish4.description = `La pechuga de pollo al limón con espárragos es una opción ligera y sabrosa que combina la jugosidad y versatilidad del pollo con el refrescante sabor del limón y la frescura de los espárragos. Las pechugas de pollo se marinan en una mezcla de jugo de limón, aceite de oliva, ajo y hierbas aromáticas antes de ser cocinadas a la plancha o al horno, lo que las hace tiernas y llenas de sabor. Los espárragos se cocinan al dente y se sirven como acompañamiento, aportando un toque de textura y color al plato.`;
         dish5.description = `El secreto ibérico a la plancha es un plato que resalta la calidad y el sabor único de esta pieza de cerdo tan apreciada. El secreto ibérico se cocina a la plancha a fuego medio-alto para sellar los jugos y obtener una textura exterior ligeramente caramelizada, mientras que por dentro se mantiene jugoso y tierno. Este corte de carne se caracteriza por su veteado de grasa infiltrada, que le aporta un sabor y una jugosidad excepcionales. Se suele sazonar con sal y pimienta y se acompaña con guarniciones como patatas, verduras asadas.`;
         dish6.description = `La lubina a la espalda es un plato clásico de la cocina mediterránea que destaca por su sencillez y sabor fresco. Consiste en una lubina fresca, generalmente abierta en forma de libro y desespinada, que se cocina a la plancha o al horno con un aderezo de ajo, perejil, aceite de oliva y limón. La lubina se cocina con la piel hacia abajo, lo que permite que se mantenga jugosa y se impregne con los sabores del aderezo. Una vez cocida, se sirve acompañada de unas rodajas de limón y se puede adornar con perejil fresco picado. Es un plato ligero, saludable y lleno de sabor, perfecto para disfrutar en cualquier ocasión.`;
         dish7.description = `La sopa de pescado y marisco es un plato reconfortante y lleno de sabor que combina la frescura del pescado con la riqueza de los mariscos. Se elabora a partir de un caldo base preparado con cabezas y espinas de pescado, al que se le añaden mariscos como langostinos, mejillones, almejas o calamares, así como una variedad de vegetales como cebolla, zanahoria y pimiento. La sopa se sazona con hierbas aromáticas como laurel, tomillo y perejil, y se puede espesar ligeramente con un roux o con puré de verduras. El resultado es un plato abundante y sabroso.`;
         dish8.description = `La dorada gratinada con pan rallado sobre compota de tomate es una deliciosa combinación de sabores y texturas. En este plato, filetes de dorada fresca se cubren con una capa de pan rallado sazonado con hierbas aromáticas y se gratinan en el horno hasta que queden dorados y crujientes por fuera y tiernos por dentro. La compota de tomate, por otro lado, agrega un contraste delicioso y refrescante, con el dulzor natural del tomate complementando perfectamente el sabor del pescado.`;
         dish9.description = `El arroz con leche es un postre tradicional que se prepara a base de arroz, leche, azúcar y canela. Para hacerlo, se hierve el arroz en leche con azúcar hasta que esté tierno y la mezcla adquiera una consistencia cremosa y espesa. Luego se aromatiza con cáscara de limón y canela en rama, lo que le da un sabor y aroma únicos.`;
         dish10.description = `La tarta de tres chocolates es un postre irresistible que combina tres capas de chocolate de diferentes intensidades en una base de galleta. Cada capa está compuesta por chocolate blanco, chocolate con leche y chocolate negro, lo que crea un contraste de sabores y texturas que deleitará a los amantes del chocolate. La tarta se prepara en capas, comenzando con la capa más oscura en la base y terminando con la capa de chocolate blanco en la parte superior. `;
         dish11.description = `El flan de huevo es un postre clásico y delicioso que se prepara con ingredientes simples como huevos, leche y azúcar.  El flan de huevo es un postre cremoso, suave y deliciosamente dulce que suele gustar a todos, tanto grandes como pequeños.`;
         dish12.description = `Las natillas caseras son un postre clásico y reconfortante que se prepara con ingredientes simples como leche, huevos, azúcar y vainilla.`;

         //Llamamos al método addDish() del modelo, para añadir los platos creados al modelo.
         this[MODEL].addDish(dish1, dish2, dish3, dish4, dish5, dish6, dish7, dish8, dish9, dish10, dish11, dish12);

         //Llamamos al método assignCategoryToDish() del modelo, para asignar los platos a las categorías.
         this[MODEL].assignCategoryToDish(category1, dish1, dish3, dish4, dish5);
         this[MODEL].assignCategoryToDish(category2, dish2, dish6, dish7, dish8);
         this[MODEL].assignCategoryToDish(category3, dish9, dish10, dish11, dish12);

         //Creamos los alérgenos.
         const allergen1 = this[MODEL].createAllergen("Gluten");
         const allergen2 = this[MODEL].createAllergen("Lactosa");
         const allergen3 = this[MODEL].createAllergen("Cítricos");
         const allergen4 = this[MODEL].createAllergen("Sulfitos");

         //Llamamos al método addAllergen() del modelo, para añadir los alérgenos creados.
         this[MODEL].addAllergen(allergen1, allergen2, allergen3, allergen4);

         //Llamamos al método assignDishToAllergen() del modelo, para asignar los alérgenos a los platos.
         this[MODEL].assignAllergenToDish(allergen1, dish8, dish10, dish11, dish12);
         this[MODEL].assignAllergenToDish(allergen2, dish3, dish9, dish10, dish11, dish12);
         this[MODEL].assignAllergenToDish(allergen3, dish2, dish4);
         this[MODEL].assignAllergenToDish(allergen4, dish2, dish7, dish6, dish8);

         //Creamos los menús.
         const menu1 = this[MODEL].createMenu("Menu Carne");
         const menu2 = this[MODEL].createMenu("Menu Pescado");
         const menu3 = this[MODEL].createMenu("Menu Variado");

         //Llamamos al método addMenu() del modelo, para añadir los menús creados al modelo.
         this[MODEL].addMenu(menu1, menu2, menu3);

         //Llamamos al método assignDishToMenu() del modelo, para asignar los platos a los menus.
         this[MODEL].assignDishToMenu(menu1, dish4, dish1, dish9);
         this[MODEL].assignDishToMenu(menu2, dish2, dish6, dish10);
         this[MODEL].assignDishToMenu(menu3, dish3, dish7, dish11);

         //Creamos los restaurantes, llamando al método createRestaurant() del modelo, para crearlos y recuperarlos (factorías).
         const restaurant1 = this[MODEL].createRestaurant("Asador los Pucheros");
         const restaurant2 = this[MODEL].createRestaurant("Hostal-Restaurante Cuatro Caminos");
         const restaurant3 = this[MODEL].createRestaurant("El Otro Sitio");

         // Establecemos las coordenadas de los restaurantes
         const location1 = new Coordinate("39.45662079848615", "-3.2316452337293014");
         const location2 = new Coordinate("39.58926102209715", "-3.3299912480103776");
         const location3 = new Coordinate("39.42549734708699", "-3.143940753140606");

         //Creación de las propiedades descripción y localizacion para los restaurantes.
         restaurant1.description = `El Asador los Pucheros es un restaurante especializado en asaduras, ubicado en Piedrabuena (Ciudad Real) que ofrece una experiencia 
      culinaria única y auténtica. Ubicado en el corazón de la región de La Mancha, este establecimiento se destaca por su ambiente acogedor y su cocina tradicional. Con un enfoque en 
      la excelencia de los cortes de carne y la técnica de asado, el Asador los Pucheros deleita a sus comensales con una selección de platos que resaltan 
      los sabores y la calidad de los ingredientes locales. Desde jugosas chuletas hasta deliciosas mollejas, cada bocado es una celebración de la rica 
      tradición gastronómica de la zona. Con un servicio atento y una atención meticulosa a los detalles, el Asador los Pucheros ofrece una experiencia 
      gastronómica inolvidable para los amantes de la buena comida y la cocina regional española.`;
         restaurant2.description = `El Hostal-Restaurante Cuatro Caminos es un restaurante que rinde homenaje a la rica tradición gastronómica española, con un enfoque particular
      en la alta cocina. Situado en Piedrabuena (Ciudad Real), este establecimiento combina la elegancia y el refinamiento con la pasión por la cocina de autor. 
      Inspirados por los sabores y la cultura de La Mancha, los chefs del Hostal-Restaurante Cuatro Caminos crean platos innovadores que sorprenden y deleitan a los comensales 
      más exigentes. Desde exquisitas tapas hasta elaboradas creaciones culinarias, cada plato es una obra maestra que refleja la creatividad y el talento de su 
      equipo de cocina. Con una cuidada selección de ingredientes frescos y de alta calidad, así como un servicio impecable, el Hostal-Restaurante Cuatro Caminos ofrece una 
      experiencia gastronómica única que invita a los clientes a sumergirse en un viaje culinario inolvidable.`;
         restaurant3.description = `El Otro Sitio, ubicado en Piedrabuena (Ciudad Real), es un restaurante que destaca por su versatilidad y su amplio abanico de opciones culinarias. Con una atmósfera 
      acogedora y un ambiente familiar, este establecimiento ofrece una experiencia gastronómica para todos los gustos y ocasiones. Desde platos tradicionales de la cocina manchega 
      hasta especialidades internacionales, el Otro Sitio tiene algo para satisfacer a todos los paladares. Ya sea que desees disfrutar de una suculenta paella, una deliciosa pizza o un exquisito 
      plato de carne a la parrilla, este restaurante lo tiene todo. Además, su atención cálida y su servicio eficiente hacen que cada visita al Otro Sitio sea una experiencia memorable para toda 
      la familia y los amigos.`;

         restaurant1.location = location1;
         restaurant2.location = location2;
         restaurant3.location = location3;

         restaurant1.image = "/Imagenes/Restaurantes/pucheros.jpg";
         restaurant2.image = "/Imagenes/Restaurantes/cuatroCaminos.jpg";
         restaurant3.image = "/Imagenes/Restaurantes/otroSitio.jpg";

         //Llamamos al método addRestaurant() del modelo, para añadir los restaurantes creados al modelo.
         this[MODEL].addRestaurant(restaurant1, restaurant2, restaurant3);
      } catch (error) {
         console.error(error);
      }
   }

   //Creación de eventos de aplicación.

   /**Método que se encarga de la carga inicial de datos. Se llama al método privado de carga. Además, en
    * la página principal, se muestran las categorías, platos aleatorios en la zona central,
    * tambien los desplegables con las categorías, alérgenos, menus y restaurantes,
    * se llama a los métodos bind de la vista para enlazar los eventos con los manejadores de eventos.
    */
   onLoad = () => {
      this[LOAD_MANAGER_OBJECTS]();
      const iteratorCategories = this[MODEL].categories;
      //Llamada al método showCategories que recibe un array para mostrar las categorías en la zona central.
      this[VIEW].showCategories(iteratorCategories);
      //Llamas a los métodos onAddCategory y onAddOptions para establecer los despegables.
      this.onAddCategory();
      this.onAddOptions();
      const iteratorDishes = this[MODEL].dishes;
      //Llamada al método showDishesRandom que recibe un array para mostrar los platos de forma aleatoria en la zona central.
      this[VIEW].showDishesRandom(iteratorDishes);
      //Llamada al método bindDishesCategory que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindDishesCategory(this.handleDishesCategoryList);
      //Llamada al método bindDishInformation que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindDishInformation(this.handleDishesInformation);
   };

   /**Método que realiza práctica la misma funcion que la carga inicial, sin embargo, este se ejecuta al realizar
    * click en el enlace de Inicio o en el logo de la empresa.
    */
   onInit = () => {
      //Para evitar que se muestran las migas de pan en la página principal, las eliminamos.
      this[BREAD].removeAllCrumbs();
      const iteratorCategories = this[MODEL].categories;
      this[VIEW].showCategories(iteratorCategories);
      const iteratorDishes = this[MODEL].dishes;
      this[VIEW].showDishesRandom(iteratorDishes);
      this[VIEW].bindDishesCategory(this.handleDishesCategoryList);
      this[VIEW].bindDishInformation(this.handleDishesInformation);
   };

   /**Método que se encarga de cargar los desplegables del menu de categorías. Además, enlaza los eventos con los
    * manejadores de eventos.
    */
   onAddCategory = () => {
      const iteratorCategories = this[MODEL].categories;
      //Llamada al método showCategoriesInMenu que recibe un array para mostrar las categorías en el despegable.
      this[VIEW].showCategoriesInMenu(iteratorCategories);
      //Llamada al método bindDishesCategoryInMenu que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindDishesCategoryInMenu(this.handleDishesCategoryList);
   };

   /**Método que se encarga de cargar los desplegables del menu de opciones. Además, enlaza los eventos con los manejadores
    * de eventos.
    */
   onAddOptions = () => {
      const iteratorAllergens = this[MODEL].allergens;
      //Llamada al método showAllergenMenu que recibe un array para mostrar los alérgenos en el menú de opciones.
      this[VIEW].showAllergenMenu(iteratorAllergens);
      //Llamada al método bindAllergenMenu que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindAllergenMenu(this.handleDishesAllergenList);
      const iteratorMenus = this[MODEL].menus;
      //Llamada al método showMenus que recibe un array para mostrar los menus en el menú de opciones.
      this[VIEW].showMenus(iteratorMenus);
      //Llamada al método bindMenus que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindMenus(this.handleDishesMenuList);
      const iteratorRestaurants = this[MODEL].restaurants;
      //Llamada al método showRestaurantsMenu que recibe un array para mostrar los restaurantes en el menú de opciones.
      this[VIEW].showRestaurantsMenu(iteratorRestaurants);
      //Llamada al método bindRestaurantsMenu que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos.
      this[VIEW].bindRestaurants(this.handleRestaurantInformation);
   };

   //Métodos manejadores de los eventos.

   //Manejador de eventos para el enlace de Inicio y el logo de la empresa.
   handleInit = () => {
      this.onInit();
   };

   //Manejador de eventos para mostrar los platos de una determinada categoría.
   handleDishesCategoryList = (title) => {
      try {
         //Llamaos al método getCategoryByName para obtener la categoría clickeada el evento click.
         const category = this[MODEL].getCategoryByName(title);
         /**Llamamos al método showDishes que recibe un array, y el método getDishesInCategory para obtener los platos de la categoría
          * seleccionada y un string para mostrar los platos de la categoría en la zona central.**/
         this[VIEW].showDishes(
            this[MODEL].getDishesInCategory(category, (objA, objB) => {
               return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
            }),
            category.name,
            category
         );
         /*Llamamos al método bindDishInformation que recibe un manejador de eventos para enlazar los eventos con el manejador de eventos
      de los platos, con el objeto de mostrar su información al realizar click en su enlace.*/
         this[VIEW].bindDishInformation(this.handleDishesInformation);
         //Limpiamos las migas de pan y añadimos nuevas con el método addCrumb*/
         this[BREAD].removeAllCrumbs();
         this[BREAD].addCrumb("Inicio", "Categorías", title);
         //Enlazamos los eventos con el método bindBreadcrumbs para que al realizar click en una miga de pan, muestre su contenido.
         this[VIEW].bindBreadcrumbs(this.handleBreads);
      } catch (error) {
         console.error("Se produjo un error al manejar la lista de platos por categoría:", error);
      }
   };

   //Manejador de eventos para mostrar los platos en los que se encuentra el alérgeno indicado. Sigue el mismo proceso que el anterior.
   handleDishesAllergenList = (name) => {
      try {
         const allergen = this[MODEL].getAllergenByName(name);
         this[VIEW].showDishes(
            this[MODEL].getDishesWithAllergen(allergen, (objA, objB) => {
               return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
            }),
            allergen.name,
            allergen
         );
         this[VIEW].bindDishInformation(this.handleDishesInformation);
         this[BREAD].removeAllCrumbs();
         this[BREAD].addCrumb("Inicio", "Alérgenos", name);
         this[VIEW].bindBreadcrumbs(this.handleBreads);
      } catch (error) {
         console.error("Se produjo un error al manejar la lista de platos por alérgeno:", error);
      }
   };

   //Manejador de eventos para mostrar los platos del menú indicado. Sigue el mismo proceso que el anterior.
   handleDishesMenuList = (name) => {
      try {
         const menu = this[MODEL].getMenuByName(name);
         this[VIEW].showDishes(
            this[MODEL].getDishesInMenu(menu, (objA, objB) => {
               return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
            }),
            menu.name,
            menu
         );
         this[VIEW].bindDishInformation(this.handleDishesInformation);
         this[BREAD].removeAllCrumbs();
         this[BREAD].addCrumb("Inicio", "Menus", name);
         this[VIEW].bindBreadcrumbs(this.handleBreads);
      } catch (error) {
         console.error("Se produjo un error al manejar la lista de platos por alérgeno:", error);
      }
   };

   //Manejador de eventos para mostrar la información del restaurante indicado. Sigue el mismo proceso que el anterior.
   handleRestaurantInformation = (name) => {
      try {
         const restaurant = this[MODEL].getRestaurantByName(name);
         this[VIEW].showRestaurantInformation(restaurant);
         this[BREAD].removeAllCrumbs();
         this[BREAD].addCrumb("Inicio", "Restaurantes", restaurant.name);
         this[VIEW].bindBreadcrumbs(this.handleBreads);
      } catch (error) {
         console.error("Se produjo un error al mostrar la información del plato:", error);
         alert("Se produjo un error al mostrar la información del plato:", error);
      }
   };

   //Manejador de eventos para mostrar la información del plato indicado. Sigue el mismo proceso que el anterior.
   handleDishesInformation = (name) => {
      try {
         const dish = this[MODEL].getDishByName(name);
         this[VIEW].showDishInformation(dish);
         this[BREAD].addCrumb("Platos",dish.name);
         this[VIEW].bindBreadcrumbs(this.handleBreads);
      } catch (error) {
         console.error("Se produjo un error al mostrar la información del plato:", error);
         alert("Se produjo un error al mostrar la información del plato:", error);
      }
   };

   //Manejador de eventos que se encarga de gestionar el contenido mostrado al pulsar en una miga de pan.
   handleBreads = (name) => {
      try {
         //Recuperamos el nombre de la categoría, menu o alérgeno clickeado el evento click.
         const allergen = this[MODEL].getAllergenByName(name) || "";
         const menu = this[MODEL].getMenuByName(name) || "";
         const category = this[MODEL].getCategoryByName(name) || "";
         //Recuperamos el elemento que contiene las migas de pan.
         const on = document.getElementById("dropdowns");

         /*Creamos switch para manejar las situaciones mediante el nombre pasado de la miga de pan.*/
         switch (name) {
            case "Inicio":
               this.onInit();
               break;

            case "Categorías":
               this.onInit();
               break;

            case "Alérgenos":
               this.onInit();
               on.classList.add("show");
               setTimeout(() => {
                  on.classList.remove("show");
               }, 5000);

               break;

            case "Menus":
               this.onInit();
               on.classList.add("show");
               setTimeout(() => {
                  on.classList.remove("show");
               }, 5000);
               break;

            case "Restaurantes":
               this.onInit();
               on.classList.add("show");
               setTimeout(() => {
                  on.classList.remove("show");
               }, 5000);
               break;

            case "Platos":
               this.onInit();
               break;

            /*En el caso de las categorías, restaurantes, alérgenos y menús, se ha vuelta a enlazar los eventos
        con el manejador de eventos.*/
            case allergen.name:
               this[VIEW].showDishes(
                  this[MODEL].getDishesWithAllergen(allergen, (objA, objB) => {
                     return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
                  }),
                  allergen.name,
                  "allergen"
               );
               this[BREAD].removeAllCrumbs();
               this[BREAD].addCrumb("Inicio", "Alérgenos", name);
               this[VIEW].bindBreadcrumbs(this.handleBreads);
               this[VIEW].bindAllergenMenu(this.handleDishesAllergenList);
               this[VIEW].bindDishInformation(this.handleDishesInformation);
               break;

            case category.name:
               this[VIEW].showDishes(
                  this[MODEL].getDishesInCategory(category, (objA, objB) => {
                     return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
                  }),
                  category.name,
                  "category"
               );
               this[BREAD].removeAllCrumbs();
               this[BREAD].addCrumb("Inicio", "Categorías", name);
               this[VIEW].bindBreadcrumbs(this.handleBreads);
               this[VIEW].bindAllergenMenu(this.handleDishesAllergenList);
               this[VIEW].bindDishInformation(this.handleDishesInformation);
               break;

            case menu._name:
               this[VIEW].showDishes(
                  this[MODEL].getDishesInMenu(menu, (objA, objB) => {
                     return objA._name.toLocaleLowerCase().localeCompare(objB._name.toLocaleLowerCase());
                  }),
                  menu.name,
                  "menu"
               );
               this[BREAD].removeAllCrumbs();
               this[BREAD].addCrumb("Inicio", "Menus", name);
               this[VIEW].bindBreadcrumbs(this.handleBreads);
               this[VIEW].bindAllergenMenu(this.handleDishesAllergenList);
               this[VIEW].bindDishInformation(this.handleDishesInformation);
               this[VIEW].bindDishesCategoryInMenu(this.handleDishesCategoryList);
               this[VIEW].bindMenus(this.handleDishesMenuList);
               this[VIEW].bindRestaurants(this.handleRestaurantInformation);
               break;
         }
      } catch (error) {
         console.error("Se produjo un error al manejar los breadcrumbs", error);
      }
   };
}

//Exportamos la clase RestaurantController.
export default RestaurantController;
