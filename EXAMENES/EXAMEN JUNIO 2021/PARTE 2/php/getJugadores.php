<?php
// Notificar solamente errores de ejecución
error_reporting(0);

// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Content-Type: application/json');

$player1->firstname = "John";
$player1->lastname = "Smith";
$player1->born = date_create("2000-03-15");;
$player1->position = "Center";
$player1->height = 2.05;

$player2->firstname = "Vince";
$player2->lastname = "Johnson";
$player2->born = date_create("2001-03-15");;
$player2->position = "Forward";
$player2->height = 1.95;

$player3->firstname = "Alice";
$player3->lastname = "Tailor";
$player3->born = date_create("2001-03-21");;
$player3->position = "Guard";
$player3->height = 1.75;

$player4->firstname = "Kevin";
$player4->lastname = "Ayton";
$player4->born = date_create("1999-06-21");;
$player4->hand = "Left";

$player5->firstname = "Michael";
$player5->lastname = "Williams";
$player5->born = date_create("2001-06-12");;
$player5->hand = "Right";

$player6->firstname = "Peter";
$player6->lastname = "Parker";
$player6->born = date_create("2002-06-01");;
$player6->hand = "Right";


$list = array($player1, $player4, $player2, $player6, $player3, $player5);

$myJSON = json_encode($list);

echo $myJSON;



?>