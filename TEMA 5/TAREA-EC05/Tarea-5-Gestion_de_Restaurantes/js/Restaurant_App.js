// Importamos las clases necesarias para la creación de la app.
import { RestaurantsManager } from "./Restaurant_Model.js"; // Importamos la clase RestaurantsManager desde el modelo
import RestaurantsView from "./Restaurant_View.js"; // Importamos la clase RestaurantsView desde la vista
import RestaurantsController from "./Restaurant_Controller.js"; // Importamos la clase RestaurantsController desde el controlador
import Breadcrumbs from "./Breadcrumbs.js"; // Importamos la clase Breadcrumbs para gestionar la navegación

// Creamos la instancia de la app, que recibe como parámetros el modelo, la vista y el componente de migas de pan.
const RestaurantApp = new RestaurantsController(RestaurantsManager.getInstance(), new RestaurantsView(), new Breadcrumbs());

// Exportamos la app para poder usarla en otros ficheros.
export default RestaurantApp;
