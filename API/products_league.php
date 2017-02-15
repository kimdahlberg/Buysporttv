<?php header('Access-Control-Allow-Origin: http://buysporttv.zocomutbildning.se'); 
	// header('Content-Type: application/json');
	include_once ("connect.php");
	$league = $_POST['league'];
	// SQL Hämtar all football från en liga med all data. 
	$sql = "SELECT id, type, league, startdate, stopdate, home, away, price 
			FROM products 
			WHERE league = :league";
	$STH = $pdo->prepare($sql);
	$STH->bindParam(":league", $league);
	$resultat = array();

try {
	$STH->execute();
}
catch (PDOException $e) {
	echo "Error: " . e->getMessage();
}

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