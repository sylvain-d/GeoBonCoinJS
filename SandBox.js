const logger = require("./Utils.js").log;
const mesObj = require("./Objects.js");



var monLieu = new mesObj.Place("69006","Lyon");
//utils.log.DEBUG(monLieu);

monLieu.mockGeocode();
//utils.log.DEBUG(monLieu);

var location = {};
location.test = "coucou";
location.moi = "sylvaun;";

var tab = [];
tab.moi = "sylvain";
tab["nom"] = "destr";
logger.INFO(tab);

console.log(location);


logger.ERROR("TEst erro");

logger.INFO("TEst erro");
logger.DEBUG("TEst error","deux","trois",monLieu);

logger.WARN("TEst error","deux","trois",monLieu);





// "id": "8",
// "label": "IMMOBILIER",
// "channel": "_immobilier_",
// "subcategories": [
//   {
//     "id": "9",
//     "label": "Ventes immobilières",
//     "channel": "ventes_immobilieres"
//   },
const _ = require("lodash");
const categories = require('./node_modules/leboncoin-api/const/categories.json');
var category ="ventes_immobilieres";
var filteredCategory = _(categories)
            .map(cat => cat.subcategories)
            .flatten()
            .filter(cat => cat.channel === category)
            .value()[0];
console.log(filteredCategory);

/*
var mylog = (function () {
    return {
        log: function() {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, args);
        },
        warn: function() {
            var args = Array.prototype.slice.call(arguments);
            console.warn.apply(console, args);
        },
        error: function() {
            var args = Array.prototype.slice.call(arguments);
            console.error.apply(console, args);
        }
    }
}());

var name = "Alex";
var arr = [1, 2, 3];
var obj = { a:1, b:2, c:3 };

var hello = function(msg){alert(msg);};
mylog.log("Name: ", name);
//mylog.log("Window Debug: ", window);
mylog.error("Some error happened");
mylog.warn("Ahh... Warning", arr, obj);
mylog.log("more parameters: ", arr, obj, hello);
*/

