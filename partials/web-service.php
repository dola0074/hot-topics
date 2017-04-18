<?php
//echo "<pre>\$_POST";
//print_r($_POST);
//echo "</pre>";

echo "<p> Thank you {$_POST["fn"]}!</p>";
echo "<p> Your message has been sent from: {$_POST["em"]} and the subject is {$_POST["subject"]}.";
?>