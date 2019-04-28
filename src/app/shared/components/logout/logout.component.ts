import { Component, Inject } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from '../../utils/globals';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private loginService: LoginService,
    public global: Globals,
    public dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }


  logout() {
    this.loginService.logout();
    this.dialogRef.close();
  }
}
