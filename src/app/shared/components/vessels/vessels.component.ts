import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { AddVesselComponent } from './add-vessel/add-vessel.component'
import { Vessel } from '../../utils/entities/vessel.entity';
import { EditVesselComponent } from './edit-vessel/edit-vessel.component';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent implements OnInit {

  vessels:Vessel[] = [];

  AddVesselNameDialogRef: MatDialogRef<AddVesselComponent>;
  EditVesselNameDialogRef: MatDialogRef<EditVesselComponent>;

  constructor(public rest:RestService, public global:Globals, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private location: Location) { }

  ngOnInit() {
    this.getVessels();
  }

  getVessels() {
    this.vessels = [];
    this.rest.httpGet("vessel").subscribe(
      res => {
        console.log(res);
        this.vessels = res;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  openAddVessel(file?) {
    this.AddVesselNameDialogRef = this.dialog.open(AddVesselComponent, {
      height: "600px",
      width: "700px",
      data: {
        
      }
    });
    this.AddVesselNameDialogRef.afterClosed().subscribe((value) => {
      if(value) {
        this.getVessels()
      }
    });
  }

  openEditVessel() {
    this.EditVesselNameDialogRef = this.dialog.open(EditVesselComponent, {
      height: "400px",
      width: "700px",
      data: {
        
      }
    });
    this.EditVesselNameDialogRef.afterClosed().subscribe((value) => {
      if(value) {
        this.getVessels()
      }
    });
  }

  setCurrectSelectedVessel(vessel: Vessel) {
    console.log(vessel);
    this.global.currentSelectedVessel = vessel;
  }

  backClicked() {
    this.location.back();
  }
}
