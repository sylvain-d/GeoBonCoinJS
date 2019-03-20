var monExport = require("./Ojects.js");
const mongo = require("mongodb").MongoClient;
//mongo for raw storage of document, and moongoose for id and search
//try mongo spatial search with document with only spatial data.
//sync for getting a dbo before starting program

mongo.connect("mongodb://localhost/test", function(error, db) {
    if(error) {
        console.log("OUverture Mongo HS");
        return null;
    } else {
        console.log("Success");
        dbo = db.db("test");
        createCollections(dbo,db);
               
    }
});

function createCollections(dbo,db) {
    dbo.createCollection("MyPlaces", function(err, res){
        if(err) return null;

        var onePlace = new monExport.lieu("69006","Lyon");
        onePlace.mockGeocode();

        dbo.collection("MyPlaces").insertOne(onePlace, function(err,res) {
            if(err) return null;
            console.log("Insertion OK");
            db.close();
        });
    });
    
        

}