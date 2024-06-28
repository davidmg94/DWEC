"use strict";

import { Allergen, Category, Menu } from "./Entidades_Restaurante.js";

/*Clase de la vista de nuestra web. Se encargará de visualizar el contenido obtenido del modelo, a través
del controlador, en la web. */
class RestaurantView {
   /*Constructor que se encarga de obtener los principales elementos donde queremos visualizar el contenido
  a través del DOM. */
   constructor() {
      this.main = document.getElementsByTagName("main")[0];
      this.menu = document.querySelector(".navbar-nav");
      this.options = document.getElementById("dropdowns");
      this.categories = document.getElementById("categories");
      this.nav_bread = document.getElementById("nav_bread");
   }

   /*Método encargado de mostrar las categorías en la zona central de la web */
   showCategories(categories) {
      //En primer lugar, limpiamos la zona central por si existen elementos.
      this.categories.replaceChildren();

      //Creamos un contenedor para las categorías.
      const container = document.createElement("div");
      container.id = "category_cards";
      container.classList.add("row");

      //Insertamos el título de las categorías.
      container.insertAdjacentHTML("beforeend", `<h1>Categorías</h1>`);

      //Insertamos las categorías en el contenedor.
      for (const category of categories) {
         container.insertAdjacentHTML(
            "beforeend",

            `<div class="card" style="width: 19rem;">
               <img src="${category.url}" class="card-img-top" alt="${category.name}">
               <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${category.name}</h5>
                  <p class="card-text">${category.description}</p>
                  <a href="#" class="btn btn-success" data-category="${category.name}">Ver platos</a>
               </div>
            </div>`
         );

         //Si no existe el elemento 'categories', lo creamos y lo agregamos a la zona central.
         if (!this.main.querySelector("#categories")) {
            // Si no existe, crea y agrega el elemento 'categories'
            this.main.replaceChildren();
            const categoriesContainer = document.createElement("div");
            categoriesContainer.id = "categories";
            this.main.appendChild(categoriesContainer);
            this.categories = categoriesContainer;
            this.categories.append(container);
         } else {
            this.categories.append(container);
         }
      }
   }

