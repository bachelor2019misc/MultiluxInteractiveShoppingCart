import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private location:Location, private global:Globals) { }

  ngOnInit() {
  }

  backClicked() {
    this.location.back();
  }
}
