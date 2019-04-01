//Reading a jsonfile
//Two way, sync or with promise

const fs = require('fs');
const myObjects = require('./Objects');
const utils = require('./Utils');
var announces = [];

/**
 * Callback function for reading JsonData
 * @param  {} err
 * @param  {} data
 */
function callBackReadFile(err, data) {
    if(err){
        utils.log.ERROR(err);
        return null;
    }else {
        utils.log.DEBUG("Entering reading Json");
        let json = JSON.parse(data)[4].data;
        console.log(json);
        let nbResult = json.total;
        utils.log.DEBUG("NbResults in Json = "+nbResult);
        for(let i=0;i<nbResult;i++) {
            let announce = new myObjects.Announce();
            announce.title = json.ads[i].subject;
            announce.announceText = json.ads[i].body;
            announce.price = json.ads[i].price[0];
            announce.announceURL = json.ads[i].url;
            announce.iconePicture = json.ads[i].images.thumb_url;
            //utils.log.DEBUG(announce);
            listAllContent(announce);
        }
        

        

    }
};

/**
 * Debug function to list all properties and value of and Array
 * @param  {} ads leboncoin ads to be logged, should be something elle
 */
function listAllContent(ads) {
    utils.log.DEBUG('Debug ADS');
    //for pro in obj list all properties / enumerable, nice to list all properties
    for(let contentProperties in ads) {
        utils.log.DEBUG(contentProperties+" = "+ads[contentProperties]);
        //With syntax below object neested aren't log unfold in the console
        //console.log(`ads.${contentProperties} = ${ads[contentProperties]}`);
    }
}

fs.readFile('./detailJson.json', 'utf8', callBackReadFile);





//Direct and sync read of JsonFile
//var json = JSON.parse(fs.readFileSync('./detailJson.json', 'utf8'));

/*Another way to read Json with direct key/value return, for future use
var key;
var value;

JSON.parse(fs.readFileSync('./detailJson.json', 'utf8'),(key, value) => {
    console.log(key);
    console.log(value);
})
*/


