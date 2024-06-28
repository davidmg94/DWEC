// Obtenemos el contexto del lienzo del gráfico de ventas mensuales y del gráfico de ventas por departamento
const monthCtx = document.getElementById("monthlySales").getContext("2d");
const deptCtx = document.getElementById("deptSales").getContext("2d");

// Elemento HTML para mostrar el total anual de ventas
const yearlyLabel = document.getElementById("yearlyTotal");

// Botón para filtrar las ventas mensuales superiores a $5000
const bSalesOver5000 = document.getElementById("bSalesOver5000");
bSalesOver5000.addEventListener("click", getSalesMonths);

// Botón para restablecer las ventas mensuales
const bReset = document.getElementById("bReset");
bReset.addEventListener("click", resetMonthlySales);

// Valores del formulario
// Elementos del formulario para agregar una venta
const newAmount = document.getElementById("itemAmount"); // Campo de entrada para la cantidad de venta
const newMonth = document.getElementById("monthId"); // Campo de entrada para el mes de la venta
const bAddSaleModal = document.getElementById("bAddSaleModal"); // Botón para agregar venta (modal)
bAddSaleModal.addEventListener("click", addSale); // Evento para agregar venta al hacer clic en el botón

// Elementos del formulario para eliminar una venta
const bRemoveSale = document.getElementById("bRemoveSale"); // Botón para eliminar venta
bRemoveSale.addEventListener("click", drawSelectMonthlySales); // Evento para dibujar selección de ventas mensuales al hacer clic
const bRemoveSaleModal = document.getElementById("bRemoveSaleModal"); // Botón para eliminar venta (modal)
bRemoveSaleModal.addEventListener("click", removeMonthlySale); // Evento para eliminar venta al hacer clic en el botón

// Elementos para seleccionar el producto a agregar o eliminar
const newProduct = document.forms[0].inlineRadioOptions; // Opciones de producto para agregar
const deleteProducts = document.forms[1].inlineRadioOptionsDelete; // Opciones de producto para eliminar

// Variables
let deptSales = [0, 0, 0, 0]; // Arreglo para almacenar las ventas por departamento
const deptLabels = Array.of("Cámaras", "Portátiles", "Teléfonos", "Tablets"); // Etiquetas de los departamentos
const yearlyTotal = 0; // Total anual de ventas (inicialmente en 0)
let monthEliminated = false; // Indicador de si se ha eliminado un mes o no

// Variables para actualizar gráficas. Se inicializan como Arrays
// para almacenar los datos introducidos.
let monthlySalesCamera = []; // Ventas mensuales de camaras
let monthlySalesLaptop = []; // Ventas mensuales de portatiles
let monthlySalesPhone = []; // Ventas mensuales de teléfonos
let monthlySalesTablet = []; // Ventas mensuales de tablets
let monthlyLabels = []; // Etiquetas de los meses

/**
 * Mapa que almacena las ventas mensuales por categoría.
 * Las claves son los meses y los valores son mapas de productos y cantidades.
 */
let monthlySalesMap = new Map();
/**
 * Mapa que almacena las ventas mensuales por producto.
 * Las claves son los productos y los valores son las cantidades.
 */
let monthlySalesProduct = new Map();

// Gráfico de Barras
let monthlySalesChart = new Chart(monthCtx, {
   type: "bar",
   data: {
      labels: monthlyLabels, // Etiquetas de los meses
      datasets: [
         {
            label: "Cámaras",
            data: [],
            backgroundColor: "rgba(238, 184, 104, 1)",
            borderWidth: 0,
         },
         {
            label: "Portatiles",
            data: [],
            backgroundColor: "rgba(75, 166, 223, 1)",
            borderWidth: 0,
         },
         {
            label: "Teléfonos",
            data: [],
            backgroundColor: "rgba(239, 118, 122, 1)",
            borderWidth: 0,
         },
         {
            label: "Tablets",
            data: [],
            backgroundColor: "rgba(40, 167, 69, 1)",
            borderWidth: 0,
         },
      ],
   },
   options: {
      scales: {
         yAxes: [
            {
               ticks: { beginAtZero: true }, // Empieza desde cero en el eje Y
            },
         ],
      },
   },
});

