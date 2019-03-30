import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../utils/entities/product.entity';
import { Globals } from '../../utils/globals';
import { SubProduct } from '../../utils/entities/sub-product.entity';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  testList: SubProduct[] = [{ idSubProduct: 1, title: 'productName', description: 'test', watt: 1000, kelvin: 800, lumen: 11000, price: 200 },
  { idSubProduct: 1, title: 'productName', description: 'test', watt: 1000, kelvin: 800, lumen: 11000, price: 200 }];

  displayedColumns: string[] = ['id', 'title', 'description', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'select'];
  dataSource: MatTableDataSource<SubProduct> = new MatTableDataSource<SubProduct>(this.testList);
  selection = new SelectionModel<SubProduct>(true, []);

  @Input() product: Product = this.global.currentSelectedProduct;

  constructor(private global: Globals) { }

  ngOnInit() {
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idSubProduct + 1}`;
  }
}
