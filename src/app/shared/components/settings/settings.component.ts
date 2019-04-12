import { Component, OnInit } from '@angular/core';
import { Globals } from '../../utils/globals';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private location: Location, public global: Globals) { }

  ngOnInit() {
  }

  backClicked() {
    this.location.back();
  }
}
