// Importación de las entidades y el gestor desde los módulos correspondientes
import { Product, Laptop, Camera, Smartphone, Tablet, Category } from "./entities.js";
import { Manager } from "./exam.js";

// Creación de categorías con sus respectivas imágenes
const category1 = new Category("Promociones", "https://via.placeholder.com/258x172.jpg?text=Promociones");
const category2 = new Category("Outlet", "https://via.placeholder.com/258x172.jpg?text=Outlet");
const category3 = new Category("Ofertas especiales", "https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales");
const category4 = new Category("Reacondicionados", "https://via.placeholder.com/258x172.jpg?text=Reacondicionados");

// Asignación de descripciones a las categorías
category1.description = "Productos en promoción.";
category2.description = "Outlet de productos con grandes descuentos.";
category3.description = "Ofertas actuales.";
category4.description = "Productos reacondicionados o seminuevos.";

// Creación de una categoría que causará un error al intentar agregarla (por duplicado)
const errorCategory = new Category("Reacondicionados", "https://via.placeholder.com/258x172.jpg?text=Reacondicionados");

// Creación de productos de diferentes tipos
const product1 = new Laptop(1, "brand1", "model1", 1100);
const product2 = new Camera(2, "brand1", "model2", 1200);
const product3 = new Smartphone(3, "brand1", "model3", 1300);
const product4 = new Tablet(4, "brand1", "model4", 1400);
const product5 = new Laptop(5, "brand1", "model5", 1500);
const product6 = new Laptop(6, "brand2", "model1", 2100);
const product7 = new Camera(7, "brand2", "model2", 2200);
const product8 = new Tablet(8, "brand2", "model3", 2300);
const product9 = new Smartphone(9, "brand2", "model4", 2400);
const product10 = new Laptop(10, "brand2", "model5", 2500);
const product11 = new Laptop(11, "brand3", "model1", 3100);
const product12 = new Camera(12, "brand3", "model2", 3200);
const product13 = new Tablet(13, "brand3", "model3", 3300);
const product14 = new Smartphone(14, "brand3", "model4", 3400);
const product15 = new Laptop(15, "brand3", "model5", 3500);
const product16 = new Laptop(16, "brand4", "model1", 4100);
const product17 = new Camera(17, "brand4", "model2", 4200);
const product18 = new Tablet(18, "brand4", "model3", 4300);
const product19 = new Tablet(19, "brand4", "model4", 4400);
const product20 = new Laptop(20, "brand4", "model5", 4500);

// Función para testear la creación de objetos
function testCreateObjects() {
   const manager = Manager.getInstance();
   console.log("Testeo: Objetos categorías");

   // Agregar categorías al gestor
   manager.addCategory(category2, category1, category4);

   // Intentar agregar una categoría duplicada y capturar la excepción
   try {
      manager.addCategory(errorCategory);
   } catch (error) {
      console.log(error.toString());
   }

   console.log("Testeo: Objetos productos");

   // Agregar productos al gestor
   manager.addProduct(product2, product3, product4, product5);
   manager.addProduct(product7, product8, product9, product10);
   manager.addProduct(product12, product13, product14, product15);
   manager.addProduct(product17, product18, product19, product20);

   // Agregar productos a las categorías correspondientes
   manager.addProductInCategory(category1, product1, product2, product3, product4, product5);
   manager.addProductInCategory(category2, product6, product7, product8, product9, product10);
   manager.addProductInCategory(category3, product11, product12, product13, product14, product15);
   manager.addProductInCategory(category4, product16, product17, product18, product19, product20);

   // Intentar agregar un producto duplicado en una categoría y capturar la excepción
   try {
      manager.addProductInCategory(category4, product16);
   } catch (error) {
      console.log(error.toString());
   }

   console.log("Contenido del carrito");
   console.log(manager.toString("\n"));
}

// Función para testear la eliminación de objetos
function testRemoveObjects() {
   let manager = Manager.getInstance();
   console.log("Test: Borrado de objetos");

   // Borrar productos del gestor
   console.log("Test: Borrado de productos");
   console.log("Productos: p1 y p12");
   manager.removeProduct(product1, product12);

   // Borrar productos de categorías específicas
   console.log("Test: Borrado de productos en categorías");
   console.log("Productos: p2 y p3 en c1");
   manager.removeProductInCategory(category1, product3, product2);

   // Intentar borrar un producto de una categoría donde no existe y capturar la excepción
   try {
      manager.removeProductInCategory(category1, product19);
   } catch (error) {
      console.log(error.toString());
   }

   // Borrar una categoría del gestor
   console.log("Test: Borrado de categoría");
   console.log("Categoría: c2");
   manager.removeCategory(category2);

   // Intentar borrar una categoría inexistente y capturar la excepción
   try {
      manager.removeCategory(new Category("ErrorCategory", "img/error.jpg"));
   } catch (error) {
      console.log(error.toString());
   }

   console.log("Contenido del carrito");
   console.log(manager.toString("<br>"));
}

// Función para testear la lista de objetos
function testListObjects() {
   const manager = Manager.getInstance();
   console.log("Listado Laptop ordenado por brand");

   // Obtener y listar todos los productos del tipo Laptop ordenados por marca
   for (const product of manager.getTypeProducts(Laptop, "brand")) {
      console.log(product.toString());
   }
}

// Ejecución de las pruebas
console.log("#####crear objetos");
testCreateObjects();
console.log("##################");
console.log("#####borrar objetos");
testRemoveObjects();
console.log("##################");
console.log("#####listar objetos");
testListObjects();
