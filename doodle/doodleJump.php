<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas  width="670px" height="670px" style="background-color: lightblue;"></canvas>
    

    <div style ="float:right; margin-right: 40px; margin-top: 20px;">
        <h1>Score</h1>
        <table style = "border-color: black; border-style: solid; border-width: 3px;">
            <tr><th>Player</th><th>Score</th><th>Time</th></tr>
            <tr><td>Player 1</td><td>0</td><td>0:00</td></tr>
            <tr><td>Player 2</td><td>0</td><td>0:00</td></tr>
            <?php
            echo "more data coming soon";
            ?>
        </table>


        <script src="doodleJump.js" defer></script>

         <?php
 if($_SERVER['HTTP_HOST'] == "127.0.0.1") {
    $mysqli = new mysqli("localhost", "root", "", "mca");
} else {
    $mysqli = new mysqli("195.35.59.14", "u121755072_adu", "fH:=aeo*l^D2", "u121755072_adudb");
}
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
    exit;
}

               //make a SQL message
$sql = "select * FROM scores
where game='pong';";


$result = $mysqli -> query($sql);
$rows = $result -> fetch_all(MYSQLI_ASSOC);

foreach($rows as $row){
    print("<tr><td>".$row["userid"]."</td><td>".$row["score"]."</td><td>".$row["timestamp"]."</td></tr>");
}
?>
    </div>
</body>
</html>