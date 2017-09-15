<?php
    $id = $_POST['id'];
    
    $link = mysqli_connect("localhost", "root", "", "rezzy");
    $reservations = "DELETE FROM Reservations WHERE id = '$id'";
    $link->query($reservations);
    echo "Reservation has been deleted";

?>