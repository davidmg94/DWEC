"use strict";

// Definición de la clase BaseException para crear excepciones personalizadas.
function BaseException(message = "Default Message", fileName, lineNumber) {
   let instance = new Error(message, fileName, lineNumber); // Crear una instancia de Error con el mensaje y detalles.
   instance.name = "MyError"; // Asignar un nombre a la excepción.
   Object.setPrototypeOf(instance, Object.getPrototypeOf(this)); // Establecer el prototipo de la instancia.
   if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, BaseException); // Capturar el stack trace si está disponible.
   }
   return instance; // Devolver la instancia de la excepción.
}

// Establecer el prototipo de BaseException.
BaseException.prototype = Object.create(Error.prototype, {
   constructor: {
      value: BaseException,
      enumerable: false,
      writable: false,
      configurable: false,
   },
});

// Excepción para acceso inválido a constructor.
function InvalidAccessConstructorException() {
   let instance = BaseException.call(this, "Constructor can’t be called as a function."); // Llamar a BaseException con un mensaje personalizado.
   instance.name = "InvalidAccessConstructorException"; // Asignar un nombre a la excepción.
   return instance;
}

// Establecer el prototipo de InvalidAccessConstructorException.
InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype, {
   constructor: {
      value: InvalidAccessConstructorException,
      enumerable: false,
      writable: false,
      configurable: false,
   },
});

// Excepción personalizada para indicar valores vacíos.
function EmptyValueException(param) {
   let instance = BaseException.call(this, "Error: The parameter " + param + " can't be empty."); // Llamar a BaseException con un mensaje personalizado.
   instance.name = "EmptyValueException"; // Asignar un nombre a la excepción.
   instance.param = param; // Guardar el parámetro que causó la excepción.
   return instance;
}

// Establecer el prototipo de EmptyValueException.
EmptyValueException.prototype = Object.create(BaseException.prototype, {
   constructor: {
      value: EmptyValueException,
      enumerable: false,
      writable: false,
      configurable: false,
   },
});

// Excepción para valores inválidos.
function InvalidValueException(param, value) {
   let instance = BaseException.call(this, "Error: The parameter " + param + " has an invalid value. (" + param + ": " + value + ")"); // Llamar a BaseException con un mensaje personalizado.
   instance.name = "InvalidValueException"; // Asignar un nombre a la excepción.
   instance.param = param; // Guardar el parámetro que causó la excepción.
   instance.value = value; // Guardar el valor que causó la excepción.
   return instance;
}

// Establecer el prototipo de InvalidValueException.
InvalidValueException.prototype = Object.create(BaseException.prototype, {
   constructor: {
      value: InvalidValueException,
      enumerable: false,
      writable: false,
      configurable: false,
   },
});

// Excepción personalizada para clases abstractas.
function AbstractClassException(className) {
   let instance = BaseException.call(this, "Error: The class " + className + " is abstract."); // Llamar a BaseException con un mensaje personalizado.
   instance.name = "AbstractClassException"; // Asignar un nombre a la excepción.
   instance.className = className; // Guardar el nombre de la clase abstracta.
   return instance;
}

// Establecer el prototipo de AbstractClassException.
AbstractClassException.prototype = Object.create(BaseException.prototype, {
   constructor: {
      value: AbstractClassException,
      enumerable: false,
      writable: false,
      configurable: false,
   },
});
