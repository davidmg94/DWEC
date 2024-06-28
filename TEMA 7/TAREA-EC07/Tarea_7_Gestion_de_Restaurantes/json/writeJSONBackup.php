<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if(isset($_POST['jsonObj'])){
    $json = $_POST['jsonObj'];

    if (!file_exists('backup')) {
        mkdir('backup', 0777, true);
    }
    
    $fecha = time();
    
    $campos = getdate($fecha);

    $title = "Backup/Backup-$campos[mday]-$campos[mon]-$campos[year]-$campos[hours]_$campos[minutes]_$campos[seconds].json";

    $fd = fopen("$title","w+") or die ("Error al crear el archivo");
    
    fputs($fd,$json);
    
    fclose($fd);
    echo $title;
}

?>
