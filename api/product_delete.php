<?php header('Access-Control-Allow-Origin: http://buysporttv.zocomutbildning.se');
session_start();

require_once("connect.php");    

$id = $_POST['id'];

$sql = "DELETE FROM `products` WHERE `id` = :id";

    try {
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":id", $id);
        $result = $statement->execute();
        echo json_encode(1);
    }
    catch (PDOException $e) {
        echo "<br>" . $e->getMessage();
    }
?>