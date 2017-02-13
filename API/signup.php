<?php 

include_once ("connect.php");

if (isset($_POST['submitReg'])){

	$regmessage = [0, 1];
 
	// Tag bort eventuella blanksteg i början eller slutet
	foreach($_POST as $key => $val){
    	$_POST[$key] = trim($val);
  	}

  	  $firstname        = $_POST['fname'];
      $lastname         = $_POST['lname'];
      $email            = $_POST['femail'];
      $confirmemail     = $_POST['cemail'];  
      $password         = $_POST['fpassword'];
      $confirmpassword  = $_POST['cpassword'];
	  $username 		= $_POST['username'];

  	// Kolla om emailen är upptaget och kopplat till tidigare registrerad användare. 
  	$STH = $pdo->prepare("SELECT email FROM users WHERE email = :email");
	$STH->bindParam(":email", $_POST['femail']);

	try {
		$STH->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage();
	}
			
	if ($STH->rowCount() > 0) {
    	$reg_error[] = 1;

	}

	//$epost = $_POST['epost'];

  	// Kolla om lösenordet är för kort
	if (strlen($_POST['fpassword']) < 8)
		$reg_error[] = 2;
  
 
	// Kolla så att lösenorden stämmer överrens
	if ($password != $confirmpassword) {
	    $reg_error[] = 3;
	}


	// Kolla så att lösenordet innehåller minst en VERSAL
	if(!preg_match('/[A-Z]/', $password)) {
 		$reg_error[] = 4;
	}

	// Inga fel? Spara och logga in samt skicka till välkomstsida
	if (!isset($reg_error)) {

		// En funktion för att skapa ett bra salt.
		function mt_rand_str ($l, $c = 'abcdefghiJKkLmnopQRStuVwxyz1234567890') {
		    for ($s = '', $cl = strlen($c)-1, $i = 0; $i < $l; $s .= $c[mt_rand(0, $cl)], ++$i);
		    return $s;
		}
		// håll koll på hash, byt ut med jämna mellanrum för update!
		$salt = mt_rand_str(31); // Ger en 31 tkn lång slumpsträng.
		$hashed = hash("sha512", $password . $salt ); // Ger 128 tkn.

	   $STH = $pdo->prepare("INSERT INTO users (firstname, lastname, email, username, Hashedpw, Salt)
            VALUES('$firstname', '$lastname', '$email', '$username', '$hashed', '$salt')");

		try {
			$STH->execute();
		}

		catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}
		$temp = $pdo->lastInsertId();
		$_SESSION['userid'] = $temp;

		if ($temp > 0 ){
			echo json_encode($regmessage[1]);
		}

		else {
			echo json_encode($regmessage[0]);
		}

		}
		else {
		echo json_encode($regmessage[0]);
	}

}

$error_list[0] = "Alla obligatoriska fält är inte ifyllda.";
$error_list[1] = "Epostadressen finns redan registrerad";
$error_list[2] = "Lösenordet måste vara minst 8 tecken."; 
$error_list[3] = "Lösenordet måste innehålla minst en versal.";	
$error_list[4] = "Lösenorden stämmer inte överens."; 
$error_list[5] = "E-postadresserna stämmer inte överens."; 


?>