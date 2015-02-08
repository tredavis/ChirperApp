"use strict";
// Store Url in a variable

var url = "https://rosterapp.firebaseio.com/";

var robotStation = [];
var nameArray = [];
var userArray = [];
// var time = new date();
var postAjax = function () {
    //Step 1. Create request opject
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open // Option GET, POST, PUT, DELETE
    // Calling this variable is called an instance! DONT FORGET Cookie Analagy
    request.open("POST", url + ".json", true) //the true or false parameter is also called blocking
    //Step 3. Define what happens when request comes back aka "request.onLoad. " Always if else station
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // This means good things are happening.
            alert(this.response);

        }
        else {
            // This means the data got to the server and failed.
            console.log(this.response);
        }
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        // This is a time request, which means the reponse was not recieved. 
        console.log("Com ERR");
    }
    //Step 4.1 Define info to send to firebase!
    var fullName = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    var name = {
        first: fullName,
        message: message,

    }
    name = JSON.stringify(name);
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    //var name = {
    //    firstName: "Tre",
    //    lastName: "Davis",
    //    birthDate: "April 26th, 1991"

    //};
    ////This step is a must! You must stringify the var
    //console.log("This is the unstring...:" + name);
    //name = JSON.stringify(name);
    //console.log("This is the string...:" + name);
    //Step 5. "Send" request.
    request.send(name);
    getAjax();

}

var getAjax = function () {

    //Step 1. Create request object
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open
    request.open("GET", url + ".json", true);
    //Step 3. Define what happens when request comes back aka "request.onload. "
    // This is an annonymus function 
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // This means good things are happening.

            //Step 4.1 Define how to recieve info from firebase!

            //alert("Your response is: " + this.response);
            // This converts it to a readable format.
            var data = JSON.parse(this.response);
            //alert("This is parsed data: " + data);
            // Add any actions to be done on successful loads.
            nameArray = [];
            for (var x in data) {
                //Adding a property of id to the data
                // data[x].id = x;
                data[x].editButton = "<button class='btn btn-warning' onclick='updateAjax(\"" + x + "\");'>UPDATE</button>";
                data[x].deleteButton = "<button class='btn btn-danger' onclick='deleteAjax(\"" + x + "\");'>DELETE</button>"
                nameArray.push(data[x]);
                // <a href='#' class='paulund_modal'>Click Here</a>
            }
            //Output Table function
            outputTable();

        } else {
            // This means the data got to the server and failed.
            console.log(this.response);
        }

        nameArray.push(data);
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        // This is a timeout request, which means the reponse was not recieved. 
        console.log("Com ERR");
    }

    //Step 5. "Send" request.

    request.send();


}

// READ - write/display/output table
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


//var table = document.createElement('table');
//for (var idKey in nameArray) {
//    var tr = document.createElement('tr')
//    for (var value in nameArray[idKey][value]) {
//        table.appendChild(td);
//        var td = document.createElement('td');
//    }
//table.appendChild(tr);
//}

//// PUT and Update can be used interchangable. 
var updateAjax = function (id) {
    //Step 1. Create request opject
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open // Option GET, POST, PUT, DELETE
    request.open("PUT", url + id + ".json", true)
    //Step 3. Define what happens when request comes back aka "request.onLoad. " Always if else station
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // This means good things are happening.
            alert(this.response);

        }
        else {
            // This means the data got to the server and failed.
            console.log(this.response);
        }
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        // This is a time request, which means the reponse was not recieved. 
        console.log("Com ERR");
    }
    //Step 4.1 Define info to send to firebase!
    var fullName = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    var name = {
        first: fullName,
        message: message,

    }
    name = JSON.stringify(name);
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";


    //var name = {
    //    firstName: "Tre",
    //    lastName: "Davis",
    //    birthDate: "April 26th, 1991"

    //};
    ////This step is a must! You must stringify the var
    //console.log("This is the unstring...:" + name);
    //name = JSON.stringify(name);
    //console.log("This is the string...:" + name);
    //Step 5. "Send" request.
    request.send(name);
    getAjax();
}


var deleteAjax = function (id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + id + ".json", true)
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {

            alert("You successfully deleted a name!")
        }
        else {
            console.log("Oops!");

        }
    }
    request.onerror = function () {
        alert("Com Err")

    }

    request.send();
    // Newly Added! This auto updates the page after you delete something from the database
    getAjax();

}

var refresh = setInterval(getAjax, 10000);
//My on screen clock

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

//Create User
//var postuser = function () {
//    var firstname = document.getelementbyid("firstname").value;
//    var lastname = document.getelementbyid("lastname").value;
//    var screenname = document.getelementbyid("screenname").value;

//    var user = {
//        firstname: firstname,
//        lastname: lastname,
//        screenname: screenname

//    }

//    var firebaselocation = urlconstructor(url, "users", "post", null)
//    postajax("post", firebaselocation, user, null, null);

//}

// URL CONSTRUCTOR 
//var urlConstructor = function (url, folder, verb, id) {

//    if (folder != null) {
//        //Don't need id for get or post
//        if (verb == "GET" || verb == "POST") {
//            //complete the URL. 
//            return url + folder + "/.json";
//        } else {
//            // need id Delete & Update
//            return url + folder + "/" + id + "/.json";
//        }
//    } else {
//        return url + "/.json";

//    }    //need id for Delete & Update
//}

