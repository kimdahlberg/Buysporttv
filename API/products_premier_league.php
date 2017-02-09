<?php 
	include_once ("connect.php");
  	
  	// SQL Hämtar all football (premier league) med all data. 
  	$STH = $pdo->prepare("SELECT `type`, `league`, `startdate`, `home`,`away`, `price` FROM products WHERE `league` = 'premier league' ORDER BY `startdate` ASC");

$resultat = array();

$STH->execute();
foreach( $STH as $row ) {

	$resultat[] = $row;

	$type = $row['type'];
	$league = $row['league'];
	$startdate = $row['startdate'];
	$home = $row['home'];
	$away = $row['away'];
	$price = $row['price'];


}

echo json_encode($resultat);

?>