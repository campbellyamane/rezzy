var time = new Date();
var hours = time.getHours();
var minutes = time.getMinutes();
var meridian = 'am';    
var toolpop = false;
var is_delete_open = false;

function set_time(){
    if (hours < 13 && hours > 9){
        if (hours != 10){
            hours -= 12;
        }
        meridian = 'pm';
    }
    else if (hours > 12 && hours < 22){
        hours -= 12;
        meridian = 'pm';
    }
    else if (hours == 22){
        hours -= 12;
        document.getElementById("2").selected = true;
    }
    else if (hours <= 24 && hours > 22){
        hours -= 24;
        document.getElementById("2").selected = true;
    }
    document.getElementById("hour").value = hours+2;
    document.getElementById("meridian").value = meridian;
    document.getElementById("timestamp").value = time.getTime();
}

function check_res(){   
    var resdate = document.getElementById("date").value;
    var reshour = parseInt(document.getElementById("hour").value);
    var resminute = document.getElementById("minute").value;
    var meridian = document.getElementById("meridian").value;
    if (meridian == 'pm' && reshour != 12){
        reshour += 12;
    }
    resdate = resdate.split('-');
    resdate = new Date(resdate[0],(resdate[1]-1),resdate[2],reshour,resminute,0,0);    
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('nowtime',time.getTime());
    params.append('restime',resdate.getTime());
    params.append('first',document.getElementById("first").value);
    params.append('last',document.getElementById("last").value);
    params.append('date',document.getElementById("date").value);                           
    params.append('hour',document.getElementById("hour").value);
    params.append('minute',document.getElementById("minute").value); 
    params.append('meridian',document.getElementById("meridian").value);
    params.append('party',document.getElementById("party").value);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText.length != 0){
                document.getElementById("message").innerHTML = this.responseText;
                document.getElementById("submit").disabled = true;
            }
            else if (document.getElementById("first").value.length !=0){
                document.getElementById("message").innerHTML = '';
                document.getElementById("submit").disabled = false;                          
            }
        }
    };
    xhttp.open("POST", "php/check.php", true);
    xhttp.send(params);   
}

function pop(e){
    if(toolpop){
        document.getElementById("container").style.display = "block";
        document.getElementById("searchdiv").style.display = "none";
        document.getElementById("searchdiv").parentElement.removeChild(document.getElementById("searchdiv"));
        var h1 = document.getElementById("back1").getElementsByTagName("h1");
        for (var i = 0; i < h1.length; i++){
            h1[i].style.display = "block";
        }
        document.getElementById("back1").style.width = "20%";
        e.target.style.fontSize = "25";
        toolpop = false;
    }
    else{
        document.getElementById("container").style.display = "none";
        var h1 = document.getElementById("back1").getElementsByTagName("h1");
        for (var i = 0; i < h1.length; i++){
            h1[i].style.display = "none";
        }       
        e.target.style.display = "block";
        document.getElementById("back1").style.width = "96%";
        e.target.style.fontSize = "50";
        toolpop = true;
        if (e.target.id == 'search'){
            var div = document.createElement("div");
            div.setAttribute("id","searchdiv");
            document.getElementById("back1").appendChild(div);
            var label = document.createElement("label");
            var labelnode = document.createTextNode("Search By: ");
            label.appendChild(labelnode);
            div.appendChild(label);
            var select = document.createElement("select");
            select.setAttribute("name","type");
            select.setAttribute("id","searchy");
            div.appendChild(select);
            var name = document.createElement("option");
            var email = document.createElement("option");
            name.setAttribute("value","name");
            email.setAttribute("value","email");
            var namenode = document.createTextNode("Name");
            var emailnode = document.createTextNode("Email");
            name.appendChild(namenode);
            email.appendChild(emailnode);
            select.appendChild(name);
            select.appendChild(email);
            var input = document.createElement("input");
            input.setAttribute("id","searchbar");
            input.setAttribute("type","text");   
            input.style.width = "30%";
            input.onkeyup = return_res;
            input.style.marginLeft = "2%";
            div.appendChild(input);
            input.focus();
            var results = document.createElement("p");
            results.setAttribute("id","presults");
            div.appendChild(results);
        }        
        else if (e.target.id == 'upcoming'){ 
            var year = time.getFullYear();
            var month = time.getMonth();
            var day = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var index = true;
            var xhttp = new XMLHttpRequest();
            var params = new FormData();
            params.append('year',year);
            params.append('month',month);
            params.append('day',day);
            params.append('hours',hours);                    
            params.append('minutes',minutes);
            params.append('index',index);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var div = document.createElement("div");  
                    div.setAttribute("id","searchdiv");      
                    div.innerHTML = this.responseText;
                    document.getElementById("back1").appendChild(div);                 
                }
            };
            xhttp.open("POST", "php/showres.php", true);
            xhttp.send(params);  
        }
        else if (e.target.id == 'tablecheck'){ 
            var div = document.createElement("div");
            var num = 0;
            var div = document.createElement("div");  
            div.setAttribute("id","searchdiv"); 
            document.getElementById("back1").appendChild(div);
            for (var i = 0; i < 30; i++){
                var id  = 't' + (i+1);
                var divclass = '';
                var table = document.createElement("div");
                var left = 0;
                if (i < 10){
                    divclass = 'small';
                    table.style.top = "30%";
                    left = (i*7)+15;
                    left += "%";
                    table.style.left = left;
                }
                else if (i < 20){
                    divclass = 'medium';
                    table.style.top = "40%";
                    left = ((i-10)*7)+15;
                    left += "%";
                    table.style.left = left;
                }
                else{
                    divclass = 'large';
                    table.style.top = "55%";
                    left = ((i-20)*9)+5;
                    left += "%";
                    table.style.left = left;
                }
                num = i+1;
                table.setAttribute("id", id);
                table.style.position = "absolute";
                table.setAttribute("class", divclass);
                table.onclick = res_info;
                div.appendChild(table); 
                var tnumber = document.createElement("h1");
                var t = document.createTextNode(i+1);
                tnumber.appendChild(t);
                tnumber.style.textAlign = "center";
                table.appendChild(tnumber);
                var xhttp = new XMLHttpRequest();
                var params = new FormData();
                params.append('tableid',num);
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if (this.responseText.length != 0){
                            table.style.backgroundColor = "red";    
                        }
                    }
                };
                xhttp.open("POST", "php/tablepopup.php", false);
                xhttp.send(params);  
            }
        }        
    }
}     

