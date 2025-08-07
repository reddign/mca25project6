<?php
session_start();


if($_SERVER['HTTP_HOST'] == "127.0.0.1") {
    $mysqli = new mysqli("localhost", "root", "", "mca");
} else {
    $mysqli = new mysqli("195.35.59.14", "u121755072_adu", "fH:=aeo*l^D2", "u121755072_adudb");
}
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
    exit;
}

$uname = $_POST["username"];
$uscore = $_POST["score"];
$game = $_POST["game"];

$sql = "insert into scores (game, id, score, timestamp) 
values (
('{$game}', (select id from users where username ='{$uname}'), {$uscore}, now())
);";

if($uname != "")
{
    $result = $mysqli->query($sql);
}

?>