// Gráfico de Pie
let deptSalesChart = new Chart(deptCtx, {
   type: "pie",
   data: {
      labels: deptLabels, // Etiquetas de las categorías
      datasets: [
         {
            label: "Número de ventas",
            data: deptSales, // Datos de ventas por categoría
            backgroundColor: ["rgba(238, 184, 104, 1)", "rgba(75, 166, 223, 1)", "rgba(239, 118, 122, 1)", "rgba(40, 167, 69, 1)"],
            borderWidth: 0,
         },
      ],
   },
   options: {}, // Opciones del gráfico de pie
});

// /* Calculo de totales */
// function addYearlyTotal(a, b, c) {
// 	return a + b + c;
// }

/**
 * Función para inicializar el total de ventas mensuales.
 * Calcula el total de ventas para cada categoría y lo muestra en el elemento HTML correspondiente.
 */
function initMonthlyTotalSales() {
   // Variables para almacenar el total de ventas por categoría y el total general
   let totalCamara = 0;
   let totalPhone = 0;
   let totalLaptop = 0;
   let totalTablet = 0;
   let total = 0;

   // Si el tamaño del mapa principal es 0, es decir, está vacío, el total de las ventas será 0.
   if (monthlySalesMap.size == 0) {
      total = 0;
   } else {
      // Si existen valores, recorremos el mapa principal y asignamos los valores a las variables correspondientes.
      monthlySalesMap.forEach((value, key) => {
         value.forEach((innerValue, innerKey) => {
            if (innerKey === "camera") {
               totalCamara += innerValue;
            } else if (innerKey === "phone") {
               totalPhone += innerValue;
            } else if (innerKey === "laptop") {
               totalLaptop += innerValue;
            } else if (innerKey === "tablet") {
               totalTablet += innerValue;
            }
         });

         // Calculamos el total sumando los totales parciales de cada categoría
         total = totalCamara + totalLaptop + totalPhone + totalTablet;
      });
   }

   // Mostramos el total de ventas anuales en el elemento HTML correspondiente
   yearlyLabel.innerHTML = total + "€";
}

// Llamamos a la función para inicializar el total de ventas mensuales
initMonthlyTotalSales();

/**
 * Función para restablecer las ventas mensuales.
 * Limpia el mapa de ventas mensuales, borra los datos de los gráficos y reinicia el total de ventas mensuales.
 */
function resetMonthlySales() {
   // Limpiamos el mapa de ventas mensuales
   monthlySalesMap.clear();

   // Borramos los datos de los gráficos de barras y de pie
   monthlySalesChart.data.labels = [];
   monthlySalesChart.data.datasets.forEach((dataset) => {
      dataset.data = [];
   });

   // Actualizamos y renderizamos los gráficos de barras y de pie
   monthlySalesChart.update();
   monthlySalesChart.reset();
   monthlySalesChart.render();

   deptSalesChart.update();
   deptSalesChart.reset();
   deptSalesChart.render();

   // Inicializamos el total de ventas mensuales
   initMonthlyTotalSales();
}

/**
 * Función para agregar una venta.
 * La función recoge los datos del formulario, valida que estén completos y luego los inserta en la estructura de mapas.
 * Después de la inserción, actualiza los totales y los gráficos.
 */
