//Sample to crawl a webpage with request-promise and cheerio (for jQuery synthax)
//However, leboncoin is blocking JS crawling. Puppeter seems a way out, I'll try this letter

const rpn = require("request-promise-native");
const cheerio = require("cheerio");
//const urlToCrawl = "https://www.leboncoin.fr/recherche/?category=9&text=terrain%20OR%20JArdin&locations=Cublize_69550,69210&sort=price&order=asc&real_estate_type=1&price=50000-225000&square=130-max&rooms=6-max";
const urlToCrawl = "https://fr.wikipedia.org/wiki/Linux_From_Scratch"
const request = require("request");


//Use of request in sync mod
request(urlToCrawl, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

//use of request as promise .then if success .catch else
rpn(urlToCrawl)
    .then(function(htmlCrawled){
        console.log("succes");
    })
    .catch(function(errCrawling){
        console.log("bug",errCrawling);
    });

//use of request as promise with cheerio, trying to change User-Agent
var options = {
    uri: urlToCrawl,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
    },
    transform: function (body) {
        return cheerio.load(body);
    }
};
    
rpn(options)
    .then(function ($) {
        console.log("ok");
    })
    .catch(function (err) {
        console.log('err', err);
    });