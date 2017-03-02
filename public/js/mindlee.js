/**
 * Created by atomic on 2/9/17.
 */
'use strict';


$(document).ready(function(event) {
    initializePage();

    // With JQuery
    // for activity page
    $('.delete-btn').click(deleteActivity);

    // for destress page
    $(".btn-destress-delete").click(deleteDestressActivity);

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
        console.log('client clicked delete, act_id :' + activity_id);
        $activity.fadeOut();
    });
    console.log('User clicked delete activity');
}

function deleteDestressActivity(e) {
    e.preventDefault();

    let $de_activity = $(this).closest('.activity');
    let $destress_message = $de_activity.find('p.d-message');
    console.log($destress_message.text());
    let msg = $destress_message.text();


    console.log('message(client): ' + msg);
    $.post('/delete_destress_activity' , { message: msg}, function (req, res) {
        console.log('client clicked delete destress.');
        $de_activity.fadeOut();
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
        console.log(deleted);
        if(deleted) {
            // location.reload();
            window.location.replace("/schedule");
        }
    });
}

