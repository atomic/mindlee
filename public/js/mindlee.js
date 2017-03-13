/**
 * Created by atomic on 2/9/17.
 */
'use strict';


$(document).ready(function(event) {
    initializePage();

    // With JQuery
    // for activity page
    $('.btn-delete-act').click(deleteActivity);
    $(".btn-edit-act").click(editActivity);


    // $("#date").valueAsDate = new Date();
    $('div.activity').hover(function () {
        // $(this).toggleClass('hvr-grow');
    });

    $(function(){
        $('a').each(function(){
            if ($(this).prop('href') == window.location.href) {
                $(this).addClass('active');
                $(this).parents('li').addClass('active');
            }
        });
    });

    setTimeout(showReminder, 4000);
    setTimeout(checkDeletion, 2000);
});

function initializePage() {
    console.log("page connected!");
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

function format_time(date_obj) {
    // formats a javascript Date object into a 12h AM/PM time string
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    var amPM = (hour > 11) ? "pm" : "am";
    if(hour > 12) {
        hour -= 12;
    } else if(hour == 0) {
        hour = "12";
    }
    if(minute < 10) {
        minute = "0" + minute;
    }
    return hour + ":" + minute + " " + amPM;
}

// schedule page
function deleteActivity(e) {
    e.preventDefault();

    var $activity = $(this).closest('.activity');
    var activity_id = $activity.data('id');

    // AJAX
    $.post('/delete_activity', { id: activity_id, safe: true}, function (req, res) {
        $activity.fadeOut();
    });
}

function editActivity(e) {
    e.preventDefault();
    var $activity = $(this).closest('.activity');
    var activity_id = $activity.data('id');

    $.post('/edit_activity', { id: activity_id}, function (req, res) {
        // $activity.fadeOut();
    });
}


function showReminder(e) {
    // Get the snackbar DIV
    // var x = document.getElementById("snackbar");
    var x = $('#snackbar');


    // Add the "show" class to DIV
    x.addClass('show');
    // x.className = "show";

    // After 3 seconds, remove the show class from DIV
    // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 55000);
    setTimeout(function(){ x.toggleClass('show'); }, 6000);
}

// Function to ask server to check if there are activities to delete
function checkDeletion(request, response) {
    // e.preventDefault();
    console.log('check deletion fired');

    $.get('/activities_json', function (activities) {
        console.log('checking at : ' + window.location.pathname);
        let deleted = checkActivity(activities);
        if (deleted && (window.location.pathname != '/schedule')) {
            history.go(0);
        }
    });

    // $.post('/check_activity', function (deleted) {
    //     console.log('client checking activities');
    //     if(deleted) {
    //         console.log('some activities are deleted.');
    //         history.go(0);
    //         // window.location = window.location.pathname;
    //     }
    // });
}

var toLocalTime = function(time) {
    var d = new Date(time);
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
};

function checkActivity(activities) {
    let now = new Date();
    let deleted = false;

    for (let act_id in activities) {
        let x = new Date(activities[act_id].date.replace(/-/g, "/") + ' ' + activities[act_id].time);
        // let x = new Date(activities[act_id].date_object);
        // x = toLocalTime(x);
        let diff = new Date(now - x);

        console.log('now: ' + now + ', x: ' + x);
        console.log('diff: ' + diff.getTime());
        console.log('minutes difference : ' + diff.getMinutes());

        if(diff.getTime() >= 0) {
            $.post('/delete_activity', { id: act_id, safe: false}, function (req, res) {
                console.log('an activity is deleted in the server');
                console.log(req);
                $('#' + act_id).fadeOut();
            });
            deleted = true;
        }
    }
    return deleted;
}
