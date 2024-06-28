/**
 * Ordena un array de números enteros utilizando 
 * el algoritmo de burbuja.
 * 
 * Muestra el array desordenado y ordenar.
 * Detiene la ordenación si encuentra un valor no entero.
 */
function burbuja() {
    let array = [50, 75, 10, 2, 88, 112, 64, 97, 15, 43, 87, 67, 35, 9, 46, 26, 20];  // Inicializa un array con números desordenados
    let ordenar = false;   //nos indicara si continuar con el bucle
    let salir = false;    //nos indicara si salir del bucle
    alert("Lista de numeros sin ordenar: " + array);    // Muestra el array original sin ordenar
    while (!ordenar) {    //mientras la lista no este ordenada se ejecuta el bucle.
        ordenar = true;        // Por defecto en cada pasada no hará falta ordenar
        for (let i = 0; i < array.length; i++) {    // Recorre el array comparando elementos adyacentes
            if (!Number.isInteger(array[i])) {      // Comprueba si el elemento es un número entero. 
                salir = true;                       //Si no es entero, sale del bucle
            } else {
                if (array[i] > array[i + 1]) {    // Si el elemento es mayor que el siguiente.
                    let temp = array[i];         // Intercambia los elementos de posición.
                    array[i] = array[i + 1];        
                    array[i + 1] = temp;
                    ordenar = false;            // Indica que el array no está ordenado
                }
            }
        }
        if (salir) {  // Si hubo un error, muestra mensaje y sale
            alert("ERROR! Hay un número no entero en el array.");
            break;
        }
    }
    if (!salir) { // Si no hubo errores, muestra el array ordenado
        alert("Lista de numeros ordenados: " + array);
    }
}