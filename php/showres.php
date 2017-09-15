<?php
    $year = $_POST['year'];
    $month = $_POST['month']+1;
    $day = $_POST['day'];
    $hours = $_POST['hours'];
    $minutes = $_POST['minutes'];
    if (isset($_POST['index'])){
        $index = true;
    }
    else{
        $index = false;
    }
    
    $now = mktime($hours, $minutes, 0, $month, $day, $year);
    $date = date("Y-m-d H:i:s", $now);
    $date1 = date("Y-m-d H:i:s", ($now+(2*3600)));
    $link = mysqli_connect("localhost", "root", "", "rezzy");
    $reservations = "SELECT first, last, time, party, tableid FROM Reservations WHERE time between '$date' and '$date1'";
    $sql = $link->query($reservations);
    echo "<h1>Reservations from ";
    echo date("g:ia",$now) . " to " . date("g:ia",$now+(2*3600));
    echo "</h1></br>";
    echo "<table align='center' border='1'>
            <tr>
                <th>Name</th>
                <th>Reservation Time</th>
                <th>Party Size</th>
                <th>Table</th>
            </tr>";
    while($row = mysqli_fetch_assoc($sql)) {
        echo "<tr><td align='center'>";
        echo $row['first'];
        echo " ";
        echo $row['last'];
        echo "</td><td align='center'>";
        echo date('g:ia',strtotime($row['time']));
        echo "</td><td align='center'>";
        echo $row['party'];
        echo "</td><td align='center'>";
        echo $row['tableid'];
        echo "</td></tr>";
    }
    echo "</table>";
    if ($index == false){
        echo "</br><p id='goback' onclick='future_res()'>Go Back</p>";
    }
?>