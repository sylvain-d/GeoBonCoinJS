var utils = require("./Utils.js");
var mesObj = require("./Objects.js");


utils.log.warn("coucou");
var monLieu = new mesObj.Place("69006","Lyon");
utils.log.warn(monLieu);

monLieu.mockGeocode();
utils.log.warn(monLieu);

utils.test("bonjour rien");

var moi = new utils.test("bonjour");

moi.todo("au revoir");


