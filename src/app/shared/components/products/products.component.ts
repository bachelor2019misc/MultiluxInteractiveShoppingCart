import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { SubProductsComponent } from './sub-products/sub-products.component';
import { ProductOption } from './sub-products/ProductOption';
import { Globals } from '../../utils/globals';

export interface Tile {
  cols: number;
  rows: number;
}

export interface ProductOptions {
  amount: number;
  name: string;
  watt: number;
  kelvin: number;
  lumen: number;
  replace: string;
  basePrice: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  idVessel: string;
  idRoom: string;
  private sub: any;

  productDialogRef: MatDialogRef<SubProductsComponent>

  constructor(private dialog: MatDialog, private location: Location, private global: Globals, private router: Router, private route: ActivatedRoute) { 
    if(this.global.currentSelectedRoom === undefined) {
      //this.router.navigate(['/', 'rooms']); TODO: add this when rooms is done
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.idVessel = params['vesselId']; // (+) converts string 'id' to a number
       if(this.idVessel !== this.global.currentSelectedVessel.idVessel) {
         //TODO: get vessel
       }
       this.idRoom = params['roomId']; // (+) converts string 'id' to a number
       if(this.idRoom !== this.global.currentSelectedRoom.idRoom) {
         //TODO: get room
       }
    });
  }

  initDialog(productName?) {

    productName = productName ? productName : "[PRODUCT NAME]";

    //Data would be fetched from database in finished code
    var element_data: ProductOption[] = [
      { id: 0, amount: 1, name: "Minerva", watt: 10, kelvin: 4000, lumen: 1104, replace: "1x18W fluo", basePrice: 100 },
      { id: 1, amount: 1, name: "Minerva", watt: 21, kelvin: 4000, lumen: 2614, replace: "2x18W fluo", basePrice: 200 },
      { id: 2, amount: 1, name: "Minerva", watt: 23, kelvin: 4000, lumen: 2765, replace: "1x36W fluo", basePrice: 300 },
      { id: 3, amount: 1, name: "Minerva", watt: 37, kelvin: 4000, lumen: 5009, replace: "2x36W fluo", basePrice: 400 },
      { id: 4, amount: 1, name: "Minerva", watt: 50, kelvin: 4000, lumen: 6730, replace: "2x54W fluo", basePrice: 500 },
      { id: 5, amount: 1, name: "Minerva", watt: 28, kelvin: 4000, lumen: 3639, replace: "1x58W fluo", basePrice: 600 },
      { id: 6, amount: 1, name: "Minerva", watt: 51, kelvin: 4000, lumen: 6591, replace: "2x59W fluo", basePrice: 700 },
      { id: 7, amount: 1, name: "Minerva", watt: 60, kelvin: 4000, lumen: 7584, replace: "2x58W fluo", basePrice: 800 },
      { id: 8, amount: 1, name: "Minerva", watt: 68, kelvin: 4000, lumen: 9144, replace: "2x80W fluo", basePrice: 900 }
    ];




    this.openProductDialog(productName, element_data);
  }

  openProductDialog(productName, element_data) {
    this.productDialogRef = this.dialog.open(SubProductsComponent, {
      //Set height and width of modal
      height: "75vh",
      width: "75vw",

      //The data to bring into the dialog component
      data: {
        element_data,
        productName,
        productImage: "product.png",
        productDescription: "The luminaire is also available with 3000K, 5000K and 6500K " +
          "light source and shatterproof glass. Possibility of DALI or 1-10V."
      }
    });

    this.productDialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          data.forEach(element => {
            console.log(element)
          });
        }
      }
    )
  }

  backClicked() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}