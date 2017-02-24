/**
 * Created by atomic on 2/9/17.
 */
'use strict';


$(document).ready(function() {
    initializePage();

    // With JQuery
    $('.delete-btn').click(deleteActivity);

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
});

function initializePage() {
    console.log("page connected!");
}



// schedule page
function deleteActivity(e) {
    e.preventDefault();

    var $activity = $(this).closest('.activity');
    var $schedule_body = $('#schedule_body');
    var activity_id = $activity.data('id');

    // AJAX
    $.post('/delete_activity', { id: activity_id}, function (req, res) {
        console.log('client clicked delete, act_id :' + activity_id);
        $activity.fadeOut();
        // $activity.setTimeout($activity.remove,300);
        // window.location.reload();
        // $activity.remove();
        // res.send();
    });
    console.log('User clicked delete activity');
}

function showReminder() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 55000);
}

function nextStressLevel(n) {
    return n + (10 - n % 10);
}