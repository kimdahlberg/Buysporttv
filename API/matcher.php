<?php header('Access-Control-Allow-Origin: http://buysporttv.zocomutbildning.se'); 

 ini_set('display_errors', 'On');
    error_reporting(E_ALL);

 $host = 'localhost'; //Eller datorns ip adress
   $db = 'projekt4';
   $user = 'root';
   $password = 'root';
   $charset = 'utf8';
   $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
   $options = [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
       PDO::ATTR_EMULATE_PREPARES   => false  ];
    try {
 
   $pdo = new PDO($dsn, $user, $password, $options);*/
   
    }
   $sql = "SELECT `games`,`date` FROM `matches` ORDER BY :leg";
$stm = $pdo->prepare($sql);
$stm->execute(array(':leg' => 'league'));

}

?>