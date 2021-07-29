$('.filter-options-text')
    .children()
    .on('click', (e) => {
        const $target = e.target;
        if ($($target).hasClass('filter-active'))
            $($target).removeClass('filter-active');
        else $($target).addClass('filter-active');
    });

// Price slider
const slider = document.getElementById('price-filter-body');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
    padding: 0,
});

// Color menu

$('.color-box').on('click', (e) => {
    const $target = e.target;
    $($target).toggleClass('color-menu-active');
});

// Filters

const $filterTogglerBtns = $('.filter-toggler');

$($filterTogglerBtns).on('click', (e) => {
    const $target = e.target;
    let targetId = $($target).attr('id');
    targetId = targetId.split('-');
    const filterName = targetId[0];

    const targetedFilterId = `${filterName}-filter-body`;

    $(`#${targetedFilterId}`).slideToggle();
});

// size menu
const $mainSizeMenuValues = $('.size-menu').children();

$mainSizeMenuValues.on('click', (e) => {
    $('.size-menu-active').removeClass('size-menu-active');

    const $target = e.target;
    $($target).addClass('size-menu-active');
});

// others
const $mainContainer = $('#main-container-plp');

$(document).ready(function () {
    if (window.innerWidth < 992) {
        $($mainContainer).removeClass('container');
        $($mainContainer).addClass('container-fluid');
    }
});

$(window).resize(function () {
    if (window.innerWidth < 992) {
        $($mainContainer).removeClass('container');
        $($mainContainer).addClass('container-fluid');
    } else {
        $($mainContainer).removeClass('container-fluid');
        $($mainContainer).addClass('container');
    }
});

const $filtersBtnMobile = $('#filters-btn-mobile');

$($filtersBtnMobile).on('click', () => {
    $('.categories-wrapper').removeClass('d-none col-3');

    $('.mobile-filter-menu-closer').removeClass('d-none');
    $('#navbar_wrapper').addClass('d-none');
    $('.mobile-filter-menu-opener').addClass('d-none');
    $('.products-wrapper').addClass('d-none');
    $('.footer-wrapper').addClass('d-none');
});
