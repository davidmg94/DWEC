// Excepción base para crear otras excepciones derivadas
class BaseException extends Error {
   constructor(message = "", fileName, lineNumber) {
      super(message, fileName, lineNumber);
      this.name = "BaseException";
      // Captura de la pila de llamadas para un mejor rastreo
      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, BaseException);
      }
   }
}

// Excepción para cuando se intenta acceder al constructor de manera incorrecta
class InvalidAccessConstructorException extends BaseException {
   constructor(fileName, lineNumber) {
      super("El constructor no puede ser llamado como una función.", fileName, lineNumber);
      this.name = "InvalidAccessConstructorException";
   }
}

// Excepción para indicar que un parámetro no puede estar vacío
class EmptyValueException extends BaseException {
   constructor(param, fileName, lineNumber) {
      super(`Error: El parámetro ${param} no puede estar vacío.`, fileName, lineNumber);
      this.param = param;
      this.name = "EmptyValueException";
   }
}

// Excepción genérica para validaciones de parámetros
class ParameterValidationException extends BaseException {
   constructor(param, fileName, lineNumber) {
      super(`Error: El parámetro ${param} es inválido.`, fileName, lineNumber);
      this.param = param;
      this.name = "ParameterValidationException";
   }
}

// Excepción para indicar que un parámetro tiene un valor inválido
class InvalidValueException extends BaseException {
   constructor(param, value, fileName, lineNumber) {
      super(`Error: El parámetro ${param} tiene un valor inválido. (${param}: ${value})`, fileName, lineNumber);
      this.param = param;
      this.name = "InvalidValueException";
   }
}

// Excepción para indicar que una clase es abstracta y no debería ser instanciada directamente
class AbstractClassException extends BaseException {
   constructor(className, fileName, lineNumber) {
      super(`Error: La clase ${className} es abstracta y no puede ser instanciada.`, fileName, lineNumber);
      this.className = className;
      this.name = "AbstractClassException";
   }
}
