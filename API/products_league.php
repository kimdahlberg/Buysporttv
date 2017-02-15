<?php header('Access-Control-Allow-Origin: http://buysporttv.zocomutbildning.se/*'); 
	include_once ("connect.php");
	// header('Content-Type: application/json');
  	$league = $_POST['league'];
  	// SQL Hämtar all football (premier league) med all data. 
  	$STH = $pdo->prepare("SELECT `id`, `type`, `league`, `startdate`, `stopdate`, `home`,`away`, `price` FROM products WHERE `league` = :league ORDER BY `startdate` ASC");
      $STH->bindParam(":league", $league);
$resultat = array();

$STH->execute();
foreach( $STH as $row ) {

	$resultat[] = $row;

	$id = $row['id'];
	$type = $row['type'];
	$league = $row['league'];
	$startdate = $row['startdate'];
	$stopdate = $row['stopdate'];
	$home = $row['home'];
	$away = $row['away'];
	$price = $row['price'];

}

echo json_encode($resultat);

?>