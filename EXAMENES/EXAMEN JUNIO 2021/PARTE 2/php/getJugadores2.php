<?php
// Notificar solamente errores de ejecución
error_reporting(0);

// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Content-Type: application/json');

$player1 = new stdClass();
$player1->nombre = "John";
$player1->apellido = "Smith";
$player1->fechaNacimiento = date_create("2000-03-15");
$player1->posicion = "Center";
$player1->altura = 2.05;

$player2 = new stdClass();
$player2->nombre = "Vince";
$player2->apellido = "Johnson";
$player2->fechaNacimiento = date_create("2001-03-15");
$player2->posicion = "Forward";
$player2->altura = 1.95;

$player3 = new stdClass();
$player3->nombre = "Alice";
$player3->apellido = "Tailor";
$player3->fechaNacimiento = date_create("2001-03-21");
$player3->posicion = "Guard";
$player3->altura = 1.75;

$player4 = new stdClass();
$player4->nombre = "Kevin";
$player4->apellido = "Ayton";
$player4->fechaNacimiento = date_create("1999-06-21");
$player4->mano = "Left";

$player5 = new stdClass();
$player5->nombre = "Michael";
$player5->apellido = "Williams";
$player5->fechaNacimiento = date_create("2001-06-12");
$player5->mano = "Right";

$player6 = new stdClass();
$player6->nombre = "Peter";
$player6->apellido = "Parker";
$player6->fechaNacimiento = date_create("2002-06-01");
$player6->mano = "Right";


$list = array($player1, $player4, $player2, $player6, $player3, $player5);

$myJSON = json_encode($list);

echo $myJSON;
?>