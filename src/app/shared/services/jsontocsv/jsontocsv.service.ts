import { Injectable } from '@angular/core';
import { Globals } from '../../utils/globals';
import { saveAs } from 'file-saver';
import 'json2csv';

@Injectable({
  providedIn: 'root'
})
export class JsontoCsvService {

  constructor(public global: Globals) { }

  jsonToCsv () {
    var cartItems = this.global.currentSelectedCartItems;

    var convertableJson = [];

    if (cartItems.length > 0) {
      // json2csvParser cannot parse JSON arrays
      // Each item in cartItems is put into a separate javascript object and 
      // pushed into convertableJson so that json2csvParser can work with it.
      cartItems.forEach(item => {
        let newItem = {};
        newItem['Type'] = item.title;
        newItem['Nr.'] = item.nr;
        newItem['Prosess'] = item.prosess; 
        newItem['Beskrivelse'] = item.description;
        newItem['Variasntkode'] = item.variantkode;
        newItem['Lokasjonskode'] = item.lokasjonskode;
        newItem['Antall'] = item.amount;
        newItem['Ant. som skal monteres til ordre'] = item.lokasjonskode;
        newItem['Enhetskode'] = item.enhetskode;
        newItem['Salgspris Ekskl. mva,'] = item.price * item.amount;
        newItem['Linjerabatt-%'] = item.linjerabatt;
        newItem['Netto enhetspris'] = item.price;
        newItem['DB'] = item.db;
        newItem['DG%'] = item.dg;
        newItem['Linjebeløp Ekskl. mva.'] = item.linjebeløpeksklmva;
        newItem['Ant. som skal tilordnes'] = item.skaltilordnes;
        newItem['Ant. tilordnet'] = item.tilordnet;
        newItem['Valutafaktor'] = item.valutafaktor;
        newItem['Valutakode'] = item.valutakode;
        newItem['Enhetskost (NOK)'] = item.enhetskost;
        newItem['Valutapris'] = item.valutapris;
        convertableJson.push(newItem);
      });

      var { Parser } = require('json2csv');
      //The fields of the csv file are defined
      var fields = ['Type', 'Nr.', 'Prosess', 'Beskrivelse', 'Variantkode', 'Lokasjonskode', 
        'Antall', 'Ant. som skal monteres til ordre', 'Enhetskode', 'Salgspris Ekskl. mva,', 
        'Linjerabatt-%', 'Netto enhetspris', 'DB', 'DG%', 'Linjebeløp Ekskl. mva.', 'Ant. som skal tilordnes', 
        'Ant. tilordnet', 'Valutafaktor', 'Valutakode', 'Enhetskost (NOK)', 'Valutapris'];
      var json2csvParser = new Parser({ fields });
      var csv = json2csvParser.parse(convertableJson);

      // Save as blob with UTF-8 header: 
      // https://stackoverflow.com/questions/18925210/download-blob-content-using-specified-charset/36863986
      var blob = new Blob(["\ufeff", csv]);
      saveAs(blob, "MultiluxCart.csv");
    }
  }
}

