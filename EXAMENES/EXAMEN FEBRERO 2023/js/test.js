// Función para probar los objetos MaestreComponentes y sus métodos.
function testObjects(mc, title) {
   console.log(`########## Inicio testeo: ${title} #############`);

   // Creación de instancias de Fridge y Television.
   console.log("########## entidades #############");
   let a1 = new Fridge("Acme", "a1", 1250, "red");
   let a2 = new Television("Acme", "a2", 100, 60);
   let a3 = new Fridge("Acme", "a3", 2500, "white");
   let a4 = new Television("Acme", "a4", 500, 55);
   console.log(a1.toString());
   console.log(a2.toString());
   console.log(a3.toString());
   console.log(a4.toString());

   // Intento de crear una instancia de Appliance (debería lanzar una excepción).
   try {
      let a = new Appliance("Acme", "a1", 1250);
   } catch (error) {
      console.error(error.toString());
   }

   // Insertar las instancias creadas en el objeto MaestreComponentes.
   console.log("########## insert #############");
   mc.insert(a1, a4, a2).insert(a3); // Insertar múltiples instancias y encadenar el método.
   console.log(mc.toString());

   // Intento de insertar instancias duplicadas (debería lanzar una excepción).
   try {
      mc.insert(a1, a2, a3, a4);
   } catch (error) {
      console.log(error);
   }

   // Mostrar las instancias ordenadas por precio.
   console.log("########## toString() #############");
   console.log("Ordenados por precio.");
   console.log(mc.toString((a, b) => a.price - b.price));

   // Filtrar y mostrar solo instancias de Television.
   console.log("########## filter() #############");
   console.log("Objetos Television");
   for (let tv of mc.filter((a) => a instanceof Television)) {
      console.log(tv.toString());
   }

   // Filtrar y mostrar instancias con precio mayor a 500.
   console.log("precio > 500");
   for (let tv of mc.filter((a) => a.price > 500)) {
      console.log(tv.toString());
   }

   // Iterar y mostrar todas las instancias en MaestreComponentes.
   console.log("########## Iterable #############");
   for (let appliance of mc) {
      console.log(appliance.toString());
   }

   // Eliminar instancias específicas y mostrar el resultado.
   console.log("########## delete() #############");
   console.log("a1, a3");
   mc.delete(a1.id).delete(a3.id);
   console.log(mc.toString());

   // Intentar eliminar una instancia no existente (debería lanzar una excepción).
   try {
      mc.delete("11111111");
   } catch (error) {
      console.log(error);
   }

   // Intentar eliminar una instancia que ya fue eliminada (debería lanzar una excepción).
   try {
      mc.delete(a1.id);
   } catch (error) {
      console.log(error);
   }
}

// Función para probar las dos implementaciones de MaestreComponentes (array y map).
function test() {
   testObjects(MaestreComponentesArray.getInstance(), "Implementación con array");
   console.log("##################################################################");
   testObjects(MaestreComponentesMap.getInstance(), "Implementación con map");
}

// Ejecutar la función test al cargar la ventana.
window.onload = test;
