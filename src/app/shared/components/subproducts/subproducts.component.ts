import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../../utils/entities/product.entity';
import { Globals } from '../../utils/globals';
import { SubProduct } from '../../utils/entities/sub-product.entity';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { RestService } from '../../services/rest/rest.service';
import { AddSubproductComponent } from './add-subproduct/add-subproduct.component';
import { CartItem } from '../../utils/entities/cart-item.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-sub-product',
  templateUrl: './subproducts.component.html',
  styleUrls: ['./subproducts.component.css']
})
export class SubproductsComponent implements OnInit, DoCheck {

  displayedColumns: string[];
  dataSource: MatTableDataSource<SubProduct> = new MatTableDataSource<SubProduct>();
  selection = new SelectionModel<SubProduct>(true, []);

  navigation: boolean;
  EditProductNameDialogRef: MatDialogRef<EditProductComponent>;

  doneGettingVessel: boolean = false;
  doneGettingRoom: boolean = false;
  doneGettingProduct: boolean = false;
  done: boolean = false;

  idVessel: number;
  idRoom: number;
  idProduct: number;

  private sub: any;
  private dataSub: any;

  @Input() product: Product = this.global.currentSelectedProduct;

  AddProductNameDialogRef: MatDialogRef<AddSubproductComponent>;
  constructor(private rest: RestService, private dialog: MatDialog, private location: Location, private router: Router, private route: ActivatedRoute, public global: Globals) { }

  ngOnInit() {
    this.updateColumns();
    this.dataSub = this.route.data.subscribe(data => {
      this.navigation = data.navigation;
      console.log(this.navigation);
      if (this.navigation === undefined) {
        this.done = true;
        this.getSubProducts();
      } else if (this.navigation) {
        console.log("Getting all currentSelected");
        this.getAllFromURL();
      } else {
        console.log("Getting product currentSelected");
        this.doneGettingVessel = true;
        this.doneGettingRoom = true;
        this.getProductFromURL();
      }
    });
  }

