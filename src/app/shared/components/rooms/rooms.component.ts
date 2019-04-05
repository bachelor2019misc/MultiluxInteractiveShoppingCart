import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../../services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../utils/globals';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Blueprint } from '../../utils/entities/blueprint.entity';
import { BlueprintDot } from '../../utils/entities/blueprintdot.entity';
import { RoomsCanvasComponent } from './rooms-canvas/rooms-canvas.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { Room } from '../../utils/entities/room.entity';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {

  @ViewChild(RoomsCanvasComponent) private canvas: RoomsCanvasComponent;

  doneGettingVessel: boolean = false;

  idVessel: number;
  private sub: any;

  AddVesselNameDialogRef: MatDialogRef<AddRoomComponent>;
  EditVesselNameDialogRef: MatDialogRef<EditRoomComponent>;

  public dots: BlueprintDot[] = [];
  public rooms: Room[] = [];

  constructor(public rest: RestService, private router: Router, private location: Location, private dialog: MatDialog, private route: ActivatedRoute, public global: Globals) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idVessel = params['idVessel'];
      console.log("url id: " + this.idVessel);
      if (Number.isInteger(+this.idVessel)) {
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
      } else {
        console.log("Id in url is not a number");
        this.router.navigate(['/', 'vessels']);
      }

      this.getDots();
    });
  }

  getDots() {
    if (this.doneGettingVessel) {
      this.dots = [];
      this.rooms = [];
      this.rest.httpGet("blueprintdotbyidvessel/" + this.idVessel).subscribe(
        res => {
          console.log("Dots: ", res);
          this.dots = res;
          this.canvas.dots = this.dots;
          console.log("Canvas: ", this.canvas);
          this.canvas.resize();
          let tempRooms: Room[] = [];
          for(var i = 0; i < this.dots.length; i++) {
            this.rest.httpGet("room/" + this.dots[i].idRoom).subscribe(
              res => {
                tempRooms.push(res);
                if(tempRooms.length === this.dots.length) {
                  for(var indexDot = 0; indexDot < this.dots.length; indexDot++) {
                    for(var indexRoom = 0; indexRoom < tempRooms.length; indexRoom++) {
                      if(this.dots[indexDot].idRoom === tempRooms[indexRoom].idRoom) {
                        this.rooms.push(tempRooms[indexRoom]);
                      }
                    }
                  }
                  console.log("Sorting rooms");
                  this.canvas.rooms = this.rooms;
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
    } else {
      console.log("Loading..")
    }
  }

  getVesselById(idVessel: number) {
    console.log("IdVessel before getRequest: ", idVessel);
    this.rest.httpGet('vessel/' + idVessel).subscribe(
      res => {
        console.log(res);
        this.global.currentSelectedVessel = res;
        this.doneGettingVessel = true;
        if (this.doneGettingVessel) {
          this.getDots();
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  openAddRoom(file?) {
    this.AddVesselNameDialogRef = this.dialog.open(AddRoomComponent, {
      height: "600px",
      width: "700px",
      data: {
        
      }
    });
    this.AddVesselNameDialogRef.afterClosed().subscribe((value) => {
      if(value) {
        this.getDots();
      }
    });
  }

  openEditRoom(file?) {
    this.EditVesselNameDialogRef = this.dialog.open(EditRoomComponent, {
      height: "600px",
      width: "700px",
      data: {
        
      }
    });
    this.AddVesselNameDialogRef.afterClosed().subscribe((value) => {
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
