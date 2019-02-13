import { Component } from '@angular/core';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import { LoginDialogComponent } from './login-dialog.component';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  LoginNameDialogRef: MatDialogRef<LoginDialogComponent>;
  
  files = [
    { name: 'foo.js', content: ''},
    { name: 'bar.js', content: ''}
  ];

  constructor(private dialog: MatDialog) {}

  openLoginDialog(file?) {
    this.LoginNameDialogRef = this.dialog.open(LoginDialogComponent, {
      data: {
        
      }
    });

    this.LoginNameDialogRef.afterClosed();
  }
}
