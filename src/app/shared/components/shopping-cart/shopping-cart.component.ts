import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { Location } from '@angular/common';
import { CartItem } from '../../utils/entities/cart-item.entity';
import { Globals } from '../../utils/globals';

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['./shopping-cart.component.css'],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'watt', 'kelvin', 'lumen', 'price', 'amount', 'totalPrice', 'removeItem'];
  dataSource: MatTableDataSource<CartItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private location: Location, public global: Globals) {}
  
  ngOnInit(){
    this.dataSource = new MatTableDataSource<CartItem>(this.global.currentSelectedCartItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateAmount(item: CartItem, amount: number) {
    item.amount = amount;
  }

  getTotal() {
    let total:number = 0;
    for(let i = 0; i < this.global.currentSelectedCartItems.length; i++) {
      let cartItem: CartItem = this.global.currentSelectedCartItems[i];
      total += cartItem.amount * cartItem.price;
    }
    return total;
  }

  backClicked() {
    this.location.back();
  }

  removeItem(item: CartItem) {
    let i = 0;
    while(i < this.global.currentSelectedCartItems.length) {
      if(this.global.currentSelectedCartItems[i] === item) {
        this.global.currentSelectedCartItems.splice(i, 1);
        i = this.global.currentSelectedCartItems.length;
        this.dataSource.data = this.global.currentSelectedCartItems;
      }
      i++;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

