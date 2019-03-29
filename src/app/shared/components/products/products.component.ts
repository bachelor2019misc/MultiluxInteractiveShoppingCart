import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewChildren, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { Globals } from '../../utils/globals';
import { RestService } from '../../services/rest/rest.service';
import { Product } from '../../utils/entities/product.entity';
import { RoomDot } from '../../utils/entities/roomdot.entity';
import { ProductsCanvasComponent } from './products-canvas/products-canvas.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditRoomComponent } from '../rooms/edit-room/edit-room.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild(ProductsCanvasComponent) canvas: ProductsCanvasComponent;

  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  idVessel: string;
  idRoom: string;
  private sub: any;

  public dots: RoomDot[] = [];
  public products: Product[] = [];

  AddProductNameDialogRef: MatDialogRef<AddProductComponent>;
  EditRoomNameDialogRef: MatDialogRef<EditRoomComponent>;

  constructor(private rest: RestService, private dialog: MatDialog, private location: Location, private global: Globals, private router: Router, private route: ActivatedRoute) {
    if (this.global.currentSelectedRoom === undefined) {
      //this.router.navigate(['/', 'rooms']); TODO: add this when rooms is done
    }
  }

  ngOnInit() {

    console.log("Starting ngONInit");

    this.sub = this.route.params.subscribe(params => {
      this.idVessel = params['idVessel'];
      if (Number.isInteger(+this.idVessel)) {
        if (this.global.currentSelectedVessel === undefined) {
          console.log("There is not a defined vessel");
          this.getVesselById(this.idVessel);
        } else {
          if (this.idVessel === this.global.currentSelectedVessel.idVessel) {
            // Do nothing since the correct vessel is already in memory
            console.log("Vessel in memory is the same as id url");
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getVesselById(this.idVessel);
          }
        }
      } else {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      }

      this.idRoom = params['idRoom'];
      if (Number.isInteger(+this.idRoom)) {
        if (this.global.currentSelectedVessel === undefined) {
          console.log("There is not a defined vessel");
          this.getRoomById(this.idRoom);
        } else {
          if (this.idRoom === this.global.currentSelectedRoom.idRoom) {
            // Do nothing since the correct vessel is already in memory
            console.log("Vessel in memory is the same as id url");
          } else {
            console.log("There is a vessel in memory, but it does not have the same id as the url");
            this.getRoomById(this.idRoom);
          }
        }
      } else {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      }
      console.log("Getting dots");

      this.getDots();
    });
  }

  getDots() {
    console.log("Getting dots 2");
    this.dots = [];
    this.products = [];
    this.rest.httpGet("roomdotbyidroom/" + this.idRoom).subscribe(
      res => {
        console.log("Dots: ", res);
        this.dots = res;
        console.log(this.canvas);
        this.canvas.dots = this.dots;
        console.log("Resizing canvas");
        this.canvas.resize();
        let tempProducts: Product[] = [];
        for(var i = 0; i < this.dots.length; i++) {
          console.log("Index ", i);
          this.rest.httpGet("product/" + this.dots[i].idProduct).subscribe(
            res => {
              console.log(res);
              tempProducts.push(res);
              console.log(tempProducts);
              if(tempProducts.length >= this.dots.length) {
                for(var indexDot = 0; indexDot < this.dots.length; indexDot++) {
                  for(var indexRoom = 0; indexRoom < tempProducts.length; indexRoom++) {
                    if(this.dots[indexDot].idProduct === tempProducts[indexRoom].idProduct) {
                      this.products.push(tempProducts[indexRoom]);
                    }
                  }
                }
                console.log("Sorting rooms");
                this.canvas.products = this.products;
                this.canvas.draw();
              }
            },
            err => {
              console.log("Error occured: ", err);
            }
          );
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  getVesselById(idVessel: string) {
    console.log("IdVessel before getRequest: ", idVessel);
    this.rest.httpGet('vessel/' + idVessel).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedVessel = res;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  getRoomById(idRoom: string) {
    console.log("IdRoom before getRequest: ", idRoom);
    this.rest.httpGet('room/' + idRoom).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedRoom = res;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  openAddProduct(file?) {
    this.AddProductNameDialogRef = this.dialog.open(AddProductComponent, {
      height: "600px",
      width: "700px",
      data: {
        
      }
    });
    this.AddProductNameDialogRef.afterClosed().subscribe((value) => {
      if(value) {
        this.getDots();
      }
    });
  }

  openEditRoom(file?) {
    this.EditRoomNameDialogRef = this.dialog.open(EditRoomComponent, {
      height: "600px",
      width: "700px",
      data: {
        
      }
    });
    this.EditRoomNameDialogRef.afterClosed().subscribe((value) => {
      if(value) {
        this.getDots();
      }
    });
  }

  backClicked() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}