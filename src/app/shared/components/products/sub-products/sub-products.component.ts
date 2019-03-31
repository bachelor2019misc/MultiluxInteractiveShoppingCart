import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductOption } from './ProductOption';

@Component({
  selector: 'app-sub-products',
  templateUrl: './sub-products.component.html',
  styleUrls: ['./sub-products.component.css']
})
export class SubProductsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'amount', 'watt', 'kelvin', 'lumen', 'replace', 'basePrice'];
  element_data: ProductOption[] = [];
  selection = new SelectionModel<ProductOption>(true, []);
  dataSource: MatTableDataSource<ProductOption>;


  constructor(
    public dialogRef: MatDialogRef<SubProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  //Whether the number of selected elements matches the total number of rows
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  rowToggle(row) {
    this.selection.toggle(row);
    console.log(this.selection.isSelected(row))
  }

  updateAmount(data, value) {
    var elementExists = false;
    var dataIndex = -1;
    for (var i = 0; i < this.dataSource.data.length; i++) {
      if (data.id == this.dataSource.data[i].id) {
        dataIndex = i;
        elementExists = true;
        break;
      };
    }

    if (elementExists && dataIndex != -1) {
      this.dataSource.data[dataIndex].amount = parseInt(value.amount);
    }
  }

  ngOnInit() {
    this.element_data = this.data.element_data;
    this.dataSource = new MatTableDataSource<ProductOption>(this.element_data);
  }

  submit(values) {
    this.dialogRef.close(this.selection.selected);
  }
}
