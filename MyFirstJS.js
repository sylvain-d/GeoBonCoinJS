//var express = require('express');
var utils = require("./Utils.js");

const GMAP_API = 'AIzaSyCHZx19rrBq4rDw7_b69Gjsa4EuFSv3G8Y';
var lodash = require('lodash');
var int1 = 1;
var int2 = 1;
var char1 = "1";
var monString = "bonjjouratoss";
var monString2 = " bonjjour a tos  s";

var monTableau = ["tintin","Milou","Archibald","Tryphon"];

utils.logger("test", "DEBUG");
//var testPlace = new Place("38200","Villette de Vienne");



utils.logger(testPlace);

utils.logger("test", "DEBUG");
utils.logger("test", "INFO");
utils.logger("test", "WARN");


if(int1 == char1) {
    utils.logger("int1 == char1");
}
if (int1 === char1) {
    utils.logger("int1 === char1");
}
if(int1 == int2){
  utils.logger("int == int 2");
}
if(int1 === int2){
  utils.logger("int === int 2");
}

//geocodePlace(new Place("69006","Lyon"));

utiliTableau(monTableau);

function utiliTableau (unTableau) {
var autreTableau = ["castafiore","rastapopoulous"];

autreTableau = autreTableau.concat(unTableau);

   utils.logger(autreTableau);



}


//Constructor for Place, we'll set coordinate later
//idea, add prototype function to automatically fill coordinate
function Place(zipCode, city) {
    this.zipCode = zipCode;
    this.city = city;
    this.latitude = undefined;
    this.longitude = undefined;
    this.crd_long_lat = undefined;
    this.crd_geoJson = undefined;
    //Generate KeyPlace by joining zipCode & City without spaces
    this.keyPlace = (this.zipCode+this.city).replace(new RegExp(" ","g"),"");
    //Place ID from GMaps, avoiding another geocoding request, not usefull considering the previous key, for futur usage
    this.idPlaceGMap = undefined;
    this.setGeocode = function (lat,lng,idPlace) {
      this.latitude = lat;
      this.longitude = lng;
      this.idPlaceGMap = idPlace;
      this.crd_long_lat = [long,lat];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
    }
  }

  //Constructor for announcement
  function Announce(announceId, title, iconePicture, price, announceText, place, announceURL) {
      this.title = title;
      this.announceId = announceId;  
      this.iconePicture = iconePicture;
      this.price = price;
      this.announceText = announceText;
      this.place = place;
      this.announceURL = announceURL;
  } 



//Get GPS location bases on a place with a CodePostal and a City
function getGPSCoordinateForPlace(placeToGeoloc) {
    //Instance GMaps API
    //Check if we already know the place, if not we call GMAPS Geoloc API
    if(!checkPlaceInBase(placeToGeoloc)) {
        //geoloco with city = place.City
        //geoloc with cp = place.CP
        placeToGeoloc.latitude=1;
        placeToGeoloc.longitude=1;
        
    } else {
        return placeToGeoloc;
    }


}


//Check if we already have the GPS location of the Place in DB, return false if not or the Place filled with coordinate
function checkPlaceInBase(placeToCheck) {
    var doWeKnowThePlace = false;
    var thePlaceWeKnow = new Place("cp","city");

    //Hash map or collection
    var allThePlacesWeKnow;
    //TODO : search in DB or Hash loaded in memory;
    


    if(doWeKnowThePlace) {
        placeToCheck.latitude = thePlaceWeKnow.latitude;
        placeToCheck.longitude = thePlaceWeKnow.longitude;
        return placeToCheck;
    } else {
        return false;
    }

}

function geocodePlace(placeToGeocode) {
    var gMapsClient = require('@google/maps').createClient({
      key: GMAP_API
    });
    
    console.log("PlaceToGeocode = "+placeToGeocode.zipCode+" "+placeToGeocode.city);
    var adr = placeToGeocode.zipCode+" "+placeToGeocode.city;

    gMapsClient.geocode({
      //address: "39 rue Bellecombe 69006 Lyon",
      address: adr, 
      components: {components:'country:FR'},
      bounds:     {south:41,west:10,north:55,east:-1},
      language:   'fr',
      region:     'fr'
    }, function(err, response) {
      if (!err) {
        placeToGeocode.setGeocode(response.json.results[0].geometry.location.lat,response.json.results[0].geometry.location.lng,response.json.results[0].place_id);
        return placeToGeocode;
          
      }else {
          console.log(err.toString());
      }
    });



}


/*

var publicConfig = {
    key: 'AIzaSyCHZx19rrBq4rDw7_b69Gjsa4EuFSv3G8Y',
    stagger_time:       1000, // for elevationPath
    encode_polylines:   false,
    secure:             true, // use https
    // proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
  };
  var GoogleMapsAPI = require("googlemaps");
  var gmAPI = new GoogleMapsAPI(publicConfig);

  

  var geocodeParams = {
    "address":    "69006 Lyon",
    "components": "components=country:FR",
    "bounds":     "55,-1|41,10",
    "language":   "fr",
    "region":     "fr"
  };
  
  gmAPI.geocode(geocodeParams, function(err, result){
    console.log(result);
    console.log(result.results[0].geometry.location.lat);
    console.log(result.results[0].geometry.location.lng);
  });
*/


  /*
//avec usage de l'API maps.
Prendre le place ID comme référence et le stocker pour uage future
https://developers.google.com/places/web-service/details#PlaceDetailsRequests
https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJWxjP5oXq9EcRUCRj3S4JJEk&fields=geometry&key=AIzaSyCHZx19rrBq4rDw7_b69Gjsa4EuFSv3G8Y


  [ { address_components:
     [ [Object],
       [Object],
       [Object],
       [Object],
       [Object],
       [Object],
       [Object] ],
    formatted_address: '39 Rue Bellecombe, 69006 Lyon, France',
    geometry:
     { bounds: [Object],
       location: [Object],
       location_type: 'ROOFTOP',
       viewport: [Object] },
    place_id: 'ChIJWxjP5oXq9EcRUCRj3S4JJEk',
    types: [ 'premise' ] } ]
{ lat: 45.7677497, lng: 4.8635011 }
*/