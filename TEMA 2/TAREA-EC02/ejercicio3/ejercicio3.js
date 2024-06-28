// Definición de la función calcular que toma un argumento llamado operacion
function calcular() {
    // Obtener el valor del primer número del campo de entrada con el id "num1" y convertirlo a un número
    let num1 = Number.parseFloat(document.getElementById("num1").value);
    // Obtener el valor del segundo número del campo de entrada con el id "num2" y convertirlo a un número
    let num2 = Number.parseFloat(document.getElementById("num2").value);

    // Verificar si num1 o num2 son números válidos
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        // Mostrar una alerta si alguno de los números no es válido y salir de la función
        alert("Introduce un número");
        return;
    }
    let operacion = document.getElementById("operacion").value; // Obtener la operación seleccionada

    let resultado = 0; //inicializa la variable resultado

    // Usar una estructura switch para determinar la operación a realizar basada en el argumento operacion
    switch (operacion) {
        case "suma":
            // Si operacion es "suma", sumar num1 y num2 y asignar el resultado a la variable resultado
            resultado = num1 + num2;
            break;
        case "resta":
            // Si operacion es "resta", restar num1 y num2 y asignar el resultado a la variable resultado
            resultado = num1 - num2;
            break;
        case "mult":
            // Si operacion es "mult", multiplicar num1 y num2 y asignar el resultado a la variable resultado
            resultado = num1 * num2;
            break;
        case "div":
            // Si operacion es "div", calcular la división de num1 entre num2 y asignar el resultado a la variable resultado
            if (num2 == 0) {
                // Mostrar una alerta si el divisor es 0, ya que no se puede dividir por cero
                alert("El divisor no puede ser 0.");
                resultado=NaN;
            } else {
                // Realizar la división si el divisor no es cero y asignar el resultado a la variable resultado
                resultado = num1 / num2;
            }
            break;
        case "sob":
            // Si operacion es "sob", calcular el resto de la división de num1 entre num2 y asignar el resultado a la variable resultado
            if (num2 === 0) {
                // Mostrar una alerta si el divisor es 0, ya que no se puede dividir por cero
                alert("El dividendo no puede ser 0.");
                resultado=NaN;
            } else {
                // Calcula el resto de la división y asigna el resultado a la variable resultado
                resultado = num1 % num2;
            }
            break;
        default:
            // Si operacion no coincide con ninguno de los casos anteriores, mostrar una alerta con "Operación no válida."
            alert("Operación no válida.");
            break;
    }

    // Establecer el valor del campo de entrada o elemento HTML correspondiente con el resultado
    document.getElementById("resultado").value = resultado;
}
