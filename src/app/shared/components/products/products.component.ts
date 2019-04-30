import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewChildren, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { Globals } from '../../utils/globals';
import { RestService } from '../../services/rest/rest.service';
import { Product } from '../../models/product.model';
import { RoomDot } from '../../models/roomdot.model';
import { ProductsCanvasComponent } from './products-canvas/products-canvas.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditRoomComponent } from '../rooms/edit-room/edit-room.component';
import { doesNotReject } from 'assert';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild(ProductsCanvasComponent) canvas: ProductsCanvasComponent;

  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  doneGettingVessel: boolean = false;
  doneGettingRoom: boolean = false;

  idVessel: number;
  idRoom: number;
  private sub: any;

  public dots: RoomDot[] = [];
  public products: Product[] = [];

  AddProductNameDialogRef: MatDialogRef<AddProductComponent>;
  EditRoomNameDialogRef: MatDialogRef<EditRoomComponent>;

  constructor(private rest: RestService, private dialog: MatDialog, private location: Location, public global: Globals, private router: Router, private route: ActivatedRoute) {
    if (this.global.currentSelectedRoom === undefined) {
      //this.router.navigate(['/', 'rooms']); TODO: add this when rooms is done
    }
  }

  ngOnInit() {
    console.log("Starting ngONInit");

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
      console.log("Getting dots");
      this.getDots();
    });
  }

  getDots() {
    if (this.doneGettingRoom && this.doneGettingVessel) {
      console.log("Getting dots 2");
      this.dots = [];
      this.products = [];
      let tempDots: RoomDot[] = [];
      this.rest.httpGet("roomdotbyidroom/" + this.idRoom).subscribe(
        res => {
          console.log("Dots: ", res);
          tempDots = res;
          let tempProducts: Product[] = [];
          if (tempDots.length > 0) {
            for (var i = 0; i < tempDots.length; i++) {
              console.log("dot: ", tempDots[i]);
              this.rest.httpGet("product/" + tempDots[i].idProduct).subscribe(
                res => {
                  console.log("Products: ", res);
                  tempProducts.push(res);
                  console.log(tempProducts);
                  if (tempProducts.length >= tempDots.length) {
                    for (var indexDot = 0; indexDot < tempDots.length; indexDot++) {
                      for (var indexRoom = 0; indexRoom < tempProducts.length; indexRoom++) {
                        if(tempProducts[indexRoom].hidden) {
                          // Skip this room
                        } else {
                          if (tempDots[indexDot].idProduct === tempProducts[indexRoom].idProduct) {
                            this.dots.push(tempDots[indexDot]);
                            this.products.push(tempProducts[indexRoom]);
                          }
                        }
                      }

                    }
                    console.log("Sorting rooms and removing hidden");

                    this.canvas.dots = this.dots;
                    this.canvas.products = this.products;
                    this.canvas.draw();
                  }
                },
                err => {
                  console.log("Error occured: ", err);
                }
              );
            }
          } else {
            this.canvas.dots = this.dots;
            this.canvas.products = this.products;
            this.canvas.resize();
          }
        },
        err => {
          console.log("Error occured: ", err);
        }
      );
    } else {
      console.log("Loading..");
    }
  }

  getVesselById(idVessel: number) {
    console.log("IdVessel before getRequest: ", idVessel);
    this.rest.httpGet('vessel/' + idVessel).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedVessel = res;
        this.doneGettingVessel = true;
        if (this.doneGettingRoom && this.doneGettingVessel) {
          this.getDots();
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
        if (this.doneGettingRoom && this.doneGettingVessel) {
          this.getDots();
        }
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
        idRoom: this.idRoom
      }
    });
    this.AddProductNameDialogRef.afterClosed().subscribe((value) => {
      if (value) {
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
      if (value) {
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