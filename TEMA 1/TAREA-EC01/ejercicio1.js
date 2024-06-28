// Variable que almacena el nombre
let nombre = "David Medina García";
// Muestra un mensaje de bienvenida utilizando la variable 'nombre' y la función 'cuadrado'
alert("Bienvenido: " + nombre + " " + cuadrado(5));
// Define la función 'cuadrado' que toma un número como argumento
function cuadrado(num) {
    // Calcula el cuadrado del número
    let resultado = num * num;
    // Muestra un mensaje en la consola con el resultado
    console.log("El cuadrado de " + num + " es: " + resultado);
    // Devuelve el resultado
    return resultado;
}
// Define  la función 'calcularCuadrado' para procesar un número ingresado por el usuario
function calcularCuadrado() {
    // Obtiene el elemento de entrada con el ID "num"
    let input = document.getElementById("num"); 
    // Obtiene el elemento donde se mostrará el resultado
    let resultado = document.getElementById("resultado"); 
    // Muestra un mensaje en la consola con el valor obtenido del input
    console.log("El valor obtenido del input es " + input.value);
    // Muestra el resultado en el elemento HTML
    resultado.innerHTML = "El cuadrado es: " + cuadrado(input.value);
}
// Llama a la función 'calcularCuadrado' para mostrar el cuadrado de un número al cargar la página
calcularCuadrado();
// Configura una función para ejecutarse cuando se carga la ventana.Como la fución no esta definida la dejo comentada.
// window.onload = ejemploConsola;
