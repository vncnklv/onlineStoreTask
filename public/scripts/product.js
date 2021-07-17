const e = document.getElementById('currency');
const priceSpan = document.getElementById('price');

e.addEventListener('change', () => {
    const currency = e.value;

    switch (currency) {
        case 'usd':
            priceSpan.innerHTML = prodPriceInUsd;
            break;
        case 'leu':
            let priceInLeu = prodPriceInUsd * priceUsdToLeu;
            priceInLeu = Math.round((priceInLeu + Number.EPSILON) * 100) / 100;
            priceSpan.innerHTML = priceInLeu;
            break;
    }
});