function addSale() {
   try {
      // Validación de datos recogidos desde el formulario
      // Validación de todos los inputs del formulario
      if (newMonth.value && newAmount.value && newProduct.value) {
         // Insertar venta en la estructura de mapas
         if (monthlySalesMap.has(newMonth.value)) {
            // Recogemos el mapa del mes
            let productsMap = monthlySalesMap.get(newMonth.value);

            if (productsMap.has(newProduct.value)) {
               // 3: Tenemos el mes y la categoría
               // Recuperar cantidad en base a la categoría
               let quantity = Number.parseInt(productsMap.get(newProduct.value));
               // Sumar la cantidad a la recuperada
               quantity += Number.parseInt(newAmount.value);
               // Registrar en el mapa la suma de ambas cantidades
               productsMap.set(newProduct.value, quantity);
            } else {
               // 2: Tenemos el mes pero no la categoría
               // Creamos un mapa de productos
               monthlySalesProduct = productsMap || new Map();
               // Añadir cantidad al mapa que acabamos de recuperar
               monthlySalesProduct.set(newProduct.value, Number.parseInt(newAmount.value));
               // Añadir el nuevo mapa al principal
               monthlySalesMap.set(newMonth.value, monthlySalesProduct);
            }
         } else {
            // 1: No tenemos ni el producto ni el mapa
            // Crear nuevo mapa de mes
            const newMonthMap = new Map();
            // Insertamos la cantidad con la clave de la categoría.
            newMonthMap.set(newProduct.value, Number.parseInt(newAmount.value));
            // Insertamos este mapa en el mapa principal con la clave del mes que acabamos de recibir
            monthlySalesMap.set(newMonth.value, newMonthMap);
         }
         // Ordenamos el mapa por las claves (en este caso los meses)
         monthlySalesMap = new Map([...monthlySalesMap.entries()].sort());

      } else {
         // Lanzamos mensaje de error si no se han rellenado todos los campos del formulario.
         throw {
            name: "FormError",
            message: "Hay campos vacíos en el formulario.",
         };
      }
      // Actualizar totales
      initMonthlyTotalSales();
      // Actualizar gráficas
      updateCharts();
   } catch (error) {
      // Tratamiento de excepciones
      alert(error.message);
   } finally {
      // Limpiar el formulario después de añadir ventas
      cleanAddSaleForm();
   }
}