   //Método que se encarga de mostrar las categorías en el menú del encabezado
   showCategoriesInMenu(categories) {
      //Creamos un elemento li con la clase dropdown de Bootstrap para que funcione como un desplegable.
      const li = document.createElement("li");
      li.classList.add("nav-item");
      li.classList.add("dropdown");
      //Insertamos el enlace que desplegará las categorías.
      li.insertAdjacentHTML(
         "beforeend",
         `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
      );

      //Creamos un contenedor para las categorías.
      const container = document.createElement("ul");

      //Añadimos las clases necesarias para que funcione el desplegable.
      container.classList.add("dropdown-menu");
      container.id = "navCat";

      //Insertamos las categorías en el desplegable.
      for (const category of categories) {
         container.insertAdjacentHTML(
            "beforeend",
            `<li><a class="dropdown-item" href="#" data-category="${category.name}">${category.name}</a></li>`
         );
      }

      li.append(container);
      this.menu.append(li);
   }

   /**Método encargado de mostrar platos de forma aleatoria en la zona central de la web */
   showDishesRandom(dishes) {
      //Convertimos en array el conjunto de platos.
      const dish = Array.from(dishes);
      //Creamos un contenedor para mostrar los platos.
      const div = document.createElement("div");
      div.id = "dishes_cards";
      div.classList.add("row");

      //Insertamos el título de los platos.
      div.insertAdjacentHTML("beforeend", `<h1>Platos</h1>`);

      //Bucle for para mostrar tres platos de manera aleatoria.
      for (let index = 0; index < 3; index++) {
         const dish_random = dish[Math.floor(Math.random() * dish.length)];
         //Si disponemos de un plato, lo guardamos en una variable auxiliar para eliminarlo del array, de esta manera no se repetiran los platos.
         if (dish_random) {
            const aux_random = dish_random;
            dish.splice(dish.indexOf(aux_random), 1);
         }

         //Insertamos los platos en el contenedor.
         div.insertAdjacentHTML(
            "beforeend",

            `<div class="card" id="dishes_cards" style="width: 19rem;">
               <img src="${dish_random.image}" class="card-img-top" alt="${dish_random.name}">
               <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${dish_random.name}</h5>
                  <p class="card-text"> <strong>Ingredientes:</strong> ${dish_random.ingredients.join(", ")}</p>
                  <a href="#" class="btn btn-success" data-dish = "${dish_random.name}">Detalles</a>
               </div>
            </div>`
         );

         this.categories.append(div);
      }
   }

   /**Método que se encarga de mostrar platos en la zona central de la web */
   showDishes(dishes, title, elem) {
      //Limpiamos la zona central por si existen elementos.
      this.main.replaceChildren();
      if (this.categories.children.length > 1) {
         this.categories.children[1].remove();
      }

      //Creamos un contenedor para mostrar los platos.
      const container = document.createElement("div");
      container.id = "dish-list";

      const div = document.createElement("div");
      div.id = "dishes_cards";
      div.classList.add("row");

      /*Como este método lo vamos a utilizar para categorías, alérgenos y menus, creamos if anidados para mostrar el titulo
    según que elemento sea. */
      if (elem instanceof Category) {
         div.insertAdjacentHTML("beforeend", `<h1>Categoría: ${title}</h1>`);
      } else if (elem instanceof Allergen) {
         div.insertAdjacentHTML("beforeend", `<h1>Platos que contienen el alérgeno ${title}</h1>`);
      } else if (elem instanceof Menu) {
         div.insertAdjacentHTML("beforeend", `<h1>Platos del ${title} </h1>`);
      }

      //Insertamos las propiedades de los platos.
      for (const dish of dishes) {
         console.log(dish);
         div.insertAdjacentHTML(
            "beforeend",
            `<div class="card"  style="width: 19rem;">
               <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
               <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${dish.name}</h5>
                  <p class="card-text"><strong>Ingredientes:</strong> ${dish.ingredients.join(", ")}</p>
                  <a href="#" class="btn btn-success" data-dish="${dish.name}">Detalles</a>
               </div>
            </div>`
         );
      }

      this.main.append(container);
      container.append(div);
   }

   /**Método que muestra información sobre el plato clickeado */
   showDishInformation(dish) {
      // Limpiamos la zona central por si existen elementos.
      if (this.categories) {
         // Verificamos si hay elementos hijos en 'this.categories'
         if (this.categories.children.length > 1) {
            // Si hay más de un hijo, los reemplazamos para limpiar la zona central
            this.categories.replaceChildren();
         }
      }

      // Creamos un contenedor para mostrar los platos.
      const containerDish = document.getElementById("dish-list");

      // Si el contenedor de platos existe y tiene elementos, los limpiamos.
      if (containerDish) {
         // Verificamos si hay elementos hijos en 'containerDish'
         if (containerDish.children.length >= 1) {
            // Si hay al menos un hijo, los reemplazamos para limpiar el contenedor de platos
            containerDish.replaceChildren();
         }
      }

      // Creamos un nuevo contenedor para las cards de los platos.
      const container = document.createElement("div");
      container.classList.add("containerInformation");

      // Creamos el div que contendrá las cards de los platos.
      const div = document.createElement("div");
      div.id = "card_dish";
      div.classList.add("row");

      // Insertamos el HTML de la card del plato en el div
      div.insertAdjacentHTML(
         "beforeend",
         `<div class="card mb-3 mt-3">
            <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
            <div class="card-body">
               <h5 class="name-dish">${dish.name}</h5>
               <p class="card-text"><strong>Ingredientes:</strong></p>
               <p class="card-text">${dish.ingredients.join(", ")}</p> 
               <p class="card-text"><strong>Descripción:</strong></p>
               <p class="card-text description">${dish.description}</p>
            </div>
         </div>`
      );

      // Agregamos el contenedor al documento si 'this.categories' existe
      if (this.categories) {
         this.categories.append(container);
         // Agregamos el div de las cards al contenedor
         container.append(div);
      }

      // Agregamos el contenedor al documento si 'containerDish' existe
      if (containerDish) {
         containerDish.append(container);
         // Agregamos el div de las cards al contenedor
         container.append(div);
      }
   }

   //Método que muestra información sobre el restaurante registrado.
   showRestaurantInformation(restaurant) {
      //Limpiamos la zona central por si existen elementos.
      if (this.categories) {
         if (this.categories.children.length >= 1) {
            this.categories.replaceChildren();
         }
      }

      //Obtenemos el contenedor de los platos, por si se encuentran los platos mostrandose.
      const containerDish = document.getElementById("dish-list");

      //Si el contenedor existe ya con elementos, lo limpiamos.
      if (containerDish) {
         if (containerDish.children.length >= 1) {
            containerDish.replaceChildren();
         }
      }

      //Creamos contenedores para mostrar las cards con la información de los restaurantes.
      const container = document.createElement("div");
      container.classList.add("containerInformation");

      const div = document.createElement("div");
      div.id = "card_dish";
      div.classList.add("row");

      div.insertAdjacentHTML(
         "beforeend",

         `<div class="card mb-3 mt-3">
            <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
            <div class="card-body">
               <h5 class="name-restaurant">${restaurant.name}</h5>
               <p class="card-text description">${restaurant.description}</p>
            </div>
         </div>`
      );
      if (this.categories) {
         this.categories.append(container);
         container.append(div);
      }
      if (containerDish) {
         containerDish.append(container);
         container.append(div);
      }
   }

   /**Método que se va a encargar de mostrar en el menú de opciones, los alérgenos de nuestra pagina. */
   showAllergenMenu(allergens) {
      //Creamos un listado desplegable para los alérgenos.
      const li = document.createElement("li");

      //Insertamos un enlace que servirá como despegable en el menú de opciones.
      li.insertAdjacentHTML(
         "beforeend",
         `<a class="dropdown-item " href="#" id="dropdownAlergenos"
			 aria-expanded="false"> Alérgenos</a>`
      );

      //Creamos una lista que tenga la capacidad de desplegable, para ello creamos un elemento ul con la clase de dropdown (Bootstrap).
      const container = document.createElement("ul");
      container.classList.add("dropdown-menu", "submenu", "submenu-left");

      container.id = "allergens-menu";
      //Recorremos los alergenos recibidos por nuestro modelo y creamos un contador, con el objeto de crear separadores en las opciones de alérgenos.
      let contador = 0;
      for (const allergen of allergens) {
         container.insertAdjacentHTML(
            "beforeend",
            `<li><a class="dropdown-item" href="#" data-allergen="${allergen.name}">${allergen.name}</a></li>
        `
         );

         const allergen_array = Array.from(allergens);

         if (contador < allergen_array.length - 1) {
            container.insertAdjacentHTML("beforeend", `<hr class="dropdown-divider">`);
            contador++;
         }
      }

      //Agregamos el elemento ul al menú de opciones.
      this.options.append(li);
      li.append(container);
   }

   //Método que se ve a encargar de mostrar en el menú de opciones, los menús de nuestra pagina. Sigue el mismo procedimiento que el anterior método.
   showMenus(menus) {
      const li = document.createElement("li");

      li.insertAdjacentHTML(
         "beforeend",
         `<a class="dropdown-item " href="#" id="dropdownMenus"
      aria-expanded="false"> Menús</a>`
      );

      const container = document.createElement("ul");
      container.classList.add("dropdown-menu", "submenu", "submenu-left");
      container.id = "menus-menu";

      let contador = 0;
      for (const menu of menus) {
         container.insertAdjacentHTML("beforeend", `<li><a class="dropdown-item" href="#" data-menu="${menu.name}">${menu.name}</a></li>`);

         const menus_array = Array.from(menus);

         if (contador < menus_array.length - 1) {
            container.insertAdjacentHTML("beforeend", `<hr class="dropdown-divider">`);
            contador++;
         }
      }

      this.options.append(li);
      li.append(container);
   }

   /*Método que se va a encargar de mostrar en el menú de opciones los restaurantes registrados en el manager. Sigue el mismo procedimientos que el método anterior.*/
   showRestaurantsMenu(restaurants) {
      const li = document.createElement("li");

      li.insertAdjacentHTML(
         "beforeend",
         `<a class="dropdown-item " href="#" id="dropdownMenus"
      aria-expanded="false"> Restaurantes</a>`
      );

      const container = document.createElement("ul");
      container.classList.add("dropdown-menu", "submenu", "submenu-left");
      container.id = "menus-restaurant";

      let contador = 0;
      for (const restaurant of restaurants) {
         container.insertAdjacentHTML(
            "beforeend",
            `<li><a class="dropdown-item" href="#" data-restaurant="${restaurant.name}">${restaurant.name}</a></li>`
         );

         const restaurants_array = Array.from(restaurants);

         if (contador < restaurants_array.length - 1) {
            container.insertAdjacentHTML("beforeend", `<hr class="dropdown-divider">`);
            contador++;
         }
      }

      this.options.append(li);
      li.append(container);
   }

   //Métodos bind para enlazar el manejador de eventos de la vista con el controlador.

   /**Método bind para enlazar los enlaces de inicio y el logo con el manejador que da respuesta
    * a la acción de click.
    */
   bindInit(handler) {
      document.getElementById("init").addEventListener("click", (event) => {
         handler();
      });

      document.getElementById("logo").addEventListener("click", (event) => {
         handler();
      });
   }

   /**Bind para enlazar los enlaces de los cards de las categorías. */
   bindDishesCategory(handler) {
      //Obtenemos los cards que componen las categorías.
      const categoryCards = document.getElementById("category_cards");

      //Obtenemos los enlaces de los cards.
      const links = categoryCards.querySelectorAll("a");

      //Recorremos los enlaces y enlazamos el manejador de eventos.
      for (const link of links) {
         //Añadimos un evento de click a cada enlace.
         link.addEventListener("click", (event) => {
            //Llamamos al manejador d eventos, que recibe el objeto en donde se ha hecho click mediante el atributo personalizado.
            handler(event.currentTarget.dataset.category);
         });
      }
   }
/** Método para enlazar los enlaces del menú desplegable de categorías. */
bindDishesCategoryInMenu(handler) {
   // Obtenemos el elemento del menú de categorías
   const menu = document.getElementById("navCat");
   // Obtenemos todos los enlaces dentro del menú
   const links = menu.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-category" del enlace clicado
         handler(event.currentTarget.dataset.category);
      });
   }
}

/** Método para enlazar los enlaces de los cards de los platos. */
bindDishInformation(handler) {
   // Obtenemos el contenedor de los cards de platos
   const dishes = document.getElementById("dishes_cards");
   // Obtenemos todos los enlaces dentro del contenedor
   const links = dishes.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-dish" del enlace clicado
         handler(event.currentTarget.dataset.dish);
      });
   }
}

/** Método para enlazar los enlaces del listado de alérgenos con el manejador de eventos correspondiente. */
bindAllergenMenu(handler) {
   // Obtenemos el menú de alérgenos
   const menu = document.getElementById("allergens-menu");
   // Obtenemos todos los enlaces dentro del menú
   const links = menu.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-allergen" del enlace clicado
         handler(event.currentTarget.dataset.allergen);
      });
   }
}

/** Método para enlazar los enlaces del listado de menús con el manejador de eventos correspondiente. */
bindMenus(handler) {
   // Obtenemos el menú de menús
   const menu = document.getElementById("menus-menu");
   // Obtenemos todos los enlaces dentro del menú
   const links = menu.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-menu" del enlace clicado
         handler(event.currentTarget.dataset.menu);
      });
   }
}

/** Método para enlazar los enlaces del listado de restaurantes con el manejador de eventos correspondiente. */
bindRestaurants(handler) {
   // Obtenemos el menú de restaurantes
   const menu = document.getElementById("menus-restaurant");
   // Obtenemos todos los enlaces dentro del menú
   const links = menu.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-restaurant" del enlace clicado
         handler(event.currentTarget.dataset.restaurant);
      });
   }
}

/** Método para enlazar los enlaces del listado de migas de pan con el manejador de eventos correspondiente. */
bindBreadcrumbs(handler) {
   // Obtenemos el elemento de las migas de pan
   const navbread = document.getElementById("nav_bread");
   // Obtenemos la lista ordenada de las migas de pan
   const ol = navbread.querySelector("ol");
   // Obtenemos todos los enlaces dentro de la lista ordenada
   const links = ol.querySelectorAll("a");
   // Iteramos sobre cada enlace
   for (const link of links) {
      // Agregamos un evento de clic a cada enlace
      link.addEventListener("click", (event) => {
         // Llamamos al controlador con el valor del atributo "data-bread" del enlace clicado
         handler(event.currentTarget.dataset.bread);
      });
   }
}
}

// Exportamos la clase RestaurantView
export default RestaurantView;