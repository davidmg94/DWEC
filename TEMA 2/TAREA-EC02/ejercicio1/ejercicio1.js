/**
 * Ordena un array de números utilizando
 * el algoritmo de ordenación burbuja.
 * Muestra el array desordenado y ordenado.
 */
function burbuja() {
    // Inicializar array de números
    let array = [50, 75, 10, 2, 88, 112, 64, 97, 15, 43, 87, 67, 35, 9, 46, 26, 20];
    // Mostrar el array sin ordenar
    alert("Lista de numeros sin ordenar: " + array);
    // Implementar algoritmo de burbuja con bulce for
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[j] > array[i]) {  // Si el elemento es mayor que el siguiente.
                let temp = array[j];    // Intercambia los elementos de posición.
                array[j] = array[i];
                array[i] = temp;
            }
        }
    }
    // Mostrar el array ordenado
    alert("Lista de numeros ordenados: " + array);
}