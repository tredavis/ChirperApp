"use strict";
// Store Url in a variable

var url = "https://rosterapp.firebaseio.com/";

var robotStation = [];
var nameArray = [];
var userArray = [];

var postAjax = function () {
    //Step 1. Create request opject
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open // Option GET, POST, PUT, DELETE

    request.open("POST", url + ".json", true) //the true or false parameter is also called blocking
    //Step 3. Define what happens when request comes back aka "request.onLoad. " Always if else station
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
           
            alert(this.response);

        }
        else {
            
            console.log(this.response);
        }
    };

    request.onerror = function () {
        console.log("Com ERR");
    }

    var fullName = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    var name = {
        first: fullName,
        message: message,
    }
    name = JSON.stringify(name);
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    request.send(name);
    getAjax();
}

var getAjax = function () {


    var request = new XMLHttpRequest();
    request.open("GET", url + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            nameArray = [];
            for (var x in data) {
                data[x].editButton = "<button class='btn btn-warning' onclick='updateAjax(\"" + x + "\");'>UPDATE</button>";
                data[x].deleteButton = "<button class='btn btn-danger' onclick='deleteAjax(\"" + x + "\");'>DELETE</button>"
                nameArray.push(data[x]);
            }
            outputTable();

        } else {
            console.log(this.response);
        }

        nameArray.push(data);
    };
    request.onerror = function () {
        console.log("Com ERR");}
    request.send();
}
var outputTable = function () {
    var holder = "<table>";
    for (var x = nameArray.length - 1; x > -1; x--) {
        holder += "<tr>";
        for (var y in nameArray[x]) {
            holder += "<td>"
            holder += nameArray[x][y];
            holder += "</td>"
        }
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("outputTable").innerHTML = holder;
}

var updateAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("PUT", url + id + ".json", true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            alert(this.response);
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERR");
    }
    var fullName = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var name = {
        first: fullName,
        message: message,
    }
    name = JSON.stringify(name);
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    request.send(name);
    getAjax();
}


var deleteAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + id + ".json", true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            alert("You successfully deleted a name!")
        } else {
            console.log("Oops!");

        }
    }
    request.onerror = function () {
        alert("Com Err")

    }

    request.send();
    getAjax();
}

var refresh = setInterval(getAjax, 10000);
function GetClock() {
    var d = new Date();
    var nhour = d.getHours(), nmin = d.getMinutes(), ap;

    if (nhour == 0) { ap = " AM"; nhour = 12; }
    else if (nhour < 12) { ap = " AM"; }
    else if (nhour == 12) { ap = " PM"; }
    else if (nhour > 12) { ap = " PM"; nhour -= 12; }

    if (nmin <= 9) nmin = "0" + nmin;

    document.getElementById('clockbox').innerHTML = "" + nhour + ":" + nmin + ap + "";
}
window.onload = function () {
    GetClock();
    setInterval(GetClock, 1000);
}

