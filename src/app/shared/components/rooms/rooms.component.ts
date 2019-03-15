import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Globals } from '../../utils/globals';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  constructor(private router: Router, private location:Location, private global:Globals) { 
    if(this.global.currentSelectedVessel === undefined) {
      this.router.navigate(['/', 'vessels']);
    }
  }

  backClicked() {
    this.location.back();
  }
}
