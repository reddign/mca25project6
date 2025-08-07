<?PHP
session_start();
//Process the login for the website
$u = $_POST["user"];
$p = $_POST["password"];

$sql = "SELECT * FROM users WHERE username = '$u' AND password = SHA2(CONCAT('$p','salt'),224);";


if($_SERVER['HTTP_HOST'] == "127.0.0.1") {
    $mysqli = new mysqli("localhost", "root", "", "mca");
} else {
    $mysqli = new mysqli("195.35.59.14", "u121755072_adu", "fH:=aeo*l^D2", "u121755072_adudb");
}
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
    exit;
}

$result = $mysqli->query($sql);
$rows = $result-> fetch_all(MYSQLI_ASSOC);


if (is_array($rows) &&  array_key_exists(0,$rows)) {

        // User found, keep them logged in
        $_SESSION["LoggedIn"] = "YES";
        
        $_SESSION["UserID"] = $u;
    header("Location: ../../Homepage/homepage.htm");
}else{
    $_SESSION["LoggedIn"]="NO";
    $_SESSION["UserID"] = "";
    
    echo "Login failed. Please check your username and password.";
}


?>