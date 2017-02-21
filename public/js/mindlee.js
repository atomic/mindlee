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
    var activity_id = $activity.data('id');

    // AJAX
    $.post('/delete_activity', { id: activity_id}, function (req, res) {
        console.log('client clicked delete, act_id :' + activity_id);
        $activity.fadeOut();
        $activity.remove();
        // res.send();
    });
    console.log('User clicked delete activity');
}
