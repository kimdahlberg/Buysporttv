
<?php header('Access-Control-Allow-Origin: http://buysporttv.zocomutbildning.se/*'); 
	include_once ("connect.php");
	header('Content-Type: application/json');
  	

	$league = $_POST['league'];
	$team = $_POST['team'];
	

  	// SQL Hämtar all football: Serie A, Lag och matcher.
  	$STH = $pdo->prepare("SELECT `id`, `type`, `league`, `startdate`, `stopdate`, `home`, `away`, `price` 
  						  FROM products 
  						  WHERE league = :league AND (home = :team OR away = :team)");
  						$STH->bindParam(":league", $_POST['league']);
  						$STH->bindParam(":team", $_POST['team']);
  						
$serie_a = array();
$nhl	 = array();

$STH->execute();
foreach( $STH as $row ) {

	$serie_a[] = $row;

	$id 		= $row['id'];
	$type 		= $row['type'];
	$league 	= $row['league'];
	$startdate 	= $row['startdate'];
	$home 		= $row['home'];
	$away 		= $row['away'];
	$price 		= $row['price'];


}

echo json_encode($serie_a);

?>

