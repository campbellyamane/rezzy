<?php
    $type = $_POST['type'];
    $name = '';
    $email = '';
    $search = '';
    if ($type == 'name'){
        $name = $_POST['info'];
        $search = "SELECT party, time, email, phone, tableid, id, CONCAT(first, ' ', last) as name FROM Reservations WHERE CONCAT(first, ' ', last) = '$name' OR first like '$name%' OR last like '$name%'";
    }
    else{
        $email = $_POST['info'];
        $search = "SELECT party, time, email, phone, tableid, id, CONCAT(first, ' ', last) as name FROM Reservations WHERE email = '$email'";
    }
    
    $link = mysqli_connect("localhost", "root", "", "rezzy");
    
    $sql = $link->query($search);
    while($row = mysqli_fetch_assoc($sql)) {
        echo "</br><h3 onclick='delete_res(event)' id='" . $row['id'] ."'>";
        $time = date("g:ia", strtotime($row['time']));
        $date = date("l, F j", strtotime($row['time']));
        echo $time . " on " . $date . ": " . $row['name'] . ", Party of " . $row['party'] . " at Table " . $row['tableid'];
        echo "</h3>";
    }
?>