/*
Exemple of Json leboncoin to parse

{ total: 4,
  total_all: 4,
  total_pro: 3,
  total_private: 1,
  total_active: 0,
  total_inactive: 0,
  pivot: '35:1550994908000',
  ads:
   [ { list_id: 1587802109,
       first_publication_date: '2019-03-21 10:48:47',
       index_date: '2019-03-21 10:48:47',
       status: 'active',
       category_id: '9',
       category_name: 'Ventes immobilières',
       subject: 'Maison 6 pièces 163 m²',
       body:
        'ENTRE BOURGOIN JALLIEU ET LA VERPILLIERE\n\nJOLI POTENTIEL POUR CETTE MAISON A RENOVER AVEC BEAU VOLUME ET AUTHENTICITE AU REZ DE CHAUSSEE VERANDA ET HALL D ENTREE OUVRANT SUR UNE BELLE PIECE DE VIE CUISINE ET SALON UNE SALLE D EAU AVEC WC A L ETAGE TROIS GRANDES CHAMBRES UNE GRANDE TERRASSE POSSIBILITE WC SUP. AU 2IEME ETAGE DE SUPERBES COMBLES AMENAGEABLES CE BIEN POSSEDE DE BELLES DEPENDANCES( cave, garage, remise, atelier, écurie etc...) LE TOUT SUR UN TERRAIN AGRICOLE DE 4519 M2 A43 ET GARE VOTRE CONTACT AGNES MOREL AGENT COMMERCIAL INDEPENDANT (29365728 Vienne) TEL. 06 21 83 62 55 ***\nRéférence annonce : 021923\nLes honoraires sont à la charge du vendeur',
       ad_type: 'offer',
       url: 'https://leboncoin.fr/ventes_immobilieres/1587802109.htm',
       price: [Array],
       price_calendar: null,
       images: [Object],
       attributes: [Array],
       location: [Object],
       owner: [Object],
       options: [Object],
       has_phone: true },
     { list_id: 1586673784,
       first_publication_date: '2019-03-19 15:48:07',
       expiration_date: '2019-05-18 15:48:07',
       index_date: '2019-03-19 15:48:07',
       status: 'active',
       category_id: '9',
       category_name: 'Ventes immobilières',
       subject: 'Villefranche ouest 15km duplex neuf de 165m² hab',
       body:
        'Villefranche, 15km ouest, duplex neuf de 165m² hab en plateau à aménager avec terrasse et jardin, écoles maternelle et primaire à 100 mètres, collège à 4 minutes et tous commerces accessibles à pied.\nJolie vue sur les monts du beaujolais, 2 parkings privatifs. Récupérateur d’eaux pluviales 5.000L, panneaux photovoltaiques 3Kw avec rapport d’environ 800 euros par an en autoconsommation. Logement éligible au prêt à taux zéro dans la limite de 28.000 euros pour un premier achat immobilier. Les taxes de raccordement à l’égout et la taxe locale d’équipement sont déjà payées et comprises dans le prix de vente. Exonération de taxe foncière les 2 premières années suivant l’acquisition d’un logement neuf. Frais de notaire réduits 3.400 euros Prévoir environ 75.000 euros et 3 mois de travaux pour l’aménagement intérieur du logement neuf. Possibilité d’investissement locatif avec rentabilité d’environ 5%. Prix: 129.000 euros TTC (TVA récupérable si investissement locatif)\nTél: 07.71.72.19.72. Agences et intermédiaires s’abstenir',
       ad_type: 'offer',
       url: 'https://leboncoin.fr/ventes_immobilieres/1586673784.htm',
       price: [Array],
       price_calendar: null,
       images: [Object],
       attributes: [Array],
       location: [Object],
       owner: [Object],
       options: [Object],
       has_phone: true },
     { list_id: 1583381910,
       first_publication_date: '2019-03-13 16:03:00',
       expiration_date: '2019-05-12 16:03:00',
       index_date: '2019-03-13 16:03:00',
       status: 'active',
       category_id: '9',
       category_name: 'Ventes immobilières',
       subject: 'Grange a renovee',
       body:
        'RARE sur la commune de ST. ROMAIN DE JALIONAS, PROCHE CENTRE COMMERCES, VENDS une Grange d\'environ 150m² au sol avec un jardin extérieur d\'une surface de 32.80 M² et 5 places de parking.  Permis acepté et prurgé pour 3 T3 duplex, Prix: 138 000 € FAI  frais agence charge vendeur Ref 2577/VDA, Tel: 04.72.93.23.37 SECTEUR EST LYONNAIS & NORD ISÈRE',
       ad_type: 'offer',
       url: 'https://leboncoin.fr/ventes_immobilieres/1583381910.htm',
       price: [Array],
       price_calendar: null,
       images: [Object],
       attributes: [Array],
       location: [Object],
       owner: [Object],
       options: [Object],
       has_phone: true },
     { list_id: 1498424085,
       first_publication_date: '2018-09-27 08:55:08',
       index_date: '2019-02-24 08:55:08',
       status: 'active',
       category_id: '9',
       category_name: 'Ventes immobilières',
       subject: 'Maison 6 pièces 200 m²',
       body:
        'A vendre, à deux pas du village de BRULLIOLES, Oralia Sogimat vous propose cette bâtisse à rénover intégralement (toiture, maçonnerie, électricité, menuiseries etc...) sur une parcelle de terrain d\'environ 700m².\nElle est constituée d\'environ 100m² de caves représentant l\'intégralité de la surface du bâtiment, d\'une partie "habitable" de 100m²  et enfin d\'une partie grenier entièrement aménageable de 100m² également.\nBelles possibilités, idéal pour un artisan ou pour créer sa résidence principale à son goût.\nPlus d\'informations, Matthieu DESPLACE ORALIA SOGIMAT 06 01 28 03 49\nNon assujetti au DPE\nRéférence annonce : 19546700\nNon soumis au DPE\nLes honoraires sont à la charge du vendeur',
       ad_type: 'offer',
       url: 'https://leboncoin.fr/ventes_immobilieres/1498424085.htm',
       price: [Array],
       price_calendar: null,
       images: [Object],
       attributes: [Array],
       location: [Object],
       owner: [Object],
       options: [Object],
       has_phone: true } ] }

       */

       //Debug Mode for One add
       /*

       Debug ADS
list_id  =  1586673784
first_publication_date  =  2019-03-19 15:48:07
expiration_date  =  2019-05-18 15:48:07
index_date  =  2019-03-19 15:48:07
status  =  active
category_id  =  9
category_name  =  Ventes immobilières
subject  =  Villefranche ouest 15km duplex neuf de 165m² hab
body  =  Villefranche, 15km ouest, duplex neuf de 165m² hab en plateau à aménager avec terrasse et jardin, écoles maternelle et primaire à 100 mètres, collège à 4 minutes et tous commerces accessibles à pied.
Jolie vue sur les monts du beaujolais, 2 parkings privatifs. Récupérateur d’eaux pluviales 5.000L, panneaux photovoltaiques 3Kw avec rapport d’environ 800 euros par an en autoconsommation. Logement éligible au prêt à taux zéro dans la limite de 28.000 euros pour un premier achat immobilier. Les taxes de raccordement à l’égout et la taxe locale d’équipement sont déjà payées et comprises dans le prix de vente. Exonération de taxe foncière les 2 premières années suivant l’acquisition d’un logement neuf. Frais de notaire réduits 3.400 euros Prévoir environ 75.000 euros et 3 mois de travaux pour l’aménagement intérieur du logement neuf. Possibilité d’investissement locatif avec rentabilité d’environ 5%. Prix: 129.000 euros TTC (TVA récupérable si investissement locatif)
Tél: 07.71.72.19.72. Agences et intermédiaires s’abstenir
ad_type  =  offer
url  =  https://leboncoin.fr/ventes_immobilieres/1586673784.htm
price  =  [ 129000 ]
price_calendar  =  null
images  =  { thumb_url:
   'https://img6.leboncoin.fr/ad-thumb/643b09a8e0ca4644c3e5d5b8e01f40159d07626f.jpg',
  small_url:
   'https://img6.leboncoin.fr/ad-small/643b09a8e0ca4644c3e5d5b8e01f40159d07626f.jpg',
  nb_images: 3,
  urls:
   [ 'https://img6.leboncoin.fr/ad-image/643b09a8e0ca4644c3e5d5b8e01f40159d07626f.jpg',
     'https://img1.leboncoin.fr/ad-image/f1a7a861b30d63d471bb5b44018ca909dc1789f5.jpg',
     'https://img7.leboncoin.fr/ad-image/8efa982d095d3e6565c697a2533a8d493c118bfa.jpg' ],
  urls_thumb:
   [ 'https://img6.leboncoin.fr/ad-thumb/643b09a8e0ca4644c3e5d5b8e01f40159d07626f.jpg',
     'https://img1.leboncoin.fr/ad-thumb/f1a7a861b30d63d471bb5b44018ca909dc1789f5.jpg',
     'https://img7.leboncoin.fr/ad-thumb/8efa982d095d3e6565c697a2533a8d493c118bfa.jpg' ],
  urls_large:
   [ 'https://img6.leboncoin.fr/ad-large/643b09a8e0ca4644c3e5d5b8e01f40159d07626f.jpg',
     'https://img1.leboncoin.fr/ad-large/f1a7a861b30d63d471bb5b44018ca909dc1789f5.jpg',
     'https://img7.leboncoin.fr/ad-large/8efa982d095d3e6565c697a2533a8d493c118bfa.jpg' ] }
attributes  =  [ { key: 'real_estate_type',
    value: '1',
    key_label: 'Type de bien',
    value_label: 'Maison',
    generic: true },
  { key: 'rooms',
    value: '7',
    key_label: 'Pièces',
    value_label: '7',
    generic: true },
  { key: 'square',
    value: '165',
    key_label: 'Surface',
    value_label: '165 m²',
    generic: true },
  { key: 'ges',
    value: 'c',
    key_label: 'GES',
    value_label: 'C (de 11 à 20)',
    generic: true },
  { key: 'energy_rate',
    value: 'c',
    key_label: 'Classe énergie',
    value_label: 'C (de 91 à 150)',
    generic: true },
  { key: 'immo_sell_type',
    value: 'old',
    value_label: 'old',
    generic: false },
  { key: 'is_import',
    value: 'false',
    value_label: 'false',
    generic: false } ]
location  =  { region_id: '22',
  region_name: 'Rhône-Alpes',
  department_id: '69',
  department_name: 'Rhône',
  city_label: 'Villefranche-sur-Saône 69400',
  city: 'Villefranche-sur-Saône',
  zipcode: '69400',
  lat: 45.98891,
  lng: 4.71505,
  source: 'city',
  provider: 'lbc',
  is_shape: true }
owner  =  { store_id: '16405200',
  user_id: '5a300e7b-a1f9-4edb-b331-a682202c1d06',
  type: 'private',
  name: 'Emmanuel TELLIER',
  no_salesmen: true }
options  =  { has_option: false,
  booster: false,
  photosup: false,
  urgent: false,
  gallery: false,
  sub_toplist: false }
has_phone  =  true

*/