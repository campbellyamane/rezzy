#!/usr/local/bin/php
<?php print('<?xml version = "1.0" encoding="utf-8"?> ');
	print "\n";
    print('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"');
    print "\n";
    print('"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">');
    print "\n";
?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <script type="text/javascript" src="js/index.js"></script>
        <link rel="stylesheet" type="text/css" href="css/index.css?v1.11"/>
            <title>Rezzy</title>  
    </head>

    <body onload="set_time(); check_res(); show_cookie();">
        <div id="header">
            <h1><img src="logo.png" alt="Rezzy"/></h1>
        </div>
        <div id="welcome"></div>
        <div id="back1">
            <h1 id="tools">Tools</h1><br/>
            <h1 id="search" onclick="pop(event)" class="leftlinks">Search Reservations</h1><br/>
            <h1 id="upcoming" onclick="pop(event)" class="leftlinks">Upcoming Reservations</h1><br/>
            <h1 id="tablecheck" onclick="pop(event)" class="leftlinks">Current Reservations</h1><br/>
        </div>
        <div id="container">
            <div id="back"></div>
            <div id="main">
                <h1 id="title">Make a Reservation</h1><br/>
                <form onclick="check_res()" action="php/reserve.php" method="post">
                    <p>
                        <input type="text" onkeyup="set_cookie()" autofocus name="first" id="first" required placeholder="First Name"/>
                        <input type="text" name="last" id="last" required placeholder="Last Name"/>
                    </p>
                    <br/>
                    <p>
                        <input type="email" name="email" id="email" required placeholder="Email"/>
                        <input type="text" name="phone" id="phone" required placeholder="Phone Number"/>
                    </p><br/>
                    <p>
                        <label>Party Size:                    
                            <select id="party" name="party">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </label>
                        <label>Reservation Date
                            <select id="date" size="1" name="date">
                                <?php
                                    date_default_timezone_set('America/Los_Angeles');
                                    $timestamp = time();
                                    for ($i=0; $i < 30; $i++){
                                        echo "<option id='". ($i+1) ."' value=";
                                        echo date('Y-m-d',$timestamp) . ">";
                                        echo date('D, M j',$timestamp);                                        
                                        echo "</option>";
                                        $timestamp += (3600*24);
                                    }  
                                ?>
                            </select>
                        </label>
                    </p><br/>
                    <p>
                        <label>Reservation Time:
                            <select id="hour" name="hour">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                :
                            <select id="minute" name="minute">
                                <option value="0">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                            <select id="meridian" name="meridian">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select>
                        </label>
                    </p><br/>
                    <input type="hidden" name="timestamp" id="timestamp" value="">
                    <input id="submit" disabled="disabled" type="submit"/>
                    <br/><br/><span id="message"></span>
                </form>
            </div>
        </div>    
    </body>
</html>