<?php

	include_once("../bin/header.php");

	$variable = $_GET["variable"];

	if ( $variable != "" && file_exists("$variable.htconfig")) {

		echo @file_get_contents("$variable.htconfig");
	}

?>