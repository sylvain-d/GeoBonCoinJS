//Work from M. Lebreton
//copied to understand lodash and data manipulation
//I added comment to explain how it works.
//Have a look at : https://dustinpfister.github.io/2018/02/02/lodash_map/ or https://dustinpfister.github.io/2018/08/12/lodash_flatten/

const categories = require('./node_modules/leboncoin-api/const/categories.json');

/*Categorie extract
{
    "id": "8",
    "label": "IMMOBILIER",
    "channel": "_immobilier_",
    "subcategories": [
      {
        "id": "9",
        "label": "Ventes immobilières",
        "channel": "ventes_immobilieres"
      }
    }

*/


/*suCat Exemple
"shoe_size": {
      "values": [
        {
          "label": "16",
          "value": "1"
        },
        {
          "label": "17",
          "value": "2"
        },

*/

const subcategories = require('./node_modules/leboncoin-api/const/subcategories.json');

const _ = require('lodash');
const Url = require('url');
const QueryString = require('querystring');

/**
 * TEST URL
 */
const testUrl =
  'https://www.leboncoin.fr/recherche/?category=2&text=caravane&search_in=subject&brand=Fiat&price=250-max';
/**
 *
 */

 //URL & Query obj usage.
const getUrlParams = url => {
  //Get the query after ? in URL
  let urlQuery = Url.parse(url).query;

  //list all params as obj 
  /*
  [Object: null prototype] {
  category: '2',
  text: 'caravane',
  search_in: 'subject',
  brand: 'Fiat',
  price: '250-max' }*/
  let urlParams = QueryString.parse(urlQuery);
  return urlParams;
};



const subcats = _(categories)
    .map(cat => cat.subcategories)
    .flatten();

//console.log(...subcats)

//Map all Categorie and sub categories of Categories.json in a single Array/Object with one level depht.
//each ID is unique among Cat and Subcat.
const getFlattenCategories = () => {
  /*
  As a Categorie is like 
  "id": "8",
    "label": "IMMOBILIER",
    "channel": "_immobilier_",
    "subcategories": 
  with "reverse" allocation with named parameter const id, label, channel value is the content of cat in the exemple above
  id:8, label:Imm....
  */
    const cats = _(categories).map(cat => {
    const { id, label, channel } = cat;
    return { id, label, channel };
  });
 
 /*
  Second step, getting the SubCategories content and flattened it
 */
  const subcats = _(categories)
    .map(cat => cat.subcategories)
    .flatten();

    //the ... operator with and array is like listing all element of the array
    //cf : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Syntaxe_d%C3%A9composition
  const flattenCategories = [...cats, ...subcats];

  //the return value is an Array or lodashArray
  return flattenCategories;
};



//for each element in the flatten Array, looking at ID value to match and return the complete element
//ex catID 33 = { id: '33',   label: 'Offres d\'emploi',   channel: 'offres_d_emploi' }
const getCategory = categoryId => {
  const category = getFlattenCategories().find(cat => {
    return cat.id === categoryId;
  });

  return category;
};


const getKeywords = ({ text, search_in }) => {
  let keywords = {};
  if (text) {
    keywords.text = text;
  }
  if (search_in) {
    keywords.type = search_in;
  }
  return keywords;
};

const getEnumsAndRanges = (categoryId, params) => {
  if (subcategories[categoryId]) {
    const subcategoryKeys = Object.keys(subcategories[categoryId]);
    const paramKeys = Object.keys(params);
    const enumsOrRangesKeys = paramKeys.filter(param => {
      return subcategoryKeys.find(key => key === param);
    });
    let enums = [];
    let ranges = [];
    enumsOrRangesKeys.map(key => {
      let value = params[key];
      let valueArray = value.split('-');
      if (valueArray.length === 1) {
        enums.push({
          [key]: value
        });
      } else {
        ranges.push({
          [key]: {
            min: valueArray[0],
            max: valueArray[1]
          }
        });
      }
    });

    return { enums, ranges };
  }
  return null;
};

const getApiParamsFromUrl = url => {
  const params = getUrlParams(url);
  console.log(params, 'PARAMS');
  const category = getCategory(params.category);
  console.log(category, 'CATEGORY');
  const keywords = getKeywords(params);
  console.log(keywords, 'KEYWORDS');
  const { enums, ranges } = getEnumsAndRanges(category.id, params);

  return {
    category: category.channel,
    enums,
    ranges,
    keywords
  };
};

/*
return {
        "limit": this.limit,
        "filters": {
            "category": { "id": this.category },
            "enums": getSubCategoriesExtras(this.category, this.searchExtras),
            "location": getLocation(this.region, this.department, this.location, this.area),
            "keywords": getKeywords(this.query, this.titleOnly),
            "ranges": getSubCategoriesRanges(this.category, this.searchExtras)
        },
        "offset": (this.page -1) * this.limit,
        "owner_type": this.filter == filters.ALL? null : this.filter.value
    }
    */
/*
var http = require('http');

//create a server object:
http
  .createServer(function(req, res) {
    res.write(
      //JSON.stringify(getUrlParams(testUrl)),
      JSON.stringify(getApiParamsFromUrl(testUrl))
    ); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
*/