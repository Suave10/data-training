const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://colehaan.eu/fr-fr/collections/women_shoes_trainers');

    const products = await page.evaluate(() => {
        let products = [];
        let elements = document.querySelectorAll('[id="product-grid"] [class*="grid__item"]');
        for (elem of elements) {
            products.push({
                name : elem.querySelector('[class*="title"]').textContent.trim(),
                price_net : elem.querySelector('[class*="regular"][class*="price"] [class*="item"]').textContent.trim(),
                price_brut : elem.querySelector('[class*="price__sale"] [class*="item"][class*="regular"]').textContent.trim(),
                picture : elem.querySelector('img[class*="primaryimage"]').src
            })
        }
        return products;
    })
    console.log(products);
    await browser.close()
})().catch(err => console.log(err.message))
