/*
import * as testSDE from './Ojects.js';
import rien from './Ojects';

console.log(rien);
*/

var monExport = require("./Ojects.js");


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("OK connect");

});


var placeTest = new monExport.lieu("69006","Lyon");
console.log(placeTest);

//const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

var placesSchema = new mongoose.Schema({
  dbId : mongoose.Schema.ObjectId,
  zipCode : String,
  city : String,
  latitude : String,
  longitude : String,
  //crd_long_lat : [long, lat],
  //crd_geoJson : { type : "Point", coordinates:[]},
  keyPlace : String,
  idPlaceGMap : String
});

var PlacesModel = mongoose.model("PlacesModel",placesSchema);

var testPlace = new PlacesModel();

console.log('TestPlace='+testPlace);

db.close();



