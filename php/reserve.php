#!/usr/local/bin/php
<?php print('<?xml version = "1.0" encoding="utf-8"?> ');
	print "\n";
    print('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"');
    print "\n";
    print('"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">');
    print "\n";
?>
    <head>
        <script src="../js/reserve.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/index.css"/>    
        <title>Reserved</title>
    </head>
    
    <body>
        <div id="header">
            <h1><img src="../logo.png"/></h1>
        </div>
        <div id="back"></br>
            <div id='upcomingres'></div>
            <div id="content">
                <h1>    
                    <?php
                        $first = $_POST['first'];
                        $last = $_POST['last'];
                        $email = $_POST['email'];
                        $id = $_POST['timestamp'];
                        $phone = $_POST['phone'];                    
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
                        $name = $first . " " . $last;
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
                        $date1 = date("Y-m-d H:i:s", ($desired-(1.5*3600)));
                        $date2 = date("Y-m-d H:i:s", ($desired+(3600*1.5)));
                        $link = mysqli_connect('localhost', 'root', '', 'rezzy');
                        $checktable = "SELECT MAX(tableID) as max FROM Reservations WHERE tablesize = '$tablesize' AND time between'$date1' and '$date2'";
                        
                        $sql = $link->query($checktable);
                        $results = mysqli_fetch_assoc($sql);
                        $max = $results['max'];
                        if ($max == 0){
                            if ($tablesize == 'Small'){
                                $max = 1;
                            }
                            else if ($tablesize == 'Medium'){
                                $max = 11;                        
                            }
                            else{
                                $max = 21;
                            }
                        }
                        else{
                            $max += 1;
                            
                        } 
                        
                        $dupesql = "SELECT * FROM reservations where (first = '$first' AND last = '$last' AND time = '$date')";

                        $sql = $link->query($dupesql);
                        $results = mysqli_fetch_assoc($sql);
            
                        if (count($results) > 0) {
                            echo "It looks like you have already made this reservation. ";
                        }
                        else{                        
                            $newres = "INSERT INTO reservations (first,last,email,phone,time,party,tablesize,tableid,id) VALUES ('$first','$last','$email','$phone','$date','$party','$tablesize','$max','$id')";
                            $link->query($newres);
                            echo "Thanks " . $first . " for making your reservation! </br>";
                        }
                        echo "We look forward to seeing you at " . date('g:ia',$desired) . " on " . date('l, F j',$desired) . ".";
                        echo "</h1><p id='links'>";
                        echo "</br><a href='../index.php'>Make a New Reservation</a>";
                        echo "</br><span id='list' onclick='future_res()'>Upcoming Reservations</span></br>
                            <span id='current' onclick='show_layout()'>Show Current Tables</span>
                        </br>";
                        echo "</p>";                  
                    ?>
            </div>                    
        </div>
    </body>
</html>