  openEditProduct() {
    this.EditProductNameDialogRef = this.dialog.open(EditProductComponent, {
      height: "400px",
      width: "700px",
      data: {
        idProduct: this.product.idProduct
      }
    });
    this.EditProductNameDialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.getProductById(this.product.idProduct);
      }
    });
  }

  getAllFromURL() {
    this.sub = this.route.params.subscribe(params => {
      this.idVessel = +params['idVessel'];

      console.log(this.idVessel);
      if (isNaN(this.idVessel)) {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      } else {
        if (this.global.currentSelectedVessel === undefined) {
          console.log("There is not a defined vessel");
          this.getVesselById(this.idVessel);
        } else {
          if (this.idVessel === this.global.currentSelectedVessel.idVessel) {
            // Do nothing since the correct vessel is already in memory
            console.log("Vessel in memory is the same as id url");
            this.doneGettingVessel = true;
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getVesselById(this.idVessel);
          }
        }
      }

      this.idRoom = +params['idRoom'];
      if (isNaN(this.idVessel)) {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      } else {
        if (this.global.currentSelectedRoom === undefined) {
          console.log("There is not a defined vessel");
          this.getRoomById(this.idRoom);
        } else {
          if (this.idRoom === this.global.currentSelectedRoom.idRoom) {
            // Do nothing since the correct vessel is already in memory
            console.log("Vessel in memory is the same as id url");
            this.doneGettingRoom = true;
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getRoomById(this.idRoom);
          }
        }
      }

      this.idProduct = +params['idProduct'];
      if (isNaN(this.idVessel)) {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      } else {
        if (this.global.currentSelectedProduct === undefined) {
          console.log("There is not a defined vessel");
          this.getProductById(this.idProduct);
        } else {
          if (this.idProduct === this.global.currentSelectedProduct.idProduct) {
            // Do nothing since the correct vessel is already in memory
            console.log("Vessel in memory is the same as id url");
            this.doneGettingProduct = true;
            if (this.doneGettingRoom && this.doneGettingVessel && this.doneGettingProduct) {
              this.done = true;
              this.getSubProducts();
            }
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getRoomById(this.idProduct);
          }
        }
      }

      console.log("Getting subProducts");
      this.getSubProducts();
    });
  }

  getProductFromURL() {
    this.sub = this.route.params.subscribe(params => {
      this.idProduct = +params['idProduct'];
      if (isNaN(this.idProduct)) {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      } else {
        if (this.global.currentSelectedProduct === undefined) {
          console.log("There is not a defined vessel");
          this.getProductById(this.idProduct);
        } else {
          if (this.idProduct === this.global.currentSelectedProduct.idProduct) {
            // Do nothing since the correct vessel is already in memory
            console.log("Product in memory is the same as id url");
            this.doneGettingProduct = true;
            if (this.doneGettingRoom && this.doneGettingVessel && this.doneGettingProduct) {
              this.done = true;
              this.getSubProducts();
            }
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getProductById(this.idProduct);
          }
        }
      }

      console.log("Getting subProducts");
      this.getSubProducts();
    });
  }

  getVesselById(idVessel: number) {
    console.log("IdVessel before getRequest: ", idVessel);
    this.rest.httpGet('vessel/' + idVessel).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedVessel = res;
        this.doneGettingVessel = true;
        if (this.doneGettingRoom && this.doneGettingVessel && this.doneGettingProduct) {
          this.done = true;
          this.getSubProducts();
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  getRoomById(idRoom: number) {
    console.log("IdRoom before getRequest: ", idRoom);
    this.rest.httpGet('room/' + idRoom).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedRoom = res;
        this.doneGettingRoom = true;
        if (this.doneGettingRoom && this.doneGettingVessel && this.doneGettingProduct) {
          this.done = true;
          this.getSubProducts();
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  getProductById(idProduct: number) {
    console.log("IdRoom before getRequest: ", idProduct);
    this.rest.httpGet('product/' + idProduct).subscribe(
      res => {
        console.log(res);
        this.product = res;
        this.global.currentSelectedProduct = res;
        this.doneGettingProduct = true;
        if (this.doneGettingRoom && this.doneGettingVessel && this.doneGettingProduct) {
          this.done = true;
          this.getSubProducts();
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  ngDoCheck(): void {
    this.updateColumns();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SubProduct): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idSubproduct + 1}`;
  }

  SubProductChecked(subProduct: SubProduct) {
    console.log("Checked");
    if (!this.selection.isSelected(subProduct)) {
      this.global.addSubProductToCart(subProduct);
    } else {
      for (var i = 0; i < this.global.currentSelectedCartItems.length; i++) {
        if (this.global.currentSelectedCartItems[i].idSubproduct === subProduct.idSubproduct) {
          this.global.currentSelectedCartItems.splice(i, 1);
        }
      }
    }
  }

  getSubProducts() {
    if (this.product !== undefined) {
      this.rest.httpGet("subproductbyidproduct/" + this.product.idProduct).subscribe(
        res => {
          this.dataSource.data = res;
          for (let x = 0; x < res.length; x++) {
            for (let y = 0; y < this.global.currentSelectedCartItems.length; y++) {
              if (this.global.currentSelectedCartItems[y].idSubproduct === res[x].idSubproduct) {
                console.log(res[x]);
                this.selection.toggle(res[x]);
              }
            }
          }
        },
        err => {
          console.log("Error occured: ", err);
        }
      );
    }
  }

  updateColumns() {
    if (this.global.editMode) {
      this.displayedColumns = ['productNumber', 'title', 'description', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'select', 'edit'];
    } else {
      this.displayedColumns = ['productNumber', 'title', 'description', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'select'];
    }
  }

  updateAmount(item: SubProduct, amount: number) {
    for (let i = 0; i < this.global.currentSelectedCartItems.length; i++) {
      if (this.global.currentSelectedCartItems[i].idSubproduct === item.idSubproduct) {
        this.global.currentSelectedCartItems[i].amount = amount;
      }
    }
  }

  getAmount(subproduct: SubProduct): number {
    for (let i = 0; i < this.global.currentSelectedCartItems.length; i++) {
      if (this.global.currentSelectedCartItems[i].idSubproduct === subproduct.idSubproduct) {
        return this.global.currentSelectedCartItems[i].amount;
      }
    }
  }

  openAddSubProduct(file?) {
    this.AddProductNameDialogRef = this.dialog.open(AddSubproductComponent, {
      height: "600px",
      width: "500px",
      data: {
        idProduct: this.product.idProduct
      }
    });
    this.AddProductNameDialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.getSubProducts();
      }
    });
  }

  backClicked() {
    this.location.back();
  }


}
