var open = false;
var big = false;

function future_res(){                
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    if (open){
        document.getElementById("upcomingres").innerHTML = '';
        document.getElementById("upcomingres").style.display = "none";
        document.getElementById("content").style.display = "block";
        open = false;
    }
    else{
        var xhttp = new XMLHttpRequest();
        var params = new FormData();
        params.append('year',year);
        params.append('month',month);
        params.append('day',day);
        params.append('hours',hours);                    
        params.append('minutes',minutes);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("content").style.display = "none";
                document.getElementById("upcomingres").innerHTML = this.responseText;
                document.getElementById("upcomingres").style.display = "block";                          
            }
        };
        xhttp.open("POST", "showres.php", true);
        xhttp.send(params);  
        open = true;
    }                    
}

function show_layout(){
    if (big){
        document.getElementById("back").style.width = "50%";
        document.getElementById("back").style.height = "60%";
        document.getElementById("back").style.left = "25%";                    
        document.getElementById("content").style.display = "block";            
        var small = document.getElementsByClassName("small");          
        var medium = document.getElementsByClassName("medium");          
        var large = document.getElementsByClassName("large"); 
        for (var i = 0; i < small.length; i++){
            small[i].style.display = "none";
            medium[i].style.display = "none";
            large[i].style.display = "none";
        }
        document.getElementById("hidetables").style.display = "none";
        document.getElementById("temp").parentElement.removeChild(document.getElementById("temp"));
      
        big = false;
    }
    else{
        document.getElementById("back").style.width = "80%";
        document.getElementById("back").style.height = "80%";
        document.getElementById("back").style.left = "10%";                    
        document.getElementById("content").style.display = "none"; 
        var temp = document.createElement("div");
        var num = 0;
        temp.setAttribute("id", "temp");
        temp.style.display = "none";
        document.getElementById("back").appendChild(temp);
        for (var i = 0; i < 30; i++){
            var id  = 't' + (i+1);
            var divclass = '';
            var table = document.createElement("div");
            var left = 0;
            if (i < 10){
                divclass = 'small';
                table.style.top = "5%";
                left = (i*7)+15;
                left += "%";
                table.style.left = left;
            }
            else if (i < 20){
                divclass = 'medium';
                table.style.top = "15%";
                left = ((i-10)*7)+15;
                left += "%";
                table.style.left = left;
            }
            else{
                divclass = 'large';
                table.style.top = "30%";
                left = ((i-20)*9)+5;
                left += "%";
                table.style.left = left;
            }
            num = i+1;
            table.setAttribute("id", id);
            table.style.position = "absolute";
            table.setAttribute("class", divclass);
            table.onclick = res_info;
            temp.appendChild(table); 
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
            xhttp.open("POST", "tablepopup.php", false);
            xhttp.send(params);  
        }
        var back = document.createElement("p");
        back.setAttribute("id", "hidetables");
        back.style.top = "50%";
        back.style.position = "absolute";
        back.style.width = "100%";
        back.style.textAlign = "center";
        back.style.textDecoration = "underline";
        back.style.cursor = "pointer";
        back.onclick = show_layout;
        var txt = document.createTextNode("Go Back");
        back.appendChild(txt);                    
        document.getElementById("temp").appendChild(back);  
        
        document.getElementById("temp").style.display = "block";
        
        big = true;
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
    xhttp.open("POST", "tablepopup.php", true);
    xhttp.send(params);                    
}