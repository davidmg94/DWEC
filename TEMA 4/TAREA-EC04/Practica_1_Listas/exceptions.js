// Definición de clases de errores personalizadas

//Excepción para indicar que la lista está llena.
class ListFullError extends Error {
   constructor(message) {
      super(message);
      this.name = "ListFullError";
   }
}

//Excepción para indicar que se ha introducido una posición superior al límite de la lista.
class ListLimitError extends Error {
   constructor(message) {
      super(message);
      this.name = "ListLimitError";
   }
}

//Excepción para indicar que se ha introducido un elemento que no es un objeto.
class NotObject extends Error {
   constructor(message) {
      super(message);
      this.name = "NotObject";
   }
}

//Excepción para indicar que la lista ya esta vacía.
class ListEmpty extends Error {
   constructor(message) {
      super(message);
      this.name = "ListYetEmpty";
   }
}

//Excepción para indicar que el elemento no existe.
class ElementNotExist extends Error {
   constructor(message) {
      super(message);
      this.name = "ElementNotExists";
   }
}

//Excepción para indicar que el tipo del elemento introducido no es igual que el tipo de la lista.
class NotSameType extends Error {
   constructor(message) {
      super(message);
      this.name = "NotSameType";
   }
}

//Excepción que indica que el elemento introducido ya existe en la lista.
class ElementExists extends Error {
   constructor(message) {
      super(message);
      this.name = "ElementExists";
   }
}

// Exporta las clases
export { ListFullError, ListLimitError, NotObject, ListEmpty, ElementNotExist, NotSameType, ElementExists };
