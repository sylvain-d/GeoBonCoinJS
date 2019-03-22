//idea : mongo for document and mongoose for indexing and search
//sync for getting a dbo before starting program

var monExport = require("./Objects.js");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("OK connect");

});


//const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

//https://mongoosejs.com/docs/geojson.html
/**
 * Mongoose schema for indexing mongo document of Places.
 * @property {String} keyPlace Concatenation of zipCode and City, ex "69006Lyon"
 * @property {String} idPlaceGMap id of Place in GMap
 * @property {GeoJSON} location geoJson of Place
 */
var placesIndexSchema = new mongoose.Schema({
  //_id : by defaut with mongo
  /**
   * _id given by mongo for document representing the place
   */
  idPlaceInMongo : mongoose.Schema.Types.ObjectId,
  //@TODO : tableau des id des documents Annonces qui sont sur cettte Place
  keyPlace : String,
  idPlaceGMap : String,
  location : {
    type : {
      type : String,
      enum : ["Point"],
      required : true,
    },
    coordinates : {
      type : [Number],
      required : true,      
    }
   }
  
});

const PlacesIndexModel = mongoose.model("PlacesIndexModel",placesIndexSchema);


var testPlace = new PlacesIndexModel();

console.log('TestPlace=',testPlace);
console.log('TestPlace dbid=',testPlace.location);


db.close();



