$(document).ready(function () {
    $('#book').turn({
        width: 600,
        height: 400,

        display: 'single',
        autoCenter: true,
        gradients: true,
        duration: 1000
    });
       $book.turn('previous');


    $("#flipbook").bind("turned", function (event, page, view) {
        console.log("Current page: ", event);
        console.log('view', view);

    });
});