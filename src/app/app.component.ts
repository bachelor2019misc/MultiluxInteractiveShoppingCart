import { Component } from '@angular/core';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from './shared/components/login/login.component';
import { AddUserComponent } from './shared/components/add-user/add-user.component';
import { Globals } from './shared/utils/globals'

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  LoginNameDialogRef: MatDialogRef<LoginComponent>;
  AddUserNameDialogRef: MatDialogRef<AddUserComponent>;

  constructor(private dialog: MatDialog, private global: Globals) {}

  openLoginDialog(file?) {
    this.LoginNameDialogRef = this.dialog.open(LoginComponent, {
      data: {
        
      }
    });

    this.LoginNameDialogRef.afterClosed();
  }

  openAddUserDialog(file?) {
    this.AddUserNameDialogRef = this.dialog.open(AddUserComponent, {
      data: {
        
      }
    });

    this.AddUserNameDialogRef.afterClosed();
  }

  enterEditMode() {
    this.global.editMode = true;
  }

  enterViewMode() {
    this.global.editMode = false;
  }
}