// Función para actualizar los gráficos con las ventas realizadas.
function updateCharts() {
   // Variables para utilizar en la gráfica.
   // Almacena las etiquetas de los meses
   let monthlyLabels = Array.from(monthlySalesMap.keys());

   let valueCameraBar = 0; // Almacena el valor de ventas de camaras para el gráfico de barras
   let valueLaptopBar = 0; // Almacena el valor de ventas de portatiles para el gráfico de barras
   let valuePhoneBar = 0; // Almacena el valor de ventas de teléfonos para el gráfico de barras
   let valueTabletBar = 0; // Almacena el valor de ventas de tablets para el gráfico de barras

   let valueCameraPie = 0; // Almacena el valor de ventas de camaras para el gráfico de pie
   let valuePhonePie = 0; // Almacena el valor de ventas de teléfonos para el gráfico de pie
   let valueLaptopPie = 0; // Almacena el valor de ventas de portatiles para el gráfico de pie
   let valueTabletPie = 0; // Almacena el valor de ventas de tablets para el gráfico de pie

   /** Estructura de control para comprobar que el mapa principal tiene valores.
    * Si no tiene valores, asignamos los valores de las gráficas a 0 para que
    * la gráfica no tenga valores.
    */
   if (monthEliminated && monthlySalesMap.size == 0) {
      // Asigna 0 a todas las variables de ventas para el caso de que no haya datos
      valueCameraBar = 0;
      valueLaptopBar = 0;
      valuePhoneBar = 0;
      valueTabletBar = 0;

      // Actualizar valores en los arrays en la posición del mes.
      monthlySalesCamera = [];
      monthlySalesLaptop = [];
      monthlySalesPhone = [];
      monthlySalesTablet = [];

      // Crea los datasets para el gráfico de barras con valores vacíos
      let dataCamera = {
         label: "Cámaras",
         data: monthlySalesCamera,
         backgroundColor: "rgba(238, 184, 104, 1)",
         borderWidth: 0,
      };

      let dataLaptop = {
         label: "Portatiles",
         data: monthlySalesLaptop,
         backgroundColor: "rgba(75, 166, 223, 1)",
         borderWidth: 0,
      };

      let dataPhone = {
         label: "Teléfonos",
         data: monthlySalesPhone,
         backgroundColor: "rgba(239, 118, 122, 1)",
         borderWidth: 0,
      };

      let dataTablet = {
         label: "Tablets",
         data: monthlySalesTablet,
         backgroundColor: "rgba(40, 167, 69, 1)",
         borderWidth: 0,
      };

      // Actualiza los datasets del gráfico de barras
      monthlySalesChart.data.datasets = [dataCamera, dataLaptop, dataPhone, dataTablet];
      monthlySalesChart.data.labels = monthlyLabels;
   } else {
      // Obtener valores para cada categoría en el mes actual.
      /** Estructura de control para cuando no exista el mes, los valores para el gráfico se actualicen a 0. */
      if (monthlySalesMap.has(newMonth.value)) {
         // Obtiene los valores de ventas por categoría para el mes actual
         valueCameraBar = monthlySalesMap.get(newMonth.value).get("camera");
         valueLaptopBar = monthlySalesMap.get(newMonth.value).get("laptop");
         valuePhoneBar = monthlySalesMap.get(newMonth.value).get("phone");
         valueTabletBar = monthlySalesMap.get(newMonth.value).get("tablet");
      } else {
         // Asigna 0 a las variables de ventas si no hay datos para el mes actual
         valueCameraBar = 0;
         valueLaptopBar = 0;
         valuePhoneBar = 0;
         valueTabletBar = 0;
      }

      // Actualizar valores en los arrays en la posición del mes.
      monthlySalesCamera[monthlyLabels.indexOf(newMonth.value)] = valueCameraBar;
      monthlySalesLaptop[monthlyLabels.indexOf(newMonth.value)] = valueLaptopBar;
      monthlySalesPhone[monthlyLabels.indexOf(newMonth.value)] = valuePhoneBar;
      monthlySalesTablet[monthlyLabels.indexOf(newMonth.value)] = valueTabletBar;

      // Creamos los datasets para el gráfico de barras.
      let dataCamera = {
         label: "Cámaras",
         data: monthlySalesCamera,
         backgroundColor: "rgba(238, 184, 104, 1)",
         borderWidth: 0,
      };

      let dataLaptop = {
         label: "Portatiles",
         data: monthlySalesLaptop,
         backgroundColor: "rgba(75, 166, 223, 1)",
         borderWidth: 0,
      };

      let dataPhone = {
         label: "Teléfonos",
         data: monthlySalesPhone,
         backgroundColor: "rgba(239, 118, 122, 1)",
         borderWidth: 0,
      };

      let dataTablet = {
         label: "Tablets",
         data: monthlySalesTablet,
         backgroundColor: "rgba(40, 167, 69, 1)",
         borderWidth: 0,
      };

      // Actualizamos los datasets del gráfico de barras.
      monthlySalesChart.data.datasets = [dataCamera, dataLaptop, dataPhone, dataTablet];
      monthlySalesChart.data.labels = monthlyLabels;
   }

   // Actualización del gráfico de pie.

   /** Estructura de control para comprobar que el mapa principal tiene valores.
    * Si no tiene valores, asignamos los valores de las gráficas a 0 para que
    * la gráfica no tenga valores.
    */
   if (monthEliminated && monthlySalesMap.size == 0) {
      // Asigna 0 a todas las variables de ventas para el caso de que no haya datos
      valueCameraPie = 0;
      valuePhonePie = 0;
      valueLaptopPie = 0;
      valueTabletPie = 0;
   } else {
      // Acumular los valores anteriores con los nuevos.
      monthlySalesMap.forEach((value, key) => {
         value.forEach((innerValue, innerKey) => {
            if (innerKey === "camera") {
               valueCameraPie += innerValue;
            } else if (innerKey === "phone") {
               valuePhonePie += innerValue;
            } else if (innerKey === "laptop") {
               valueLaptopPie += innerValue;
            } else if (innerKey === "tablet") {
               valueTabletPie += innerValue;
            }
         });
      });
   }

   // Actualizar el gráfico de pie
   deptSales = [valueCameraPie, valueLaptopPie, valuePhonePie, valueTabletPie];
   deptSalesChart.data.datasets[0].data = deptSales;

   // Actualizar los gráficos
   deptSalesChart.update();
   monthlySalesChart.update();
}

