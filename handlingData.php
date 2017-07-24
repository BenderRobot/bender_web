<?php
	header("Content-Type: text/plain");
	
	$state = $_GET["state"];

	if ($state != "fail"){
		$cmd = "sudo espeak ";
		$output = shell_exec($cmd .$state);
		echo $output;
	} else {
		echo "fail";
	}
?>
