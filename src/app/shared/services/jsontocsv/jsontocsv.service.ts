import { Injectable } from '@angular/core';
import { Globals } from '../../utils/globals';
import { saveAs } from 'file-saver';
import 'json2csv';

@Injectable({
  providedIn: 'root'
})
export class JsontoCsvService {

  constructor(public global: Globals) { }

  cartToCsv () {
    var cartItems = this.global.currentSelectedCartItems;

    var convertableJson = [];

    if (cartItems.length > 0) {
      // json2csvParser cannot parse JSON arrays, and not all values of CartItem are needed in the CSV.
      //
      // The required values of each item in cartItems is put into a separate javascript 
      // object and pushed into convertableJson so that json2csvParser can work with it.
      cartItems.forEach(item => {
        let newItem = {};
        newItem['Type'] = item.type;
        newItem['Nr.'] = item.productNumber;
        newItem['Prosess'] = item.process; 
        newItem['Beskrivelse'] = item.title + ", " + item.description;
        newItem['Variantkode'] = "0";
        newItem['Lokasjonskode'] = item.locationCode;
        newItem['Antall'] = item.amount;
        newItem['Ant. som skal monteres til ordre'] = " ";
        newItem['Enhetskode'] = item.unitCode;
        newItem['Salgspris Ekskl. mva,'] = item.price;
        convertableJson.push(newItem);
      });

      var { Parser } = require('json2csv');
      //The fields of the csv file are defined
      var fields = ['Type', 'Nr.', 'Prosess', 'Beskrivelse', 'Variantkode', 'Lokasjonskode', 
        'Antall', 'Ant. som skal monteres til ordre', 'Enhetskode', 'Salgspris Ekskl. mva,'];
      var json2csvParser = new Parser({ fields });
      var csv = json2csvParser.parse(convertableJson);

      // Save as blob with UTF-8 header: 
      // https://stackoverflow.com/questions/18925210/download-blob-content-using-specified-charset/36863986
      var blob = new Blob(["\ufeff", csv]);
      saveAs(blob, "MultiluxCart.csv");
    }
  }
}

