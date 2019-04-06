<?php
require_once('connect.php');
if(isset($_POST) & !empty($_POST)){
	$username = $_POST['username'];
	$password = $_POST['password'];
	

	$sql = "INSERT INTO `user` (`username`, `password`, `Total`, `Income`, `expense`, `percent`) VALUES ('$username', '$password', '0', '0', '0', '0')";

	#$sql = "INSERT INTO user VALUES ('$username','$password','0','0','0')";
	$result = mysqli_query($connection, $sql);

	if($result){
	$smsg="User Registration Successful";
	}
	else{
	$fmsg= "User Registration Failed";
	}
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>User Registration</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>

	<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<div class="container">
      <?php if(isset($smsg)){ ?><div class="alert alert-success" role="alert"> <?php echo $smsg; ?> </div><?php } ?>
      <?php if(isset($fmsg)){ ?><div class="alert alert-danger" role="alert"> <?php echo $fmsg; ?> </div><?php } ?>
      
<form class="form-signin" method="POST">
        <center><h2 class="form-signin-heading"><b>Please Register</b></h2></center><hr>


<br>
		
            
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" name="username" id="inputEmail" class="form-control" placeholder="Email address" required ><br>

         <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required><br>

		<button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        <a class="btn btn-lg btn-primary btn-block" href="index.php">Login</a>
      </form>
</div>
</body>
</html>