import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Product } from '../../utils/entities/product.entity';
import { Globals } from '../../utils/globals';
import { SubProduct } from '../../utils/entities/sub-product.entity';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { RestService } from '../../services/rest/rest.service';
import { AddSubproductComponent } from './add-subproduct/add-subproduct.component';
import { CartItem } from '../../utils/entities/cart-item.entity';

@Component({
  selector: 'app-sub-product',
  templateUrl: './subproducts.component.html',
  styleUrls: ['./subproducts.component.css']
})
export class SubproductsComponent implements OnInit, DoCheck {

  displayedColumns: string[];
  dataSource: MatTableDataSource<SubProduct>;
  selection = new SelectionModel<SubProduct>(true, []);

  @Input() product: Product = this.global.currentSelectedProduct;

  AddProductNameDialogRef: MatDialogRef<AddSubproductComponent>;

  constructor(private rest: RestService, private dialog: MatDialog, public global: Globals) { }

  ngOnInit() {
    this.updateColumns();
    this.dataSource = new MatTableDataSource<SubProduct>();
    this.getSubProducts();
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
    if(!this.selection.isSelected(subProduct)) {
      this.global.addSubProductToCart(subProduct);
    } else {
      for( var i = 0; i < this.global.currentSelectedCartItems.length; i++){
        if (this.global.currentSelectedCartItems[i].idSubproduct === subProduct.idSubproduct) {
          this.global.currentSelectedCartItems.splice(i, 1); 
        }
     }
    }
  }

  getSubProducts() {
    this.rest.httpGet("subproductbyidproduct/" + this.product.idProduct).subscribe(
      res => {
        console.log("SubProducts: ", res);
        this.dataSource.data = res;
        for(let x = 0; x < res.length; x++) {
          for(let y = 0; y < this.global.currentSelectedCartItems.length; y++) {
            if(this.global.currentSelectedCartItems[y].idSubproduct === res[x].idSubProduct) {
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

  updateColumns() {
    if(this.global.editMode) {
      this.displayedColumns =  ['id', 'title', 'description', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'select', 'edit'];
    } else {
      this.displayedColumns =  ['id', 'title', 'description', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'select'];
    }
  }

  updateAmount(item: SubProduct, amount: number) {
    for(let i = 0; i < this.global.currentSelectedCartItems.length; i++) {
      if(this.global.currentSelectedCartItems[i].idSubproduct === item.idSubproduct) {
        this.global.currentSelectedCartItems[i].amount = amount;
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

  
}