// Función para limpiar el formulario de agregar venta.
function cleanAddSaleForm() {
   // Limpiar los valores de los campos del formulario
   newMonth.value = "";
   newAmount.value = "";
}

// Función para obtener y mostrar las ventas por mes.
function getSalesMonths() {
   // Iterar sobre el mapa principal de ventas mensuales
   monthlySalesMap.forEach(function (categoryMap, month) {
      let salesText = month + ": ";
      // Iterar sobre el mapa de categorías para este mes
      categoryMap.forEach(function (amount, category) {
         // Verificar si la cantidad de ventas supera los 5000
         if (amount >= 5000) {
            // Construir el texto con la cantidad de ventas para cada categoría que supera los 5000
            salesText += category + " - " + amount + ";  ";
         }
      });
      // Mostrar el texto en una alerta
      alert(salesText);
   });
}

// Función para dibujar las opciones de ventas mensuales en un elemento select.
function drawSelectMonthlySales() {
   // Seleccionamos el elemento select
   let selectedMonth = document.getElementById("removeSales");

   // Limpiamos las opciones existentes
   selectedMonth.innerHTML = "";

   // Iteramos sobre el mapa principal de ventas mensuales
   monthlySalesMap.forEach((categoryMap, month) => {
      categoryMap.forEach((amount, category) => {
         // Crear el HTML de la opción como una cadena e insertar la opción en el elemento select
         selectedMonth.insertAdjacentHTML('beforeend', 
            `<option value="${month}-${category}">${month}: ${category} - ${amount}</option>`);
      });
   });
   
}

// Llamamos a la función para dibujar el select al cargar la página
drawSelectMonthlySales();

// Función para eliminar la venta seleccionada
function removeMonthlySale() {
   try {
      // Seleccionamos el elemento select
      let selectedMonth = document.getElementById("removeSales");
      // Obtenemos el valor seleccionado del grupo de botones de radio
      let selectedRadio = document.querySelector('input[name="inlineRadioOptionsDelete"]:checked');

      // Verificamos que se haya seleccionado una opción
      if (selectedMonth.value && selectedRadio) {
         // Extraemos solo el mes de la cadena de valor seleccionada
         let month = selectedMonth.value.substring(0, 7);
         // Obtenemos la categoría seleccionada en los botones de radio
         let selectedCategory = selectedRadio.value;

         // Verificamos que el mes exista en el mapa principal
         if (monthlySalesMap.has(month)) {
            let categoryMap = monthlySalesMap.get(month);
            // Verificamos que la categoría exista en el mapa de ese mes
            if (categoryMap.has(selectedCategory)) {
               // Eliminamos la venta
               categoryMap.delete(selectedCategory);
               // Eliminamos el mes del mapa principal si no tiene ventas restantes
               if (!monthlySalesMap.get(month).size) {
                  monthlySalesMap.delete(month);
                  monthEliminated = true;
               }
               // Actualizamos los gráficos y las ventas totales
               updateCharts();
               initMonthlyTotalSales();
               // Volvemos a dibujar las opciones en el select
               drawSelectMonthlySales();
               // Limpiamos la selección del select
               selectedMonth.selectedIndex = -1;
            }
         }
      }
   } catch (error) {
      // Si no se seleccionó una opción válida, mostramos un mensaje de error
      alert("Por favor, seleccione una venta válida para eliminar.");
   }
}
