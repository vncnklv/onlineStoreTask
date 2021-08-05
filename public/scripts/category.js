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
const selectedColors = [];

$('.color-box').on('click', (e) => {
    const $target = e.target;
    const colorName = $($target).attr('data-color-name');

    if ($($target).hasClass('color-menu-active')) {
        $($target).removeClass('color-menu-active');
        const index = selectedSizes.indexOf(colorName);
        selectedColors.splice(index, 1);
    } else {
        $($target).addClass('color-menu-active');
        selectedColors.push(colorName);
    }

    $.each($('.product-wrapper'), function (index, value) {
        selectedColors.forEach((color) => {
            if (!$(value).attr('data-colors').includes(color))
                $(value).addClass('color-hidden');
        });
    });

    $.each($('.color-hidden'), function (index, value) {
        if (selectedColors.length < 1) {
            $('.color-hidden').removeClass('color-hidden');
        }

        selectedColors.forEach((color) => {
            if ($(value).attr('data-colors').includes(color))
                $(value).removeClass('color-hidden');
        });
    });

    updateItemsCount();
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
        $('.price-hidden').removeClass('price-hidden');
    }
    $('.color-menu-active').removeClass('color-menu-active');
    $('.color-hidden').removeClass('color-hidden');
    selectedColors.splice(0, selectedColors.length);
    $('.size-menu-active').removeClass('size-menu-active');
    $('.size-hidden').removeClass('size-hidden');
    selectedSizes.splice(0, selectedSizes.length);
    $('.filter-active').removeClass('filter-active');

    updateItemsCount();
});

// size menu
const $mainSizeMenuValues = $('.size-menu').children();
const selectedSizes = [];

$mainSizeMenuValues.on('click', (e) => {
    const $target = e.target;
    const sizeName = $($target).attr('data-size-name');

    if ($($target).hasClass('size-menu-active')) {
        $($target).removeClass('size-menu-active');
        const index = selectedSizes.indexOf(sizeName);
        selectedSizes.splice(index, 1);
    } else {
        $($target).addClass('size-menu-active');
        selectedSizes.push(sizeName);
    }

    $.each($('.product-wrapper'), function (index, value) {
        selectedSizes.forEach((size) => {
            if (!$(value).attr('data-sizes').includes(size))
                $(value).addClass('size-hidden');
        });
    });

    $.each($('.size-hidden'), function (index, value) {
        if (selectedSizes.length < 1) {
            $('.size-hidden').removeClass('size-hidden');
        }

        selectedSizes.forEach((size) => {
            if ($(value).attr('data-sizes').includes(size))
                $(value).removeClass('size-hidden');
        });
    });

    updateItemsCount();
});

// Price filter
if (typeof slider != 'undefined') {
    slider.noUiSlider.on('change', (values) => {
        let [min, max] = values;
        min = Number(min.split(' ').shift());
        max = Number(max.split(' ').shift());
        $.each($('.product-wrapper'), function (index, value) {
            let price = $(value).attr('data-price');
            price = Number(price);
            if (price < min || price > max) $(value).addClass('price-hidden');
            else $(value).removeClass('price-hidden');
        });
        updateItemsCount();
    });
}
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

$('.filters-back-btn').on('click', () => {
    $('.categories-wrapper').addClass('d-none col-3');
    $('.mobile-filter-menu-closer').addClass('d-none');
    $('#navbar_wrapper').removeClass('d-none');
    $('.mobile-filter-menu-opener').removeClass('d-none');
    $('.products-wrapper').removeClass('d-none');
    $('.footer-wrapper').removeClass('d-none');
});

function updateItemsCount() {
    const itemsCount = $(
        '.product-wrapper:not(.color-hidden, .price-hidden, .size-hidden)'
    ).length;

    let itemsCountText = '';
    if (itemsCount === 1) {
        itemsCountText = '1 ITEM';
    } else {
        itemsCountText = `${itemsCount} ITEMS`;
    }

    $('.category-items-count').text(itemsCountText);
}
