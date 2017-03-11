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



// schedule page
function deleteActivity(e) {
    e.preventDefault();

    var $activity = $(this).closest('.activity');
    var activity_id = $activity.data('id');

    // AJAX
    $.post('/delete_activity', { id: activity_id}, function (req, res) {
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
    $.post('/check_activity', function (deleted) {
        console.log('client checking activities');
        if(deleted) {
            console.log('some activities are deleted.');
            history.go(0);
            // window.location = window.location.pathname;
        }
    });
}

