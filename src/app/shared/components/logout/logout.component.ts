import { Component, Inject } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '../../utils/globals';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    public rest: RestService,
    private global: Globals,
    private dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }


  logout() {
    this.rest.setDefaultHeader();
    this.global.loggedIn = false;
    this.dialogRef.close(); 
  }
}
