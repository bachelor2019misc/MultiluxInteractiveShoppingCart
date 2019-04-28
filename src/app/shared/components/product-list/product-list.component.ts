import { Component, OnInit, ViewChild, DoCheck, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { Product } from '../../models/product.model';
import { Globals } from '../../utils/globals';
import { RestService } from '../../services/rest/rest.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NewProductComponent } from './new-product/new-product.component';
import { Vessel } from '../../models/vessel.model';
import { EditProductComponent } from '../subproducts/edit-product/edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductListComponent implements OnInit, DoCheck {

  displayedColumns: string[];
  dataSource: MatTableDataSource<Product>;
  expandedElement: Product | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AddProductNameDialogRef: MatDialogRef<NewProductComponent>;

  constructor(private location: Location, private rest: RestService, private dialog: MatDialog, public global: Globals) { }

  ngOnInit() {
    this.updateColumns();
    this.dataSource = new MatTableDataSource<Product>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProducts();
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.idProduct + data.title + data.description;
      return dataStr.indexOf(filter) != -1;
    }
  }

  ngDoCheck(): void {
    this.updateColumns();
  }

  updateColumns() {
    if (this.global.editMode) {
      this.displayedColumns = ['idProduct', 'title', 'description', 'hidden'];
    } else {
      this.displayedColumns = ['idProduct', 'title', 'description'];
    }
  }

  openNewProduct(file?) {
    this.AddProductNameDialogRef = this.dialog.open(NewProductComponent, {
      height: "600px",
      width: "700px",
      data: {

      }
    });
    this.AddProductNameDialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.getProducts();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backClicked() {
    this.location.back();
  }

  hidden(product: Product) {
    if(product.hidden == undefined) {
      product.hidden = true;
    }
    if(this.global.editMode) {
      return false;
    } else {
      return product.hidden;
    }
  }

  getProducts() {
    this.rest.httpGet("product").subscribe(
      res => {
        console.log("Products: ", res);
        this.dataSource.data = res;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  hideProduct($event: any, product: Product) {
    $event.stopPropagation();
    product.hidden = true;
    this.rest.httpPut("product/" + product.idProduct, product).subscribe(
      res => {
        console.log(res);
        this.getProducts();
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  showProduct($event: any, product: Product) {
    $event.stopPropagation();
    product.hidden = false;
    this.rest.httpPut("product/" + product.idProduct, product).subscribe(
      res => {
        console.log(res);
        this.getProducts();
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }
}
