import { Component, OnInit, Inject } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { headersToString } from 'selenium-webdriver/http';
import { Http2ServerRequest } from 'http2';
import { Globals } from '../../utils/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  username: string;
  password: string;

  constructor(
    public rest: RestService,
    public global: Globals,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.data.username ? this.data.username : '',
      password: this.data.password ? this.data.password : ''
    })
  }

  submit(form: any) {
    this.rest.login(form.value.username, form.value.password).subscribe(
      res => {
        console.log(res);
        this.rest.setNewHeader('Authorization', res.token);
        this.global.loggedIn = true;
        this.global.username = form.value.username;
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
    this.dialogRef.close(`${form.value.username.password}`);
  }
}
