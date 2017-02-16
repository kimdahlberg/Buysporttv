<?php
session_start(); 

require_once("connect.php");	

$id = $_POST['id'];


//$sql = "DELETE FROM `products` WHERE `id` = :" . id
$sql = "DELETE FROM `products` WHERE id = :id";

            $statement = $pdo->prepare($sql);
			//$statement->bindParam();
            $statement->execute(array(':id' => $id)); 
	echo	$statement->rowCount();
	
?>