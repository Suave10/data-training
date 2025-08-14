const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log('bws ok');

    const page = await browser.newPage();
    console.log('page ok');
    
    await page.goto('https://colehaan.eu/fr-fr/collections/women_shoes_trainers')
    console.log('site web ok')

    // await page.setViewport({
    //     width: 500,
    //     height: 500
    // })

    await page.pdf({
        path: 'page.pdf',
        format: 'A4'
    })
    console.log('pdf ok')

    await page.screenshot({
        path: 'image.png'
    })
    console.log('image ok')
})().catch(err => console.log(err.message))
