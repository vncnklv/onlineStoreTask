// const currencySelector = document.getElementById('currency');
// const priceSpan = document.getElementById('price');

// currencySelector.addEventListener('change', () => {
//     const currency = currencySelector.value;

//     switch (currency) {
//         case 'usd':
//             priceSpan.innerHTML = prodPriceInUsd;
//             break;
//         case 'leu':
//             let priceInLeu = prodPriceInUsd * priceUsdToLeu;
//             priceInLeu = Math.round((priceInLeu + Number.EPSILON) * 100) / 100;
//             priceSpan.innerHTML = priceInLeu.toFixed(2);
//             break;
//     }
// });

// color menu

$('.color-box').on('click', (e) => {
    const $target = e.target;
    $($target).toggleClass('color-menu-active');
});

// size menu
const $mainSizeMenuValues = $('#main-size-menu').children();

$mainSizeMenuValues.on('click', (e) => {
    $('.size-menu-active').removeClass('size-menu-active');

    const $target = e.target;
    $($target).addClass('size-menu-active');
});

// quantity selector

const $quantityMenuBtns = $('#minus, #plus');

$quantityMenuBtns.on('click', (e) => {
    const $target = e.target;

    const currentQuantity = Number($('#quantity').text());

    if ($($target).attr('id') == 'minus') {
        if (currentQuantity != 1) {
            $('#quantity').text(currentQuantity - 1);
        }
    } else {
        $('#quantity').text(currentQuantity + 1);
    }
});

// image picker

const $smallImages = $('#small-pictures img');

$(document).ready(() => {
    const src = $($smallImages).first().attr('src');
    const alt = $($smallImages).first().attr('alt');
    $($smallImages).first().addClass('active-picture');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});

$($smallImages).on('click', (e) => {
    const $target = e.target;

    $('.active-picture').removeClass('active-picture');
    $($target).addClass('active-picture');

    const src = $($target).attr('src');
    const alt = $($target).attr('alt');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});

$('#up-btn').on('click', () => {
    const $activePicture = $('#small-pictures img.active-picture');
    const index = $($activePicture).index();

    if (index == 1) return;

    $($activePicture).removeClass('active-picture');

    $($smallImages)
        .eq(index - 2)
        .addClass('active-picture');

    const $newActivePicture = $('#small-pictures img.active-picture');

    const src = $newActivePicture.attr('src');
    const alt = $newActivePicture.attr('alt');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});

$('#down-btn').on('click', () => {
    const $activePicture = $('#small-pictures img.active-picture');
    const index = $($activePicture).index();

    if (index == $smallImages.length) return;

    $($activePicture).removeClass('active-picture');

    $($smallImages).eq(index).addClass('active-picture');

    const $newActivePicture = $('#small-pictures img.active-picture');

    const src = $newActivePicture.attr('src');
    const alt = $newActivePicture.attr('alt');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});

// description toggler

const $togglerBtn = $('#toggle-description');

$($togglerBtn).on('click', () => {
    $('#description').slideToggle('slow');
});

// other

const $wishlistBtn = $('.wishlist-btn');
const $heartInWishlistBtn = $('.heart');

$wishlistBtn.on('mouseenter', () => {
    if (!$($wishlistBtn).hasClass('clicked')) {
        $heartInWishlistBtn.addClass('text-black');
    }
});

$wishlistBtn.on('mouseleave', () => {
    if (!$($wishlistBtn).hasClass('clicked')) {
        $heartInWishlistBtn.removeClass('text-black');
    }
});

// $wishlistBtn.on('', () => {
//     $heartInWishlistBtn.removeClass('text-black');
// });

$wishlistBtn.on('click', () => {
    if (!$($wishlistBtn).hasClass('clicked')) {
        $heartInWishlistBtn.addClass('text-black');
        $wishlistBtn.addClass('clicked');
    } else {
        $heartInWishlistBtn.removeClass('text-black');
        $wishlistBtn.removeClass('clicked');
    }
});

const $mainContainer = $('#main-container');
const $descriptionContainer = $('#description-container');

$(document).ready(function () {
    if (window.innerWidth < 992) {
        $($mainContainer).removeClass('container');
        $($mainContainer).addClass('container-fluid');
        $($descriptionContainer).removeClass('container');
        $($descriptionContainer).addClass('container-fluid');
    }
});

$(window).resize(function () {
    if (window.innerWidth < 992) {
        $($mainContainer).removeClass('container');
        $($mainContainer).addClass('container-fluid');
        $($descriptionContainer).removeClass('container');
        $($descriptionContainer).addClass('container-fluid');
    } else {
        $($mainContainer).removeClass('container-fluid');
        $($mainContainer).addClass('container');
        $($descriptionContainer).removeClass('container-fluid');
        $($descriptionContainer).addClass('container');
    }
});

// mobile carousel

const swiper = new Swiper('.mySwiper', {
    pagination: {
        el: '.swiper-pagination',
    },
});
