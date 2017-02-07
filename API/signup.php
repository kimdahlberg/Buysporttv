<?php 
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


include_once ("connect.php");

if (isset($_POST['submitReg'])){


 
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


  	// Kolla om emailen är upptaget och kopplat till tidigare registrerad användare. 
  	$STH = $pdo->prepare("SELECT email FROM users WHERE email = :email");
	$STH->bindParam(":email", $_POST['fmail']);

	try {
		$STH->execute();
	}
	catch (PDOException $e) {
		echo "Error: " . $e->getMessage();
	}
			
	if ($STH->rowCount() > 0)
    	$reg_error[] = 1;

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

	   $STH = $pdo->prepare("INSERT INTO users (firstname, lastname, email, Hashedpw, Salt)
            VALUES('$firstname', '$lastname', '$email', '$hashed', '$salt')");

		try {
			$STH->execute();
		}

		catch (PDOException $e) {
			echo "Error: " . $e->getMessage();
		}

		$_SESSION['userid'] = $pdo->lastInsertId();

			echo "<p>välkomen till sportTV</p>";

	}

}

$error_list[0] = "Alla obligatoriska fält är inte ifyllda.";
$error_list[1] = "Epostadressen finns redan registrerad";
$error_list[2] = "Lösenordet måste vara minst 8 tecken."; 
$error_list[3] = "Lösenordet måste innehålla minst en versal.";	
$error_list[4] = "Lösenorden stämmer inte överens."; 
$error_list[5] = "E-postadresserna stämmer inte överens."; 


?>

<!DOCTYPE html>
<html>
<head>
	<title>user registration php & MySQL</title>
</head>
<body


<div class="container">
  				
<?php

		$back[0] = '';
	  	$back[1] = '';
	  	$back[2] = '';
	  	$back[3] = '';



	if (isset($reg_error)){
 
		echo "<p>Något blev fel:<br>\n";
		echo "<ul>\n";
  		for ($i = 0; $i < sizeof($reg_error); $i++) {
    		echo "<li>{$error_list[$reg_error[$i]]}</li>\n";
  		}
  		echo "</ul>\n";
  
		$back[0] = stripslashes($_POST['fname']);
	  	$back[1] = stripslashes($_POST['lname']);
	  	$back[2] = stripslashes($_POST['femail']);
	  	$back[3] = stripslashes($_POST['cemail']);


	}
?>



    <h1>Create account</h1>
    <form class="form" action="signup.php" method="post" role="form">
      
      <div class="alert alert-error"></div>
          <input type="text" placeholder="Förnamn" name="fname" value = "<?php echo $back[0]; ?>" required /> <br>
          <input type="text" placeholder="Efternamn" name="lname" value = "<?php echo $back[1]; ?>"required /> <br>
          <input type="email" placeholder="Email" name="femail" value = "<?php echo $back[2]; ?>"required /> <br>
          <input type="email" placeholder="Bekräfta email" name="cemail" value = "<?php echo $back[3]; ?>"required /> <br>
          <input type="password" placeholder="Password" name="fpassword" autocomplete="new-password" required /> <br>
          <input type="password" placeholder="Bekräfta password" name="cpassword" autocomplete="new-password" required /> <br>
          (Lösenordet måste vara minst 8 tecken och innehålla minst en versal).
    		 <br><br>
          <input type="submit" value="Skapa konto" name="submitReg" class="" />
    </form>
</div>



</body>
</html>