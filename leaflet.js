var L = require('leaflet');
console.log("coucou")

//"bundle": "browserify app.js -o bundle.js"

var map = L.map('map', {
    scrollWheelZoom: true
    
  });
  
  // Set the position and zoom level of the map
  map.setView([47.70, 13.35], 7);

  var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var osm_bw_mapnik = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; OSM Black and White Mapnik<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

  var osm_fr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OSM France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var esri_WorldTerrain = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
	maxZoom: 13
});

var esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

// Create base layers group object
var baseLayers = {
	"OSM Mapnik": osm_mapnik,
	"OSM Black White Mapnik": osm_bw_mapnik,
	"OSM Germany": osm_de,
	"OSM France": osm_fr,

	"ESRI World Imagery": esri_WorldImagery,
	"ESRI World Terrain": esri_WorldTerrain,
	"ESRI National Geographic": esri_NatGeoWorldMap
};

// Add baseLayers to the map
L.control.layers(baseLayers, null).addTo(map);