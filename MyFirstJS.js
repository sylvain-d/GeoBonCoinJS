//var express = require('express');
const utils = require("./Utils.js");
const objects = require ("./Objects.js");
const fs = require("fs");
const env = require("./properties.json").env;

//Properties.json to file with your GMap API Key, another way to load json properties
const GMAP_API = JSON.parse(fs.readFileSync('./properties.json','utf8')).gMapApiKey;

var _ = require('lodash');





//var testPlace = new Place("38200","Villette de Vienne");



//utils.logger(testPlace);



var maplace = new objects.Place("69006","Lyon");
geocodePlace(maplace);
console.log("coucou apres geocoe",maplace);




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
      console.log("je gecode");
      this.latitude = lat;
      this.longitude = lng;
      this.idPlaceGMap = idPlace;
      this.crd_long_lat = [long,lat];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
      console.log("fini");
    }
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

function distance() {

  var gMapsClient = require('@google/maps').createClient({
    key: GMAP_API
  });

  const googleUtil = require('@google/maps').util;
  const orig = googleUtil.encodePath([{lat:45.7677497,lng:4.863501}]);

  const dest = googleUtil.encodePath([{lat:45.58539,lng:4.91534},{lat:45.58539,lng:4.91534}]);
  
    gMapsClient.distanceMatrix({

      origins : orig,
      destinations : dest,
      language:   'fr',
      region:     'fr'
    }, function(err, response) {
      if (!err) {
        console.log("ciyciy",response.json.results[0]);

      
          
      }else {
          console.log("erreur",err);
      }
    });

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
        console.log("ciyciy",response.json.results[0].geometry.location.lat);

        placeToGeocode.setGeocode(response.json.results[0].geometry.location.lat,response.json.results[0].geometry.location.lng,response.json.results[0].place_id);
        console.log("test",placeToGeocode);
        console.log("rein apres test");
        return placeToGeocode;
          
      }else {
          console.log("erreur",err);
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