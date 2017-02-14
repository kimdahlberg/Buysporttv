<?php
session_start(); //Session så att inloggnigen sparas mellan de olika sidorna
   require "connect.php";
   
  //Om någon trycker på knappen
   if (isset($_POST['submitLogin'])) {
       
       $user = $_POST['username'];
       $pass = $_POST['password'];

           //Om det inte står något i användarnamn och lösenord
       if (empty($user) && empty($pass)) {
           //Om fälten är tomma
           die("<p>Vänligen fyll i fälten</p>");    
           
       }

           //Stämmer användarnamnet överens med db
           $sql = "SELECT id, firstname, lastname, email, username, hashedpw FROM users WHERE username = :user AND hashedpw = :pass";
           $statement = $pdo->prepare($sql);
        //    $statement->execute (array('username' => $user, 'Hashedpw' => $pass ));
            $statement->bindParam(":user", $user);
            $statement->bindParam(":pass", $pass);
            $statement->execute();
           
           $result = $statement->fetch(PDO::FETCH_ASSOC);
           $hass = $result['hashedpw'];

              //Om värdet från databasen stämmer överäns med värdet från input  
           if ($pass == $hass) {
              $_SESSION['id'] = $result['id'];
              $_SESSION['anvandarnamn'] = $user;
               
           } else {
               //Om värdet från databasen inte stämmer med värdet från input
               die("Anvädarnamnet eller lösenordet stämmer inte överäns.");
           }
         

$arr = ["firstname" => $result['firstname'], "lastname" => $result['lastname'], "username" => $result['username'], "password" => $result['hashedpw'], "email" => $result['email']];
echo json_encode($arr);
}


?>