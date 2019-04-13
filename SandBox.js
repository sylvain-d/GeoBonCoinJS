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



