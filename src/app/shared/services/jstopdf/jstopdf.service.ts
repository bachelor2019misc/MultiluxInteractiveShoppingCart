import { Injectable } from '@angular/core';
import { Globals } from '../../utils/globals';
import * as jsPDF  from 'jspdf' // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html

@Injectable({
  providedIn: 'root'
})
export class JsToPdfService {

  constructor(public global: Globals) { }

  cartToPdf () {    
    const CART_ITEMS = this.global.currentSelectedCartItems;
    const DOC = new jsPDF();
    DOC.autoPrint();
    DOC.setProperties({
      title: "MultiluxCart"
    });

    const TEXT_TITLE_SIZE = 22;
    const TEXT_DEFAULT_SIZE = 11;
    const TEXT_YPOS_DEFAULT = 20;
    const TEXT_XPOS_DEFAULT = 10;
    const TEXT_YPOS_OFFSET = 8;
    const TEXT_YPOS_MAX = 275;
    const PAGE_XPOS = 180;
    const TOTAL_PRICE_XPOS = TEXT_XPOS_DEFAULT;
    const FOOTER_YPOS = 280;
    let textYpos = TEXT_YPOS_DEFAULT;
    let textXpos = TEXT_XPOS_DEFAULT;
    let totalPrice = 0;
    let page = 1;

    // Defining header width
    const HEADER_WIDTH = {};
    HEADER_WIDTH['type'] = 20;
    HEADER_WIDTH['productNumber'] = 10;
    HEADER_WIDTH['process'] = 15;
    HEADER_WIDTH['description'] = 37;
    HEADER_WIDTH['locationCode'] = 30;
    HEADER_WIDTH['price'] = 20;
    HEADER_WIDTH['amount'] = 20;
    HEADER_WIDTH['amount'] = 20;
    HEADER_WIDTH['unitCode'] = 20;

    DOC.setFont('times');
    
    // Title
    this.generateTitle(DOC, textXpos, textYpos, TEXT_DEFAULT_SIZE, TEXT_TITLE_SIZE);

    // Content
    let firstLoop = true;
    CART_ITEMS.forEach(item => {
      // Reset X position
      textXpos = TEXT_XPOS_DEFAULT;

      // If first loop, generate headers
      if (firstLoop) {
        textYpos += TEXT_YPOS_OFFSET * 2;
        this.generateHeaders(DOC, textYpos, textXpos, TEXT_DEFAULT_SIZE, HEADER_WIDTH);
        firstLoop = false;
      }

      // Add to Y position, if above max, go to new page and 
      // create new title and headers
      textYpos += TEXT_YPOS_OFFSET;
      if (textYpos > TEXT_YPOS_MAX) {
        // Add page number to previous page
        DOC.text(PAGE_XPOS, FOOTER_YPOS, "Page " + page.toString());
        DOC.addPage()
        textYpos = TEXT_YPOS_DEFAULT;

        // Title
        this.generateTitle(DOC, textXpos, textYpos, TEXT_DEFAULT_SIZE, TEXT_TITLE_SIZE);

        // Headers
        textYpos += 15;
        this.generateHeaders(DOC, textYpos, textXpos, TEXT_DEFAULT_SIZE, HEADER_WIDTH);
        textYpos += TEXT_YPOS_OFFSET;
        page += 1;
      }


      /* Fill columns */
      DOC.text(textXpos, textYpos, item.type);
      textXpos += HEADER_WIDTH['type'];

      // Check if productNumber is empty
      let productNumber = item.productNumber;
      if (productNumber == null) {
        productNumber = "";
      }
      DOC.text(textXpos, textYpos, productNumber);
      textXpos += HEADER_WIDTH['productNumber'];

      // Check if process is empty
      let process = item.process;
      if (process == null) {
        process = "";
      }
      DOC.text(textXpos, textYpos, process);
      textXpos += HEADER_WIDTH['process'];

      DOC.text(textXpos, textYpos, item.title + ", " + item.description);
      textXpos += HEADER_WIDTH['description'];

      DOC.text(textXpos, textYpos, item.locationCode);
      textXpos += HEADER_WIDTH['locationCode'];

      DOC.text(textXpos, textYpos, item.price.toString());
      textXpos += HEADER_WIDTH['price'];

      // Check if amount is empty
      let amount = item.amount;
      if (amount == null) {
        DOC.text(textXpos, textYpos, "0");
      } else {
        DOC.text(textXpos, textYpos, amount.toString());
      }
      textXpos += HEADER_WIDTH['amount'];

      DOC.text(textXpos, textYpos, item.unitCode);
      textXpos += HEADER_WIDTH['unitCode'];

      DOC.text(textXpos, textYpos, (item.price * item.amount).toString());

      // Add the item's total price to the total cart price
      totalPrice += item.price * item.amount;

    });

    /* Add the total cart price to the bottom of the PDF */
    textXpos = TEXT_XPOS_DEFAULT;

    // Add to Y position, if above max, go to 
    // new page and create new title
    textYpos += TEXT_YPOS_OFFSET * 2;
    if (textYpos > TEXT_YPOS_MAX) {
      // Add page number to previous page
      DOC.text(PAGE_XPOS, FOOTER_YPOS, "Page " + page.toString());
      DOC.addPage()
      textYpos = TEXT_YPOS_DEFAULT;

      // Title
      this.generateTitle(DOC, textXpos, textYpos, TEXT_DEFAULT_SIZE, TEXT_TITLE_SIZE);
      textXpos = TEXT_XPOS_DEFAULT;
      textYpos += TEXT_YPOS_OFFSET;
      page += 1;
    }

    //Total price
    DOC.setFontType('bold');
    DOC.text(TOTAL_PRICE_XPOS, textYpos, "Total Price: " +  totalPrice.toString());

    //Final page number
    DOC.setFontType('normal')
    DOC.text(PAGE_XPOS, FOOTER_YPOS, "Page " + page.toString());

    // Open PDF in a new tab
    window.open(DOC.output('dataurlnewwindow', "cart"));
  }


  generateHeaders(doc, textYpos, textXpos, textSize, HEADER_WIDTH) {
    doc.setFontSize(textSize);
    doc.setFontType('bold');
    doc.text(textXpos, textYpos, 'Type');
    textXpos += HEADER_WIDTH['type'];
    doc.text(textXpos, textYpos, 'Nr.');
    textXpos += HEADER_WIDTH['productNumber'];
    doc.text(textXpos, textYpos, 'Process');
    textXpos += HEADER_WIDTH['process'];
    doc.text(textXpos, textYpos, 'Description');
    textXpos += HEADER_WIDTH['description'];
    doc.text(textXpos, textYpos, 'Location Code');
    textXpos += HEADER_WIDTH['locationCode'];
    doc.text(textXpos, textYpos, 'Price');
    textXpos += HEADER_WIDTH['price'];
    doc.text(textXpos, textYpos, 'Amount');    
    textXpos += HEADER_WIDTH['amount'];
    doc.text(textXpos, textYpos, 'Unit Code');     
    textXpos += HEADER_WIDTH['unitCode'];
    doc.text(textXpos, textYpos, 'Total Price');

    doc.setFontType('normal');
  }

  generateTitle(doc, textXpos, textYpos, TEXT_DEFAULT_SIZE, TEXT_TITLE_SIZE) {
    doc.setFontSize(TEXT_TITLE_SIZE);
    doc.setFontType('bold');
    doc.text(textXpos, textYpos, 'Multilux Shopping Cart');
    
    doc.setFontSize(TEXT_DEFAULT_SIZE);
    doc.setFontType('normal');
  }
}
