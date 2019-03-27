import { Component } from '@angular/core';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from './shared/components/login/login.component';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
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
  EditUserNameDialogRef: MatDialogRef<EditUserComponent>;

  constructor(private dialog: MatDialog, private global: Globals) {}

  openLoginDialog(file?) {
    this.LoginNameDialogRef = this.dialog.open(LoginComponent, {
      data: {
        
      }
    });

    this.LoginNameDialogRef.afterClosed();
  }

  openEditUserDialog(file?) {
    this.EditUserNameDialogRef = this.dialog.open(EditUserComponent, {
      data: {
        
      }
    });

    this.EditUserNameDialogRef.afterClosed();
  }

  enterEditMode() {
    this.global.editMode = true;
  }

  enterViewMode() {
    this.global.editMode = false;
  }
}