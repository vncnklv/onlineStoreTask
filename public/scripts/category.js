$('.filter-option-li').on('click', (e) => {
    const $target = e.target;
    if ($($target).hasClass('filter-active'))
        $($target).removeClass('filter-active');
    else $($target).addClass('filter-active');
});

// Price slider
if (minPrice < maxPrice) {
    const slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [minPrice, maxPrice],
        connect: true,
        range: {
            min: minPrice,
            max: maxPrice,
        },

        tooltips: true,
        format: {
            from: Number,
            to: function (value) {
                return parseInt(value) + ' USD';
            },
        },
    });
}
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
    const $targetedFilterArrowId = $(`#${filterName}-arrow`);

    $(`#${targetedFilterId}`).slideToggle();

    if ($($targetedFilterArrowId).hasClass('up')) {
        $($targetedFilterArrowId).removeClass('up').addClass('down');
    } else {
        $($targetedFilterArrowId).removeClass('down').addClass('up');
    }
});

// reset filters

$('.filter-reset').on('click', () => {
    if (typeof slider != 'undefined') {
        slider.noUiSlider.reset();
    }
    $('.color-menu-active').removeClass('color-menu-active');
    $('.size-menu-active').removeClass('size-menu-active');
    $('.filter-active').removeClass('filter-active');
});

// size menu
const $mainSizeMenuValues = $('.size-menu').children();

$mainSizeMenuValues.on('click', (e) => {
    const $target = e.target;
    if ($($target).hasClass('size-menu-active')) {
        $($target).removeClass('size-menu-active');
    } else {
        $($target).addClass('size-menu-active');
    }
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

$('#filters-back-btn').on('click', () => {
    $('.categories-wrapper').addClass('d-none col-3');
    $('.mobile-filter-menu-closer').addClass('d-none');
    $('#navbar_wrapper').removeClass('d-none');
    $('.mobile-filter-menu-opener').removeClass('d-none');
    $('.products-wrapper').removeClass('d-none');
    $('.footer-wrapper').removeClass('d-none');
});

// Filtering

let filtered = [];

slider.noUiSlider.on('change', (values) => {
    let [minSelectedPrice, maxSelectedPrice] = values;
    minSelectedPrice = Number(minSelectedPrice.split(' ').shift());
    maxSelectedPrice = Number(maxSelectedPrice.split(' ').shift());

    filtered = items.filter((item) => {
        if (item.price > minSelectedPrice && item.price < maxSelectedPrice)
            return item;
    });
});
