<?php

	include_once("../bin/header.php");

	$variable = $_GET["variable"];
	$value = @$_GET["value"];

	if ( $variable != "" ) {

		$fp = @fopen("$variable.htconfig", "w+");

		if ( $fp ) {

			@fwrite($fp, $value);
			@fclose($fp);
			echo 1;
		}
	}
?>