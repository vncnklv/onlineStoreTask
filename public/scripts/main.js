$(document).ready(function () {
    if (window.innerWidth < 992) {
        $('.navbar').addClass('bg-dark navbar-dark');
        $('#navbar_wrapper')
            .addClass('container-fluid bg-dark')
            .removeClass('container');
    }
});

$(window).resize(function () {
    if (window.innerWidth < 992) {
        $('.navbar').addClass('bg-dark navbar-dark');
        $('#navbar_wrapper')
            .addClass('container-fluid bg-dark')
            .removeClass('container');
    } else {
        $('.navbar').removeClass('bg-dark navbar-dark');
        $('#navbar_wrapper')
            .removeClass('container-fluid bg-dark')
            .addClass('container');
    }
});
