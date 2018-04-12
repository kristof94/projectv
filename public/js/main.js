$(document).ready(function () {
    manageHourButton();
    manageClickButton();
    
});

function manageModal(){
     $('#exampleModal').appendTo("body").modal('show');
}

function manageLoginModal(){
    //$('#exampleLoginModal').appendTo("body").modal('show');
}

function manageHourButton() {
    var buttons = document.getElementsByName("buttonClock");
    var d = new Date(0, 0, 0, 8, 0, 0, 0);
    for (var i = 0, l = buttons.length; i < l; i++) {
        var minutes = d.getMinutes();
        var hours = d.getHours();
        var hoursStr = hours;
        if (hours < 10) {
            hoursStr = "0" + hours;
        }
        var time = hoursStr + ":" + minutes;
        if (d.getMinutes() == 0) {
            time = hoursStr + ":00";
        }
        buttons[i].innerHTML = time;
        if (minutes == 0) {
            d.setMinutes(30);
        } else {
            d.setMinutes(0);
            hours = hours + 1;
        }
        d.setHours(hours);
    }        
}


function manageClickButton() {
    
    var buttons = document.getElementsByName("buttonClock");
    for (var i = 0, l = buttons.length; i < l; i++) {        
        buttons[i].onclick = function(e) {
            document.getElementById("hour").innerHTML = this.innerHTML;
        };
    }
}