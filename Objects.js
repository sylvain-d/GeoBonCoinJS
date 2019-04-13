var exports = module.exports = {};


/**
 * Constructor for place, exported to be used everywhere. Need to be instantiate with a new to get advantage of inner function
 * @param {string} zipCode zipCode of Place, in france 6 digits "69006"
 * @param {string} city city of Place, ex in france "Lyon"
 */
exports.Place = function (zipCode, city) {
    this.zipCode = zipCode;
    this.city = city;
    this.latitude = undefined;
    this.longitude = undefined;
    this.crd_long_lat = undefined;
    this.crd_geoJson = undefined;
    //Generate KeyPlace by joining zipCode & City without spaces
    this.myKeyPlace = (this.zipCode+this.city).replace(new RegExp(" ","g"),"");
    //Place ID from GMaps, avoiding another geocoding request, not usefull considering the previous key, for futur usage
    this.idPlaceGMap = undefined;
    /**
     * Set the latitute, longitude and idPlace (google format) and generate two objects with that.
     * @property {array} crd_long_lat An array  [long,lat]
     * @property {object} crd_geoJson A geojson for mongo {type:"Point",coordinates:this.crd_long_lat}
     */
    this.setGeocode = function (lat,lng,idPlace) {
      this.latitude = lat;
      this.longitude = lng;
      this.idPlaceGMap = idPlace;
      this.crd_long_lat = [lng,lat];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
    };

    
    /**
     * Constructor for DistanceToMe, from a place, calculate distance and time to reach others key places, work, parents...
     * @param  {} place place from where we compute time and distance
     */
    exports.DistanceToMe = function(place) {

      //@Todo : same object with time and distance
    }

    /**
     * Mock the geocode function with Place related to 69006 Lyon
     */
    this.mockGeocode = function () {
      this.latitude = 45.7677497;
      this.longitude = 4.8635011;
      this.idPlaceGMap = "ChIJWxjP5oXq9EcRUCRj3S4JJEk";
      this.crd_long_lat = [this.longitude,this.latitude];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
      };
    };


 /**
  * Constructor for Announce
  * @param  {String} title Announce title
  * @param  {String} iconePicture Announce picture for icone
  * @param  {Number} price Announce price
  * @param  {string} announceText Announce description
  * @param  {Place} place the object Place linked to the Announce
  * @param  {string} announceURL url for announce
  */
 exports.Announce = function (announceId, title, iconePicture, price, announceText, place, announceURL, item) {
    this.title = title;
    this.iconePicture = iconePicture;
    this.price = price;
    this.announceText = announceText;
    this.place = place;
    this.announceURL = announceURL;
    this.item = item;
};


exports.testExportObject = {
  name : "sylvain",
  age : 37
}