function res_info(){
    var id = this.id.substring(1);
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('tableid',id);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText.length != 0){
                alert(this.responseText);  
            }
        }
    };
    xhttp.open("POST", "php/tablepopup.php", true);
    xhttp.send(params);                    
}   


function return_res(e){
    if (document.getElementById("searchbar").value != ''){
        var xhttp = new XMLHttpRequest();
        var params = new FormData();
        params.append('type',document.getElementById("searchy").value);
        params.append('info',document.getElementById("searchbar").value);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("presults").innerHTML = this.responseText;
            }
        };
        xhttp.open("POST", "php/search.php", true);
        xhttp.send(params);
    }  
    
    if (e.which == 8){
        document.getElementById("presults").innerHTML = '';                           
    }
}
    
function delete_from_database(id){
    var really = confirm("Are you sure you want to delete this record?");
    if (really){
        var xhttp = new XMLHttpRequest();
        var params = new FormData();
        params.append('id',id);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                document.getElementById(id).parentElement.removeChild(document.getElementById(id));
                document.getElementById("pdel").parentElement.removeChild(document.getElementById("pdel"));     
                is_delete_open = false;
            }
        };
        xhttp.open("POST", "php/delete.php", true);
        xhttp.send(params);                        
    }
}

function delete_res(e){
    var id = e.target.id;
    if (is_delete_open){
        document.getElementById("delete").parentElement.removeChild(document.getElementById("delete"));
        is_delete_open = false;
    }
    else{
        var p = document.createElement("p");
        p.setAttribute("id","pdel");
        var button = document.createElement("button");
        button.onclick = function() {delete_from_database(id)};;
        button.setAttribute("id","delete");
        var txt = document.createTextNode("Delete");
        button.appendChild(txt);
        p.appendChild(button);
        e.target.parentNode.insertBefore(p, e.target.nextSibling);
        is_delete_open = true;
    }
}

function set_cookie(){
    var name = document.getElementById("first").value;
    if (name.length != 0){
        var now = new Date();
        var t = now.getTime();
        var expireTime = time + 24*3600;
        now.setTime(expireTime);
        document.cookie = "name="+name+";expires="+now.toGMTString();
    }
}

function show_cookie(){
    if (document.cookie.length != 0){
        var name = document.cookie.split("=");
        name = name[1];                       
        document.getElementById("welcome").innerHTML = "<h1>Welcome back to Rezzy, "+name+"!</h1>";
    }
    else{
        document.getElementById("welcome").innerHTML = "<h1>Welcome to Rezzy!</h1>";    
    }
}