
import {List, ObjectList, OrderedObjectList } from "./ObjetosListas.js";
import {ListFullError, ListLimitError, NotObject, ListEmpty, ElementNotExist, NotSameType, ElementExists} from "./exceptions.js";
function funcionTesteo() {
   // Se ejecuta dentro de un bloque try-catch para manejar errores.
   try {
      // Se crean una instancia de la clase List con capacidad para 5 elementos.
      let list1 = new List(5);

      // Comprobación de la función isEmpty() en list1.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN isEmpty().---");
      console.log("¿La lista está vacía? " + list1.isEmpty());

      // Comprobación de la función isFull() en list1.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN isFull().---");
      console.log("¿La lista está completa? " + list1.isFull());

      // Comprobación de la función size() en list1.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN size().---");
      console.log("Tamaño de la lista: " + list1.size());

      // Se crean una nueva instancia de la clase List con capacidad para 3 elementos.
      let list2 = new List(3);

      // Se agregan elementos a list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN add().---");
      console.log(list2.add("David"));
      console.log(list2.add("Claudia"));
      console.log(list2.add("Mario"));

      // Se realizan más comprobaciones con list2.
      console.log("¿La lista está vacía? " + list2.isEmpty());
      console.log("¿La lista está completa? " + list1.isFull());

      // Comprobación de la función get() en list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN get().---");
      console.log(list2.get(1));

      // Comprobación de la función toString() en list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN toString().---");
      console.log(list2.toString());

      // Comprobación de la función indexOf() en list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN indexOf().---");
      console.log(list2.indexOf("Claudia"));

      // Comprobación de la función getCapacity() en list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN getCapacity().---");
      console.log(list2.getCapacity());

      // Se limpia list2.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN clear().---");
      list2.clear();
      console.log("¿La lista está vacía? " + list2.isEmpty());

      // Se crea una nueva lista y se agregan elementos.
      let list3 = new List(10);
      list3.add("Silla");
      list3.add("Armario");
      list3.add("Mesa");
      list3.add("Estanteria");
      list3.add("Repisa");

      // Comprobación de la función firstElement() en list3.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN firstElement().---");
      console.log(list3.firstElement());

      // Comprobación de la función lastElement() en list3.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN lastElement().---");
      console.log(list3.lastElement());

      // Se eliminan elementos de list3.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN remove().---");
      console.log("Elemento eliminado: " + list3.remove(1));

      // Se elimina un elemento específico de list3.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN removeElement().---");
      console.log(list3.removeElement("Silla"));
      console.log(list3.toString());

      // Se crea una instancia de ObjectList y se agregan objetos.
      let listaObjetos = new ObjectList(5, "Muebles");
      console.log("---COMPROBACIÓN DE LA FUNCIÓN add() de ObjectList.---");
      let silla = {
         name: "Silla",
         type: "Muebles",
      };
      let mesa = {
         name: "Mesa",
         type: "Muebles",
      };
      let armario = {
         name: "Armario",
         type: "Muebles",
      };
      console.log(listaObjetos.add(silla));
      console.log(listaObjetos.add(mesa));
      console.log(listaObjetos.add(armario));

      // Se muestra el contenido de la lista de objetos.
      console.log("Lista de " + listaObjetos.type + ": ", listaObjetos.toString());

      // Se elimina un objeto de la lista de objetos.
      console.log("---COMPROBACIÓN DE LA FUNCIÓN removeElement() de ObjectList.---");
      console.log("Eliminando silla: " + listaObjetos.removeElement(silla));
      console.log("Contenido de la lista actualizado: " + listaObjetos.toString());

      // Se crean objetos adicionales.
      let repisa = {
        name: "Repisa",
        type: "Muebles",
     };
     let estanteria = {
        name: "Estanteria",
        type: "Muebles",
     };

      // Se crea una lista ordenada de objetos.
      let listaOrdenada = new OrderedObjectList(10, "Muebles", function (a, b) {
         return a.name.localeCompare(b.name);
      });

      // Se agregan objetos a la lista ordenada.
      listaOrdenada.add(silla);
      listaOrdenada.add(mesa);
      listaOrdenada.add(armario);
      listaOrdenada.add(repisa);
      listaOrdenada.add(estanteria);

      // Se muestra el contenido de la lista ordenada.
      console.log("Contenido de la lista ordenada: " + listaOrdenada.toString());
   } catch (error) {
      // Manejo de errores mediante un switch-case.
      switch (true) {
         case error instanceof ListFullError:
            console.error(error.message);
            break;

         case error instanceof ListLimitError:
            console.error(error.message);
            break;

         case error instanceof NotObject:
            console.error(error.message);
            break;

         case error instanceof ListEmpty:
            console.error(error.message);
            break;

         case error instanceof ElementNotExist:
            console.error(error.message);
            break;

         case error instanceof NotSameType:
            console.error(error.message);
            break;

         case error instanceof NotFound:
            console.error(error.message);
            break;

         case error instanceof ElementExists:
            console.error(error.message);
            break;

         default:
            console.error("Ha surgido un error inesperado.");
            break;
      }
   }
}

// Se ejecuta la función funcionTesteo() cuando se carga la ventana.
window.onload = funcionTesteo;