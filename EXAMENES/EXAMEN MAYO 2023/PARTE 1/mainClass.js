
// Definición de la clase SportClubMaestre
class SportClubMaestre {
  constructor() {
     this.members = [];
  }

  // Método para añadir un nuevo miembro
  insert(...members) {
     for (const member of members) {
        if (!this.members.some((existingMember) => existingMember.nif === member.nif)) {
           this.members.push(member);
        } else {
           throw new Error(`Ya existe un miembro con NIF: ${member.nif}`);
        }
     }
     return this;
  }

  // Método para eliminar un miembro por id
  delete(nif) {
     const index = this.members.findIndex((member) => member.nif === nif);
     if (index !== -1) {
        this.members.splice(index, 1);
     } else {
        throw new Error(`No se encontró ningún miembro con ID: ${nif}`);
     }
     return this;
  }

  // Método para convertir a string con posibilidad de ordenar
  toString(orderFunction) {
     const sortedMembers = orderFunction ? this.members.slice().sort(orderFunction) : this.members;
     return sortedMembers.map((member) => member.toString()).join("\n");
  }

  // Método para filtrar miembros
  *filter(filterFunction) {
     for (const member of this.members) {
        if (filterFunction(member)) {
           yield member;
        }
     }
  }

  // Implementación del protocolo iterable
  [Symbol.iterator]() {
     let index = 0;
     const members = this.members;
     return {
        next: function () {
           return {
              value: index <= members.length ? members[index++] : undefined,
              done: index > members.length,
           };
        },
     };
  }
  // [Symbol.iterator]() {
  //   let index = 0;
  //   const members = this.members;
  //   return {
  //     next: function() {
  //       if (index < members.length) {
  //         return {
  //           value: members[index++],
  //           done: false
  //         };
  //       } else {
  //         return {
  //           done: true
  //         };
  //       }
  //     }
  //   };
  // }
}
