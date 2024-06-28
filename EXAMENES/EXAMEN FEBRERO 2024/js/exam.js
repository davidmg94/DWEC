"use strict";

// Clase personalizada para manejar excepciones específicas
class ExamException extends BaseException {
   constructor(message = "Error: MaestreComponentes Exception.", fileName, lineNumber) {
      super(message, fileName, lineNumber);
      this.name = "ManagerException";
   }
}

// Implementación de Agenda utilizando un array
const AgendaArray = (function () {
   class Agenda {
      #organizations;
      #events;

      // Método privado para encontrar la posición de una organización en el array
      #findOrganizationPosition(organization) {
         return this.#organizations.findIndex((storedOrganization) => {
            return organization.name === storedOrganization.name;
         });
      }

      // Método privado para encontrar la posición de un evento en el array
      #findEventPosition(event) {
         return this.#events.findIndex((storedEvent) => {
            return event.name === storedEvent.event.name;
         });
      }

      // Constructor inicializa los arrays de organizaciones y eventos
      constructor() {
         this.#organizations = [];
         this.#events = [];
      }

      // Inserta una o más organizaciones en la agenda
      insertOrganization(...organizations) {
         organizations.forEach((organization) => {
            if (organization instanceof Organization) {
               if (this.#findOrganizationPosition(organization) === -1) {
                  this.#organizations.push(organization);
                  // Mantiene el array ordenado
                  this.#organizations.sort((a, b) => a.name.localeCompare(b.name));
               } else {
                  throw new ExamException(`The organization ${organization.name} already exists.`);
               }
            } else {
               throw new ExamException(`The argument is not an Organization.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Inserta uno o más eventos en la agenda
      insertEvent(...events) {
         events.forEach((event) => {
            if (event instanceof Event) {
               if (this.#findEventPosition(event) === -1) {
                  this.#events.push({ event, organization: null });
                  // Mantiene el array ordenado
                  this.#events.sort((a, b) => a.event.name.localeCompare(b.event.name));
               } else {
                  throw new ExamException(`The event ${event.name} already exists.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Generador para obtener eventos que cumplan una condición específica
      *getEvents(condition = () => true) {
         for (const e of this.#events) {
            if (condition(e.event)) yield e.event;
         }
      }

      // Asigna uno o más eventos a una organización específica
      assignEventsToOrganization(organization, ...events) {
         if (!organization instanceof Organization) throw new ExamException(`The ${organization.name} is not an Organization.`);
         const orgPosition = this.#findOrganizationPosition(organization);
         if (orgPosition === -1) throw new ExamException(`The ${organization.name} is not in the Agenda.`);
         organization = this.#organizations[orgPosition];

         events.forEach((event) => {
            if (event instanceof Event) {
               const eventPosition = this.#findEventPosition(event);
               if (eventPosition !== -1) {
                  this.#events[eventPosition].organization = organization;
               } else {
                  throw new ExamException(`The event ${event.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Generador para obtener los eventos de una organización específica
      *getOrganizationEvents(organization) {
         if (!organization instanceof Organization) throw new ExamException(`The ${organization.name} is not an Organization.`);
         const orgPosition = this.#findOrganizationPosition(organization);
         if (orgPosition === -1) throw new ExamException(`The ${organization.name} is not in the Agenda.`);
         organization = this.#organizations[orgPosition];
         for (const storedEvent of this.#events) {
            if (storedEvent.organization === organization) yield storedEvent.event;
         }
      }

      // Elimina uno o más eventos de la agenda
      removeEvent(...events) {
         events.forEach((event) => {
            if (event instanceof Event) {
               const eventPosition = this.#findEventPosition(event);
               if (eventPosition !== -1) {
                  this.#events.splice(eventPosition, 1);
               } else {
                  throw new ExamException(`The event ${event.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this;
      }

      // Elimina una o más organizaciones de la agenda
      removeOrganization(...organizations) {
         organizations.forEach((organization) => {
            if (organization instanceof Organization) {
               const orgPosition = this.#findOrganizationPosition(organization);
               if (orgPosition !== -1) {
                  for (let i = this.#events.length - 1; i >= 0; i--) {
                     if (this.#events[i].organization === this.#organizations[orgPosition]) this.#events.splice(i, 1);
                  }
                  this.#organizations.splice(orgPosition, 1);
               } else {
                  throw new ExamException(`The organization ${organization.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Organization.`);
            }
         });
         return this;
      }

      // Iterador para recorrer todos los eventos en la agenda
      *[Symbol.iterator]() {
         for (const event of this.#events) {
            yield event;
         }
      }
   }

   let instanciated;

   // Inicializa una nueva instancia de Agenda
   function init() {
      return new Agenda();
   }

   // Singleton para obtener la instancia de Agenda
   return {
      getInstance: function () {
         if (!instanciated) instanciated = init();
         return instanciated;
      },
   };
})();

// Implementación de Agenda utilizando un mapa
const AgendaMap = (function () {
   class Agenda {
      #organizations;
      #events;

      // Constructor inicializa los mapas de organizaciones y eventos
      constructor() {
         this.#organizations = new Map();
         this.#events = new Map();
      }

      // Inserta una o más organizaciones en la agenda
      insertOrganization(...organizations) {
         organizations.forEach((organization) => {
            if (organization instanceof Organization) {
               if (!this.#organizations.has(organization.name)) {
                  this.#organizations.set(organization.name, organization);
               } else {
                  throw new ExamException(`The organization ${organization.name} already exists.`);
               }
            } else {
               throw new ExamException(`The argument is not an Organization.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Inserta uno o más eventos en la agenda
      insertEvent(...events) {
         events.forEach((event) => {
            if (event instanceof Event) {
               if (!this.#events.has(event.name)) {
                  this.#events.set(event.name, { event, organization: null });
               } else {
                  throw new ExamException(`The event ${event.name} already exists.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Generador para obtener eventos que cumplan una condición específica
      *getEvents(condition = () => true) {
         for (const e of this.#events.values()) {
            if (condition(e.event)) yield e.event;
         }
      }

      // Asigna uno o más eventos a una organización específica
      assignEventsToOrganization(organization, ...events) {
         if (!organization instanceof Organization) throw new ExamException(`The ${organization.name} is not an Organization.`);
         if (!this.#organizations.has(organization.name)) throw new ExamException(`The ${organization.name} is not in the Agenda.`);
         organization = this.#organizations.get(organization.name);
         events.forEach((event) => {
            if (event instanceof Event) {
               const storedEvent = this.#events.get(event.name);
               if (storedEvent) {
                  storedEvent.organization = organization;
                  this.#events.set(event.name, storedEvent);
               } else {
                  throw new ExamException(`The event ${event.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this; // Permite encadenar métodos
      }

      // Generador para obtener los eventos de una organización específica
      *getOrganizationEvents(organization) {
         if (!organization instanceof Organization) throw new ExamException(`The ${organization.name} is not an Organization.`);
         const storedOrganization = this.#organizations.get(organization.name);
         if (!storedOrganization) throw new ExamException(`The ${organization.name} is not in the Agenda.`);
         for (const storedEvent of this.#events.values()) {
            if (storedEvent.organization === storedOrganization) yield storedEvent.event;
         }
      }

      // Elimina uno o más eventos de la agenda
      removeEvent(...events) {
         events.forEach((event) => {
            if (event instanceof Event) {
               const storedEvent = this.#events.get(event.name);
               if (storedEvent) {
                  this.#events.delete(storedEvent.event.name);
               } else {
                  throw new ExamException(`The event ${event.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Event.`);
            }
         });
         return this;
      }

      // Elimina una o más organizaciones de la agenda
      removeOrganization(...organizations) {
         organizations.forEach((organization) => {
            if (organization instanceof Organization) {
               const storedOrganization = this.#organizations.get(organization.name);
               if (storedOrganization) {
                  for (const storedEvent of this.#events.values()) {
                     if (storedEvent.organization === storedOrganization) this.#events.delete(storedEvent.event.name);
                  }
                  this.#organizations.delete(storedOrganization.name);
               } else {
                  throw new ExamException(`The organization ${organization.name} doesn't exist in the agenda.`);
               }
            } else {
               throw new ExamException(`The argument is not an Organization.`);
            }
         });
         return this;
      }

      // Iterador para recorrer todos los eventos en la agenda
      [Symbol.iterator]() {
         return this.#events.values();
      }
   }

   let instanciated;

   // Inicializa una nueva instancia de Agenda
   function init() {
      return new Agenda();
   }

   // Singleton para obtener la instancia de Agenda
   return {
      getInstance: function () {
         if (!instanciated) instanciated = init();
         return instanciated;
      },
   };
})();
