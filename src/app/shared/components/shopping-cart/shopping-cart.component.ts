import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { Globals } from '../../utils/globals';
import { JsontoCsvService } from '../../services/jsontocsv/jsontocsv.service';
import { JsToPdfService } from '../../services/jstopdf/jstopdf.service';

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['./shopping-cart.component.css'],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'type', 'productNumber', 'process',
    'description', 'locationCode', 'price',
    'amount', 'unitCode', 'totalPrice',
    'remove'
  ];
  dataSource: MatTableDataSource<CartItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private location: Location, 
    public global: Globals, 
    public jsontocsv: JsontoCsvService, 
    public jstopdf: JsToPdfService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<CartItem>(this.global.currentSelectedCartItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.productNumber + data.title + data.description + data.price + data.amount;
      return dataStr.indexOf(filter) != -1; 
    }
  }

  updateProcess(item: CartItem, process: string) {
    item.process = process;
  }

  updateAmount(item: CartItem, amount: number) {
    item.amount = amount;
  }

  getTotal() {
    let total: number = 0;
    for (let i = 0; i < this.global.currentSelectedCartItems.length; i++) {
      let cartItem: CartItem = this.global.currentSelectedCartItems[i];
      total += cartItem.amount * cartItem.price / this.global.currentSelectedCurrency.value;
    }
    return total;
  }

  backClicked() {
    this.location.back();
  }

  remove(item: CartItem) {
    let i = 0;
    while (i < this.global.currentSelectedCartItems.length) {
      if (this.global.currentSelectedCartItems[i] === item) {
        this.global.currentSelectedCartItems.splice(i, 1);
        i = this.global.currentSelectedCartItems.length;
        this.dataSource.data = this.global.currentSelectedCartItems;
        this.global.resetCurrenctSelectedCartITemsFromCookies();
      }
      i++;
    }
  }

  removeAll() {
    this.global.currentSelectedCartItems = [];
    this.global.resetCurrenctSelectedCartITemsFromCookies();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadCsv() {
    this.jsontocsv.cartToCsv();
  }

  printCart() {
    this.jstopdf.cartToPdf();
  }
}

