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

// size menu

const $subSizeMenuValues = $('#sub-size-menu').children();
const $mainSizeMenuValues = $('#main-size-menu').children();

$subSizeMenuValues.on('click', (e) => {
    $('.size-menu-active').removeClass('size-menu-active');
    const $target = e.target;
    $($target).addClass('size-menu-active');
});

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
            $('.quantity').text(currentQuantity - 1);
        }
    } else {
        $('.quantity').text(currentQuantity + 1);
    }
});

// image picker

const $smallImages = $('#small-pictures').children();

$(document).ready(() => {
    const src = $($smallImages).first().attr('src');
    const alt = $($smallImages).first().attr('alt');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});

$($smallImages).on('click', (e) => {
    const $target = e.target;

    const src = $($target).attr('src');
    const alt = $($target).attr('alt');

    $('#big-image').attr('src', src);
    $('#big-image').attr('alt', alt);
});
