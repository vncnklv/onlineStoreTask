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

    visualizeItems(items);
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

    filterBySize(items);
});

// Filtering

function filterByPrice(products) {
    const values = slider.noUiSlider.get();
    let [minSelectedPrice, maxSelectedPrice] = values;
    minSelectedPrice = Number(minSelectedPrice.split(' ').shift());
    maxSelectedPrice = Number(maxSelectedPrice.split(' ').shift());

    const filtered = products.filter((product) => {
        if (
            product.price >= minSelectedPrice &&
            product.price <= maxSelectedPrice
        )
            return product;
    });

    return filtered;
}

function filterByColor(products) {
    const selectedColors = [];
    $.each($('.color-menu-active'), function (index, value) {
        selectedColors.push($(value).attr('data-color-name'));
    });

    if (selectedColors.length === 0) return products;

    const filtered = products.filter((product) => {
        for (const variation of product.variation_attributes) {
            if (variation.id == 'color') {
                for (const value of variation.values) {
                    if (selectedColors.includes(value.name)) return product;
                }
            }
        }
    });

    return filtered;
}

function filterBySize(products) {
    const selectedSizes = [];
    $.each($('.size-menu-active'), function (index, value) {
        selectedSizes.push($(value).attr('data-size-name'));
    });

    if (selectedSizes.length === 0) return products;

    const filtered = products.filter((product) => {
        for (const variation of product.variation_attributes) {
            if (variation.id == 'size') {
                for (const value of variation.values) {
                    if (selectedSizes.includes(value.name)) return product;
                }
            }
        }
    });

    return filtered;
}

$('.color-box, .size-menu').on('click', () => {
    let filtered = filterByColor(items);
    filtered = filterBySize(filtered);
    filtered = filterByPrice(filtered);
    visualizeItems(filtered);
});

slider.noUiSlider.on('change', () => {
    let filtered = filterByPrice(items);
    filtered = filterBySize(filtered);
    filtered = filterByColor(filtered);
    visualizeItems(filtered);
});

// remove old items and append filtered

function visualizeItems(items) {
    $('.product-wrapper').remove();

    items.forEach((item) => {
        const $productWrapper = $('<div></div>').addClass(
            'product-wrapper col-lg-4 col-sm-6'
        );
        const $productBody = $('<div></div>').addClass('product-body');
        $($productWrapper).append($productBody);

        const $productImg = $('<img />')
            .addClass('product-image')
            .attr({
                src: `/images/${item.image_groups[0].images[0].link}`,
                alt: item.image_groups[0].images[0].src,
                onclick: `window.location = '${subcategory + '/' + item.id}'`,
            });
        $($productBody).append($productImg);

        const $productColorMenu =
            $('<div></div>').addClass('product-color-menu');
        const $colorMenuUl = $('<ul></ul>').addClass(
            'list-inline list-unstyled color-menu catalog-color-menu'
        );
        item.variation_attributes.forEach((variation) => {
            if (variation.id === 'color') {
                variation.values.forEach((color) => {
                    const $colorMenuLi = $('<li></li>')
                        .addClass('list-inline-item color-box')
                        .attr('style', `background-color: ${color.name}`);

                    $($colorMenuUl).append($colorMenuLi);
                });
            }
        });
        $($productColorMenu).append($colorMenuUl);
        $($productBody).append($productColorMenu);

        const $prodNameWrapper = $('<div></div>').addClass(
            'category-product-name-wrapper'
        );
        const $prodName = $('<span></span>')
            .addClass('category-product-name')
            .text(item.name);
        $($prodNameWrapper).append($prodName);
        $($productBody).append($prodNameWrapper);

        const $prodHr = $('<hr />').addClass('product-hr');
        $($productBody).append($prodHr);

        const $prodPrice = $('<span></span>')
            .addClass('category-product-price')
            .text(`${item.price.toFixed(2)} USD`);
        $($productBody).append($prodPrice);

        $('.products-body').append($productWrapper);
    });

    let itemsCountText = '';
    if (items.length == 1) {
        itemsCountText = `1 ITEM`;
    } else {
        itemsCountText = `${items.length} ITEMS`;
    }
    $('.category-items-count').text(itemsCountText);
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
