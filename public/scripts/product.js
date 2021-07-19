const currencySelector = document.getElementById('currency');
const priceSpan = document.getElementById('price');

currencySelector.addEventListener('change', () => {
    const currency = currencySelector.value;

    switch (currency) {
        case 'usd':
            priceSpan.innerHTML = prodPriceInUsd;
            break;
        case 'leu':
            let priceInLeu = prodPriceInUsd * priceUsdToLeu;
            priceInLeu = Math.round((priceInLeu + Number.EPSILON) * 100) / 100;
            priceSpan.innerHTML = priceInLeu.toFixed(2);
            break;
    }
});
