var fs = require('fs');


function callBackReadFile(err, data) {
    if(err){
        console.error(err);
        return null;
    }else {
        console.log("coucou");
        JSON.parse(data);
        console.log(json[4].data);

    }
};

fs.readFile('./detailJson.json', 'utf8', callBackReadFile);

console.log(JSON.parse(fs.readFileSync('./properties.json','utf8')).gMapApiKey);

/* {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
});

fs.readFile('/path/to/file.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
});

*/


var json = JSON.parse(fs.readFileSync('./detailJson.json', 'utf8'));

//console.log(json[4].data);

var key;
var value;

// JSON.parse(fs.readFileSync('./detailJson.json', 'utf8'),(key, value) => {
//     console.log(key);
//     console.log(value);
// })

