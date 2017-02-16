/**
 * Created by atomic on 2/9/17.
 */
'use strict';


$(document).ready(function() {
    initializePage();

    // With JQuery
    $('.delete-btn').click(deleteActivity);

    // $("#date").valueAsDate = new Date();
});

function initializePage() {
    console.log("page connected!");
}






// schedule page
function deleteActivity(e) {
    e.preventDefault();

    var $activity = $(this).closest('.activity');
    var $schedule_body = $('#schedule_body');

    // AJAX
    $.get('/delete_activity', function (data, status) {
        $activity.fadeOut();
        $activity.remove();
    });
    console.log('User clicked delete activity');
}
