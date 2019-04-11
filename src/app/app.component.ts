import { Component, OnInit } from '@angular/core';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from './shared/components/login/login.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
import { AddUserComponent } from './shared/components/add-user/add-user.component';
import { Globals } from './shared/utils/globals'

import { filter } from 'rxjs/operators';
import { Currency } from './shared/models/currency.model';
import { CurrencyService } from './shared/services/currency/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  version = VERSION;
  title = 'MultiluxInteractiveShoppingCart';

  LoginNameDialogRef: MatDialogRef<LoginComponent>;
  LogoutNameDialogRef: MatDialogRef<LogoutComponent>;
  EditUserNameDialogRef: MatDialogRef<EditUserComponent>;
  AddUserNameDialogRef: MatDialogRef<AddUserComponent>;

  currencies: Currency[] = [
    {
      "idCurrency": 1,
      "title": "NOK",
      "value": 1,
      "symbol": "",
      "default": true
    },
    {
      "idCurrency": 2,
      "title": "EUR",
      "value": 10,
      "symbol": "",
      "default": false
    },
  ]

  constructor(private currencyService: CurrencyService, private dialog: MatDialog, public global: Globals) { }

  ngOnInit() {
    this.global.currentSelectedCurrency = {
      "idCurrency": 1,
      "title": "NOK",
      "value": 1,
      "symbol": "",
      "default": true
    };
    this.currencyService.getAll().subscribe(
      res => {
        console.log(res);
        this.currencies = res;
        for (let i = 0; i < this.currencies.length; i++) {
          if (this.currencies[i].default) {
            this.global.currentSelectedCurrency = this.currencies[i];
          }
        }
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  changeCurrency(currency: Currency) {
    this.global.currentSelectedCurrency = currency;
  }

  openLoginDialog(file?) {
    this.LoginNameDialogRef = this.dialog.open(LoginComponent, {
      data: {

      }
    });
    this.LoginNameDialogRef.afterClosed();
  }

  openLogoutDialog(file?) {
    this.LogoutNameDialogRef = this.dialog.open(LogoutComponent, {
      data: {

      }
    });
    this.LogoutNameDialogRef.afterClosed();
  }

  openEditUserDialog(file?) {
    this.EditUserNameDialogRef = this.dialog.open(EditUserComponent, {
      data: {

      }
    });

    this.EditUserNameDialogRef.afterClosed();
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