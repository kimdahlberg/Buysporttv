<?php 
$host_name = "mysql525.loopia.se";
$database = "zocomutbildning_se_db_2"; 	 // Change your database name
$username = "buysport@z164405";          // Your database user id 
$password = "12buysp0rt7v89";          // Your password
$charset = "utf8";
$dsn = "mysql:host=$host_name;dbname=$database;charset=$charset";

$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false];
//////// Do not Edit below /////////
try {

$pdo = new PDO($dsn, $username, $password, $options);

} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
		die();
}

?>