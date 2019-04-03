const puppeteer = require('puppeteer');
const fs = require("fs");

var html;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   // await page.goto('https://www.leboncoin.fr',{ waitUntil: "domcontentloaded", timeout:60000 });
   
    await page.goto('https://www.leboncoin.fr',{ 
      waitLoad: true, 
      waitNetworkIdle: true // defaults to false
    });

    try {
console.log("wait for slecto");
    await page.waitFor('.recaptcha-checkbox-checkmark');
    await page.screenshot({path: 'example.png'});
    html = await page.content();
    fs.writeFileSync("exemple.html",html);
    console.log("file written");
    console.log(html);

    await page.click('.recaptcha-checkbox-checkmark');

    await page.screenshot({path: 'example2.png'});
    html = await page.content();
    fs.writeFileSync("exemple2.html",html);
    }catch(err) {
      console.log('error catch');
      console.log(err);
      
    }

    await browser.close();
  })();


  //recaptcha-anchor
