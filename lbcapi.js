const leboncoin = require('leboncoin-api');
const region = require("./node_modules/leboncoin-api/const/regions.json");



var search = new leboncoin.Search()
    .setPage(1)
    .setQuery("terrain OR jardin")
    .setFilter(leboncoin.FILTERS.PARTICULIER)
    .setCategory("ventes_immobilieres")
    .setRegion("rhone_alpes")
    //.setDepartment("yvelines")
    // .setLocation([
    //              {"zipcode": "78100"},
    //              {"zipcode": "78000"},
    //              ])
    .addSearchExtra("price", {min: 25000, max: 50000}) // will add a range of price
    .addSearchExtra("real_estate_type", ["1"])
    .addSearchExtra("rooms", {min:5, max:6})
    .addSearchExtra("square", {min:130, max:140})

    //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

// Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"

search.run().then(function (data) {
    //console.log(data.page); // the current page
    //console.log(data.pages); // the number of pages
    console.log(data.nbResult); // the number of results for this search
    

    console.log(data.results); // the array of results
    
    
    // data.results[0].getDetails().then(function (details) {
    //     console.log(details); // the item 0 with more data such as description, all images, author, ...
    // }, function (err) {
    //     console.error(err);
    // });
    // data.results[0].getPhoneNumber().then(function (phoneNumer) {
    //     console.log(phoneNumer); // the phone number of the author if available
    // }, function (err) {
    //     console.error(err); // if the phone number is not available or not parsable (image -> string) 
    // });
}, function (err) {
    console.error(err);
});