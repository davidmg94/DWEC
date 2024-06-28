// Clase base para excepciones
class BaseException extends Error {
   constructor(message = "Default Message", fileName, lineNumber) {
      // Llama al constructor de la clase padre (Error) con el mensaje, nombre de archivo y número de línea
      super(message, fileName, lineNumber);
      // Establece el nombre de la excepción como "BaseException"
      this.name = "BaseException";

      // Captura la pila de llamadas si está disponible
      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, BaseException);
      }
   }
}

// Excepción base del gestor de la cual heredarán el resto de excepciones personalizadas.
class RestaurantException extends BaseException {
   constructor(message = "Error: Restaurant Exception.", fileName, lineNumber) {
      // Llama al constructor de la clase padre (BaseException) con el mensaje, nombre de archivo y número de línea
      super(message, fileName, lineNumber);
      // Establece el nombre de la excepción como "RestaurantException"
      this.name = "RestaurantException";
   }
}

// Excepción para casos donde se intenta acceder incorrectamente al constructor de una clase
class InvalidAccessConstructorException extends BaseException {
   constructor(fileName, lineNumber) {
      // Llama al constructor de la clase padre (BaseException) con un mensaje específico
      super("Constructor can’t be called as a function.", fileName, lineNumber);
      // Establece el nombre de la excepción como "InvalidAccessConstructorException"
      this.name = "InvalidAccessConstructorException";
   }
}

// Excepción para casos donde se espera un valor pero se proporciona un valor vacío
class EmptyValueException extends BaseException {
   constructor(param, fileName, lineNumber) {
      // Llama al constructor de la clase padre (BaseException) con un mensaje específico
      super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
      // Establece el nombre de la excepción como "EmptyValueException"
      this.name = "EmptyValueException";
      // Guarda el nombre del parámetro que se esperaba pero está vacío
      this.param = param;
   }
}

// Excepcion por si el objeto es null o no es un objeto de la clase requerida.
class ErrorExistenceElementException extends RestaurantException {
   constructor(message) {
      // Llama al constructor de la clase padre (RestaurantException) con un mensaje específico
      super(message || "Element can`t be null or the object is not a category.");
      // Establece el nombre de la excepción como "ErrorExistenceElementException"
      this.name = "ErrorExistenceElementException";
   }
}

// Excepción para indicar que un elemento ya existe
class ElementExistsYetException extends RestaurantException {
   constructor(message) {
      // Llama al constructor de la clase padre (RestaurantException) con un mensaje específico
      super(message || "Element exists yet.");
      // Establece el nombre de la excepción como "ElementExistsYetException"
      this.name = "ElementExistsYetException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un elemento ya ha sido registrado
class ElementRecordedYetException extends RestaurantException {
   constructor(message) {
      // Llama al constructor de la clase padre (RestaurantException) con un mensaje específico
      super(message || "Element recorded yet.");
      // Establece el nombre de la excepción como "ElementRecordedYetException"
      this.name = "ElementRecordedYetException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un elemento no ha sido registrado
class ElementNotRecordedException extends RestaurantException {
   constructor(message) {
      // Llama al constructor de la clase padre (RestaurantException) con un mensaje específico
      super(message || "Element not recorded.");
      // Establece el nombre de la excepción como "ElementNotRecordedException"
      this.name = "ElementNotRecordedException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un atributo es obligatorio pero no se proporciona
class AttributeRequiredException extends RestaurantException {
   constructor(message) {
      // Llama al constructor de la clase padre (RestaurantException) con un mensaje específico
      super(message || "Attribute is required.");
      // Establece el nombre de la excepción como "AttributeRequiredException"
      this.name = "AttributeRequiredException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Exporta todas las excepciones para que estén disponibles fuera del módulo
export {
   BaseException,
   RestaurantException,
   InvalidAccessConstructorException,
   EmptyValueException,
   ErrorExistenceElementException,
   ElementExistsYetException,
   ElementRecordedYetException,
   ElementNotRecordedException,
   AttributeRequiredException,
};
