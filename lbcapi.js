const leboncoin = require('leboncoin-api');
const region = require("./node_modules/leboncoin-api/const/regions.json");



var search = new leboncoin.Search()
    .setPage(1)
    //.setQuery("terrain OR jardin")
    .setFilter(leboncoin.FILTERS.PARTICULIER)
    .setCategory("ventes_immobilieres")
    //.setRegion("rhone_alpes")
    //.setDepartment("rhone")
    // .setLocation([
    //              {"zipcode": "69003"},
    //              {"zipcode": "69008"},
    //              ])
    
    .setSort({sort_by:"date",sort_order:"dsc"})
    //Search by location around me
    .setArea({"lat": 45.7679705, "lng": 4.8637901999999995, "radius": 10000})
    
    
    .addSearchExtra("price", {min: 25000, max: 100000}) // will add a range of price
    //.addSearchExtra("real_estate_type", ["1"])
    .addSearchExtra("rooms", {min:5, max:6})
    //.addSearchExtra("square", {min:130, max:140})

    //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

// Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"
var options;
console.log("bodyparams 1 =",search.getBodyParams());
console.log("bodyparams 2 =",JSON.stringify(search.getBodyParams()));


console.log("option =",(options) ? options : search.getUrlOptions());

search.run().then(function (data) {
    //console.log(data.page); // the current page
    //console.log(data.pages); // the number of pages
    console.log("Nombre de résultat ",data.nbResult); // the number of results for this search
    

    console.log(data.results); // the array of results
    // data.results.forEach(element => {
    //     element.getDetails().then(function (details) {
    //         console.log("Date = ",details.date," Price = ",details.price); // the item 0 with more data such as description, all images, author, ...
    //     }, function (err) {
    //         console.error(err);
    //     });
    // });
    
 
    // data.results[0].getPhoneNumber().then(function (phoneNumer) {
    //     console.log(phoneNumer); // the phone number of the author if available
    // }, function (err) {
    //     console.error(err); // if the phone number is not available or not parsable (image -> string) 
    // });
}, function (err) {
    console.error(err);
});