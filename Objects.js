var exports = module.exports = {};


/**
 * Constructor for place, exported to be used everywhere. Need to be instantiate with a new to get advantage of inner function
 * @param {string} zipCode zipCode of Place, in france 6 digits "69006"
 * @param {string} city city of Place, ex in france "Lyon"
 */
exports.place = function (zipCode, city) {
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



exports.testExportObject = {
  name : "sylvain",
  age : 37
}

