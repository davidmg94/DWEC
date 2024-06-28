"use strict";

// Definición de la clase base Evento
class Event {
   // Atributos privados utilizando # para la encapsulación
   #name;
   #about;
   #duration;
   #startDate;
   #endDate;
   #location;

   // Constructor de la clase Evento
   constructor(name, duration, startDate, endDate, location) {
      // Expresión regular para validar el formato de la ubicación
      const locationER = /\d{1,2}º\d{1,2}'\d{1,2}''[NS];\d{1,2}º\d{1,2}'\d{1,2}''[OE];/;

      // Validación de parámetros y excepciones
      if (!new.target) throw new InvalidAccessConstructorException();
      if (!name) throw new EmptyValueException("name");
      if (!duration) throw new EmptyValueException("duration");
      if (!startDate) throw new EmptyValueException("startDate");
      if (!endDate) throw new EmptyValueException("endDate");
      if (!location) throw new EmptyValueException("location");
      if (!locationER.test(location)) throw new ExamException(`La ubicación no tiene el formato correcto: ${location}`);
      if (!(startDate instanceof Date)) throw new InvalidValueException("startDate");
      if (!(endDate instanceof Date)) throw new InvalidValueException("endDate");
      if (endDate < startDate) throw new ExamException("La fecha de inicio debe ser anterior a la fecha de finalización");

      // Inicialización de atributos privados
      this.#name = name;
      this.#duration = duration;
      this.#startDate = startDate;
      this.#endDate = endDate;
      this.#location = location;
   }

   // Getters y setters para los atributos
   get name() {
      return this.#name;
   }
   set name(value) {
      if (!value) throw new EmptyValueException("name");
      this.#name = value;
   }

   get duration() {
      return this.#duration;
   }
   set duration(value) {
      if (!value) throw new EmptyValueException("duration");
      this.#duration = value;
   }

   get location() {
      return this.#location;
   }
   set location(value) {
      if (!value) throw new EmptyValueException("location");
      this.#location = value;
   }

   get about() {
      return this.#about;
   }
   set about(value) {
      if (!value) throw new EmptyValueException("about");
      this.#about = value;
   }

   get startDate() {
      return this.#startDate;
   }
   set startDate(value) {
      if (!value) throw new EmptyValueException("startDate");
      if (!(value instanceof Date)) throw new InvalidValueException("startDate");
      if (this.#endDate < value) throw new ExamException("La fecha de inicio debe ser anterior a la fecha de finalización");
      this.#startDate = value;
   }

   get endDate() {
      return this.#endDate;
   }
   set endDate(value) {
      if (!value) throw new EmptyValueException("endDate");
      if (!(value instanceof Date)) throw new InvalidValueException("endDate");
      if (this.#startDate > value) throw new ExamException("La fecha de inicio debe ser anterior a la fecha de finalización");
      this.#endDate = value;
   }

   // Método toString para representación de texto del evento
   toString() {
      return `${this.#name}: ${this.#duration} en ${
         this.#location
      }. Del ${this.#startDate.toLocaleDateString()} al ${this.#endDate.toLocaleDateString()}. `;
   }
}

// Definición de la clase MusicEvent que hereda de Evento
class MusicEvent extends Event {
   // Atributos privados específicos
   #performer;

   // Constructor de la clase MusicEvent
   constructor(name, duration, startDate, endDate, location, performer) {
      // Llamada al constructor de la clase padre (Evento)
      super(name, duration, startDate, endDate, location);

      // Validación y asignación del atributo específico
      if (!performer) throw new EmptyValueException("performer");
      this.#performer = performer;
   }

   // Getter y setter para el atributo específico
   get performer() {
      return this.#performer;
   }
   set performer(value) {
      if (!value) throw new EmptyValueException("performer");
      this.#performer = value;
   }

   // Método toString que sobrescribe el de la clase padre para añadir información específica
   toString() {
      return super.toString() + `Artista: ${this.#performer}`;
   }
}

// Definición de la clase SportEvent que hereda de Evento
class SportEvent extends Event {
   // Atributos privados específicos
   #homeTeam;
   #awayTeam;

   // Constructor de la clase SportEvent
   constructor(name, duration, startDate, endDate, location, homeTeam, awayTeam) {
      // Llamada al constructor de la clase padre (Evento)
      super(name, duration, startDate, endDate, location);

      // Validación y asignación de atributos específicos
      if (!homeTeam) throw new EmptyValueException("homeTeam");
      if (!awayTeam) throw new EmptyValueException("awayTeam");
      this.#homeTeam = homeTeam;
      this.#awayTeam = awayTeam;
   }

   // Getters y setters para los atributos específicos
   get homeTeam() {
      return this.#homeTeam;
   }
   set homeTeam(value) {
      if (!value) throw new EmptyValueException("homeTeam");
      this.#homeTeam = value;
   }

   get awayTeam() {
      return this.#awayTeam;
   }
   set awayTeam(value) {
      if (!value) throw new EmptyValueException("awayTeam");
      this.#awayTeam = value;
   }

   // Método toString que sobrescribe el de la clase padre para añadir información específica
   toString() {
      return super.toString() + `${this.#homeTeam} vs ${this.#awayTeam}`;
   }
}

// Definición de la clase Organization
class Organization {
   // Atributos privados
   #name;
   #email;
   #phone;
   #description;

   // Constructor de la clase Organization
   constructor(name, email, phone) {
      // Validación de parámetros y excepciones
      if (!new.target) throw new InvalidAccessConstructorException();
      if (!name) throw new EmptyValueException("name");
      if (!email) throw new EmptyValueException("email");
      if (!phone) throw new EmptyValueException("phone");

      // Inicialización de atributos privados
      this.#name = name;
      this.#email = email;
      this.#phone = phone;
   }

   // Getters y setters para los atributos
   get name() {
      return this.#name;
   }
   set name(value) {
      if (!value) throw new EmptyValueException("name");
      this.#name = value;
   }

   get email() {
      return this.#email;
   }
   set email(value) {
      if (!value) throw new EmptyValueException("email");
      this.#email = value;
   }

   get phone() {
      return this.#phone;
   }
   set phone(value) {
      if (!value) throw new EmptyValueException("phone");
      this.#phone = value;
   }

   get description() {
      return this.#description;
   }
   set description(value) {
      if (!value) throw new EmptyValueException("description");
      this.#description = value;
   }

   // Método toString para representación de texto de la organización
   toString() {
      return `${this.#name}, ${this.#email}, ${this.#phone}`;
   }
}
