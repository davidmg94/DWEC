// Función de testeo
function testSportClubMaestre() {
  const club = new SportClubMaestre();

  const player1 = new BasketballPlayer("AB1234567C", "Juan", "García", "1990-05-15", 190);
  const player2 = new SoccerPlayer("CD9876543E", "Pedro", "Martínez", "1988-10-20", "Defensa");
  const player3 = new BasketballPlayer("EF3456789G", "María", "López", "1995-02-28", 175);

  // Insertar miembros
  club.insert(player1, player2, player3);
  console.log("Miembros del club:");
  console.log(club.toString());
  try {
    club.insert(player2);
  } catch (error) {
    console.log(error);
  }
  // Eliminar un miembro
  club.delete("AB1234567C");
  console.log("\nDespués de eliminar un miembro:");
  console.log(club.toString());

  try {
    club.delete("ASDS46ASDC");

  } catch (error) {
    console.log(error);
  }
  // Filtrar miembros por tipo de jugador
  console.log("\nFiltrar miembros por tipo de jugador:");
  for (const member of club.filter(member => member instanceof SoccerPlayer)) {
      console.log(member.toString());
  }

  // Ordenar miembros por nombre
  console.log("\nMiembros ordenados por nombre:");
  console.log(club.toString((a, b) => a.firstname.localeCompare(b.firstname)));

  // Uso del protocolo iterable
  console.log("\nIterar sobre los miembros del club:");
  for (const member of club) {
      console.log(member.toString());
  }
}

// Ejecutar la función de testeo
testSportClubMaestre();