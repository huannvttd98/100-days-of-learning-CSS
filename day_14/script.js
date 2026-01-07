$(document).ready(function () {
    $('#book').turn({
        width: 600,
        height: 400,
        display: 'single',
        autoCenter: true,
        gradients: true,
        duration: 800,
        page: 2,
        corners: "bl, br"

    });

    $("#book").bind("turned", function (event, page, view) {
        // hide book
        $(".page").addClass("hidden-page");

    });
});