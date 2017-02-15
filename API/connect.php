<?php 
$host_name = "mysql525.loopia.se";
$database = "zocomutbildning_se_db_2"; 	 // Change your database name
$username = "buysport@z164405";          // Your database user id 
$password = "12buysp0rt7v89";          // Your password

//////// Do not Edit below /////////
try {

$pdo = new PDO('mysql:host='.$host_name.';dbname='.$database, $username, $password);

} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
		die();
}

?>