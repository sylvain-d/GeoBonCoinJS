const logger = require("./Utils.js").log;
const mesObj = require("./Objects.js");
const _ = require("lodash");


var monLieu = new mesObj.Place("69006","Lyon");
//utils.log.DEBUG(monLieu);

monLieu.mockGeocode();
//utils.log.DEBUG(monLieu);

var location = {};
location.test = "coucou";
location.moi = "sylvain;";

var tab = [];
tab.moi = "sylvain";
tab["nom"] = "dstrs";
logger.DEBUG("tab=",tab,"location = ",location);


//tab= _(tab).map(elem => {elem.value = elem.value+"rien"})

console.log(tab)
tab.push(location)
logger.DEBUG("tab= ",tab)
logger.WARN(JSON.stringify(tab))
logger.INFO("Tab 1",tab[3])


const googleUtil = require('@google/maps').util;
console.log(googleUtil.encodePath([{lat:45.7677497,lng:4.863501}]));

distance();

function distance() {
    const fs = require("fs");
    const GMAP_API = JSON.parse(fs.readFileSync('./properties.json','utf8')).gMapApiKey;

    var gMapsClient = require('@google/maps').createClient({
      key: GMAP_API
    });
  
    const googleUtil = require('@google/maps').util;
    const orig = googleUtil.encodePath([{lat:45.7677497,lng:4.863501}]);
  
    //https://developers.google.com/maps/documentation/utilities/polylineutility

    const dest1 = googleUtil.encodePath([{lat:45.58539,lng:4.91534},{lat:50.02462,lng:1.76920}]);
    const dest2 = googleUtil.encodePath([{lat:50.02462,lng:1.76920}]);

console.log("origin = ",orig);
console.log("destinations = ",dest1," - ",dest2);

      gMapsClient.distanceMatrix({
  
        origins : orig,
        destinations : dest1,
        language:   'fr',
        region:     'fr'
      }, function(err, response) {
        if (!err) {
            console.log("Success");
          console.log("ciyciy",response.json.results[0]);
  
        
            
        }else {
            console.log("ERRRO");
            console.log("erreur",err);
        }
      });
  
  }
  

// "id": "8",
// "label": "IMMOBILIER",
// "channel": "_immobilier_",
// "subcategories": [
//   {
//     "id": "9",
//     "label": "Ventes immobilières",
//     "channel": "ventes_immobilieres"
//   },

const categories = require('./node_modules/leboncoin-api/const/categories.json');
var category ="ventes_immobilieres";
var filteredCategory = _(categories)
            .map(cat => cat.subcategories)
            .flatten()
            .filter(cat => cat.channel === category)
            .value()[0];
console.log(filteredCategory);



