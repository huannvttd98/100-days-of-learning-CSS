$(document).ready(function () {
    $('#book').turn({
        width: 600,
        height: 400,
        display: 'single',
        autoCenter: true,
        gradients: true,
        duration: 1800,
        page: 2,

    });
    $("#book").on("click", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (x > rect.width / 2) {
            $(this).turn("next");
        } else {
            $(this).turn("previous");
        }
    });

    $("#book").bind("turned", function (event, page, view) {
        console.log("Current page: ", page);
        // console.log("Current view: " , view);
        // console.log("Event: " , event);

        // goToPage();
    });
});

const goToPage = () => {
    $("#book").turn("next");
}