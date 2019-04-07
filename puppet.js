//Attemps to use puppeteer to crawl leboncoin but the website use a JS blocker. Can't pass throught the captcha.
//Someone on github use directly the leboncoin API
//I gave up the crawling.
const puppeteer = require('puppeteer');
const fs = require("fs");

var html;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   // await page.goto('https://www.leboncoin.fr',{ waitUntil: "domcontentloaded", timeout:60000 });
   
    await page.goto('https://www.leboncoin.fr',{ 
      waitLoad: true, 
      waitNetworkIdle: true, // defaults to false,
      waitUntil : "domcontentloaded"
    });

    try {
console.log("wait for slecto");
   // await page.waitFor('.recaptcha-checkbox-checkmark');
    await page.screenshot({path: 'example.png'});
    html = await page.content();
    fs.writeFile("exemple.html",html,function(err) {console.log(err)});
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
