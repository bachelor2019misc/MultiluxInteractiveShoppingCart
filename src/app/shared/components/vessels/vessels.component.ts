import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.css']
})
export class VesselsComponent implements OnInit {

  vessels:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getVessels();
  }

  getVessels() {
    this.vessels = [];
    //this.rest.getProducts().subscribe((data: {}) => {
    //  console.log(data);
    //  this.vessels = data;
    //});
  }

  addVessel() {
    this.rest.httpPost('vessel', {"vesselname" : "test1111","description" : "test","hidden" : false}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }
}
