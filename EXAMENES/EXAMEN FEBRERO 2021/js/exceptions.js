// Clase base para excepciones personalizadas
class BaseException extends Error {
   // Constructor de la clase base para excepciones
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

// Excepción base del gestor, de la cual heredarán el resto de excepciones personalizadas
class ManagerException extends BaseException {
   // Constructor de la excepción del gestor
   constructor(message = "Error: Manager Exception.", fileName, lineNumber) {
      // Llama al constructor de la clase base (BaseException) con el mensaje, nombre de archivo y número de línea
      super(message, fileName, lineNumber);
      // Establece el nombre de la excepción como "ManagerException"
      this.name = "ManagerException";
   }
}

// Excepción para casos donde se intenta acceder incorrectamente al constructor de una clase
class InvalidAccessConstructorException extends BaseException {
   // Constructor de la excepción
   constructor(fileName, lineNumber) {
      // Llama al constructor de la clase base (BaseException) con un mensaje específico
      super("Constructor can’t be called as a function.", fileName, lineNumber);
      // Establece el nombre de la excepción como "InvalidAccessConstructorException"
      this.name = "InvalidAccessConstructorException";
   }
}

// Excepción para casos donde se espera un valor pero se proporciona un valor vacío
class EmptyValueException extends BaseException {
   // Constructor de la excepción
   constructor(param, fileName, lineNumber) {
      // Llama al constructor de la clase base (BaseException) con un mensaje específico
      super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
      // Establece el nombre de la excepción como "EmptyValueException"
      this.name = "EmptyValueException";
      // Guarda el nombre del parámetro que se esperaba pero está vacío
      this.param = param;
   }
}

// Excepción para casos donde el objeto es nulo o no es de la clase requerida
class ErrorExistenceElementException extends ManagerException {
   // Constructor de la excepción
   constructor(message) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(message || "Element can’t be null or the object is not a category.");
      // Establece el nombre de la excepción como "ErrorExistenceElementException"
      this.name = "ErrorExistenceElementException";
   }
}

// Excepción para indicar que un elemento ya existe
class ElementExistsYetException extends ManagerException {
   // Constructor de la excepción
   constructor(message) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(message || "Element exists yet.");
      // Establece el nombre de la excepción como "ElementExistsYetException"
      this.name = "ElementExistsYetException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un elemento ya ha sido registrado
class ElementRecordedYetException extends ManagerException {
   // Constructor de la excepción
   constructor(message) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(message || "Element recorded yet.");
      // Establece el nombre de la excepción como "ElementRecordedYetException"
      this.name = "ElementRecordedYetException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un elemento no ha sido registrado
class ElementNotRecordedException extends ManagerException {
   // Constructor de la excepción
   constructor(message) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(message || "Element not recorded.");
      // Establece el nombre de la excepción como "ElementNotRecordedException"
      this.name = "ElementNotRecordedException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para indicar que un atributo es obligatorio pero no se proporciona
class AttributeRequiredException extends ManagerException {
   // Constructor de la excepción
   constructor(message) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(message || "Attribute is required.");
      // Establece el nombre de la excepción como "AttributeRequiredException"
      this.name = "AttributeRequiredException";
      // Guarda el mensaje de la excepción
      this.message = message;
   }
}

// Excepción para casos donde el objeto no es de la clase requerida
class ObjecManagerException extends ManagerException {
   // Constructor de la excepción
   constructor(param, className, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
      // Guarda los parámetros y la clase esperada
      this.param = param;
      this.className = className;
      // Establece el nombre de la excepción como "ObjecManagerException"
      this.name = "ObjecManagerException";
   }
}

// Excepción para indicar que una categoría ya existe en el gestor
class CategoryExistsException extends ManagerException {
   // Constructor de la excepción
   constructor(category, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
      // Guarda la categoría que causó la excepción
      this.category = category;
      // Establece el nombre de la excepción como "CategoryExistsException"
      this.name = "CategoryExistsException";
   }
}

// Excepción para indicar que una categoría no existe en el gestor
class CategoryNotExistException extends ManagerException {
   // Constructor de la excepción
   constructor(category, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${category.title} not exists in the manager.`, fileName, lineNumber);
      // Guarda la categoría que causó la excepción
      this.category = category;
      // Establece el nombre de la excepción como "CategoryNotExistException"
      this.name = "CategoryNotExistException";
   }
}

// Excepción para indicar que un producto ya existe en el gestor
class ProductExistsException extends ManagerException {
   // Constructor de la excepción
   constructor(product, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${product.serial} already exists in the manager.`, fileName, lineNumber);
      // Guarda el producto que causó la excepción
      this.product = product;
      // Establece el nombre de la excepción como "ProductExistsException"
      this.name = "ProductExistsException";
   }
}

// Excepción para indicar que un producto no existe en el gestor
class ProductNotExistInManagerException extends ManagerException {
   // Constructor de la excepción
   constructor(product, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${product.serial} doesn't exist in the manager.`, fileName, lineNumber);
      // Guarda el producto que causó la excepción
      this.product = product;
      // Establece el nombre de la excepción como "ProductNotExistInManagerException"
      this.name = "ProductNotExistInManagerException";
   }
}

// Excepción para indicar que un producto ya existe en una categoría
class ProductExistInCategoryException extends ManagerException {
   // Constructor de la excepción
   constructor(product, category, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${product.serial} already exist in ${category.title}.`, fileName, lineNumber);
      // Guarda el producto y la categoría que causaron la excepción
      this.category = category;
      this.product = product;
      // Establece el nombre de la excepción como "ProductExistInCategoryException"
      this.name = "ProductExistInCategoryException";
   }
}

// Excepción para indicar que un producto no existe en una categoría
class ProductNotExistInCategoryException extends ManagerException {
   // Constructor de la excepción
   constructor(product, category, fileName, lineNumber) {
      // Llama al constructor de la clase base (ManagerException) con un mensaje específico
      super(`Error: The ${product.serial} doesn't exist in ${category.title}.`, fileName, lineNumber);
      // Guarda el producto y la categoría que causaron la excepción
      this.category = category;
      this.product = product;
      // Establece el nombre de la excepción como "ProductNotExistInCategoryException"
      this.name = "ProductNotExistInCategoryException";
   }
}

// Exporta todas las excepciones para que estén disponibles fuera del módulo
export {
   BaseException,
   InvalidAccessConstructorException,
   EmptyValueException,
   ErrorExistenceElementException,
   ElementExistsYetException,
   ElementRecordedYetException,
   ElementNotRecordedException,
   AttributeRequiredException,
   ProductNotExistInCategoryException,
   ManagerException,
   ObjecManagerException,
   CategoryExistsException,
   CategoryNotExistException,
   ProductExistsException,
   ProductNotExistInManagerException,
   ProductExistInCategoryException,
};
