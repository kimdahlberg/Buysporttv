<?php
   
session_start(); //Session så att inloggnigen sparas mellan de olika sidorna
   require "config.php";
   
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
           $sql = "SELECT id, firstname, lastname, password, username, email FROM users WHERE username = $user AND password = $pass";
           $statement = $pdo->prepare($sql);
           $statement->execute (array('users' => $user, 'password' => $pass ));
           
           $result = $statement->fetch(PDO::FETCH_ASSOC);
           $hass = $result['password'];


              //Om värdet från databasen stämmer överäns med värdet från input  
           if (password_hash($pass) == $hass) {
             // $_SESSION['id'] = $result['id'];
              // $_SESSION['anvandarnamn'] = $user;
           
            //    echo "<p>Du är inloggad!</p>";
               
           } else {
               //Om värdet från databasen inte stämmer med värdet från input
               die("Anvädarnamnet eller lösenordet stämmer inte överäns.");
           }
         

$arr = ["firstname", "lastname", "username", "password", "email" => "value"];
echo json_encode($arr);
}


?>