const puppeteer = require('puppeteer');

let data = [
    "https://colehaan.eu/fr-fr/products/w31450", 
    "https://colehaan.eu/fr-fr/products/w30628", 
    "https://colehaan.eu/fr-fr/products/w30938"
];

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let products = []; // Stocker les données des produits

    // Utiliser for...of pour gérer correctement les appels asynchrones
    for (const link of data) {
        try {
            await page.goto(link, { waitUntil: 'domcontentloaded' });

            const product = await page.evaluate(() => {
                return {
                    name: document.querySelector('.product__title h1')?.textContent.trim() || 'Nom indisponible',
                    price_net: document.querySelector('[class*="regular"][class*="price"] [class*="item"]')?.textContent.trim() || 'Prix net indisponible',
                    price_brut: document.querySelector('[class*="price__sale"] [class*="item"][class*="regular"]')?.textContent.trim() || 'Prix brut indisponible',
                    picture: document.querySelector('img[class*="primaryimage"]')?.src || 'Image indisponible',
                };
            });

            products.push(product); // Ajouter le produit à la liste
        } catch (error) {
            console.error(`Erreur lors du traitement du lien ${link}:`, error.message);
        }
    }

    console.log(products);
    await browser.close();
})();
