const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware pour autoriser les requêtes depuis un frontend (CORS)
app.use(cors());

app.get('/products', async (req, res) => {
    try {
        // Lancer Puppeteer
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://colehaan.eu/fr-fr/collections/women_shoes_trainers');

        // Extraire les produits
        const products = await page.evaluate(() => {
            let products = [];
            let elements = document.querySelectorAll('[id="product-grid"] [class*="grid__item"]');
            for (let elem of elements) {
                products.push({
                    name: elem.querySelector('[class*="title"]')?.textContent.trim(),
                    price_net: elem.querySelector('[class*="regular"][class*="price"] [class*="item"]')?.textContent.trim(),
                    price_brut: elem.querySelector('[class*="price__sale"] [class*="item"][class*="regular"]')?.textContent.trim() || '',
                    picture: elem.querySelector('img[class*="primaryimage"]')?.src
                });
            }
            return products;
        });

        // Fermer le navigateur Puppeteer
        await browser.close();

        // Renvoyer les données au frontend
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur lors de la récupération des produits');
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
