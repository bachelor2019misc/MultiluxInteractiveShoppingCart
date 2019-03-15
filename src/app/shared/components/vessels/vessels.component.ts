import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { AddVesselComponent } from './add-vessel/add-vessel.component'
import { Vessel } from '../../utils/entities/vessel.entity';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent implements OnInit {

  vessels:Vessel[] = [];

  AddVesselNameDialogRef: MatDialogRef<AddVesselComponent>;

  constructor(public rest:RestService, private global:Globals, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private location: Location) { }

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
      height: "400px",
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

  setCurrectSelectedVessel(vessel: Vessel) {
    console.log(vessel);
    this.global.currentSelectedVessel = vessel;
  }

  backClicked() {
    this.location.back();
  }
}
