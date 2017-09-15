<?php
    $nowtime = $_POST['nowtime'];
    $restime = $_POST['restime'];
    $first = $_POST['first'];
    $last = $_POST['last'];
    $date = $_POST['date'];
    $date = explode('-',$date);
    $year = $date[0];
    $month = $date[1];
    $day = $date[2];
    $hour = $_POST['hour'];
    $minute = $_POST['minute'];
    $meridian = $_POST['meridian'];
    $party = $_POST['party'];
    $tablesize = '';
        
    if ($meridian == 'pm'){
        $hour += 12;
    }
    if ($party > 4){
        $tablesize = 'Large';
    }
    else if ($party > 2){
        $tablesize = 'Medium';
    }
    else{
        $tablesize = 'Small';
    }
    $desired = mktime($hour, $minute, 0, $month, $day, $year);
    $date = date("Y-m-d H:i:s", $desired);
    $date1 = date("Y-m-d H:i:s", ($desired-(3600*1.5)));
    $date2 = date("Y-m-d H:i:s", ($desired+(3600*1.5)));
    $link = mysqli_connect("localhost", "root", "", "rezzy");
    $reservations = "SELECT Count(*) as count FROM Reservations WHERE TableSize = '$tablesize' AND (time between '$date1' and '$date' OR time between '$date' and '$date2')";
    $sql = $link->query($reservations);
    
    $results = mysqli_fetch_assoc($sql);
    
    $dupesql = "SELECT * FROM reservations where (first = '$first' AND last = '$last' AND time = '$date')";

    $sql = $link->query($dupesql);
    $results1 = mysqli_fetch_assoc($sql);   


    if (count($results1) > 0) {
        echo "It looks like you have already made this reservation.";
    }        
    else if ($results['count'] > 9){
        echo "I'm sorry, that reservation slot is not available. Please try a different time or date.";
    }
    else if ($restime < $nowtime){
        echo "The selected reservation is in the past. Please select a valid time.";
    }
?>