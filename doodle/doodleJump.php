<?php
session_start();

// Database connection
if($_SERVER['HTTP_HOST'] == "127.0.0.1") {
    $mysqli = new mysqli("localhost", "root", "", "mca");
} else {
    $mysqli = new mysqli("195.35.59.14", "u121755072_adu", "fH:=aeo*l^D2", "u121755072_adudb");
}
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
    exit;
}

// Get top scores
$sql = "SELECT s.score, s.timestamp, s.userid
        FROM scores s 
        JOIN users u ON s.userid = u.id 
        WHERE s.game = 'doodle' 
        ORDER BY s.score DESC 
        LIMIT 10";

$result = $mysqli->query($sql);

if (!$result) {
    die("Query failed: " . $mysqli->error);
}
$scoreRows = $result->fetch_all(MYSQLI_ASSOC);

// Debug information
if (count($scoreRows) == 0) {
    echo "<!-- No scores found in database -->";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doodle Jump Game</title>
</head>
<body>
    <canvas width="670px" height="670px" style="background-color: lightblue;"></canvas>

    <div style="float:right; margin-right: 40px; margin-top: 20px;">
        <h1>Top Scores</h1>
        
        <table style="border-collapse: collapse; border: 3px solid black; padding: 8px;">
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; border: 1px solid black;">Player</th>
                <th style="padding: 10px; border: 1px solid black;">Score</th>
                <th style="padding: 10px; border: 1px solid black;">Time</th>
            </tr>
            <?php
            if (empty($scoreRows)) {
                echo '<tr><td colspan="3" style="text-align: center; padding: 10px;">No scores yet!</td></tr>';
            } else {
                foreach ($scoreRows as $row) { ?>
                    <tr>
                        <td style="padding: 8px; border: 1px solid black;"><?php echo htmlspecialchars($row['userid']); ?></td>
                        <td style="padding: 8px; border: 1px solid black;"><?php echo htmlspecialchars($row['score']); ?></td>
                        <td style="padding: 8px; border: 1px solid black;"><?php echo htmlspecialchars($row['timestamp']); ?></td>
                    </tr>
            <?php }
            } ?>
        </table>

        <script src="doodleJump.js" defer></script>
    </div>
</body>
</html>