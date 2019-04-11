import { Component, OnInit } from '@angular/core';
import { Globals } from '../../utils/globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public global: Globals) { }

  ngOnInit() {
  }

}