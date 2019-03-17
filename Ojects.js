var exports = module.exports = {};



exports.lieu = function (zipCode, city) {
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
      this.crd_long_lat = [lng,lat];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
    };
    this.mockGeocode = function () {
      this.latitude = 45.7677497;
      this.longitude = 4.8635011;
      this.idPlaceGMap = "ChIJWxjP5oXq9EcRUCRj3S4JJEk";
      this.crd_long_lat = [this.longitude,this.latitude];
      this.crd_geoJson = {type:"Point",coordinates:this.crd_long_lat};
      }
    };



exports.testtest = {
  name : "sylvain",
  age : 37
}

