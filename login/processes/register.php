<?PHP

//Process the registration for the website, user, password, age, first login and last login are needed, also approval
$u = $_POST["user"];
$p = $_POST["password"];
$a = $_POST["age"];
$first_login = date("Y-m-d H:i:s");
$last_login = date("Y-m-d H:i:s");



//check if the user already exists
$check_sql = "SELECT * FROM users WHERE username = '$u'";

// check if check sql is null


//stop code if user already exists



$sql = "INSERT INTO users (username, bestpassword, age, firstLogin, lastLogin, approved) VALUES ('$u',SHA2(CONCAT('$p','salt'),224), $a, '$first_login', '$last_login')";

if($_SERVER['HTTP_HOST'] == "127.0.0.1") {
    $mysqli = new mysqli("localhost", "root", "", "mca");
} else {
    $mysqli = new mysqli("195.35.59.14", "u121755072_adu", "fH:=aeo*l^D2", "u121755072_adudb");
}

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
    exit;
}

if ($mysqli->query($sql) === TRUE) {
    echo "New record created successfully";
    $_SESSION["user"] = $u;
    $_SESSION["age"] = (int)$a; 
    $_SESSION["password"] = $p;
    $_SESSION["first_login"] = $first_login;
    $_SESSION["last_login"] = $last_login;
    $_SESSION["approved"] = $approved;

    header("Location: ../../index.htm");
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
    exit;
}


?>