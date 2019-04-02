import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../../../utils/globals';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from '../../../utils/entities/product.entity';
import { RoomDot } from '../../../utils/entities/roomdot.entity';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'select'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(true, []);

  constructor(
    public rest: RestService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    public global: Globals,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.getProducts();
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
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProductsToRoom() {
    console.log(this.selection.selected);
    for (let i = 0; i < this.selection.selected.length; i++) {
      let done: number = 0;
      this.rest.httpPost("roomdot", this.generateRoomDot(this.data.idRoom, this.selection.selected[i])).subscribe(
        res => {
          done++;
          if(done >= this.selection.selected.length) {
            this.dialogRef.close(true);
          }
        },
        err => {
          console.log("Error occured: ", err);
        }
      );
    }
  }

  generateRoomDot(idRoom: number, product: Product): RoomDot {
    let dot: RoomDot = new RoomDot;
    dot.idProduct = product.idProduct;
    dot.idRoom = idRoom;
    dot.xCoordinates = Math.floor(Math.random() * 1400) + 1;
    dot.yCoordinates = Math.floor(Math.random() * 700) + 1;
    return dot;
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
}
