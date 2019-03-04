import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../../utils/globals';
import { AddVesselComponent } from './add-vessel/add-vessel.component'

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent implements OnInit {

  vessels:any = [];

  AddVesselNameDialogRef: MatDialogRef<AddVesselComponent>;

  constructor(public rest:RestService, private global:Globals, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

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
}
