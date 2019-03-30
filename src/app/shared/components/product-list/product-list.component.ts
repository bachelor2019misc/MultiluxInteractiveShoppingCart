import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from '../../utils/entities/product.entity';
import { Globals } from '../../utils/globals';
import { RestService } from '../../services/rest/rest.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description'];
  dataSource: MatTableDataSource<Product>;
  expandedElement: Product | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  testList: Product[] = [{idProduct: 1, title: "TEST", description: "TESTTEST", image: "assets/img/vesselPlaceholder.png"}, 
  {idProduct: 2, title: "TEST", description: "TESTTEST", image: "assets/img/vesselPlaceholder.png"}];

  constructor(private location: Location, private rest: RestService, private global: Globals) { }

  ngOnInit() {
    this.rest.httpGet("/product").subscribe(
      res => {
        console.log("Products: ", res);
        this.dataSource = new MatTableDataSource<Product>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log("Error occured: ", err);
        this.dataSource = new MatTableDataSource<Product>(this.testList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backClicked() {
    this.location.back();
  }

}
