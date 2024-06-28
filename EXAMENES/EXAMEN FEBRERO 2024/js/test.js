"use strict";

// Función para testear objetos en la agenda
function testObjects(agenda, title){
    console.log(`########## Inicio testeo: ${title} #############`);
    console.log("########## entidades #############");

    // Creación de eventos de ejemplo
    const e1 = new Event('Examen febrero', '3 horas', new Date(), new Date(), `51º30'30''N;0º7'32''O;`);
    console.log(e1.toString());
    const m1 = new MusicEvent('Concierto 1', '3 horas', new Date(), new Date(), `51º30'30''N;0º7'32''O;`, 'Artista1');
    console.log(m1.toString());
    const s1 = new SportEvent('Partido baloncesto', '3 horas', new Date(), new Date(), `51º30'30''N;0º7'32''O;`, 'Equipo1', 'Equipo2');
    console.log(s1.toString());

    // Prueba de manejo de errores al crear un evento con fechas incorrectas
    try {
        const eventError = new Event('Error', '3 horas', new Date(2024, 1, 1), new Date(2023, 1, 1), `51º30'30''N;0º7'32''O;`);
    } catch (error) {
        console.log(error);
    }
    
    // Creación de organizaciones de ejemplo
    const o1 = new Organization('O1', 'o1@email.es', '11111111');
    const o2 = new Organization('O2', 'o2@email.es', '22222222');
    const o3 = new Organization('O3', 'o3@email.es', '33333333');
    const o4 = new Organization('O4', 'o4@email.es', '44444444');

    // Creación de eventos musicales y deportivos de ejemplo
    const me1 = new MusicEvent('MusicEvent 1', '3 horas', new Date(2023,1,1), new Date(2023,1,1), `51º30'30''N;0º7'32''O;`, 'Artista1');
    const me2 = new MusicEvent('MusicEvent 2', '3 horas', new Date(2022,1,1), new Date(2023,1,1), `51º30'30''N;0º7'32''O;`, 'Artista1');
    const me3 = new MusicEvent('MusicEvent 3', '3 horas', new Date(2023,1,1), new Date(2023,1,1), `51º30'30''N;0º7'32''O;`, 'Artista1');
    const me4 = new MusicEvent('MusicEvent 4', '3 horas', new Date(2022,1,1), new Date(2023,1,1), `51º30'30''N;0º7'32''O;`, 'Artista1');
    const se1 = new SportEvent('SportEvent 1', '3 horas', new Date(2025,1,1), new Date(2025,1,1), `51º30'30''N;0º7'32''O;`, 'Equipo1', 'Equipo2');
    const se2 = new SportEvent('SportEvent 2', '3 horas', new Date(2025,1,1), new Date(2025,1,1), `51º30'30''N;0º7'32''O;`, 'Equipo1', 'Equipo2');
    const se3 = new SportEvent('SportEvent 3', '3 horas', new Date(2025,1,1), new Date(2025,1,1), `51º30'30''N;0º7'32''O;`, 'Equipo1', 'Equipo2');
    const se4 = new SportEvent('SportEvent 4', '3 horas', new Date(2025,1,1), new Date(2025,1,1), `51º30'30''N;0º7'32''O;`, 'Equipo1', 'Equipo2');

    console.log("########## insert #############");  

    // Inserción de organizaciones y eventos en la agenda
    agenda.insertOrganization(o2,o3,o1,o4);
    agenda.insertEvent(e1, m1, s1);
    agenda.insertEvent(me1, me2, me3, me4);
    agenda.insertEvent(se1, se2, se3, se4);

    // Manejo de errores al intentar insertar entidades duplicadas
    try {
        agenda.insertOrganization(o2,o3,o1,o4);
    } catch (error){
        console.error(error.toString());
    }
    try {
        agenda.insertEvent(e1, m1, s1);
    } catch (error){
        console.error(error.toString());
    }

    console.log("########## Assign #############");

    // Asignación de eventos a organizaciones
    agenda.assignEventsToOrganization(o3, m1, s1);
    agenda.assignEventsToOrganization(o1, e1);
    agenda.assignEventsToOrganization(o3, e1);
    agenda.assignEventsToOrganization(o2, me1, me2, me3, me4);
    agenda.assignEventsToOrganization(o1, se1, se2, se3, se4);

    console.log("########## Iterable #############");

    // Iteración a través de los eventos en la agenda
    for (const e of agenda){
        console.log('Organization: ' + e.organization + '. ' + e.event);
    }

    console.log("########## Events in Organization #############");

    // Mostrar eventos de una organización específica
    console.log(o1.name);
    for (const event of agenda.getOrganizationEvents(o1)){
        console.log(event.toString());
    }
    console.log(o3.name);
    for (const event of agenda.getOrganizationEvents(o3)){
        console.log(event.toString());
    }

    console.log("########## Events #############");

    // Filtrado y muestra de eventos basados en condiciones específicas
    console.log('2023 events');
    for (const event of agenda.getEvents((event) => {
        return (event.startDate.getFullYear() === 2023)
    })){
        console.log(event.toString());
    }
    console.log('SportEvents');
    for (const event of agenda.getEvents((event) => {
        return (event instanceof SportEvent)
    })){
        console.log(event.toString());
    }

    console.log("########## Remove #############");

    // Eliminación de organizaciones y eventos de la agenda
    agenda.removeOrganization(o3);
    agenda.removeEvent(me1, me2, se1, se2);
    for (const event of agenda.getEvents()){
        console.log(event.toString());
    }

    // Manejo de errores al intentar eliminar entidades inexistentes
    try {
        agenda.removeEvent(me1, me2, se1, se2);
    } catch (error) {
        console.error(error);
    }
    try {
        agenda.removeOrganization(o3);
    } catch (error) {
        console.error(error);
    }

    console.log(`########## Fin testeo: ${title} #############`);
}

// Función para ejecutar las pruebas con las dos implementaciones de Agenda
function test(){
    testObjects(AgendaArray.getInstance(), 'Implementación con array');
    console.log('##################################################################')
    testObjects(AgendaMap.getInstance(), 'Implementación con map');
}

// Ejecutar las pruebas cuando la ventana se cargue
window.onload = test;
