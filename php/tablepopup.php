<?php
    $tableid = $_POST['tableid'];
    date_default_timezone_set('America/Los_Angeles');
    $now = time();
    $date = date("Y-m-d H:i:s", $now);
    $date1 = date("Y-m-d H:i:s", ($now-(1.5*3600)));
    $link = mysqli_connect("localhost", "root", "", "rezzy");
    $reservations = "SELECT first, last, party FROM Reservations WHERE (time between '$date1' and '$date') and tableid = '$tableid'";
    $sql = $link->query($reservations);
    while($row = mysqli_fetch_assoc($sql)) {
        echo $row['first'] . " " . $row['last'] . ", Party of " . $row['party'];
    }
?>