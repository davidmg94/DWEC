document.querySelector("button[name='getplayers']").addEventListener("click", () => {
    fetch('http://localhost/examJunio/getJugadores.php')
        .then(response => response.json())
        .then(data => {
            for (let jugadorData of data) {
                let jugador;
                if (jugadorData.deporte === "basket") {
                    jugador = new JugadorBaloncesto(jugadorData.nombre, jugadorData.apellido, jugadorData.fechaNacimiento, jugadorData.posicion, jugadorData.altura);
                } else if (jugadorData.deporte === "tennis") {
                    jugador = new JugadorTenis(jugadorData.nombre, jugadorData.apellido, jugadorData.fechaNacimiento, jugadorData.zurdo);
                }
                club.añadirJugador(jugador);
            }
            mostrarJugadores(club);
        })
        .catch(error => console.error('Error:', error));
});
